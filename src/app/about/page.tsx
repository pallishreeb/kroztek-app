"use client";
import WhyChoose from "@/components/WhyChooseUs";
import Image from "next/image";

export default function AboutUsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative container mx-auto px-6 py-20">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
              About KROZTEK
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 leading-relaxed">
              Your trusted partner for CG Emotron Drives & Automation Products,
              Spares And Services
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-16">
        {/* Company Overview */}
        <div className="max-w-4xl mx-auto mb-20">
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 border border-gray-100">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
                Leading the Industry Forward
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 mx-auto mb-6"></div>
            </div>
            <p className="text-gray-600 text-lg leading-relaxed text-center max-w-3xl mx-auto">
              KROZTEK is a trusted provider of CG Emotron Drives & Automation
              Products, Spares And Services in India. As an authorized dealer
              and service provider, we are committed to delivering reliable
              products and exceptional service to our clients. Our team ensures
              compliance, efficiency, and customer satisfaction across all our
              services.
            </p>
          </div>
        </div>

        {/* Key Features */}
        <WhyChoose />

        {/* Mission Section */}
        <div className="max-w-4xl mx-auto mt-20">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl text-white p-8 md:p-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Mission</h2>
            <p className="text-xl leading-relaxed text-blue-100">
              At Kroztek, our mission is to empower industrial factories and
              manufacturers with top-quality electrical solutions. We prioritize
              innovation, safety, and customer satisfaction in every project,
              building lasting partnerships through reliable service and genuine
              products.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
