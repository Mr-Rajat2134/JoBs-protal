// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBphP5RmH7P_J6ZEQR77jkWX8Pimnpbmgg",
  authDomain: "jobs-portal-c2581.firebaseapp.com",
  projectId: "jobs-portal-c2581",
  storageBucket: "jobs-portal-c2581.appspot.com",
  messagingSenderId: "1014769846510",
  appId: "1:1014769846510:web:2e2338867920ab2d648bff",
  measurementId: "G-1DTWLWY334"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app)

export {db};