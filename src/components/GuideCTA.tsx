import Link from "next/link";

export default function GuideCTA() {
  return (
    <section className="bg-gradient-to-r from-indigo-50 to-white py-6 px-6 rounded-2xl shadow-sm text-center my-8">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
        🛒 New to Kroztek?
      </h2>
      <p className="text-gray-600 max-w-2xl mx-auto mb-6">
        Buying from us is simple and transparent. Follow our step-by-step{" "}
        <span className="font-semibold">Guide to Buy</span> to place your order smoothly and confidently.
      </p>
      <Link
        href="/guide-to-buy"
        className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 transition"
      >
        Read Guide to Buy →
      </Link>
    </section>
  );
}
