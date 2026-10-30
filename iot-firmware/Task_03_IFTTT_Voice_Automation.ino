/*
 * Task 03: IFTTT + Adafruit IO Voice Automation
 * Author: Sai Sanjay R
 * Course: ProtoSem - Week 07: IoT & Embedded Systems
 * Hardware: ESP32-WROOM-32, 2-Channel Relay Module, Google Assistant Client
 * Architecture: Voice Trigger -> Google Assistant -> IFTTT Webhook -> Adafruit IO REST/MQTT -> ESP32 -> Relay
 */

#include <WiFi.h>
#include "Adafruit_MQTT.h"
#include "Adafruit_MQTT_Client.h"

#define WLAN_SSID       "YOUR_WIFI_SSID"
#define WLAN_PASS       "YOUR_WIFI_PASSWORD"

#define AIO_SERVER      "io.adafruit.com"
#define AIO_SERVERPORT  1883
#define AIO_USERNAME    "Sai__0077"
#define AIO_KEY         "YOUR_AIO_KEY"

#define RELAY_PIN       4

WiFiClient client;
Adafruit_MQTT_Client mqtt(&client, AIO_SERVER, AIO_SERVERPORT, AIO_USERNAME, AIO_KEY);
Adafruit_MQTT_Subscribe voiceFeed = Adafruit_MQTT_Subscribe(&mqtt, AIO_USERNAME "/feeds/bulb-control");

void setup() {
  Serial.begin(115200);
  pinMode(RELAY_PIN, OUTPUT);
  digitalWrite(RELAY_PIN, LOW);

  WiFi.begin(WLAN_SSID, WLAN_PASS);
  while (WiFi.status() != WL_CONNECTED) delay(500);

  mqtt.subscribe(&voiceFeed);
  Serial.println("[IFTTT VOICE INTEGRATION] Listening for voice-dispatched MQTT events...");
}

void loop() {
  if (!mqtt.connected()) {
    int8_t ret;
    while ((ret = mqtt.connect()) != 0) {
      Serial.println(mqtt.connectErrorString(ret));
      mqtt.disconnect();
      delay(5000);
    }
  }

  Adafruit_MQTT_Subscribe* sub;
  while ((sub = mqtt.readSubscription(3000))) {
    if (sub == &voiceFeed) {
      char* msg = (char*)voiceFeed.lastread;
      Serial.print("[VOICE EVENT TRIGGERED] Payload: ");
      Serial.println(msg);

      if (strcmp(msg, "ON") == 0) {
        digitalWrite(RELAY_PIN, HIGH);
        Serial.println("[ACTION] Google Assistant Voice -> Relay ENERGIZED");
      }
      if (strcmp(msg, "OFF") == 0) {
        digitalWrite(RELAY_PIN, LOW);
        Serial.println("[ACTION] Google Assistant Voice -> Relay RELEASED");
      }
    }
  }
}
