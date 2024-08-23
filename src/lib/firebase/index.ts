import { getAuth, onAuthStateChanged, type User } from "firebase/auth";

import { doc, getFirestore, onSnapshot } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { initializeApp } from "firebase/app";
import { derived, writable, type Readable } from "svelte/store";

const firebaseConfig = {
    apiKey: "AIzaSyAvA7g1ALhho9AnizVUNAfi_SnreWXXSp0",
    authDomain: "link-tree-clone-c7e0a.firebaseapp.com",
    projectId: "link-tree-clone-c7e0a",
    storageBucket: "link-tree-clone-c7e0a.appspot.com",
    messagingSenderId: "884132772503",
    appId: "1:884132772503:web:72a920545689ea4435c7d2"
};


// A store with current firebase user
const userStore = () => {
    let unsubscribe: () => void;

    if (!auth || !globalThis.window) {
        console.error('Firebase auth is not initialized');
        const { subscribe } = writable<User | null>(null);
        return {
            subscribe
        }
    }

    const { subscribe } = writable(auth?.currentUser ?? null, (set) => {
        unsubscribe = onAuthStateChanged(auth, (user) => {
            set(user)
        });

        return () => unsubscribe();
    });
    return {
        subscribe
    }
}


// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore();
export const auth = getAuth();
export const storage = getStorage();
export const user = userStore();


// Custom store to manage user data from Firestore
// This store will be updated whenever the user's document in Firestore changes
interface UserData {
    username: string;
    bio: string;
    photoURL: string;
    links: any[];
}

export const userData: Readable<UserData | null> = derived(user, ($user, set) => {
    if ($user) {
        return docStore<UserData>(`users/${$user.uid}`).subscribe(set);
    } else {
        set(null);
    }
});

export const docStore = <T>(path: string) => {
    const docRef = doc(db, path);

    const { subscribe } = writable<T | null>(null, (set) => {

        let unsubscribe: () => void;
        unsubscribe = onSnapshot(docRef, (snapshot) => {
            set((snapshot.data() as T) ?? null);
        });

        return () => unsubscribe();
    });

    return {
        subscribe,
        ref: docRef,
        id: docRef.id,
    }


}