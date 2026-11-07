import React, { useState } from 'react';
import { Layers, Sliders, Play, RotateCcw } from 'lucide-react';

export const ExplodedAssemblyDiagram: React.FC = () => {
  const [explodeFactor, setExplodeFactor] = useState<number>(65); // 0% (assembled) to 100% (fully exploded)
  const [isAnimating, setIsAnimating] = useState(false);

  // Toggle smooth auto-animation
  const toggleAnimation = () => {
    if (isAnimating) {
      setIsAnimating(false);
      return;
    }
    setIsAnimating(true);
    let direction = 1;
    const interval = setInterval(() => {
      setExplodeFactor((prev) => {
        if (prev >= 100) direction = -1;
        if (prev <= 0) direction = 1;
        return prev + direction * 2;
      });
    }, 40);

    setTimeout(() => {
      clearInterval(interval);
      setIsAnimating(false);
    }, 6000);
  };

  const f = explodeFactor / 100.0;

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-col gap-4 shadow-xl">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3">
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-cyan-400 flex items-center gap-2">
            <Layers className="w-4 h-4 text-cyan-400" />
            Figure 4.1: Exploded View Assembly & Mate Hierarchy
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Parametric disassembly of quadcopter stack, standoffs, 4 arms & BLDC motor assemblies
          </p>
        </div>

        {/* Explode Slider Control */}
        <div className="flex items-center gap-3">
          <button
            onClick={toggleAnimation}
            className={`px-2.5 py-1 text-xs rounded border transition-colors flex items-center gap-1.5 ${
              isAnimating ? 'bg-amber-500/20 border-amber-500 text-amber-300' : 'bg-slate-800 border-slate-700 text-slate-300 hover:text-white'
            }`}
          >
            <Play className="w-3.5 h-3.5" />
            {isAnimating ? 'Pause' : 'Animate'}
          </button>
          
          <div className="flex items-center gap-2 bg-slate-950 px-3 py-1 rounded border border-slate-800">
            <Sliders className="w-3.5 h-3.5 text-cyan-400" />
            <span className="text-[10px] font-mono text-slate-400">DISASSEMBLY:</span>
            <input
              type="range"
              min="0"
              max="100"
              value={explodeFactor}
              onChange={(e) => setExplodeFactor(Number(e.target.value))}
              className="w-24 sm:w-32 accent-cyan-400 cursor-pointer"
            />
            <span className="text-xs font-mono font-bold text-cyan-300 w-8">{explodeFactor}%</span>
          </div>
        </div>
      </div>

      {/* SVG Canvas for Isometric Exploded View */}
      <div className="relative w-full overflow-hidden bg-slate-950 rounded-lg border border-slate-800 p-2 blueprint-grid">
        <svg viewBox="0 0 900 460" className="w-full h-auto max-h-[500px]">
          <defs>
            <linearGradient id="carbonPlateGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#334155" />
              <stop offset="100%" stopColor="#0f172a" />
            </linearGradient>
            <linearGradient id="armAlloyGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#0284c7" />
              <stop offset="100%" stopColor="#0369a1" />
            </linearGradient>
          </defs>

          {/* Coordinate Center for Exploded Stack */}
          <g transform="translate(450, 240)">
            {/* Center Explode Route Axis (Vertical Dashed Red Line) */}
            <line
              x1="0"
              y1={-180 * f - 30}
              x2="0"
              y2={90 * f + 40}
              stroke="#ef4444"
              strokeWidth="0.8"
              strokeDasharray="4 3"
              strokeOpacity="0.7"
            />

            {/* ========================================================= */}
            {/* 1. TOP PROPELLERS & PROP ADAPTERS (Z = -170 * f) */}
            {/* ========================================================= */}
            <g transform={`translate(0, ${-160 * f - 40})`}>
              {/* Route lines down to motors */}
              <line x1="-240 - 70*f" y1="0" x2="-240 - 70*f" y2={45 * f} stroke="#38bdf8" strokeWidth="0.6" strokeDasharray="3 2" />
              <line x1="240 + 70*f" y1="0" x2="240 + 70*f" y2={45 * f} stroke="#38bdf8" strokeWidth="0.6" strokeDasharray="3 2" />

              {/* Left Propeller */}
              <g transform={`translate(${-240 - 70 * f}, 0)`}>
                <ellipse cx="0" cy="0" rx="65" ry="14" fill="#06b6d4" fillOpacity="0.3" stroke="#06b6d4" strokeWidth="1" />
                <path d="M-60,-2 C-30,-6 0,0 60,2 C30,6 0,0 -60,-2 Z" fill="#06b6d4" stroke="#ffffff" strokeWidth="0.8" />
                <circle cx="0" cy="0" r="4" fill="#ffffff" />
                <text x="0" y="-18" fill="#38bdf8" fontSize="9" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
                  1045 CCW PROP
                </text>
              </g>

              {/* Right Propeller */}
              <g transform={`translate(${240 + 70 * f}, 0)`}>
                <ellipse cx="0" cy="0" rx="65" ry="14" fill="#3b82f6" fillOpacity="0.3" stroke="#3b82f6" strokeWidth="1" />
                <path d="M-60,2 C-30,6 0,0 60,-2 C30,-6 0,0 -60,2 Z" fill="#3b82f6" stroke="#ffffff" strokeWidth="0.8" />
                <circle cx="0" cy="0" r="4" fill="#ffffff" />
                <text x="0" y="-18" fill="#60a5fa" fontSize="9" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
                  1045 CW PROP
                </text>
              </g>
            </g>

            {/* ========================================================= */}
            {/* 2. BRUSHLESS MOTORS (BLDC 2212) (Z = -105 * f) */}
            {/* ========================================================= */}
            <g transform={`translate(0, ${-105 * f - 15})`}>
              {/* Left Motor */}
              <g transform={`translate(${-240 - 70 * f}, 0)`}>
                <rect x="-14" y="-15" width="28" height="24" rx="3" fill="#1e293b" stroke="#cbd5e1" strokeWidth="1.2" />
                <circle cx="0" cy="-15" r="3" fill="#38bdf8" />
                <line x1="-12" y1="-3" x2="12" y2="-3" stroke="#f59e0b" strokeWidth="1" />
                <text x="-25" y="2" fill="#cbd5e1" fontSize="8" fontFamily="monospace" textAnchor="end">
                  BLDC 2212
                </text>
              </g>

              {/* Right Motor */}
              <g transform={`translate(${240 + 70 * f}, 0)`}>
                <rect x="-14" y="-15" width="28" height="24" rx="3" fill="#1e293b" stroke="#cbd5e1" strokeWidth="1.2" />
                <circle cx="0" cy="-15" r="3" fill="#38bdf8" />
                <line x1="-12" y1="-3" x2="12" y2="-3" stroke="#f59e0b" strokeWidth="1" />
                <text x="25" y="2" fill="#cbd5e1" fontSize="8" fontFamily="monospace" textAnchor="start">
                  BLDC 2212
                </text>
              </g>
            </g>

            {/* ========================================================= */}
            {/* 3. TOP CHASSIS BATTERY PLATE & HARDWARE (Z = -80 * f) */}
            {/* ========================================================= */}
            <g transform={`translate(0, ${-80 * f})`}>
              {/* Isometric Top Hex Plate */}
              <polygon
                points="0,-35 85,-10 85,25 0,45 -85,25 -85,-10"
                fill="url(#carbonPlateGrad)"
                stroke="#38bdf8"
                strokeWidth="1.8"
              />
              <text x="0" y="8" fill="#38bdf8" fontSize="10" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
                TOP CARBON PLATE (2.0mm)
              </text>
              <text x="120" y="8" fill="#94a3b8" fontSize="8" fontFamily="monospace">
                ← M3 STANDOFFS BOLTS
              </text>
            </g>

            {/* ========================================================= */}
            {/* 4. ALUMINIUM STANDOFF SPACERS (4x 30mm hex) (Z = -35 * f) */}
            {/* ========================================================= */}
            <g transform={`translate(0, ${-35 * f})`}>
              {[-60, -20, 20, 60].map((x) => (
                <rect key={x} x={x - 3} y="-12" width="6" height="24" fill="#e2e8f0" stroke="#0f172a" strokeWidth="0.8" rx="1" />
              ))}
              <text x="-95" y="3" fill="#cbd5e1" fontSize="8" fontFamily="monospace" textAnchor="end">
                4× AL STANDOFFS (30mm) →
              </text>
            </g>

            {/* ========================================================= */}
            {/* 5. THE 4 ROTOR ARMS (Radially expanding outward by 70 * f) */}
            {/* ========================================================= */}
            <g transform="translate(0, 0)">
              {/* LEFT ARM (Primary Analysis Object) */}
              <g transform={`translate(${-120 - 70 * f}, 0)`}>
                {/* Arm Beam */}
                <rect x="-120" y="-8" width="120" height="16" rx="2" fill="url(#armAlloyGrad)" stroke="#38bdf8" strokeWidth="1.5" />
                {/* Motor Mount Pad */}
                <circle cx="-120" cy="0" r="16" fill="#0369a1" stroke="#38bdf8" strokeWidth="1.2" />
                <circle cx="-120" cy="0" r="4" fill="#0f172a" />
                {/* Root Mount Holes */}
                <circle cx="-15" cy="-3" r="2.2" fill="#020617" stroke="#ffffff" strokeWidth="0.8" />
                <circle cx="-15" cy="3" r="2.2" fill="#020617" stroke="#ffffff" strokeWidth="0.8" />

                <text x="-60" y="-14" fill="#38bdf8" fontSize="10" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
                  ARM #1 (PRIMARY CAD SPEC)
                </text>
              </g>

              {/* RIGHT ARM */}
              <g transform={`translate(${120 + 70 * f}, 0)`}>
                <rect x="0" y="-8" width="120" height="16" rx="2" fill="url(#armAlloyGrad)" stroke="#38bdf8" strokeWidth="1.5" />
                <circle cx="120" cy="0" r="16" fill="#0369a1" stroke="#38bdf8" strokeWidth="1.2" />
                <circle cx="120" cy="0" r="4" fill="#0f172a" />
                <circle cx="15" cy="-3" r="2.2" fill="#020617" stroke="#ffffff" strokeWidth="0.8" />
                <circle cx="15" cy="3" r="2.2" fill="#020617" stroke="#ffffff" strokeWidth="0.8" />
                <text x="60" y="-14" fill="#38bdf8" fontSize="10" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
                  ARM #2
                </text>
              </g>

              {/* Central Ground Reference Hub Ring */}
              <circle cx="0" cy="0" r="18" fill="none" stroke="#22c55e" strokeWidth="1" strokeDasharray="3 3" />
            </g>

            {/* ========================================================= */}
            {/* 6. BOTTOM CHASSIS POWER PLATE (Z = +55 * f) */}
            {/* ========================================================= */}
            <g transform={`translate(0, ${55 * f})`}>
              <polygon
                points="0,-35 95,-10 95,25 0,50 -95,25 -95,-10"
                fill="url(#carbonPlateGrad)"
                stroke="#64748b"
                strokeWidth="1.5"
              />
              <text x="0" y="8" fill="#94a3b8" fontSize="10" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
                BOTTOM CHASSIS PLATE (FIXED BASE)
              </text>
            </g>

            {/* ========================================================= */}
            {/* 7. FASTENERS & LOWER CLAMPING NUTS (Z = +95 * f) */}
            {/* ========================================================= */}
            <g transform={`translate(0, ${95 * f})`}>
              {[-45, -15, 15, 45].map((x) => (
                <circle key={x} cx={x} cy="0" r="3" fill="#cbd5e1" stroke="#0f172a" strokeWidth="0.8" />
              ))}
              <text x="0" y="16" fill="#cbd5e1" fontSize="8" fontFamily="monospace" textAnchor="middle">
                M3 NYLOC NUTS & WASHERS
              </text>
            </g>
          </g>
        </svg>
      </div>

      {/* Assembly Mate Operations Table */}
      <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 text-xs">
        <span className="text-[10px] font-mono text-cyan-400 uppercase font-bold block mb-1.5">
          SOLIDWORKS MATES CHECKLIST (ASSEMBLY HIERARCHY):
        </span>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-[11px] font-mono">
          <div className="p-2 rounded bg-slate-900 border border-slate-800">
            <span className="text-cyan-300 font-bold">1. Coincident Mate</span>
            <p className="text-slate-400 mt-0.5">Bottom face of Arm #1 ↔ Top face of Bottom Chassis Plate</p>
          </div>
          <div className="p-2 rounded bg-slate-900 border border-slate-800">
            <span className="text-cyan-300 font-bold">2. Concentric Mate</span>
            <p className="text-slate-400 mt-0.5">Dual 3.4mm Arm bolt holes ↔ Chassis pre-drilled M3 holes</p>
          </div>
          <div className="p-2 rounded bg-slate-900 border border-slate-800">
            <span className="text-cyan-300 font-bold">3. Circular Component Pattern</span>
            <p className="text-slate-400 mt-0.5">Instances: 4 | Spacing: Equal 90° about central Z-axis</p>
          </div>
        </div>
      </div>
    </div>
  );
};
