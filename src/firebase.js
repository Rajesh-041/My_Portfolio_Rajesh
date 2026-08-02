import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBStZCLKK61Xw-PTac5a9GFQN0tA2_eK3Y",
  authDomain: "myportfolio-041.firebaseapp.com",
  projectId: "myportfolio-041",
  storageBucket: "myportfolio-041.firebasestorage.app",
  messagingSenderId: "960924580687",
  appId: "1:960924580687:web:23d50440de9186d14fe33a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);