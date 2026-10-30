/*
 * Task 04: ESP32 Firebase Realtime Database Multi-Sensor Telemetry
 * Author: Sai Sanjay R
 * Course: ProtoSem - Week 07: IoT & Embedded Systems
 * Hardware: ESP32-WROOM-32, DHT11 Temperature & Humidity, LDR Photoresistor, 5V Relay
 * Description: Pushes live sensor metrics to Google Firebase RTDB and listens for
 *              bidirectional relay actuation commands from web/mobile clients.
 */

#include <WiFi.h>
#include <Firebase_ESP_Client.h>
#include <DHT.h>

// Wi-Fi Credentials
#define WIFI_SSID       "YOUR_WIFI_SSID"
#define WIFI_PASSWORD   "YOUR_WIFI_PASSWORD"

// Firebase Project Credentials
#define FIREBASE_HOST   "YOUR_PROJECT_ID-default-rtdb.firebaseio.com"
#define FIREBASE_AUTH   "YOUR_FIREBASE_DATABASE_SECRET"

// Hardware Pin Configuration
#define DHTPIN          4       // DHT11 Data line (GPIO 4 with 10k pullup)
#define DHTTYPE         DHT11   // DHT 11 sensor model
#define LDRPIN          34      // LDR Voltage divider on ADC1 (GPIO 34, 12-bit)
#define RELAYPIN        26      // 5V Relay control (GPIO 26)

FirebaseData fbdo;
FirebaseAuth auth;
FirebaseConfig config;
DHT dht(DHTPIN, DHTTYPE);

unsigned long lastSend = 0;
const unsigned long sendInterval = 5000; // 5-second sampling cycle

void setup() {
  Serial.begin(115200);
  pinMode(RELAYPIN, OUTPUT);
  digitalWrite(RELAYPIN, LOW);

  dht.begin();
  analogReadResolution(12); // ESP32 ADC: 0 - 4095

  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  Serial.print("[WIFI] Connecting to network");
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("\n[WIFI] Connected! IP: ");
  Serial.println(WiFi.localIP());

  // Configure Firebase SDK
  config.database_url = FIREBASE_HOST;
  config.signer.tokens.legacy_token = FIREBASE_AUTH;
  Firebase.reconnectWiFi(true);
  Firebase.begin(&config, &auth);

  Serial.println("[FIREBASE] Initialized Realtime Database connection");
}

void loop() {
  // 1. Non-blocking sensor sampling every 5 seconds
  if (millis() - lastSend >= sendInterval) {
    lastSend = millis();

    float temp = dht.readTemperature();
    float hum  = dht.readHumidity();
    int   ldr  = analogRead(LDRPIN);

    // Guard against DHT11 transient read glitches
    if (isnan(temp) || isnan(hum)) {
      Serial.println("[SENSOR WARN] Failed to read from DHT11 sensor!");
    } else {
      Serial.printf("[TELEMETRY] Temp: %.1f C | Hum: %.1f %% | LDR: %d ADC\n", temp, hum, ldr);

      // Push telemetry nodes to Firebase RTDB
      Firebase.RTDB.setFloat(&fbdo, "/current/temperature", temp);
      Firebase.RTDB.setFloat(&fbdo, "/current/humidity", hum);
      Firebase.RTDB.setInt(&fbdo, "/current/ldr", ldr);
    }
  }

  // 2. Poll for dashboard relay command updates
  if (Firebase.RTDB.getBool(&fbdo, "/current/bulbState")) {
    bool bulbCmd = fbdo.to<bool>();
    digitalWrite(RELAYPIN, bulbCmd ? HIGH : LOW);
  }

  delay(200);
}
