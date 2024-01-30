// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAyrl9Wxc8WYRiLDTUC2FI1MTsKkKzSaxs",
  authDomain: "myunimap-14838.firebaseapp.com",
  projectId: "myunimap-14838",
  storageBucket: "myunimap-14838.appspot.com",
  messagingSenderId: "491545522726",
  appId: "1:491545522726:web:984d5f1b579cb67d752ce7"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIRESTORE_DB = getFirestore(FIREBASE_APP);
