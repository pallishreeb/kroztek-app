"use client";
import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { TrendingUp, Package, Award, Users } from "lucide-react";

export default function Counter() {
  const [counts, setCounts] = useState({ vsm: 0, vsx: 0, vss: 0, customers: 0 });
  const [hasAnimated, setHasAnimated] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
            animateCounters();
          }
        });
      },
      { threshold: 0.3 } // Trigger when 30% of the section is visible
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [hasAnimated]);

  const animateCounters = () => {
    const target = { vsm: 200, vsx: 390, vss: 300, customers: 150 };
    const duration = 2000; // 2 seconds
    const steps = 60;
    const stepDuration = duration / steps;
    
    let step = 0;
    const interval = setInterval(() => {
      step++;
      const progress = step / steps;
      
      setCounts({
        vsm: Math.floor(target.vsm * progress),
        vsx: Math.floor(target.vsx * progress),
        vss: Math.floor(target.vss * progress),
        customers: Math.floor(target.customers * progress),
      });
      
      if (step >= steps) {
        setCounts(target); // Ensure final values are exact
        clearInterval(interval);
      }
    }, stepDuration);
  };

  const stats = [
    {
      icon: Package,
      count: counts.vsm,
      label: "VSM Series Delivered",
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50",
      textColor: "text-blue-600"
    },
    {
      icon: TrendingUp,
      count: counts.vsx,
      label: "VSX Series Delivered",
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-50",
      textColor: "text-green-600"
    },
    {
      icon: Award,
      count: counts.vss,
      label: "VSS Series Delivered",
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-50",
      textColor: "text-purple-600"
    },
    {
      icon: Users,
      count: counts.customers,
      label: "Happy Customers",
      color: "from-orange-500 to-orange-600",
      bgColor: "bg-orange-50",
      textColor: "text-orange-600"
    }
  ];

  return (
    <section ref={sectionRef} className="py-8 md:py-12 bg-gradient-to-br from-gray-50 via-white to-blue-50 -mt-4">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center mb-8 md:mb-10">
          <div className="inline-flex items-center gap-2 bg-blue-100 px-4 py-2 rounded-full mb-3">
            <Package className="w-4 h-4 text-blue-600" />
            <span className="text-blue-600 text-sm font-semibold">OUR ACHIEVEMENTS</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
            Trusted by Industry Leaders
          </h2>
          <p className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto">
            Delivering excellence across India with premium CG Emotron products and exceptional service
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-10">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="group relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-blue-200 overflow-hidden"
              >
                {/* Background decoration */}
                <div className={`absolute -right-6 -top-6 w-24 h-24 bg-gradient-to-br ${stat.color} opacity-5 rounded-full group-hover:scale-150 transition-transform duration-500`}></div>
                
                {/* Icon */}
                <div className={`w-12 h-12 md:w-14 md:h-14 ${stat.bgColor} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className={`w-6 h-6 md:w-7 md:h-7 ${stat.textColor}`} />
                </div>
                
                {/* Counter */}
                <div className={`text-3xl md:text-4xl lg:text-5xl font-bold ${stat.textColor} mb-2 tabular-nums`}>
                  {stat.count}+
                </div>
                
                {/* Label */}
                <p className="text-gray-600 text-sm md:text-base font-medium">
                  {stat.label}
                </p>
                
                {/* Hover indicator */}
                <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${stat.color} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left`}></div>
              </div>
            );
          })}
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 md:p-10 text-center shadow-xl">
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
            Ready to Join Our Growing Family?
          </h3>
          <p className="text-blue-100 text-base md:text-lg mb-6 max-w-2xl mx-auto">
            Experience premium quality products with authorized dealer support and comprehensive warranty
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/series"
              className="group bg-white text-blue-600 font-semibold py-3 px-8 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 hover:bg-gray-50 inline-flex items-center gap-2"
            >
              Browse Products
              <TrendingUp className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>

          </div>
        </div>

        {/* Additional Trust Indicators */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 text-center">
          <div className="p-4">
            <div className="text-xl md:text-2xl font-bold text-gray-800">100%</div>
            <div className="text-xs md:text-sm text-gray-600">Genuine Products</div>
          </div>
          <div className="p-4">
            <div className="text-xl md:text-2xl font-bold text-gray-800">24/7</div>
            <div className="text-xs md:text-sm text-gray-600">Support Available</div>
          </div>
          <div className="p-4">
            <div className="text-xl md:text-2xl font-bold text-gray-800">Advanced</div>
            <div className="text-xs md:text-sm text-gray-600">Technology</div>
          </div>
          <div className="p-4">
            <div className="text-xl md:text-2xl font-bold text-gray-800">PAN India</div>
            <div className="text-xs md:text-sm text-gray-600">Delivery Network</div>
          </div>
        </div>
      </div>
    </section>
  );
}