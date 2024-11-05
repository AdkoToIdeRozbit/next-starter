import * as admin from "firebase-admin";
import { getApps } from "firebase/app";

export function customInitApp() {
  if (getApps().length <= 0) {
    admin.initializeApp({
      credential: admin.credential.cert({
        clientEmail: process.env.NEXT_PUBLIC_FIREBASE_CLIENT_EMAIL,
        privateKey: (process.env.NEXT_PUBLIC_FIREBASE_PRIVATE_KEY || "").replace(/\\n/g, '\n'),
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID
      }),
      databaseURL: `https://${process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID}.firebaseio.com`
    });
  }
}