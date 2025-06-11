import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBPt67mVyIM0GDSLhm8U6XD4T7-HxLd4gU",
  authDomain: "ressys-19d4b.firebaseapp.com",
  projectId: "ressys-19d4b",
  storageBucket: "ressys-19d4b.firebasestorage.app",
  messagingSenderId: "789691016676",
  appId: "1:789691016676:web:76665008fadb81939c93f1",
};

export const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
