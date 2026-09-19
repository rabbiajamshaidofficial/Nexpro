import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC1W9xQtNlVbXbbJVFSfQM3Tpo36MEef7Q",
  authDomain: "nexpro-aa168.firebaseapp.com",
  projectId: "nexpro-aa168",
  storageBucket: "nexpro-aa168.firebasestorage.app",
  messagingSenderId: "501632481496",
  appId: "1:501632481496:web:1df63d5a7c71973fbe3fad",
  measurementId: "G-0J7SD3Z22Y",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
