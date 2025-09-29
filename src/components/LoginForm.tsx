"use client";

import { useState } from "react";
import { useAuth } from "../app/context/AuthContext";
import { useRouter } from "next/navigation";

export default function AuthForm() {
  const [mode, setMode] = useState<"login" | "reset" | "magic">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const { login, resetPassword, sendMagicLink } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      if (mode === "login") {
        await login(email, password);
        router.push("/");
      } else if (mode === "reset") {
        await resetPassword(email);
        setSuccess("Password reset email sent! Check your inbox.");
        setEmail("");
      } else if (mode === "magic") {
        await sendMagicLink(email);
        setSuccess("Magic link sent to your email! Click the link to sign in. (Link expires in 1 hour)");
        setEmail("");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 bg-gray-50">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6 sm:p-8">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
            {mode === "magic"
              ? "Sign in with Email"
              : mode === "reset"
              ? "Reset Password"
              : "Welcome To KROZTEK!"}
          </h1>
          <p className="text-gray-600 text-sm sm:text-base mt-2">
            {mode === "magic"
              ? "We'll send you a magic link"
              : mode === "reset"
              ? "Enter your email to reset password"
              : "Sign in to your account"}
          </p>
        </div>

        {/* Error/Success */}
        {error && (
          <div className="mb-4 p-3 rounded bg-red-100 text-red-700 text-sm">{error}</div>
        )}
        {success && (
          <div className="mb-4 p-3 rounded bg-green-100 text-green-700 text-sm">{success}</div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded-lg text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="your@email.com"
            />
          </div>

          {mode === "login" && (
            <div>
              <label className="block text-sm font-medium mb-1">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-3 py-2 border rounded-lg text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="••••••••"
              />
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 sm:py-3 rounded-lg font-medium bg-blue-600 text-white hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
          >
            {loading
              ? "Processing..."
              : mode === "login"
              ? "Sign In"
              : mode === "magic"
              ? "Send Magic Link"
              : "Send Reset Email"}
          </button>
        </form>

        {/* Magic Link + Forgot Password */}
        {mode === "login" && (
          <>
            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Or</span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  setMode("magic");
                  setError("");
                  setSuccess("");
                  setPassword("");
                }}
                className="mt-4 w-full py-2.5 rounded-lg bg-purple-600 text-white hover:bg-purple-700 transition-colors flex items-center justify-center gap-2 text-sm sm:text-base"
              >
                ✨ Sign in with Email Link
              </button>
            </div>

            <div className="mt-4 text-center">
              <button
                type="button"
                onClick={() => {
                  setMode("reset");
                  setError("");
                  setSuccess("");
                  setPassword("");
                }}
                className="text-sm text-blue-600 hover:underline"
              >
                Forgot password?
              </button>
            </div>
          </>
        )}

        {/* Back to Login */}
        {(mode === "reset" || mode === "magic") && (
          <div className="mt-6 text-center">
            {mode === "magic" && (
              <p className="text-xs text-gray-500 mb-2">
                No password needed! We&apos;ll email you a secure link.
              </p>
            )}
            <button
              type="button"
              onClick={() => {
                setMode("login");
                setError("");
                setSuccess("");
              }}
              className="text-sm text-blue-600 hover:underline"
            >
              Back to login
            </button>
          </div>
        )}

        {/* Note for new users */}
        {mode === "magic" && (
          <div className="mt-6 p-3 bg-blue-50 rounded-lg text-sm text-gray-700">
            <p className="font-medium mb-1">✨ New user?</p>
            <p className="text-xs">
              Don&apos;t worry! If you don&apos;t have an account, we&apos;ll create one for you automatically when you click the magic link.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
