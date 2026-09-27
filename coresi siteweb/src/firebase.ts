import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Configuration Firebase connectée au projet CORESI
export const firebaseConfig = {
  projectId: "coresi-gestion",
  appId: "1:457470531507:web:62b0b3d41747ae48205dc6",
  apiKey: "AIzaSyCcL4lUbtX5rwpFBYzl-lEk2swgxwAs55Y",
  authDomain: "coresi-gestion.firebaseapp.com",
  storageBucket: "coresi-gestion.firebasestorage.app",
  messagingSenderId: "457470531507"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
export const db = getFirestore(app);
