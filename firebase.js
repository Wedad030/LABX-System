// Firebase Setup for LABX System
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyA2EBzPCv0Djc72rsnaj0fz2cs3LPGnbro",
  authDomain: "labx-system.firebaseapp.com",
  projectId: "labx-system",
  storageBucket: "labx-system.firebasestorage.app",
  messagingSenderId: "777423398764",
  appId: "1:777423398764:web:d8bf24d18821f84a01c5c9"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Database (we will use it soon)
export const db = getFirestore(app);
