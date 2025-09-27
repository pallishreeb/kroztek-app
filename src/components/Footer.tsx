/** @format */
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-[#111827] px-6 lg:px-16 2xl:px-32 3xl:px-48 py-12 2xl:py-16 3xl:py-20">
      <div className="max-w-7xl 3xl:max-w-[1600px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 2xl:gap-16 3xl:gap-20 mb-12">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-lg 2xl:text-xl text-[#F7F6F2] mb-6 font-semibold">
              Kroztek Integrated Solution
            </h3>
            <p className="text-sm 2xl:text-base 3xl:text-lg text-[#F7F6F2] leading-relaxed max-w-72 2xl:max-w-80">
               Kroztek Integrated Solution | Industrial Solutions | Authorized dealer & service partner for CG Emotron drives
            </p>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="text-lg 2xl:text-xl text-[#F7F6F2] mb-6 font-semibold">
              Product
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/series"
                  className="text-sm 2xl:text-base text-[#F7F6F2] hover:text-white transition"
                >
                  Products
                </Link>
              </li>
              <li>
                <Link
                  href="/case-studies"
                  className="text-sm 2xl:text-base text-[#F7F6F2] hover:text-white transition"
                >
                  Case Studies
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-lg 2xl:text-xl text-[#F7F6F2] mb-6 font-semibold">
              Company
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/about"
                  className="text-sm 2xl:text-base text-[#F7F6F2] hover:text-white transition"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-sm 2xl:text-base text-[#F7F6F2] hover:text-white transition"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href="/faqs"
                  className="text-sm 2xl:text-base text-[#F7F6F2] hover:text-white transition"
                >
                  FAQs
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm 2xl:text-base text-[#F7F6F2] hover:text-white transition"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 className="text-lg 2xl:text-xl text-[#F7F6F2] mb-6 font-semibold">
              Connect
            </h3>
          <ul className="space-y-2">
              <li>
                <Link
                  href="#"
                  className="text-sm 2xl:text-base text-[#F7F6F2] hover:text-white transition"
                >
                  kroztekintegratedsolution@gmail.com
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm 2xl:text-base text-[#F7F6F2] hover:text-white transition"
                >
                  +918637214899
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm 2xl:text-base text-[#F7F6F2] hover:text-white transition"
                >
                  Dhenkanal,Odisha
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-700 pt-8 text-center">
          <p className="text-sm 2xl:text-base text-[#F7F6F2]">
            © 2025 Kroztek Integrated Solution. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;