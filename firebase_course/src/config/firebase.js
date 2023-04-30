import { initializeApp } from "firebase/app";

import { getAuth, GoogleAuthProvider } from "firebase/auth";

import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCuP441ljp_jEliqGG73XXJfbHaQjKWBr4",
  authDomain: "fir-course-d3af6.firebaseapp.com",
  projectId: "fir-course-d3af6",
  storageBucket: "fir-course-d3af6.appspot.com",
  messagingSenderId: "496793473512",
  appId: "1:496793473512:web:163df5949a1e863d4dd45d"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export const db = getFirestore(app);