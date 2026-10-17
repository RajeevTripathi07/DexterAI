import { cert, initializeApp } from "firebase-admin";
// import serviceAccount from "../serviceAccountKey.json" with {type:"json"};

const serviceAccount = {
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    // The replace function is critical: it ensures the multiline private key 
    // is formatted correctly when read from an environment variable
    privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n')
};

export const app = initializeApp({
    credential: cert(serviceAccount)
});

