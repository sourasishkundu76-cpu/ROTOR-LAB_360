import React, { useState } from 'react';
import { Eye, EyeOff, Ruler, FileText, Download } from 'lucide-react';

export const RotorArmBlueprint: React.FC = () => {
  const [showDimensions, setShowDimensions] = useState(true);
  const [showTolerances, setShowTolerances] = useState(true);
  const [activeView, setActiveView] = useState<'both' | 'top' | 'side'>('both');

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-col gap-4 shadow-xl">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3">
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-cyan-400 flex items-center gap-2">
            <Ruler className="w-4 h-4 text-cyan-400" />
            Figure 2.1: Orthographic Engineering Drawing (IEM ESCME192 Spec)
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            First-Angle Projection: Dimensioned Top View & Side Elevation with standard ISO 2768-m tolerances
          </p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex bg-slate-800 p-0.5 rounded border border-slate-700 text-xs">
            <button
              onClick={() => setActiveView('both')}
              className={`px-2.5 py-1 rounded transition-colors ${
                activeView === 'both' ? 'bg-cyan-500 text-slate-950 font-semibold' : 'text-slate-300 hover:text-white'
              }`}
            >
              Both Views
            </button>
            <button
              onClick={() => setActiveView('top')}
              className={`px-2.5 py-1 rounded transition-colors ${
                activeView === 'top' ? 'bg-cyan-500 text-slate-950 font-semibold' : 'text-slate-300 hover:text-white'
              }`}
            >
              Top View
            </button>
            <button
              onClick={() => setActiveView('side')}
              className={`px-2.5 py-1 rounded transition-colors ${
                activeView === 'side' ? 'bg-cyan-500 text-slate-950 font-semibold' : 'text-slate-300 hover:text-white'
              }`}
            >
              Side Section
            </button>
          </div>
          <button
            onClick={() => setShowDimensions(!showDimensions)}
            className={`px-2.5 py-1 text-xs rounded border transition-colors flex items-center gap-1.5 ${
              showDimensions ? 'bg-cyan-500/20 border-cyan-500/50 text-cyan-300' : 'bg-slate-800 border-slate-700 text-slate-400'
            }`}
          >
            {showDimensions ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
            Dimensions
          </button>
          <button
            onClick={() => setShowTolerances(!showTolerances)}
            className={`px-2.5 py-1 text-xs rounded border transition-colors flex items-center gap-1.5 ${
              showTolerances ? 'bg-indigo-500/20 border-indigo-500/50 text-indigo-300' : 'bg-slate-800 border-slate-700 text-slate-400'
            }`}
          >
            ± Tolerances
          </button>
        </div>
      </div>

      {/* Blueprint Drawing Sheet SVG */}
      <div className="relative w-full overflow-hidden bg-slate-950 rounded-lg border-2 border-cyan-900/40 p-2 blueprint-grid">
        {/* Engineering Title Block Header */}
        <div className="absolute top-3 left-4 flex items-center gap-3 text-[10px] font-mono text-cyan-500/80 pointer-events-none">
          <span>PROJECT: IEM-ESCME192</span>
          <span>|</span>
          <span>SCALE: 1:2 (MM)</span>
          <span>|</span>
          <span>PROJECTION: 1ST ANGLE</span>
          <span>|</span>
          <span>MATERIAL: AL 6061-T6</span>
        </div>

        <svg
          viewBox="0 0 920 480"
          className="w-full h-auto max-h-[520px]"
        >
          <defs>
            {/* Dimension Arrow Markers */}
            <marker id="dimArrowStart" markerWidth="8" markerHeight="8" refX="2" refY="4" orient="auto">
              <path d="M7,1 L1,4 L7,7 z" fill="#06b6d4" />
            </marker>
            <marker id="dimArrowEnd" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
              <path d="M1,1 L7,4 L1,7 z" fill="#06b6d4" />
            </marker>
            <marker id="dimArrowGreenStart" markerWidth="8" markerHeight="8" refX="2" refY="4" orient="auto">
              <path d="M7,1 L1,4 L7,7 z" fill="#10b981" />
            </marker>
            <marker id="dimArrowGreenEnd" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
              <path d="M1,1 L7,4 L1,7 z" fill="#10b981" />
            </marker>

            {/* Crosshatch Pattern for Side View Section */}
            <pattern id="sectionHatch" width="8" height="8" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
              <line x1="0" y1="0" x2="0" y2="8" stroke="#38bdf8" strokeWidth="1" strokeOpacity="0.4" />
            </pattern>
          </defs>

          {/* ============================================================== */}
          {/* VIEW 1: TOP ORTHOGRAPHIC VIEW (X-Y Plane) */}
          {/* ============================================================== */}
          {(activeView === 'both' || activeView === 'top') && (
            <g transform="translate(60, 60)">
              {/* View Label */}
              <text x="380" y="25" fill="#38bdf8" fontSize="12" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
                TOP VIEW (PLAN PROJECTION)
              </text>

              {/* Centerline */}
              <line x1="20" y1="120" x2="740" y2="120" stroke="#f43f5e" strokeWidth="0.8" strokeDasharray="12 3 3 3" />
              <text x="748" y="123" fill="#f43f5e" fontSize="9" fontFamily="monospace">CL</text>

              {/* Base Arm Solid Geometry */}
              {/* Arm profile with root tab, 20mm beam, blend fillets, and circular pad */}
              <path
                d={`
                  M 70, 70 
                  L 120, 70 
                  Q 135, 70 145, 95
                  L 660, 95
                  A 48 48 0 0 1 708, 120
                  A 48 48 0 0 1 660, 145
                  L 145, 145
                  Q 135, 170 120, 170
                  L 70, 170
                  Z
                `}
                fill="#1e293b"
                stroke="#38bdf8"
                strokeWidth="2"
              />

              {/* Root Blend Fillet Visual Radius Callouts (R3 mm) */}
              <path d="M 125,70 Q 135,70 145,95" fill="none" stroke="#f59e0b" strokeWidth="1.8" />
              <path d="M 125,170 Q 135,170 145,145" fill="none" stroke="#f59e0b" strokeWidth="1.8" />

              {/* Motor Pad Distal Geometry */}
              <circle cx="680" cy="120" r="48" fill="#0f172a" stroke="#38bdf8" strokeWidth="1.5" />
              
              {/* Motor Shaft Center Hole (Dia 6mm -> drawn r=10) */}
              <circle cx="680" cy="120" r="10" fill="#020617" stroke="#cbd5e1" strokeWidth="1" />
              <line x1="662" y1="120" x2="698" y2="120" stroke="#64748b" strokeWidth="0.6" strokeDasharray="2 2" />
              <line x1="680" y1="102" x2="680" y2="138" stroke="#64748b" strokeWidth="0.6" strokeDasharray="2 2" />

              {/* Motor 16mm & 19mm Pitch Circle Diameters (PCD) */}
              <circle cx="680" cy="120" r="26" fill="none" stroke="#64748b" strokeWidth="0.7" strokeDasharray="4 2" />
              <circle cx="680" cy="120" r="32" fill="none" stroke="#64748b" strokeWidth="0.7" strokeDasharray="4 2" />

              {/* 4x Motor Mounting Holes (M3 clearance holes) on 16mm PCD */}
              <circle cx="654" cy="120" r="5" fill="#020617" stroke="#e2e8f0" strokeWidth="1" />
              <circle cx="706" cy="120" r="5" fill="#020617" stroke="#e2e8f0" strokeWidth="1" />
              <circle cx="680" cy="94" r="5" fill="#020617" stroke="#e2e8f0" strokeWidth="1" />
              <circle cx="680" cy="146" r="5" fill="#020617" stroke="#e2e8f0" strokeWidth="1" />

              {/* Root Chassis Fastener Holes (2x M3 holes, 25mm apart) */}
              <circle cx="95" cy="95" r="5" fill="#020617" stroke="#e2e8f0" strokeWidth="1" />
              <circle cx="95" cy="145" r="5" fill="#020617" stroke="#e2e8f0" strokeWidth="1" />
              <line x1="95" y1="80" x2="95" y2="160" stroke="#f43f5e" strokeWidth="0.6" strokeDasharray="4 2" />

              {/* ================= DIMENSION CALLOUTS ================= */}
              {showDimensions && (
                <g className="text-[10px] font-mono fill-cyan-400 select-none">
                  {/* Overall Length Dimension (200.0 mm) */}
                  <line x1="70" y1="45" x2="70" y2="68" stroke="#06b6d4" strokeWidth="0.7" />
                  <line x1="680" y1="45" x2="680" y2="68" stroke="#06b6d4" strokeWidth="0.7" />
                  <line
                    x1="70"
                    y1="50"
                    x2="680"
                    y2="50"
                    stroke="#06b6d4"
                    strokeWidth="1.2"
                    markerStart="url(#dimArrowStart)"
                    markerEnd="url(#dimArrowEnd)"
                  />
                  <rect x="330" y="40" width="105" height="18" fill="#090d16" stroke="#06b6d4" strokeWidth="0.6" rx="2" />
                  <text x="382" y="53" textAnchor="middle" fontWeight="bold">
                    200.00 mm {showTolerances ? '±0.15' : ''}
                  </text>

                  {/* Arm Width Dimension (20.0 mm) */}
                  <line x1="390" y1="95" x2="420" y2="95" stroke="#06b6d4" strokeWidth="0.7" />
                  <line x1="390" y1="145" x2="420" y2="145" stroke="#06b6d4" strokeWidth="0.7" />
                  <line
                    x1="410"
                    y1="95"
                    x2="410"
                    y2="145"
                    stroke="#06b6d4"
                    strokeWidth="1.2"
                    markerStart="url(#dimArrowStart)"
                    markerEnd="url(#dimArrowEnd)"
                  />
                  <rect x="415" y="112" width="75" height="16" fill="#090d16" stroke="#06b6d4" strokeWidth="0.6" rx="2" />
                  <text x="452" y="124" textAnchor="middle" fontWeight="bold">
                    20.0 mm
                  </text>

                  {/* Root Width Dimension (40.0 mm) */}
                  <line x1="50" y1="70" x2="70" y2="70" stroke="#06b6d4" strokeWidth="0.7" />
                  <line x1="50" y1="170" x2="70" y2="170" stroke="#06b6d4" strokeWidth="0.7" />
                  <line
                    x1="55"
                    y1="70"
                    x2="55"
                    y2="170"
                    stroke="#06b6d4"
                    strokeWidth="1.2"
                    markerStart="url(#dimArrowStart)"
                    markerEnd="url(#dimArrowEnd)"
                  />
                  <text x="48" y="123" textAnchor="end" fontWeight="bold">
                    40.0 mm
                  </text>

                  {/* Motor Pad Outer Diameter (Ø32 mm) */}
                  <line x1="728" y1="120" x2="770" y2="85" stroke="#06b6d4" strokeWidth="0.8" />
                  <line x1="770" y1="85" x2="820" y2="85" stroke="#06b6d4" strokeWidth="0.8" />
                  <text x="772" y="80" textAnchor="start" fontWeight="bold">
                    PAD Ø32.0 mm (R16)
                  </text>

                  {/* Motor PCD & Hole Specification Callout */}
                  <line x1="680" y1="94" x2="730" y2="60" stroke="#10b981" strokeWidth="0.8" />
                  <line x1="730" y1="60" x2="840" y2="60" stroke="#10b981" strokeWidth="0.8" />
                  <text x="732" y="55" fill="#10b981" textAnchor="start" fontWeight="bold">
                    4x M3 (Ø3.4 THRU) ON PCD Ø16.0
                  </text>

                  {/* Shaft Clearance Bore Callout */}
                  <line x1="680" y1="120" x2="740" y2="160" stroke="#f59e0b" strokeWidth="0.8" />
                  <line x1="740" y1="160" x2="820" y2="160" stroke="#f59e0b" strokeWidth="0.8" />
                  <text x="742" y="156" fill="#f59e0b" textAnchor="start" fontWeight="bold">
                    SHAFT BORE Ø6.0 mm
                  </text>

                  {/* Root Blend Fillet (R3.0 mm) Callout */}
                  <line x1="135" y1="70" x2="160" y2="35" stroke="#f59e0b" strokeWidth="0.8" />
                  <line x1="160" y1="35" x2="210" y2="35" stroke="#f59e0b" strokeWidth="0.8" />
                  <text x="162" y="30" fill="#f59e0b" textAnchor="start" fontWeight="bold">
                    FILLET R3.0 mm (TYP)
                  </text>

                  {/* Root Hole Center-to-Center Distance (25.0 mm) */}
                  <line x1="95" y1="172" x2="95" y2="195" stroke="#06b6d4" strokeWidth="0.7" />
                  <line x1="70" y1="172" x2="70" y2="195" stroke="#06b6d4" strokeWidth="0.7" />
                  <line
                    x1="70"
                    y1="190"
                    x2="95"
                    y2="190"
                    stroke="#06b6d4"
                    strokeWidth="1.2"
                    markerStart="url(#dimArrowStart)"
                    markerEnd="url(#dimArrowEnd)"
                  />
                  <text x="82" y="205" textAnchor="middle" fontWeight="bold">
                    25.0 mm
                  </text>
                </g>
              )}
            </g>
          )}

          {/* ============================================================== */}
          {/* VIEW 2: SIDE SECTION ELEVATION (X-Z Cross Section) */}
          {/* ============================================================== */}
          {(activeView === 'both' || activeView === 'side') && (
            <g transform={`translate(60, ${activeView === 'side' ? 120 : 310})`}>
              {/* View Label */}
              <text x="380" y="15" fill="#38bdf8" fontSize="12" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
                SIDE ELEVATION SECTION A-A (SOLID THICKNESS)
              </text>

              {/* Side View Arm Profile */}
              {/* Root Tab -> Taper/Step -> Arm Beam -> Motor Pad */}
              <rect
                x="70"
                y="35"
                width="658"
                height="30"
                fill="url(#sectionHatch)"
                stroke="#38bdf8"
                strokeWidth="2"
              />

              {/* Root Mount Through-Hole Section Voids (dashed hidden lines) */}
              <rect x="92" y="35" width="6" height="30" fill="#020617" stroke="#cbd5e1" strokeWidth="1" />
              
              {/* Motor Pad Through-Hole Section Voids */}
              <rect x="652" y="35" width="6" height="30" fill="#020617" stroke="#cbd5e1" strokeWidth="1" />
              <rect x="674" y="35" width="12" height="30" fill="#020617" stroke="#cbd5e1" strokeWidth="1" />
              <rect x="704" y="35" width="6" height="30" fill="#020617" stroke="#cbd5e1" strokeWidth="1" />

              {/* Chamfer Callouts on Top Perimeter (0.5 mm x 45°) */}
              <polygon points="70,35 75,35 70,40" fill="#090d16" />
              <polygon points="728,35 723,35 728,40" fill="#090d16" />

              {/* Neutral Bending Axis (Z-axis Centerline) */}
              <line x1="50" y1="50" x2="745" y2="50" stroke="#f43f5e" strokeWidth="0.8" strokeDasharray="10 3 2 3" />
              <text x="750" y="53" fill="#f43f5e" fontSize="9" fontFamily="monospace">N.A.</text>

              {/* Thickness Dimension Callout (5.0 mm) */}
              {showDimensions && (
                <g className="text-[10px] font-mono fill-cyan-400 select-none">
                  <line x1="45" y1="35" x2="70" y2="35" stroke="#06b6d4" strokeWidth="0.7" />
                  <line x1="45" y1="65" x2="70" y2="65" stroke="#06b6d4" strokeWidth="0.7" />
                  <line
                    x1="52"
                    y1="35"
                    x2="52"
                    y2="65"
                    stroke="#06b6d4"
                    strokeWidth="1.2"
                    markerStart="url(#dimArrowStart)"
                    markerEnd="url(#dimArrowEnd)"
                  />
                  <rect x="0" y="42" width="48" height="16" fill="#090d16" stroke="#06b6d4" strokeWidth="0.6" rx="2" />
                  <text x="24" y="54" textAnchor="middle" fontWeight="bold">
                    5.0 mm
                  </text>

                  {/* Chamfer Note */}
                  <line x1="72" y1="36" x2="90" y2="10" stroke="#f59e0b" strokeWidth="0.8" />
                  <line x1="90" y1="10" x2="160" y2="10" stroke="#f59e0b" strokeWidth="0.8" />
                  <text x="92" y="6" fill="#f59e0b" textAnchor="start" fontWeight="bold">
                    CHAMFER 0.5 x 45° (ALL EDGES)
                  </text>
                </g>
              )}
            </g>
          )}

          {/* Drawing Title & Certification Block (Bottom Right Corner) */}
          <g transform="translate(620, 395)" className="select-none font-mono text-[9px]">
            <rect x="0" y="0" width="280" height="70" fill="#090d16" stroke="#334155" strokeWidth="1" />
            <line x1="0" y1="22" x2="280" y2="22" stroke="#334155" strokeWidth="0.8" />
            <line x1="0" y1="46" x2="280" y2="46" stroke="#334155" strokeWidth="0.8" />
            <line x1="140" y1="22" x2="140" y2="70" stroke="#334155" strokeWidth="0.8" />

            <text x="10" y="15" fill="#38bdf8" fontWeight="bold" fontSize="10">
              IEM ESCME192: DRONE ROTOR ARM (6061-T6)
            </text>
            <text x="10" y="36" fill="#94a3b8">DWG NO: RA-200-20-05-A</text>
            <text x="150" y="36" fill="#94a3b8">REV: 02 (FINAL CAD)</text>
            <text x="10" y="60" fill="#94a3b8">SHEET 1 OF 1</text>
            <text x="150" y="60" fill="#22c55e" fontWeight="bold">STATUS: APPROVED FOR FEA</text>
          </g>
        </svg>
      </div>

      {/* Quick Dimension Reference Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
        <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800">
          <span className="text-[10px] text-slate-400 font-mono block">CANTILEVER SPAN</span>
          <span className="text-base font-bold text-cyan-400 font-mono">200.0 mm</span>
          <span className="text-[10px] text-slate-500 block">Root clamp to motor center</span>
        </div>
        <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800">
          <span className="text-[10px] text-slate-400 font-mono block">CROSS SECTION</span>
          <span className="text-base font-bold text-cyan-400 font-mono">20 × 5 mm</span>
          <span className="text-[10px] text-slate-500 block">Area = 100.0 mm²</span>
        </div>
        <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800">
          <span className="text-[10px] text-slate-400 font-mono block">MOTOR INTERFACE</span>
          <span className="text-base font-bold text-cyan-400 font-mono">4× M3 @ PCD 16</span>
          <span className="text-[10px] text-slate-500 block">Plus 6 mm center shaft bore</span>
        </div>
        <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800">
          <span className="text-[10px] text-slate-400 font-mono block">ROOT BLEND FILLET</span>
          <span className="text-base font-bold text-amber-400 font-mono">R3.0 mm</span>
          <span className="text-[10px] text-slate-500 block">Reduces stress conc. Kt = 1.4</span>
        </div>
      </div>
    </div>
  );
};
