export type Product = {
  id: string;
  name: string;
  category: "vsx" | "m20" | "vsm" | "vsr" | "vss";
  price: string;
  description: string;
  image: string;

  // Optional fields
  gst?: string;                 // GST info
  sku?: string;                 // Product SKU
  series?: string;              // Series name
  model?: string;               // Model name
  mainsVoltage?: string;        // Mains voltage info
  kw?: string;                  // Power in KW
  hp?: string;                  // Power in HP
  amps?: string;                // Amps
  weight?: string;              // Weight

  features?: string[];          // Feature list
  benefits?: string[];          // Benefits list
  technicalSpecs?: {            // Technical specifications table
    parameter: string;
    specification: string;
  }[];
  seriesRange?: string[];       // Series range
  applications?: string[];      // Applications
  tags?: string[];              // Tags for product
};



export const products: Product[] = [
  {
    id: "1",
    name: "CG Emotron VSX Drive",
    category: "vsx",
    price: "₹50,000",
    description: "Reliable drive for industrial applications.",
    image: "/img/cg1.png",
  },
  {
    id: "2",
    name: "CG Emotron VSX Premium",
    category: "vsx",
    price: "₹65,000",
    description: "Premium VSX drive with higher efficiency.",
    image: "/img/cg2.png",
  },
  {
    id: "3",
    name: "M20 Shaft Power Basic",
    category: "m20",
    price: "₹75,000",
    description: "High-performance shaft power solution.",
    image: "/img/cg4.png",
  },
  {
    id: "4",
    name: "M20 Shaft Power Advanced",
    category: "m20",
    price: "₹90,000",
    description: "Advanced M20 model for heavy-duty use.",
    image: "/img/cg5.png",
  },
{
    id: "5",
    name: "VSM48-004-20CEB",
    category: "vsm",
    price: "7999",
    description: "High-efficiency Variable Frequency Drive (VFD) for motor control.",
    image: "/img/cg1.png",
    gst: "18",
    sku: "VSM48-004-20CEB",
    series: "VSM",
    model: "VSM48-004-20CEB",
    mainsVoltage: "3 Phase 415 Volt (+20%)",
    kw: "1.5 KW",
    hp: "2 HP",
    amps: "4.2 Amps",
    weight: "1 kg",
    features: [
      "Compact and lightweight (only 1 kg)",
      "Standard LED display for clear diagnostics",
      "Compatible with Induction and PM motors",
      "Built-in brake chopper",
      "200% overload capacity for 1 second"
    ],
    benefits: [
      "Excellent start torque ideal for demanding operations",
      "Efficient thermal design for high reliability",
      "Compact footprint allows easy panel integration"
    ],
    technicalSpecs: [
      { parameter: "Model", specification: "VSM48-004-20CEB" },
      { parameter: "Power Output", specification: "1.5 kW / 2 HP" },
      { parameter: "Rated Current", specification: "4.2 Amps" },
      { parameter: "Input Voltage", specification: "3 Phase 380 – 480 VAC (±20%)" },
      { parameter: "Frequency", specification: "50 Hz" },
      { parameter: "Weight", specification: "1.0 kg" },
      { parameter: "Display", specification: "Standard LED" },
      { parameter: "Built-in Filter", specification: "C3 Class EMC" },
      { parameter: "Certification", specification: "CE" }
    ],
    seriesRange: [
      "Power: 0.75 kW to 4.0 kW",
      "Current: 2.5 A to 9.5 A",
      "Voltage: 3 Phase, 380–480 VAC / 50Hz"
    ],
    applications: [
      "Water Pumps",
      "Blowers & Fans",
      "Conveyors",
      "Cranes & Hoists",
      "Damper & HVAC Control"
    ],
    tags: ["AC DRIVE", "CG Emotron", "Variable Frequency Drive", "VFD"]
  },
  {
    id: "6",
    name: "VSR Compact",
    category: "vsr",
    price: "₹35,000",
    description: "Compact VSR model with efficient design.",
     image: "/img/cg2.png",
  },
  {
    id: "7",
    name: "VSS Heavy Duty",
    category: "vss",
    price: "₹80,000",
    description: "Heavy-duty VSS drive for industrial machinery.",
     image: "/img/cg4.png",
  },
];
