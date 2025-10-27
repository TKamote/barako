// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB5Mpei187CTg-ILaMuFev8b4nxTfqR-hI",
  authDomain: "barako-tournament.firebaseapp.com",
  projectId: "barako-tournament",
  storageBucket: "barako-tournament.firebasestorage.app",
  messagingSenderId: "686748232951",
  appId: "1:686748232951:web:23b88cbc413dabf4ddf7f2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

export default app;
