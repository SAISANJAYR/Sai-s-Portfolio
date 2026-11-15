/*
 * ======================================================================================
 * Task 03: IFTTT Voice Automation & Cloud Webhook Integration
 * Project: IoT & Embedded Systems Lab Manual
 * Author: Sai Sanjay R
 * Hardware: ESP32 DevKit V1, 5V Optocoupled Relay Module, AC Lamp
 * Description: Integrates Google Assistant voice triggers via IFTTT and Adafruit IO MQTT.
 * ======================================================================================
 */

#include <WiFi.h>
#include <WiFiClient.h>
#include "Adafruit_MQTT.h"
#include "Adafruit_MQTT_Client.h"

// Wi-Fi Configuration
#define WIFI_SSID       "YOUR_WIFI_SSID"
#define WIFI_PASS       "YOUR_WIFI_PASSWORD"

// Adafruit IO Broker Credentials
#define AIO_SERVER      "io.adafruit.com"
#define AIO_SERVERPORT  1883
#define AIO_USERNAME    "Sai__0077"
#define AIO_KEY         "YOUR_ADAFRUIT_AIO_KEY"

// Hardware Pin Assignment
const int RELAY_PIN = 4;
const int LED_STATUS = 2;

// Active-LOW relay logic definitions
#define RELAY_ACTIVE    LOW
#define RELAY_INACTIVE  HIGH

WiFiClient client;
Adafruit_MQTT_Client mqtt(&client, AIO_SERVER, AIO_SERVERPORT, AIO_USERNAME, AIO_KEY);

// MQTT Subscription to Adafruit IO feed updated by IFTTT Applet
Adafruit_MQTT_Subscribe voiceFeed = Adafruit_MQTT_Subscribe(&mqtt, AIO_USERNAME "/feeds/bulb-control");

void connectWiFi();
void connectMQTT();

void setup() {
  Serial.begin(115200);
  delay(500);

  Serial.println("\n=======================================================");
  Serial.println("  Task 03: IFTTT Voice Automation (Google Assistant)  ");
  Serial.println("=======================================================");

  pinMode(RELAY_PIN, OUTPUT);
  pinMode(LED_STATUS, OUTPUT);
  digitalWrite(RELAY_PIN, RELAY_INACTIVE);
  digitalWrite(LED_STATUS, LOW);

  connectWiFi();

  // Register subscription for incoming voice commands relayed through IFTTT
  mqtt.subscribe(&voiceFeed);

  connectMQTT();
  Serial.println("[READY] Listening for voice commands via IFTTT & Adafruit IO...");
}

void loop() {
  connectMQTT();

  Adafruit_MQTT_Subscribe *subscription;
  while ((subscription = mqtt.readSubscription(4000))) {
    if (subscription == &voiceFeed) {
      char *voiceCommand = (char *)voiceFeed.lastread;
      unsigned long rxTime = millis();

      Serial.println("\n------------------------------------------------");
      Serial.print("[VOICE TRIGGER RECEIVED] Value: ");
      Serial.println(voiceCommand);
      Serial.print("[TIMESTAMP] ESP32 Millis: ");
      Serial.println(rxTime);

      // Normalize string matching
      if (strcasecmp(voiceCommand, "ON") == 0 || strcmp(voiceCommand, "1") == 0) {
        digitalWrite(RELAY_PIN, RELAY_ACTIVE);
        digitalWrite(LED_STATUS, HIGH);
        Serial.println("[STATUS] Voice command parsed -> Lamp Powered ON");
      }
      else if (strcasecmp(voiceCommand, "OFF") == 0 || strcmp(voiceCommand, "0") == 0) {
        digitalWrite(RELAY_PIN, RELAY_INACTIVE);
        digitalWrite(LED_STATUS, LOW);
        Serial.println("[STATUS] Voice command parsed -> Lamp Powered OFF");
      }
      Serial.println("------------------------------------------------\n");
    }
  }

  if (!mqtt.ping()) {
    mqtt.disconnect();
  }
}

void connectWiFi() {
  Serial.print("[WIFI] Connecting to ");
  Serial.println(WIFI_SSID);
  WiFi.mode(WIFI_STA);
  WiFi.begin(WIFI_SSID, WIFI_PASS);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("\n[WIFI] Connected! IP: " + WiFi.localIP().toString());
}

void connectMQTT() {
  int8_t ret;
  if (mqtt.connected()) return;

  Serial.print("[MQTT] Connecting to Adafruit IO... ");
  uint8_t retries = 3;
  while ((ret = mqtt.connect()) != 0) {
    Serial.println(mqtt.connectErrorString(ret));
    Serial.println("[MQTT] Retrying in 5 seconds...");
    mqtt.disconnect();
    delay(5000);
    retries--;
    if (retries == 0) while (1);
  }
  Serial.println("[MQTT] Connected successfully!");
}
