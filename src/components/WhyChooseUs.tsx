import Image from "next/image";

export default function GuideCTA() {
  return (
    <section className="">


      {/* Certificates Section */}
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Certificates & Credentials
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Our certifications and documentation that validate our commitment to
            quality and compliance
          </p>
        </div>

        {/* Images Grid - 3 Column Layout */}
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8">
          {/* Service Certificate */}
          <div className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500">
            <div className="aspect-[4/3] relative overflow-hidden">
              <Image
                src="/service.jpg"
                alt="Authorized Dealer Certificate"
                width={600}
                height={400}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            <div className="p-6">
              <h3 className="font-bold text-lg text-gray-800 mb-2">
                Service Certificate
              </h3>
              <p className="text-gray-600 text-sm">
                Official authorization for professional service delivery
              </p>
            </div>
          </div>

          {/* Product Certificate */}
          <div className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500">
            <div className="aspect-[4/3] relative overflow-hidden">
              <Image
                src="/product.jpg"
                alt="Product Quality Certificate"
                width={600}
                height={400}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            <div className="p-6">
              <h3 className="font-bold text-lg text-gray-800 mb-2">
                Product Certificate
              </h3>
              <p className="text-gray-600 text-sm">
                Certification for authentic product distribution
              </p>
            </div>
          </div>

          {/* GST Certificate */}
          <div className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 md:col-span-2 lg:col-span-1">
            <div className="aspect-[4/3] relative overflow-hidden">
              <Image
                src="/gst.png"
                alt="GST Registration Certificate"
                width={600}
                height={400}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            <div className="p-6">
              <h3 className="font-bold text-lg text-gray-800 mb-2">
                GST Certificate
              </h3>
              <p className="text-gray-600 text-sm">
                Government registration and tax compliance document
              </p>
            </div>
          </div>
        </div>
      </div>

            {/* Key Features */}
      <div className="max-w-6xl mx-auto mb-20 mt-12">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12">
          Why Choose KROZTEK?
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {/* GST Registration */}
          <div className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-blue-200">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              GST Registered
            </h3>
            <p className="text-gray-600 mb-4">
              Fully compliant with Indian tax regulations
            </p>
            <p className="text-sm font-mono bg-blue-50 text-blue-700 px-3 py-2 rounded-lg">
              GSTIN: 21EOUPS1807D1ZX
            </p>
          </div>

          {/* Authorized Dealer */}
          <div className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-green-200">
            <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                ></path>
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              Authorized Dealer
            </h3>
            <p className="text-gray-600">
              Certified to provide genuine products and services for leading
              brands with complete warranty support.
            </p>
          </div>

          {/* Service Provider */}
          <div className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-amber-200">
            <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-amber-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                ></path>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                ></path>
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              Professional Service
            </h3>
            <p className="text-gray-600">
              Our skilled team ensures professional installation, maintenance,
              and timely service for all equipment.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
