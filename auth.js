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
  getDoc
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const ADMIN_EMAIL = "alexjrsullera9@gmail.com";

// SIGNUP
window.signup = async () => {
  const email = emailInput().value;
  const pass = passInput().value;

  const user = await createUserWithEmailAndPassword(auth, email, pass);

  await setDoc(doc(db, "users", user.user.uid), {
    email,
    role: email === ADMIN_EMAIL ? "admin" : "user",
    banned: false
  });
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

// AUTH CHECK
onAuthStateChanged(auth, async (user) => {
  if (!user) return;

  const ref = doc(db, "users", user.uid);
  const snap = await getDoc(ref);

  if (snap.data()?.banned) {
    alert("You are banned");
    await signOut(auth);
    return;
  }
});
