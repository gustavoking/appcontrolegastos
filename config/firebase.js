import { initializeApp } from "firebase/app";
import { Firestore, getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCWfZreqsEdHdM8efVNX9FnflCz6C1WdAM",
  authDomain: "projetoaula-8ee23.firebaseapp.com",
  projectId: "projetoaula-8ee23",
  storageBucket: "projetoaula-8ee23.appspot.com",
  messagingSenderId: "646160297075",
  appId: "1:646160297075:web:ada2da6f4ad2e2d4a58e06",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };
