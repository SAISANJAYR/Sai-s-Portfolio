/*
 * Task 01: ESP32 Web Server & HTML LED Control
 * Author: Sai Sanjay R
 * Course: ProtoSem - Week 07: IoT & Embedded Systems
 * Hardware: ESP32-WROOM-32 DevKit V1
 * Description: Hosts an embedded HTTP web server on local Wi-Fi port 80.
 *              Allows browser clients on the same subnet to toggle GPIO 2 LED.
 */

#include <WiFi.h>
#include <WebServer.h>

// Wi-Fi Network Credentials (2.4 GHz only)
const char* ssid     = "YOUR_WIFI_SSID";
const char* password = "YOUR_WIFI_PASSWORD";

// Initialize WebServer on TCP port 80
WebServer server(80);

// Onboard Blue LED on ESP32 DevKit V1
const int ledPin = 2;

// Handler for root path "/"
void handleRoot() {
  String html = "<!DOCTYPE html><html><head><meta name='viewport' content='width=device-width, initial-scale=1.0'>";
  html += "<title>ESP32 Web Control</title>";
  html += "<style>body{font-family:sans-serif; text-align:center; padding:40px 20px; background:#f4f4f5; color:#18181b;}";
  html += ".card{max-width:400px; margin:0 auto; background:#fff; padding:30px; border-radius:16px; box-shadow:0 4px 20px rgba(0,0,0,0.08);}";
  html += ".btn{display:inline-block; padding:12px 28px; margin:10px; font-weight:bold; color:#fff; text-decoration:none; border-radius:8px;}";
  html += ".btn-on{background:#10b981;} .btn-off{background:#ef4444;}";
  html += ".status{font-size:18px; font-weight:bold; margin-bottom:20px;}</style></head><body>";
  html += "<div class='card'><h2>ESP32 Local Web Control</h2>";
  html += "<p class='status'>LED State: <span style='color:" + String(digitalRead(ledPin) ? "#10b981" : "#71717a") + "'>" + String(digitalRead(ledPin) ? "ON" : "OFF") + "</span></p>";
  html += "<a href='/led/on' class='btn btn-on'>TURN ON</a>";
  html += "<a href='/led/off' class='btn btn-off'>TURN OFF</a>";
  html += "<p style='font-size:12px; color:#a1a1aa; margin-top:24px;'>ProtoSem Week 07 · Sai Sanjay R</p></div></body></html>";

  server.send(200, "text/html", html);
}

// Handler for turning LED ON
void handleLedOn() {
  digitalWrite(ledPin, HIGH);
  server.sendHeader("Location", "/");
  server.send(303); // HTTP 303 See Other redirect
}

// Handler for turning LED OFF
void handleLedOff() {
  digitalWrite(ledPin, LOW);
  server.sendHeader("Location", "/");
  server.send(303);
}

void setup() {
  Serial.begin(115200);
  pinMode(ledPin, OUTPUT);
  digitalWrite(ledPin, LOW);

  Serial.println("\n[BOOT] Initializing ESP32 Web Server...");
  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  Serial.println("\n[WIFI] Connected successfully!");
  Serial.print("[WIFI] IP Address: http://");
  Serial.println(WiFi.localIP());

  // Register HTTP Route Endpoints
  server.on("/",        handleRoot);
  server.on("/led/on",  handleLedOn);
  server.on("/led/off", handleLedOff);

  server.begin();
  Serial.println("[HTTP] Server listening on port 80");
}

void loop() {
  server.handleClient();
}
