import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCE0_tf3Pgrwon6AACIeyAFgsQ9Ejx7hCM",
    authDomain: "web3-upi.firebaseapp.com",
    projectId: "web3-upi",
    storageBucket: "web3-upi.firebasestorage.app",
    messagingSenderId: "65533761002",
    appId: "1:65533761002:web:4490e9d03b4f07466c8e93",
    measurementId: "G-VGKNGK9PBJ"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
