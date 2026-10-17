// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
import { GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY ,
  authDomain: "dexterai-48f9b.firebaseapp.com",
  projectId: "dexterai-48f9b",
  storageBucket: "dexterai-48f9b.firebasestorage.app",
  messagingSenderId: "1081475484943",
  appId: "1:1081475484943:web:701526fc88e8c873c6427a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const googleAuthProvider = new GoogleAuthProvider();