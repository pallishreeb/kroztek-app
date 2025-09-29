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
    // Primary auth listener - this catches both popup AND redirect results
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      console.log("Auth state changed:", firebaseUser?.email || "null");
      setUser(firebaseUser);
      setLoading(false);
    });

    // Also check redirect result (backup, though onAuthStateChanged should catch it)
    getRedirectResult(auth)
      .then((result) => {
        if (result?.user) {
          console.log("Redirect result found:", result.user.email);
        }
      })
      .catch((err) => {
        console.error("Redirect error:", err);
      });

    return () => unsubscribe();
  }, []);

  const logout = async () => {
    await signOut(auth);
  };

  const loginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    
    try {
      if (isMobile) {
        console.log("Mobile: using redirect");
        await signInWithRedirect(auth, provider);
      } else {
        console.log("Desktop: using popup");
        await signInWithPopup(auth, provider);
      }
    } catch (err) {
      console.error("Login error:", err);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, logout, loginWithGoogle }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}