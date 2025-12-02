"use client";
import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, ArrowRight, ShoppingBag, Pause, Play } from "lucide-react";
import { getActiveSlides, DEFAULT_SLIDES } from "@/lib/carousel";
import { CarouselSlide } from "@/types/carousel";


export default function Carousel() {
  const [slides, setSlides] = useState<CarouselSlide[]>(DEFAULT_SLIDES);
  const [current, setCurrent] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [loading, setLoading] = useState(true);

  // Fetch slides from Firestore
  useEffect(() => {
    const fetchSlides = async () => {
      try {
        const firestoreSlides = await getActiveSlides();
        if (firestoreSlides.length > 0) {
          setSlides(firestoreSlides);
        }
      } catch (error) {
        console.error("Error fetching carousel slides:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSlides();
  }, []);

  // single nextSlide function (useCallback so interval can use stable ref)
  const nextSlide = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    setTimeout(() => setIsTransitioning(false), 500);
  }, [isTransitioning, slides.length]);

  // autoplay interval
  useEffect(() => {
    if (isPaused || loading) return;
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [isPaused, loading, nextSlide]);

  const prevSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    setTimeout(() => setIsTransitioning(false), 500);
  };

  const goToSlide = (index: number) => {
    if (isTransitioning || index === current) return;
    setIsTransitioning(true);
    setCurrent(index);
    setTimeout(() => setIsTransitioning(false), 500);
  };

  const currentSlide = slides[current];
  const isLogoSlide = currentSlide?.type === "logo";
  return (
    <div className="relative w-full h-[40vh] sm:h-[45vh] md:h-[50vh] lg:h-[55vh] overflow-hidden rounded-xl md:rounded-2xl shadow-2xl bg-gray-100">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-all duration-700 ${
            index === current ? "opacity-100 scale-100 z-10" : "opacity-0 scale-105 z-0"
          }`}
        >
          {slide.type === "logo" ? (
            <div className="w-full h-full bg-white flex items-center justify-center p-6 md:p-12">
              <img
                src={slide.image}
                alt={slide.title}
                className="max-w-full max-h-full object-contain"
              />
            </div>
          ) : (
            <>
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent"></div>
              
              <div className="absolute inset-0 flex items-center z-30">
                <div className="max-w-7xl mx-auto pl-16 sm:pl-20 md:pl-24 lg:pl-28 pr-4 sm:pr-6 md:pr-8 lg:pr-12 w-full">
                  <div className="max-w-2xl">
                    <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-3 sm:px-4 py-1.5 sm:py-2 rounded-full mb-3 sm:mb-4">
                      <ShoppingBag className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                      <span className="text-xs sm:text-sm font-semibold text-white">
                        KROZTEK SOLUTIONS
                      </span>
                    </div>

                    <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2 sm:mb-3 leading-tight text-white">
                      {slide.title}
                    </h1>

                    <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl font-medium mb-2 sm:mb-3 text-blue-200">
                      {slide.subtitle}
                    </h2>

                    <p className="text-sm sm:text-base md:text-lg leading-relaxed mb-4 sm:mb-6 max-w-lg text-white/90">
                      {slide.description}
                    </p>

                    <div className="flex flex-col sm:flex-row gap-3">
                      <Link
                        href={slide.buttonLink || "/series"}
                        className="group bg-white text-gray-900 font-semibold py-2.5 sm:py-3 px-5 sm:px-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 inline-flex items-center justify-center gap-2 hover:bg-gray-100"
                      >
                        <span className="text-sm sm:text-base">{slide.buttonText || "Browse Products"}</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                      </Link>

                      <Link
                        href="/guide-to-buy"
                        className="group border-2 border-white/30 text-white font-semibold py-2.5 sm:py-3 px-5 sm:px-6 rounded-lg transition-all duration-300 inline-flex items-center justify-center gap-2 hover:bg-white/10 backdrop-blur-sm"
                      >
                        <span className="text-sm sm:text-base">Guide To Buy</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      ))}

      {/* Navigation Buttons */}
      <button
        onClick={prevSlide}
        disabled={isTransitioning}
        className={`absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-12 sm:h-12 ${
          isLogoSlide 
            ? 'bg-gray-800/80 hover:bg-gray-900' 
            : 'bg-white/20 backdrop-blur-sm hover:bg-white/30'
        } text-white rounded-full transition-all duration-300 flex items-center justify-center z-20 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg`}
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-4 h-4 sm:w-6 sm:h-6" />
      </button>

      <button
        onClick={nextSlide}
        disabled={isTransitioning}
        className={`absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-12 sm:h-12 ${
          isLogoSlide 
            ? 'bg-gray-800/80 hover:bg-gray-900' 
            : 'bg-white/20 backdrop-blur-sm hover:bg-white/30'
        } text-white rounded-full transition-all duration-300 flex items-center justify-center z-20 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg`}
        aria-label="Next slide"
      >
        <ChevronRight className="w-4 h-4 sm:w-6 sm:h-6" />
      </button>

      {/* Play/Pause Button */}
      <button
        onClick={() => setIsPaused(!isPaused)}
        className={`absolute left-2 sm:left-4 bottom-12 sm:bottom-16 w-9 h-9 sm:w-10 sm:h-10 ${
          isLogoSlide 
            ? 'bg-gray-800/80 hover:bg-gray-900' 
            : 'bg-white/20 backdrop-blur-sm hover:bg-white/30'
        } text-white rounded-full transition-all duration-300 flex items-center justify-center z-20 shadow-lg`}
        aria-label={isPaused ? "Play slideshow" : "Pause slideshow"}
      >
        {isPaused ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
      </button>

      {/* Dot Indicators */}
      <div className="absolute bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 sm:gap-2 flex-wrap justify-center max-w-full px-4 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            disabled={isTransitioning}
            className={`transition-all duration-300 rounded-full disabled:cursor-not-allowed ${
              current === index
                ? "w-6 sm:w-8 h-1.5 sm:h-2 bg-white"
                : "w-1.5 sm:w-2 h-1.5 sm:h-2 bg-white/50 hover:bg-white/70"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 sm:h-1 bg-white/20 z-20">
        <div 
          className="h-full bg-white transition-all ease-linear"
          style={{ 
            width: `${((current + 1) / slides.length) * 100}%`,
            transitionDuration: isPaused ? '0ms' : (isTransitioning ? '300ms' : '5000ms')
          }}
        />
      </div>

      {/* Slide Counter */}
      <div className={`absolute top-3 sm:top-4 right-3 sm:right-4 ${
        isLogoSlide 
          ? 'bg-gray-800/80' 
          : 'bg-black/30 backdrop-blur-sm'
      } text-white px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full text-xs sm:text-sm font-medium shadow-lg z-20`}>
        {current + 1} / {slides.length}
      </div>
    </div>
  );
}