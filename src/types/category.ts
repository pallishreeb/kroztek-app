// types/category.ts
import { Timestamp } from "firebase/firestore";
import { ProductCategory } from "@/lib/firebase";

// Category data - shared across all products in a category
export interface CategoryData {
  id: ProductCategory;
  name: string;                    // Display name: "VSX", "VSS", etc.
  displayName: string;             // Full name: "VSX Series AC Drives"
  description: string;             // Category description
  image: string;                   // Default category image
  modelInfo: string;               // Model info template
  features: string[];              // Shared features
  benefits: string[];              // Shared benefits
  seriesRange: string[];           // Series range info
  applications: string[];          // Applications
  tags: string[];                  // Tags
  // Metadata
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
}

// Default category data (can be stored in Firestore later)
export const DEFAULT_CATEGORIES: Record<ProductCategory, CategoryData> = {
  vss: {
    id: "vss",
    name: "VSS",
    displayName: "VSS Series - Single Phase AC Drives",
    description: "Compact Single Phase AC Drive (VFD) designed for efficient motor control.",
    image: "/img/vss.png",
    modelInfo: "Emotron VSS, 1-phase Supply Un = 220 -15%/+30%, IP20",
    features: [
      "Detachable LED keypad for intuitive control and monitoring",
      "Built-in brake chopper for efficient braking performance",
      "Modbus RS485 interface for remote access and integration",
      "Built-in potentiometer for easy manual speed control",
      "Supports both Induction Motors (IM) and PMSM motors",
      "Digital I/Os: 5 DI, 1 DO, 2 AI, 1 AO, 1 Relay Output",
      "Built-in PLC logic, timers, comparators, and virtual I/Os",
      "Application macros for quick and easy setup",
      "RFI filter included for EMI noise suppression",
      "EmoWizard tool for simplified debugging and diagnostics",
      "Heavy-duty drive: 200% overload for 1 second"
    ],
    benefits: [
      "Ideal for single-phase power setups in workshops, farms, and compact machinery",
      "Space-saving design and quick plug-and-play installation",
      "Energy-efficient and cost-effective motor control",
      "Enhances motor life, reduces heat, and prevents overload failures",
      "Perfect for low-to-medium torque loads with varying speed requirements"
    ],
    seriesRange: [
      "Power: 0.37 kW to 2.2 kW",
      "Current: 2.5 A to 9.5 A",
      "Voltage: 1 Phase, 220 VAC (±20%)"
    ],
    applications: [
      "Water Pumps & Irrigation Systems",
      "HVAC: Fans, Ventilators, and Damper Control",
      "CNC Machines, Feeders, and Conveyors",
      "Elevator Doors and Packaging Machines",
      "Compressors, Mixers, Agitators",
      "Agriculture and Textile Equipment",
      "HVLS (High Volume Low Speed) Fans"
    ],
    tags: ["AC DRIVE", "CG Emotron", "Variable Frequency Drive", "VFD"]
  },
  vsm: {
    id: "vsm",
    name: "VSM",
    displayName: "VSM Series - Three Phase AC Drives",
    description: "High-efficiency Variable Frequency Drive (VFD) for reliable motor control.",
    image: "/img/ CG Emotron AC Drive VSM48-009-20CEB.png",
    modelInfo: "Emotron VSM, 3-phase Supply Un = 380-480 +/-10%, IP20",
    features: [
      "Compact and lightweight design",
      "Standard LED display for clear diagnostics",
      "Compatible with Induction and PM motors",
      "Built-in brake chopper for enhanced motor control",
      "High-speed pulse input capability",
      "200% overload capacity for 1 second",
      "Integrated PLC logic, virtual I/Os, timers, and comparators",
      "C3 class EMC filter for safe and interference-free operation"
    ],
    benefits: [
      "Excellent start torque ideal for demanding operations",
      "Efficient thermal design for high reliability in industrial conditions",
      "Compact footprint allows for easy panel integration",
      "Fast setup and user-friendly interface"
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
  vsx: {
    id: "vsx",
    name: "VSX",
    displayName: "VSX Series - Advanced AC Drives",
    description: "High-performance Variable Frequency Drive with LCD display and advanced features.",
    image: "/img/vsx10 Medium.png",
    modelInfo: "3-phase Supply Un = 380-480 +/-10%, IP20",
    features: [
      "LCD Graphical Display with built-in oscilloscope",
      "200% overload handling for 1 second",
      "High-speed pulse I/O support up to 100 KHz",
      "Compatible with Induction and PM motors",
      "Flexible V/F control (fully and semi-separated modes)",
      "Integrated PLC logic, virtual digital I/Os, timers, and comparators",
      "Built-in EMC filter for electromagnetic compliance",
      "Emo Wizard tool for smooth setup and debugging"
    ],
    benefits: [
      "Delivers high starting torque for small motors",
      "Tropicalized boards ensure stability in hot and humid environments",
      "Advanced airflow design extends life and improves cooling efficiency",
      "Lightweight – ideal for compact installations"
    ],
    seriesRange: [
      "Power Range: 0.75 kW to 55 kW",
      "Current Range: 2.5 A to 112 A",
      "Voltage: 3 Phase, 380–480 VAC",
      "Applications: For Induction & PM Motors",
      "Certification: CE"
    ],
    applications: [
      "Industrial motors (Induction & PM)",
      "Small motor automation applications",
      "OEM integration and system control"
    ],
    tags: ["AC DRIVE", "CG Emotron", "Variable Frequency Drive", "VFD"]
  },
  m20: {
    id: "m20",
    name: "M20",
    displayName: "M20 Shaft Power Monitor",
    description: "Compact and accurate shaft power monitor for real-time motor load protection.",
    image: "/img/m20.png",
    modelInfo: "Emotron M20 Shaft Power Monitor",
    features: [
      "True shaft power monitoring using motor current + phase angle",
      "No external sensors required — lower cost, faster install",
      "Auto-Set: Configure 4 protection points in 3 seconds",
      "LED display shows real-time motor load",
      "Analog output for PLC/SCADA integration",
      "DIN-rail mounting — compact & reliable"
    ],
    benefits: [
      "Protects pumps from dry-run and cavitation",
      "Ensures mixers operate correctly with blade detection & viscosity control",
      "Prevents conveyor jams and no-load operation",
      "Monitors fans and blowers for overload & imbalance",
      "Reduces downtime and maintenance costs"
    ],
    seriesRange: [
      "Current: 0–1000 A",
      "Voltage: 100–240 VAC / 380–500 VAC / 525–690 VAC",
      "Frequency: 50 / 60 Hz"
    ],
    applications: [
      "Pumps – dry-run & cavitation protection",
      "Mixers – blade detection & viscosity control",
      "Conveyors – jam & no-load detection",
      "Fans & blowers – overload & imbalance alerts"
    ],
    tags: ["CG Emotron", "Shaft Power Monitor", "Motor Protection"]
  },
  vsr: {
    id: "vsr",
    name: "VSR",
    displayName: "VSR Series - Robust AC Drives",
    description: "Industrial grade Variable Frequency Drive for demanding applications.",
    image: "/img/vsr.png",
    modelInfo: "Emotron VSR Series AC Drive",
    features: [
      "Rugged industrial design",
      "High overload capacity",
      "Advanced motor control algorithms",
      "Built-in safety features",
      "Wide voltage range support"
    ],
    benefits: [
      "Reliable operation in harsh environments",
      "Reduced maintenance requirements",
      "Energy efficient motor control",
      "Extended equipment lifespan"
    ],
    seriesRange: [
      "Power: Various ranges available",
      "Voltage: 3 Phase, 380–480 VAC"
    ],
    applications: [
      "Heavy industrial machinery",
      "Mining equipment",
      "Large pumps and fans"
    ],
    tags: ["AC DRIVE", "CG Emotron", "Variable Frequency Drive", "VFD"]
  }
};

