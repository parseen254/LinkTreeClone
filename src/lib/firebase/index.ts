import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyAvA7g1ALhho9AnizVUNAfi_SnreWXXSp0",
    authDomain: "link-tree-clone-c7e0a.firebaseapp.com",
    projectId: "link-tree-clone-c7e0a",
    storageBucket: "link-tree-clone-c7e0a.appspot.com",
    messagingSenderId: "884132772503",
    appId: "1:884132772503:web:72a920545689ea4435c7d2"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore();
export const auth = getAuth();
export const storage = getStorage();