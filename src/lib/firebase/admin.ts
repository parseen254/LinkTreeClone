import { FB_CLIENT_EMAIL, FB_PRIVATE_KEY, FB_PROJECT_ID } from "$env/static/private";

import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";
import pkg from 'firebase-admin'

try {
    pkg.initializeApp({
        credential: pkg.credential.cert({
            projectId: FB_PROJECT_ID,
            clientEmail: FB_CLIENT_EMAIL,
            privateKey: FB_PRIVATE_KEY.replace(/\\n/g, '\n')
        })
    })
} catch (err: any) {
    if (!/already exists/u.test(err.message)) {
        console.error('Firebase Admin Failed to Initialize.\n Error: ', err.stack)
    }

}

export const adminDB = getFirestore();
export const adminAuth = getAuth();