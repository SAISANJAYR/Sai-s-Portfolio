/*
 * Task 02: Adafruit IO Dashboard & MQTT Protocol Relay Control
 * Author: Sai Sanjay R
 * Course: ProtoSem - Week 07: IoT & Embedded Systems
 * Hardware: ESP32-WROOM-32 DevKit V1, 2-Channel 5V Optocoupler Relay
 * Description: Subscribes to Adafruit IO MQTT feed over port 1883.
 *              Actuates optocoupler relay driving 230V incandescent bulb.
 */

#include <WiFi.h>
#include "Adafruit_MQTT.h"
#include "Adafruit_MQTT_Client.h"

// Wi-Fi Configuration
#define WLAN_SSID       "YOUR_WIFI_SSID"
#define WLAN_PASS       "YOUR_WIFI_PASSWORD"

// Adafruit IO Broker Credentials
#define AIO_SERVER      "io.adafruit.com"
#define AIO_SERVERPORT  1883
#define AIO_USERNAME    "Sai__0077"
#define AIO_KEY         "YOUR_AIO_KEY"

// Hardware Pin Definitions
#define RELAY_PIN       4   // GPIO 4 connected to Relay IN1

WiFiClient client;
Adafruit_MQTT_Client mqtt(&client, AIO_SERVER, AIO_SERVERPORT, AIO_USERNAME, AIO_KEY);

// Setup MQTT Subscribed Feed
Adafruit_MQTT_Subscribe relayFeed = Adafruit_MQTT_Subscribe(&mqtt, AIO_USERNAME "/feeds/bulb-control");

// Setup MQTT Publishing Feed (for telemetry status confirmation)
Adafruit_MQTT_Publish statusFeed = Adafruit_MQTT_Publish(&mqtt, AIO_USERNAME "/feeds/bulb-status");

// Function to maintain broker connection
void MQTT_connect() {
  int8_t ret;
  if (mqtt.connected()) return;

  Serial.print("[MQTT] Connecting to broker... ");
  uint8_t retries = 3;
  while ((ret = mqtt.connect()) != 0) {
    Serial.println(mqtt.connectErrorString(ret));
    Serial.println("[MQTT] Retrying in 5 seconds...");
    mqtt.disconnect();
    delay(5000);
    retries--;
    if (retries == 0) {
      Serial.println("[MQTT] Connection retry timeout, waiting for next cycle");
      return;
    }
  }
  Serial.println("[MQTT] Connected to io.adafruit.com!");
}

void setup() {
  Serial.begin(115200);
  pinMode(RELAY_PIN, OUTPUT);
  // Ensure relay starts de-energized
  digitalWrite(RELAY_PIN, LOW);

  Serial.println("\n[BOOT] Connecting to Wi-Fi...");
  WiFi.begin(WLAN_SSID, WLAN_PASS);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("\n[WIFI] Connected! IP: ");
  Serial.println(WiFi.localIP());

  // Subscribe to relay control topic
  mqtt.subscribe(&relayFeed);
  Serial.println("[MQTT] Subscribed to feed: " AIO_USERNAME "/feeds/bulb-control");
}

void loop() {
  MQTT_connect();

  Adafruit_MQTT_Subscribe *subscription;
  while ((subscription = mqtt.readSubscription(5000))) {
    if (subscription == &relayFeed) {
      char* msg = (char*)relayFeed.lastread;
      Serial.print("[MQTT RECEIVED] Command: ");
      Serial.println(msg);

      if (strcmp(msg, "ON") == 0 || strcmp(msg, "1") == 0) {
        digitalWrite(RELAY_PIN, HIGH);
        Serial.println("[RELAY] Energized -> Lamp ON");
        statusFeed.publish("ON");
      } else if (strcmp(msg, "OFF") == 0 || strcmp(msg, "0") == 0) {
        digitalWrite(RELAY_PIN, LOW);
        Serial.println("[RELAY] Released -> Lamp OFF");
        statusFeed.publish("OFF");
      }
    }
  }

  // Ping broker periodically to keep connection alive
  if (!mqtt.ping()) {
    mqtt.disconnect();
  }
}
