// Firebase SDK bootstrap shared by every page of the dashboard (index.html + dashboard.html).
// The web config identifies the Firebase project; it is not a secret. Access control is
// done by Firebase Authentication (who you are) + Realtime Database Rules (what you may do).
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-database.js";

const firebaseConfig = {
  apiKey: "YOUR_FIREBASE_WEB_API_KEY",
  authDomain: "smarthome-iot-e9fe6.firebaseapp.com",
  databaseURL: "https://smarthome-iot-e9fe6-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "smarthome-iot-e9fe6",
  storageBucket: "smarthome-iot-e9fe6.firebasestorage.app",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_FIREBASE_APP_ID"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getDatabase(app);
