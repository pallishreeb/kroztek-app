"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../../lib/firebase";
import {
  onAuthStateChanged,
  signOut,
  User,
  getRedirectResult,
  GoogleAuthProvider,
  signInWithRedirect,
  signInWithPopup,
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
    // Listen for auth state changes
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);
    });

    // Handle redirect result (for mobile login)
    getRedirectResult(auth)
      .then((result) => {
        if (result?.user) {
          setUser(result.user);
        }
      })
      .catch((err) => console.error("Redirect login error:", err));

    return () => unsubscribe();
  }, []);

  const logout = () => signOut(auth);

  const loginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    if (/Mobi|Android/i.test(navigator.userAgent)) {
      // Redirect on mobile
      await signInWithRedirect(auth, provider);
    } else {
      // Popup on desktop
      await signInWithPopup(auth, provider);
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
