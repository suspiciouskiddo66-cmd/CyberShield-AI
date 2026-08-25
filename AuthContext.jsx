import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  getStoredUser, 
  loginWithEmail, 
  loginWithGoogle, 
  registerWithEmail, 
  resetPassword, 
  logoutUser 
} from '../services/authService';
import { auth, onAuthStateChanged } from '../services/firebase';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => getStoredUser());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check local session/remembered user first
    const stored = getStoredUser();
    if (stored) {
      setUser(stored);
      setLoading(false);
    } else {
      setLoading(false);
    }

    // Listen to Firebase auth changes if configured
    if (auth) {
      const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
        if (firebaseUser) {
          const formatted = {
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            displayName: firebaseUser.displayName || firebaseUser.email.split('@')[0],
            photoURL: firebaseUser.photoURL,
            provider: 'firebase'
          };
          setUser(formatted);
        }
        setLoading(false);
      });
      return () => unsubscribe();
    }
  }, []);

  const login = async (email, password, rememberMe) => {
    const loggedInUser = await loginWithEmail(email, password, rememberMe);
    setUser(loggedInUser);
    return loggedInUser;
  };

  const loginGoogle = async () => {
    const loggedInUser = await loginWithGoogle();
    setUser(loggedInUser);
    return loggedInUser;
  };

  const register = async (email, password, displayName) => {
    const newUser = await registerWithEmail(email, password, displayName);
    setUser(newUser);
    return newUser;
  };

  const forgotPassword = async (email) => {
    return await resetPassword(email);
  };

  const logout = async () => {
    await logoutUser();
    setUser(null);
  };

  const value = {
    user,
    loading,
    isAuthenticated: !!user,
    login,
    loginGoogle,
    register,
    forgotPassword,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
