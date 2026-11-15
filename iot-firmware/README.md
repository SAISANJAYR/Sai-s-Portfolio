# ProtoSem Week 07 — IoT & Embedded Systems: Source Files
**Author:** Sai Sanjay R
**Documentation page:** [`/iot`](https://github.com/SAISANJAYR/Sai-s-Portfolio/blob/main/app/iot/IoTPageClient.tsx) on my portfolio
**Board:** ESP32 DevKit V1 (ESP32-WROOM-32) · **IDE:** Arduino IDE 2.x + `espressif/arduino-esp32`

Every code listing shown on the IoT page is generated from the files in this folder, so the
page and the repository always contain the same code.

## Files per task

| Task | Folder | Files |
|------|--------|-------|
| **01** ESP32 Web Server & HTML LED Control | [`Task_01_ESP32_WebServer_LED/`](./Task_01_ESP32_WebServer_LED) | `Task_01_ESP32_WebServer_LED.ino` (firmware + embedded HTML/CSS/JS interface) |
| **02** Adafruit IO Dashboard & MQTT | [`Task_02_Adafruit_MQTT_Relay/`](./Task_02_Adafruit_MQTT_Relay) | `Task_02_Adafruit_MQTT_Relay.ino`, `config.h` |
| **03** IFTTT + Adafruit IO Automation | [`Task_03_IFTTT_Voice_Automation/`](./Task_03_IFTTT_Voice_Automation) | `Task_03_IFTTT_Voice_Automation.ino` (the IFTTT applet itself is configured on ifttt.com — documented on the page) |
| **04** Firebase IoT Monitoring Dashboard | [`Task_04_Firebase_Sensors_Telemetry/`](./Task_04_Firebase_Sensors_Telemetry) · [`Task_04_Firebase_Dashboard/`](./Task_04_Firebase_Dashboard) | `Task_04_Firebase_Sensors_Telemetry.ino`; dashboard: `index.html` (login), `dashboard.html`, `css/style.css`, `js/firebase.js`, `js/auth.js`, `js/dashboard.js`, `database.rules.json` |
| **05** Firebase Logging, Automation & Data Export | [`Task_05_Firebase_Logging_CSV/`](./Task_05_Firebase_Logging_CSV) | `Task_05_Firebase_Logging_CSV.ino`, `dashboard/history.html`, `dashboard/js/history.js`, `export_firebase_csv.py`, `sample_sensor_telemetry.csv` |

## Pin map (all tasks)

| ESP32 pin | Connected to | Tasks |
|-----------|--------------|-------|
| GPIO 2 | Onboard blue LED (+ optional external LED via 220 Ω) | 1 (and status LED in 2–5) |
| GPIO 4 | Relay module IN1 (active-LOW) | 2, 3, 4, 5 |
| GPIO 14 | DHT11 data (10 kΩ pull-up) | 4, 5 |
| GPIO 34 | LDR / 10 kΩ divider midpoint (ADC1_CH6) | 4, 5 |
| VIN (5 V) | Relay VCC | 2–5 |
| 3V3 | DHT11 VCC, LDR divider top | 4, 5 |
| GND | Common ground | all |

## Libraries
- `WiFi.h`, `WebServer.h`, `time.h` — part of the ESP32 core
- **Adafruit MQTT Library** (Adafruit) — Tasks 2, 3
- **Firebase Arduino Client Library for ESP8266 and ESP32** (`Firebase_ESP_Client.h`, Mobizt) — Tasks 4, 5
- **DHT sensor library** (Adafruit) + **Adafruit Unified Sensor** — Tasks 4, 5

## Firebase dashboard (Tasks 4–5)
The dashboard is plain HTML + ES modules using the Firebase JS SDK v10 from the gstatic CDN.
Put your own web config in `js/firebase.js`, then deploy with the Firebase CLI:

```bash
firebase login
firebase init hosting database   # public dir = this folder
firebase deploy
```

For Task 5, copy `Task_05_Firebase_Logging_CSV/dashboard/` next to the Task 4 files
(it reuses `css/style.css` and `js/firebase.js`).

Credentials in every file are placeholders (`YOUR_...`). Never commit real Wi-Fi passwords,
AIO keys or device-account passwords.
