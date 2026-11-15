import { auth } from "./firebase.js";
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";

window.login = function() {
  const e = document.getElementById("email").value;
  const p = document.getElementById("password").value;
  
  signInWithEmailAndPassword(auth, e, p)
    .then((userCredential) => {
      // Login successful, redirect to dashboard
      window.location.href = "dashboard.html";
    })
    .catch((error) => {
      // Login failed, show error
      console.error(error);
      document.getElementById("error").innerHTML = error.message;
    });
};
