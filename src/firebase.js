import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC2Xp7tUjlPDqb8SPSy4dzhdXfcXMtE1ms",
  authDomain: "test-washbook.firebaseapp.com",
  projectId: "test-washbook",
  storageBucket: "test-washbook.appspot.com",
  messagingSenderId: "23499349802",
  appId: "1:23499349802:web:367341ffdfb7f794298853",
  measurementId: "G-6SVSL6S5BB",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export default app;
