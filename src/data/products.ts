export type Product = {
  id: string;
  name: string;
  category: "vsx" | "m20" | "vsm" | "vsr" | "vss";
  price: number | string;
  description: string;
  image: string;
  range?: string;   
  rangeA?:string; 
  modelInfo?:string;           // Operating range
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
  "id": "1",
  "name": "VSS23- 2p5",
  "modelInfo":"Emotron VSS, 1-phase Supply Un = 220 -15%/+30%, IP20",
  "category": "vss",
  "price": "14794",
  "description": "Compact Single Phase AC Drive (VFD) designed for efficient control of 0.25kW (0.5HP) motors. Lightweight, energy-saving, and easy-to-use solution for light-duty automation and machinery.",
  "image": "/img/vss.png",
  "gst": "18",
  "sku": "VSS23- 2p5",
  "series": "VSS",
  "model": "VSS23- 2p5",
  "mainsVoltage": "1 Phase 220V AC (±20%)",
  "kw": "0.4 KW",
  "hp": "0.5 HP",
  "amps": "2.5 Amps",
  "range":"0.4 - 2.2 kW",
  "rangeA":"2.5 - 9.5 Amps",
  "weight": "1.1 kg",
  "features": [
    "0.25kW / 0.5HP Output – Ideal for low-power applications",
    "Supports Induction & PMSM motors",
    "Detachable LED keypad for real-time control",
    "Built-in brake chopper and potentiometer",
    "Digital Inputs: 5 DI | Analog Inputs: 2 AI | Relay Output: 1",
    "Analog Output: 1 AO | Digital Output: 1 DO",
    "RS-485 Modbus interface for communication",
    "Built-in PLC logic, timers, comparators, and macros",
    "RFI filter for noise suppression",
    "EmoWizard tool for diagnostics and debugging",
    "Strong overload support: 200% rated load for 1 second"
  ],
  "benefits": [
    "Space-saving compact design",
    "Quick installation and user-friendly setup",
    "Improved energy efficiency and reduced motor wear",
    "Compatible with a wide range of low-power single-phase applications",
    "Integrated tools simplify troubleshooting and automation setup"
  ],
  "technicalSpecs": [
    { "parameter": "Model", "specification": "VSS23-2P5 20CEB" },
    { "parameter": "Power Output", "specification": "0.25 kW / 0.5 HP" },
    { "parameter": "Rated Current", "specification": "2.5 Amps" },
    { "parameter": "Input Voltage", "specification": "1 Phase 220V AC (±20%)" },
    { "parameter": "Frequency", "specification": "50/60 Hz" },
    { "parameter": "Motor Support", "specification": "Induction (IM) & PMSM" },
    { "parameter": "Weight", "specification": "1 kg" },
    { "parameter": "Cooling System", "specification": "Independent air duct design" },
    { "parameter": "Display", "specification": "Standard detachable LED" },
    { "parameter": "Communication", "specification": "RS-485 with Modbus protocol" }
  ],
  "seriesRange": [
    "Power: 0.25 kW to 2.2 kW",
    "Current: 2.5 A to 9.5 A",
    "Voltage: 1 Phase, 220 VAC (±20%)"
  ],
  "applications": [
    "Pumps, Fans, and Ventilators",
    "Conveyors, Feeders, and Textile Machines",
    "Elevator Doors, Mixers, Agitators",
    "Packaging Systems, Compressors, and CNC Machines",
    "Agricultural Automation and HVLS Fans",
    "Damper Control and Light-Duty Industrial Loads"
  ],
  "tags": ["AC DRIVE", "CG Emotron", "Variable Frequency Drive", "VFD"]
},
{
  "id": "2",
  "name": "VSS23- 4p2",
  "category": "vss",
  "price": "16508",
  "description": "Compact and intelligent Single Phase Variable Frequency Drive (VFD) for 0.75kW (1HP) motors. Offers advanced motor support, reliability, and energy savings for industrial and agricultural applications.",
  "image": "/img/vss.png",
  "gst": "18",
  "sku": "VSS23-4P2 20CEB-1",
  "series": "VSS",
  "model": "VSS23-4P2 20CEB",
  "mainsVoltage": "1 Phase 220V AC (±20%)",
  "kw": "0.75 KW",
  "hp": "1 HP",
  "amps": "4.2 Amps",
  "weight": "1.5 kg",
  "features": [
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
  "benefits": [
    "Ideal for single-phase power setups in workshops, farms, and compact machinery",
    "Space-saving design and quick plug-and-play installation",
    "Energy-efficient and cost-effective motor control",
    "Enhances motor life, reduces heat, and prevents overload failures",
    "Perfect for low-to-medium torque loads with varying speed requirements"
  ],
  "technicalSpecs": [
    { "parameter": "Model", "specification": "VSS23-4P2 20CEB" },
    { "parameter": "Power Output", "specification": "0.75 kW / 1 HP" },
    { "parameter": "Rated Current", "specification": "4.2 Amps" },
    { "parameter": "Input Voltage", "specification": "1 Phase 220V AC (±20%)" },
    { "parameter": "Frequency", "specification": "50/60 Hz" },
    { "parameter": "Motor Compatibility", "specification": "Induction & PMSM Motors" },
    { "parameter": "Weight", "specification": "1.5 kg" },
    { "parameter": "Cooling", "specification": "Integrated duct design" },
    { "parameter": "Display", "specification": "Detachable LED" },
    { "parameter": "Communication", "specification": "Modbus RS485" }
  ],
  "seriesRange": [
    "Power: 0.37 kW to 2.2 kW",
    "Current: 2.5 A to 9.5 A",
    "Voltage: 1 Phase, 220 VAC (±20%)"
  ],
  "applications": [
    "Water Pumps & Irrigation Systems",
    "HVAC: Fans, Ventilators, and Damper Control",
    "CNC Machines, Feeders, and Conveyors",
    "Elevator Doors and Packaging Machines",
    "Compressors, Mixers, Agitators",
    "Agriculture and Textile Equipment",
    "HVLS (High Volume Low Speed) Fans"
  ],
  "tags": ["AC DRIVE", "CG Emotron", "Variable Frequency Drive", "VFD"]
},
{
  "id": "3",
  "name": "VSS23- 7p5",
  "category": "vss",
  "price": "23966",
  "description": "Compact, reliable, and intelligent Single Phase VFD for 1.5kW (2HP) motors. Designed for efficiency, flexibility, and durability in industrial and agricultural applications.",
  "image": "/img/vss.png",
  "gst": "18",
  "sku": "VSS23- 7p5",
  "series": "VSS",
  "model": "VSS23- 7p5",
  "mainsVoltage": "1 Phase 220V AC (±20%)",
  "kw": "1.5 KW",
  "hp": "2 HP",
  "amps": "7.5 Amps",
  "weight": "1.5 kg",
  "features": [
    "Detachable LED keypad for easy monitoring and control",
    "Integrated brake chopper for enhanced stopping performance",
    "Modbus RS485 interface (standard) for remote communication",
    "Built-in potentiometer for speed adjustment",
    "Supports both Induction Motors (IM) and PMSM motors",
    "Digital Inputs/Outputs: 5 DI, 1 DO, 2 AI, 1 AO, 1 Relay Output",
    "Built-in PLC logic, timers, comparators, and virtual I/Os",
    "Application macros for quick configuration",
    "Integrated RFI filter to suppress electrical noise",
    "EmoWizard software for smooth setup and debugging",
    "Strong overload capability – 200% rated load for 1 second"
  ],
  "benefits": [
    "Designed for single-phase power systems – ideal for workshops and remote areas",
    "Compact form factor allows easy integration into tight spaces",
    "Reliable in heavy-duty environments",
    "Cost-effective for small-to-mid-scale operations",
    "Increases motor life and reduces energy consumption"
  ],
  "technicalSpecs": [
    { "parameter": "Model", "specification": "VSS23-7P5 20CEB" },
    { "parameter": "Power Output", "specification": "1.5 kW / 2 HP" },
    { "parameter": "Rated Current", "specification": "7.5 Amps" },
    { "parameter": "Input Voltage", "specification": "1 Phase 220V AC (±20%)" },
    { "parameter": "Frequency", "specification": "50/60 Hz" },
    { "parameter": "Motor Support", "specification": "Induction & PMSM" },
    { "parameter": "Weight", "specification": "1.5 kg" },
    { "parameter": "Display", "specification": "Detachable LED" },
    { "parameter": "Brake Chopper", "specification": "Built-in" },
    { "parameter": "EMI/RFI Filter", "specification": "Built-in" },
    { "parameter": "PLC Logic", "specification": "Built-in" },
    { "parameter": "Communication", "specification": "Modbus RS485" },
    { "parameter": "Cooling", "specification": "Efficient air duct design" },
    { "parameter": "Certification", "specification": "CE" }
  ],
  "seriesRange": [
    "Power: 0.37 kW to 2.2 kW",
    "Current: 2.5 A to 9.5 A",
    "Voltage: 1 Phase, 220 VAC (±20%)"
  ],
  "applications": [
    "Pumps and Water Systems",
    "Fans and Ventilators (HVAC)",
    "CNC and Packaging Machines",
    "Conveyors and Feeders",
    "Elevator Door Control",
    "Textile Machinery",
    "Agitators, Mixers, Compressors",
    "Agricultural Motors and HVLS Fans"
  ],
  "tags": ["AC DRIVE", "CG Emotron", "Variable Frequency Drive", "VFD"]
},
{
  "id": "26",
  "name": "VSS23- 9p5",
  "category": "vss",
  "price": "26362",
  "description": "Compact, reliable, and intelligent Single Phase VFD for 1.5kW (2HP) motors. Designed for efficiency, flexibility, and durability in industrial and agricultural applications.",
  "image": "/img/vss.png",
  "gst": "18",
  "sku": "VSS23- 9p5",
  "series": "VSS",
  "model": "VSS23- 9p5",
  "mainsVoltage": "1 Phase 220V AC (±20%)",
  "kw": "2.2 KW",
  "hp": "3 HP",
  "amps": "9.5 Amps",
  "weight": "1.5 kg",
  "features": [
    "Detachable LED keypad for easy monitoring and control",
    "Integrated brake chopper for enhanced stopping performance",
    "Modbus RS485 interface (standard) for remote communication",
    "Built-in potentiometer for speed adjustment",
    "Supports both Induction Motors (IM) and PMSM motors",
    "Digital Inputs/Outputs: 5 DI, 1 DO, 2 AI, 1 AO, 1 Relay Output",
    "Built-in PLC logic, timers, comparators, and virtual I/Os",
    "Application macros for quick configuration",
    "Integrated RFI filter to suppress electrical noise",
    "EmoWizard software for smooth setup and debugging",
    "Strong overload capability – 200% rated load for 1 second"
  ],
  "benefits": [
    "Designed for single-phase power systems – ideal for workshops and remote areas",
    "Compact form factor allows easy integration into tight spaces",
    "Reliable in heavy-duty environments",
    "Cost-effective for small-to-mid-scale operations",
    "Increases motor life and reduces energy consumption"
  ],
  "technicalSpecs": [
    { "parameter": "Model", "specification": "VSS23-7P5 20CEB" },
    { "parameter": "Power Output", "specification": "1.5 kW / 2 HP" },
    { "parameter": "Rated Current", "specification": "7.5 Amps" },
    { "parameter": "Input Voltage", "specification": "1 Phase 220V AC (±20%)" },
    { "parameter": "Frequency", "specification": "50/60 Hz" },
    { "parameter": "Motor Support", "specification": "Induction & PMSM" },
    { "parameter": "Weight", "specification": "1.5 kg" },
    { "parameter": "Display", "specification": "Detachable LED" },
    { "parameter": "Brake Chopper", "specification": "Built-in" },
    { "parameter": "EMI/RFI Filter", "specification": "Built-in" },
    { "parameter": "PLC Logic", "specification": "Built-in" },
    { "parameter": "Communication", "specification": "Modbus RS485" },
    { "parameter": "Cooling", "specification": "Efficient air duct design" },
    { "parameter": "Certification", "specification": "CE" }
  ],
  "seriesRange": [
    "Power: 0.37 kW to 2.2 kW",
    "Current: 2.5 A to 9.5 A",
    "Voltage: 1 Phase, 220 VAC (±20%)"
  ],
  "applications": [
    "Pumps and Water Systems",
    "Fans and Ventilators (HVAC)",
    "CNC and Packaging Machines",
    "Conveyors and Feeders",
    "Elevator Door Control",
    "Textile Machinery",
    "Agitators, Mixers, Compressors",
    "Agricultural Motors and HVLS Fans"
  ],
  "tags": ["AC DRIVE", "CG Emotron", "Variable Frequency Drive", "VFD"]
},
{
  "id": "4",
  "name": "Emotron M20 Shaft Power Monitor with CTM010",
  "category": "m20",
  "price": "21500",
  "description": "Compact and accurate shaft power monitor for real-time motor load protection. Supports up to 10A motor current for pumps, mixers, fans, and conveyors. No external sensors required.",
  "image": "/img/m20.png",
  "gst": "18",
  "sku": "M20-CTM010",
  "series": "M20",
  "model": "M20 + CTM010",
  "mainsVoltage": "100–240 VAC / 380–500 VAC / 525–690 VAC",
  "kw": "N/A",
  "hp": "N/A",
  "amps": "0–10A",
  "weight": "N/A",
  "range": "240 - 140 V",
  "rangeA":"10 - 1000 Amps",
  "features": [
    "True shaft power monitoring using motor current + phase angle",
    "No external sensors required — lower cost, faster install",
    "Auto-Set: Configure 4 protection points in 3 seconds",
    "LED display shows real-time motor load",
    "Analog output for PLC/SCADA integration",
    "DIN-rail mounting — compact & reliable"
  ],
  "benefits": [
    "Protects pumps from dry-run and cavitation",
    "Ensures mixers operate correctly with blade detection & viscosity control",
    "Prevents conveyor jams and no-load operation",
    "Monitors fans and blowers for overload & imbalance",
    "Reduces downtime and maintenance costs"
  ],
  "technicalSpecs": [
    { "parameter": "Model", "specification": "Emotron M20 + CTM010" },
    { "parameter": "Current Range", "specification": "0–10A" },
    { "parameter": "Supply Voltage", "specification": "100–240 VAC / 380–500 VAC / 525–690 VAC" },
    { "parameter": "Frequency", "specification": "50 / 60 Hz" },
    { "parameter": "Relay Outputs", "specification": "2 configurable" },
    { "parameter": "Analog Output", "specification": "4–20 mA / 0–20 mA (scalable)" },
    { "parameter": "Display", "specification": "LED (load %, kW, HP)" },
    { "parameter": "Protection", "specification": "IP20" },
    { "parameter": "Mounting", "specification": "35 mm DIN rail" },
    { "parameter": "Certifications", "specification": "CE, UL, cUL" }
  ],
  "seriesRange": [
    "Current: 0–10A",
    "Voltage: 100–240 VAC / 380–500 VAC / 525–690 VAC",
    "Frequency: 50 / 60 Hz"
  ],
  "applications": [
    "Pumps – dry-run & cavitation protection",
    "Mixers – blade detection & viscosity control",
    "Conveyors – jam & no-load detection",
    "Fans & blowers – overload & imbalance alerts"
  ],
  "tags": ["CG Emotron", "Shaft Power Monitor", "Motor Protection", "CTM010"]
},
{
  "id": "5",
  "name": "Emotron M20 Shaft Power Monitor with CTM025",
  "category": "m20",
  "price": "24650",
  "description": "Compact shaft power monitoring solution for motor currents up to 25A. Protects pumps, mixers, conveyors, fans, and industrial equipment from overload, dry-run, or mechanical faults.",
  "image": "/img/m20.png",
  "gst": "18",
  "sku": "M20-CTM025",
  "series": "M20",
  "model": "M20 + CTM025",
  "mainsVoltage": "1×100–240 VAC / 3×100–240 / 380–500 / 525–690 VAC",
  "kw": "N/A",
  "hp": "N/A",
  "amps": "0–25A",
  "weight": "N/A",
  "features": [
    "Shaft power monitoring based on motor input power and phase angle",
    "CTM025 handles up to 25A motor load",
    "Auto-set feature for 3-second setup of protection thresholds",
    "LED display with real-time load visualization (kW, HP, %)",
    "Analog output (0–20 mA / 4–20 mA) for PLC/SCADA integration",
    "Two relay outputs for warning and trip functions",
    "Compact DIN rail mount design – easy to install and low maintenance"
  ],
  "benefits": [
    "Protects pumps from dry-run and cavitation alerts",
    "Monitors conveyors to detect overload or empty runs",
    "Ensures mixers maintain correct blade load and viscosity",
    "Provides real-time shaft power feedback for fans and crushers",
    "Reduces downtime and maintenance costs in industrial setups"
  ],
  "technicalSpecs": [
    { "parameter": "Model", "specification": "Emotron M20 with CTM025" },
    { "parameter": "Current Range", "specification": "0–25 A" },
    { "parameter": "Supply Voltage", "specification": "1×100–240 VAC / 3×100–240 / 380–500 / 525–690 VAC" },
    { "parameter": "Frequency", "specification": "50 / 60 Hz" },
    { "parameter": "Analog Output", "specification": "0–20 mA / 4–20 mA (scalable)" },
    { "parameter": "Relay Outputs", "specification": "2 configurable (alarm + trip)" },
    { "parameter": "Display", "specification": "LED with shaft power in % / kW / HP" },
    { "parameter": "Mounting", "specification": "35 mm DIN rail" },
    { "parameter": "Protection Class", "specification": "IP20" },
    { "parameter": "Certifications", "specification": "CE, UL, cUL" }
  ],
  "seriesRange": [
    "Current: 0–25 A",
    "Voltage: 1×100–240 VAC / 3×100–240 / 380–500 / 525–690 VAC",
    "Frequency: 50 / 60 Hz"
  ],
  "applications": [
    "Pumps – dry-run and cavitation alerts",
    "Conveyors – detect overload or empty runs",
    "Mixers – monitor blade load and viscosity",
    "Fans / Crushers – real-time shaft power feedback"
  ],
  "tags": ["CG Emotron", "Shaft Power Monitor", "Motor Protection", "CTM025"]
},
{
  "id": "6",
  "name": "Emotron M20 Shaft Power Monitor with CTM050",
  "category": "m20",
  "price": "28850",
  "description": "Robust industrial-grade shaft power monitor for motor currents up to 50A. Protects pumps, mixers, conveyors, crushers, and fans from overload, underload, dry-run, or mechanical faults.",
  "image": "/img/m20.png",
  "gst": "18",
  "sku": "M20-CTM050",
  "series": "M20",
  "model": "M20 + CTM050",
  "mainsVoltage": "1×100–240 VAC / 3×100–240 / 380–500 / 525–690 VAC",
  "kw": "N/A",
  "hp": "N/A",
  "amps": "0–50A",
  "weight": "N/A",
  "features": [
    "True shaft power monitoring (not just current sensing)",
    "Auto-set feature configures all protection levels in 3 seconds",
    "LED display shows real-time load (% / kW / HP)",
    "Analog output (0–20 mA / 4–20 mA) for SCADA/PLC integration",
    "Two relay outputs for alarm and trip responses",
    "No external sensors required — compact and sensorless",
    "DIN-rail mounting — simple, compact, and maintenance-free"
  ],
  "benefits": [
    "Prevents pump dry-run, blocked impellers, and cavitation",
    "Detects changes in mixer viscosity or blade faults",
    "Monitors conveyor material flow, jamming, and idling",
    "Detects abnormal shaft load variations in crushers and fans",
    "Minimizes downtime and reduces maintenance costs"
  ],
  "technicalSpecs": [
    { "parameter": "Model", "specification": "Emotron M20 with CTM050" },
    { "parameter": "Current Range", "specification": "0–50 A" },
    { "parameter": "Supply Voltage", "specification": "1×100–240 VAC / 3×100–240 / 380–500 / 525–690 VAC" },
    { "parameter": "Frequency", "specification": "50 / 60 Hz" },
    { "parameter": "Display", "specification": "LED" },
    { "parameter": "Analog Output", "specification": "0–20 mA / 4–20 mA (scalable)" },
    { "parameter": "Relay Outputs", "specification": "2 programmable outputs" },
    { "parameter": "Protection", "specification": "IP20" },
    { "parameter": "Mounting", "specification": "DIN rail 35 mm" },
    { "parameter": "Certifications", "specification": "CE, UL, cUL" }
  ],
  "seriesRange": [
    "Current: 0–50 A",
    "Voltage: 1×100–240 VAC / 3×100–240 / 380–500 / 525–690 VAC",
    "Frequency: 50 / 60 Hz"
  ],
  "applications": [
    "Pumps – Prevent dry-run, blocked impellers, and cavitation",
    "Mixers – Detect changes in viscosity or blade faults",
    "Conveyors – Monitor material flow, detect jamming or idling",
    "Crushers / Fans – Detect abnormal shaft load variations"
  ],
  "tags": ["CG Emotron", "Shaft Power Monitor", "Motor Protection", "CTM050"]
},
{
  "id": "7",
  "name": "Emotron M20 Shaft Power Monitor with CTM100",
  "category": "m20",
  "price": "31850",
  "description": "Advanced sensorless shaft power monitor for motors up to 100A. Protects pumps, conveyors, mixers, crushers, and blowers from overload, dry-run, and mechanical faults.",
  "image": "/img/m20.png",
  "gst": "18",
  "sku": "M20-CTM100",
  "series": "M20",
  "model": "M20 + CTM100",
  "mainsVoltage": "Single-phase: 100–240 VAC / Three-phase: 100–240 / 380–500 / 525–690 VAC",
  "kw": "N/A",
  "hp": "N/A",
  "amps": "0–100A",
  "weight": "N/A",
  "features": [
    "Real-time shaft power measurement for precision monitoring",
    "Auto-set feature configures 4 protection thresholds in under 3 seconds",
    "LED display shows load and status clearly",
    "Analog output (0–20 mA / 4–20 mA) for PLC and SCADA integration",
    "Two configurable relay outputs for alarm and trip",
    "Supports motor loads up to 100A with CTM100",
    "Compact DIN rail mounting — quick and easy installation"
  ],
  "benefits": [
    "Prevents pump dry-run, impeller failure, or cavitation",
    "Monitors conveyors for jam, overload, or no-load conditions",
    "Tracks mixer blade faults and product viscosity changes",
    "Detects inconsistent or excessive motor load in crushers and blowers",
    "Reduces downtime and unplanned maintenance in industrial setups"
  ],
  "technicalSpecs": [
    { "parameter": "Model", "specification": "Emotron M20 with CTM100" },
    { "parameter": "Current Range", "specification": "0–100 A" },
    { "parameter": "Supply Voltage", "specification": "Single-phase: 100–240 VAC / Three-phase: 100–240 / 380–500 / 525–690 VAC" },
    { "parameter": "Frequency", "specification": "50 / 60 Hz" },
    { "parameter": "Display", "specification": "LED (kW / HP / % Load)" },
    { "parameter": "Analog Output", "specification": "0–20 mA / 4–20 mA (scalable)" },
    { "parameter": "Relay Outputs", "specification": "2 user-programmable" },
    { "parameter": "Protection Class", "specification": "IP20" },
    { "parameter": "Mounting", "specification": "DIN rail (35 mm)" },
    { "parameter": "Certifications", "specification": "CE, UL, cUL" }
  ],
  "seriesRange": [
    "Current: 0–100 A",
    "Voltage: Single-phase: 100–240 VAC / Three-phase: 100–240 / 380–500 / 525–690 VAC",
    "Frequency: 50 / 60 Hz"
  ],
  "applications": [
    "Pumps – Detect dry-run, impeller failure, or cavitation",
    "Conveyors – Monitor for jam, overload, or no-load",
    "Mixers – Track blade faults or product viscosity changes",
    "Crushers & Blowers – Detect inconsistent or excessive motor load"
  ],
  "tags": ["CG Emotron", "Shaft Power Monitor", "Motor Protection", "CTM100"]
},
{
  "id": "8",
  "name": "VSM48- 003",
  "modelInfo":"Emotron VSM, 3-phase Supply Un = 380-480 +/-10%, IP20",
  "category": "vsm",
  "price": "22764",
  "description": "High-efficiency Variable Frequency Drive (VFD) for reliable motor control in compact spaces. Rated at 1.5kW (2HP) and 4.2A, suitable for fans, blowers, conveyors, and pumps.",
  "image": "/img/ CG Emotron AC Drive VSM48-009-20CEB.png",
  "gst": "18",
  "sku": "VSM48- 003",
  "series": "VSM",
  "model": "VSM48- 003",
  "mainsVoltage": "3 Phase 415 Volt (+20% continues voltage fluctuation)",
  "kw": "0.75 KW",
  "hp": "1 HP",
  "amps": "2.5 Amps",
  "weight": "0.85 kg",
  "range": "0.75 - 3.7 kW",
  "rangeA":"2.5 - 9.5 Apms",
  "features": [
    "Compact and lightweight (only 1 kg)",
    "Standard LED display for clear diagnostics",
    "Compatible with Induction and PM motors",
    "Built-in brake chopper for enhanced motor control",
    "High-speed pulse input capability",
    "200% overload capacity for 1 second",
    "Integrated PLC logic, virtual I/Os, timers, and comparators",
    "C3 class EMC filter for safe and interference-free operation"
  ],
  "benefits": [
    "Excellent start torque ideal for demanding operations",
    "Efficient thermal design for high reliability in industrial conditions",
    "Compact footprint allows for easy panel integration",
    "Fast setup and user-friendly interface"
  ],
  "technicalSpecs": [
    { "parameter": "Model", "specification": "VSM48-004-20CEB" },
    { "parameter": "Power Output", "specification": "1.5 kW / 2 HP" },
    { "parameter": "Rated Current", "specification": "4.2 Amps" },
    { "parameter": "Input Voltage", "specification": "3 Phase 380 – 480 VAC (±20%)" },
    { "parameter": "Frequency", "specification": "50 Hz" },
    { "parameter": "Weight", "specification": "1.0 kg" },
    { "parameter": "Display", "specification": "Standard LED" },
    { "parameter": "Built-in Filter", "specification": "C3 Class EMC" },
    { "parameter": "Certification", "specification": "CE" }
  ],
  "seriesRange": [
    "Power: 0.75 kW to 4.0 kW",
    "Current: 2.5 A to 9.5 A",
    "Voltage: 3 Phase, 380–480 VAC / 50Hz"
  ],
  "applications": [
    "Water Pumps",
    "Blowers & Fans",
    "Conveyors",
    "Cranes & Hoists",
    "Damper & HVAC Control"
  ],
  "tags": ["AC DRIVE", "CG Emotron", "Variable Frequency Drive", "VFD"]
},
{
  "id": "9",
  "name": "VSM48- 004",
  "category": "vsm",
  "price": "25178",
  "description": "High-performance Variable Frequency Drive (VFD) for precision motor control in industrial applications. Rated at 2.2kW (3HP) and 5.5A, suitable for pumps, blowers, fans, conveyors, cranes, and more.",
  "image": "/img/ CG Emotron AC Drive VSM48-009-20CEB.png",
  "gst": "18",
  "sku": "VSM48- 004",
  "series": "VSM",
  "model": "VSM48- 004",
  "mainsVoltage": "3 Phase 415 Volt (+20% continues voltage fluctuation)",
  "kw": "1.5 KW",
  "hp": "2 HP",
  "amps": "4.2 Amps",
  "weight": "o.85 kg",
  "features": [
    "Compact & optimized design for flexible installation",
    "Standard LED display for real-time system monitoring",
    "Supports both Induction and PM motors",
    "Heavy-duty performance with enhanced protection",
    "Built-in brake chopper for controlled deceleration",
    "High-speed pulse input for feedback precision",
    "200% overload capacity for 1 second",
    "Integrated PLC functions, logic gates, timers, and comparators",
    "C3 class EMC filter ensures clean electrical operation"
  ],
  "benefits": [
    "High startup torque ideal for load-heavy operations",
    "Independent air duct design ensures better cooling & lifespan",
    "Built for hot and humid industrial climates",
    "Plug-and-play ready for rapid commissioning"
  ],
  "technicalSpecs": [
    { "parameter": "Model", "specification": "VSM48-006-20CEB" },
    { "parameter": "Power Output", "specification": "2.2 kW / 3 HP" },
    { "parameter": "Rated Current", "specification": "5.5 Amps" },
    { "parameter": "Input Voltage", "specification": "3 Phase 380 – 480 VAC (±20%)" },
    { "parameter": "Frequency", "specification": "50 Hz" },
    { "parameter": "Weight", "specification": "1.5 kg" },
    { "parameter": "Display", "specification": "Standard LED" },
    { "parameter": "Built-in Filter", "specification": "C3 Class EMC" },
    { "parameter": "Certification", "specification": "CE" }
  ],
  "seriesRange": [
    "Power: 0.75 kW to 4.0 kW",
    "Current: 2.5 A to 9.5 A",
    "Voltage: 3 Phase, 380–480 VAC / 50Hz"
  ],
  "applications": [
    "Water Pumps",
    "HVAC Blowers and Fans",
    "Industrial Conveyors",
    "Damper Control",
    "Crane and Hoist Systems"
  ],
  "tags": ["AC DRIVE", "CG Emotron", "Variable Frequency Drive", "VFD"]
},
{
  "id": "10",
  "name": "VSM48- 006",
  "category": "vsm",
  "price": "27937",
  "description": "Compact and robust Variable Frequency Drive (VFD) rated at 3.7 kW (5 HP) and 9.5 Amps. Supports both Induction and Permanent Magnet Motors for pumps, fans, conveyors, blowers, and cranes.",
  "image": "/img/ CG Emotron AC Drive VSM48-009-20CEB.png",
  "gst": "18",
  "sku": "VSM48- 006",
  "series": "VSM",
  "model": "VSM48- 006",
  "mainsVoltage": "3 Phase 415 Volt (+20% continues voltage fluctuation)",
  "kw": "2.2 KW",
  "hp": "3 HP",
  "amps": "5.5 Amps",
  "weight": "1.35 kg",
  "features": [
    "Optimized structural design for space-saving installation",
    "Standard LED display for real-time status and monitoring",
    "Compatible with both Induction & PM Motors",
    "Integrated brake chopper for improved dynamic braking",
    "200% overload capability for 1 second",
    "High-speed pulse input for advanced feedback control",
    "Built-in PLC functions, virtual digital I/Os, timers, and logic gates",
    "C3 Class EMC filter for minimized electromagnetic interference"
  ],
  "benefits": [
    "High torque output at startup for demanding loads",
    "Enhanced reliability with independent air duct cooling system",
    "Fast and simple installation in tight panel spaces",
    "Cost-effective VFD solution for industrial automation"
  ],
  "technicalSpecs": [
    { "parameter": "Model", "specification": "VSM48-009-20CEB" },
    { "parameter": "Power Output", "specification": "3.7 kW / 5 HP" },
    { "parameter": "Current Rating", "specification": "9.5 Amps" },
    { "parameter": "Voltage", "specification": "3 Phase, 380 – 480 VAC (±20%)" },
    { "parameter": "Frequency", "specification": "50 Hz" },
    { "parameter": "Weight", "specification": "1.5 kg" },
    { "parameter": "Display", "specification": "Standard LED" },
    { "parameter": "Built-in Filter", "specification": "C3 Class EMC" },
    { "parameter": "Certification", "specification": "CE" }
  ],
  "seriesRange": [
    "Power: 0.75 kW to 4.0 kW",
    "Current: 2.5 A to 9.5 A",
    "Voltage: 3 Phase, 380–480 VAC / 50Hz"
  ],
  "applications": [
    "Pump Control",
    "Fans and Blowers",
    "Cranes and Hoists",
    "Conveyor Systems",
    "Damper Actuation"
  ],
  "tags": ["AC DRIVE", "CG Emotron", "Variable Frequency Drive", "VFD"]
},
{
  "id": "11",
  "name": "VSM48- 009",
  "category": "vsm",
  "price": "32852",
  "description": "Compact and efficient Variable Frequency Drive (VFD) rated at 0.75 kW (1 HP) and 2.5 Amps. Supports both Induction and Permanent Magnet motors for small to medium industrial applications.",
  "image": "/img/ CG Emotron AC Drive VSM48-009-20CEB.png",
  "gst": "18",
  "sku": "VSM48- 009",
  "series": "VSM",
  "model": "VSM48- 009",
  "mainsVoltage": "3 Phase 415 Volt (+20% continues voltage fluctuation)",
  "kw": "3.7 KW",
  "hp": "5 HP",
  "amps": "9.5 Amps",
  "weight": "1.35 kg",
  "features": [
    "Lightweight and compact (only 1 kg)",
    "Standard LED display for real-time status and diagnostics",
    "Drives both Induction and PM motors",
    "Built-in brake chopper for rapid stopping and safety",
    "High-speed pulse input for precise control",
    "200% overload capability for 1 second",
    "Advanced PLC logic functions with timers, comparators, and virtual I/Os",
    "Integrated C3 class EMC filter to reduce electrical noise"
  ],
  "benefits": [
    "High start torque performance for challenging applications",
    "Efficient cooling system with independent air duct design",
    "Compact size allows for easy installation in panels or machines",
    "Built for long-term durability in harsh environments"
  ],
  "technicalSpecs": [
    { "parameter": "Model", "specification": "VSM48-003-20CEB" },
    { "parameter": "Power Output", "specification": "0.75 kW / 1 HP" },
    { "parameter": "Rated Current", "specification": "2.5 Amps" },
    { "parameter": "Input Voltage", "specification": "3 Phase 380 – 480 VAC (±20%)" },
    { "parameter": "Frequency", "specification": "50 Hz" },
    { "parameter": "Weight", "specification": "1.0 kg" },
    { "parameter": "Display", "specification": "Standard LED" },
    { "parameter": "Brake Chopper", "specification": "Built-in" },
    { "parameter": "EMC Filter", "specification": "C3 Class" },
    { "parameter": "Certification", "specification": "CE" }
  ],
  "seriesRange": [
    "Power Rating: 0.75 kW to 4.0 kW",
    "Current Range: 2.5 A to 9.5 A",
    "Voltage: 3 Phase 380–480 VAC / 50Hz"
  ],
  "applications": [
    "Pumps – water treatment, booster systems",
    "Fans and Blowers – HVAC and industrial ventilation",
    "Conveyors – food, pharma, packaging lines",
    "Cranes and Hoists – for safe and efficient lifting",
    "Dampers and Valves – automation and control systems"
  ],
  "tags": ["AC DRIVE", "CG Emotron", "Variable Frequency Drive", "VFD"]
},
{
  "id": "12",
  "name": "VSX48003-XS",
  "modelInfo":"3-phase Supply Un = 380-480 +/-10%, IP20",
  "category": "vsx",
  "price": "30925",
  "description": "Compact, energy-efficient Variable Frequency Drive (VFD) rated at 0.75 kW (1 HP) and 2.5 Amps, supporting both Induction and Permanent Magnet Motors for small motor applications.",
  "image": "/img/vsx10 Medium.png",
  "gst": "18",
  "sku": "VSX48003-XS",
  "series": "VSX",
  "model": "VSX48003-XS",
  "kw": "0.75 KW",
  "hp": "1 HP",
  "amps": "2.5 Amps",
  "weight": "1.25 kg",
  "range": "0.75 - 55 kW",
  "rangeA":"2.5 - 112 Amps",
  "features": [
    "LCD Graphical Display with built-in oscilloscope",
    "200% overload handling for 1 second",
    "High-speed pulse I/O support up to 100 KHz",
    "Compatible with Induction and PM motors",
    "Flexible V/F control (fully and semi-separated modes)",
    "Integrated PLC logic, virtual digital I/Os, timers, and comparators",
    "Built-in EMC filter for electromagnetic compliance",
    "Emo Wizard tool for smooth setup and debugging"
  ],
  "benefits": [
    "Delivers high starting torque for small motors",
    "Tropicalized boards ensure stability in hot and humid environments",
    "Advanced airflow design extends life and improves cooling efficiency",
    "Lightweight (1.5 kg) – ideal for compact installations"
  ],
  "technicalSpecs": [
    { "parameter": "Model", "specification": "VSX48-003-20CEB" },
    { "parameter": "Power Output", "specification": "0.75 kW / 1 HP" },
    { "parameter": "Current Rating", "specification": "2.5 Amps" },
    { "parameter": "Input Voltage", "specification": "3 Phase, 380 – 480 VAC / 50Hz" },
    { "parameter": "Weight", "specification": "1.5 kg" },
    { "parameter": "Certification", "specification": "CE" }
  ],
  "seriesRange": [
    "Power Range: 0.75 kW to 55 kW",
    "Current Range: 2.5 A to 112 A",
    "Voltage: 3 Phase, 380–480 VAC",
    "Applications: For Induction & PM Motors",
    "Certification: CE"
  ],
  "applications": [
    "Industrial motors (Induction & PM)",
    "Small motor automation applications",
    "OEM integration and system control"
  ],
  "tags": ["AC DRIVE", "CG Emotron", "Variable Frequency Drive", "VFD"]
},
{
  "id": "13",
  "name": " VSX48004-XS",
  "category": "vsx",
  "price": "32587",
  "description": "High-performance, compact Variable Frequency Drive (VFD) rated at 1.5 kW (2 HP) and 4.2 Amps, controlling both Induction and Permanent Magnet Motors for industrial applications.",
  "image": "/img/vsx8 Medium.png",
  "gst": "18",
  "sku": " VSX48004-XS",
  "series": "VSX",
  "model": " VSX48004-XS",
  "kw": "1.5 KW",
  "hp": "2 HP",
  "amps": "4.2 Amps",
  "weight": "1.25 kg",
  "features": [
    "Graphical LCD with built-in oscilloscope functionality",
    "200% overload capacity for 1 second",
    "High-speed pulse I/O capability (up to 100 KHz)",
    "Works with both Induction and PM motors",
    "Fully and semi-separated V/F control options",
    "Integrated PLC logic, virtual I/O, timers, comparators",
    "Built-in EMC filter for noise-free operation",
    "Supports Emo Wizard for intuitive setup and debugging"
  ],
  "benefits": [
    "Delivers excellent torque and motor response, even during startup",
    "Conformal coated PCB ensures reliable performance in harsh climates",
    "Independent air and duct cooling for longevity and thermal efficiency",
    "Lightweight (1.5 kg) – ideal for space-restricted installations"
  ],
  "technicalSpecs": [
    { "parameter": "Model", "specification": "VSX48-004-20CEB" },
    { "parameter": "Power Output", "specification": "1.5 kW / 2 HP" },
    { "parameter": "Current", "specification": "4.2 Amps" },
    { "parameter": "Input Voltage", "specification": "3 Phase, 380–480 VAC / 50Hz" },
    { "parameter": "Weight", "specification": "1.5 kg" },
    { "parameter": "Certification", "specification": "CE" }
  ],
  "seriesRange": [
    "Power: 0.75 kW to 55 kW",
    "Current Range: 2.5 A to 112 A",
    "Input Voltage: 3 Phase, 380 to 480 VAC",
    "Application: Induction & PM Motors",
    "Certification: CE"
  ],
  "applications": [
    "Industrial motor control",
    "Induction & PM motors",
    "OEM integration and system control"
  ],
  "tags": ["AC DRIVE", "CG Emotron", "Variable Frequency Drive", "VFD"]
},
{
  "id": "14",
  "name": "VSX48006-XS",
  "category": "vsx",
  "price": "37387",
  "description": "Compact, high-performance Variable Frequency Drive (VFD) rated at 2.2 kW (3 HP) and 5.5 Amps, controlling both Induction and Permanent Magnet Motors with precision for industrial applications.",
  "image": "/img/vsx9 Medium.png",
  "gst": "18",
  "sku": "VSX48006-XS",
  "series": "VSX",
  "model": "VSX48006-XS",
  "kw": "2.2 KW",
  "hp": "3 HP",
  "amps": "5.5 Amps",
  "weight": "1.25 kg",
  "features": [
    "LCD display with oscilloscope function for real-time monitoring",
    "200% overload capacity for 1 second",
    "High-speed I/O up to 100 KHz",
    "Compatible with both Induction Motors and PM motors",
    "Configurable V/F control (separated & semi-separated)",
    "Built-in PLC logic, virtual I/O, timers, and multi-function logic",
    "Integrated EMC filter for electromagnetic compatibility",
    "Supports Emo Wizard software for seamless configuration"
  ],
  "benefits": [
    "Delivers high starting torque and efficient motor response",
    "Conformal coated boards for performance in hot/humid environments",
    "Efficient heat dissipation with separate air & duct design",
    "Compact & lightweight at just 1.5 kg, ideal for space-constrained setups"
  ],
  "technicalSpecs": [
    { "parameter": "Model", "specification": "VSX48-006-20CEB" },
    { "parameter": "Power", "specification": "2.2 kW / 3 HP" },
    { "parameter": "Current Rating", "specification": "5.5 Amps" },
    { "parameter": "Input Voltage", "specification": "3 Phase, 380–480 VAC / 50Hz" },
    { "parameter": "Weight", "specification": "1.5 kg" },
    { "parameter": "Certification", "specification": "CE Certified" }
  ],
  "seriesRange": [
    "Power: 0.75 kW to 55 kW",
    "Current Range: 2.5 A to 112 A",
    "Voltage: 3 Phase, 380 to 480 VAC",
    "Certification: CE Marked"
  ],
  "applications": [
    "Industrial motor control",
    "Induction & PM motors",
    "OEM integration and system control"
  ],
  "tags": ["AC DRIVE", "CG Emotron", "Variable Frequency Drive", "VFD"]
},
{
  "id": "15",
  "name": "VSX48009-XS",
  "category": "vsx",
  "price": "42787",
  "description": "High-performance Variable Frequency Drive (VFD) rated at 3.7 kW (5 HP) and 9.5 Amps, suitable for both Induction and Permanent Magnet Motors, offering precision control for industrial applications.",
  "image": "/img/vsx10 Medium.png",
  "gst": "18",
  "sku": "VSX48009-XS",
  "series": "VSX",
  "model": "VSX48009-XS",
  "kw": "3.7 KW",
  "hp": "5 HP",
  "amps": "9.5 Amps",
  "weight": "2.5 kg",
  "features": [
    "Graphical LCD Display with integrated oscilloscope",
    "200% overload capacity for 1 second",
    "High-speed pulse I/O up to 100 KHz",
    "Operates with Induction and PM motors",
    "Advanced V/F control (separated/semi-separated)",
    "Built-in PLC, virtual digital I/Os, timers, and comparators",
    "Inbuilt EMC filter for electrical noise suppression",
    "Emo Wizard software for fast commissioning and troubleshooting"
  ],
  "benefits": [
    "Excellent torque at low speeds for demanding applications",
    "Tropicalized PCB coating for enhanced durability in harsh environments",
    "Efficient thermal management with dedicated air and duct paths",
    "Designed for compact spaces, ensuring flexible installation options"
  ],
  "technicalSpecs": [
    { "parameter": "Model", "specification": "VSX48-009-20CEB" },
    { "parameter": "Power", "specification": "3.7 kW / 5 HP" },
    { "parameter": "Current Rating", "specification": "9.5 Amps" },
    { "parameter": "Input Voltage", "specification": "3 Phase, 380–480 VAC / 50Hz" },
    { "parameter": "Weight", "specification": "2.5 kg" },
    { "parameter": "Certification", "specification": "CE Marked" }
  ],
  "seriesRange": [
    "Power Output: 0.75 kW to 55 kW",
    "Current Range: 2.5 A to 112 A",
    "Voltage Input: 3 Phase, 380 to 480 VAC",
    "Compliance: CE Certified"
  ],
  "applications": [
    "Industrial motor control",
    "Induction & PM motors",
    "Automation and system integration"
  ],
  "tags": ["AC DRIVE", "CG Emotron", "Variable Frequency Drive", "VFD"]
},
{
  "id": "16",
  "name": "VSX48013-XS",
  "category": "vsx",
  "price": "54072",
  "description": "Compact and powerful Variable Frequency Drive (VFD) rated at 7.5 kW (10 HP) and 17 Amps, supporting Induction and Permanent Magnet motors for precise industrial motor control.",
  "image": "/img/vsx5 Medium.png",
  "gst": "18",
  "sku": "VSX48013-XS",
  "series": "VSX",
  "model": "VSX48013-XS",
  "kw": "5.5 KW",
  "hp": "7.5 HP",
  "amps": "13 Amps",
  "weight": "2.5 kg",
  "features": [
    "LCD graphical display with integrated oscilloscope",
    "200% overload capacity for 1 second",
    "High-speed pulse I/O up to 100 KHz",
    "Compatible with Induction and PM motors",
    "Supports V/F separated and semi-separated operation",
    "Integrated PLC logic functions, timers, comparators, and multi-logic functions",
    "Built-in EMC filter for EMI reduction",
    "Emo Wizard tool for setup, debugging, and monitoring"
  ],
  "benefits": [
    "Delivers excellent starting torque even under load",
    "Conformal coated boards ensure reliability in humid and harsh environments",
    "Efficient cooling system with independent ducting for extended lifespan",
    "Plug-and-play functionality reduces setup time and downtime"
  ],
  "technicalSpecs": [
    { "parameter": "Model", "specification": "VSX48-017-20CEB" },
    { "parameter": "Power", "specification": "7.5 kW / 10 HP" },
    { "parameter": "Current Rating", "specification": "17 Amps" },
    { "parameter": "Input Voltage", "specification": "3 Phase, 380–480 VAC / 50Hz" },
    { "parameter": "Weight", "specification": "3.5 kg" },
    { "parameter": "Certification", "specification": "CE Certified" }
  ],
  "seriesRange": [
    "Power Range: 0.75 kW to 55 kW",
    "Current Range: 2.5 A to 112 A",
    "Voltage: 3 Phase, 380 to 480 VAC",
    "Certified: CE"
  ],
  "applications": [
    "Industrial motor control",
    "Induction & PM motors",
    "OEM integration and system control"
  ],
  "tags": ["AC DRIVE", "CG Emotron", "Variable Frequency Drive", "VFD"]
},
{
  "id": "17",
  "name": "VSX48017-XS",
  "category": "vsx",
  "price": "64885",
  "description": "Compact, reliable, and high-performance Variable Frequency Drive (VFD) rated at 11 kW (15 HP) and 24 Amps, supporting both Induction and Permanent Magnet motors for precise industrial motor control.",
  "image": "/img/vsx.png",
  "gst": "18",
  "sku": "VSX48017-XS",
  "series": "VSX",
  "model": "VSX48017-XS",
  "kw": "7.5 KW",
  "hp": "10 HP",
  "amps": "17 Amps",
  "weight": "3.9 kg",
  "features": [
    "Advanced LCD graphical display with built-in oscilloscope",
    "Handles overloads up to 200% of rated load for 1 second",
    "High-speed digital pulse I/O up to 100 KHz",
    "Operates with both Induction and PM motors",
    "Selectable V/F control: fully or semi-separated mode",
    "Built-in PLC logic with virtual digital I/Os, timers, logic functions, and comparators",
    "Integrated EMC filter for noise suppression and compliance",
    "Emo Wizard tool for seamless setup, monitoring, and debugging"
  ],
  "benefits": [
    "Delivers high torque at start, ensuring reliable performance under load",
    "Rugged design with conformal coated PCBs ensures durability in harsh, humid conditions",
    "Optimized cooling design enhances lifespan and reliability",
    "Fast installation and low maintenance reduce operational downtime"
  ],
  "technicalSpecs": [
    { "parameter": "Model", "specification": "VSX48-024-20CEB" },
    { "parameter": "Power", "specification": "11 kW / 15 HP" },
    { "parameter": "Current Rating", "specification": "24 Amps" },
    { "parameter": "Input Voltage", "specification": "3 Phase, 380–480 VAC / 50Hz" },
    { "parameter": "Weight", "specification": "3.5 kg" },
    { "parameter": "Certification", "specification": "CE Certified" }
  ],
  "seriesRange": [
    "Power: 0.75 kW to 55 kW",
    "Current Range: 2.5 A to 112 A",
    "Voltage: 3 Phase, 380 to 480 VAC",
    "Certified: CE Compliant"
  ],
  "applications": [
    "Industrial motor control",
    "Induction & PM motors",
    "OEM integration and system control"
  ],
  "tags": ["AC DRIVE", "CG Emotron", "Variable Frequency Drive", "VFD"]
},
{
  "id": "18",
  "name": "VSX48024-XS",
  "category": "vsx",
  "price": "78963",
  "description": "High-performance Variable Frequency Drive (VFD) rated at 15 kW (20 HP) and 32 Amps, designed for precise control of both Induction and Permanent Magnet motors in industrial applications.",
  "image": "/img/vsx2.png",
  "gst": "18",
  "sku": "VSX48024-XS",
  "series": "VSX",
  "model": "VSX48024-XS",
  "kw": "11 KW",
  "hp": "15 HP",
  "amps": "25 Amps",
  "weight": "3.9 kg",
  "features": [
    "High-contrast LCD graphical display with integrated oscilloscope",
    "200% overload handling for 1 second",
    "Fast pulse input/output support up to 100 KHz",
    "Compatible with both Induction and Permanent Magnet Motors",
    "V/F control options: fully or semi-separated mode",
    "Onboard PLC with virtual digital I/Os, multi-logic functions, timers, and comparators",
    "Built-in EMC filter for noise reduction and compliance",
    "Emo Wizard software simplifies setup and debugging"
  ],
  "benefits": [
    "Delivers high start torque with smooth motor control",
    "Operates reliably in hot and humid conditions with conformal coated PCBs",
    "Efficient heat dissipation through a dedicated air and duct system",
    "Quick setup and low maintenance, ensuring reduced downtime"
  ],
  "technicalSpecs": [
    { "parameter": "Model", "specification": "VSX48-032-20CEB" },
    { "parameter": "Power", "specification": "15 kW / 20 HP" },
    { "parameter": "Current Rating", "specification": "32 Amps" },
    { "parameter": "Input Voltage", "specification": "3 Phase, 380–480 VAC / 50Hz" },
    { "parameter": "Weight", "specification": "7 kg" },
    { "parameter": "Certification", "specification": "CE Certified" }
  ],
  "seriesRange": [
    "Power: 0.75 kW to 55 kW",
    "Current: 2.5 A to 112 A",
    "Voltage: 3 Phase, 380–480 VAC",
    "Certification: CE Compliant"
  ],
  "applications": [
    "Industrial motor control",
    "Induction & PM motors",
    "OEM integration and system control"
  ],
  "tags": ["CG Emotron", "Variable Frequency Drive", "VFD"]
},
{
  "id": "19",
  "name": "VSX48032-XS",
  "category": "vsx",
  "price": "99887",
  "description": "Powerful and compact Variable Frequency Drive (VFD) rated at 18.5 kW (25 HP) and 38 Amps, designed for precise control of both Induction and Permanent Magnet motors in industrial applications.",
  "image": "/img/vsx3.png",
  "gst": "18",
  "sku": "VSX48032-XS",
  "series": "VSX",
  "model": "VSX48032-XS",
  "kw": "15 KW",
  "hp": "20 HP",
  "amps": "32 Amps",
  "weight": "6.2 kg",
  "features": [
    "High-resolution LCD graphical display with oscilloscope feature",
    "Overload capacity: 200% of rated load for 1 second",
    "High-speed pulse input/output up to 100 KHz",
    "Compatible with both Induction & Permanent Magnet Motors",
    "Flexible V/F control – fully or semi-separated operation",
    "Built-in PLC logic with digital I/O, timers, and comparators",
    "Integrated EMC filter ensures safe, noise-free operation",
    "Emo Wizard software for easy parameterization and diagnostics"
  ],
  "benefits": [
    "Delivers high start torque for demanding applications",
    "Robust design with conformal coated boards for humid, dusty conditions",
    "Efficient cooling through independent air and duct design",
    "Quick installation, user-friendly interface, minimal downtime"
  ],
  "technicalSpecs": [
    { "parameter": "Model", "specification": "VSX48-038-20CEB" },
    { "parameter": "Power", "specification": "18.5 kW / 25 HP" },
    { "parameter": "Current Rating", "specification": "38 Amps" },
    { "parameter": "Input Voltage", "specification": "3 Phase, 380–480 VAC / 50Hz" },
    { "parameter": "Weight", "specification": "7 kg" },
    { "parameter": "Certification", "specification": "CE" }
  ],
  "seriesRange": [
    "Power: 0.75 kW to 55 kW",
    "Current: 2.5 A to 112 A",
    "Voltage: 3 Phase, 380–480 VAC",
    "Certification: CE | Reliable & Safe Motor Control"
  ],
  "applications": [
    "Industrial motor control",
    "Induction & PM motors",
    "OEM integration and system control"
  ],
  "tags": ["AC DRIVE", "CG Emotron", "Variable Frequency Drive", "VFD"]
},
{
  "id": "20",
  "name": "VSX48038-XS",
  "category": "vsx",
  "price": "108070",
  "description": "Powerful and compact Variable Frequency Drive (VFD) rated at 22 kW (30 HP) and 45 Amps, designed for precise control of both Induction and Permanent Magnet motors in industrial applications.",
  "image": "/img/vsx4.png",
  "gst": "18",
  "sku": "VSX48038-XS",
  "series": "VSX",
  "model": "VSX48038-XS",
  "kw": "18.5 KW",
  "hp": "25 HP",
  "amps": "27 Amps",
  "weight": "7 kg",
  "features": [
    "User-friendly LCD graphical display with built-in oscilloscope",
    "200% overload capacity for 1 second for tough startups",
    "High-speed digital pulse I/O up to 100 KHz",
    "Compatible with Induction & Permanent Magnet Motors",
    "Advanced V/F control – fully/semi-separated modes",
    "Built-in PLC functions with logic timers and virtual digital I/O",
    "Integrated EMC filter for electrical noise reduction",
    "Emo Wizard software for fast configuration and diagnostics"
  ],
  "benefits": [
    "Reliable performance with high torque at low speeds",
    "Rugged design with conformal coated boards – ideal for harsh, humid conditions",
    "Advanced cooling system with independent air duct for long-lasting use",
    "Fast installation and minimal downtime"
  ],
  "technicalSpecs": [
    { "parameter": "Model", "specification": "VSX48-045-20CEB" },
    { "parameter": "Power", "specification": "22 kW / 30 HP" },
    { "parameter": "Current Rating", "specification": "45 Amps" },
    { "parameter": "Input Voltage", "specification": "3 Phase, 380–480 VAC / 50Hz" },
    { "parameter": "Weight", "specification": "7 kg" },
    { "parameter": "Certification", "specification": "CE" }
  ],
  "seriesRange": [
    "Power: 0.75 kW to 55 kW",
    "Current: 2.5 A to 112 A",
    "Voltage: 3 Phase, 380–480 VAC",
    "Certification: CE"
  ],
  "applications": [
    "Industrial motor control",
    "Induction & PM motors",
    "OEM integration and system control"
  ],
  "tags": ["AC DRIVE", "CG Emotron", "Variable Frequency Drive", "VFD"]
},
{
  "id": "21",
  "name": "VSX48045-XS",
  "category": "vsx",
  "price": "120845",
  "description": "High-performance Variable Frequency Drive (VFD) rated at 30 kW (40 HP) and 60 Amps, designed for precise control of both Induction and Permanent Magnet Motors in industrial applications.",
  "image": "/img/vsx5 Medium.png",
  "gst": "18",
  "sku": "VSX48045-XS",
  "series": "VSX",
  "model": "VSX48045-XS",
  "kw": "22 KW",
  "hp": "30 HP",
  "amps": "45 Amps",
  "weight": "6.2 kg",
  "features": [
    "LCD graphical display with oscilloscope interface",
    "200% overload capacity for 1 second",
    "High-speed pulse I/O up to 100 KHz",
    "Supports both Induction and Permanent Magnet Motors",
    "Advanced V/F control – fully and semi-separated modes",
    "Built-in PLC logic, timers, comparators, and digital I/O",
    "Integrated EMC filter for noise suppression",
    "Emo Wizard software for easy commissioning and debugging"
  ],
  "benefits": [
    "High starting torque for demanding applications",
    "Durable with conformal coated boards – ideal for harsh climates",
    "Optimized cooling system ensures longer lifespan",
    "Seamless installation and operation with intuitive interface"
  ],
  "technicalSpecs": [
    { "parameter": "Model", "specification": "VSX48-060-20CEB" },
    { "parameter": "Power", "specification": "30 kW / 40 HP" },
    { "parameter": "Current Rating", "specification": "60 Amps" },
    { "parameter": "Input Voltage", "specification": "3 Phase, 380–480 VAC / 50Hz" },
    { "parameter": "Weight", "specification": "12 kg" },
    { "parameter": "Certification", "specification": "CE" }
  ],
  "seriesRange": [
    "Power: 0.75 kW to 55 kW",
    "Current: 2.5 A to 112 A",
    "Voltage: 3 Phase, 380–480 VAC",
    "Certification: CE"
  ],
  "applications": [
    "Industrial motor control",
    "Induction & PM motors",
    "OEM integration and system control"
  ],
  "tags": ["AC DRIVE", "CG Emotron", "Variable Frequency Drive", "VFD"]
},
{
  "id": "22",
  "name": "VSX48060-XS",
  "category": "vsx",
  "price": "170289",
  "description": "High-performance Variable Frequency Drive (VFD) rated at 37 kW (50 HP) and 75 Amps, designed for precise control of both Induction and Permanent Magnet Motors in demanding industrial applications.",
  "image": "/img/vsx7 Medium.png",
  "gst": "18",
  "sku": "VSX48060-XS",
  "series": "VSX",
  "model": "VSX48060-XS",
  "kw": "30 KW",
  "hp": "40 HP",
  "amps": "60 Amps",
  "weight": "12.9 kg",
  "features": [
    "LCD graphical display with oscilloscope view",
    "200% overload capacity for 1 second",
    "Pulse input/output up to 100 KHz",
    "V/F fully and semi-separated operation",
    "Built-in PLC logic, timers, comparators",
    "Integrated EMC filter for noise reduction",
    "Emo Wizard software for easy setup"
  ],
  "benefits": [
    "High torque at start-up",
    "Robust design with conformal coated PCB",
    "Reliable operation in hot, humid environments",
    "Independent ducting ensures efficient cooling"
  ],
  "technicalSpecs": [
    { "parameter": "Model", "specification": "VSX48-075-20CEB" },
    { "parameter": "Power", "specification": "37 kW / 50 HP" },
    { "parameter": "Current Rating", "specification": "75 Amps" },
    { "parameter": "Input Voltage", "specification": "3 Phase, 380–480 VAC / 50Hz" },
    { "parameter": "Weight", "specification": "18 kg" },
    { "parameter": "Certification", "specification": "CE" }
  ],
  "seriesRange": [
    "Power: 0.75 kW to 55 kW",
    "Current: 2.5 A to 112 A",
    "Voltage: 3 Phase, 380–480 VAC",
    "Certification: CE"
  ],
  "applications": [
    "Industrial motor control",
    "Induction & PM motors",
    "OEM integration and system control"
  ],
  "tags": ["AC DRIVE", "CG Emotron", "Variable Frequency Drive", "VFD"]
},
{
  "id": "23",
  "name": "VSX48075-XS",
  "category": "vsx",
  "price": "201556",
  "description": "High-performance Variable Frequency Drive (VFD) rated at 45 kW (60 HP) and 91 Amps, designed for precise control of both Induction and Permanent Magnet Motors in demanding industrial environments.",
  "image": "/img/vsx8 Medium.png",
  "gst": "18",
  "sku": "VSX48075-XS",
  "series": "VSX",
  "model": "VSX48075-XS",
  "kw": "37 KW",
  "hp": "50 HP",
  "amps": "75 Amps",
  "weight": "12.9 kg",
  "features": [
    "LCD graphical display with oscilloscope feature",
    "200% overload for 1 second – strong load handling",
    "High-speed pulse I/O up to 100 KHz",
    "V/F operation: fully & semi-separated modes",
    "Built-in PLC logic with virtual I/O, timers, comparators",
    "Integrated EMC filter for enhanced performance",
    "Emo Wizard software for faster debugging and setup"
  ],
  "benefits": [
    "High start torque for challenging loads",
    "Durable design with conformal coated boards",
    "Reliable operation in hot and humid industrial environments",
    "Efficient cooling system with independent ducting"
  ],
  "technicalSpecs": [
    { "parameter": "Model", "specification": "VSX48-091-20CEB" },
    { "parameter": "Power", "specification": "45 kW / 60 HP" },
    { "parameter": "Current Rating", "specification": "91 Amps" },
    { "parameter": "Input Voltage", "specification": "3 Phase, 380–480 VAC / 50Hz" },
    { "parameter": "Weight", "specification": "20 kg" },
    { "parameter": "Certification", "specification": "CE" }
  ],
  "seriesRange": [
    "Power: 0.75 kW to 55 kW",
    "Current: 2.5 A to 112 A",
    "Voltage: 3 Phase, 380–480 VAC",
    "Certification: CE"
  ],
  "applications": [
    "Industrial motor control",
    "Induction & PM motors",
    "OEM integration and system control"
  ],
  "tags": ["AC DRIVE", "CG Emotron", "Variable Frequency Drive", "VFD"]
},
{
  "id": "24",
  "name": "VSX48091-XS",
  "category": "vsx",
  "price": "261203",
  "description": "High-performance Variable Frequency Drive (VFD) rated at 55 kW (75 HP) and 112 Amps, designed for precise control of both Induction and Permanent Magnet Motors in demanding industrial environments.",
  "image": "/img/vsx9 Medium.png",
  "gst": "18",
  "sku": "VSX48091-XS",
  "series": "VSX",
  "model": "VSX48091-XS",
  "kw": "45 KW",
  "hp": "60 HP",
  "amps": "91 Amps",
  "weight": "15 kg",
  "features": [
    "LCD Graphical Display with built-in oscilloscope",
    "200% overload capacity for 1 second",
    "High-speed pulse I/O up to 100 KHz",
    "Supports both Induction & PM Motors",
    "Built-in PLC logic functions and virtual I/Os",
    "V/F fully and semi-separated modes",
    "Integrated EMC filter for noise reduction",
    "Emo Wizard software for easy setup and debugging"
  ],
  "benefits": [
    "High starting torque for demanding applications",
    "Durable with conformal coated boards for harsh conditions",
    "Efficient cooling through independent air ducting",
    "Reliable operation in industrial environments"
  ],
  "technicalSpecs": [
    { "parameter": "Model", "specification": "VSX48-112-20CEB" },
    { "parameter": "Power", "specification": "55 kW / 75 HP" },
    { "parameter": "Current Rating", "specification": "112 Amps" },
    { "parameter": "Input Voltage", "specification": "3 Phase, 380–480 VAC / 50Hz" },
    { "parameter": "Weight", "specification": "24 kg" },
    { "parameter": "Certification", "specification": "CE" }
  ],
  "seriesRange": [
    "Power: 0.75 kW to 55 kW",
    "Current: 2.5 A to 112 A",
    "Voltage: 3 Phase, 380–480 VAC",
    "Certification: CE"
  ],
  "applications": [
    "Industrial motor control",
    "Automation systems",
    "HVAC",
    "Heavy machinery",
    "Smart manufacturing"
  ],
  "tags": ["AC DRIVE", "CG Emotron", "Variable Frequency Drive", "VFD"]
},
{
  "id": "25",
  "name": "VSX48112-XS",
  "category": "vsx",
  "price": "278514",
  "description": "High-performance Variable Frequency Drive (VFD) rated at 55 kW (75 HP) and 112 Amps, designed for precise control of both Induction and Permanent Magnet Motors in demanding industrial environments.",
  "image": "/img/vsx9 Medium.png",
  "gst": "18",
  "sku": "VSX48112-XS",
  "series": "VSX",
  "model": "VSX48112-XS",
  "kw": "55 KW",
  "hp": "70 HP",
  "amps": "112 Amps",
  "weight": "15 kg",
  "features": [
    "LCD Graphical Display with built-in oscilloscope",
    "200% overload capacity for 1 second",
    "High-speed pulse I/O up to 100 KHz",
    "Supports both Induction & PM Motors",
    "Built-in PLC logic functions and virtual I/Os",
    "V/F fully and semi-separated modes",
    "Integrated EMC filter for noise reduction",
    "Emo Wizard software for easy setup and debugging"
  ],
  "benefits": [
    "High starting torque for demanding applications",
    "Durable with conformal coated boards for harsh conditions",
    "Efficient cooling through independent air ducting",
    "Reliable operation in industrial environments"
  ],
  "technicalSpecs": [
    { "parameter": "Model", "specification": "VSX48-112-20CEB" },
    { "parameter": "Power", "specification": "55 kW / 75 HP" },
    { "parameter": "Current Rating", "specification": "112 Amps" },
    { "parameter": "Input Voltage", "specification": "3 Phase, 380–480 VAC / 50Hz" },
    { "parameter": "Weight", "specification": "24 kg" },
    { "parameter": "Certification", "specification": "CE" }
  ],
  "seriesRange": [
    "Power: 0.75 kW to 55 kW",
    "Current: 2.5 A to 112 A",
    "Voltage: 3 Phase, 380–480 VAC",
    "Certification: CE"
  ],
  "applications": [
    "Industrial motor control",
    "Automation systems",
    "HVAC",
    "Heavy machinery",
    "Smart manufacturing"
  ],
  "tags": ["AC DRIVE", "CG Emotron", "Variable Frequency Drive", "VFD"]
},
];
