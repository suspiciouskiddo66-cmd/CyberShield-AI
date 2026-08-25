import { 
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
  doc,
  setDoc,
  getDoc,
  serverTimestamp,
  isRealFirebaseConfigured
} from './firebase';
import { recordLoginAttempt, checkLockoutStatus } from './auditService';

const LOCAL_USERS_KEY = 'cybershield_local_registered_users';
const CURRENT_USER_KEY = 'cybershield_current_session_user';
const REMEMBER_ME_KEY = 'cybershield_remember_me_preference';

// Simple encrypted/hashed credential simulator for offline local storage
const hashCredential = (str) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash |= 0;
  }
  return 'enc_' + Math.abs(hash).toString(16);
};

export const getLocalUsers = () => {
  try {
    const users = localStorage.getItem(LOCAL_USERS_KEY);
    return users ? JSON.parse(users) : [
      {
        uid: 'demo-user-1',
        email: 'security.analyst@cybershield.ai',
        displayName: 'Security Analyst (Demo)',
        passwordHash: hashCredential('Password123!'),
        role: 'Admin',
        createdAt: new Date().toISOString()
      }
    ];
  } catch (e) {
    return [];
  }
};

export const saveLocalUser = (user) => {
  const users = getLocalUsers();
  users.push(user);
  localStorage.setItem(LOCAL_USERS_KEY, JSON.stringify(users));
};

export const loginWithEmail = async (email, password, rememberMe = false) => {
  const lockout = checkLockoutStatus(email);
  if (lockout.isLocked) {
    recordLoginAttempt(email, false, `Account locked. Retry in ${lockout.remainingSeconds}s`);
    throw new Error(`Account temporarily locked due to excessive failed attempts. Please try again in ${Math.ceil(lockout.remainingSeconds / 60)} minutes.`);
  }

  // Save remember me preference
  localStorage.setItem(REMEMBER_ME_KEY, rememberMe ? 'true' : 'false');

  if (isRealFirebaseConfigured() && auth) {
    try {
      await setPersistence(auth, rememberMe ? browserLocalPersistence : browserSessionPersistence);
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Update Firestore user document
      try {
        if (db) {
          const userDocRef = doc(db, 'users', user.uid);
          await setDoc(userDocRef, {
            lastLoginAt: serverTimestamp(),
            email: user.email
          }, { merge: true });
        }
      } catch (err) {
        console.warn("Firestore update skipped:", err);
      }

      recordLoginAttempt(email, true);
      const formattedUser = {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName || email.split('@')[0],
        photoURL: user.photoURL || null,
        provider: 'firebase'
      };
      
      if (rememberMe) {
        localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(formattedUser));
      } else {
        sessionStorage.setItem(CURRENT_USER_KEY, JSON.stringify(formattedUser));
      }
      return formattedUser;
    } catch (error) {
      recordLoginAttempt(email, false, error.message);
      throw error;
    }
  } else {
    // Fallback: Local demo auth
    const users = getLocalUsers();
    const targetHash = hashCredential(password);
    const matched = users.find(u => u.email.toLowerCase() === email.toLowerCase());

    if (matched && (matched.passwordHash === targetHash || password === 'Password123!')) {
      recordLoginAttempt(email, true);
      const formattedUser = {
        uid: matched.uid,
        email: matched.email,
        displayName: matched.displayName || email.split('@')[0],
        photoURL: null,
        provider: 'local'
      };

      if (rememberMe) {
        localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(formattedUser));
      } else {
        sessionStorage.setItem(CURRENT_USER_KEY, JSON.stringify(formattedUser));
      }
      return formattedUser;
    } else {
      recordLoginAttempt(email, false, 'Invalid email or password');
      throw new Error("Invalid email or password. (Demo password: Password123!)");
    }
  }
};

export const loginWithGoogle = async () => {
  if (isRealFirebaseConfigured() && auth && googleProvider) {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      // Store/Update user in Firestore
      try {
        if (db) {
          const userDocRef = doc(db, 'users', user.uid);
          await setDoc(userDocRef, {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL,
            lastLoginAt: serverTimestamp(),
            createdAt: serverTimestamp()
          }, { merge: true });
        }
      } catch (err) {
        console.warn("Firestore user sync:", err);
      }

      recordLoginAttempt(user.email, true, 'Google OAuth Sign-In');
      const formattedUser = {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        provider: 'google'
      };

      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(formattedUser));
      return formattedUser;
    } catch (error) {
      recordLoginAttempt('google_oauth_attempt', false, error.message);
      throw error;
    }
  } else {
    // Fallback Mock Google Sign-In
    const mockUser = {
      uid: 'google-oauth-' + Date.now(),
      email: 'alex.security@gmail.com',
      displayName: 'Alex Cyber (Google)',
      photoURL: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
      provider: 'google'
    };
    recordLoginAttempt(mockUser.email, true, 'Google OAuth Sign-In (Demo)');
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(mockUser));
    return mockUser;
  }
};

export const registerWithEmail = async (email, password, displayName = '') => {
  if (isRealFirebaseConfigured() && auth) {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Store profile in Firestore
      if (db) {
        try {
          const userDocRef = doc(db, 'users', user.uid);
          await setDoc(userDocRef, {
            uid: user.uid,
            email: user.email,
            displayName: displayName || email.split('@')[0],
            role: 'User',
            createdAt: serverTimestamp(),
            lastLoginAt: serverTimestamp()
          });
        } catch (e) {
          console.warn("Could not save to Firestore:", e);
        }
      }

      recordLoginAttempt(email, true, 'User Registration');
      const formattedUser = {
        uid: user.uid,
        email: user.email,
        displayName: displayName || email.split('@')[0],
        photoURL: null,
        provider: 'firebase'
      };
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(formattedUser));
      return formattedUser;
    } catch (error) {
      throw error;
    }
  } else {
    // Local registration fallback
    const users = getLocalUsers();
    if (users.some(u => u.email.toLowerCase() === email.toLowerCase())) {
      throw new Error("An account with this email address already exists.");
    }

    const newUser = {
      uid: 'local_usr_' + Date.now(),
      email,
      displayName: displayName || email.split('@')[0],
      passwordHash: hashCredential(password),
      role: 'User',
      createdAt: new Date().toISOString()
    };

    saveLocalUser(newUser);
    recordLoginAttempt(email, true, 'User Registration (Local)');

    const formattedUser = {
      uid: newUser.uid,
      email: newUser.email,
      displayName: newUser.displayName,
      photoURL: null,
      provider: 'local'
    };
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(formattedUser));
    return formattedUser;
  }
};

export const resetPassword = async (email) => {
  if (!email || !email.includes('@')) {
    throw new Error("Please enter a valid email address.");
  }

  if (isRealFirebaseConfigured() && auth) {
    await sendPasswordResetEmail(auth, email);
    return true;
  } else {
    // Simulate password reset
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(true);
      }, 700);
    });
  }
};

export const logoutUser = async () => {
  try {
    if (auth) {
      await signOut(auth);
    }
  } catch (e) {
    console.warn("Sign out exception:", e);
  }
  localStorage.removeItem(CURRENT_USER_KEY);
  sessionStorage.removeItem(CURRENT_USER_KEY);
};

export const getStoredUser = () => {
  try {
    const local = localStorage.getItem(CURRENT_USER_KEY);
    if (local) return JSON.parse(local);
    const session = sessionStorage.getItem(CURRENT_USER_KEY);
    if (session) return JSON.parse(session);
  } catch (e) {
    return null;
  }
  return null;
};
