import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyApcA8lrxAJvnVdknPOsKBAPze7m0jB8Uw",
  authDomain: "chat-with-pdf-challenge.firebaseapp.com",
  projectId: "chat-with-pdf-challenge",
  storageBucket: "chat-with-pdf-challenge.appspot.com",
  messagingSenderId: "63913719761",
  appId: "1:63913719761:web:1b2bea43afcdfcdae1d2f0",
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage };
