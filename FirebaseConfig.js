// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth, initializeAuth, getReactNativePersistence } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
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
