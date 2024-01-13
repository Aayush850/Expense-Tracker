import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDPyyT1HvkYzfChMUr9VH3zB2xqz6_n8Z0",
  authDomain: "expense-tracker-26e58.firebaseapp.com",
  projectId: "expense-tracker-26e58",
  storageBucket: "expense-tracker-26e58.appspot.com",
  messagingSenderId: "658427082229",
  appId: "1:658427082229:web:6194d0c7862292c7911cbc",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const authProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
