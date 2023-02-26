// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyAotaKygzw2TAbmeJo8ZcnOxzQx5eVn5tM",
  authDomain: "comunity-app-ac995.firebaseapp.com",
  projectId: "comunity-app-ac995",
  storageBucket: "comunity-app-ac995.appspot.com",
  messagingSenderId: "569004872561",
  appId: "1:569004872561:web:4aca75119b5b823eaddcd0",
  measurementId: "G-R30Q6JW9F4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth=getAuth();
export {app,auth}