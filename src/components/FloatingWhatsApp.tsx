"use client";

export default function FloatingWhatsApp() {
  const phoneNumber = "918637214899"; // your WhatsApp number with country code
  const message = "Hello! I have a question about your products."; // default message

  return (
    <a
      href={`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-5 right-5 w-14 h-14 bg-white-500 rounded-full flex items-center justify-center shadow-lg hover:bg-green-600 transition z-50"
    >
      <img
        src="/whatsapp.png"
        alt="WhatsApp"
        className="w-20 h-20 object-contain"
      />
    </a>
  );
}
