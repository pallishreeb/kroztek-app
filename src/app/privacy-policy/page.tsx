/** @format */

"use client";

export default function PrivacyPolicyPage() {
  return (
    <div className="container mx-auto px-6 py-12 text-gray-700 leading-relaxed">
      <h1 className="text-3xl md:text-4xl font-bold text-center text-indigo-700 mb-8">
        Privacy Policy
      </h1>

      <p className="mb-6 text-center max-w-3xl mx-auto">
        This Privacy Policy explains how <strong>Kroztek</strong> collects, uses, and protects
        your information when you visit our website or contact us for purchasing
        industrial electrical products.
      </p>

      <div className="space-y-6 max-w-4xl mx-auto">
        <section>
          <h2 className="text-xl font-semibold mb-2">1. Information We Collect</h2>
          <p>
            We may collect basic personal details such as your name, company name,
            contact number, email address, and delivery address when you contact us
            through call, WhatsApp, or our inquiry form. We do not collect or store
            any sensitive payment information through our website.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">2. How We Use Your Information</h2>
          <p>
            The information you share helps us process your product inquiries, confirm
            orders, calculate shipping costs, and provide customer support or warranty
            service when needed. We may also use your contact details to share updates
            about your order or provide after-sales assistance.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">3. Product Policy & Warranty</h2>
          <p>
            Kroztek does not accept product returns once the item has been delivered.
            However, we provide a proper <strong>warranty and service support</strong> if
            the product has been installed and used as per the installation manual or
            our provided guidelines. Warranty claims are subject to manufacturer
            policy and verification of installation standards.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">4. Service and Support</h2>
          <p>
            In case of product-related issues, customers can reach out to our support
            team through call or WhatsApp. Our technical team will assist remotely or
            coordinate on-site service (if applicable). We aim to provide fair and
            transparent post-purchase support within the warranty period.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">5. Data Security</h2>
          <p>
            We respect your privacy and ensure that your data is not shared or sold to
            third parties. All customer information is securely stored and used only
            for communication and service purposes directly related to your purchase.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">6. Cookies & Analytics</h2>
          <p>
            Our website may use cookies or simple analytics tools to understand how
            visitors use our site. This helps us improve our product listings and
            customer experience. You can choose to disable cookies in your browser
            settings at any time.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">7. Policy Updates</h2>
          <p>
            We may update this Privacy Policy from time to time as our services
            expand. The latest version will always be available on this page.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">8. Contact Us</h2>
          <p>
            For any questions or concerns about our Privacy Policy, please contact us:
          </p>
          <ul className="list-disc ml-6 mt-2">
            <li>📞 Phone: +91 8637214899</li>
            <li>💬 WhatsApp: Click the icon on any product page</li>
            <li>✉️ Email: admin@kroztek.com</li>
            <li>🌐 Website: www.kroztek.com</li>
          </ul>
        </section>
      </div>

      <p className="text-center text-sm text-gray-500 mt-12">
        © {new Date().getFullYear()} Kroztek. All rights reserved.
      </p>
    </div>
  );
}
