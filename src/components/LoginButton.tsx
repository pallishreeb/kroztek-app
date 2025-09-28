"use client";

import { GoogleAuthProvider, signInWithPopup, signInWithRedirect, getRedirectResult } from "firebase/auth";
import { auth } from "../lib/firebase";
import { useAuth } from "../app/context/AuthContext";
import { useEffect } from "react";

export default function LoginButton() {
  const { user, logout, loading } = useAuth();

  const loginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    if (/Mobi|Android/i.test(navigator.userAgent)) {
      // Use redirect on mobile
      await signInWithRedirect(auth, provider);
    } else {
      // Use popup on desktop
      await signInWithPopup(auth, provider);
    }
  };

  // Handle redirect result (needed for mobile login)
  useEffect(() => {
    getRedirectResult(auth)
      .then((result) => {
        if (result?.user) {
          console.log("Logged in via redirect:", result.user);
        }
      })
      .catch((err) => console.error(err));
  }, []);

  if (loading) return <button>Loading...</button>;

  return user ? (
    <button onClick={logout} className="px-4 py-2 bg-red-500 text-white rounded">
      Logout
    </button>
  ) : (
    <button
      onClick={loginWithGoogle}
      className="px-4 py-2 bg-blue-500 text-white rounded"
    >
      Login with Google
    </button>
  );
}
