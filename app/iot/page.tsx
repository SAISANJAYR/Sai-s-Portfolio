import type { Metadata } from "next";
import IoTPageClient from "./IoTPageClient";

export const metadata: Metadata = {
  title: "IoT | Suryakumar.dev",
  description:
    "Week 07 — IoT & Embedded Systems: A series of ESP32-based tasks covering HTTP control, MQTT, Adafruit IO, IFTTT automation, Firebase dashboards, sensor integration, relay control, data logging, and CSV export.",
};

export default function IoTPage() {
  return <IoTPageClient />;
}
