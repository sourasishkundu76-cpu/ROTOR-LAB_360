import { WorkflowPhase } from '../types';

export const WORKFLOW_PHASES: WorkflowPhase[] = [
  {
    id: 1,
    title: 'Understanding Drone Architecture',
    subtitle: 'Quadcopter Anatomy, Structural Load Paths & Rotor Arm Role',
    category: 'Fundamentals',
    estimatedMinutes: 20,
    objective: 'Master the fundamental multirotor structural layout, identify the primary aerodynamic and inertial load paths transferred through the rotor arm, and understand how motor thrust translates to lift and bending moment.',
    keyConcepts: [
      'X-Configuration Quadcopter vs Plus-Configuration',
      'Central Fuselage Chassis (Top/Bottom Plates)',
      'Brushless DC (BLDC) Motor Mounts & Pitch Circle Diameter (PCD)',
      'Cantilever Beam Mechanics in Drone Propulsion',
      'Load Transfer from Propeller Blade to Drone Center of Gravity (CG)'
    ],
    instructions: [
      {
        step: 1,
        title: 'Analyse Central Body & Electronics Bay',
        description: 'Examine the central core chassis consisting of upper and lower composite/aluminium plates that sandwich the Flight Controller (FC), Electronic Speed Controllers (ESCs), and LiPo battery.',
        tip: 'The central frame acts as the rigid ground reference for the cantilever rotor arms.'
      },
      {
        step: 2,
        title: 'Understand the Rotor Arm Cantilever Function',
        description: 'Each of the 4 rotor arms projects radially outward from the central hub. It acts as an open cantilever beam fixed at the root and subjected to dynamic upward thrust and centrifugal loads at the tip.',
        tip: 'Stiffness is critical: excessive arm flex induces sensor gyro noise and desynchronizes motor control PID loops.'
      },
      {
        step: 3,
        title: 'Inspect Motor Holder & PCD Mounting Pattern',
        description: 'Review the motor interface geometry at the distal tip. Typical 22xx to 28xx class brushless motors utilize a 4-hole cross pattern on 16 mm or 19 mm Pitch Circle Diameters (PCD).',
        tip: 'Always provide a center shaft clearance recess (typically 5mm diameter) to prevent motor circlip binding.'
      },
      {
        step: 4,
        title: 'Map Aerodynamic Thrust vs Angular Torque',
        description: 'Opposite motors rotate in counter-clockwise (CCW) and clockwise (CW) pairs to neutralize net yaw torque. The arm must resist both vertical thrust bending and in-plane motor reaction torque.',
        tip: 'Vertical bending usually dominates structural stress by an order of magnitude over yaw torque.'
      }
    ],
    expectedOutcome: 'Complete structural clarity on how the drone rotor arm operates as a cantilever beam resisting aerodynamic lift, centrifugal inertia, and motor weight.',
    commonMistakes: [
      {
        mistake: 'Treating the rotor arm as a simply supported beam instead of a cantilever',
        consequence: 'Yields inaccurate maximum bending moment calculations (WL/8 instead of WL).',
        fix: 'Always fix the inner chassis end as a Cantilever Fixed Support and apply loads at the motor tip.'
      },
      {
        mistake: 'Forgetting clearance for the bottom motor shaft snap ring',
        consequence: 'Motor rotor locks up when bolted directly flush to a flat plate.',
        fix: 'Include a center counterbore or through-hole of at least 5 mm diameter between motor mounting screw holes.'
      }
    ],
    checklist: [
      'Identified all 5 primary quadcopter subsystems (Chassis, 4 Arms, Motors, Propellers, Flight Electronics)',
      'Understood cantilever load transfer from prop hub to central chassis',
      'Recognized why arm stiffness directly impacts PID flight controller stability'
    ],
    diagramType: 'quadcopter'
  },
  {
    id: 2,
    title: 'Design Specifications & Engineering Drawing',
    subtitle: 'Dimensional Constraints, Tolerances & Datum Planes',
    category: 'Fundamentals',
    estimatedMinutes: 25,
    objective: 'Establish rigorous parametric dimensional constraints for the drone rotor arm in accordance with IEM ESCME192 course requirements and prepare orthographic projection references.',
    keyConcepts: [
      'Standard Dimensions: Length = 200 mm, Width = 20 mm, Thickness = 5 mm',
      'Aspect Ratio and Slenderness in Cantilever Design',
      'Primary Datums: Front, Top, and Right Reference Planes',
      'Bilateral Engineering Tolerances (ISO 2768-m)',
      'Metric M3 and M4 Clearance Fastener Standards'
    ],
    instructions: [
      {
        step: 1,
        title: 'Verify Project Assignment Specifications',
        description: 'Confirm baseline dimensions: Arm overall length L = 200.0 mm; Arm body width W = 20.0 mm; Solid plate thickness T = 5.0 mm.',
        tip: 'Keeping width-to-thickness ratio at 4:1 (20 mm : 5 mm) provides high lateral stability against propeller yaw torque.'
      },
      {
        step: 2,
        title: 'Define Root Central Interface Geometry',
        description: 'The root mounting tab spans 40 mm with dual M3 mounting holes spaced 25 mm apart along the centerline, 10 mm from the base edge.',
        tip: 'Use standard drill sizes: 3.2 mm or 3.4 mm diameter for loose/normal M3 screw clearance.'
      },
      {
        step: 3,
        title: 'Define Distal Motor Mounting Pad Geometry',
        description: 'Motor pad at the distal end has an expanded cylindrical boss with radius R = 16 mm (Diameter 32 mm), with a 4-hole cross pattern (PCD 16 mm / 19 mm) and center 6 mm shaft hole.',
        tip: 'Transition from the 20 mm arm beam to the 32 mm pad using smooth tangential blend arcs.'
      },
      {
        step: 4,
        title: 'Establish Geometric Dimensioning & Tolerancing (GD&T)',
        description: 'Specify flatness tolerance of 0.1 mm on top/bottom faces to ensure perfect alignment with motor stator and central chassis carbon plates.',
        tip: 'Uneven motor tilts will introduce unwanted roll-pitch coupling during flight.'
      }
    ],
    expectedOutcome: 'Fully constrained 2D engineering drawing layout ready for 3D sketching with zero under-defined dimensions.',
    commonMistakes: [
      {
        mistake: 'Using nominal 3.0 mm hole diameter for M3 machine screws',
        consequence: 'Screws will bind or cross-thread because manufacturing friction leaves zero clearance.',
        fix: 'Use standard M3 clearance hole size of 3.2 mm (Close fit) or 3.4 mm (Normal fit).'
      },
      {
        mistake: 'Neglecting edge margins for mounting holes',
        consequence: 'Tear-out shear failure along the edge during hard landings.',
        fix: 'Maintain hole center-to-edge distance of at least 1.5 to 2 times the bolt diameter.'
      }
    ],
    checklist: [
      'Verified 200 mm length, 20 mm width, 5 mm thickness baseline constraints',
      'Specified 4x M3 motor mounting holes on 16 mm & 19 mm dual PCD',
      'Specified 2x M3 root mounting holes with 25 mm center-to-center pitch',
      'Checked edge distances for compliance with structural tear-out standards'
    ],
    diagramType: 'blueprint'
  },
  {
    id: 3,
    title: '3D Modelling in SolidWorks',
    subtitle: 'Parametric Feature Tree, Sketches, Extrusions & Fillets',
    category: 'CAD Modelling',
    estimatedMinutes: 45,
    solidworksTool: 'Extruded Boss/Base, Hole Wizard, Fillet/Chamfer',
    menuPath: 'Insert > Boss/Base > Extrude | Insert > Features > Hole > Wizard',
    objective: 'Build a fully constrained, parametric 3D solid model of the drone rotor arm in SolidWorks from scratch, following industry best practices for sketch relations and feature tree hierarchy.',
    keyConcepts: [
      'Fully Defined Sketches (Black geometry lines, zero blue under-defined entities)',
      'Symmetric Origin Placement on Top Plane',
      'Parametric Extrusion (Mid-Plane vs Blind)',
      'Hole Wizard for ISO Metric Fasteners',
      'Order of Operations: Primary Prismatic Solid -> Secondary Holes -> Tertiary Fillets'
    ],
    instructions: [
      {
        step: 1,
        title: 'Initialize New Part & Set Units',
        description: 'Launch SolidWorks -> File > New > Part -> Confirm. In bottom right status bar, set Document Units to "MMGS (millimeter, gram, second)".',
        tip: 'Never model in inches for this assignment! Changing units later can scale geometry unintentionally.'
      },
      {
        step: 2,
        title: 'Base Arm Sketch on Top Plane',
        description: 'Select Top Plane -> Click Sketch -> Draw Center Rectangle starting at Origin. Use Smart Dimension (D): Length = 200 mm, Width = 20 mm. Verify status reads "Fully Defined".',
        tip: 'Starting at the origin makes applying assembly mates and symmetry planes effortless.'
      },
      {
        step: 3,
        title: 'Extrude Boss/Base',
        description: 'Features toolbar -> Extruded Boss/Base -> Condition: Blind -> Depth: 5.00 mm -> Direction: Upward -> Click Green Checkmark (OK).',
        tip: 'Rename this feature to "Base_Arm_Extrude" in the FeatureManager Design Tree for clean documentation.'
      },
      {
        step: 4,
        title: 'Motor Mounting Pad Extrusion',
        description: 'Select the top face of the extruded arm at the distal end -> Click Sketch -> Draw Circle centered on arm centerline, radius 16 mm (diameter 32 mm) positioned at x = 184 mm from origin. Extrude 0 mm (or merge with base) or blend using tangent arcs.',
        tip: 'Ensure "Merge result" is checked so the arm remains a single contiguous solid body.'
      },
      {
        step: 5,
        title: 'Hole Wizard for Motor & Chassis Mounts',
        description: 'Features > Hole Wizard -> Type: Hole (Standard: ISO) -> Size: M3 Clearance (Normal 3.4 mm) -> Positions tab: Click face and place 4 points on 16 mm PCD circle, plus 2 points at root chassis tab.',
        tip: 'Hole Wizard holes carry internal cosmetic thread and fastener metadata required for automated drawing callouts.'
      },
      {
        step: 6,
        title: 'Apply Stress-Relieving Fillets and Chamfers',
        description: 'Features > Fillet -> Type: Constant Size -> Radius: 3.0 mm on root transition corners -> Click OK. Features > Chamfer -> Angle-Distance: 0.5 mm x 45° on top perimeter edges for deburring.',
        tip: 'Fillets eliminate sharp 90° interior re-entrant corners, reducing theoretical stress concentration factors from over 3.0 down to ~1.4.'
      },
      {
        step: 7,
        title: 'Save Part with Standardised Nomenclature',
        description: 'File > Save As -> Name: "Rotor_Arm_6061T6_RevA.SLDPRT". Save in a dedicated project directory alongside the upcoming assembly file.',
        tip: 'Do not use spaces or special characters in CAD filenames to prevent file path reference breaks.'
      }
    ],
    expectedOutcome: 'A clean, 100% fully defined SolidWorks 3D part (.SLDPRT) with zero rebuild errors and an organized feature tree.',
    commonMistakes: [
      {
        mistake: 'Leaving sketch geometry blue (Under-defined)',
        consequence: 'Dimensions can inadvertently shift when other features are edited or referenced.',
        fix: 'Add Geometric Relations (Collinear, Symmetric, Horizontal, Concentric) until sketch turns black.'
      },
      {
        mistake: 'Adding fillets inside the 2D sketch rather than as a 3D feature',
        consequence: 'Makes adjusting fillet radii tedious and clutters the base sketch with complex tangent arcs.',
        fix: 'Keep sketches simple and rectangular; always apply fillets as separate 3D features.'
      }
    ],
    checklist: [
      'Document units verified as MMGS (mm, g, s)',
      'Base sketch centered on origin and fully defined (all black lines)',
      'Extrusion depth accurately set to 5.0 mm',
      'Motor mount pad created with 4x M3 clearance holes on 16 mm PCD',
      'Root mounting holes accurately positioned with 3.4 mm diameter',
      'Transition fillets (R3 mm) and edge chamfers (0.5 mm) applied',
      'Part saved as Rotor_Arm_6061T6_RevA.SLDPRT without rebuild errors'
    ],
    diagramType: 'blueprint'
  },
  {
    id: 4,
    title: 'Drone Quadcopter Assembly & Mates',
    subtitle: 'Top/Bottom Chassis Plates, 4 Arms, Motors & Exploded View',
    category: 'CAD Modelling',
    estimatedMinutes: 35,
    solidworksTool: 'Insert Components, Standard Mates, Exploded View',
    menuPath: 'Insert > Component > Existing Part | Assembly > Mate | Assembly > Exploded View',
    objective: 'Assemble the full quadcopter frame in SolidWorks, establish standard concentric and coincident mates, configure circular component pattern for the 4 arms at 90°, and animate an exploded assembly view.',
    keyConcepts: [
      'Grounding the Primary Component (Fixed Base)',
      'Standard Mates: Coincident, Concentric, Parallel, Distance',
      'Circular Component Pattern (4 Instances at 90° increments)',
      'Exploded View Steps and Explode Lines (Route Lines)',
      'Interference Detection and Clearance Verification'
    ],
    instructions: [
      {
        step: 1,
        title: 'Create New Assembly & Insert Central Bottom Plate',
        description: 'File > New > Assembly. Click Browse -> Select "Bottom_Plate.SLDPRT" -> Click Origin icon to lock it fixed (f) in 3D space aligned with assembly coordinate axes.',
        tip: 'The first component placed into an assembly is locked by default. Always verify it has the (f) prefix.'
      },
      {
        step: 2,
        title: 'Insert Rotor Arm & Apply Standard Mates',
        description: 'Assembly > Insert Components -> Select "Rotor_Arm_6061T6.SLDPRT". Click Mate: Mate 1 = Coincident between arm bottom face and chassis top face. Mate 2 = Concentric between arm root mounting hole and chassis hole.',
        tip: 'Use a second concentric mate or parallel mate to lock the final rotational degree of freedom.'
      },
      {
        step: 3,
        title: 'Circular Component Pattern for Quadcopter Arms',
        description: 'Assembly toolbar > Linear Component Pattern dropdown > Circular Component Pattern -> Direction: Central axis of bottom plate -> Angle: 360° -> Instances: 4 -> Equal spacing -> Components to Pattern: Rotor Arm.',
        tip: 'Patterning ensures that any dimensional update in Arm 1 automatically propagates to all 4 arms.'
      },
      {
        step: 4,
        title: 'Insert Top Plate, Standoffs, and Brushless Motors',
        description: 'Insert 4x 30 mm brass or aluminium hexagonal standoffs, the carbon top battery plate, and 4x BLDC 2212 920KV motors onto the motor pads using concentric and coincident mates.',
        tip: 'Double-check screw hole concentricity before tightening virtual fasteners.'
      },
      {
        step: 5,
        title: 'Run Interference Detection',
        description: 'Evaluate toolbar > Interference Detection -> Click Calculate -> Ensure result is "No Interferences".',
        tip: 'Fix any overlapping geometry now before attempting simulation.'
      },
      {
        step: 6,
        title: 'Create Exploded View for Assignment Report',
        description: 'Assembly toolbar > Exploded View -> Select Top Plate, drag Z-handle upward +80 mm -> Select 4 Motors, drag upward +120 mm -> Select 4 Arms, drag radially outward +60 mm -> Click OK.',
        tip: 'Right-click the Exploded View in the ConfigurationManager and click "Animate collapse/explode" to record an animation.'
      }
    ],
    expectedOutcome: 'A complete, rigid quadcopter assembly (.SLDASM) with 4 patterned arms, zero component interference, and an exploded view ready for technical reporting.',
    commonMistakes: [
      {
        mistake: 'Not fixing the base chassis part at the assembly origin',
        consequence: 'The entire drone assembly floats freely in 3D space, making standard plane views tilted.',
        fix: 'Right-click the main bottom chassis part and choose "Fix".'
      },
      {
        mistake: 'Over-constraining parts with conflicting mates',
        consequence: 'SolidWorks flags mate errors in red/yellow and parts cannot move or rebuild.',
        fix: 'Use View Mates to identify duplicate coincident or distance constraints and delete redundant mates.'
      }
    ],
    checklist: [
      'Central bottom plate properly fixed at assembly origin',
      'First rotor arm mated with coincident face and concentric bolt holes',
      '4 arms patterned symmetrically at 90° intervals using Circular Pattern',
      'Interference Detection run with zero reported collisions',
      'Exploded view created showing clear spatial hierarchy of parts'
    ],
    diagramType: 'exploded'
  },
  {
    id: 5,
    title: 'Material Selection & Properties',
    subtitle: 'Aluminium 6061-T6 vs Carbon Fibre vs Engineering Composites',
    category: 'Material & Loads',
    estimatedMinutes: 30,
    solidworksTool: 'Edit Material, Custom Material Database',
    menuPath: 'Right click "Material <not specified>" in FeatureManager > Edit Material',
    objective: 'Select, configure, and assign the structural material (Aluminium 6061-T6) in SolidWorks, understand linear isotropic elasticity, and compare physical properties against carbon fiber alternatives.',
    keyConcepts: [
      'Isotropic vs Orthotropic Constitutive Material Models',
      'Young’s Modulus of Elasticity (E = 68.9 GPa)',
      'Mass Density (ρ = 2700 kg/m³ or 2.7 g/cm³)',
      'Poisson’s Ratio (ν = 0.33) and Shear Modulus (G = 26.0 GPa)',
      'Yield Strength (σ_y = 276 MPa) vs Ultimate Tensile Strength (310 MPa)'
    ],
    instructions: [
      {
        step: 1,
        title: 'Open Rotor Arm Part & Launch Material Editor',
        description: 'In FeatureManager Design Tree, locate "Material <not specified>". Right-click and choose "Edit Material".',
        tip: 'Material assignment in SolidWorks automatically populates physical mass, center of mass, and FEA stiffness matrices.'
      },
      {
        step: 2,
        title: 'Select Aluminium 6061-T6 from Standard Library',
        description: 'Expand "SolidWorks Materials" folder -> "Aluminium Alloys" -> Select "6061-T6 (SS)" or "6061-T6".',
        tip: 'The (SS) denotes values from the standard Mil-Hdbk-5J aerospace database.'
      },
      {
        step: 3,
        title: 'Inspect Mechanical Properties in Material Tab',
        description: 'Verify the units are set to SI (N/m^2) or Metric (MPa): Elastic Modulus = 6.89e+10 N/m² (68.9 GPa), Yield Strength = 2.757e+8 N/m² (276 MPa), Mass Density = 2700 kg/m³.',
        tip: 'These properties are used directly by the FEA solver to calculate the [K] global stiffness matrix.'
      },
      {
        step: 4,
        title: 'Apply & Evaluate Mass Properties',
        description: 'Click "Apply" -> Click "Close". Switch to Evaluate tab -> Click "Mass Properties". Record the calculated mass of the single arm.',
        tip: 'With standard dimensions (200x20x5 mm minus holes), expected mass is ~51.5 to 54.0 grams.'
      },
      {
        step: 5,
        title: 'Compare Against Carbon Fibre T700 Composite',
        description: 'Review performance trade-off: Carbon fiber offers density of 1550 kg/m³ (42% lighter) and Young’s modulus of 135 GPa (almost 2x stiffer), but is anisotropic and costlier to manufacture.',
        tip: 'Aluminium 6061-T6 remains the best choice for student lab fabrication due to ductility and predictable failure.'
      }
    ],
    expectedOutcome: 'Aluminium 6061-T6 properly applied in SolidWorks with accurate density and yield strength reflected in Mass Properties.',
    commonMistakes: [
      {
        mistake: 'Selecting generic "Aluminium" without specifying 6061-T6 temper',
        consequence: 'Generic annealed aluminium has a yield strength of only ~95 MPa vs 276 MPa for T6, leading to false simulation failure warnings.',
        fix: 'Always select the exact tempered alloy "6061-T6".'
      },
      {
        mistake: 'Confusing Ultimate Tensile Strength with Yield Strength',
        consequence: 'Using ultimate strength sets an unsafe failure criterion where permanent plastic deformation occurs without warning.',
        fix: 'For ductile metals like aluminium, always base Factor of Safety (FOS) on Yield Strength (σ_y).'
      }
    ],
    checklist: [
      'Assigned 6061-T6 Aluminium from the SolidWorks standard materials library',
      'Verified Elastic Modulus E = 68.9 GPa and Poisson’s Ratio ν = 0.33',
      'Confirmed Yield Strength σ_y = 276 MPa in material properties pane',
      'Checked Mass Properties and verified arm baseline mass is ~52-54 grams'
    ],
    diagramType: 'blueprint'
  },
  {
    id: 6,
    title: 'Load Calculations & Free-Body Diagram (FBD)',
    subtitle: 'Gravitational, Aerodynamic Thrust & Centrifugal Force Formulations',
    category: 'Material & Loads',
    estimatedMinutes: 40,
    objective: 'Derive and calculate the exact magnitude and vectors of all 3 primary mechanical loads acting on the drone arm: Centrifugal Force (100 N), Aerodynamic Thrust (50 N), and Motor Gravitational Weight (4.905 N), plus arm self-weight.',
    keyConcepts: [
      'Cantilever Equilibrium: ΣFx = 0, ΣFy = 0, ΣMz = 0',
      'Centrifugal Force: Fc = m * ω² * r (Tensile outward along arm axis)',
      'Aerodynamic Thrust: Faero = 50 N (Upward vertical lift along Y-axis)',
      'Gravitational Weight: Fg = m * g = 0.5 kg * 9.81 m/s² = 4.905 N (Downward along -Y)',
      'Combined Net Vertical Shear Force & Root Bending Moment'
    ],
    instructions: [
      {
        step: 1,
        title: 'Calculate Motor + Propeller Gravitational Force',
        description: 'Given combined motor and propeller mass m = 0.50 kg: Fg = m * g = 0.50 kg * 9.81 m/s² = 4.905 N acting vertically downwards (-Y direction) at the motor mount center.',
        tip: 'Self-weight of the arm (~0.053 kg * 9.81 = 0.52 N) acts as a distributed load along the span.'
      },
      {
        step: 2,
        title: 'Define Aerodynamic Thrust Force',
        description: 'Under aggressive climb or maneuver, each rotor produces Faero = 50.0 N of upward vertical thrust (+Y direction) applied uniformly across the 4 motor mounting screw holes.',
        tip: 'Net vertical force at tip = 50.0 N - 4.905 N = 45.095 N upward.'
      },
      {
        step: 3,
        title: 'Determine Centrifugal Force from High-Speed Maneuvers',
        description: 'Centrifugal inertia during yaw turns and propeller blade rotation imposes an outward tensile force Fc = 100.0 N along the longitudinal arm axis (+X direction).',
        tip: 'Tensile axial force acts in pure tension, which helps stiffen the arm slightly via geometric stress-stiffening.'
      },
      {
        step: 4,
        title: 'Calculate Theoretical Bending Moment at Root',
        description: 'Maximum bending moment occurs at the fixed root clamp: M_max = F_net * L = 45.095 N * 0.20 m = 9.019 N·m (or 9,019 N·mm).',
        tip: 'This bending moment creates maximum tensile stress on the top surface and compressive stress on the bottom surface.'
      },
      {
        step: 5,
        title: 'Calculate Analytical Bending Stress (Euler-Bernoulli Beam Theory)',
        description: 'Second moment of area: I = b * h³ / 12 = 20 * (5)³ / 12 = 208.33 mm⁴. Distance to outer fiber c = h / 2 = 2.5 mm. Stress σ_b = M * c / I = 9019 * 2.5 / 208.33 = 108.2 MPa (for pure rectangular section).',
        tip: 'With axial stress σ_a = 100 N / (20 * 5 mm²) = 1.0 MPa, combined theoretical stress is ~109.2 MPa, well below 276 MPa yield!'
      }
    ],
    expectedOutcome: 'Clear mathematical derivations and Free-Body Diagram with all 3 load vectors quantified and validated before FEA.',
    commonMistakes: [
      {
        mistake: 'Applying aerodynamic thrust downwards instead of upwards',
        consequence: 'Adds to gravity rather than opposing it, inverting the sign of the bending moment and stress distribution.',
        fix: 'Remember: Drone propellers generate upward lift (+Y) to overcome gravity.'
      },
      {
        mistake: 'Omitting the moment arm distance in bending calculations',
        consequence: 'Confusing shear force with bending moment leads to calculations that are orders of magnitude too low.',
        fix: 'Always multiply force by perpendicular distance to the fixed support (M = F * L).'
      }
    ],
    checklist: [
      'Calculated Gravitational Force Fg = 4.905 N acting downward (-Y)',
      'Defined Aerodynamic Thrust Faero = 50.0 N acting upward (+Y)',
      'Defined Centrifugal Force Fc = 100.0 N acting along arm axis (+X)',
      'Calculated net tip vertical force Fnet = 45.095 N',
      'Calculated root bending moment M = 9.019 N·m',
      'Verified hand calculations before opening SolidWorks Simulation'
    ],
    diagramType: 'fbd'
  },
  {
    id: 7,
    title: 'SolidWorks Simulation Setup & Boundary Conditions',
    subtitle: 'Activating Add-In, Static Study, Fixtures & Multi-Load Application',
    category: 'FEA Simulation',
    estimatedMinutes: 35,
    solidworksTool: 'SolidWorks Simulation Add-In, Fixtures, External Loads',
    menuPath: 'Tools > Add-Ins > SolidWorks Simulation | Simulation > Study > Static',
    objective: 'Activate the SolidWorks Simulation add-in, create a linear static stress study, apply realistic fixed geometry fixtures at the root mounting holes, and accurately apply the 3 mechanical loads.',
    keyConcepts: [
      'Linear Static FEA Assumptions (Small deformations, linear elastic material)',
      'Boundary Conditions: Fixed Geometry vs Roller/Slider',
      'Rigid Clamping vs Bolted Preload Idealization',
      'Distributing Loads over Cylindrical Hole Faces vs Point Loads',
      'Gravity Load Vector Direction (-Y axis)'
    ],
    instructions: [
      {
        step: 1,
        title: 'Activate SolidWorks Simulation Add-In',
        description: 'Tools menu > Add-Ins -> Check both boxes for "SolidWorks Simulation" (Active and Start Up) -> Click OK. A new "Simulation" tab appears on the CommandManager.',
        tip: 'If Simulation does not appear, ensure your SolidWorks license is Premium or has the Simulation package active.'
      },
      {
        step: 2,
        title: 'Create New Static Study',
        description: 'Simulation tab > Study Advisor dropdown > New Study -> General Simulation: Static -> Name: "Static_Combined_Loads" -> Click Green Checkmark.',
        tip: 'Linear static studies solve [K]{u} = {F} assuming displacements are small (< 5% of thickness).'
      },
      {
        step: 3,
        title: 'Apply Fixed Support Boundary Condition',
        description: 'Right-click Fixtures in the study tree > Fixed Geometry -> Select the root cylindrical faces of the 2 chassis mounting holes AND the root end face -> Click OK.',
        tip: 'Fixing the bolt hole inner cylindrical surfaces replicates the physical clamping force of the chassis bolts.'
      },
      {
        step: 4,
        title: 'Apply Aerodynamic Thrust Force (50 N)',
        description: 'Right-click External Loads > Force -> Selection: Select the 4 motor mounting hole faces or the circular motor pad upper face -> Direction: Selected Direction (Top Plane) -> Magnitude: 50 N pointing UPWARD (+Y).',
        tip: 'Click "Total" rather than "Per Item" so the 50 N is distributed across all 4 holes rather than quadrupled!'
      },
      {
        step: 5,
        title: 'Apply Centrifugal Force (100 N) & Motor Gravity (4.905 N)',
        description: 'Apply second Force: 100 N outward (+X) along the arm length axis. Apply third Force: 4.905 N downward (-Y). Alternatively, apply Global Gravity: External Loads > Gravity > Select Top Plane -> 9.81 m/s² downward.',
        tip: 'SolidWorks will display green/pink arrows indicating load directions on the 3D model.'
      }
    ],
    expectedOutcome: 'A fully constrained FEA study tree with verified material, fixed root support, and accurately oriented load vectors.',
    commonMistakes: [
      {
        mistake: 'Applying 50 N "Per Item" across 4 holes',
        consequence: 'SolidWorks applies 4 x 50 N = 200 N total, quadrupling stress and falsely failing the design.',
        fix: 'Always select "Total" in the Force PropertyManager when selecting multiple faces.'
      },
      {
        mistake: 'Fixing the entire arm body instead of just the root attachment',
        consequence: 'Artificially eliminates all strain and results in zero stress everywhere.',
        fix: 'Only fix the faces where the arm physically bolts to the central drone chassis.'
      }
    ],
    checklist: [
      'Activated SolidWorks Simulation add-in',
      'Created New Study: Static named "Static_Combined_Loads"',
      'Fixed Geometry fixture applied to root mounting bolt holes and end face',
      'Aerodynamic force (50 N total) applied upward (+Y)',
      'Centrifugal force (100 N total) applied axially (+X)',
      'Motor gravity force (4.905 N) or global gravity applied downward (-Y)',
      'Verified load arrow directions visually in the 3D viewport'
    ],
    diagramType: 'mesh'
  },
  {
    id: 8,
    title: 'Finite Element Meshing & Convergence',
    subtitle: 'Standard vs Curvature-Based Mesh, Element Quality & Convergence Study',
    category: 'FEA Simulation',
    estimatedMinutes: 30,
    solidworksTool: 'Create Mesh, Mesh Control, Mesh Quality Plot',
    menuPath: 'Right-click Mesh > Create Mesh | Mesh > Apply Mesh Control',
    objective: 'Generate a high-quality tetrahedral solid mesh, apply localized mesh refinement around high-stress holes and fillets, and evaluate mesh convergence.',
    keyConcepts: [
      'Discretization of Continuous Geometry into Tetrahedral Solid Elements',
      'Parabolic (High Quality 10-node) vs Linear (Draft Quality 4-node) Elements',
      'Curvature-Based Meshing for Circular Holes and Fillets',
      'Aspect Ratio and Jacobian Ratio Element Quality Metrics',
      'Mesh Convergence Criterion (Stress variance < 3% between refinements)'
    ],
    instructions: [
      {
        step: 1,
        title: 'Configure Mesh Parameters',
        description: 'Right-click Mesh in study tree > Create Mesh. Expand Mesh Parameters -> Choose "Curvature-based mesh" -> Set Maximum element size to 3.0 mm and Minimum element size to 0.8 mm.',
        tip: 'Curvature-based mesh automatically clusters smaller elements around curved hole boundaries while keeping larger elements in flat low-stress areas.'
      },
      {
        step: 2,
        title: 'Apply Mesh Control on Critical Root Fillets',
        description: 'Right-click Mesh > Apply Mesh Control -> Select the two root blend fillets (R3) -> Set element size to 1.0 mm -> Click OK.',
        tip: 'Stress gradients peak at geometric discontinuities; fine mesh here prevents underestimating maximum stress.'
      },
      {
        step: 3,
        title: 'Generate Mesh & Check Quality Plot',
        description: 'Click Green Checkmark to run meshing. Right-click Mesh > Mesh Quality Plot -> Check Aspect Ratio. Ensure >90% of elements have an aspect ratio under 3.0.',
        tip: 'Distorted needle-shaped elements with aspect ratio > 10 produce numerical inaccuracies and false singularities.'
      },
      {
        step: 4,
        title: 'Execute Mesh Convergence Study',
        description: 'Solve the study with element sizes 4.0 mm, 2.5 mm, and 1.5 mm. Plot peak Von Mises stress versus total node count. Notice how the stress stabilizes around ~67.6 MPa.',
        tip: 'Inclusion of a mesh convergence curve in your ESCME192 report earns high distinction marks from faculty.'
      }
    ],
    expectedOutcome: 'A smooth, defect-free 3D solid mesh with fine refinement around holes and fillets, ready for robust solver execution.',
    commonMistakes: [
      {
        mistake: 'Using Draft Quality (linear 4-node) mesh instead of High Quality (parabolic 10-node)',
        consequence: 'Linear elements suffer from "shear locking" and can underestimate peak stresses by 30-50%.',
        fix: 'Always ensure Study Properties are set to "High quality mesh (second-order tetrahedrons)".'
      },
      {
        mistake: 'Using an ultra-fine 0.1 mm global mesh on a student laptop',
        consequence: 'SolidWorks crashes or takes over 45 minutes to solve with out-of-memory errors.',
        fix: 'Use a moderate global mesh (2.5 mm) with targeted Local Mesh Controls on fillets only.'
      }
    ],
    checklist: [
      'Selected Curvature-based mesh generator',
      'Verified high-quality 10-node second-order tetrahedral elements',
      'Applied localized 1.0 mm mesh control to root fillets and bolt holes',
      'Verified total node count is between 15,000 and 45,000 nodes for optimal laptop solve time',
      'Checked Mesh Details for acceptable aspect ratio and zero inverted elements'
    ],
    diagramType: 'mesh'
  },
  {
    id: 9,
    title: 'Structural Analysis & Result Interpretation',
    subtitle: 'Von Mises Stress, Tip Displacement & Factor of Safety (FOS)',
    category: 'FEA Simulation',
    estimatedMinutes: 40,
    solidworksTool: 'Run This Study, Plot Tools, Factor of Safety Plot',
    menuPath: 'Simulation > Run This Study | Results > Define Stress Plot / Factor of Safety Plot',
    objective: 'Execute the FEA solver, extract and interpret the three core engineering plots (Von Mises Stress, Resultant Displacement URES, and Factor of Safety), and correlate them with analytical calculations.',
    keyConcepts: [
      'Von Mises Yield Criterion: σ_vm = sqrt(0.5 * [(σ1-σ2)² + (σ2-σ3)² + (σ3-σ1)²])',
      'Location of Peak Stress Hotspot (Root Clamp Interface)',
      'Maximum Tip Deflection (URES) at Distal Motor Mount Pad',
      'Factor of Safety (FOS) Calculation: FOS = σ_yield / σ_von_mises',
      'Verification against ESCME192 Design Criteria (FOS > 1.5)'
    ],
    instructions: [
      {
        step: 1,
        title: 'Run Simulation Solver',
        description: 'Simulation tab > Click "Run This Study". The FFEPlus or Direct Sparse solver will formulate and invert the stiffness matrix, taking approximately 5–15 seconds.',
        tip: 'Watch the convergence log to ensure no rigid body motion occurs.'
      },
      {
        step: 2,
        title: 'Interpret Von Mises Stress Plot',
        description: 'Double-click "Stress1 (-vonMises-)" in Results folder. Peak stress occurs at the root transition fillet: σ_max = 67.6 MPa. The distal tip experiences very low stress (< 8 MPa).',
        tip: 'Right-click plot > Chart Options > Check "Show max annotation" to flag the exact coordinate of highest stress.'
      },
      {
        step: 3,
        title: 'Analyse Displacement Plot (URES)',
        description: 'Double-click "Displacement1 (-Res disp-)". Observe deformation pattern: Zero at fixed root, linearly increasing along the arm span to a maximum tip deflection of δ_max = 0.82 mm at the motor mount.',
        tip: 'Tip deflection under 1.0 mm confirms high arm rigidity, preventing high-frequency gyro vibrations.'
      },
      {
        step: 4,
        title: 'Generate Factor of Safety (FOS) Plot',
        description: 'Right-click Results folder > Define Factor of Safety Plot -> Step 1: All bodies -> Criterion: Max von Mises stress -> Step 2: Yield strength = 276 MPa -> Step 3: Result displays Minimum FOS = 4.08.',
        tip: 'Since FOS 4.08 > 1.5 minimum requirement, the baseline design is extremely safe against permanent yield failure.'
      },
      {
        step: 5,
        title: 'Compare Individual vs Combined Load Studies',
        description: 'Study 1 (Gravity only): Max stress = 4.8 MPa. Study 2 (Aero 50 N only): Max stress = 62.1 MPa. Study 3 (Centrifugal 100 N only): Max stress = 1.2 MPa. Notice aerodynamic lift contributes ~92% of total stress.',
        tip: 'This insight guides our Phase 11 optimization strategy: focus stiffening on vertical bending!'
      }
    ],
    expectedOutcome: 'Comprehensive quantification of Von Mises stress (67.6 MPa), max displacement (0.82 mm), and minimum Factor of Safety (4.08).',
    commonMistakes: [
      {
        mistake: 'Panicking over exaggerated deformation visual scale',
        consequence: 'Students think their arm bent like a wet noodle when actual deflection is only 0.82 mm.',
        fix: 'SolidWorks automatically magnifies deformation scale (e.g. 50x) for visualization; edit definition and set scale to "True Scale (1.0)".'
      },
      {
        mistake: 'Ignoring units in the stress plot legend',
        consequence: 'Reporting stress in N/m² (Pascals) instead of MPa, leading to confusing numbers like 67,600,000.',
        fix: 'Double-click the color bar legend -> Chart Options -> Change units dropdown from N/m² to MPa (N/mm²).'
      }
    ],
    checklist: [
      'Executed Static study without solver singularity errors',
      'Configured Von Mises Stress plot with units in MPa and max annotation enabled',
      'Confirmed peak stress is approximately 67.6 MPa at root fillets',
      'Configured Displacement plot and recorded max tip deflection of ~0.82 mm',
      'Generated Factor of Safety plot confirming min FOS of ~4.08 (> 1.5 threshold)',
      'Exported high-resolution stress and displacement screenshots for report'
    ],
    diagramType: 'fea'
  },
  {
    id: 10,
    title: 'Dynamic & Vibration Analysis',
    subtitle: 'Frequency Study, Natural Frequencies, Mode Shapes & Motor RPM Resonance',
    category: 'FEA Simulation',
    estimatedMinutes: 30,
    solidworksTool: 'Frequency Study, Mode Shape Animations',
    menuPath: 'Simulation > New Study > Frequency | Results > Define Mode Shape Plot',
    objective: 'Set up a Frequency study in SolidWorks Simulation, compute the first three natural resonant frequencies and mode shapes of the rotor arm, and verify that motor operating frequencies do not induce destructive resonance.',
    keyConcepts: [
      'Eigenvalue Problem: ([K] - ω²[M]){Φ} = {0}',
      'Natural Frequencies (fn = ω / 2π in Hertz)',
      'Mode 1: 1st Flapping (Vertical Bending) Mode Shape',
      'Mode 2: 1st In-Plane (Lead-Lag) Bending Mode Shape',
      'Mode 3: 1st Torsional (Twisting) Mode Shape',
      'Resonance Avoidance Criterion: Motor RPM / 60 ≠ fn'
    ],
    instructions: [
      {
        step: 1,
        title: 'Create Frequency Study',
        description: 'Simulation tab > New Study -> Frequency -> Name: "Drone_Arm_Modal_Analysis" -> Number of frequencies to solve: 5 -> Click OK.',
        tip: 'Frequency studies do not require external loads; they only require the fixed root boundary condition and mass/stiffness distribution.'
      },
      {
        step: 2,
        title: 'Apply Fixed Root Support & Mesh',
        description: 'Apply identical Fixed Geometry to root bolt holes. Right-click Mesh > Create Mesh (use same curvature settings as static study) -> Run study.',
        tip: 'The solver extracts the natural resonant modes determined solely by material density, modulus, and geometric shape.'
      },
      {
        step: 3,
        title: 'Inspect Mode 1: First Vertical Bending Mode',
        description: 'Double-click Mode 1 in Results folder. Frequency: fn1 ≈ 84.5 Hz. The arm flexes vertically up and down in a classic cantilever flapping motion.',
        tip: 'Calculate motor operating frequency: A 2212 920KV motor on 3S LiPo rotates at ~5,000–8,000 RPM (83–133 Hz). Since hover is ~4,500 RPM (75 Hz), there is safe separation from resonance.'
      },
      {
        step: 4,
        title: 'Inspect Mode 2 & Mode 3 Shapes',
        description: 'Mode 2 (fn2 ≈ 215.2 Hz) represents in-plane lateral bending. Mode 3 (fn3 ≈ 482.0 Hz) represents structural torsional twisting.',
        tip: 'Right-click Mode Shape plot > Animate to visualize the dynamic oscillatory waveform in 3D.'
      },
      {
        step: 5,
        title: 'Evaluate Propeller Blade Pass Frequency (BPF)',
        description: 'For a 2-blade propeller at 6,000 RPM (100 Hz rotor speed), Blade Pass Frequency BPF = 2 * 100 = 200 Hz. Notice Mode 2 (215 Hz) is close; our Phase 11 optimization will push Mode 2 higher!',
        tip: 'Frequency separation of at least ±15% from motor excitation frequencies is standard aerospace practice.'
      }
    ],
    expectedOutcome: 'Computed the first 3 natural frequencies (84.5 Hz, 215.2 Hz, 482.0 Hz) and documented resonance avoidance zones.',
    commonMistakes: [
      {
        mistake: 'Applying 50 N static force in a Frequency study',
        consequence: 'Confusing modal analysis with static analysis; natural frequencies in basic modal studies depend only on mass and stiffness, not static load amplitudes.',
        fix: 'Leave External Loads empty in a standard Frequency study unless doing a pre-stressed frequency analysis.'
      },
      {
        mistake: 'Reporting displacement amplitudes in mode shapes as actual millimeters',
        consequence: 'Mode shape displacement values are arbitrary normalized eigenvectors, not physical deflections.',
        fix: 'Clarify in the report that mode shapes show relative deformation profiles, not absolute millimeter values.'
      }
    ],
    checklist: [
      'Created New Study: Frequency solving first 5 modes',
      'Applied root fixed boundary condition',
      'Solved modal equations and extracted natural frequencies table',
      'Recorded Mode 1 (1st Vertical Bending ≈ 84.5 Hz)',
      'Recorded Mode 2 (1st In-Plane Bending ≈ 215.2 Hz)',
      'Recorded Mode 3 (1st Torsion ≈ 482.0 Hz)',
      'Validated that hover motor operating frequency does not coincide with Mode 1'
    ],
    diagramType: 'vibration'
  },
  {
    id: 11,
    title: 'Design Optimisation & Weight Reduction',
    subtitle: 'Lightening Pockets, Root Fillet Optimization & Strength-to-Weight Ratio',
    category: 'Optimisation & Delivery',
    estimatedMinutes: 45,
    solidworksTool: 'Extruded Cut, Linear Pattern, Design Study / Topology',
    menuPath: 'Insert > Cut > Extrude | Features > Fillet | Simulation > Design Study',
    objective: 'Optimize the baseline solid rotor arm to achieve a minimum 25% mass reduction while maintaining a Factor of Safety > 2.0 and increasing natural bending frequencies through strategic pocketing and root fillet enlargement.',
    keyConcepts: [
      'Stress Concentration Factor Reduction (Kt from 2.2 down to 1.35 via R4 fillet)',
      'Neutral Axis Mechanics: Material near the center carries minimal bending stress',
      'Truss / I-Beam Cross Section Principles in Aerospace Design',
      'Lightening Pocket Geometry (Chamfered triangular vs oval cutouts)',
      'Strength-to-Weight Ratio (Specific Strength) Maximization'
    ],
    instructions: [
      {
        step: 1,
        title: 'Analyse Baseline Low-Stress Zones',
        description: 'Review Phase 9 stress plot: Notice that the entire central interior and distal arm body operate at stresses < 15 MPa (well below 276 MPa capacity). This material is dead weight.',
        tip: 'In aerospace structures, every gram of dead weight requires ~3x battery energy to lift.'
      },
      {
        step: 2,
        title: 'Enlarge Root Transition Fillet Radius (R3 -> R4.5 mm)',
        description: 'Edit "Root_Fillet" feature in FeatureManager. Increase fillet radius from 3.0 mm to 4.5 mm. Peak root stress drops from 67.6 MPa down to 54.2 MPa!',
        tip: 'Larger root radii smoothly channel stress trajectories into the central chassis.'
      },
      {
        step: 3,
        title: 'Create Internal Lightening Pocket Cutouts',
        description: 'Sketch on top face -> Draw 3 staggered aerodynamic oval/triangular pockets leaving a 2.5 mm perimeter wall rib. Features > Extruded Cut -> Condition: Through All (or leave 1.5 mm web for an I-beam profile).',
        tip: 'Always maintain at least 2.5 mm wall thickness to prevent local buckling.'
      },
      {
        step: 4,
        title: 'Re-Evaluate Mass Properties',
        description: 'Evaluate tab > Mass Properties: Original mass = 54.0 g -> Optimised mass = 38.8 g. Mass reduction = ((54.0 - 38.8) / 54.0) * 100% = 28.1% mass savings!',
        tip: 'For all 4 arms, this saves over 60 grams, significantly boosting flight time.'
      },
      {
        step: 5,
        title: 'Re-Run FEA on Optimised Geometry',
        description: 'Duplicate Static study on the optimized configuration. Peak stress = 78.4 MPa (still well below 276 MPa yield!). Factor of Safety = 276 / 78.4 = 3.52 (Substantially exceeds 1.5 requirement!).',
        tip: 'The optimized arm achieves 28% lower weight while maintaining an outstanding 3.52 safety margin.'
      }
    ],
    expectedOutcome: 'An engineered lightweight rotor arm saving 28.1% structural mass while keeping FOS above 3.5.',
    commonMistakes: [
      {
        mistake: 'Cutting pockets too close to the root mounting bolt holes',
        consequence: 'Removes material directly in the highest bending moment zone, causing severe stress spikes.',
        fix: 'Leave the first 35 mm of the root completely solid to absorb the maximum 9.0 N·m bending moment.'
      },
      {
        mistake: 'Using sharp rectangular pocket cutouts without internal corner fillets',
        consequence: 'Creates new internal stress concentration singularities that initiate fatigue cracks.',
        fix: 'Always add generous internal blend radii (R1.5 to R2.5 mm) to all cutout corners.'
      }
    ],
    checklist: [
      'Increased root transition fillet radius to 4.5 mm',
      'Created 3 internal lightening pockets leaving solid root clamp and motor pad',
      'Added smooth R2 mm fillets to all internal pocket corners',
      'Measured mass reduction: baseline 54.0 g reduced to 38.8 g (28.1% savings)',
      'Re-ran Static FEA confirming peak stress of 78.4 MPa with FOS of 3.52',
      'Generated side-by-side comparison graphics for final assignment report'
    ],
    diagramType: 'optimisation'
  },
  {
    id: 12,
    title: 'Final Engineering Documentation & Report',
    subtitle: 'IEM ESCME192 Submission Guidelines, Data Tables & PDF Export',
    category: 'Optimisation & Delivery',
    estimatedMinutes: 30,
    objective: 'Compile the complete technical laboratory report conforming to the IEM Engineering Graphics & Design (ESCME192) formal assignment standards, embed simulation result comparison tables, and generate an export-ready PDF.',
    keyConcepts: [
      'Standard IEM Academic Report Layout (Abstract to Conclusions)',
      'Technical Data Tabulation: Original vs Optimised Metrics',
      'Engineering Screenshot Checklist with Annotations',
      'Critical Analysis & Discussion of Discrepancies between Theory and FEA',
      'Professional Archival and PDF Export Standards'
    ],
    instructions: [
      {
        step: 1,
        title: 'Review Required Report Structure',
        description: 'Ensure your document includes: Title & Cover Page, Abstract, Objectives, Geometric Specifications, Material Properties, Load Calculations, SolidWorks 3D Modeling Steps, Simulation Methodology, FEA Stress/Displacement Results, Dynamic Modal Results, Design Optimization, and Conclusion.',
        tip: 'Use ROTORLAB 360’s built-in Report Generator tab to assemble all sections with 1-click export.'
      },
      {
        step: 2,
        title: 'Verify Results Comparison Table',
        description: 'Tabulate parameters: Mass (54.0g vs 38.8g), Peak Stress (67.6 MPa vs 78.4 MPa), Tip Deflection (0.82 mm vs 0.94 mm), Factor of Safety (4.08 vs 3.52), Mode 1 Frequency (84.5 Hz vs 91.2 Hz).',
        tip: 'Clear comparative data tables earn maximum scoring in university rubric evaluations.'
      },
      {
        step: 3,
        title: 'Attach High-Resolution Annotated Screenshots',
        description: 'Include 4 key visuals: 1. SolidWorks Part Model with FeatureTree; 2. Exploded Quadcopter Assembly; 3. Von Mises Stress Contour Plot with Min/Max callouts; 4. Factor of Safety distribution plot.',
        tip: 'Use white background mode in SolidWorks (View > Display > Plain White) for crisp report printing.'
      },
      {
        step: 4,
        title: 'Review Engineering Discussion & Conclusion',
        description: 'Summarize how analytical Euler-Bernoulli beam theory closely predicted peak bending stresses within 8% of numerical FEA, confirming design validity and aerospace flight-worthiness.',
        tip: 'Highlight that the optimized design achieved 28% weight reduction without compromising structural safety.'
      },
      {
        step: 5,
        title: 'Generate and Print/Export PDF Report',
        description: 'Fill in your Student Name, IEM Roll Number, Section, and Instructor Name in the Report Generator, verify the preview, and click "Export / Print Official PDF".',
        tip: 'Save a backup JSON copy of your report data using the Export Data button.'
      }
    ],
    expectedOutcome: 'A complete, academic-grade engineering project report ready for direct submission to the IEM Department of Mechanical Engineering.',
    commonMistakes: [
      {
        mistake: 'Submitting FEA screenshots with a dark or cluttered background',
        consequence: 'Black backgrounds waste printer ink and obscure stress legend numbers.',
        fix: 'Always switch SolidWorks viewport background to Plain White before taking report captures.'
      },
      {
        mistake: 'Failing to explain discrepancies between manual formulas and FEA',
        consequence: 'Evaluators may deduct marks for lack of critical engineering reasoning.',
        fix: 'Explain that manual beam theory ignores localized 3D stress concentration around bolt holes, which FEA captures.'
      }
    ],
    checklist: [
      'All 12 phases completed and verified',
      'Student metadata filled in Report Generator (Name, IEM Roll No, Section)',
      'Results comparison table filled with FEA data',
      'High-resolution screenshots embedded with descriptive captions',
      'Generated and reviewed printable PDF report document',
      'Backed up local project files and SLDPRT / SLDASM CAD models'
    ],
    diagramType: 'blueprint'
  }
];
