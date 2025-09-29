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
  const [redirectChecked, setRedirectChecked] = useState(false);

  useEffect(() => {
    console.log("============================================");
    console.log("AUTH PROVIDER MOUNTED");
    console.log("Timestamp:", new Date().toISOString());
    console.log("User Agent:", navigator.userAgent);
    console.log("Current URL:", window.location.href);
    console.log("Referrer:", document.referrer);
    console.log("============================================");

    // Initialize auth
    const initAuth = async () => {
      try {
        // Set persistence BEFORE checking redirect result
        console.log("Setting up auth persistence...");
        await setPersistence(auth, browserLocalPersistence);
        console.log("✅ Persistence set to browserLocalPersistence");

        // Log Firebase configuration
        console.log("🔧 Firebase Config:");
        console.log("  Auth domain:", auth.config.authDomain);
        console.log("  API key exists:", !!auth.config.apiKey);
        console.log("  Current origin:", window.location.origin);
        console.log("  Current hostname:", window.location.hostname);

        // Check if we're returning from a redirect
        const urlParams = new URLSearchParams(window.location.search);
        const hasAuthParams = window.location.href.includes('google') || 
                             document.referrer.includes('google') ||
                             urlParams.has('state') ||
                             urlParams.has('code');
        
        console.log("🔍 Checking for redirect indicators:");
        console.log("  - Has auth params:", hasAuthParams);
        console.log("  - URL contains 'google':", window.location.href.includes('google'));
        console.log("  - Referrer contains 'google':", document.referrer.includes('google'));
        console.log("  - URL params:", Array.from(urlParams.keys()).join(', ') || 'none');

        // Check for redirect result
        console.log("⏳ Checking for redirect result...");
        const result = await getRedirectResult(auth);
        setRedirectChecked(true);
        
        console.log("============================================");
        console.log("REDIRECT RESULT RECEIVED");
        console.log("Timestamp:", new Date().toISOString());
        console.log("Result exists:", !!result);
        
        if (result && result.user) {
          console.log("✅ SUCCESS - User authenticated via redirect!");
          console.log("Result Details:");
          console.log("  User:", result.user.email || "null");
          console.log("  Operation Type:", result.operationType || "unknown");
          console.log("  Provider ID:", result.providerId || "unknown");
          
          console.log("User from redirect:");
          console.log("  UID:", result.user.uid);
          console.log("  Email:", result.user.email);
          console.log("  Display Name:", result.user.displayName);
          
          // Explicitly set user state from redirect
          setUser(result.user);
          setLoading(false);
        } else {
          console.log("ℹ️ No redirect result found");
          if (hasAuthParams) {
            console.warn("⚠️ WARNING: Auth params detected but no result. Possible issues:");
            console.warn("  1. Firebase config mismatch");
            console.warn("  2. Authorized domains not configured");
            console.warn("  3. API key restrictions");
          }
        }
        console.log("============================================");
      } catch (err) {
        console.error("============================================");
        console.error("❌ REDIRECT ERROR");
        console.error("Timestamp:", new Date().toISOString());
        
        const error = err as { code?: string; message?: string };
        if (error.code) {
          console.error("Error Code:", error.code);
        }
        if (error.message) {
          console.error("Error Message:", error.message);
        }
        console.error("Full Error:", err);
        
        // Common error codes and solutions
        if (error.code === 'auth/unauthorized-domain') {
          console.error("🔧 FIX: Add your domain to Firebase Console → Authentication → Settings → Authorized domains");
        } else if (error.code === 'auth/operation-not-allowed') {
          console.error("🔧 FIX: Enable Google Sign-In in Firebase Console → Authentication → Sign-in method");
        }
        
        console.error("============================================");
        setRedirectChecked(true);
        setLoading(false);
      }
    };

    // Run initialization
    initAuth();

    // Set up auth state listener
    console.log("👂 Setting up onAuthStateChanged listener...");
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      console.log("--------------------------------------------");
      console.log("🔔 AUTH STATE CHANGED EVENT");
      console.log("Timestamp:", new Date().toISOString());
      console.log("User exists:", !!firebaseUser);
      console.log("Redirect checked:", redirectChecked);
      
      if (firebaseUser) {
        console.log("✅ User authenticated:");
        console.log("  UID:", firebaseUser.uid);
        console.log("  Email:", firebaseUser.email);
        console.log("  Display Name:", firebaseUser.displayName);
        console.log("  Photo URL:", firebaseUser.photoURL);
        console.log("  Email Verified:", firebaseUser.emailVerified);
        console.log("  Provider Data:", JSON.stringify(firebaseUser.providerData));
      } else {
        console.log("❌ User is NULL");
      }
      
      setUser(firebaseUser);
      // Only set loading false if redirect was already checked
      if (redirectChecked) {
        setLoading(false);
      }
      console.log("--------------------------------------------");
    });

    // Check localStorage/sessionStorage
    console.log("💾 Checking storage...");
    try {
      console.log("localStorage available:", !!window.localStorage);
      console.log("sessionStorage available:", !!window.sessionStorage);
      
      // Check for Firebase auth keys
      const allKeys = Object.keys(localStorage);
      const authKeys = allKeys.filter(key => 
        key.includes('firebase') || key.includes('auth')
      );
      console.log("All localStorage keys:", allKeys.length);
      console.log("Firebase auth keys in localStorage:", authKeys);
      
      if (authKeys.length > 0) {
        authKeys.forEach(key => {
          const value = localStorage.getItem(key);
          if (value) {
            console.log(`  ${key}: ${value.substring(0, 50)}...`);
          }
        });
      } else {
        console.log("⚠️ No Firebase auth keys found in localStorage");
      }
    } catch (storageError) {
      console.error("Storage check error:", storageError);
    }

    return () => {
      console.log("🔌 AUTH PROVIDER UNMOUNTING");
      unsubscribe();
    };
  }, [redirectChecked]);

  const logout = async () => {
    console.log("============================================");
    console.log("🚪 LOGOUT INITIATED");
    try {
      await signOut(auth);
      setUser(null);
      console.log("✅ Logout successful");
    } catch (error) {
      console.error("❌ Logout error:", error);
    }
    console.log("============================================");
  };

  const loginWithGoogle = async () => {
    console.log("============================================");
    console.log("🔐 LOGIN WITH GOOGLE INITIATED");
    console.log("Timestamp:", new Date().toISOString());
    console.log("Current location:", window.location.href);
    
    const provider = new GoogleAuthProvider();
    provider.addScope('email');
    provider.addScope('profile');
    
    // Force account selection
    provider.setCustomParameters({
      prompt: 'select_account'
    });
    
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);
    console.log("📱 Device info:");
    console.log("  Is Mobile:", isMobile);
    console.log("  Is iOS:", isIOS);
    console.log("  User Agent:", navigator.userAgent);
    
    try {
      // Set persistence before attempting login
      console.log("Setting persistence...");
      await setPersistence(auth, browserLocalPersistence);
      console.log("✅ Persistence set");
      
      // For mobile, always use redirect
      // For desktop, use popup which is more reliable
      if (isMobile) {
        console.log("📲 Using signInWithRedirect for mobile...");
        console.log("🚀 About to redirect...");
        await signInWithRedirect(auth, provider);
      } else {
        console.log("💻 Using signInWithPopup for desktop...");
        const result = await signInWithPopup(auth, provider);
        console.log("✅ Popup login successful");
        console.log("User:", result.user.email);
      }
    } catch (err) {
      console.error("============================================");
      console.error("❌ LOGIN ERROR");
      
      const error = err as { code?: string; message?: string };
      console.error("Error Code:", error.code);
      console.error("Error Message:", error.message);
      console.error("Full Error:", err);
      
      if (error.code === 'auth/unauthorized-domain') {
        alert('Configuration error: This domain is not authorized. Please contact support.');
        console.error('🔧 FIX: Check Firebase Console → Authentication → Settings → Authorized domains');
        console.error('Make sure both kroztek.com and YOUR-PROJECT.firebaseapp.com are listed');
      } else if (error.code === 'auth/popup-blocked') {
        alert('Popup was blocked. Please allow popups for this site and try again.');
      } else if (error.code === 'auth/cancelled-popup-request') {
        console.log('ℹ️ User cancelled login');
      } else {
        alert('Login failed: ' + (error.message || 'Unknown error'));
      }
      console.error("============================================");
    }
    console.log("============================================");
  };

  console.log("🎨 RENDER - User:", user?.email || "null", "Loading:", loading);

  return (
    <AuthContext.Provider value={{ user, loading, logout, loginWithGoogle }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}