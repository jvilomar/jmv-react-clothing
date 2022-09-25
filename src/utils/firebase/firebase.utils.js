import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";

import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

// JMV Clohting App's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBJrLpIEmr6nL9slDlwdOZPyMLuZ7OQo8g",
  authDomain: "jmv-clothing-db.firebaseapp.com",
  projectId: "jmv-clothing-db",
  storageBucket: "jmv-clothing-db.appspot.com",
  messagingSenderId: "465450120746",
  appId: "1:465450120746:web:f67d276e1b0ccc43457553",
};

// Initialize Firebase Application
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = await doc(db, "users", userAuth.uid);

  console.log(userDocRef);

  const userSnapshot = await getDoc(userDocRef);
  console.log(userSnapshot);

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, { displayName, email, createdAt });
    } catch (error) {
      console.log(error.message);
    }
  }

  return userDocRef;
};
