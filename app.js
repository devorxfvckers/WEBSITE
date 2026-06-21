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

// UI
const authBox = document.getElementById("authBox");
const dashboard = document.getElementById("dashboard");
const adminPanel = document.getElementById("adminPanel");

const ADMIN_EMAIL = "vincesarmiento051@gmail.com";

// SIGN UP
window.signup = async () => {
  const email = emailInput().value;
  const pass = passInput().value;

  const userCred = await createUserWithEmailAndPassword(auth, email, pass);

  await setDoc(doc(db, "users", userCred.user.uid), {
    email,
    role: "user"
  });

  alert("Account created!");
};

// LOGIN
window.login = async () => {
  const email = emailInput().value;
  const pass = passInput().value;

  await signInWithEmailAndPassword(auth, email, pass);
};

// LOGOUT
window.logout = async () => {
  await signOut(auth);
};

// AUTH STATE
onAuthStateChanged(auth, async (user) => {
  if (!user) {
    authBox.classList.remove("hidden");
    dashboard.classList.add("hidden");
    return;
  }

  authBox.classList.add("hidden");
  dashboard.classList.remove("hidden");

  let role = "user";

  const snap = await getDoc(doc(db, "users", user.uid));
  if (snap.exists()) {
    role = snap.data().role;
  }

  document.getElementById("userInfo").innerText =
    `Logged in: ${user.email} (${role})`;

  // AUTO ADMIN DETECT
  if (user.email === ADMIN_EMAIL) {
    adminPanel.classList.remove("hidden");

    // force admin role in DB if not exists
    await setDoc(doc(db, "users", user.uid), {
      email: user.email,
      role: "admin"
    });
  }
});

// LOAD USERS (ADMIN)
window.loadUsers = async () => {
  const snap = await getDocs(collection(db, "users"));

  let html = "";

  snap.forEach((docItem) => {
    const data = docItem.data();
    html += `<p>${data.email} - ${data.role}</p>`;
  });

  document.getElementById("users").innerHTML = html;
};

// HELPERS
function emailInput() {
  return document.getElementById("email");
}

function passInput() {
  return document.getElementById("password");
}    adminPanel.classList.remove("hidden");
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
