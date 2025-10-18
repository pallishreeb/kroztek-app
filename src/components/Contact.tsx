/** @format */
"use client";
import { useState, useEffect } from "react";
import { Phone, Mail, MapPin, CheckCircle2, XCircle } from "lucide-react";
import { submitToSheetKroztek } from "@/utils/submitToSheetKroztek";

export default function ContactSection() {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"success" | "error" | null>(null);

  useEffect(() => {
    if (status) {
      const timer = setTimeout(() => setStatus(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [status]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    const form = e.currentTarget;

    const formData = {
      name: (form.elements.namedItem("name") as HTMLInputElement)?.value || "",
      email: (form.elements.namedItem("email") as HTMLInputElement)?.value || "",
      phone: (form.elements.namedItem("tel") as HTMLInputElement)?.value || "",
      companyName:
        (form.elements.namedItem("companyName") as HTMLInputElement)?.value || "",
      foundBy:
        (form.elements.namedItem("foundBy") as HTMLSelectElement)?.value || "",
      message:
        (form.elements.namedItem("message") as HTMLTextAreaElement)?.value || "",
    };

    const result = await submitToSheetKroztek(formData);
    setLoading(false);

    if (result.success) {
      form.reset();
      setStatus("success");
    } else {
      setStatus("error");
    }
  };

  return (
    <section className="px-4 sm:px-6 lg:px-20 py-12 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-6xl bg-white rounded-lg shadow-2xl overflow-hidden">
        <div className="grid lg:grid-cols-2">
          {/* Contact Info */}
          <div className="bg-gradient-to-r from-blue-700 to-blue-800 p-8 lg:p-12 text-white">
            <h3 className="text-2xl font-medium mb-12">Contact Information</h3>
            <div className="space-y-8">
              <div className="flex items-start space-x-4">
                <Phone className="w-6 h-6" />
                <span>+91 8637214899</span>
              </div>
              <div className="flex items-start space-x-4">
                <Mail className="w-6 h-6" />
                <div>
                  kroztekintegratedsolution@gmail.com
                  <br />
                  admin@kroztek.com
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <MapPin className="w-6 h-6" />
                <span>Dhenkanal, Odisha</span>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="p-8 lg:p-12 relative">
            <form onSubmit={handleSubmit} className="space-y-5 relative pb-10">
              <input
                name="name"
                type="text"
                placeholder="Name *"
                required
                className="w-full px-5 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-600 outline-none"
              />
              <input
                name="email"
                type="email"
                placeholder="Email"
                className="w-full px-5 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-600 outline-none"
              />
              <input
                name="tel"
                type="tel"
                placeholder="Phone Number *"
                required
                className="w-full px-5 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-600 outline-none"
              />
              <input
                name="companyName"
                type="text"
                placeholder="Company Name (optional)"
                className="w-full px-5 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-600 outline-none"
              />
              <select
                name="foundBy"
                className="w-full px-5 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-600 bg-white text-black"
              >
                <option value="">How did you find us?</option>
                <option value="google">Google Search</option>
                <option value="referral">Referral</option>
                <option value="social">Social Media</option>
                <option value="other">Other</option>
              </select>
              <textarea
                name="message"
                placeholder="How can we help? *"
                rows={3}
                required
                className="w-full px-5 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-600 outline-none"
              ></textarea>

              <button
                type="submit"
                disabled={loading}
                className={`w-full bg-blue-700 text-white py-3 rounded-md font-medium transition-all ${
                  loading
                    ? "bg-blue-400 cursor-not-allowed"
                    : "hover:bg-blue-800 transform hover:scale-[1.02]"
                }`}
              >
                {loading ? "Sending..." : "Send Message"}
              </button>

              {/* Toast */}
              {status && (
                <div
                  className={`absolute bottom-2 left-1/2 transform -translate-x-1/2 px-4 py-3 rounded-lg shadow-lg text-white flex items-center gap-2 text-sm transition-all ${
                    status === "success" ? "bg-green-600" : "bg-red-600"
                  }`}
                >
                  {status === "success" ? (
                    <>
                      <CheckCircle2 className="w-5 h-5" />
                      <span>Message sent successfully!</span>
                    </>
                  ) : (
                    <>
                      <XCircle className="w-5 h-5" />
                      <span>Something went wrong. Please try again.</span>
                    </>
                  )}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
