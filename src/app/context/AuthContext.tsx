"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../../lib/firebase";
import {
  onAuthStateChanged,
  signOut,
  User,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  updateProfile,
  sendSignInLinkToEmail,
  isSignInWithEmailLink,
  signInWithEmailLink,
} from "firebase/auth";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signup: (email: string, password: string, displayName?: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  sendMagicLink: (email: string) => Promise<void>;
  completeMagicLinkSignIn: (email: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  signup: async () => {},
  login: async () => {},
  logout: async () => {},
  resetPassword: async () => {},
  sendMagicLink: async () => {},
  completeMagicLinkSignIn: async () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Listen for auth state changes
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Sign up with email and password
  const signup = async (email: string, password: string, displayName?: string) => {
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      
      // Update display name if provided
      if (displayName && result.user) {
        await updateProfile(result.user, { displayName });
      }
    } catch (error) {
      const err = error as { code?: string; message?: string };
      
      // Handle common errors
      if (err.code === 'auth/email-already-in-use') {
        throw new Error('This email is already registered');
      } else if (err.code === 'auth/weak-password') {
        throw new Error('Password should be at least 6 characters');
      } else if (err.code === 'auth/invalid-email') {
        throw new Error('Invalid email address');
      } else {
        throw new Error(err.message || 'Failed to create account');
      }
    }
  };

  // Login with email and password
  const login = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      const err = error as { code?: string; message?: string };
      
      // Handle common errors
      if (err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password') {
        throw new Error('Invalid email or password');
      } else if (err.code === 'auth/invalid-email') {
        throw new Error('Invalid email address');
      } else if (err.code === 'auth/too-many-requests') {
        throw new Error('Too many failed attempts. Please try again later');
      } else {
        throw new Error(err.message || 'Failed to login');
      }
    }
  };

  // Logout
  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      const err = error as { message?: string };
      throw new Error(err.message || 'Failed to logout');
    }
  };

  // Reset password
  const resetPassword = async (email: string) => {
    try {
      await sendPasswordResetEmail(auth, email);
    } catch (error) {
      const err = error as { code?: string; message?: string };
      
      if (err.code === 'auth/user-not-found') {
        throw new Error('No account found with this email');
      } else if (err.code === 'auth/invalid-email') {
        throw new Error('Invalid email address');
      } else {
        throw new Error(err.message || 'Failed to send reset email');
      }
    }
  };

  // Send magic link for passwordless sign-in
  const sendMagicLink = async (email: string) => {
    try {
      const actionCodeSettings = {
        // URL to redirect back to after clicking the email link
        url: window.location.origin + '/verify-email',
        handleCodeInApp: true,
      };

      await sendSignInLinkToEmail(auth, email, actionCodeSettings);
      
      // Save the email locally so we can complete sign-in after redirect
      window.localStorage.setItem('emailForSignIn', email);
    } catch (error) {
      const err = error as { code?: string; message?: string };
      
      if (err.code === 'auth/invalid-email') {
        throw new Error('Invalid email address');
      } else {
        throw new Error(err.message || 'Failed to send magic link');
      }
    }
  };

  // Complete the magic link sign-in after clicking email link
  const completeMagicLinkSignIn = async (email: string) => {
    try {
      // Confirm the link is a sign-in with email link
      if (isSignInWithEmailLink(auth, window.location.href)) {
        // Get the email if available from storage
        let emailToUse = email;
        if (!emailToUse) {
          emailToUse = window.localStorage.getItem('emailForSignIn') || '';
        }

        if (!emailToUse) {
          throw new Error('Please provide your email to complete sign in');
        }

        // Sign in with the email link
        await signInWithEmailLink(auth, emailToUse, window.location.href);
        
        // Clear the email from storage
        window.localStorage.removeItem('emailForSignIn');
      } else {
        throw new Error('Invalid sign-in link');
      }
    } catch (error) {
      const err = error as { code?: string; message?: string };
      
      if (err.code === 'auth/invalid-action-code') {
        throw new Error('This link has expired or already been used');
      } else if (err.code === 'auth/invalid-email') {
        throw new Error('Invalid email address');
      } else {
        throw new Error(err.message || 'Failed to complete sign in');
      }
    }
  };

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        loading, 
        signup, 
        login, 
        logout, 
        resetPassword,
        sendMagicLink,
        completeMagicLinkSignIn
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}