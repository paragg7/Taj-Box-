import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyANwkn-k-9WmwYBWGFQCcYbN3QMAp3fI_Q",
  authDomain: "tajboxxx.firebaseapp.com",
  projectId: "tajboxxx",
  storageBucket: "tajboxxx.firebasestorage.app",
  messagingSenderId: "786715951257",
  appId: "1:786715951257:web:cf5ad8fada605f70bb7808",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);