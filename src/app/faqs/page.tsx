/** @format */

"use client";
import { useState } from "react";

const faqs = [
  {
    question: "How can I place an order?",
    answer: `Currently, we are accepting orders only through direct call or WhatsApp. 
You can browse the products on our website, note the model you’re interested in, and contact us at +91 8637214899 or via WhatsApp to place your order. 
Our team will assist you with price, availability, and delivery details.`,
  },
  {
    question: "Do you provide shipping across India?",
    answer: `Yes, we ship all over India through trusted courier partners. 
Shipping cost depends on your location and product weight, which we calculate after receiving your address. 
You only pay the actual courier charge — no hidden fees.`,
  },
  {
    question: "What brands do you deal with?",
    answer: `We are specialized in supplying Crompton Greaves (CG Emotron) industrial products including VSX, VSM, and VSS series AC Drives. 
We are also expanding to other industrial automation and electrical equipment categories.`,
  },
  {
    question: "What warranty do your products carry?",
    answer: `All products come with a standard manufacturer warranty as per brand policy. 
Typically, Crompton Emotron drives include a 12-month warranty from the date of purchase. 
Warranty terms vary depending on the product and brand.`,
  },
  {
    question: "Can I get a GST invoice for my purchase?",
    answer: `Yes, every order comes with a valid GST invoice. 
Once your order is confirmed and payment completed, we will share the invoice via email or WhatsApp before dispatch.`,
  },
  {
    question: "Do you offer installation or service support?",
    answer: `For bulk or industrial orders, we can assist in connecting you with authorized service or installation partners. 
We also provide remote guidance for configuration or setup if required.`,
  },
  {
    question: "How can I contact Kroztek?",
    answer: `You can reach us easily via:
- 📞 Call: +91 8637214899  
- 💬 WhatsApp: Click the icon on any product page  
- ✉️ Email: support@kroztek.com  

We are available Monday to Saturday, 9:00 AM – 7:00 PM.`,
  },
];

const FAQSection = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <section className="bg-white px-4 sm:px-6 lg:px-20 2xl:px-32 3xl:px-48 py-12 sm:py-16 lg:py-20 2xl:py-24 3xl:py-28">
      <div className="mx-auto max-w-4xl 2xl:max-w-5xl 3xl:max-w-7xl">
        <h2 className="text-3xl sm:text-4xl lg:text-6xl 2xl:text-7xl 3xl:text-8xl font-medium text-[#3D3D3D] text-center mb-12 sm:mb-16 lg:mb-20 2xl:mb-24">
          Frequently Asked Questions
        </h2>

        <div className="space-y-7 2xl:space-y-9 3xl:space-y-12">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`rounded-3xl transition-all duration-300 ${
                openFaq === index
                  ? "bg-[#F7F6F2] p-6 sm:p-8 2xl:p-10 3xl:p-12"
                  : "bg-[#F7F6F2] shadow-sm p-6 sm:p-8 2xl:p-10 3xl:p-12"
              }`}
            >
              <button
                className="w-full flex items-center justify-between text-left"
                onClick={() => toggleFaq(index)}
                aria-expanded={openFaq === index}
                aria-controls={`faq-${index}`}
              >
                <span className="text-base sm:text-lg 2xl:text-2xl 3xl:text-3xl font-medium text-[#333333] pr-4">
                  {faq.question}
                </span>
                <div
                  className={`w-10 h-10 sm:w-12 sm:h-12 2xl:w-14 2xl:h-14 3xl:w-16 3xl:h-16 rounded-full flex items-center justify-center transition-colors ${
                    openFaq === index
                      ? "bg-[#052557]"
                      : "bg-[#F7F6F2] shadow-lg"
                  }`}
                >
                  <svg
                    className={`w-5 h-5 2xl:w-6 2xl:h-6 3xl:w-7 3xl:h-7 transition-transform duration-300 ${
                      openFaq === index
                        ? "rotate-180 text-[#F7F6F2]"
                        : "text-[#052557]"
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </button>

              {openFaq === index && (
                <div
                  id={`faq-${index}`}
                  className="mt-6 text-sm sm:text-base  2xl:text-xl 3xl:text-2xl text-[#626262] leading-relaxed"
                >
                  {faq.answer.split("\n").map((line, i) => (
                    <p key={i} className="mb-3">
                      {line}
                    </p>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
