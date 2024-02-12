// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth, initializeAuth, getReactNativePersistence } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
const firebaseApp = initializeApp(firebaseConfig);
const firebaseAuth = initializeAuth(firebaseApp, {
  persistence: getReactNativePersistence(AsyncStorage),
  dataConverter: null, 
  cachePersistence: 'none', 
  sdkClientVersion: '10.7.1', 
  popupRedirectResolver: null
});
const firestoreDB = getFirestore(firebaseApp);

export { firebaseApp, firebaseAuth, firestoreDB };
