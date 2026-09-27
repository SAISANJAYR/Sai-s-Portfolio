"use client";

import Link from "next/link";
import Footer from "@/components/Footer";

export default function IoTSmartHomeCaseStudy() {
  return (
    <div className="min-h-screen bg-offwhite">
      <div className="pt-32 pb-24">
        <div className="max-w-4xl mx-auto px-6">
          
          {/* Breadcrumb */}
          <Link href="/protosem" className="inline-flex items-center text-sm font-mono text-graymid hover:text-charcoal transition-colors mb-12 group">
            <span className="group-hover:-translate-x-1 transition-transform mr-2">←</span> Back to Protosem Logs
          </Link>

          {/* Title Section */}
          <div className="mb-16 animate-[fadeIn_1s_ease-out_forwards]">
            <div className="inline-block font-mono text-xs tracking-[0.15em] uppercase text-graymid mb-4 px-3 py-1 glass rounded-full">
              Protosem Progress Log · Week 07
            </div>
            <h1 className="text-4xl md:text-5xl font-display text-charcoal mb-4 leading-tight">
              IoT & Embedded Systems
            </h1>
            <p className="text-2xl text-graymid mb-8 font-serif italic">
              From Prototype to Production
            </p>
            <p className="text-charcoal/80 leading-relaxed text-lg">
              Explored IoT and embedded systems through a series of ESP32-based assignments involving local HTTP web control, MQTT and Adafruit IO cloud integration, IFTTT event automation, Firebase Realtime Database dashboards, multi-sensor telemetry, relay control, time-series data logging, and CSV data export.
            </p>
          </div>

          {/* Architectural Evolution */}
          <section className="mb-20">
            <div className="flex items-center gap-4 mb-8">
              <span className="font-mono text-sm text-graymid animate-pulse">⚡</span>
              <h2 className="text-xl font-mono uppercase tracking-widest text-charcoal">Architectural Evolution</h2>
              <div className="flex-1 h-px bg-graylight/30"></div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { num: "01", title: "ESP32", sub: "Microcontroller Board" },
                { num: "02", title: "HTTP Server", sub: "Local Web Control" },
                { num: "03", title: "MQTT Broker", sub: "Adafruit IO Cloud" },
                { num: "04", title: "IFTTT Engine", sub: "Event Automation" },
                { num: "05", title: "Firebase RTDB", sub: "Cloud Dashboard" },
                { num: "06", title: "Sensors & Relay", sub: "Hardware Telemetry" },
                { num: "07", title: "Data Logging", sub: "CSV Analytics Export" },
              ].map((step, i) => (
                <div key={i} className="glass p-5 rounded-2xl border border-white/40 flex flex-col items-center text-center hover:bg-white/60 transition-colors">
                  <span className="text-xs font-mono text-graymid mb-2">{step.num}</span>
                  <h3 className="font-display text-sm text-charcoal mb-1">{step.title}</h3>
                  <p className="text-[10px] text-graymid font-mono">{step.sub}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Tasks Navigation */}
          <section className="mb-20 glass p-4 rounded-full border border-white/40 overflow-x-auto hide-scrollbar">
            <div className="flex gap-2 min-w-max">
              {[
                { id: "Task 01", name: "ESP32 Web Server" },
                { id: "Task 02", name: "Adafruit IO Dashboard" },
                { id: "Task 03", name: "IFTTT + Adafruit IO" },
                { id: "Task 04", name: "Firebase Dashboard" },
                { id: "Task 05", name: "Logging & Automation" },
              ].map((t, i) => (
                <a key={i} href={`#task${i+1}`} className="px-5 py-2.5 rounded-full text-xs font-mono bg-white/40 hover:bg-charcoal hover:text-white transition-all text-charcoal/80 flex items-center gap-2">
                  <span className="opacity-50">{t.id}</span>
                  <span>{t.name}</span>
                </a>
              ))}
            </div>
          </section>

          {/* Project Overview */}
          <section className="mb-24">
            <div className="flex items-center gap-4 mb-8">
              <h2 className="text-xl font-mono uppercase tracking-widest text-charcoal">Project Overview & Methodological Progression</h2>
              <div className="flex-1 h-px bg-graylight/30"></div>
            </div>
            <p className="text-charcoal/80 leading-relaxed bg-white/40 p-8 rounded-3xl border border-white/60 shadow-sm">
              The IoT & Embedded Systems module was structured around a hands-on, step-by-step progression of ESP32 assignments. Rather than jumping straight into complex cloud platforms, the work began with low-level local HTTP socket programming to grasp client-server request cycles. It then transitioned to lightweight publish-subscribe protocols (MQTT via Adafruit IO) for cloud telemetry, event-driven webhooks with IFTTT, and finally full-stack real-time database integration using Google Firebase. Each task added a critical piece of IoT architecture — moving from simple LED control to multi-sensor telemetry, relay load actuation, dual manual/automatic operational modes, and browser-based CSV analytics data export.
            </p>
          </section>

          {/* TASK 01 */}
          <section id="task1" className="mb-32">
            <div className="mb-8">
              <span className="font-mono text-sm text-graymid block mb-2">Task 01</span>
              <h2 className="text-3xl font-display text-charcoal mb-2">Local Wi-Fi Embedded HTTP Server</h2>
              <p className="text-graymid font-serif italic">ESP32 Web Server & HTML LED Control</p>
            </div>
            
            <div className="space-y-12">
              <div>
                <h3 className="font-display text-xl text-charcoal mb-3">1. Overview</h3>
                <p className="text-charcoal/80 leading-relaxed">Established a local Wi-Fi HTTP web server directly on the ESP32 microcontroller. The system hosts an interactive HTML interface in memory, allowing client web browsers connected to the same local network to toggle GPIO outputs and control an LED in real time without external cloud dependencies.</p>
              </div>

              <div>
                <h3 className="font-display text-xl text-charcoal mb-4">2. Key Technical Concepts</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {[
                    { t: "ESP32", d: "Low-cost, low-power system-on-a-chip (SoC) microcontroller with integrated Wi-Fi." },
                    { t: "Wi-Fi Networking", d: "Wireless networking protocol enabling the ESP32 to join an AP." },
                    { t: "HTTP Protocol", d: "Application-layer protocol for transmitting web documents over TCP sockets." },
                    { t: "Client/Server Architecture", d: "Client browsers initiate requests, ESP32 server executes commands." },
                    { t: "Request/Response Cycle", d: "Standard HTTP loop where GET/POST requests trigger GPIO state changes." },
                    { t: "REST-style Endpoints", d: "Explicit URL routes mapped to specific digital output functions." },
                    { t: "GPIO", d: "Digital pins on the microcontroller configured to drive signals HIGH/LOW." }
                  ].map((c, i) => (
                    <div key={i} className="glass p-5 rounded-2xl border border-white/40">
                      <h4 className="font-mono text-xs font-semibold text-charcoal mb-2">{c.t}</h4>
                      <p className="text-sm text-charcoal/70">{c.d}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-display text-xl text-charcoal mb-4">3. System Design & Data Flow</h3>
                <div className="glass p-6 rounded-3xl border border-white/40 text-center font-mono text-xs flex flex-wrap justify-center items-center gap-2">
                  <span className="px-3 py-1.5 bg-white rounded-full shadow-sm">Client Web Browser</span><span>→</span>
                  <span className="px-3 py-1.5 bg-white rounded-full shadow-sm">HTTP Request (Wi-Fi)</span><span>→</span>
                  <span className="px-3 py-1.5 bg-charcoal text-white rounded-full">ESP32 Web Server</span><span>→</span>
                  <span className="px-3 py-1.5 bg-white rounded-full shadow-sm">GPIO Pin Control</span><span>→</span>
                  <span className="px-3 py-1.5 bg-white rounded-full shadow-sm">LED Output</span>
                </div>
              </div>

              <div>
                <h3 className="font-display text-xl text-charcoal mb-4">4. Hardware & Software Specifications</h3>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { n: "ESP32 Dev Board", t: "Hardware", d: "NodeMCU / DevKit v1 microcontroller board." },
                    { n: "Micro-USB Cable", t: "Hardware", d: "Provides 5V power and serial communication connection." },
                    { n: "Wi-Fi Router", t: "Hardware", d: "2.4 GHz local wireless network access point." },
                    { n: "Arduino IDE", t: "Software", d: "Development environment for writing C++ code." },
                  ].map((s, i) => (
                    <div key={i} className="bg-white/40 p-4 rounded-xl border border-white/60">
                      <span className="text-[10px] uppercase tracking-widest text-graymid mb-1 block">{s.t}</span>
                      <h4 className="font-semibold text-charcoal text-sm mb-1">{s.n}</h4>
                      <p className="text-xs text-charcoal/70">{s.d}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-display text-xl text-charcoal mb-3">5. Wiring & Electrical Setup</h3>
                <p className="text-charcoal/80 text-sm leading-relaxed">The ESP32 is powered via USB. For testing, the onboard blue LED attached to GPIO 2 was used. Alternatively, an external LED can be wired from GPIO 2 to a 220Ω current-limiting resistor, terminating at GND.</p>
              </div>

              <div>
                <h3 className="font-display text-xl text-charcoal mb-3">6. Implementation Source Code</h3>
                <div className="glass rounded-2xl border border-white/40 overflow-hidden">
                  <div className="p-3 bg-white/40 border-b border-white/40 font-mono text-xs text-graymid">esp32_web_server.ino (C++)</div>
                  <pre className="p-4 overflow-x-auto text-xs font-mono text-charcoal bg-white/20">
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
              
              <div>
                <h3 className="font-display text-xl text-charcoal mb-4">7. System Configuration & Setup Steps</h3>
                <ol className="list-decimal pl-5 space-y-2 text-sm text-charcoal/80 mb-8">
                  <li>Configured Wi-Fi SSID and Password in the C++ header configuration.</li>
                  <li>Initialized Serial Monitor at 115200 baud to retrieve the dynamically assigned local IP address.</li>
                  <li>Configured HTTP server listening on standard port 80.</li>
                  <li>Defined route handlers for HTTP GET '/' and '/led/on' endpoints.</li>
                </ol>
                <div className="glass p-2 rounded-3xl shadow-sm border border-white/40">
                  <img src="/media/html_led_control.png" alt="ESP32 Web Server Control UI" className="w-full rounded-2xl object-cover border border-white/20" />
                </div>
              </div>

              <div className="bg-charcoal text-offwhite p-8 rounded-3xl">
                <h3 className="font-display text-xl mb-4 text-white">9. Reflection</h3>
                <p className="font-serif italic text-white/80 leading-relaxed">
                  "Building an embedded HTTP web server on the ESP32 provided practical insight into low-level socket handling and client/server architecture on memory-constrained microcontrollers. Controlling physical GPIO pins via HTTP requests demonstrated how standard web protocols bridge software interfaces and physical electronic hardware."
                </p>
              </div>
            </div>
          </section>

          {/* TASK 02 */}
          <section id="task2" className="mb-32">
            <div className="mb-8">
              <span className="font-mono text-sm text-graymid block mb-2">Task 02</span>
              <h2 className="text-3xl font-display text-charcoal mb-2">Cloud Telemetry & Remote Relay Control</h2>
              <p className="text-graymid font-serif italic">Adafruit IO Dashboard & MQTT Protocol</p>
            </div>
            
            <div className="space-y-12">
              <div>
                <h3 className="font-display text-xl text-charcoal mb-3">1. Overview</h3>
                <p className="text-charcoal/80 leading-relaxed">Moved beyond local network boundaries by connecting the ESP32 to the Adafruit IO cloud platform using the MQTT protocol. This architecture enables secure bidirectional communication over the internet, allowing remote users to toggle an optocoupler-isolated relay module connected to a light bulb.</p>
              </div>

              <div>
                <h3 className="font-display text-xl text-charcoal mb-4">2. Key Technical Concepts</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {[
                    { t: "MQTT Protocol", d: "Lightweight publish-subscribe messaging protocol for IoT." },
                    { t: "MQTT Broker", d: "Central cloud server that distributes messages to subscribers." },
                    { t: "Publisher / Subscriber", d: "Decoupled roles sending data to topics and listening asynchronously." },
                    { t: "Relay Isolation", d: "Optocoupler mechanism isolating 3.3V logic from higher voltage loads." }
                  ].map((c, i) => (
                    <div key={i} className="glass p-5 rounded-2xl border border-white/40">
                      <h4 className="font-mono text-xs font-semibold text-charcoal mb-2">{c.t}</h4>
                      <p className="text-sm text-charcoal/70">{c.d}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-display text-xl text-charcoal mb-4">3. System Design & Data Flow</h3>
                <div className="glass p-6 rounded-3xl border border-white/40 text-center font-mono text-xs flex flex-wrap justify-center items-center gap-2">
                  <span className="px-3 py-1.5 bg-white rounded-full">Adafruit Dashboard</span><span>→</span>
                  <span className="px-3 py-1.5 bg-charcoal text-white rounded-full">Cloud Broker</span><span>→</span>
                  <span className="px-3 py-1.5 bg-white rounded-full">MQTT (TLS/TCP)</span><span>→</span>
                  <span className="px-3 py-1.5 bg-white rounded-full">ESP32</span><span>→</span>
                  <span className="px-3 py-1.5 bg-white rounded-full">Relay Module</span>
                </div>
              </div>

              <div>
                <h3 className="font-display text-xl text-charcoal mb-3">6. Implementation Source Code</h3>
                <div className="glass rounded-2xl border border-white/40 overflow-hidden mb-8">
                  <div className="p-3 bg-white/40 border-b border-white/40 font-mono text-xs text-graymid">esp32_adafruit_mqtt.ino</div>
                  <pre className="p-4 overflow-x-auto text-xs font-mono text-charcoal bg-white/20">
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
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="glass p-2 rounded-3xl border border-white/40">
                    <img src="/media/media__1790510641197.png" alt="Adafruit IO Dashboard" className="w-full rounded-2xl h-full object-cover" />
                  </div>
                  <div className="glass p-2 rounded-3xl border border-white/40">
                    <img src="/media/relay.jpeg" alt="Relay Module" className="w-full rounded-2xl h-full object-cover" />
                  </div>
                </div>
              </div>

              <div className="bg-charcoal text-offwhite p-8 rounded-3xl">
                <h3 className="font-display text-xl mb-4 text-white">9. Reflection</h3>
                <p className="font-serif italic text-white/80 leading-relaxed">
                  "Migrating from HTTP to MQTT highlighted the efficiency of publish-subscribe architectures for IoT applications. MQTT drastically reduces network overhead and power consumption compared to HTTP polling, while Adafruit IO provided a seamless bridge for cloud-to-device telemetry."
                </p>
              </div>
            </div>
          </section>

          {/* TASK 03 */}
          <section id="task3" className="mb-32">
            <div className="mb-8">
              <span className="font-mono text-sm text-graymid block mb-2">Task 03</span>
              <h2 className="text-3xl font-display text-charcoal mb-2">Event-Driven Cloud Workflows</h2>
              <p className="text-graymid font-serif italic">IFTTT + Adafruit IO IoT Automation</p>
            </div>
            
            <div className="space-y-12">
              <div>
                <h3 className="font-display text-xl text-charcoal mb-3">1. Overview</h3>
                <p className="text-charcoal/80 leading-relaxed">Integrated IFTTT (If This Then That) with Adafruit IO to establish event-driven IoT automations. By configuring HTTP webhooks and applets, external triggers automatically publish payload messages to Adafruit IO MQTT feeds, instructing the ESP32 to actuate connected hardware without human manual intervention.</p>
              </div>

              <div>
                <h3 className="font-display text-xl text-charcoal mb-4">6. Implementation Source Code & Demonstration</h3>
                <div className="glass rounded-2xl border border-white/40 overflow-hidden mb-8">
                  <div className="p-3 bg-white/40 border-b border-white/40 font-mono text-xs text-graymid">ifttt_webhook_trigger.sh (Bash)</div>
                  <pre className="p-4 overflow-x-auto text-xs font-mono text-charcoal bg-white/20">
{`# Triggering IFTTT Webhook via HTTP POST
curl -X POST https://maker.ifttt.com/trigger/YOUR_EVENT_NAME/with/key/YOUR_IFTTT_KEY \\
  -H "Content-Type: application/json" \\
  -d '{"value1":"ON"}'`}
                  </pre>
                </div>
                <div className="glass p-2 rounded-3xl shadow-sm border border-white/40">
                  <video src="/media/voice.mp4" controls className="w-full rounded-2xl aspect-video object-cover"></video>
                </div>
              </div>

              <div className="bg-charcoal text-offwhite p-8 rounded-3xl">
                <h3 className="font-display text-xl mb-4 text-white">9. Reflection</h3>
                <p className="font-serif italic text-white/80 leading-relaxed">
                  "Integrating IFTTT with Adafruit IO demonstrated the power of webhooks and event-driven workflows in IoT. Decoupling hardware execution from cloud trigger engines makes it straightforward to introduce voice control or rule-based automation without changing embedded microcontroller firmware."
                </p>
              </div>
            </div>
          </section>

          {/* TASK 04 */}
          <section id="task4" className="mb-32">
            <div className="mb-8">
              <span className="font-mono text-sm text-graymid block mb-2">Task 04</span>
              <h2 className="text-3xl font-display text-charcoal mb-2">Real-Time Cloud Telemetry & Responsive Web UI</h2>
              <p className="text-graymid font-serif italic">Firebase IoT Monitoring Dashboard</p>
            </div>
            
            <div className="space-y-12">
              <div>
                <h3 className="font-display text-xl text-charcoal mb-3">1. Overview</h3>
                <p className="text-charcoal/80 leading-relaxed">Developed a full-stack IoT telemetry system where the ESP32 streams real-time environmental data (DHT11 temperature/humidity and LDR light level) to Google Firebase Realtime Database. A custom web dashboard visualizes the data instantly and provides bidirectional relay control.</p>
              </div>

              <div>
                <h3 className="font-display text-xl text-charcoal mb-4">2. Key Technical Concepts</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="glass p-5 rounded-2xl border border-white/40">
                    <h4 className="font-mono text-xs font-semibold text-charcoal mb-2">BaaS (Backend-as-a-Service)</h4>
                    <p className="text-sm text-charcoal/70">Cloud model providing database, authentication, and hosting infrastructure out of the box.</p>
                  </div>
                  <div className="glass p-5 rounded-2xl border border-white/40">
                    <h4 className="font-mono text-xs font-semibold text-charcoal mb-2">Firebase Realtime Database</h4>
                    <p className="text-sm text-charcoal/70">A cloud-hosted NoSQL JSON database that synchronizes data across connected clients in real time via WebSockets.</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-display text-xl text-charcoal mb-3">6. Implementation Source Code & Dashboard</h3>
                <div className="glass rounded-2xl border border-white/40 overflow-hidden mb-8">
                  <div className="p-3 bg-white/40 border-b border-white/40 font-mono text-xs text-graymid">esp32_firebase_telemetry.ino</div>
                  <pre className="p-4 overflow-x-auto text-xs font-mono text-charcoal bg-white/20">
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
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div className="glass p-2 rounded-3xl border border-white/40">
                    <img src="/media/media__1790510951506.png" alt="Firebase RTDB" className="w-full rounded-2xl h-full object-cover" />
                  </div>
                  <div className="glass p-2 rounded-3xl border border-white/40">
                    <img src="/media/f1.jpeg" alt="Hardware Prototype" className="w-full rounded-2xl h-full object-cover" />
                  </div>
                </div>
                <div className="glass p-2 rounded-3xl border border-white/40">
                  <video src="/media/dash_vid.mp4" autoPlay loop muted playsInline className="w-full rounded-2xl"></video>
                </div>
              </div>

              <div className="bg-charcoal text-offwhite p-8 rounded-3xl">
                <h3 className="font-display text-xl mb-4 text-white">9. Reflection</h3>
                <p className="font-serif italic text-white/80 leading-relaxed">
                  "Implementing Firebase Realtime Database provided an understanding of cloud-native data synchronization for embedded hardware. Operating a NoSQL real-time database allowed bidirectional communication, where sensor readings streamed to the web interface instantly while UI toggle state changes updated hardware outputs in real time."
                </p>
              </div>
            </div>
          </section>

          {/* TASK 05 */}
          <section id="task5" className="mb-32">
            <div className="mb-8">
              <span className="font-mono text-sm text-graymid block mb-2">Task 05</span>
              <h2 className="text-3xl font-display text-charcoal mb-2">Complete System Integration & CSV Analytics</h2>
              <p className="text-graymid font-serif italic">Firebase Logging, Automation & Data Export</p>
            </div>
            
            <div className="space-y-12">
              <div>
                <h3 className="font-display text-xl text-charcoal mb-3">1. Overview</h3>
                <p className="text-charcoal/80 leading-relaxed">Constructed the complete integrated IoT pipeline featuring dual operating modes (Manual control vs Automatic LDR-based threshold automation), continuous time-series logging to Firebase, historical record storage, and a browser-based CSV data export feature for offline analysis.</p>
              </div>

              <div>
                <h3 className="font-display text-xl text-charcoal mb-4">6. Implementation Source Code & Integration Demo</h3>
                <div className="glass rounded-2xl border border-white/40 overflow-hidden mb-8">
                  <div className="p-3 bg-white/40 border-b border-white/40 font-mono text-xs text-graymid">exportToCSV.ts (TypeScript)</div>
                  <pre className="p-4 overflow-x-auto text-xs font-mono text-charcoal bg-white/20">
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
                <div className="glass p-2 rounded-3xl border border-white/40 mb-4">
                  <img src="/media/media__1790510820927.png" alt="System UI Dashboard" className="w-full rounded-2xl" />
                </div>
                <div className="glass p-2 rounded-3xl border border-white/40">
                  <video src="/media/ada_vid.mp4" controls className="w-full rounded-2xl aspect-video"></video>
                </div>
              </div>

              <div className="bg-charcoal text-offwhite p-8 rounded-3xl">
                <h3 className="font-display text-xl mb-4 text-white">9. Reflection</h3>
                <p className="font-serif italic text-white/80 leading-relaxed">
                  "Building the integrated logging and export system synthesized microcontroller firmware, cloud database architecture, and frontend data visualization. Designing both manual and automatic control modes highlighted the importance of fail-safes and user overrides in automated hardware systems."
                </p>
              </div>
            </div>
          </section>

          {/* Comprehensive Synthesis */}
          <section className="mb-24 text-center">
            <h2 className="text-2xl font-display text-charcoal mb-6">Overall Technical Reflection</h2>
            <p className="text-charcoal/80 leading-relaxed bg-white/40 p-8 rounded-3xl border border-white/60 shadow-sm max-w-3xl mx-auto">
              The IoT & Embedded Systems module provided a hands-on progression from fundamental microcontroller GPIO manipulation to cloud-connected telemetry systems. Starting with local ESP32 HTTP web servers established the mechanics of client-server request cycles on embedded hardware. Moving to MQTT and Adafruit IO demonstrated lightweight publish-subscribe protocols for efficient cloud communication, while IFTTT integration highlighted event-driven workflows. Finally, constructing a full-stack Firebase dashboard with real-time sensor monitoring, threshold automation, and CSV logging demonstrated how hardware, cloud backends, and user interfaces unite into practical IoT solutions.
            </p>
          </section>

        </div>
      </div>
      
      <Footer />
    </div>
  );
}
