export type PhaseId = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

export interface WorkflowPhase {
  id: PhaseId;
  title: string;
  subtitle: string;
  category: 'Fundamentals' | 'CAD Modelling' | 'Material & Loads' | 'FEA Simulation' | 'Optimisation & Delivery';
  estimatedMinutes: number;
  solidworksTool?: string;
  menuPath?: string;
  objective: string;
  keyConcepts: string[];
  instructions: {
    step: number;
    title: string;
    description: string;
    tip?: string;
  }[];
  expectedOutcome: string;
  commonMistakes: {
    mistake: string;
    consequence: string;
    fix: string;
  }[];
  checklist: string[];
  diagramType?: string;
}

export interface MaterialProperties {
  id: string;
  name: string;
  code: string;
  type: string;
  density: number; // kg/m^3
  youngsModulus: number; // GPa
  poissonsRatio: number;
  yieldStrength: number; // MPa
  ultimateStrength: number; // MPa
  shearModulus: number; // GPa
  thermalConductivity: number; // W/m-K
  costRating: '$' | '$$' | '$$$' | '$$$$';
  machinability: string;
  droneSuitability: string;
  pros: string[];
  cons: string[];
}

export interface LoadInputs {
  motorMass: number; // kg (default 0.5)
  gravity: number; // m/s^2 (default 9.81)
  centrifugalForce: number; // N (default 100)
  aerodynamicForce: number; // N (default 50)
  armLength: number; // mm (default 200)
  armWidth: number; // mm (default 20)
  armThickness: number; // mm (default 5)
  materialId: string;
  actualPeakStress?: number; // MPa (user entered from SolidWorks)
}

export interface CalculationResults {
  gravitationalForce: number; // N
  armVolume: number; // mm^3
  armMass: number; // grams
  armSelfWeight: number; // N
  netVerticalForce: number; // N (aero - motor gravity - 0.5 * arm gravity)
  bendingMoment: number; // N*m
  secondMomentArea: number; // mm^4 (I = b*t^3 / 12)
  sectionModulus: number; // mm^3 (Z = b*t^2 / 6)
  bendingStress: number; // MPa
  axialTensionStress: number; // MPa
  combinedVonMisesStress: number; // MPa
  analyticalDeflection: number; // mm
  theoreticalFOS: number;
  feaFOS?: number;
  safetyStatus: 'Critical' | 'Warning' | 'Optimal' | 'Over-engineered';
}

export interface ReportData {
  studentName: string;
  rollNumber: string;
  stream: string;
  section: string;
  semester: string;
  academicYear: string;
  institution: string;
  courseCode: string;
  instructorName: string;
  submissionDate: string;
  
  // Design Specs
  armLength: number;
  armWidth: number;
  armThickness: number;
  selectedMaterial: string;
  
  // Simulation Results
  meshType: string;
  elementSize: number;
  nodeCount: number;
  elementCount: number;
  maxStressMPa: number;
  yieldStressMPa: number;
  maxDisplacementMm: number;
  factorOfSafety: number;
  mode1FreqHz: number;
  mode2FreqHz: number;
  
  // Optimisation
  originalMassGrams: number;
  optimisedMassGrams: number;
  massReductionPct: number;
  optimisedFOS: number;
  
  // Notes & Conclusions
  studentRemarks: string;
  uploadedScreenshots: {
    id: string;
    caption: string;
    dataUrl: string;
  }[];
}

export interface GlossaryItem {
  term: string;
  category: 'SolidWorks' | 'FEA & Mechanics' | 'Drone Dynamics' | 'Materials';
  definition: string;
  solidworksRelevance: string;
  symbol?: string;
  formula?: string;
}

export interface ProjectNote {
  id: string;
  phaseId?: PhaseId;
  title: string;
  content: string;
  timestamp: string;
  tags: string[];
}
