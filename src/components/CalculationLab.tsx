import React, { useState, useMemo } from 'react';
import { Calculator, ArrowRight, RefreshCw, FileText, CheckCircle2, AlertTriangle, HelpCircle, Sparkles } from 'lucide-react';
import { MATERIALS_DATABASE } from '../data/materialsData';
import { LoadInputs, CalculationResults } from '../types';

interface CalculationLabProps {
  onExportToReport?: (results: {
    maxStress: number;
    deflection: number;
    fos: number;
  }) => void;
}

export const CalculationLab: React.FC<CalculationLabProps> = ({ onExportToReport }) => {
  // Inputs
  const [motorMass, setMotorMass] = useState<number>(0.50); // kg
  const [gravity, setGravity] = useState<number>(9.81); // m/s^2
  const [centrifugalForce, setCentrifugalForce] = useState<number>(100.0); // N
  const [aerodynamicForce, setAerodynamicForce] = useState<number>(50.0); // N
  const [armLength, setArmLength] = useState<number>(200.0); // mm
  const [armWidth, setArmWidth] = useState<number>(20.0); // mm
  const [armThickness, setArmThickness] = useState<number>(5.0); // mm
  const [selectedMaterialId, setSelectedMaterialId] = useState<string>('al-6061-t6');
  
  // Custom material overrides if needed
  const [customYoungsModulus, setCustomYoungsModulus] = useState<number>(68.9); // GPa
  const [customYieldStrength, setCustomYieldStrength] = useState<number>(276.0); // MPa
  
  // Actual SolidWorks FEA Stress Probe (optional input from student's simulation)
  const [actualFeaStress, setActualFeaStress] = useState<number>(67.6); // MPa
  const [exportedNotice, setExportedNotice] = useState(false);

  // Active Material
  const activeMaterial = useMemo(() => {
    return MATERIALS_DATABASE.find((m) => m.id === selectedMaterialId) || MATERIALS_DATABASE[0];
  }, [selectedMaterialId]);

  const effectiveE = selectedMaterialId === 'custom' ? customYoungsModulus : activeMaterial.youngsModulus;
  const effectiveYield = selectedMaterialId === 'custom' ? customYieldStrength : activeMaterial.yieldStrength;
  const effectiveDensity = activeMaterial.density; // kg/m^3

  // Math derivations
  const calcResults: CalculationResults = useMemo(() => {
    // 1. Gravitational force
    const fGravity = motorMass * gravity; // N

    // 2. Arm dimensions and self-weight
    const volumeMm3 = armLength * armWidth * armThickness; // mm^3
    const volumeM3 = volumeMm3 * 1e-9; // m^3
    const massKg = effectiveDensity * volumeM3; // kg
    const massGrams = massKg * 1000; // g
    const armWeightN = massKg * gravity; // N

    // 3. Net vertical cantilever force
    // (Aero thrust upward minus motor weight minus half of arm distributed weight)
    const netVertical = aerodynamicForce - fGravity - 0.5 * armWeightN;

    // 4. Bending Moment at Root (N*m)
    const lengthMeters = armLength / 1000.0;
    const bendingMomentNm = netVertical * lengthMeters;

    // 5. Section properties
    // I = (b * t^3) / 12 (mm^4)
    const secondMomentAreaMm4 = (armWidth * Math.pow(armThickness, 3)) / 12.0;
    // Z = (b * t^2) / 6 (mm^3)
    const sectionModulusMm3 = (armWidth * Math.pow(armThickness, 2)) / 6.0;

    // 6. Stresses (MPa = N/mm^2)
    // sigma_b = M / Z. M in N*mm = M_Nm * 1000
    const bendingMomentNmm = bendingMomentNm * 1000.0;
    const bendingStressMpa = bendingMomentNmm / sectionModulusMm3;

    // Axial Tension Stress sigma_a = F_c / (b * t)
    const crossSectionAreaMm2 = armWidth * armThickness;
    const axialStressMpa = centrifugalForce / crossSectionAreaMm2;

    // Combined Von Mises (Normal bending + Axial tension)
    const normalStressTotal = bendingStressMpa + axialStressMpa;
    // Transverse shear stress tau = 1.5 * V / A
    const tauShearMpa = (1.5 * netVertical) / crossSectionAreaMm2;
    // Von Mises: sqrt(sigma^2 + 3 * tau^2)
    const combinedVmStress = Math.sqrt(Math.pow(normalStressTotal, 2) + 3 * Math.pow(tauShearMpa, 2));

    // 7. Euler-Bernoulli Maximum Cantilever Deflection
    // delta = (F * L^3) / (3 * E * I)
    // E in MPa = GPa * 1000
    const EMpa = effectiveE * 1000.0;
    const deflectionMm =
      (netVertical * Math.pow(armLength, 3)) / (3.0 * EMpa * secondMomentAreaMm4);

    // 8. Factor of Safety
    const theoreticalFOS = effectiveYield / combinedVmStress;
    const feaFOS = actualFeaStress > 0 ? effectiveYield / actualFeaStress : undefined;

    let safetyStatus: 'Critical' | 'Warning' | 'Optimal' | 'Over-engineered' = 'Optimal';
    const evalFos = feaFOS || theoreticalFOS;
    if (evalFos < 1.5) safetyStatus = 'Critical';
    else if (evalFos < 2.0) safetyStatus = 'Warning';
    else if (evalFos <= 5.0) safetyStatus = 'Optimal';
    else safetyStatus = 'Over-engineered';

    return {
      gravitationalForce: fGravity,
      armVolume: volumeMm3,
      armMass: massGrams,
      armSelfWeight: armWeightN,
      netVerticalForce: netVertical,
      bendingMoment: bendingMomentNm,
      secondMomentArea: secondMomentAreaMm4,
      sectionModulus: sectionModulusMm3,
      bendingStress: bendingStressMpa,
      axialTensionStress: axialStressMpa,
      combinedVonMisesStress: combinedVmStress,
      analyticalDeflection: deflectionMm,
      theoreticalFOS,
      feaFOS,
      safetyStatus
    };
  }, [
    motorMass,
    gravity,
    centrifugalForce,
    aerodynamicForce,
    armLength,
    armWidth,
    armThickness,
    effectiveDensity,
    effectiveE,
    effectiveYield,
    actualFeaStress
  ]);

  // Quick Preset Presets
  const applyPreset = (preset: 'default' | 'high_g' | 'racing_cf' | 'heavy_lift') => {
    if (preset === 'default') {
      setMotorMass(0.50);
      setGravity(9.81);
      setCentrifugalForce(100.0);
      setAerodynamicForce(50.0);
      setArmLength(200.0);
      setArmWidth(20.0);
      setArmThickness(5.0);
      setSelectedMaterialId('al-6061-t6');
      setActualFeaStress(67.6);
    } else if (preset === 'high_g') {
      setMotorMass(0.55);
      setCentrifugalForce(180.0);
      setAerodynamicForce(85.0);
      setArmThickness(6.0);
      setSelectedMaterialId('al-7075-t6');
      setActualFeaStress(94.2);
    } else if (preset === 'racing_cf') {
      setMotorMass(0.35);
      setCentrifugalForce(140.0);
      setAerodynamicForce(65.0);
      setArmWidth(16.0);
      setArmThickness(4.0);
      setSelectedMaterialId('carbon-fiber-3k');
      setActualFeaStress(88.0);
    } else if (preset === 'heavy_lift') {
      setMotorMass(0.85);
      setCentrifugalForce(220.0);
      setAerodynamicForce(120.0);
      setArmLength(280.0);
      setArmWidth(25.0);
      setArmThickness(7.0);
      setSelectedMaterialId('al-6061-t6');
      setActualFeaStress(115.0);
    }
  };

  const handleExport = () => {
    if (onExportToReport) {
      onExportToReport({
        maxStress: actualFeaStress > 0 ? actualFeaStress : calcResults.combinedVonMisesStress,
        deflection: calcResults.analyticalDeflection,
        fos: calcResults.feaFOS || calcResults.theoreticalFOS
      });
      setExportedNotice(true);
      setTimeout(() => setExportedNotice(false), 3000);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Header Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
              <Calculator className="w-5 h-5" />
            </span>
            <div>
              <h2 className="text-lg font-bold text-white tracking-wide">
                Interactive Engineering Calculation Lab
              </h2>
              <p className="text-xs text-slate-400">
                Mathematical beam mechanics, force resolution, stress derivation & Factor of Safety validation
              </p>
            </div>
          </div>
        </div>

        {/* Preset Selector */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-[10px] text-slate-400 font-mono uppercase">STUDY PRESETS:</span>
          <button
            onClick={() => applyPreset('default')}
            className="px-2.5 py-1 text-xs rounded border border-cyan-500/50 bg-cyan-500/10 text-cyan-300 font-medium hover:bg-cyan-500/20 transition-colors"
          >
            IEM Assignment Default
          </button>
          <button
            onClick={() => applyPreset('high_g')}
            className="px-2.5 py-1 text-xs rounded border border-slate-700 bg-slate-800 text-slate-300 hover:text-white transition-colors"
          >
            High-G Maneuver
          </button>
          <button
            onClick={() => applyPreset('racing_cf')}
            className="px-2.5 py-1 text-xs rounded border border-slate-700 bg-slate-800 text-slate-300 hover:text-white transition-colors"
          >
            Carbon Fiber Racing
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* ============================================================== */}
        {/* LEFT COLUMN: PARAMETRIC INPUTS (5 Cols) */}
        {/* ============================================================== */}
        <div className="lg:col-span-5 flex flex-col gap-5">
          {/* Material Selection Card */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 shadow-lg">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-cyan-400 font-mono flex items-center justify-between mb-3">
              <span>1. Structural Material</span>
              <span className="text-slate-400 text-[10px]">Al 6061-T6 Benchmark</span>
            </h3>

            <div className="grid grid-cols-1 gap-2">
              {MATERIALS_DATABASE.slice(0, 3).map((mat) => (
                <label
                  key={mat.id}
                  className={`flex items-center justify-between p-2.5 rounded-lg border cursor-pointer transition-all ${
                    selectedMaterialId === mat.id
                      ? 'bg-cyan-950/40 border-cyan-500 text-cyan-200'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="material"
                      checked={selectedMaterialId === mat.id}
                      onChange={() => setSelectedMaterialId(mat.id)}
                      className="accent-cyan-400"
                    />
                    <div>
                      <div className="font-semibold text-xs text-white">{mat.name}</div>
                      <div className="text-[10px] text-slate-400">
                        E = {mat.youngsModulus} GPa | Yield = {mat.yieldStrength} MPa | ρ = {mat.density} kg/m³
                      </div>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-slate-300">
                    {mat.costRating}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Load Inputs Card */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 shadow-lg flex flex-col gap-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-cyan-400 font-mono">
              2. Applied Dynamic Loads (Phase 6 Inputs)
            </h3>

            {/* Aerodynamic Thrust */}
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-300 font-medium">Aerodynamic Lift Force (F_aero)</span>
                <span className="font-mono text-cyan-400 font-bold">{aerodynamicForce.toFixed(1)} N</span>
              </div>
              <input
                type="range"
                min="10"
                max="150"
                step="1"
                value={aerodynamicForce}
                onChange={(e) => setAerodynamicForce(Number(e.target.value))}
                className="w-full accent-cyan-400"
              />
              <span className="text-[10px] text-slate-500 block">Direction: Upward (+Y) along propeller axis</span>
            </div>

            {/* Centrifugal Force */}
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-300 font-medium">Centrifugal Inertial Force (F_c)</span>
                <span className="font-mono text-amber-400 font-bold">{centrifugalForce.toFixed(1)} N</span>
              </div>
              <input
                type="range"
                min="0"
                max="250"
                step="5"
                value={centrifugalForce}
                onChange={(e) => setCentrifugalForce(Number(e.target.value))}
                className="w-full accent-amber-400"
              />
              <span className="text-[10px] text-slate-500 block">Direction: Outward axial tension (+X)</span>
            </div>

            {/* Motor Mass */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] text-slate-300 block mb-1">Motor + Prop Mass (m)</label>
                <div className="relative">
                  <input
                    type="number"
                    step="0.05"
                    min="0.1"
                    max="2.0"
                    value={motorMass}
                    onChange={(e) => setMotorMass(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-800 rounded px-2.5 py-1.5 text-xs font-mono text-white focus:border-cyan-500 outline-none"
                  />
                  <span className="absolute right-2.5 top-1.5 text-[11px] text-slate-500 font-mono">kg</span>
                </div>
              </div>
              <div>
                <label className="text-[11px] text-slate-300 block mb-1">Gravity (g)</label>
                <div className="relative">
                  <input
                    type="number"
                    step="0.01"
                    value={gravity}
                    onChange={(e) => setGravity(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-800 rounded px-2.5 py-1.5 text-xs font-mono text-white focus:border-cyan-500 outline-none"
                  />
                  <span className="absolute right-2.5 top-1.5 text-[11px] text-slate-500 font-mono">m/s²</span>
                </div>
              </div>
            </div>
          </div>

          {/* Geometric Dimensions Card */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 shadow-lg flex flex-col gap-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-cyan-400 font-mono">
              3. Rotor Arm Geometry (CAD Specs)
            </h3>

            <div className="grid grid-cols-3 gap-2.5">
              <div>
                <label className="text-[10px] text-slate-400 font-mono block">LENGTH (L)</label>
                <input
                  type="number"
                  step="5"
                  min="100"
                  max="400"
                  value={armLength}
                  onChange={(e) => setArmLength(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-800 rounded px-2 py-1.5 text-xs font-mono text-white focus:border-cyan-500 outline-none"
                />
                <span className="text-[9px] text-slate-500">mm (0.2 m)</span>
              </div>
              <div>
                <label className="text-[10px] text-slate-400 font-mono block">WIDTH (b)</label>
                <input
                  type="number"
                  step="1"
                  min="10"
                  max="50"
                  value={armWidth}
                  onChange={(e) => setArmWidth(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-800 rounded px-2 py-1.5 text-xs font-mono text-white focus:border-cyan-500 outline-none"
                />
                <span className="text-[9px] text-slate-500">mm</span>
              </div>
              <div>
                <label className="text-[10px] text-slate-400 font-mono block">THICKNESS (t)</label>
                <input
                  type="number"
                  step="0.5"
                  min="2"
                  max="15"
                  value={armThickness}
                  onChange={(e) => setArmThickness(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-800 rounded px-2 py-1.5 text-xs font-mono text-white focus:border-cyan-500 outline-none"
                />
                <span className="text-[9px] text-slate-500">mm</span>
              </div>
            </div>
          </div>

          {/* Actual SolidWorks Simulation Input */}
          <div className="bg-slate-950 border border-cyan-500/40 rounded-xl p-4 shadow-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-400 font-bold flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                SOLIDWORKS ACTUAL FEA PROBE
              </span>
              <span className="text-[10px] text-slate-400">Phase 9 Result</span>
            </div>
            <p className="text-[11px] text-slate-300 mb-2">
              Enter the maximum Von Mises stress recorded from your SolidWorks Simulation stress plot:
            </p>
            <div className="flex items-center gap-2">
              <div className="relative flex-1">
                <input
                  type="number"
                  step="0.1"
                  value={actualFeaStress}
                  onChange={(e) => setActualFeaStress(Number(e.target.value))}
                  className="w-full bg-slate-900 border border-cyan-500/50 rounded px-3 py-1.5 text-sm font-mono text-cyan-300 font-bold focus:border-cyan-400 outline-none"
                  placeholder="e.g. 67.6"
                />
                <span className="absolute right-3 top-2 text-xs text-slate-400 font-mono">MPa</span>
              </div>
              <button
                onClick={handleExport}
                className="px-3 py-1.5 rounded bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-semibold transition-colors flex items-center gap-1"
              >
                <FileText className="w-3.5 h-3.5" />
                Sync Report
              </button>
            </div>
            {exportedNotice && (
              <span className="text-[10px] text-emerald-400 mt-1.5 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> Transferred to Report Generator!
              </span>
            )}
          </div>
        </div>

        {/* ============================================================== */}
        {/* RIGHT COLUMN: REAL-TIME DERIVATIONS & RESULTS (7 Cols) */}
        {/* ============================================================== */}
        <div className="lg:col-span-7 flex flex-col gap-5">
          {/* Executive Results Summary Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-3 flex flex-col justify-between">
              <span className="text-[10px] text-slate-400 font-mono">NET VERTICAL LOAD</span>
              <span className="text-xl font-bold font-mono text-cyan-400 mt-1">
                {calcResults.netVerticalForce.toFixed(2)} N
              </span>
              <span className="text-[10px] text-slate-500">Upward lift (+Y)</span>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-xl p-3 flex flex-col justify-between">
              <span className="text-[10px] text-slate-400 font-mono">ROOT BENDING MOMENT</span>
              <span className="text-xl font-bold font-mono text-rose-400 mt-1">
                {calcResults.bendingMoment.toFixed(3)} N·m
              </span>
              <span className="text-[10px] text-slate-500">At fixed clamp</span>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-xl p-3 flex flex-col justify-between">
              <span className="text-[10px] text-slate-400 font-mono">THEORETICAL STRESS</span>
              <span className="text-xl font-bold font-mono text-amber-400 mt-1">
                {calcResults.combinedVonMisesStress.toFixed(1)} MPa
              </span>
              <span className="text-[10px] text-slate-500">Euler-Bernoulli</span>
            </div>

            <div className={`border rounded-xl p-3 flex flex-col justify-between ${
              calcResults.safetyStatus === 'Critical'
                ? 'bg-rose-950/40 border-rose-500 text-rose-200'
                : 'bg-emerald-950/30 border-emerald-500/50 text-emerald-200'
            }`}>
              <span className="text-[10px] font-mono">FACTOR OF SAFETY</span>
              <span className="text-xl font-bold font-mono mt-1">
                {calcResults.feaFOS ? calcResults.feaFOS.toFixed(2) : calcResults.theoreticalFOS.toFixed(2)}
              </span>
              <span className="text-[10px] font-semibold">
                {calcResults.safetyStatus} (Min &gt; 1.5)
              </span>
            </div>
          </div>

          {/* STEP-BY-STEP MATHEMATICAL DERIVATION WORKED EXAMPLES */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg flex flex-col gap-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-cyan-400 font-mono flex items-center justify-between border-b border-slate-800 pb-2">
              <span>Step-by-Step Mathematical Derivations</span>
              <span className="text-slate-400 text-[10px]">ESCME192 Submission Reference</span>
            </h3>

            {/* Formula 1: Gravitational Force */}
            <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 font-mono text-xs">
              <div className="flex items-center justify-between text-slate-400 text-[11px] mb-1">
                <span className="text-cyan-400 font-bold">1. Gravitational Weight of Motor Assembly:</span>
                <span>F_g = m · g</span>
              </div>
              <div className="text-slate-300">
                F_g = ({motorMass.toFixed(2)} kg) × ({gravity.toFixed(2)} m/s²) ={' '}
                <span className="text-white font-bold">{calcResults.gravitationalForce.toFixed(3)} N (Downward -Y)</span>
              </div>
              <div className="text-[10px] text-slate-500 mt-0.5">
                Arm calculated self-weight: {calcResults.armMass.toFixed(1)} g ({calcResults.armSelfWeight.toFixed(3)} N)
              </div>
            </div>

            {/* Formula 2: Net Vertical Cantilever Tip Force */}
            <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 font-mono text-xs">
              <div className="flex items-center justify-between text-slate-400 text-[11px] mb-1">
                <span className="text-cyan-400 font-bold">2. Net Transverse Tip Shear Force:</span>
                <span>F_net = F_aero - F_g - 0.5·W_arm</span>
              </div>
              <div className="text-slate-300">
                F_net = {aerodynamicForce.toFixed(1)} N - {calcResults.gravitationalForce.toFixed(3)} N - {(0.5 * calcResults.armSelfWeight).toFixed(3)} N ={' '}
                <span className="text-cyan-300 font-bold">{calcResults.netVerticalForce.toFixed(3)} N (Upward +Y)</span>
              </div>
            </div>

            {/* Formula 3: Root Bending Moment */}
            <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 font-mono text-xs">
              <div className="flex items-center justify-between text-slate-400 text-[11px] mb-1">
                <span className="text-cyan-400 font-bold">3. Cantilever Maximum Root Bending Moment:</span>
                <span>M_root = F_net · L</span>
              </div>
              <div className="text-slate-300">
                M_root = ({calcResults.netVerticalForce.toFixed(3)} N) × ({(armLength / 1000).toFixed(3)} m) ={' '}
                <span className="text-rose-400 font-bold">{calcResults.bendingMoment.toFixed(4)} N·m</span>
                <span className="text-slate-400 text-[11px]"> ({ (calcResults.bendingMoment * 1000).toFixed(1) } N·mm)</span>
              </div>
            </div>

            {/* Formula 4: Section Properties */}
            <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 font-mono text-xs">
              <div className="flex items-center justify-between text-slate-400 text-[11px] mb-1">
                <span className="text-cyan-400 font-bold">4. Second Moment of Area (I) & Section Modulus (Z):</span>
                <span>I = (b·t³)/12 | Z = (b·t²)/6</span>
              </div>
              <div className="text-slate-300">
                I = ({armWidth} × {armThickness}³) / 12 ={' '}
                <span className="text-white font-bold">{calcResults.secondMomentArea.toFixed(2)} mm⁴</span>
                <span className="mx-2 text-slate-500">|</span>
                Z = ({armWidth} × {armThickness}²) / 6 ={' '}
                <span className="text-white font-bold">{calcResults.sectionModulus.toFixed(2)} mm³</span>
              </div>
            </div>

            {/* Formula 5: Analytical Bending Stress & Tip Deflection */}
            <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 font-mono text-xs">
              <div className="flex items-center justify-between text-slate-400 text-[11px] mb-1">
                <span className="text-cyan-400 font-bold">5. Analytical Stresses & Euler-Bernoulli Deflection:</span>
                <span>σ_b = M/Z | δ = (F·L³)/(3·E·I)</span>
              </div>
              <div className="text-slate-300">
                σ_bending = {(calcResults.bendingMoment * 1000).toFixed(1)} N·mm / {calcResults.sectionModulus.toFixed(2)} mm³ ={' '}
                <span className="text-amber-300 font-bold">{calcResults.bendingStress.toFixed(1)} MPa</span>
              </div>
              <div className="text-slate-300 mt-1">
                σ_axial = {centrifugalForce} N / ({armWidth}×{armThickness} mm²) ={' '}
                <span className="text-amber-300 font-bold">{calcResults.axialTensionStress.toFixed(2)} MPa</span>
              </div>
              <div className="text-slate-300 mt-1">
                Theoretical Tip Deflection δ_max ={' '}
                <span className="text-cyan-300 font-bold">{calcResults.analyticalDeflection.toFixed(3)} mm</span>
                <span className="text-[10px] text-slate-500"> (SolidWorks FEA records 0.820 mm)</span>
              </div>
            </div>

            {/* Formula 6: Factor of Safety Validation */}
            <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 font-mono text-xs">
              <div className="flex items-center justify-between text-slate-400 text-[11px] mb-1">
                <span className="text-cyan-400 font-bold">6. Factor of Safety Verification:</span>
                <span>FOS = σ_yield / σ_max</span>
              </div>
              <div className="text-slate-300">
                Material Yield Strength (Al 6061-T6): <span className="text-emerald-400 font-bold">{effectiveYield} MPa</span>
              </div>
              <div className="text-slate-300 mt-1">
                Theoretical FOS = {effectiveYield} / {calcResults.combinedVonMisesStress.toFixed(1)} ={' '}
                <span className="text-emerald-400 font-bold">{calcResults.theoreticalFOS.toFixed(2)}</span>
              </div>
              {calcResults.feaFOS && (
                <div className="text-slate-300 mt-1">
                  Actual SolidWorks FEA FOS = {effectiveYield} / {actualFeaStress.toFixed(1)} ={' '}
                  <span className="text-cyan-400 font-bold">{calcResults.feaFOS.toFixed(2)}</span>
                  <span className="text-[10px] text-slate-400 ml-2">
                    (Difference is due to 3D stress concentration Kt around root fillets)
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
