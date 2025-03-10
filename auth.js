import { auth } from "./firebase-config.js";
import { signInWithEmailAndPassword } from "firebase/auth";

const login = async () => {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        console.log("User logged in:", userCredential.user);
        alert("Login successful!");
    } catch (error) {
        console.error("Error logging in:", error.message);
        alert(error.message);
    }
};

document.getElementById("loginBtn").addEventListener("click", login);
