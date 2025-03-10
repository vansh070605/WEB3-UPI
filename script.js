import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { 
    getAuth, 
    signInWithEmailAndPassword, 
    RecaptchaVerifier, 
    signInWithPhoneNumber,
    signInWithPopup,
    GoogleAuthProvider,
    signOut
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyCE0_tf3Pgrwon6AACIeyAFgsQ9Ejx7hCM",
    authDomain: "web3-upi.firebaseapp.com",
    projectId: "web3-upi",
    storageBucket: "web3-upi.firebasestorage.app",
    messagingSenderId: "65533761002",
    appId: "1:65533761002:web:4490e9d03b4f07466c8e93",
    measurementId: "G-VGKNGK9PBJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
provider.setCustomParameters({
    prompt: "select_account"
});


// Switch Between Login Forms
document.getElementById("emailLoginBtn").addEventListener("click", () => {
    document.getElementById("emailForm").style.display = "flex";
    document.getElementById("phoneForm").style.display = "none";
});

document.getElementById("phoneLoginBtn").addEventListener("click", () => {
    document.getElementById("phoneForm").style.display = "flex";
    document.getElementById("emailForm").style.display = "none";
});

// Email Login
document.getElementById("loginWithEmail").addEventListener("click", async () => {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        alert("Login successful!");
        console.log("User logged in:", userCredential.user);
        showLogoutButton();
    } catch (error) {
        alert(error.message);
    }
});

// Google Login
document.getElementById("googleLoginBtn").addEventListener("click", async () => {
    try {
        const result = await signInWithPopup(auth, provider);
        const user = result.user;
        alert(`Welcome, ${user.displayName}!`);
        console.log("Google Sign-In Successful:", user);
        showLogoutButton();
    } catch (error) {
        alert("Google Sign-In Error: " + error.message);
        console.error("Google Sign-In Error:", error);
    }
});


// Phone Authentication
window.recaptchaVerifier = new RecaptchaVerifier(auth, "recaptcha-container", {
    size: "normal",
    callback: (response) => {
        console.log("Recaptcha Verified!");
    },
});

document.getElementById("sendOtp").addEventListener("click", async () => {
    const phoneNumber = document.getElementById("phoneNumber").value;
    try {
        const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, window.recaptchaVerifier);
        window.confirmationResult = confirmationResult;
        alert("OTP Sent!");
    } catch (error) {
        alert(error.message);
    }
});

document.getElementById("verifyOtp").addEventListener("click", async () => {
    const otp = document.getElementById("otp").value;
    try {
        const result = await window.confirmationResult.confirm(otp);
        alert("Phone Authentication Successful!");
        showLogoutButton();
    } catch (error) {
        alert("Invalid OTP!");
    }
});

// Logout
document.getElementById("logoutBtn").addEventListener("click", async () => {
    await signOut(auth);
    alert("Logged out!");
    hideLogoutButton();
});

function showLogoutButton() {
    document.getElementById("logoutBtn").style.display = "block";
}

function hideLogoutButton() {
    document.getElementById("logoutBtn").style.display = "none";
}
