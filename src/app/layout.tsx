import "./globals.css";
import { ReactNode } from "react";
import Navbar from "@/components/Navbar";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
export const metadata = {
  title: "Kroztek | Industrial Solutions",
  description: "Authorized dealer & service partner for CG Emotron drives",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900">
      
        <AuthProvider>
           <CartProvider>
        <Navbar />
        <main className="min-h-screen container mx-auto px-4 py-6">
          {children}
           <FloatingWhatsApp />
        </main>
         <Footer />
        </CartProvider>
        </AuthProvider>
        {/* <Footer /> */}
      </body>
    </html>
  );
}
