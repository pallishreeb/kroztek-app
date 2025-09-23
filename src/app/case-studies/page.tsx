"use client";

import Image from "next/image";

const caseStudies = [
  {
    title: "Energy Optimization for Factory A",
    description: "Reduced energy consumption by 25% through modern electrical solutions and automation.",
    outcome: "Lower costs and more sustainable operations.",
    image: "/img/cg1.png",
  },
  {
    title: "Motor Upgrade for Manufacturing Line B",
    description: "Replaced outdated motors with high-efficiency ones to improve production efficiency.",
    outcome: "Increased throughput and decreased downtime.",
    image: "/img/cg2.png",
  },
  {
    title: "Custom Electrical Panel Design",
    description: "Designed and implemented custom panels for a large industrial plant.",
    outcome: "Enhanced safety and simplified maintenance.",
    image: "/img/vsx.png",
  },
  {
    title: "Preventive Maintenance Program",
    description: "Introduced preventive maintenance schedules for critical equipment.",
    outcome: "Reduced unplanned outages by 40%.",
    image: "/img/vsx4.png",
  },
  {
    title: "Automated Control System Implementation",
    description: "Implemented automated control systems for better monitoring and control.",
    outcome: "Optimized production efficiency and real-time monitoring.",
    image: "/img/cg5.png",
  },
];

export default function CaseStudiesPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl md:text-4xl font-bold text-blue-700 text-center mb-12">
        Case Studies
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {caseStudies.map((caseItem, idx) => (
          <div key={idx} className="border rounded-lg shadow hover:shadow-lg transition p-4 flex flex-col">
            <div className="h-48 w-full relative mb-4">
              <Image
                src={caseItem.image}
                alt={caseItem.title}
                fill
                className="object-cover rounded"
              />
            </div>
            <h2 className="text-xl font-semibold text-blue-700 mb-2">{caseItem.title}</h2>
            <p className="text-gray-700 mb-2">{caseItem.description}</p>
            <p className="text-gray-900 font-medium mt-auto">Outcome: {caseItem.outcome}</p>
          </div>
        ))}
      </div>

      <div className="mt-12 max-w-3xl mx-auto text-center">
        <p className="text-gray-700 text-lg">
          These case studies demonstrate our expertise in providing practical, cost-effective, and innovative
          solutions for industrial challenges. We are committed to helping our clients optimize operations,
          improve efficiency, and achieve their business goals.
        </p>
      </div>
    </div>
  );
}
