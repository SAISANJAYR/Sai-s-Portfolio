#!/usr/bin/env python3
"""
======================================================================================
Task 05: Firebase Realtime Database -> CSV exporter & quick statistics
Author: Sai Sanjay R
Reads every record under /telemetry/logs through the Firebase REST API, writes a CSV
with the same columns as the dashboard's "Download CSV" button, and prints
count / mean / std-dev / min / max for temperature, humidity and light level.

Usage:
    python export_firebase_csv.py <DATABASE_URL>/telemetry/logs.json output.csv
    # add ?auth=<ID_TOKEN> to the URL when the database rules require sign-in
======================================================================================
"""

import csv
import json
import math
import sys
import urllib.request

DEFAULT_URL = "https://smarthome-iot-e9fe6-default-rtdb.asia-southeast1.firebasedatabase.app/telemetry/logs.json"
DEFAULT_OUT = "iot_telemetry_export.csv"

HEADERS = [
    "Timestamp (ISO 8601)",
    "Temperature (C)",
    "Humidity (%)",
    "Light Level (ADC 0-4095)",
    "Bulb State",
    "Operating Mode",
]


def fetch(url):
    print(f"[*] GET {url}")
    req = urllib.request.Request(url, headers={"User-Agent": "iot-telemetry-exporter/1.0"})
    with urllib.request.urlopen(req, timeout=15) as resp:
        return json.loads(resp.read().decode("utf-8"))


def stats(values):
    if not values:
        return dict(count=0, mean=0, std=0, min=0, max=0)
    n = len(values)
    mean = sum(values) / n
    std = math.sqrt(sum((v - mean) ** 2 for v in values) / n)
    return dict(count=n, mean=round(mean, 2), std=round(std, 2),
                min=round(min(values), 2), max=round(max(values), 2))


def main():
    url = sys.argv[1] if len(sys.argv) > 1 else DEFAULT_URL
    out = sys.argv[2] if len(sys.argv) > 2 else DEFAULT_OUT

    data = fetch(url)
    if not isinstance(data, dict) or not data:
        print("[-] No records found under /telemetry/logs")
        return

    rows = []
    for key in sorted(data, key=lambda k: int(k) if str(k).isdigit() else 0):
        r = data[key]
        if not isinstance(r, dict):
            continue
        rows.append([
            r.get("time", ""),
            float(r.get("temperature", 0)),
            float(r.get("humidity", 0)),
            int(r.get("ldr", 0)),
            r.get("relay", "OFF"),
            r.get("mode", ""),
        ])

    with open(out, "w", newline="", encoding="utf-8") as f:
        writer = csv.writer(f)
        writer.writerow(HEADERS)
        writer.writerows(rows)
    print(f"[+] Wrote {len(rows)} records to {out}")

    print("\n" + "=" * 64)
    print(f"{'Metric':<20}| {'Count':<6}| {'Mean':<8}| {'StdDev':<8}| Min / Max")
    print("-" * 64)
    for name, idx in (("Temperature (C)", 1), ("Humidity (%)", 2), ("Light (ADC)", 3)):
        s = stats([row[idx] for row in rows])
        print(f"{name:<20}| {s['count']:<6}| {s['mean']:<8}| {s['std']:<8}| {s['min']} / {s['max']}")
    on = sum(1 for row in rows if row[4] == "ON")
    print("-" * 64)
    print(f"Bulb ON in {on} of {len(rows)} records ({(100 * on / len(rows)):.1f}%)")
    print("=" * 64)


if __name__ == "__main__":
    main()
