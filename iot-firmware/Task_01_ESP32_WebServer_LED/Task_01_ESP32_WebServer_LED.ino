/*
 * ======================================================================================
 * Task 01: ESP32 Web Server & HTML LED Control
 * Project: IoT & Embedded Systems Lab Manual
 * Author: Sai Sanjay R
 * Hardware: ESP32 DevKit V1 (30-pin / 38-pin), 5mm Blue LED, 220 Ohm Resistor, Breadboard
 * Description: Hosts an HTTP web server on port 80 to toggle GPIO 2 LED via browser.
 * ======================================================================================
 */

#include <WiFi.h>
#include <WebServer.h>

// Wi-Fi Credentials - Replace with your 2.4 GHz network credentials
const char* ssid     = "YOUR_WIFI_SSID";
const char* password = "YOUR_WIFI_PASSWORD";

// Pin Configuration
const int LED_PIN = 2; // Onboard LED on ESP32 DevKit and external breadboard LED

// Initialize WebServer on port 80
WebServer server(80);

// Global state tracking
bool ledState = false;
unsigned long bootTime = 0;

// Modern HTML + CSS interface served directly from ESP32 PROGMEM
const char INDEX_HTML[] PROGMEM = R"rawliteral(
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>ESP32 Local Web Control</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      background: radial-gradient(circle at 50% 20%, #1e2638 0%, #0d111a 100%);
      color: #e2e8f0;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 1.5rem;
    }
    .card {
      background: rgba(22, 27, 40, 0.85);
      backdrop-filter: blur(16px);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 28px;
      padding: 2.5rem 2rem;
      max-width: 440px;
      width: 100%;
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.65), 0 0 0 1px rgba(255, 255, 255, 0.05);
      text-align: center;
    }
    h1 {
      font-size: 1.65rem;
      font-weight: 800;
      letter-spacing: -0.02em;
      margin-bottom: 0.75rem;
      color: #ffffff;
    }
    .badge {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 0.85rem;
      color: #94a3b8;
      background: rgba(255, 255, 255, 0.04);
      padding: 0.4rem 0.9rem;
      border-radius: 9999px;
      border: 1px solid rgba(255, 255, 255, 0.08);
      margin-bottom: 0.35rem;
    }
    .status-dot {
      width: 9px;
      height: 9px;
      border-radius: 50%;
      background: #10b981;
      box-shadow: 0 0 10px #10b981;
      animation: pulse 2s infinite;
    }
    @keyframes pulse {
      0% { transform: scale(0.95); opacity: 0.8; }
      50% { transform: scale(1.15); opacity: 1; }
      100% { transform: scale(0.95); opacity: 0.8; }
    }
    .device-sub {
      font-size: 0.8rem;
      color: #64748b;
      margin-bottom: 2rem;
      font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
    }
    .btn-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1rem;
      margin-bottom: 2rem;
    }
    button {
      cursor: pointer;
      border: none;
      border-radius: 18px;
      padding: 1.1rem 1rem;
      font-size: 1rem;
      font-weight: 700;
      letter-spacing: 0.04em;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.6rem;
      transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    }
    .btn-on {
      background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
      color: #ffffff;
      box-shadow: 0 10px 25px -5px rgba(37, 99, 235, 0.5);
    }
    .btn-on:hover {
      transform: translateY(-2px);
      box-shadow: 0 14px 30px -5px rgba(37, 99, 235, 0.7);
    }
    .btn-off {
      background: rgba(255, 255, 255, 0.08);
      color: #94a3b8;
      border: 1px solid rgba(255, 255, 255, 0.12);
    }
    .btn-off:hover {
      background: rgba(255, 255, 255, 0.14);
      color: #f1f5f9;
      transform: translateY(-2px);
    }
    button:active {
      transform: translateY(0);
    }
    .footer-panel {
      border-top: 1px solid rgba(255, 255, 255, 0.08);
      padding-top: 1.25rem;
      font-size: 0.75rem;
      color: #64748b;
      display: flex;
      flex-direction: column;
      gap: 0.35rem;
    }
    .state-indicator {
      font-family: ui-monospace, monospace;
      font-weight: 600;
      color: #38bdf8;
    }
  </style>
</head>
<body>
  <div class="card">
    <h1>ESP32 Local Web Control</h1>
    
    <div class="badge">
      <span class="status-dot"></span>
      <span>Status: <strong>Connected</strong> (<span id="ip-addr">192.168.1.50</span>)</span>
    </div>
    <div class="device-sub">Device: ESP32-WROOM-32 | GPIO 2</div>

    <div class="btn-grid">
      <button class="btn-on" onclick="setLed(true)">
        <span>&#x1F4A1;</span> TURN ON
      </button>
      <button class="btn-off" onclick="setLed(false)">
        <span>&#x25CB;</span> TURN OFF
      </button>
    </div>

    <div class="footer-panel">
      <div>Control Panel &bull; Current Output: <span id="led-state" class="state-indicator">OFF</span></div>
      <div>ESP32 Device Controller v1.0 &bull; Port: 80</div>
    </div>
  </div>

  <script>
    async function setLed(state) {
      const endpoint = state ? '/on' : '/off';
      try {
        const res = await fetch(endpoint, { method: 'POST' });
        const data = await res.json();
        updateUI(data.state);
      } catch (err) {
        console.error('Command failed:', err);
      }
    }

    async function checkStatus() {
      try {
        const res = await fetch('/status');
        const data = await res.json();
        updateUI(data.state);
        document.getElementById('ip-addr').innerText = data.ip;
      } catch (err) {
        console.error('Status poll error:', err);
      }
    }

    function updateUI(isOn) {
      const el = document.getElementById('led-state');
      el.innerText = isOn ? 'ON (ACTIVE)' : 'OFF (STANDBY)';
      el.style.color = isOn ? '#38bdf8' : '#94a3b8';
    }

    setInterval(checkStatus, 3000);
    checkStatus();
  </script>
</body>
</html>
)rawliteral";

// HTTP Handler: Root "/"
void handleRoot() {
  server.send_P(200, "text/html", INDEX_HTML);
}

// HTTP Handler: Turn LED ON
void handleLedOn() {
  ledState = true;
  digitalWrite(LED_PIN, HIGH);
  Serial.println("[ACTION] LED turned ON via Web Request");
  server.send(200, "application/json", "{\"status\":\"ok\",\"state\":true}");
}

// HTTP Handler: Turn LED OFF
void handleLedOff() {
  ledState = false;
  digitalWrite(LED_PIN, LOW);
  Serial.println("[ACTION] LED turned OFF via Web Request");
  server.send(200, "application/json", "{\"status\":\"ok\",\"state\":false}");
}

// HTTP Handler: Get Status JSON
void handleStatus() {
  String json = "{\"status\":\"ok\",\"state\":" + String(ledState ? "true" : "false") + 
                ",\"ip\":\"" + WiFi.localIP().toString() + "\"" +
                ",\"uptime\":" + String(millis() / 1000) + "}";
  server.send(200, "application/json", json);
}

// HTTP Handler: 404 Not Found
void handleNotFound() {
  server.send(404, "text/plain", "404 Not Found");
}

void setup() {
  Serial.begin(115200);
  delay(500);

  Serial.println("\n==========================================");
  Serial.println("  Task 01: ESP32 Web Server LED Control   ");
  Serial.println("==========================================");

  // Initialize GPIO 2 as OUTPUT
  pinMode(LED_PIN, OUTPUT);
  digitalWrite(LED_PIN, LOW);

  // Connect to Wi-Fi
  Serial.print("[WIFI] Connecting to ");
  Serial.println(ssid);
  WiFi.mode(WIFI_STA);
  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  Serial.println("\n[WIFI] Connected successfully!");
  Serial.print("[WIFI] IP Address: http://");
  Serial.println(WiFi.localIP());

  // Attach server route callbacks
  server.on("/", HTTP_GET, handleRoot);
  server.on("/on", HTTP_ANY, handleLedOn);
  server.on("/off", HTTP_ANY, handleLedOff);
  server.on("/status", HTTP_GET, handleStatus);
  server.onNotFound(handleNotFound);

  // Start Web Server
  server.begin();
  Serial.println("[SERVER] HTTP server started on port 80");
  Serial.println("[READY] Open your web browser and navigate to the IP address above.");
}

void loop() {
  // Handle incoming HTTP client sockets
  server.handleClient();
}
