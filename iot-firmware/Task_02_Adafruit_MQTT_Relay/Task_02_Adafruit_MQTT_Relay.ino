/*
 * ======================================================================================
 * Task 02: Adafruit IO Dashboard & MQTT Protocol Relay Control
 * Project: IoT & Embedded Systems Lab Manual
 * Author: Sai Sanjay R
 * Hardware: ESP32 DevKit V1, 1-Channel/2-Channel 5V Optocoupled Relay Module, AC Lamp
 * Description: Subscribes to Adafruit IO MQTT broker feed to switch high-voltage loads.
 * ======================================================================================
 */

#include <WiFi.h>
#include <WiFiClient.h>
#include "Adafruit_MQTT.h"
#include "Adafruit_MQTT_Client.h"
#include "config.h"

// Hardware Pin Definitions
const int RELAY_PIN = 4; // GPIO 4 connected to Relay IN1
const int STATUS_LED = 2; // GPIO 2 onboard indicator LED

// Most 5V relay modules are ACTIVE-LOW (LOW energizes the coil)
#define RELAY_ACTIVE   LOW
#define RELAY_INACTIVE HIGH

// Initialize Wi-Fi and MQTT Clients
WiFiClient client;
Adafruit_MQTT_Client mqtt(&client, AIO_SERVER, AIO_SERVERPORT, AIO_USERNAME, AIO_KEY);

// Setup MQTT subscription for the "bulb-control" feed
Adafruit_MQTT_Subscribe relayFeed = Adafruit_MQTT_Subscribe(&mqtt, AIO_USERNAME "/feeds/bulb-control");

// Setup MQTT publisher for status feedback
Adafruit_MQTT_Publish statusFeed = Adafruit_MQTT_Publish(&mqtt, AIO_USERNAME "/feeds/device-status");

// Function prototypes
void connectWiFi();
void MQTT_connect();

void setup() {
  Serial.begin(115200);
  delay(500);

  Serial.println("\n==========================================");
  Serial.println("  Task 02: Adafruit IO MQTT Relay Control ");
  Serial.println("==========================================");

  // Initialize output pins
  pinMode(RELAY_PIN, OUTPUT);
  pinMode(STATUS_LED, OUTPUT);

  // Default to safe state (Relay OFF)
  digitalWrite(RELAY_PIN, RELAY_INACTIVE);
  digitalWrite(STATUS_LED, LOW);

  // Connect to Local Wi-Fi
  connectWiFi();

  // Register MQTT Subscriptions
  mqtt.subscribe(&relayFeed);
  Serial.println("[MQTT] Subscribed to topic: " AIO_USERNAME "/feeds/bulb-control");

  // Connect to Adafruit IO Broker
  MQTT_connect();
  statusFeed.publish("ESP32 Online & Ready");
}

void loop() {
  // Ensure the connection to the MQTT server is alive (reconnect if dropped)
  MQTT_connect();

  // Non-blocking subscription packet listener (waits up to 5000ms for incoming packets)
  Adafruit_MQTT_Subscribe *subscription;
  while ((subscription = mqtt.readSubscription(5000))) {
    if (subscription == &relayFeed) {
      char *payload = (char *)relayFeed.lastread;
      Serial.print("[MQTT INCOMING] Feed: bulb-control | Payload: ");
      Serial.println(payload);

      // Evaluate received message string
      if (strcmp(payload, "ON") == 0 || strcmp(payload, "1") == 0) {
        digitalWrite(RELAY_PIN, RELAY_ACTIVE);
        digitalWrite(STATUS_LED, HIGH);
        Serial.println("[RELAY] Coil ENERGIZED -> Load Turned ON");
        statusFeed.publish("Relay State: ON");
      } 
      else if (strcmp(payload, "OFF") == 0 || strcmp(payload, "0") == 0) {
        digitalWrite(RELAY_PIN, RELAY_INACTIVE);
        digitalWrite(STATUS_LED, LOW);
        Serial.println("[RELAY] Coil DE-ENERGIZED -> Load Turned OFF");
        statusFeed.publish("Relay State: OFF");
      }
    }
  }

  // Ping the broker periodically to maintain keep-alive TCP socket
  if (!mqtt.ping()) {
    mqtt.disconnect();
  }
}

// Wi-Fi Connection Helper
void connectWiFi() {
  Serial.print("[WIFI] Connecting to SSID: ");
  Serial.println(WIFI_SSID);

  WiFi.mode(WIFI_STA);
  WiFi.begin(WIFI_SSID, WIFI_PASS);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  Serial.println("\n[WIFI] Connected! Assigned IP: " + WiFi.localIP().toString());
}

// MQTT Reconnection Routine with Backoff
void MQTT_connect() {
  int8_t ret;

  // Stop if already connected
  if (mqtt.connected()) {
    return;
  }

  Serial.print("[MQTT] Connecting to Adafruit IO Broker... ");

  uint8_t retries = 3;
  while ((ret = mqtt.connect()) != 0) { // connect returns 0 for connected
    Serial.println(mqtt.connectErrorString(ret));
    Serial.println("[MQTT] Retrying connection in 5 seconds...");
    mqtt.disconnect();
    delay(5000);
    retries--;
    if (retries == 0) {
      Serial.println("[MQTT] Retries exhausted. Waiting for watchdog reset.");
      while (1);
    }
  }
  Serial.println("[MQTT] Successfully Connected to Adafruit IO!");
}
