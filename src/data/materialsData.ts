import { MaterialProperties } from '../types';

export const MATERIALS_DATABASE: MaterialProperties[] = [
  {
    id: 'al-6061-t6',
    name: 'Aluminium 6061-T6',
    code: 'AL-6061-T6',
    type: 'Precipitation-hardened Aluminium Alloy',
    density: 2700, // kg/m^3
    youngsModulus: 68.9, // GPa
    poissonsRatio: 0.33,
    yieldStrength: 276, // MPa
    ultimateStrength: 310, // MPa
    shearModulus: 26.0, // GPa
    thermalConductivity: 167, // W/m-K
    costRating: '$',
    machinability: 'Excellent (CNC milling & waterjet friendly)',
    droneSuitability: 'Benchmark standard for educational drone arms, balancing high rigidity, ductile failure modes, easy machining, and affordable raw material costs.',
    pros: [
      'Standard material library support in SolidWorks',
      'High corrosion resistance and weldability',
      'Predictable linear-elastic stress-strain behavior',
      'Affordable for student prototyping'
    ],
    cons: [
      'Heavier than carbon fiber composites (density 2.7 g/cm³)',
      'Lower fatigue endurance limit compared to 7075-T6'
    ]
  },
  {
    id: 'carbon-fiber-3k',
    name: 'Carbon Fibre (T700 3K Weave)',
    code: 'CFRP-T700-3K',
    type: 'Polymer Matrix Composite (Orthotropic)',
    density: 1550, // kg/m^3
    youngsModulus: 135.0, // GPa (longitudinal)
    poissonsRatio: 0.28,
    yieldStrength: 600, // MPa (Tensile failure threshold)
    ultimateStrength: 850, // MPa
    shearModulus: 32.0, // GPa
    thermalConductivity: 5, // W/m-K
    costRating: '$$$',
    machinability: 'Requires carbide/diamond tooling, dust extraction required',
    droneSuitability: 'Industry standard for professional racing and cinematic drones due to extreme strength-to-weight ratio and superior vibration dampening.',
    pros: [
      '42% lighter than Aluminium with 2x longitudinal stiffness',
      'Outstanding vibration damping for stable gyro readings',
      'Zero plastic yield; retains structural geometry under high dynamic G-forces'
    ],
    cons: [
      'Brittle sudden failure without prior plastic deformation warning',
      'Orthotropic (directional) behavior requires composite layup modeling',
      'Higher manufacturing & waterjet cutting costs'
    ]
  },
  {
    id: 'al-7075-t6',
    name: 'Aluminium 7075-T6 (Aircraft Grade)',
    code: 'AL-7075-T6',
    type: 'Zinc-alloyed Aerospace Aluminium',
    density: 2810, // kg/m^3
    youngsModulus: 71.7, // GPa
    poissonsRatio: 0.33,
    yieldStrength: 503, // MPa
    ultimateStrength: 572, // MPa
    shearModulus: 26.9, // GPa
    thermalConductivity: 130, // W/m-K
    costRating: '$$',
    machinability: 'Very Good; chips cleanly in high-speed CNC routing',
    droneSuitability: 'Selected for heavy-lift commercial survey drones where structural deflection must be minimal under intense payload moments.',
    pros: [
      'Almost double the yield strength of 6061-T6 (503 MPa vs 276 MPa)',
      'Superior fatigue endurance under repeated motor RPM oscillations',
      'High resistance to buckling and bending stresses'
    ],
    cons: [
      'More expensive and susceptible to stress corrosion cracking',
      'Cannot be easily welded without specialized aerospace heat treatments'
    ]
  },
  {
    id: 'pla-3dprint',
    name: 'PLA 3D Printing Filament',
    code: 'PLA-PROTOTYPE',
    type: 'Biodegradable Thermoplastic Polyester',
    density: 1240, // kg/m^3
    youngsModulus: 3.5, // GPa
    poissonsRatio: 0.36,
    yieldStrength: 50, // MPa
    ultimateStrength: 65, // MPa
    shearModulus: 1.3, // GPa
    thermalConductivity: 0.13, // W/m-K
    costRating: '$',
    machinability: 'FDM 3D printable with 0.4mm nozzle',
    droneSuitability: 'Ideal for initial dimensional fit checks and mock assembly before CNC machining aluminum.',
    pros: [
      'Extremely rapid prototyping in lab (< 2 hours)',
      'Lowest unit cost for first-year design iterations'
    ],
    cons: [
      'Low stiffness causes severe motor arm flutter at high thrust',
      'Glass transition temperature is only ~60°C (motor heat melts mount)'
    ]
  },
  {
    id: 'ti-6al-4v',
    name: 'Titanium Grade 5 (Ti-6Al-4V)',
    code: 'TI-GRADE5',
    type: 'Alpha-Beta Titanium Alloy',
    density: 4430, // kg/m^3
    youngsModulus: 113.8, // GPa
    poissonsRatio: 0.342,
    yieldStrength: 880, // MPa
    ultimateStrength: 950, // MPa
    shearModulus: 44.0, // GPa
    thermalConductivity: 6.7, // W/m-K
    costRating: '$$$$',
    machinability: 'Difficult; requires slow speeds and flood coolant',
    droneSuitability: 'Reserved for defense and aerospace extreme-environment drones where impact resilience and temperature extremes are required.',
    pros: [
      'Phenomenal yield strength (880 MPa) and impact toughness',
      'Immune to atmospheric corrosion and chemical weathering'
    ],
    cons: [
      'Heavy density (4.43 g/cm³) reduces flight endurance',
      'Extremely prohibitive material and tool machining cost'
    ]
  }
];

export const DEFAULT_MATERIAL = MATERIALS_DATABASE[0]; // Al 6061-T6
