/*
 * Task 05: ESP32 Firebase Persistent Logging, Auto/Manual Modes & Analytics
 * Author: Sai Sanjay R
 * Course: ProtoSem - Week 07: IoT & Embedded Systems
 * Hardware: ESP32-WROOM-32, DHT11, LDR Photoresistor, 5V Relay
 * Description: Implements dual operating modes (MANUAL override and AUTO-SENSE
 *              with LDR threshold hysteresis), logs time-series historical data
 *              to Firebase RTDB, and enables client-side CSV spreadsheet export.
 */

#include <WiFi.h>
#include <Firebase_ESP_Client.h>
#include <DHT.h>
#include <time.h>

#define WIFI_SSID       "YOUR_WIFI_SSID"
#define WIFI_PASSWORD   "YOUR_WIFI_PASSWORD"

#define FIREBASE_HOST   "YOUR_PROJECT_ID-default-rtdb.firebaseio.com"
#define FIREBASE_AUTH   "YOUR_FIREBASE_DATABASE_SECRET"

#define DHTPIN          4
#define DHTTYPE         DHT11
#define LDRPIN          34
#define RELAYPIN        26

// Hysteresis threshold defaults (0 - 4095)
int ldrThreshold = 1500;
const int HYSTERESIS_BAND = 50;

FirebaseData fbdo;
FirebaseAuth auth;
FirebaseConfig config;
DHT dht(DHTPIN, DHTTYPE);

unsigned long lastCycle = 0;
const unsigned long cycleTime = 5000;

void setup() {
  Serial.begin(115200);
  pinMode(RELAYPIN, OUTPUT);
  digitalWrite(RELAYPIN, LOW);

  dht.begin();
  analogReadResolution(12);

  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  while (WiFi.status() != WL_CONNECTED) delay(500);

  // Synchronize internal RTC via NTP for ISO timestamps
  configTime(0, 0, "pool.ntp.org", "time.nist.gov");

  config.database_url = FIREBASE_HOST;
  config.signer.tokens.legacy_token = FIREBASE_AUTH;
  Firebase.begin(&config, &auth);
  Firebase.reconnectWiFi(true);

  Serial.println("[SYSTEM READY] Auto-mode hysteresis and time-series logging active.");
}

void loop() {
  if (millis() - lastCycle >= cycleTime) {
    lastCycle = millis();

    float temp = dht.readTemperature();
    float hum  = dht.readHumidity();
    int   ldr  = analogRead(LDRPIN);

    if (!isnan(temp) && !isnan(hum)) {
      // Fetch operational mode
      String mode = "MANUAL";
      if (Firebase.RTDB.getString(&fbdo, "/current/mode")) {
        mode = fbdo.to<String>();
      }

      // Fetch dynamic user threshold
      if (Firebase.RTDB.getInt(&fbdo, "/current/threshold")) {
        ldrThreshold = fbdo.to<int>();
      }

      bool bulbState = false;

      // Mode 1: AUTO-SENSE based on ambient light + hysteresis
      if (mode == "AUTO") {
        if (ldr < (ldrThreshold - HYSTERESIS_BAND)) {
          // Low light detected -> energize relay
          bulbState = true;
        } else if (ldr > (ldrThreshold + HYSTERESIS_BAND)) {
          // Sufficient ambient light -> de-energize relay
          bulbState = false;
        } else {
          // Within deadband -> keep previous state
          bulbState = digitalRead(RELAYPIN) == HIGH;
        }
        digitalWrite(RELAYPIN, bulbState ? HIGH : LOW);
        Firebase.RTDB.setBool(&fbdo, "/current/bulbState", bulbState);
      } else {
        // Mode 2: MANUAL OVERRIDE from client dashboard toggle
        if (Firebase.RTDB.getBool(&fbdo, "/current/bulbState")) {
          bulbState = fbdo.to<bool>();
          digitalWrite(RELAYPIN, bulbState ? HIGH : LOW);
        }
      }

      // Sync live telemetry
      Firebase.RTDB.setFloat(&fbdo, "/current/temperature", temp);
      Firebase.RTDB.setFloat(&fbdo, "/current/humidity", hum);
      Firebase.RTDB.setInt(&fbdo, "/current/ldr", ldr);

      // Append historical time-series log record
      FirebaseJson record;
      record.set("timestamp", (int)time(nullptr));
      record.set("temperature", temp);
      record.set("humidity", hum);
      record.set("lightLevel", ldr);
      record.set("bulbState", bulbState);
      record.set("mode", mode);

      Firebase.RTDB.pushJSON(&fbdo, "/logs", &record);
      Serial.printf("[LOGGED] Mode: %s | Temp: %.1fC | LDR: %d | Relay: %s\n",
                    mode.c_str(), temp, ldr, bulbState ? "ON" : "OFF");
    }
  }
}
