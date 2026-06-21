import { db } from "./firebase.js";
import {
  addDoc,
  collection,
  serverTimestamp,
  onSnapshot
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

export const logAction = async (uid, action) => {
  await addDoc(collection(db, "logs"), {
    uid,
    action,
    timestamp: serverTimestamp()
  });
};

// LIVE LOGS
window.loadLogs = () => {
  onSnapshot(collection(db, "logs"), (snap) => {
    let html = "";

    snap.forEach(d => {
      const l = d.data();
      html += `<p>${l.uid} → ${l.action}</p>`;
    });

    document.getElementById("logList").innerHTML = html;
  });
};
