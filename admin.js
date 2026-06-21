import { db } from "./firebase.js";
import {
  collection,
  getDocs,
  doc,
  updateDoc
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

window.loadUsers = async () => {
  const snap = await getDocs(collection(db, "users"));

  let html = "";

  snap.forEach(u => {
    const data = u.data();

    html += `
      <div>
        <p>${data.email}</p>
        <p>${data.role}</p>

        <button onclick="banUser('${u.id}', true)">Ban</button>
        <button onclick="banUser('${u.id}', false)">Unban</button>
      </div>
    `;
  });

  document.getElementById("userList").innerHTML = html;
};

// BAN SYSTEM
window.banUser = async (uid, status) => {
  await updateDoc(doc(db, "users", uid), {
    banned: status
  });

  alert(status ? "User banned" : "User unbanned");
  loadUsers();
};
