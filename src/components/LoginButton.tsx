"use client";

import Link from "next/link";
import { useAuth } from "../app/context/AuthContext";

export default function LoginButton() {
  const { user, logout, loading } = useAuth();

  if (loading) {
    return <div className="px-4 py-2">Loading...</div>;
  }

  if (user) {
    return (
      <div className="flex items-center gap-4">
        <span className="text-sm">Hi, {user.displayName || user.email}</span>
        <button 
          onClick={logout} 
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
        >
          Logout
        </button>
      </div>
    );
  }

  return (
    <Link 
      href="/login" 
      className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
    >
      Login / Sign Up
    </Link>
  );
}