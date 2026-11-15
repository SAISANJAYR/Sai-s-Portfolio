/*
 * ======================================================================================
 * Task 05: Firebase Logging, Automation & Data Export — complete system firmware
 * Project: ProtoSem Week 07 — IoT & Embedded Systems
 * Author: Sai Sanjay R
 * Hardware: ESP32 DevKit V1, DHT11 (GPIO 14), LDR + 10k divider (GPIO 34 / ADC1),
 *           5V optocoupled relay + 230V bulb (GPIO 4, active-LOW), onboard LED (GPIO 2)
 *
 * Everything from Task 04 (live telemetry on /current, MANUAL / AUTO bulb control)
 * PLUS: NTP time sync and a timestamped history record every 5 s under
 *
 *   /telemetry/logs/{epochSeconds}
 *       timestamp   : 1729862320            (int, Unix epoch, UTC)
 *       time        : "2024-10-25T13:18:40Z" (string, ISO-8601 UTC)
 *       temperature : 27.1                  (float, °C, DHT11)
 *       humidity    : 62.4                  (float, %RH, DHT11)
 *       ldr         : 1490                  (int, 12-bit ADC 0-4095)
 *       relay       : "ON" | "OFF"          (bulb status at that moment)
 *       mode        : "AUTO" | "MANUAL"     (operating mode at that moment)
 *
 * The web dashboard reads /telemetry/logs for the history table, chart and CSV download;
 * export_firebase_csv.py does the same from a laptop through the REST API.
 * ======================================================================================
 */

#include <WiFi.h>
#include <Firebase_ESP_Client.h>
#include <addons/TokenHelper.h>
#include <DHT.h>
#include "time.h"

// ---------- Wi-Fi / Firebase ----------
#define WIFI_SSID        "YOUR_WIFI_SSID"
#define WIFI_PASS        "YOUR_WIFI_PASSWORD"
#define API_KEY          "YOUR_FIREBASE_WEB_API_KEY"
#define DATABASE_URL     "https://smarthome-iot-e9fe6-default-rtdb.asia-southeast1.firebasedatabase.app"
#define DEVICE_EMAIL     "esp32@firebase.local"
#define DEVICE_PASSWORD  "YOUR_DEVICE_ACCOUNT_PASSWORD"

// ---------- Pins ----------
#define DHTPIN           14
#define DHTTYPE          DHT11
#define LDR_PIN          34
#define RELAY_PIN        4
#define STATUS_LED       2
#define RELAY_ACTIVE     LOW
#define RELAY_INACTIVE   HIGH
#define HYSTERESIS       50

// ---------- Timing ----------
const unsigned long CONTROL_INTERVAL = 1000;   // dashboard commands
const unsigned long LOG_INTERVAL     = 5000;   // live update + history record
const char* NTP_SERVER = "pool.ntp.org";       // UDP port 123

DHT dht(DHTPIN, DHTTYPE);
FirebaseData   fbdo;
FirebaseAuth   auth;
FirebaseConfig config;

String mode      = "AUTO";
int    threshold = 1500;
bool   manualOn  = false;
bool   relayOn   = false;
float  lastTemp  = NAN;
float  lastHum   = NAN;
unsigned long lastControlMs = 0;
unsigned long lastLogMs     = 0;

void setRelay(bool on) {
  relayOn = on;
  digitalWrite(RELAY_PIN, on ? RELAY_ACTIVE : RELAY_INACTIVE);
  digitalWrite(STATUS_LED, on ? HIGH : LOW);
}

// Seconds since 1970 (UTC) from the NTP-synced RTC; 0 if time is not set yet
time_t epochNow() {
  time_t now;
  time(&now);
  return (now > 1700000000) ? now : 0;
}

String isoTime(time_t t) {
  char buf[25];
  strftime(buf, sizeof(buf), "%Y-%m-%dT%H:%M:%SZ", gmtime(&t));
  return String(buf);
}

void setup() {
  Serial.begin(115200);
  delay(500);
  Serial.println("\n=======================================================");
  Serial.println("  Task 05: Logging, Automation & CSV Export (full)     ");
  Serial.println("=======================================================");

  pinMode(RELAY_PIN, OUTPUT);
  pinMode(STATUS_LED, OUTPUT);
  setRelay(false);
  dht.begin();
  analogReadResolution(12);

  WiFi.mode(WIFI_STA);
  WiFi.begin(WIFI_SSID, WIFI_PASS);
  Serial.print("[WIFI] Connecting");
  while (WiFi.status() != WL_CONNECTED) { delay(400); Serial.print("."); }
  Serial.println("\n[WIFI] Connected! IP: " + WiFi.localIP().toString());

  // Real-world clock for the log timestamps (stored in UTC)
  configTime(0, 0, NTP_SERVER);
  Serial.print("[NTP] Syncing clock");
  while (epochNow() == 0) { delay(300); Serial.print("."); }
  Serial.println("\n[NTP] Time: " + isoTime(epochNow()));

  config.api_key      = API_KEY;
  config.database_url = DATABASE_URL;
  auth.user.email     = DEVICE_EMAIL;
  auth.user.password  = DEVICE_PASSWORD;
  config.token_status_callback = tokenStatusCallback;
  Firebase.reconnectWiFi(true);
  fbdo.setResponseSize(2048);
  Firebase.begin(&config, &auth);
}

void readDashboardCommands() {
  if (Firebase.RTDB.getString(&fbdo, "/current/mode"))   mode      = fbdo.stringData();
  if (Firebase.RTDB.getInt(&fbdo, "/current/threshold")) threshold = fbdo.intData();
  if (Firebase.RTDB.getString(&fbdo, "/current/relay"))  manualOn  = (fbdo.stringData() == "ON");
}

void applyControlLogic(int ldr) {
  if (mode == "AUTO") {
    if (!relayOn && ldr < threshold - HYSTERESIS)      setRelay(true);   // dark   -> ON
    else if (relayOn && ldr > threshold + HYSTERESIS)  setRelay(false);  // bright -> OFF
  } else {
    setRelay(manualOn);                                                  // MANUAL
  }
}

void loop() {
  if (!Firebase.ready()) return;
  unsigned long now = millis();

  if (now - lastControlMs >= CONTROL_INTERVAL) {
    lastControlMs = now;
    readDashboardCommands();
    bool before = relayOn;
    applyControlLogic(analogRead(LDR_PIN));
    if (relayOn != before) {
      Firebase.RTDB.setBool(&fbdo, "/current/bulbState", relayOn);
      if (mode == "AUTO") Firebase.RTDB.setString(&fbdo, "/current/relay", relayOn ? "ON" : "OFF");
    }
  }

  if (now - lastLogMs >= LOG_INTERVAL) {
    lastLogMs = now;
    float t   = dht.readTemperature();
    float h   = dht.readHumidity();
    int   ldr = analogRead(LDR_PIN);
    if (!isnan(t) && !isnan(h)) { lastTemp = t; lastHum = h; }
    if (isnan(lastTemp)) return;                 // no valid DHT11 sample yet

    // a) live values for the dashboard cards
    FirebaseJson live;
    live.set("temperature", lastTemp);
    live.set("humidity", lastHum);
    live.set("ldr", ldr);
    live.set("bulbState", relayOn);
    Firebase.RTDB.updateNode(&fbdo, "/current", &live);

    // b) one history record, keyed by epoch so records sort by time
    time_t ts = epochNow();
    FirebaseJson rec;
    rec.set("timestamp", (int)ts);
    rec.set("time", isoTime(ts));
    rec.set("temperature", lastTemp);
    rec.set("humidity", lastHum);
    rec.set("ldr", ldr);
    rec.set("relay", relayOn ? "ON" : "OFF");
    rec.set("mode", mode);

    String path = "/telemetry/logs/" + String((unsigned long)ts);
    if (Firebase.RTDB.setJSON(&fbdo, path, &rec)) {
      Serial.printf("[LOG] %s  T=%.1fC H=%.0f%% LDR=%d Bulb=%s Mode=%s\n",
                    isoTime(ts).c_str(), lastTemp, lastHum, ldr, relayOn ? "ON" : "OFF", mode.c_str());
    } else {
      Serial.println("[LOG] Write failed: " + fbdo.errorReason());
    }
  }
}
