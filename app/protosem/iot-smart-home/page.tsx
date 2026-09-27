"use client";

import Link from "next/link";
import Footer from "@/components/Footer";

export default function IoTSmartHomeCaseStudy() {
  return (
    <div className="min-h-screen bg-offwhite text-charcoal font-sans">
      
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 pb-32 space-y-16">
        
        {/* Header Navigation */}
        <div className="flex items-center justify-between gap-4">
          <Link href="/protosem" className="inline-flex items-center gap-2 px-4 py-2 rounded-xl glass text-charcoal text-xs font-semibold uppercase tracking-wider hover:bg-white/60 transition-all duration-200">
            ← Back to Protosem Logs
          </Link>
          <span className="text-xs font-mono text-graymid">Protosem Progress Log · Week 07</span>
        </div>

        {/* Hero Section */}
        <header className="rounded-3xl p-8 sm:p-12 glass border border-white/60 space-y-8 shadow-sm relative overflow-hidden">
          <div className="space-y-4 max-w-3xl relative z-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/60 border border-white/60 text-charcoal text-xs font-mono uppercase tracking-widest font-bold">
              WEEK 07
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight font-display text-charcoal">IoT & Embedded Systems</h1>
            <p className="text-xl sm:text-2xl font-bold font-serif italic text-graymid">From Prototype to Production</p>
            <p className="text-sm sm:text-base text-charcoal/80 leading-relaxed pt-2">
              Explored IoT and embedded systems through a series of ESP32-based assignments involving local HTTP web control, MQTT and Adafruit IO cloud integration, IFTTT event automation, Firebase Realtime Database dashboards, multi-sensor telemetry, relay control, time-series data logging, and CSV data export.
            </p>
          </div>

          <div className="space-y-4 pt-6 border-t border-white/40 relative z-10">
            <span className="text-xs font-bold uppercase tracking-wider text-charcoal flex items-center gap-2">
              Architectural Evolution
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
              {[
                { num: "01", title: "ESP32", sub: "Microcontroller Board" },
                { num: "02", title: "HTTP Server", sub: "Local Web Control" },
                { num: "03", title: "MQTT Broker", sub: "Adafruit IO Cloud" },
                { num: "04", title: "IFTTT Engine", sub: "Event Automation" },
                { num: "05", title: "Firebase RTDB", sub: "Cloud Dashboard" },
                { num: "06", title: "Sensors & Relay", sub: "Hardware Telemetry" },
                { num: "07", title: "Data Logging", sub: "CSV Analytics Export" },
              ].map((step, i) => (
                <div key={i} className="p-3 rounded-xl bg-white/40 border border-white/60 text-center space-y-1 hover:bg-white/70 transition-colors">
                  <span className="text-[10px] font-mono font-bold text-graymid block">{step.num}</span>
                  <span className="text-xs font-bold text-charcoal block truncate">{step.title}</span>
                  <span className="text-[9px] text-charcoal/70 block truncate">{step.sub}</span>
                </div>
              ))}
            </div>
          </div>
        </header>

        {/* Tasks Navigation */}
        <nav className="sticky top-6 z-40 w-full rounded-full p-2 sm:p-3 glass border border-white/60 shadow-sm my-8">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1 px-1">
            <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-graymid shrink-0 border-r border-white/40 mr-1">
              Tasks Navigation
            </div>
            {[
              { id: "Task 01", name: "ESP32 Web Server", href: "#task-01" },
              { id: "Task 02", name: "Adafruit IO Dashboard", href: "#task-02" },
              { id: "Task 03", name: "IFTTT + Adafruit IO", href: "#task-03" },
              { id: "Task 04", name: "Firebase Dashboard", href: "#task-04" },
              { id: "Task 05", name: "Logging & Automation", href: "#task-05" },
            ].map((t, i) => (
              <a key={i} href={t.href} className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all duration-200 shrink-0 bg-white/40 text-charcoal/80 border border-white/40 hover:text-charcoal hover:bg-white/80">
                <span className="font-mono text-[10px] opacity-60">{t.id}</span>
                <span className="truncate">{t.name}</span>
              </a>
            ))}
          </div>
        </nav>

        {/* Project Overview */}
        <section className="rounded-3xl p-6 sm:p-8 glass border border-white/60 space-y-4 shadow-sm">
          <div className="flex items-center gap-2 border-b border-white/40 pb-3">
            <h2 className="text-sm font-bold text-charcoal uppercase tracking-wider">Project Overview & Methodological Progression</h2>
          </div>
          <p className="text-xs sm:text-sm text-charcoal/80 leading-relaxed bg-white/40 p-6 rounded-2xl">
            The IoT & Embedded Systems module was structured around a hands-on, step-by-step progression of ESP32 assignments. Rather than jumping straight into complex cloud platforms, the work began with low-level local HTTP socket programming to grasp client-server request cycles. It then transitioned to lightweight publish-subscribe protocols (MQTT via Adafruit IO) for cloud telemetry, event-driven webhooks with IFTTT, and finally full-stack real-time database integration using Google Firebase. Each task added a critical piece of IoT architecture — moving from simple LED control to multi-sensor telemetry, relay load actuation, dual manual/automatic operational modes, and browser-based CSV analytics data export.
          </p>
        </section>

        {/* TASK 01 */}
        <section id="task-01" className="rounded-3xl p-6 sm:p-10 glass border border-white/60 space-y-10 shadow-sm scroll-mt-36">
          <div className="space-y-3 border-b border-white/40 pb-6">
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 rounded-md bg-white/60 border border-white/60 text-charcoal text-xs font-mono font-bold tracking-wider uppercase">Task 01</span>
              <span className="text-xs text-graymid font-medium font-serif italic">Local Wi-Fi Embedded HTTP Server</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-charcoal font-display tracking-tight">ESP32 Web Server & HTML LED Control</h2>
          </div>

          <div className="space-y-3">
            <h3 className="text-xs font-bold text-charcoal uppercase tracking-wider flex items-center gap-2">1. Overview</h3>
            <p className="text-sm sm:text-base text-charcoal/80 leading-relaxed bg-white/40 p-5 rounded-xl border border-white/60">
              Established a local Wi-Fi HTTP web server directly on the ESP32 microcontroller. The system hosts an interactive HTML interface in memory, allowing client web browsers connected to the same local network to toggle GPIO outputs and control an LED in real time without external cloud dependencies.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-xs font-bold text-charcoal uppercase tracking-wider flex items-center gap-2">2. Key Technical Concepts</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { t: "ESP32", d: "A low-cost, low-power system-on-a-chip (SoC) microcontroller with integrated Wi-Fi." },
                { t: "Wi-Fi Networking", d: "Wireless networking protocol enabling the ESP32 to join an AP." },
                { t: "HTTP Protocol", d: "Application-layer protocol for transmitting web documents over TCP sockets." },
                { t: "Client/Server Architecture", d: "Client browsers initiate requests, ESP32 server executes commands." },
                { t: "Request/Response Cycle", d: "Standard HTTP loop where GET/POST requests trigger GPIO state changes." },
                { t: "REST-style Endpoints", d: "Explicit URL routes mapped to specific digital output functions." },
                { t: "GPIO", d: "Digital pins on the microcontroller configured to drive signals HIGH/LOW." }
              ].map((c, i) => (
                <div key={i} className="p-4 rounded-xl glass border border-white/60 space-y-1.5 hover:bg-white/60 transition-colors">
                  <h4 className="text-xs font-bold text-charcoal font-mono">{c.t}</h4>
                  <p className="text-xs text-charcoal/70 leading-relaxed">{c.d}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-xs font-bold text-charcoal uppercase tracking-wider flex items-center gap-2">3. System Design & Data Flow</h3>
            <div className="rounded-3xl p-6 glass border border-white/60 space-y-4 shadow-sm">
              <div className="flex flex-wrap md:flex-nowrap items-center justify-between gap-3 overflow-x-auto py-2">
                {["Client Web Browser", "HTTP Request (Wi-Fi)", "ESP32 Web Server", "GPIO Pin Control", "LED Output"].map((step, idx) => (
                  <div key={idx} className="flex-1 min-w-[130px] p-3 rounded-xl bg-white border border-white/60 text-center space-y-1 shadow-sm group">
                    <span className="text-[10px] font-mono font-bold text-graymid block">STEP 0{idx+1}</span>
                    <span className="text-xs font-semibold text-charcoal block leading-snug">{step}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-xs font-bold text-charcoal uppercase tracking-wider flex items-center gap-2">6. Implementation Source Code</h3>
            <div className="rounded-2xl border border-white/60 overflow-hidden glass shadow-sm">
              <div className="flex items-center justify-between gap-4 px-4 py-3 bg-white/40 border-b border-white/40">
                <span className="text-xs font-mono font-bold text-charcoal">esp32_web_server.ino</span>
              </div>
              <pre className="p-4 overflow-x-auto text-xs sm:text-sm font-mono text-charcoal bg-white/20 leading-relaxed">
{`#include <WiFi.h>
#include <WebServer.h>

const char* ssid = "YOUR_WIFI_SSID";
const char* password = "YOUR_WIFI_PASSWORD";

WebServer server(80);
const int ledPin = 2;

void handleRoot() {
  String html = "<html><body><h1>ESP32 Local Web Control</h1><a href='/led/on'>TURN ON</a> <a href='/led/off'>TURN OFF</a></body></html>";
  server.send(200, "text/html", html);
}

void handleLedOn() {
  digitalWrite(ledPin, HIGH);
  server.sendHeader("Location", "/");
  server.send(303);
}

void handleLedOff() {
  digitalWrite(ledPin, LOW);
  server.sendHeader("Location", "/");
  server.send(303);
}

void setup() {
  Serial.begin(115200);
  pinMode(ledPin, OUTPUT);
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) delay(500);
  server.on("/", handleRoot);
  server.on("/led/on", handleLedOn);
  server.on("/led/off", handleLedOff);
  server.begin();
}

void loop() {
  server.handleClient();
}`}
              </pre>
            </div>
          </div>

          <div className="space-y-6 border-t border-white/40 pt-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-charcoal uppercase tracking-wider flex items-center gap-2">8. Evidence</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="rounded-2xl overflow-hidden border border-white/60 glass p-2 shadow-sm">
                <div className="relative aspect-video rounded-xl overflow-hidden bg-white/20 border border-white/40">
                  <img src="/media/html_led_control.png" alt="HTML LED UI" className="w-full h-full object-cover" />
                </div>
              </div>
            </div>
          </div>
          
          <div className="space-y-3 bg-charcoal p-6 rounded-3xl border border-black/10">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider">9. Reflection</h3>
            <p className="text-xs sm:text-sm text-offwhite leading-relaxed font-serif italic">
              "Building an embedded HTTP web server on the ESP32 provided practical insight into low-level socket handling and client/server architecture on memory-constrained microcontrollers."
            </p>
          </div>
        </section>

        {/* TASK 02 */}
        <section id="task-02" className="rounded-3xl p-6 sm:p-10 glass border border-white/60 space-y-10 shadow-sm scroll-mt-36">
          <div className="space-y-3 border-b border-white/40 pb-6">
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 rounded-md bg-white/60 border border-white/60 text-charcoal text-xs font-mono font-bold tracking-wider uppercase">Task 02</span>
              <span className="text-xs text-graymid font-medium font-serif italic">Cloud Telemetry & Remote Relay Control</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-charcoal font-display tracking-tight">Adafruit IO Dashboard & MQTT Protocol</h2>
          </div>

          <div className="space-y-3">
            <h3 className="text-xs font-bold text-charcoal uppercase tracking-wider flex items-center gap-2">1. Overview</h3>
            <p className="text-sm sm:text-base text-charcoal/80 leading-relaxed bg-white/40 p-5 rounded-xl border border-white/60">
              Moved beyond local network boundaries by connecting the ESP32 to the Adafruit IO cloud platform using the MQTT protocol. This architecture enables secure bidirectional communication over the internet, allowing remote users to toggle an optocoupler-isolated relay module connected to a light bulb.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-xs font-bold text-charcoal uppercase tracking-wider flex items-center gap-2">6. Implementation Source Code</h3>
            <div className="rounded-2xl border border-white/60 overflow-hidden glass shadow-sm">
              <div className="flex items-center justify-between gap-4 px-4 py-3 bg-white/40 border-b border-white/40">
                <span className="text-xs font-mono font-bold text-charcoal">esp32_adafruit_mqtt.ino</span>
              </div>
              <pre className="p-4 overflow-x-auto text-xs sm:text-sm font-mono text-charcoal bg-white/20 leading-relaxed">
{`#include <WiFi.h>
#include "Adafruit_MQTT.h"
#include "Adafruit_MQTT_Client.h"

#define AIO_SERVER      "io.adafruit.com"
#define AIO_SERVERPORT  1883
#define AIO_USERNAME    "YOUR_ADAFRUIT_IO_USERNAME"
#define AIO_KEY         "YOUR_ADAFRUIT_IO_KEY"

WiFiClient client;
Adafruit_MQTT_Client mqtt(&client, AIO_SERVER, AIO_SERVERPORT, AIO_USERNAME, AIO_KEY);
Adafruit_MQTT_Subscribe relayFeed = Adafruit_MQTT_Subscribe(&mqtt, AIO_USERNAME "/feeds/relay-control");

const int RELAY_PIN = 4;

void setup() {
  Serial.begin(115200);
  pinMode(RELAY_PIN, OUTPUT);
  WiFi.begin("SSID", "PASS");
  while (WiFi.status() != WL_CONNECTED) delay(500);
  mqtt.subscribe(&relayFeed);
}

void loop() {
  mqtt.connect();
  Adafruit_MQTT_Subscribe *subscription;
  while ((subscription = mqtt.readSubscription(2000))) {
    if (subscription == &relayFeed) {
      char *message = (char *)relayFeed.lastread;
      if (strcmp(message, "ON") == 0) digitalWrite(RELAY_PIN, HIGH);
      else if (strcmp(message, "OFF") == 0) digitalWrite(RELAY_PIN, LOW);
    }
  }
}`}
              </pre>
            </div>
          </div>

          <div className="space-y-6 border-t border-white/40 pt-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-charcoal uppercase tracking-wider flex items-center gap-2">8. Evidence</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="rounded-2xl overflow-hidden border border-white/60 glass p-2 shadow-sm">
                <div className="relative aspect-video rounded-xl overflow-hidden bg-white/20 border border-white/40">
                  <img src="/media/media__1790510641197.png" alt="Adafruit IO Dashboard" className="w-full h-full object-cover" />
                </div>
              </div>
              <div className="rounded-2xl overflow-hidden border border-white/60 glass p-2 shadow-sm">
                <div className="relative aspect-video rounded-xl overflow-hidden bg-white/20 border border-white/40">
                  <img src="/media/relay.jpeg" alt="Relay Module" className="w-full h-full object-cover" />
                </div>
              </div>
            </div>
          </div>
        </section>


        {/* TASK 03 */}
        <section id="task-03" className="rounded-3xl p-6 sm:p-10 glass border border-white/60 space-y-10 shadow-sm scroll-mt-36">
          <div className="space-y-3 border-b border-white/40 pb-6">
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 rounded-md bg-white/60 border border-white/60 text-charcoal text-xs font-mono font-bold tracking-wider uppercase">Task 03</span>
              <span className="text-xs text-graymid font-medium font-serif italic">Event-Driven Cloud Workflows</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-charcoal font-display tracking-tight">IFTTT + Adafruit IO IoT Automation</h2>
          </div>

          <div className="space-y-3">
            <h3 className="text-xs font-bold text-charcoal uppercase tracking-wider flex items-center gap-2">1. Overview</h3>
            <p className="text-sm sm:text-base text-charcoal/80 leading-relaxed bg-white/40 p-5 rounded-xl border border-white/60">
              Integrated IFTTT (If This Then That) with Adafruit IO to establish event-driven IoT automations. By configuring HTTP webhooks and applets, external triggers automatically publish payload messages to Adafruit IO MQTT feeds.
            </p>
          </div>

          <div className="space-y-6 border-t border-white/40 pt-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-charcoal uppercase tracking-wider flex items-center gap-2">8. Evidence</h3>
            </div>
            <div className="grid grid-cols-1 gap-4">
              <div className="rounded-2xl overflow-hidden border border-white/60 glass p-2 shadow-sm">
                <div className="relative aspect-video rounded-xl overflow-hidden bg-white/20 border border-white/40">
                  <video src="/media/voice.mp4" controls className="w-full h-full object-cover" />
                </div>
              </div>
            </div>
          </div>
        </section>


        {/* TASK 04 */}
        <section id="task-04" className="rounded-3xl p-6 sm:p-10 glass border border-white/60 space-y-10 shadow-sm scroll-mt-36">
          <div className="space-y-3 border-b border-white/40 pb-6">
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 rounded-md bg-white/60 border border-white/60 text-charcoal text-xs font-mono font-bold tracking-wider uppercase">Task 04</span>
              <span className="text-xs text-graymid font-medium font-serif italic">Real-Time Cloud Telemetry</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-charcoal font-display tracking-tight">Firebase IoT Monitoring Dashboard</h2>
          </div>

          <div className="space-y-4">
            <h3 className="text-xs font-bold text-charcoal uppercase tracking-wider flex items-center gap-2">6. Implementation Source Code</h3>
            <div className="rounded-2xl border border-white/60 overflow-hidden glass shadow-sm">
              <div className="flex items-center justify-between gap-4 px-4 py-3 bg-white/40 border-b border-white/40">
                <span className="text-xs font-mono font-bold text-charcoal">esp32_firebase_telemetry.ino</span>
              </div>
              <pre className="p-4 overflow-x-auto text-xs sm:text-sm font-mono text-charcoal bg-white/20 leading-relaxed">
{`#include <WiFi.h>
#include <Firebase_ESP_Client.h>
#include <DHT.h>

void loop() {
  float t = dht.readTemperature();
  float h = dht.readHumidity();
  int ldr = analogRead(LDRPIN);

  if (!isnan(t) && !isnan(h)) {
    Firebase.RTDB.setFloat(&fbdo, "/sensorData/temperature", t);
    Firebase.RTDB.setFloat(&fbdo, "/sensorData/humidity", h);
    Firebase.RTDB.setInt(&fbdo, "/sensorData/lightLevel", ldr);
  }

  // Check remote relay command from Firebase
  if (Firebase.RTDB.getBool(&fbdo, "/appliances/bulbState")) {
    bool state = fbdo.to<bool>();
    digitalWrite(RELAYPIN, state ? HIGH : LOW);
  }
  delay(5000);
}`}
              </pre>
            </div>
          </div>

          <div className="space-y-6 border-t border-white/40 pt-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-charcoal uppercase tracking-wider flex items-center gap-2">8. Evidence</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="rounded-2xl overflow-hidden border border-white/60 glass p-2 shadow-sm">
                <div className="relative aspect-video rounded-xl overflow-hidden bg-white/20 border border-white/40">
                  <img src="/media/media__1790510951506.png" alt="Firebase RTDB" className="w-full h-full object-cover" />
                </div>
              </div>
              <div className="rounded-2xl overflow-hidden border border-white/60 glass p-2 shadow-sm">
                <div className="relative aspect-video rounded-xl overflow-hidden bg-white/20 border border-white/40">
                  <img src="/media/f1.jpeg" alt="Prototype Hardware" className="w-full h-full object-cover" />
                </div>
              </div>
              <div className="rounded-2xl overflow-hidden border border-white/60 glass p-2 shadow-sm md:col-span-2">
                <div className="relative aspect-video rounded-xl overflow-hidden bg-white/20 border border-white/40">
                  <video src="/media/ada_vid.mp4" controls className="w-full h-full object-cover" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* TASK 05 */}
        <section id="task-05" className="rounded-3xl p-6 sm:p-10 glass border border-white/60 space-y-10 shadow-sm scroll-mt-36">
          <div className="space-y-3 border-b border-white/40 pb-6">
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 rounded-md bg-white/60 border border-white/60 text-charcoal text-xs font-mono font-bold tracking-wider uppercase">Task 05</span>
              <span className="text-xs text-graymid font-medium font-serif italic">Complete System Integration & CSV Analytics</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-charcoal font-display tracking-tight">Firebase Logging & Automation</h2>
          </div>

          <div className="space-y-4">
            <h3 className="text-xs font-bold text-charcoal uppercase tracking-wider flex items-center gap-2">6. Implementation Source Code</h3>
            <div className="rounded-2xl border border-white/60 overflow-hidden glass shadow-sm">
              <div className="flex items-center justify-between gap-4 px-4 py-3 bg-white/40 border-b border-white/40">
                <span className="text-xs font-mono font-bold text-charcoal">exportToCSV.ts</span>
              </div>
              <pre className="p-4 overflow-x-auto text-xs sm:text-sm font-mono text-charcoal bg-white/20 leading-relaxed">
{`export function downloadSensorDataCSV(dataArray) {
  const headers = ["Timestamp", "Temperature (C)", "Humidity (%)", "Light Level (ADC)", "Bulb State", "Mode"];
  const rows = dataArray.map(row => [
    row.timestamp, row.temperature, row.humidity, row.lightLevel,
    row.bulbState ? "ON" : "OFF", row.mode
  ]);

  const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map(e => e.join(","))].join("\\n");
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", \`esp32_sensor_log_\${Date.now()}.csv\`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}`}
              </pre>
            </div>
          </div>

          <div className="space-y-6 border-t border-white/40 pt-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-charcoal uppercase tracking-wider flex items-center gap-2">8. Evidence</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="rounded-2xl overflow-hidden border border-white/60 glass p-2 shadow-sm">
                <div className="relative aspect-video rounded-xl overflow-hidden bg-white/20 border border-white/40">
                  <img src="/media/media__1790510820927.png" alt="Custom System UI" className="w-full h-full object-cover" />
                </div>
              </div>
              <div className="rounded-2xl overflow-hidden border border-white/60 glass p-2 shadow-sm md:col-span-2">
                <div className="relative aspect-video rounded-xl overflow-hidden bg-white/20 border border-white/40">
                  <video src="/media/dash_vid.mp4" controls className="w-full h-full object-cover" />
                </div>
              </div>
            </div>
          </div>
        </section>

      </div>
      
      <Footer />
    </div>
  );
}
