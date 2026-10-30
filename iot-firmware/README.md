# ProtoSem Week 07 — IoT & Embedded Systems Firmware
**Author:** Sai Sanjay R  
**Target Hardware:** ESP32-WROOM-32 (38-pin DevKit V1)  
**IDE:** Arduino IDE 2.x with espressif/arduino-esp32 core  

## Firmware Sketches

| Task | File | Protocol | Primary Peripherals |
|------|------|----------|---------------------|
| **Task 01** | [`Task_01_ESP32_WebServer_LED.ino`](./Task_01_ESP32_WebServer_LED.ino) | Local HTTP (Port 80) | Onboard LED (GPIO 2) |
| **Task 02** | [`Task_02_Adafruit_MQTT_Relay.ino`](./Task_02_Adafruit_MQTT_Relay.ino) | MQTT (io.adafruit.com:1883) | 2-Ch Optocoupler Relay (GPIO 4), 230V Lamp |
| **Task 03** | [`Task_03_IFTTT_Voice_Automation.ino`](./Task_03_IFTTT_Voice_Automation.ino) | Webhooks + MQTT | Google Assistant, Adafruit IO, Relay (GPIO 4) |
| **Task 04** | [`Task_04_Firebase_Sensors_Telemetry.ino`](./Task_04_Firebase_Sensors_Telemetry.ino) | WebSocket / HTTPS BaaS | DHT11 (GPIO 4), LDR (GPIO 34 ADC1), Relay (GPIO 26) |
| **Task 05** | [`Task_05_Firebase_Logging_CSV.ino`](./Task_05_Firebase_Logging_CSV.ino) | BaaS + NTP + CSV | DHT11, LDR, Auto-Hysteresis Relay, Realtime DB Logging |

## Required Arduino Libraries
- `WebServer.h` (Native in ESP32 Core)
- `WiFi.h` (Native in ESP32 Core)
- `Adafruit MQTT Library` by Adafruit
- `DHT sensor library` by Adafruit
- `Firebase ESP Client` by Mobizt (v4.4.x+)
