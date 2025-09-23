/** @format */
import Image from "next/image";
import { Phone, Mail, MapPin } from "lucide-react";
// import youtubeIcon from "@/assets/youtube.png";
// import linkedinIcon from "@/assets/linkedin.png";
// import facebookIcon from "@/assets/facebook.png";
import Link from "next/link";
// import instagramIcon from "@/assets/instagram_2.png";
// import tiktokIcon from "@/assets/tiktok_3.png";
const ContactSection = () => {
//   const socialLinks = [
//     {
//       href: "https://www.youtube.com/@Idrtechnologysolutions",
//       icon: youtubeIcon,
//       alt: "YouTube",
//     },
//     {
//       href: "https://www.linkedin.com/company/idr-technology-solutions",
//       icon: linkedinIcon,
//       alt: "LinkedIn",
//     },
//     {
//       href: "https://www.facebook.com/profile.php?id=100057472869428",
//       icon: facebookIcon,
//       alt: "Facebook",
//     },
//     {
//       href: "https://www.tiktok.com/@idrtechnologysolu?_t=ZP-8y9yjPO8tvL&_r=1",
//       icon: tiktokIcon,
//       alt: "TikTok",
//     },
//     {
//       href: "https://www.instagram.com/idrtechnologysolutions?igsh=MTNzcHBuanc3ZWM5ag%3D%3D&utm_source=qr",
//       icon: instagramIcon,
//       alt: "Instagram",
//     },
//   ];
  return (
    <section className="px-4 sm:px-6 lg:px-20 2xl:px-32 3xl:px-48 py-12 sm:py-16 lg:py-20 2xl:py-24 3xl:py-28">
      <div className="mx-auto max-w-6xl 2xl:max-w-7xl 3xl:max-w-[1700px]">
        <div className="mb-8 2xl:mb-12">
          <h2 className="text-3xl sm:text-2xl lg:text-3xl 3xl:text-4xl font-medium text-[#3D3D3D] text-center mb-12 sm:mb-16 leading-tight">
            Contact us
          </h2>
          <p className="text-lg 2xl:text-xl 3xl:text-2xl text-[#333] font-light max-w-4xl">
            Leave an inquiry or contact us via email and phone. We will contact
            you within 24 hours during work days
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-2xl overflow-hidden">
          <div className="grid lg:grid-cols-2">
            {/* Contact Info */}
            <div className="bg-gradient-to-br from-[#144187] to-[#052557] p-8 lg:p-12 2xl:p-16 text-white relative">
              {/* Decorative circles */}
              <div className="absolute bottom-0 right-0 w-48 h-48 rounded-full bg-[#052557] bg-opacity-76 z-10"></div>
              <div className="absolute bottom-25 right-28 w-28 h-28 rounded-full bg-[#052557]/58 "></div>

              <div className="relative z-10">
                <h3 className="text-2xl 2xl:text-3xl font-medium mb-12 text-left">
                  Contact Information
                </h3>

                <div className="space-y-8 text-base 2xl:text-lg 3xl:text-xl leading-relaxed">
                  {/* Phone */}
                  <div className="flex items-start space-x-4">
                    <Phone className="w-6 h-6" />
                    <div>
                      +918637214899
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex flex-col items-start space-x-4">
                    <Mail className="w-6 h-6" />
                    <div>
                      Sales:
                      <br />
                      kroztekintegratedsolution@gmail.com
                    </div>
                    <br />
                    <div>
                      Support:
                      <br />
                      kroztekintegratedsolution@gmail.com
                    </div>
                  </div>

                  {/* Address */}
                  <div className="flex items-start space-x-4">
                    <MapPin className="w-6 h-6" />
                    <div>Dhenkanal,Odisha</div>
                  </div>
                </div>

                {/* Social Media */}
                {/* <div className="mt-16 flex justify-start space-x-4">
                  {socialLinks?.map((item, i) => (
                    <Link
                      key={i}
                      href={item?.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-white/20 rounded flex items-center justify-center hover:bg-white/30 transition cursor-pointer"
                    >
                      <Image
                        src={item?.icon}
                        alt="icon"
                        width={20}
                        height={20}
                      />
                    </Link>
                  ))}
                </div> */}
              </div>
            </div>

            {/* Contact Form */}
            <div className="p-8 lg:p-12 2xl:p-16">
              <div className="mb-8">
                <h3 className="text-3xl 2xl:text-4xl 3xl:text-5xl font-normal text-[#333] capitalize mb-4">
                  get in touch
                </h3>
                <p className="text-sm sm:text-base 2xl:text-lg text-[#626262] leading-relaxed">
                  We&apos;re always excited to explore new opportunities and
                  challenges. Whether you&apos;re a startup or an established
                  enterprise, we&apos;d love to hear from you. Contact us to
                  discuss how we can help you achieve your digital goals.
                </p>
              </div>

              <form className="space-y-5 2xl:space-y-6 3xl:space-y-8">
                {[
                  { type: "text", placeholder: "Name *", required: true },
                  { type: "email", placeholder: "Email" },
                  {
                    type: "tel",
                    placeholder: "Phone number *",
                    required: true,
                  },
                ].map((input, idx) => (
                  <div key={idx}>
                    <input
                      {...input}
                      className="w-full px-5 py-3 2xl:py-4 3xl:py-5 border border-[#E0E0E0] text-sm 2xl:text-base placeholder-[#828282] focus:outline-none focus:border-[#052557]"
                    />
                  </div>
                ))}

                {/* Dropdown */}
                <div className="relative">
                  <select className="w-full px-5 py-3 2xl:py-4 3xl:py-5 border border-[#E0E0E0] text-sm 2xl:text-base appearance-none focus:outline-none focus:border-[#052557] bg-white text-black">
                    <option value="">How did you find us?</option>
                    <option value="google">Google Search</option>
                    <option value="referral">Referral</option>
                    <option value="social">Social Media</option>
                    <option value="other">Other</option>
                  </select>
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                    <svg
                      className="w-3 h-3 text-[#CBCBCB] rotate-90"
                      fill="currentColor"
                      viewBox="0 0 12 12"
                    >
                      <path d="M6 9L10.5 3L1.5 3L6 9Z" />
                    </svg>
                  </div>
                </div>
                 <div>
                    <textarea
                      name="message"
                      id="message"
                      placeholder="How can we help? *"
                      required
                      className="w-full px-5 py-3 2xl:py-4 3xl:py-5 border border-[#E0E0E0] text-sm 2xl:text-base placeholder-[#828282] focus:outline-none focus:border-[#052557]"
                      rows={3}></textarea>
                  </div>
                <div className="pt-10 flex justify-center">
                  <button
                    type="submit"
                    className="bg-[#052557] text-white px-6 py-3 2xl:px-8 2xl:py-4 3xl:px-10 3xl:py-5 text-sm 2xl:text-base capitalize hover:bg-[#041f42] transition-colors rounded"
                  >
                    send message
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
