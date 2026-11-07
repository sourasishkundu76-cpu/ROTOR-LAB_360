import { GlossaryItem } from '../types';

export const GLOSSARY_ITEMS: GlossaryItem[] = [
  {
    term: 'Von Mises Stress (Equivalent Stress)',
    category: 'FEA & Mechanics',
    symbol: 'σ_vm',
    formula: 'σ_vm = √[ 0.5 * ((σ1-σ2)² + (σ2-σ3)² + (σ3-σ1)²) ]',
    definition: 'A scalar value combining all multi-axial normal and shear stresses into an equivalent uniaxial tensile stress, used to predict yielding in ductile materials like aluminium.',
    solidworksRelevance: 'The default and most important stress criterion plotted in SolidWorks Simulation for metal alloys. When σ_vm exceeds material yield strength, permanent deformation occurs.'
  },
  {
    term: 'Factor of Safety (FOS)',
    category: 'FEA & Mechanics',
    symbol: 'FOS',
    formula: 'FOS = σ_yield / σ_max_equivalent',
    definition: 'The ratio of material capacity (yield strength) to the maximum working stress experienced by the component under worst-case operational loads.',
    solidworksRelevance: 'Evaluated via SolidWorks Factor of Safety plot. For drone structures, FOS should typically be between 1.5 and 2.5 to avoid excess weight while ensuring safety.'
  },
  {
    term: 'Cantilever Beam',
    category: 'FEA & Mechanics',
    symbol: 'M = F * L',
    formula: 'δ_max = (F * L³) / (3 * E * I)',
    definition: 'A rigid structural beam supported at only one end, with the other end projecting freely into space. The drone rotor arm acts as an inverted cantilever.',
    solidworksRelevance: 'Governs boundary condition selection in SolidWorks. The inner chassis interface is constrained as "Fixed Geometry", causing maximum bending moment at the root.'
  },
  {
    term: 'Pitch Circle Diameter (PCD)',
    category: 'SolidWorks',
    symbol: 'PCD',
    definition: 'The circular trajectory that passes through the centers of a circular pattern of holes (such as motor mounting bolt holes).',
    solidworksRelevance: 'Constructed as Construction Geometry in SolidWorks 2D sketches. Typical drone motor mounts use dual 16 mm and 19 mm PCD circles.'
  },
  {
    term: 'Fixed Support (Boundary Condition)',
    category: 'FEA & Mechanics',
    symbol: 'u = v = w = 0, θx = θy = θz = 0',
    definition: 'A boundary condition that restrains all 6 degrees of freedom (3 translational and 3 rotational) at the selected faces or vertices.',
    solidworksRelevance: 'Applied under Simulation > Fixtures > Fixed Geometry to the cylindrical faces of the arm root mounting holes and root mating surface.'
  },
  {
    term: 'Curvature-Based Mesh',
    category: 'FEA & Mechanics',
    definition: 'An adaptive FEA meshing algorithm that automatically refines element density around tight radii, fillets, and holes while placing larger elements on flat spans.',
    solidworksRelevance: 'Selected in SolidWorks Create Mesh > Curvature-based mesh. It captures high stress gradients at root fillets without bloating total node count.'
  },
  {
    term: 'Stress Concentration Factor (Kt)',
    category: 'FEA & Mechanics',
    symbol: 'Kt = σ_max / σ_nominal',
    definition: 'A dimensionless factor measuring the localized intensification of stress around abrupt geometric transitions, such as sharp corners, holes, or steps.',
    solidworksRelevance: 'Increasing fillet radius from 1 mm to 4.5 mm at the rotor arm root reduces Kt from ~2.4 down to 1.35, preventing structural fatigue cracks.'
  },
  {
    term: 'Young’s Modulus of Elasticity',
    category: 'Materials',
    symbol: 'E',
    formula: 'E = σ / ε (Stress / Strain)',
    definition: 'The measure of a solid material’s tensile stiffness or resistance to elastic deformation under load. For Aluminium 6061-T6, E = 68.9 GPa.',
    solidworksRelevance: 'Entered in the SolidWorks Material database; directly determines the global stiffness matrix [K] and resulting deflection values.'
  },
  {
    term: 'Yield Strength',
    category: 'Materials',
    symbol: 'σ_y',
    definition: 'The stress level at which a material transitions from reversible elastic deformation to permanent plastic deformation. For 6061-T6, σ_y = 276 MPa.',
    solidworksRelevance: 'Used as the baseline benchmark in SolidWorks Factor of Safety (FOS) calculations for ductile materials.'
  },
  {
    term: 'Centrifugal Force',
    category: 'Drone Dynamics',
    symbol: 'Fc',
    formula: 'Fc = m * ω² * r',
    definition: 'The apparent outward inertial force experienced by rotating masses (propellers, motor rotor) and during high-rate drone yaw maneuvers.',
    solidworksRelevance: 'Applied as a 100 N tensile force pulling outward along the longitudinal axis of the rotor arm in the static study.'
  },
  {
    term: 'Aerodynamic Thrust',
    category: 'Drone Dynamics',
    symbol: 'F_aero',
    formula: 'T = Ct * ρ * n² * D⁴',
    definition: 'The upward aerodynamic reaction force produced by spinning propeller blades pushing air downward, providing multirotor lift.',
    solidworksRelevance: 'Applied as a 50 N upward (+Y) force on the 4 motor mounting holes in the SolidWorks static simulation.'
  },
  {
    term: 'Blade Pass Frequency (BPF)',
    category: 'Drone Dynamics',
    symbol: 'BPF',
    formula: 'BPF = (Rotor RPM / 60) * Number of Blades',
    definition: 'The rate at which propeller blades pass a stationary point on the drone arm, producing cyclic harmonic pressure pulses.',
    solidworksRelevance: 'Compared against the arm’s natural frequencies in SolidWorks Frequency Study to guarantee avoidance of dynamic resonance.'
  },
  {
    term: 'Natural Frequency & Resonant Modes',
    category: 'FEA & Mechanics',
    symbol: 'fn',
    formula: 'fn = (1 / 2π) * √(k / m)',
    definition: 'The discrete frequencies at which a structure naturally oscillates when disturbed, characterized by unique modal deformation shapes.',
    solidworksRelevance: 'Calculated using SolidWorks Simulation Frequency Study to prevent motor vibrations from causing catastrophic structural resonance.'
  },
  {
    term: 'Mate Operations (SolidWorks Assembly)',
    category: 'SolidWorks',
    definition: 'Geometric relationships that constrain the degrees of freedom between two or more components in a 3D assembly (e.g. Coincident, Concentric, Parallel).',
    solidworksRelevance: 'Used to mount the 4 rotor arms to the central chassis bottom plate and attach brushless motors to the distal pads.'
  },
  {
    term: 'Hole Wizard',
    category: 'SolidWorks',
    definition: 'A specialized SolidWorks feature tool for creating standard threaded, clearance, counterbored, or countersunk fastener holes based on international standards (ISO, ANSI).',
    solidworksRelevance: 'Used to cut accurate M3 clearance holes (3.4 mm) for motor mounting bolts and chassis screws with associated cosmetic thread metadata.'
  }
];

export const FORMULA_LIBRARY = [
  {
    title: 'Aerodynamic Net Cantilever Force',
    formula: 'F_net = F_aero - (m_motor * g) - (0.5 * m_arm * g)',
    explanation: 'Upward aerodynamic thrust opposed by motor weight and distributed self-weight of the arm.',
    variables: [
      { symbol: 'F_aero', name: 'Rotor aerodynamic thrust (N)', defaultVal: '50.0 N' },
      { symbol: 'm_motor', name: 'Motor + prop mass (kg)', defaultVal: '0.50 kg' },
      { symbol: 'g', name: 'Gravitational acceleration (m/s²)', defaultVal: '9.81 m/s²' },
      { symbol: 'F_net', name: 'Net vertical force at tip', defaultVal: '45.095 N' }
    ]
  },
  {
    title: 'Root Maximum Bending Moment',
    formula: 'M_max = F_net * L',
    explanation: 'Maximum moment generated at the fixed cantilever clamp face.',
    variables: [
      { symbol: 'F_net', name: 'Net vertical shear force (N)', defaultVal: '45.095 N' },
      { symbol: 'L', name: 'Arm cantilever span (m)', defaultVal: '0.20 m' },
      { symbol: 'M_max', name: 'Peak Bending Moment', defaultVal: '9.019 N·m' }
    ]
  },
  {
    title: 'Second Moment of Area (Rectangular Cross Section)',
    formula: 'I_z = (b * h³) / 12',
    explanation: 'Geometric resistance to vertical bending about the neutral axis.',
    variables: [
      { symbol: 'b', name: 'Cross-section width (mm)', defaultVal: '20.0 mm' },
      { symbol: 'h', name: 'Cross-section thickness (mm)', defaultVal: '5.0 mm' },
      { symbol: 'I_z', name: 'Second Moment of Area', defaultVal: '208.33 mm⁴' }
    ]
  },
  {
    title: 'Elastic Section Modulus',
    formula: 'Z = (b * h²) / 6 = I / (h/2)',
    explanation: 'Section property defining peak bending stress on outer surface fibers.',
    variables: [
      { symbol: 'b', name: 'Width (mm)', defaultVal: '20.0 mm' },
      { symbol: 'h', name: 'Thickness (mm)', defaultVal: '5.0 mm' },
      { symbol: 'Z', name: 'Section Modulus', defaultVal: '83.33 mm³' }
    ]
  },
  {
    title: 'Euler-Bernoulli Maximum Cantilever Deflection',
    formula: 'δ_max = (F_net * L³) / (3 * E * I)',
    explanation: 'Theoretical tip deflection of an ideal end-loaded cantilever beam.',
    variables: [
      { symbol: 'L', name: 'Beam span (mm)', defaultVal: '200 mm' },
      { symbol: 'E', name: 'Young’s Modulus (MPa)', defaultVal: '68,900 MPa' },
      { symbol: 'I', name: 'Second Moment of Area (mm⁴)', defaultVal: '208.33 mm⁴' },
      { symbol: 'δ_max', name: 'Theoretical Tip Deflection', defaultVal: '0.838 mm' }
    ]
  },
  {
    title: 'Factor of Safety (Yield Criterion)',
    formula: 'FOS = σ_yield / σ_von_mises',
    explanation: 'Structural margin against permanent plastic deformation.',
    variables: [
      { symbol: 'σ_yield', name: 'Material yield strength (MPa)', defaultVal: '276.0 MPa' },
      { symbol: 'σ_von_mises', name: 'Peak working stress (MPa)', defaultVal: '67.6 MPa' },
      { symbol: 'FOS', name: 'Factor of Safety', defaultVal: '4.08' }
    ]
  }
];

export const SOLIDWORKS_SHORTCUTS = [
  { key: 'S', action: 'Shortcut Bar', context: 'Opens context-sensitive toolbar containing sketch or feature tools.' },
  { key: 'D', action: 'Smart Dimension', context: 'Activates instant dimensioning tool for lengths, angles, and radii.' },
  { key: 'Spacebar', action: 'View Orientation Selector', context: 'Opens the 3D orientation cube and normal-to view options.' },
  { key: 'Ctrl + 8', action: 'Normal To', context: 'Flips the camera perpendicular to the selected plane or flat face.' },
  { key: 'Ctrl + 7', action: 'Isometric View', context: 'Sets camera to standard isometric 3D perspective.' },
  { key: 'F', action: 'Zoom to Fit', context: 'Fits all visible model geometry neatly within the graphics viewport.' },
  { key: 'Ctrl + Z', action: 'Undo', context: 'Reverts the previous CAD action or sketch modification.' },
  { key: 'Ctrl + B', action: 'Rebuild Model', context: 'Forces re-calculation and updating of all parametric features.' }
];

export const TROUBLESHOOTING_GUIDE = [
  {
    problem: 'SolidWorks Simulation Tab is Missing from the Top Ribbon',
    cause: 'The simulation add-in is not loaded into the active session.',
    solution: 'Click Tools > Add-Ins. In the dialog, check both the "Active Add-ins" and "Start Up" checkboxes next to "SolidWorks Simulation", then click OK.'
  },
  {
    problem: 'Solver Error: "Model is Unstable or Displacements are Infinite"',
    cause: 'The rotor arm has unconstrained rigid body degrees of freedom in 3D space.',
    solution: 'Check your Fixtures. Ensure Fixed Geometry is applied to both the cylindrical bolt holes AND the mating root end face. Verify no loose unconstrained components exist.'
  },
  {
    problem: 'Sketch Entities Won’t Turn Black (Stuck in Under-Defined Blue)',
    cause: 'The sketch lacks either dimensional constraints or geometric relations to the coordinate origin.',
    solution: 'Add a Coincident relation between one corner/centerline of the sketch and the Red Origin symbol. Then use Smart Dimension to constrain width and height.'
  },
  {
    problem: 'Extruded Cut Creates Infinite Void or Error in Rebuild',
    cause: 'Cut direction is inverted or contour selection includes overlapping intersecting sketch curves.',
    solution: 'In the Extrude Cut PropertyManager, verify the direction arrow points INTO the material and check "Selected Contours" to pick the clean closed region.'
  },
  {
    problem: 'FEA Stress Numbers Are Over 1,000 MPa (Red Singularities at Bolt Holes)',
    cause: 'Point boundary conditions or sharp knife-edges cause mathematical stress singularities.',
    solution: 'Apply 3D blend fillets (R3 mm or larger) to all re-entrant corners, and apply loads across cylindrical faces rather than sharp vertex points.'
  }
];
