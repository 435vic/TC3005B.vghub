import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC8xU1IhD3SFs4KZwR6wq96z8C6H4zK6YQ",
  authDomain: "tc3005b-vghub.firebaseapp.com",
  projectId: "tc3005b-vghub",
  storageBucket: "tc3005b-vghub.firebasestorage.app",
  messagingSenderId: "839122769366",
  appId: "1:839122769366:web:8560e4c045817bc6a20077"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();
