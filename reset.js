import { auth } from "./firebase.js";
import { sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

window.resetPassword = async () => {
  const email = document.getElementById("email").value;

  await sendPasswordResetEmail(auth, email);

  alert("Reset email sent!");
};
