/** @format */

"use client";
import { useState } from "react";

const faqs = [
  {
    question: "What is your warranty?",
    answer: `IDR provides a one-year warranty on all newly installed cabling and hardware. For some of cabling projects we can offer up to a 25 year warranty through the manufacturer if we use their solution from end to end. Warranty covers parts and labor. Warranty Exclusions include: Defects and damages caused by improper use, tampering, theft, fire, water or natural disaster.

All configuration services are covered by our 30 day warranty. During which time you may request minor configuration changes that do not require a complete system redesign.`,
  },
  {
    question: "Do you offer financing?",
    answer:
      "Yes, IDR works with third party finance vendors who can help to provide you with financing offers for deals of at least $1,000 in value.",
  },
  {
    question: "What are your normal hours of service:",
    answer:
      "IDR typically operates on a schedule of Monday through Friday between 7:00 a.m. to 6:00 p.m. We do schedule service during off hours but typically need advanced notice to schedule outside of our normal operating hours.",
  },
  {
    question:
      "I hear a lot about the cloud, what are the benefits of a cloud solution?",
    answer:
      "There are many benefits of using a cloud solution as opposed to a traditional security or network offering. For starters, the ease of management. You can access your cloud equipment and manage them from anywhere in the world with an internet capable device. For customers with many locations, you can have one single sign-on making it easy to manage all of your locations. Faster application velocity, you can begin deployment immediately and deploy apps quickly. With cloud solutions your firmware will always be up to date with automatic updating, which eliminates the need for constant basic maintenance, and even worrying about changes in technology making your traditional software obsolete.",
  },
  {
    question: "Do you offer security alarm monitoring services?",
    answer:
      "Yes IDR is partnered with MetroDial to offer these services. We are able to provide affordable and reliable monitoring through our partnership with MetroDial. MetroDial also has two central stations established on two completely separate power grids, which allows them to stay up at all times for all customers even during a power outage event.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus eu tortor sed justo interdum consectetur.",
  },
  {
    question: "Do you sell hardware?",
    answer:
      "Absolutely! We love selling hardware. We sell a large array of products including but not limited to, computers, chromebooks, servers, UPS and PDU’s, racks, ladder racks, security cameras, access control equipment, video displays, software and more!",
  },
  {
    question: "How do I place an order / schedule service?",
    answer:
      "You can call an order in by calling either our NYC or NJ office, or e-mail us at sales@idrtechnologysolutions.com. Existing clients can also contact their dedicated project manager or sales associate.",
  },
  {
    question: "What is your response time for a serious event?",
    answer:
      "For most responses we will schedule a technician within a 5 business days. In some instances if you have an emergency such as a door not being locked we will respond within 24-hours.",
  },
  {
    question: "Do you offer service agreements?",
    answer:
      "Yes, we offer service agreements for security systems and network support.  IDR is fully staffed with in-house support and service division.   All our technicians go through extensive training.   Service clients data is all documented in our service portal so you can see a history of service, even by the device! ",
  },
  {
    question: "What are the benefits of Service Agreements?",
    answer: `Faster Response Time, IDR prioritizes our clients who have service agreements, and for emergency service such as doors not locking or unlocking we will be there same day.

Weekend Emergency Service
While IDR only operates on a M-F schedule, we have technicians on call for weekend emergency service, this service is only available to our service agreement customers.

IDR handles everything
With a service agreement, if the parts are covered by the manufacturer, w handle the entire RMA process down to shipping and receiving, and reinstallation and programming.

Free Support
While IDR supports all of our clients for a limited amount of time post installation, those who have service agreements receive free support including configuration changes and pulling surveillance footage etc.`,
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
