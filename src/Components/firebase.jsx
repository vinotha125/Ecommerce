// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCGKOk8xYCoXnGa3IpyP08DCkLDn8KaSp0",
  authDomain: "register-authentication-e1b3d.firebaseapp.com",
  projectId: "register-authentication-e1b3d",
  storageBucket: "register-authentication-e1b3d.firebasestorage.app",
  messagingSenderId: "502339808830",
  appId: "1:502339808830:web:cf925f78af043c11cdab6f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);