import { initializeApp, getApps, getApp } from 'firebase/app';
import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  sendPasswordResetEmail, 
  signInWithPopup, 
  setPersistence, 
  browserLocalPersistence, 
  browserSessionPersistence,
  onAuthStateChanged
} from 'firebase/auth';
import { 
  getFirestore, 
  doc, 
  setDoc, 
  getDoc, 
  collection, 
  addDoc, 
  getDocs, 
  query, 
  where, 
  orderBy, 
  limit, 
  deleteDoc, 
  serverTimestamp 
} from 'firebase/firestore';

// Get Firebase configuration from environment or localStorage override
const getFirebaseConfig = () => {
  const customConfig = localStorage.getItem('cybershield_custom_firebase_config');
  if (customConfig) {
    try {
      return JSON.parse(customConfig);
    } catch (e) {
      console.error("Failed to parse custom firebase config:", e);
    }
  }

  return {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyMockKeyForDevEnvironment123456789",
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "cybershield-security-app.firebaseapp.com",
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "cybershield-security-app",
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "cybershield-security-app.appspot.com",
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "123456789012",
    appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:123456789012:web:abcdef1234567890"
  };
};

const firebaseConfig = getFirebaseConfig();

// Check if valid production Firebase config is configured
export const isRealFirebaseConfigured = () => {
  return (
    import.meta.env.VITE_FIREBASE_API_KEY &&
    !import.meta.env.VITE_FIREBASE_API_KEY.includes("MockKey") &&
    import.meta.env.VITE_FIREBASE_PROJECT_ID
  ) || Boolean(localStorage.getItem('cybershield_custom_firebase_config'));
};

let app;
let auth;
let db;
let googleProvider;

try {
  app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
  auth = getAuth(app);
  db = getFirestore(app);
  googleProvider = new GoogleAuthProvider();
  googleProvider.setCustomParameters({ prompt: 'select_account' });
} catch (error) {
  console.warn("Firebase initialization notice:", error.message);
}

export { 
  app, 
  auth, 
  db, 
  googleProvider,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  signInWithPopup,
  setPersistence,
  browserLocalPersistence,
  browserSessionPersistence,
  onAuthStateChanged,
  doc,
  setDoc,
  getDoc,
  collection,
  addDoc,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  deleteDoc,
  serverTimestamp
};
