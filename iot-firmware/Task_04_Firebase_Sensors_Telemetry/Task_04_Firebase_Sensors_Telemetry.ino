/*
 * ======================================================================================
 * Task 04: Firebase IoT Monitoring Dashboard — ESP32 Telemetry & Control Node
 * Project: ProtoSem Week 07 — IoT & Embedded Systems
 * Author: Sai Sanjay R
 * Hardware: ESP32 DevKit V1, DHT11 (GPIO 14), LDR + 10k divider (GPIO 34 / ADC1),
 *           5V optocoupled relay module (GPIO 4, active-LOW), onboard LED (GPIO 2)
 * Cloud:    Firebase project "SmartHome-IoT" (smarthome-iot-e9fe6)
 *           Realtime Database (asia-southeast1) + Email/Password Authentication
 *
 * Database contract shared with the web dashboard — node /current :
 *   temperature (float)        written by ESP32
 *   humidity    (float)        written by ESP32
 *   ldr         (int 0-4095)   written by ESP32
 *   bulbState   (bool)         written by ESP32  -> real relay output
 *   relay       ("ON"/"OFF")   written by dashboard toggle (and by ESP32 in AUTO mode)
 *   mode        ("AUTO"/"MANUAL") written by dashboard <select>
 *   threshold   (int 0-4095)   written by dashboard slider
 * ======================================================================================
 */

#include <WiFi.h>
#include <Firebase_ESP_Client.h>
#include <addons/TokenHelper.h>   // prints token generation status
#include <DHT.h>

// ---------- Wi-Fi (2.4 GHz only) ----------
#define WIFI_SSID        "YOUR_WIFI_SSID"
#define WIFI_PASS        "YOUR_WIFI_PASSWORD"

// ---------- Firebase ----------
#define API_KEY          "YOUR_FIREBASE_WEB_API_KEY"
#define DATABASE_URL     "https://smarthome-iot-e9fe6-default-rtdb.asia-southeast1.firebasedatabase.app"
// The ESP32 signs in with its own Firebase Auth account (a "device user")
#define DEVICE_EMAIL     "esp32@firebase.local"
#define DEVICE_PASSWORD  "YOUR_DEVICE_ACCOUNT_PASSWORD"

// ---------- Pins ----------
#define DHTPIN           14      // DHT11 data (10k pull-up to 3.3V)
#define DHTTYPE          DHT11
#define LDR_PIN          34      // ADC1_CH6 — keeps working while Wi-Fi is on
#define RELAY_PIN        4       // relay IN1
#define STATUS_LED       2       // onboard LED mirrors the relay

#define RELAY_ACTIVE     LOW     // this relay module is active-LOW
#define RELAY_INACTIVE   HIGH
#define HYSTERESIS       50      // +/- ADC counts around the threshold (stops chatter at dusk)

DHT dht(DHTPIN, DHTTYPE);
FirebaseData   fbdo;             // ONE global object, reused (creating it in loop() leaked heap)
FirebaseAuth   auth;
FirebaseConfig config;

String mode      = "AUTO";
int    threshold = 1500;         // default until the dashboard value is read
bool   manualOn  = false;        // last "relay" command from the dashboard
bool   relayOn   = false;        // real output state

unsigned long lastSensorMs  = 0;
unsigned long lastControlMs = 0;
const unsigned long SENSOR_INTERVAL  = 5000;  // DHT11 needs >= 2 s between reads
const unsigned long CONTROL_INTERVAL = 1000;  // check dashboard commands every second

void setRelay(bool on) {
  relayOn = on;
  digitalWrite(RELAY_PIN, on ? RELAY_ACTIVE : RELAY_INACTIVE);
  digitalWrite(STATUS_LED, on ? HIGH : LOW);
}

void connectWiFi() {
  Serial.print("[WIFI] Connecting to ");
  Serial.println(WIFI_SSID);
  WiFi.mode(WIFI_STA);
  WiFi.begin(WIFI_SSID, WIFI_PASS);
  while (WiFi.status() != WL_CONNECTED) {
    delay(400);
    Serial.print(".");
  }
  Serial.println("\n[WIFI] Connected! IP: " + WiFi.localIP().toString());
}

void setup() {
  Serial.begin(115200);
  delay(500);
  Serial.println("\n=======================================================");
  Serial.println("  Task 04: ESP32 -> Firebase RTDB Telemetry & Control  ");
  Serial.println("=======================================================");

  pinMode(RELAY_PIN, OUTPUT);
  pinMode(STATUS_LED, OUTPUT);
  setRelay(false);                // fail-safe: lamp OFF while booting

  dht.begin();
  analogReadResolution(12);       // LDR reading range 0 - 4095

  connectWiFi();

  config.api_key      = API_KEY;
  config.database_url = DATABASE_URL;
  auth.user.email     = DEVICE_EMAIL;
  auth.user.password  = DEVICE_PASSWORD;
  config.token_status_callback = tokenStatusCallback;

  Firebase.reconnectWiFi(true);
  fbdo.setResponseSize(2048);
  Firebase.begin(&config, &auth);
  Serial.println("[FIREBASE] Signing in as device user and connecting to RTDB...");
}

// Read the three values the dashboard writes
void readDashboardCommands() {
  if (Firebase.RTDB.getString(&fbdo, "/current/mode"))      mode      = fbdo.stringData();
  if (Firebase.RTDB.getInt(&fbdo, "/current/threshold"))    threshold = fbdo.intData();
  if (Firebase.RTDB.getString(&fbdo, "/current/relay"))     manualOn  = (fbdo.stringData() == "ON");
}

// AUTO: LDR vs threshold with hysteresis.  MANUAL: follow the dashboard toggle.
// Divider = LDR on the 3.3V side, 10k to GND -> darker room = LOWER ADC value.
void applyControlLogic(int ldr) {
  if (mode == "AUTO") {
    if (!relayOn && ldr < threshold - HYSTERESIS)      setRelay(true);   // dark  -> bulb ON
    else if (relayOn && ldr > threshold + HYSTERESIS)  setRelay(false);  // bright -> bulb OFF
  } else {
    setRelay(manualOn);
  }
}

void loop() {
  if (!Firebase.ready()) return;
  unsigned long now = millis();

  // 1) Control loop — fast, so the dashboard feels instant
  if (now - lastControlMs >= CONTROL_INTERVAL) {
    lastControlMs = now;
    readDashboardCommands();
    bool before = relayOn;
    applyControlLogic(analogRead(LDR_PIN));
    if (relayOn != before) {
      Firebase.RTDB.setBool(&fbdo, "/current/bulbState", relayOn);
      // In AUTO mode the ESP32 also updates "relay" so the dashboard switch shows the truth
      if (mode == "AUTO") Firebase.RTDB.setString(&fbdo, "/current/relay", relayOn ? "ON" : "OFF");
      Serial.printf("[RELAY] %s (%s mode)\n", relayOn ? "ON" : "OFF", mode.c_str());
    }
  }

  // 2) Telemetry loop — every 5 s
  if (now - lastSensorMs >= SENSOR_INTERVAL) {
    lastSensorMs = now;
    float t   = dht.readTemperature();
    float h   = dht.readHumidity();
    int   ldr = analogRead(LDR_PIN);

    FirebaseJson json;
    if (!isnan(t) && !isnan(h)) {
      json.set("temperature", t);
      json.set("humidity", h);
    } else {
      Serial.println("[DHT11] Read failed (NaN) - keeping last good values");
    }
    json.set("ldr", ldr);
    json.set("bulbState", relayOn);

    // updateNode only touches these keys, so dashboard-owned keys (mode, threshold) survive
    if (Firebase.RTDB.updateNode(&fbdo, "/current", &json)) {
      Serial.printf("[TELEMETRY] T=%.1fC H=%.0f%% LDR=%d Relay=%s Mode=%s Th=%d\n",
                    t, h, ldr, relayOn ? "ON" : "OFF", mode.c_str(), threshold);
    } else {
      Serial.println("[FIREBASE] Update failed: " + fbdo.errorReason());
    }
  }
}
