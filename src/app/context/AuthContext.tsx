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
    const checkRedirect = async () => {
      try {
        console.log("🔍 Checking for redirect result...");
        const result = await getRedirectResult(auth);

        if (result?.user) {
          console.log("✅ Redirect result user:", result.user);
          setUser(result.user);
        } else {
          console.log("ℹ️ No redirect result user found");
        }
      } catch (err) {
        console.error("❌ Redirect login error:", err);
      }
    };

    checkRedirect();

    console.log("👂 Setting up onAuthStateChanged listener...");
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      console.log("🔄 Auth state changed:", firebaseUser);
      setUser(firebaseUser);
      setLoading(false);
    });

    return () => {
      console.log("🧹 Cleaning up auth listener");
      unsubscribe();
    };
  }, []);

  const logout = async () => {
    console.log("🚪 Logging out...");
    await signOut(auth);
    setUser(null);
    console.log("✅ Logged out successfully");
  };

  const loginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    console.log("🔑 Starting Google login...");

    if (/Mobi|Android/i.test(navigator.userAgent)) {
      console.log("📱 Mobile device detected → using redirect");
      await signInWithRedirect(auth, provider);
    } else {
      console.log("💻 Desktop detected → using popup");
      try {
        const result = await signInWithPopup(auth, provider);
        console.log("✅ Popup login result user:", result.user);
        setUser(result.user);
      } catch (err) {
        console.error("❌ Popup login error:", err);
      }
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
