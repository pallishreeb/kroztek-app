"use client";

import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../lib/firebase";
import { useAuth } from "../app/context/AuthContext";

export default function LoginButton() {
  const { user, logout, loading } = useAuth();

  const loginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
  };

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
