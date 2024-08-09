import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyAPc849kqy-gFhYzDgwi7fctET8vigznFw",
    authDomain: "chat-with-pdf-18d20.firebaseapp.com",
    projectId: "chat-with-pdf-18d20",
    storageBucket: "chat-with-pdf-18d20.appspot.com",
    messagingSenderId: "742179086336",
    appId: "1:742179086336:web:2cb0521d75159b502cb8e5"
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage };
