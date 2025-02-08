// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
    apiKey: "AIzaSyC7PWedeLgkR1KgOdHI86_g56I_4RyIKrE",
    authDomain: "e-comerce-4f256.firebaseapp.com",
    projectId: "e-comerce-4f256",
    storageBucket: "e-comerce-4f256.firebasestorage.app",
    messagingSenderId: "369952741331",
    appId: "1:369952741331:web:f04014af0e7056f81ac126",
    measurementId: "G-BB0EXQKLT6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);