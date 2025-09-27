"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, ArrowRight, ShoppingBag } from "lucide-react";

const slides = [
  { 
    id: 1, 
    image: "/banner1.jpg", 
    title: "Authorized Dealer",
    subtitle: "CG Emotron Industrial Solutions",
    description: "Premium quality drives and automation solutions for your industrial needs"
  },
  { 
    id: 2, 
    image: "/banner2.jpg", 
    title: "Industrial Drives",
    subtitle: "Shaft Power Solutions",
    description: "Advanced motor control systems and power transmission solutions"
  },
  { 
    id: 3, 
    image: "/banner5.jpg", 
    title: "Reliable Service",
    subtitle: "24/7 Support & Maintenance",
    description: "Expert technical support and comprehensive maintenance services"
  },
];

export default function Carousel() {
  const [current, setCurrent] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, []);

  const prevSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    setTimeout(() => setIsTransitioning(false), 500);
  };

  const nextSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    setTimeout(() => setIsTransitioning(false), 500);
  };

  const goToSlide = (index: number) => {
    if (isTransitioning || index === current) return;
    setIsTransitioning(true);
    setCurrent(index);
    setTimeout(() => setIsTransitioning(false), 500);
  };

  return (
    <div className="relative w-full h-[50vh] md:h-[60vh] overflow-hidden rounded-2xl shadow-2xl">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-all duration-700 ${
            index === current ? "opacity-100 scale-100" : "opacity-0 scale-105"
          }`}
        >
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover"
          />
          
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent"></div>
          
       <div className="absolute inset-0 flex items-center">
  <div className="max-w-7xl mx-auto px-12 sm:px-16 md:px-24 w-full">
    <div className="max-w-2xl">
                <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full mb-4">
                  <ShoppingBag className="w-4 h-4 text-white" />
                  <span className="text-white text-sm font-semibold">
                    KROZTEK SOLUTIONS
                  </span>
                </div>

                <h1 className="text-white text-3xl md:text-5xl font-bold mb-2 leading-tight">
                  {slide.title}
                </h1>

                <h2 className="text-blue-200 text-lg md:text-2xl font-medium mb-2">
                  {slide.subtitle}
                </h2>

                <p className="text-white/90 text-sm md:text-lg leading-relaxed mb-4 max-w-lg">
                  {slide.description}
                </p>

                <div className="flex flex-col sm:flex-row gap-3">
                  <Link
                    href="/series"
                    className="group bg-white text-gray-900 font-semibold py-2 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:bg-gray-100 inline-flex items-center gap-2"
                  >
                    Browse Products
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Buttons */}
{/* Navigation Buttons */}
<button
  onClick={prevSlide}
  disabled={isTransitioning}
  className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/20 backdrop-blur-sm text-white rounded-full hover:bg-white/30 transition-all duration-300 flex items-center justify-center z-50"
>
  <ChevronLeft className="w-4 h-4" />
</button>

<button
  onClick={nextSlide}
  disabled={isTransitioning}
  className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/20 backdrop-blur-sm text-white rounded-full hover:bg-white/30 transition-all duration-300 flex items-center justify-center z-50"
>
  <ChevronRight className="w-4 h-4" />
</button>


      {/* Dot Indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            disabled={isTransitioning}
            className={`transition-all duration-300 rounded-full ${
              current === index
                ? "w-8 h-2 bg-white"
                : "w-2 h-2 bg-white/50 hover:bg-white/70"
            }`}
          />
        ))}
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
        <div 
          className="h-full bg-white transition-all duration-300 ease-linear"
          style={{ 
            width: `${((current + 1) / slides.length) * 100}%`,
            transitionDuration: isTransitioning ? '300ms' : '5000ms'
          }}
        />
      </div>
    </div>
  );
}
