// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "auto-estate.firebaseapp.com",
  projectId: "auto-estate",
  storageBucket: "auto-estate.appspot.com",
  messagingSenderId: "805436885532",
  appId: "1:805436885532:web:3787d5f23406cf4a572dd9"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);