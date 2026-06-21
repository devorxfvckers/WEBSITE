import { auth, db } from "./firebase.js";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

import {
  doc,
  setDoc,
  getDoc,
  getDocs,
  collection
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const ADMIN_EMAIL = "admin@gmail.com";

const authDiv = document.getElementById("auth");
const dash = document.getElementById("dashboard");
const adminPanel = document.getElementById("adminPanel");

// SIGNUP
window.signup = async () => {
  const email = emailInput().value;
  const pass = passInput().value;

  const userCred = await createUserWithEmailAndPassword(auth, email, pass);

  await setDoc(doc(db, "users", userCred.user.uid), {
    email,
    role: email === ADMIN_EMAIL ? "admin" : "user"
  });
};

// LOGIN
window.login = async () => {
  await signInWithEmailAndPassword(auth, emailInput().value, passInput().value);
};

// LOGOUT
window.logout = () => signOut(auth);

// AUTH STATE
onAuthStateChanged(auth, async (user) => {
  if (!user) {
    authDiv.classList.remove("hidden");
    dash.classList.add("hidden");
    return;
  }

  authDiv.classList.add("hidden");
  dash.classList.remove("hidden");

  const snap = await getDoc(doc(db, "users", user.uid));
  const role = snap.exists() ? snap.data().role : "user";

  document.getElementById("userInfo").innerText =
    `Logged in: ${user.email} (${role})`;

  if (role === "admin") {
    adminPanel.classList.remove("hidden");
  }
});

// LOAD USERS (ADMIN)
window.loadUsers = async () => {
  const snap = await getDocs(collection(db, "users"));

  let html = "";
  snap.forEach(d => {
    html += `<p>${d.data().email} - ${d.data().role}</p>`;
  });

  document.getElementById("users").innerHTML = html;
};

// helpers
function emailInput() {
  return document.getElementById("email");
}
function passInput() {
  return document.getElementById("password");
}
