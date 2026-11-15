// Task 05 — history view for the Firebase dashboard.
// Listens to the last N records under /telemetry/logs, renders a table + line chart,
// and turns the same records into a CSV file when "Download CSV" is pressed.
import { db } from "./firebase.js";
import {
  ref,
  query,
  orderByKey,
  limitToLast,
  onValue
} from "https://www.gstatic.com/firebasejs/10.13.2/firebase-database.js";

const MAX_RECORDS = 500;
const logsQuery = query(ref(db, "telemetry/logs"), orderByKey(), limitToLast(MAX_RECORDS));

let records = [];
let chart = null;

onValue(logsQuery, (snap) => {
  records = [];
  snap.forEach((child) => {
    const r = child.val();
    records.push({
      time: r.time || new Date(r.timestamp * 1000).toISOString(),
      temperature: Number(r.temperature),
      humidity: Number(r.humidity),
      ldr: Number(r.ldr),
      relay: r.relay,
      mode: r.mode
    });
  });
  renderTable(records.slice(-20).reverse());
  renderChart(records);
  document.getElementById("recordCount").textContent = records.length + " records";
});

function renderTable(rows) {
  document.getElementById("historyBody").innerHTML = rows.map((r) => `
    <tr>
      <td>${r.time}</td><td>${r.temperature.toFixed(1)}</td><td>${r.humidity.toFixed(1)}</td>
      <td>${r.ldr}</td><td>${r.relay}</td><td>${r.mode}</td>
    </tr>`).join("");
}

function renderChart(rows) {
  const labels = rows.map((r) => r.time.slice(11, 19));
  const data = {
    labels,
    datasets: [
      { label: "Temperature (°C)", data: rows.map((r) => r.temperature), yAxisID: "y", borderColor: "#39ff14" },
      { label: "Humidity (%)", data: rows.map((r) => r.humidity), yAxisID: "y", borderColor: "#00f0ff" },
      { label: "Light (ADC)", data: rows.map((r) => r.ldr), yAxisID: "y1", borderColor: "#f59e0b" }
    ]
  };
  if (chart) {
    chart.data = data;
    chart.update();
    return;
  }
  chart = new Chart(document.getElementById("historyChart"), {
    type: "line",
    data,
    options: {
      animation: false,
      scales: {
        y: { position: "left", title: { display: true, text: "°C / %" } },
        y1: { position: "right", min: 0, max: 4095, grid: { drawOnChartArea: false }, title: { display: true, text: "ADC" } }
      }
    }
  });
}

// ---- CSV export (RFC 4180 style: header row + one line per record) ----
function toCSV(rows) {
  const header = ["Timestamp (ISO 8601)", "Temperature (C)", "Humidity (%)", "Light Level (ADC 0-4095)", "Bulb State", "Operating Mode"];
  const lines = rows.map((r) => [r.time, r.temperature.toFixed(1), r.humidity.toFixed(1), r.ldr, r.relay, r.mode].join(","));
  return [header.join(","), ...lines].join("\n");
}

document.getElementById("downloadCsv").onclick = () => {
  const blob = new Blob([toCSV(records)], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `iot_telemetry_${new Date().toISOString().slice(0, 10)}.csv`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
};
