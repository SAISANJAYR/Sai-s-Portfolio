import { db } from "./firebase.js";

import {
  ref,
  set,
  onValue
} from "https://www.gstatic.com/firebasejs/10.13.2/firebase-database.js";

const current = ref(db,"current");

// Cache DOM elements
const temp = document.getElementById("temp");
const hum = document.getElementById("hum");
const ldr = document.getElementById("ldr");
const bulbToggle = document.getElementById("bulbToggle");
const modeSelect = document.getElementById("modeSelect");
const threshold = document.getElementById("threshold");
const thValue = document.getElementById("thValue");
const bulbStatus = document.getElementById("bulbStatus");

onValue(current, (snap) => {
  const d = snap.val();
  if(!d) return;

  // Handle differences in case if Arduino sends Temperature or temperature
  const t = d.temperature !== undefined ? d.temperature : (d.Temperature !== undefined ? d.Temperature : "--");
  const h = d.humidity !== undefined ? d.humidity : (d.Humidity !== undefined ? d.Humidity : "--");
  const l = d.ldr !== undefined ? d.ldr : (d.LDR !== undefined ? d.LDR : "---");

  temp.innerHTML = t + " °C";
  hum.innerHTML = h + " %";
  ldr.innerHTML = l;

  if (d.relay) {
    bulbToggle.checked = (d.relay === "ON");
    bulbStatus.innerHTML = d.relay;
  }
  
  if (d.mode) {
    modeSelect.value = d.mode;
  }
  
  if (d.threshold !== undefined) {
    threshold.value = d.threshold;
    thValue.innerHTML = d.threshold;
  }
});

bulbToggle.onchange = () => {
  const newState = bulbToggle.checked ? "ON" : "OFF";
  console.log("Web Dashboard sending to Firebase: Relay -> " + newState);
  set(ref(db, "current/relay"), newState);
};

modeSelect.onchange = () => {
  console.log("Web Dashboard sending to Firebase: Mode -> " + modeSelect.value);
  set(ref(db, "current/mode"), modeSelect.value);
};

threshold.onchange = () => {
  console.log("Web Dashboard sending to Firebase: Threshold -> " + threshold.value);
  set(ref(db, "current/threshold"), Number(threshold.value));
};

threshold.oninput = () => {
  thValue.innerHTML = threshold.value;
};
