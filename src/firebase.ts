import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAukE5dgxrqZW2e0dGRoMxa1xCJOCH-1rY",
  authDomain: "campusmesh-3b373.firebaseapp.com",
  projectId: "campusmesh-3b373",
  storageBucket: "campusmesh-3b373.firebasestorage.app",
  messagingSenderId: "259664501904",
  appId: "1:259664501904:web:50efaeb95c5637e3f38c15",
  measurementId: "G-8V5XRYXXJD",
};

const app = initializeApp(firebaseConfig);

// Firestore database
export const db = getFirestore(app);

// Authentication
export const auth = getAuth(app);

// Analytics (optional)
export const analytics = getAnalytics(app);