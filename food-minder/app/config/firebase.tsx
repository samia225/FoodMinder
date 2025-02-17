// Import necessary Firebase functions
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDJhYjFheTR96sfqhU-Ehmb98HyLBpO4Bw",
  authDomain: "foodbinder-74f84.firebaseapp.com",
  projectId: "foodbinder-74f84",
  storageBucket: "foodbinder-74f84.appspot.com",
  messagingSenderId: "765852009113",
  appId: "1:765852009113:web:42426895e6b958082a2e08"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and Firestore
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
