// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// ⬇️ Replace this with your actual config:
const firebaseConfig = {
	apiKey: "AIzaSyCaTUM1R56HG9hj0goYmfJ9oPy9uxqITII",
	authDomain: "invoice-tracker-a4115.firebaseapp.com",
	projectId: "invoice-tracker-a4115",
	storageBucket: "invoice-tracker-a4115.firebasestorage.app",
	messagingSenderId: "277238201770",
	appId: "1:277238201770:web:31876f7cdcbf4b9df0bfd3",
	measurementId: "G-L7FVLRTL1H",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

export { db };
