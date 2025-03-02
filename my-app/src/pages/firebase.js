
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyAg48f8WrnLcWK5nUEzUAA6bLf79Eu-1Ns",
  authDomain: "task-management-app-45d17.firebaseapp.com",
  projectId: "task-management-app-45d17",
  storageBucket: "task-management-app-45d17.firebasestorage.app",
  messagingSenderId: "175372012639",
  appId: "1:175372012639:web:b07a74c3b4fcad5e7c1fea",
  measurementId: "G-2ZQ7WW4SYV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app)



