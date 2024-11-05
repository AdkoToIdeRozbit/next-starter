import { initializeApp } from "firebase/app";
import {  GoogleAuthProvider, getAuth } from "firebase/auth";
import {  getFirestore } from "firebase/firestore";
import { getFunctions } from "firebase/functions";
import { getStorage } from "firebase/storage";


export const app = initializeApp({
  apiKey: "",
  projectId: "",
  messagingSenderId: "",
  appId: "",
  measurementId: "",
  storageBucket: "",
  authDomain: "",
});

export const functions = getFunctions(app);

export const firestore = getFirestore(app);

export const auth = getAuth(app);

export const provider = new GoogleAuthProvider();

export const storage = getStorage(app);
