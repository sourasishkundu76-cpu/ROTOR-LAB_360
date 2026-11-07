import React from 'react';
import {
  Compass,
  Layers,
  Calculator,
  Activity,
  Sparkles,
  FileText,
  CheckCircle2,
  Clock,
  ArrowRight,
  ShieldCheck,
  Zap,
  Box,
  Radio,
  BookOpen
} from 'lucide-react';
import { WORKFLOW_PHASES } from '../data/phasesData';

interface DashboardProps {
  completedPhases: number[];
  onNavigateToPhase: (phaseId: number) => void;
  onNavigateToTab: (tab: 'workflow' | 'diagrams' | 'calculator' | 'report' | 'hub') => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
  completedPhases,
  onNavigateToPhase,
  onNavigateToTab
}) => {
  const totalPhases = WORKFLOW_PHASES.length;
  const progressPct = Math.round((completedPhases.length / totalPhases) * 100);

  // Group phases by category for quick milestone tracking
  const categories = [
    { name: 'Fundamentals', phases: [1, 2], icon: <Compass className="w-4 h-4 text-cyan-400" /> },
    { name: 'CAD Modelling', phases: [3, 4], icon: <Box className="w-4 h-4 text-blue-400" /> },
    { name: 'Material & Loads', phases: [5, 6], icon: <Calculator className="w-4 h-4 text-amber-400" /> },
    { name: 'FEA Simulation', phases: [7, 8, 9, 10], icon: <Activity className="w-4 h-4 text-rose-400" /> },
    { name: 'Optimisation & Delivery', phases: [11, 12], icon: <Sparkles className="w-4 h-4 text-emerald-400" /> }
  ];

  return (
    <div className="flex flex-col gap-8">
      {/* ============================================================== */}
      {/* HERO BANNER: AEROSPACE STUDIO INTRO */}
      {/* ============================================================== */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900 to-cyan-950 border border-slate-800 p-6 sm:p-10 shadow-2xl blueprint-grid">
        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 font-mono text-[11px] font-semibold border border-cyan-500/40">
                IEM ESCME192 • 2026 OFFICIAL ASSIGNMENT COMPANION
              </span>
              <span className="px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 font-mono text-[10px]">
                SolidWorks 3D & FEA
              </span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
              ROTORLAB <span className="text-cyan-400">360</span>
            </h1>
            <p className="text-slate-300 text-sm sm:text-base mt-2 leading-relaxed">
              AeroForge Drone Rotor Arm Design & Simulation Studio. An interactive engineering learning suite guiding first-year B.Tech students from initial CAD part sketching to full FEA static/modal analysis and topological optimization.
            </p>

            {/* Quick action buttons */}
            <div className="flex items-center gap-3 mt-6 flex-wrap">
              <button
                onClick={() => onNavigateToTab('workflow')}
                className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold transition-all flex items-center gap-2 shadow-lg shadow-cyan-500/20"
              >
                Launch 12-Phase Workflow
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => onNavigateToTab('calculator')}
                className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-colors flex items-center gap-2"
              >
                <Calculator className="w-4 h-4 text-cyan-400" />
                Calculation Lab
              </button>
              <button
                onClick={() => onNavigateToTab('diagrams')}
                className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-colors flex items-center gap-2"
              >
                <Layers className="w-4 h-4 text-cyan-400" />
                Technical Blueprints
              </button>
              <button
                onClick={() => onNavigateToTab('report')}
                className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-colors flex items-center gap-2"
              >
                <FileText className="w-4 h-4 text-emerald-400" />
                Report Generator
              </button>
            </div>
          </div>

          {/* Radial Completion Percentage Card */}
          <div className="flex-shrink-0 bg-slate-950/80 border border-slate-800 rounded-2xl p-5 flex flex-col items-center justify-center min-w-[200px] shadow-xl backdrop-blur">
            <div className="relative w-28 h-28 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90">
                <circle
                  cx="56"
                  cy="56"
                  r="48"
                  stroke="#1e293b"
                  strokeWidth="8"
                  fill="transparent"
                />
                <circle
                  cx="56"
                  cy="56"
                  r="48"
                  stroke="#06b6d4"
                  strokeWidth="8"
                  strokeDasharray={2 * Math.PI * 48}
                  strokeDashoffset={2 * Math.PI * 48 * (1 - progressPct / 100)}
                  strokeLinecap="round"
                  fill="transparent"
                  className="transition-all duration-500 ease-out"
                />
              </svg>
              <div className="absolute flex flex-col items-center">
                <span className="text-2xl font-bold font-mono text-white">{progressPct}%</span>
                <span className="text-[10px] text-slate-400 font-mono uppercase">COMPLETED</span>
              </div>
            </div>
            <div className="text-center mt-3">
              <span className="text-xs font-mono text-cyan-300 font-bold block">
                {completedPhases.length} of {totalPhases} PHASES VERIFIED
              </span>
              <span className="text-[10px] text-slate-500 block mt-0.5">
                {progressPct === 100 ? '✓ Ready for Report Submission' : 'Track milestones below'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ============================================================== */}
      {/* 4 CORE STUDIO ACCESS CARDS */}
      {/* ============================================================== */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: CAD Modelling */}
        <div
          onClick={() => onNavigateToPhase(3)}
          className="group cursor-pointer bg-slate-900 border border-slate-800 hover:border-cyan-500/60 rounded-xl p-5 transition-all shadow-lg hover:shadow-cyan-500/10 flex flex-col justify-between"
        >
          <div>
            <div className="w-10 h-10 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-3 group-hover:scale-105 transition-transform">
              <Box className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-400">PHASES 3 & 4</span>
            <h3 className="text-base font-bold text-white mt-0.5">3D CAD Modelling</h3>
            <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
              Step-by-step SolidWorks FeatureTree hierarchy, Boss/Base, PCD motor mounts, and quadcopter mate assembly.
            </p>
          </div>
          <div className="flex items-center justify-between text-xs font-semibold text-cyan-400 mt-4 pt-3 border-t border-slate-800">
            <span>Explore CAD Guide</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

        {/* Card 2: Calculation Lab */}
        <div
          onClick={() => onNavigateToTab('calculator')}
          className="group cursor-pointer bg-slate-900 border border-slate-800 hover:border-cyan-500/60 rounded-xl p-5 transition-all shadow-lg hover:shadow-cyan-500/10 flex flex-col justify-between"
        >
          <div>
            <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-3 group-hover:scale-105 transition-transform">
              <Calculator className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-mono uppercase tracking-wider text-amber-400">PHASE 6</span>
            <h3 className="text-base font-bold text-white mt-0.5">Load Calculations</h3>
            <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
              Working beam mechanics solver computing net vertical forces (45.1 N), root moments (9.02 N·m), and FOS.
            </p>
          </div>
          <div className="flex items-center justify-between text-xs font-semibold text-amber-400 mt-4 pt-3 border-t border-slate-800">
            <span>Open Calculator</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

        {/* Card 3: FEA Structural Simulation */}
        <div
          onClick={() => onNavigateToPhase(9)}
          className="group cursor-pointer bg-slate-900 border border-slate-800 hover:border-cyan-500/60 rounded-xl p-5 transition-all shadow-lg hover:shadow-cyan-500/10 flex flex-col justify-between"
        >
          <div>
            <div className="w-10 h-10 rounded-lg bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400 mb-3 group-hover:scale-105 transition-transform">
              <Activity className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-mono uppercase tracking-wider text-rose-400">PHASES 7, 8, 9 & 10</span>
            <h3 className="text-base font-bold text-white mt-0.5">FEA & Modal Simulation</h3>
            <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
              Tetrahedral meshing, Von Mises stress (67.6 MPa), deflection (0.82 mm), and natural frequency (84.5 Hz).
            </p>
          </div>
          <div className="flex items-center justify-between text-xs font-semibold text-rose-400 mt-4 pt-3 border-t border-slate-800">
            <span>View FEA Results</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

        {/* Card 4: Design Optimisation */}
        <div
          onClick={() => onNavigateToPhase(11)}
          className="group cursor-pointer bg-slate-900 border border-slate-800 hover:border-cyan-500/60 rounded-xl p-5 transition-all shadow-lg hover:shadow-cyan-500/10 flex flex-col justify-between"
        >
          <div>
            <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-3 group-hover:scale-105 transition-transform">
              <Sparkles className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400">PHASE 11</span>
            <h3 className="text-base font-bold text-white mt-0.5">Design Optimisation</h3>
            <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
              Weight reduction pocketing (-28.1% mass savings), R4.5 mm root fillet enlargement, and stiffness retention.
            </p>
          </div>
          <div className="flex items-center justify-between text-xs font-semibold text-emerald-400 mt-4 pt-3 border-t border-slate-800">
            <span>Compare Models</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>

      {/* ============================================================== */}
      {/* IEM ESCME192 ASSIGNMENT SPECIFICATIONS PANEL */}
      {/* ============================================================== */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl flex flex-col gap-4">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3">
          <div>
            <h2 className="text-sm font-bold uppercase tracking-wider text-cyan-400 font-mono flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-cyan-400" />
              Verified Project Engineering Specifications (ESCME192)
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Standard parametric constraints enforced across all CAD sketches and FEA studies
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            STANDARDS COMPLIANT (ISO / IEM)
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 text-xs">
          <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
            <span className="text-[10px] text-slate-400 font-mono block">CANTILEVER LENGTH</span>
            <span className="text-base font-bold text-white font-mono">200.0 mm</span>
            <span className="text-[10px] text-slate-500 block">Root clamp to motor center</span>
          </div>

          <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
            <span className="text-[10px] text-slate-400 font-mono block">ARM CROSS SECTION</span>
            <span className="text-base font-bold text-white font-mono">20 × 5 mm</span>
            <span className="text-[10px] text-slate-500 block">Area = 100 mm²</span>
          </div>

          <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
            <span className="text-[10px] text-slate-400 font-mono block">SELECTED ALLOY</span>
            <span className="text-base font-bold text-cyan-400 font-mono">Al 6061-T6</span>
            <span className="text-[10px] text-slate-500 block">Yield = 276.0 MPa</span>
          </div>

          <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
            <span className="text-[10px] text-slate-400 font-mono block">PEAK COMBINED LOADS</span>
            <span className="text-base font-bold text-amber-400 font-mono">50 N / 100 N</span>
            <span className="text-[10px] text-slate-500 block">Aero Lift / Centrifugal</span>
          </div>

          <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
            <span className="text-[10px] text-slate-400 font-mono block">PEAK FEA STRESS</span>
            <span className="text-base font-bold text-rose-400 font-mono">67.6 MPa</span>
            <span className="text-[10px] text-slate-500 block">At root fillet (URES 0.82mm)</span>
          </div>

          <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
            <span className="text-[10px] text-slate-400 font-mono block">FACTOR OF SAFETY</span>
            <span className="text-base font-bold text-emerald-400 font-mono">4.08</span>
            <span className="text-[10px] text-emerald-500 block">Safe (&gt; 1.5 requirement)</span>
          </div>
        </div>
      </div>

      {/* ============================================================== */}
      {/* 12-PHASE WORKFLOW TRACKER LIST */}
      {/* ============================================================== */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl flex flex-col gap-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div>
            <h2 className="text-sm font-bold uppercase tracking-wider text-cyan-400 font-mono">
              Complete 12-Phase Engineering Curriculum Tracker
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Click any phase to open its SolidWorks step-by-step tutorial, diagrams & checklists
            </p>
          </div>
          <button
            onClick={() => onNavigateToTab('workflow')}
            className="text-xs font-mono text-cyan-300 hover:text-cyan-200 flex items-center gap-1"
          >
            Open Stepper <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {WORKFLOW_PHASES.map((phase) => {
            const isDone = completedPhases.includes(phase.id);
            return (
              <div
                key={phase.id}
                onClick={() => onNavigateToPhase(phase.id)}
                className={`p-3.5 rounded-lg border cursor-pointer transition-all flex flex-col justify-between gap-2.5 ${
                  isDone
                    ? 'bg-slate-950/70 border-emerald-500/40 hover:border-emerald-400'
                    : 'bg-slate-950/50 border-slate-800 hover:border-cyan-500/50'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span
                      className={`w-6 h-6 rounded-full flex items-center justify-center font-mono text-xs font-bold ${
                        isDone
                          ? 'bg-emerald-500 text-slate-950'
                          : 'bg-slate-800 text-slate-300 border border-slate-700'
                      }`}
                    >
                      {isDone ? '✓' : phase.id}
                    </span>
                    <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider">
                      PHASE {phase.id}
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-slate-500">
                    {phase.estimatedMinutes}m
                  </span>
                </div>

                <div>
                  <h4 className="text-xs font-bold text-white leading-snug">{phase.title}</h4>
                  <p className="text-[11px] text-slate-400 mt-0.5 line-clamp-1">{phase.subtitle}</p>
                </div>

                <div className="flex items-center justify-between text-[10px] font-mono pt-2 border-t border-slate-800/80">
                  <span className="text-slate-500">{phase.category}</span>
                  <span className={isDone ? 'text-emerald-400 font-semibold' : 'text-slate-400'}>
                    {isDone ? 'Completed' : 'Start Study →'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
