"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../../lib/firebase";
import {
  onAuthStateChanged,
  signOut,
  User,
  GoogleAuthProvider,
  signInWithRedirect,
  signInWithPopup,
  getRedirectResult,
  setPersistence,
  browserLocalPersistence,
  indexedDBLocalPersistence,
} from "firebase/auth";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  logout: () => void;
  loginWithGoogle: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  logout: () => {},
  loginWithGoogle: async () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("============================================");
    console.log("AUTH PROVIDER MOUNTED");
    console.log("Timestamp:", new Date().toISOString());
    console.log("User Agent:", navigator.userAgent);
    console.log("Current URL:", window.location.href);
    console.log("============================================");

    // Set persistence first
    const setupPersistence = async () => {
      try {
        console.log("Setting up auth persistence...");
        await setPersistence(auth, browserLocalPersistence);
        console.log("Persistence set to browserLocalPersistence");
      } catch (error) {
        console.error("Failed to set persistence:", error);
        try {
          await setPersistence(auth, indexedDBLocalPersistence);
          console.log("Fallback: Persistence set to indexedDBLocalPersistence");
        } catch (fallbackError) {
          console.error("Fallback persistence also failed:", fallbackError);
        }
      }
    };

    setupPersistence();

    // Set up auth state listener
    console.log("Setting up onAuthStateChanged listener...");
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      console.log("--------------------------------------------");
      console.log("AUTH STATE CHANGED EVENT");
      console.log("Timestamp:", new Date().toISOString());
      console.log("User exists:", !!firebaseUser);
      
      if (firebaseUser) {
        console.log("User Details:");
        console.log("  UID:", firebaseUser.uid);
        console.log("  Email:", firebaseUser.email);
        console.log("  Display Name:", firebaseUser.displayName);
        console.log("  Photo URL:", firebaseUser.photoURL);
        console.log("  Email Verified:", firebaseUser.emailVerified);
        console.log("  Provider Data:", firebaseUser.providerData);
      } else {
        console.log("User is NULL");
      }
      
      setUser(firebaseUser);
      setLoading(false);
      console.log("--------------------------------------------");
    });

    // Check for redirect result
    console.log("Checking for redirect result...");
    getRedirectResult(auth)
      .then((result) => {
        console.log("============================================");
        console.log("REDIRECT RESULT RECEIVED");
        console.log("Timestamp:", new Date().toISOString());
        console.log("Result exists:", !!result);
        
        if (result) {
          console.log("Result Details:");
          console.log("  User:", result.user?.email || "null");
          console.log("  Credential:", result.credential);
          console.log("  Operation Type:", result.operationType);
          console.log("  Provider ID:", result.providerId);
          
          if (result.user) {
            console.log("User from redirect:");
            console.log("  UID:", result.user.uid);
            console.log("  Email:", result.user.email);
            console.log("  Display Name:", result.user.displayName);
          }
        } else {
          console.log("No redirect result found");
        }
        console.log("============================================");
      })
      .catch((err) => {
        console.error("============================================");
        console.error("REDIRECT ERROR");
        console.error("Timestamp:", new Date().toISOString());
        console.error("Error Code:", err.code);
        console.error("Error Message:", err.message);
        console.error("Full Error:", err);
        console.error("============================================");
      });

    // Check localStorage/sessionStorage
    console.log("Checking storage...");
    try {
      console.log("localStorage available:", !!window.localStorage);
      console.log("sessionStorage available:", !!window.sessionStorage);
      
      // Check for Firebase auth keys
      const authKeys = Object.keys(localStorage).filter(key => 
        key.includes('firebase') || key.includes('auth')
      );
      console.log("Firebase auth keys in localStorage:", authKeys);
      
      if (authKeys.length > 0) {
        authKeys.forEach(key => {
          const value = localStorage.getItem(key);
          console.log(`  ${key}:`, value ? "exists" : "null");
        });
      }
    } catch (storageError) {
      console.error("Storage check error:", storageError);
    }

    return () => {
      console.log("AUTH PROVIDER UNMOUNTING");
      unsubscribe();
    };
  }, []);

  const logout = async () => {
    console.log("============================================");
    console.log("LOGOUT INITIATED");
    try {
      await signOut(auth);
      setUser(null);
      console.log("Logout successful");
    } catch (error) {
      console.error("Logout error:", error);
    }
    console.log("============================================");
  };

  const loginWithGoogle = async () => {
    console.log("============================================");
    console.log("LOGIN WITH GOOGLE INITIATED");
    console.log("Timestamp:", new Date().toISOString());
    
    const provider = new GoogleAuthProvider();
    provider.addScope('email');
    provider.addScope('profile');
    
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    console.log("Is Mobile:", isMobile);
    console.log("User Agent:", navigator.userAgent);
    
    try {
      if (isMobile) {
        console.log("Using signInWithRedirect for mobile...");
        console.log("About to redirect...");
        await signInWithRedirect(auth, provider);
        console.log("Redirect initiated (this line may not appear)");
      } else {
        console.log("Using signInWithPopup for desktop...");
        const result = await signInWithPopup(auth, provider);
        console.log("Popup login successful");
        console.log("User:", result.user.email);
      }
    } catch (err: any) {
      console.error("LOGIN ERROR");
      console.error("Error Code:", err.code);
      console.error("Error Message:", err.message);
      console.error("Full Error:", err);
    }
    console.log("============================================");
  };

  console.log("RENDER - User:", user?.email || "null", "Loading:", loading);

  return (
    <AuthContext.Provider value={{ user, loading, logout, loginWithGoogle }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}