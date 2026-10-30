import type { Metadata } from "next";
import IoTPageClient from "./IoTPageClient";

export const metadata: Metadata = {
  title: "Sai Sanjay R | IoT & Embedded Systems (Week 07)",
  description:
    "Student Name: Sai Sanjay R. Week 07 — IoT & Embedded Systems: ESP32-based tasks covering HTTP control, MQTT, Adafruit IO, IFTTT automation, Firebase dashboards, sensor telemetry, relay control, data logging, and CSV analytics export.",
};

export default function IoTPage() {
  return <IoTPageClient />;
}
