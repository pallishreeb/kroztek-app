// "use client";

// import { useState } from "react";
// import { useAuth } from "../context/AuthContext";
// import { Mail, Lock, LogIn, UserPlus, RefreshCw, LogOut } from "lucide-react";

// export default function LoginForm() {
//   const { user, logout, login, register, resetPassword, loading } = useAuth();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [isRegister, setIsRegister] = useState(false);
//   const [isReset, setIsReset] = useState(false);
//   const [message, setMessage] = useState("");

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center min-h-screen">
//         <p className="text-gray-600 animate-pulse">Loading...</p>
//       </div>
//     );
//   }

//   if (user) {
//     return (
//       <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4">
//         <div className="w-full max-w-md bg-white rounded-2xl shadow-md p-6 text-center">
//           <p className="text-lg font-semibold text-gray-700 mb-4">
//             Welcome, <span className="text-blue-600">{user.email}</span>
//           </p>
//           <button
//             onClick={logout}
//             className="flex items-center justify-center gap-2 w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition"
//           >
//             <LogOut className="w-5 h-5" />
//             Logout
//           </button>
//         </div>
//       </div>
//     );
//   }

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       if (isReset) {
//         await resetPassword(email);
//         setMessage("📩 Password reset email sent! Check your inbox.");
//       } else if (isRegister) {
//         await register(email, password);
//         setMessage("✅ Account created successfully!");
//       } else {
//         await login(email, password);
//         setMessage("🎉 Login successful!");
//       }
//       setEmail("");
//       setPassword("");
//     } catch (err: any) {
//       setMessage(err.message);
//     }
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gray-50 px-4">
//       <div className="w-full max-w-md bg-white rounded-2xl shadow-md p-6">
//         <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
//           {isReset ? "Reset Password" : isRegister ? "Create Account" : "Login"}
//         </h2>

//         {message && (
//           <p className="text-sm text-center mb-4 text-green-600">{message}</p>
//         )}

//         <form onSubmit={handleSubmit} className="space-y-4">
//           {/* Email */}
//           <div className="relative">
//             <Mail className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
//             <input
//               type="email"
//               placeholder="Email address"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700"
//               required
//             />
//           </div>

//           {/* Password */}
//           {!isReset && (
//             <div className="relative">
//               <Lock className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
//               <input
//                 type="password"
//                 placeholder="Password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700"
//                 required
//               />
//             </div>
//           )}

//           {/* Submit button */}
//           <button
//             type="submit"
//             className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
//           >
//             {isReset ? (
//               <>
//                 <RefreshCw className="w-5 h-5" /> Send Reset Email
//               </>
//             ) : isRegister ? (
//               <>
//                 <UserPlus className="w-5 h-5" /> Register
//               </>
//             ) : (
//               <>
//                 <LogIn className="w-5 h-5" /> Login
//               </>
//             )}
//           </button>
//         </form>

//         {/* Links */}
//         <div className="mt-4 text-center space-y-2">
//           {!isReset && (
//             <button
//               type="button"
//               onClick={() => setIsRegister(!isRegister)}
//               className="text-blue-600 hover:underline text-sm"
//             >
//               {isRegister
//                 ? "Already have an account? Login"
//                 : "New user? Register"}
//             </button>
//           )}

//           <button
//             type="button"
//             onClick={() => {
//               setIsReset(!isReset);
//               setMessage("");
//             }}
//             className="text-blue-600 hover:underline text-sm block"
//           >
//             {isReset ? "⬅ Back to login" : "Forgot Password?"}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }
