import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import firebaseConfig from "../helpers/apiKeys";
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const authProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
