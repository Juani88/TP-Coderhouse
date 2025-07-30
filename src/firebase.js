import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDHGxmbhZ_l-mcYWfrSYLUskEsYt_fgW5k",
  authDomain: "coderhouse-react-99902.firebaseapp.com",
  projectId: "coderhouse-react-99902",
  storageBucket: "coderhouse-react-99902.firebasestorage.app",
  messagingSenderId: "501393253550",
  appId: "1:501393253550:web:e5bd2c59e6402a7a3ff93f"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };