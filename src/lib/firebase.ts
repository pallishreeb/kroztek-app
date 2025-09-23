// lib/firebase.ts
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAyFwTtYh0wHYu_5FzkCMD9U31Tdr8X2UI",
  authDomain: "kroztek-shop.firebaseapp.com",
  projectId: "kroztek-shop",
  storageBucket: "kroztek-shop.firebasestorage.app",
  messagingSenderId: "627912446588",
  appId: "1:627912446588:web:243b48573b9b318036aff9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);

// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyAyFwTtYh0wHYu_5FzkCMD9U31Tdr8X2UI",
//   authDomain: "kroztek-shop.firebaseapp.com",
//   projectId: "kroztek-shop",
//   storageBucket: "kroztek-shop.firebasestorage.app",
//   messagingSenderId: "627912446588",
//   appId: "1:627912446588:web:243b48573b9b318036aff9"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
