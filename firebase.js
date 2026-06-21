import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCE1Jk_rZPDnYe6VqdP5iG6je5_U2UI5Kk",
  authDomain: "my-dashbord-app.firebaseapp.com",
  projectId: "my-dashbord-app",
  storageBucket: "my-dashbord-app.appspot.com",
  messagingSenderId: "273313686403",
  appId: "1:273313686403:web:0210e790828a98954accb6"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
