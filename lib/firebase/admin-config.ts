import * as admin from "firebase-admin";

export function customInitApp() {
  if (admin.apps.length === 0) {
    admin.initializeApp({
      credential: admin.credential.cert({
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: (process.env.FIREBASE_PRIVATE_KEY || "").replace(/\\n/g, '\n'),
        projectId: "some_id"
      }),
      databaseURL: "https://some_id.firebaseio.com"
    });
  }
}