import React, { useState } from 'react';
import { Grid, Sliders, CheckCircle2, TrendingDown } from 'lucide-react';

export const MeshDiagram: React.FC = () => {
  const [meshDensity, setMeshDensity] = useState<'coarse' | 'refined' | 'adaptive'>('adaptive');
  const [showNodes, setShowNodes] = useState(true);

  // Mesh stats based on density
  const meshStats = {
    coarse: {
      elementSize: '4.5 mm',
      totalElements: 3420,
      totalNodes: 5890,
      solveTime: '1.8 s',
      peakStress: '58.2 MPa',
      accuracy: 'Moderate (Underestimates stress peak due to shear locking)'
    },
    refined: {
      elementSize: '2.0 mm',
      totalElements: 18450,
      totalNodes: 29800,
      solveTime: '7.4 s',
      peakStress: '66.8 MPa',
      accuracy: 'High (Captures hole stress concentrations within 2%)'
    },
    adaptive: {
      elementSize: '3.0 mm (Global) / 0.8 mm (Fillets)',
      totalElements: 24180,
      totalNodes: 38650,
      solveTime: '9.2 s',
      peakStress: '67.6 MPa',
      accuracy: 'Asymptotically Converged (< 0.5% error, optimal for student report)'
    }
  }[meshDensity];

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-col gap-4 shadow-xl">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3">
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-cyan-400 flex items-center gap-2">
            <Grid className="w-4 h-4 text-cyan-400" />
            Figure 8.1: Finite Element Mesh Discretization & Refinement
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            10-Node Parabolic Tetrahedral Solid Elements (SOLID187 / SolidWorks High Quality)
          </p>
        </div>

        {/* Mesh Level Selectors */}
        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex bg-slate-800 p-0.5 rounded border border-slate-700 text-xs">
            <button
              onClick={() => setMeshDensity('coarse')}
              className={`px-2.5 py-1 rounded transition-colors ${
                meshDensity === 'coarse' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-300'
              }`}
            >
              Coarse (Draft)
            </button>
            <button
              onClick={() => setMeshDensity('refined')}
              className={`px-2.5 py-1 rounded transition-colors ${
                meshDensity === 'refined' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-300'
              }`}
            >
              Standard (2.0mm)
            </button>
            <button
              onClick={() => setMeshDensity('adaptive')}
              className={`px-2.5 py-1 rounded transition-colors ${
                meshDensity === 'adaptive' ? 'bg-emerald-500 text-slate-950 font-bold' : 'text-slate-300'
              }`}
            >
              Curvature-Adaptive
            </button>
          </div>

          <button
            onClick={() => setShowNodes(!showNodes)}
            className={`px-2 py-1 text-xs rounded border transition-colors ${
              showNodes ? 'bg-cyan-500/20 border-cyan-500/50 text-cyan-300' : 'bg-slate-800 border-slate-700 text-slate-400'
            }`}
          >
            {showNodes ? 'Hide Nodes' : 'Show Nodes'}
          </button>
        </div>
      </div>

      {/* Mesh Visual Canvas */}
      <div className="relative w-full overflow-hidden bg-slate-950 rounded-lg border border-slate-800 p-2 blueprint-grid">
        <svg viewBox="0 0 880 320" className="w-full h-auto max-h-[380px]">
          <defs>
            <marker id="meshArrow" markerWidth="6" markerHeight="6" refX="4" refY="3" orient="auto">
              <path d="M0,0 L0,6 L6,3 z" fill="#06b6d4" />
            </marker>
          </defs>

          {/* Root Section with Fillet & Holes */}
          <g transform="translate(60, 40)">
            {/* Outline Contour */}
            <path
              d="M 40,30 L 100,30 Q 120,30 135,60 L 680,60 A 30 30 0 0 1 710,90 A 30 30 0 0 1 680,120 L 135,120 Q 120,150 100,150 L 40,150 Z"
              fill="#0f172a"
              stroke="#38bdf8"
              strokeWidth="2"
            />

            {/* Triangular Wireframe Mesh Overlay */}
            {meshDensity === 'coarse' && (
              <g stroke="#0284c7" strokeWidth="0.8" fill="none" opacity="0.85">
                {/* Coarse triangles */}
                {Array.from({ length: 16 }).map((_, i) => (
                  <g key={i}>
                    <line x1={40 + i * 42} y1="60" x2={60 + i * 42} y2="120" />
                    <line x1={60 + i * 42} y1="60" x2={40 + i * 42} y2="120" />
                    <line x1={40 + i * 42} y1="90" x2={82 + i * 42} y2="90" />
                  </g>
                ))}
              </g>
            )}

            {meshDensity === 'refined' && (
              <g stroke="#38bdf8" strokeWidth="0.6" fill="none" opacity="0.85">
                {/* Refined dense triangles */}
                {Array.from({ length: 32 }).map((_, i) => (
                  <g key={i}>
                    <line x1={40 + i * 21} y1="60" x2={50 + i * 21} y2="90" />
                    <line x1={50 + i * 21} y1="90" x2={40 + i * 21} y2="120" />
                    <line x1={50 + i * 21} y1="60" x2={40 + i * 21} y2="90" />
                    <line x1={40 + i * 21} y1="75" x2={61 + i * 21} y2="75" />
                    <line x1={40 + i * 21} y1="105" x2={61 + i * 21} y2="105" />
                  </g>
                ))}
              </g>
            )}

            {meshDensity === 'adaptive' && (
              <g>
                {/* High density clusters at root fillets (0.8 mm) */}
                <g stroke="#34d399" strokeWidth="0.7" fill="none" opacity="0.95">
                  {/* Fillet upper cluster */}
                  {Array.from({ length: 12 }).map((_, i) =>
                    Array.from({ length: 6 }).map((_, j) => (
                      <polygon
                        key={`fu-${i}-${j}`}
                        points={`${90 + i * 5},${32 + j * 5} ${95 + i * 5},${32 + j * 5} ${92.5 + i * 5},${37 + j * 5}`}
                      />
                    ))
                  )}
                  {/* Fillet lower cluster */}
                  {Array.from({ length: 12 }).map((_, i) =>
                    Array.from({ length: 6 }).map((_, j) => (
                      <polygon
                        key={`fl-${i}-${j}`}
                        points={`${90 + i * 5},${120 + j * 5} ${95 + i * 5},${120 + j * 5} ${92.5 + i * 5},${125 + j * 5}`}
                      />
                    ))
                  )}
                </g>

                {/* Medium regular mesh along beam body (3.0 mm) */}
                <g stroke="#38bdf8" strokeWidth="0.6" fill="none" opacity="0.75">
                  {Array.from({ length: 26 }).map((_, i) => (
                    <g key={i}>
                      <line x1={155 + i * 21} y1="60" x2={165 + i * 21} y2="90" />
                      <line x1={165 + i * 21} y1="90" x2={155 + i * 21} y2="120" />
                      <line x1={165 + i * 21} y1="60" x2={155 + i * 21} y2="90" />
                      <line x1={155 + i * 21} y1="90" x2={176 + i * 21} y2="90" />
                    </g>
                  ))}
                </g>
              </g>
            )}

            {/* Solid Chassis Holes */}
            <circle cx="70" cy="70" r="7" fill="#020617" stroke="#cbd5e1" strokeWidth="1.2" />
            <circle cx="70" cy="110" r="7" fill="#020617" stroke="#cbd5e1" strokeWidth="1.2" />

            {/* Motor Tip Holes */}
            <circle cx="680" cy="90" r="14" fill="#020617" stroke="#cbd5e1" strokeWidth="1.2" />
            <circle cx="680" cy="90" r="4" fill="#020617" stroke="#38bdf8" strokeWidth="1" />

            {/* Nodes dots */}
            {showNodes && (
              <g fill="#38bdf8">
                {[60, 90, 120, 150, 200, 260, 320, 380, 440, 500, 560, 620, 680].map((x) =>
                  [60, 90, 120].map((y) => (
                    <circle key={`n-${x}-${y}`} cx={x} cy={y} r="1.5" />
                  ))
                )}
              </g>
            )}

            {/* Curvature Adaptive Mesh Callout */}
            {meshDensity === 'adaptive' && (
              <g transform="translate(130, 0)">
                <line x1="0" y1="28" x2="40" y2="2" stroke="#34d399" strokeWidth="1.2" markerEnd="url(#meshArrow)" />
                <rect x="45" y="-12" width="220" height="24" rx="4" fill="#064e3b" stroke="#34d399" strokeWidth="1" />
                <text x="155" y="4" fill="#a7f3d0" fontSize="10" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
                  LOCAL MESH CONTROL: 0.8 mm (ROOT FILLET)
                </text>
              </g>
            )}
          </g>

          {/* Mesh Convergence Graph (Bottom Section) */}
          <g transform="translate(100, 230)" className="font-mono text-[9px]">
            {/* Axis */}
            <line x1="0" y1="50" x2="680" y2="50" stroke="#475569" strokeWidth="1" />
            <line x1="0" y1="0" x2="0" y2="50" stroke="#475569" strokeWidth="1" />
            <text x="340" y="68" fill="#94a3b8" textAnchor="middle">TOTAL FEA NODES (DEGREES OF FREEDOM)</text>
            <text x="-10" y="10" fill="#94a3b8" textAnchor="end">VON MISES PEAK (MPa)</text>

            {/* Convergence asymptotic curve */}
            <path
              d="M 40,42 Q 180,18 360,11 T 660,10"
              fill="none"
              stroke="#06b6d4"
              strokeWidth="2.5"
            />
            {/* Target 67.6 MPa horizontal dashed guideline */}
            <line x1="0" y1="10" x2="680" y2="10" stroke="#22c55e" strokeWidth="1" strokeDasharray="4 3" />
            <text x="690" y="13" fill="#22c55e" fontWeight="bold">CONVERGED ASYMPTOTE: 67.6 MPa</text>

            {/* Plotted Study Points */}
            <circle cx="90" cy="38" r="4" fill="#f59e0b" />
            <text x="90" y="32" fill="#f59e0b" textAnchor="middle">Coarse: 58.2 MPa</text>

            <circle cx="340" cy="14" r="4" fill="#06b6d4" />
            <text x="340" y="4" fill="#38bdf8" textAnchor="middle">Standard: 66.8 MPa</text>

            <circle cx="580" cy="10" r="4.5" fill="#22c55e" stroke="#ffffff" strokeWidth="1" />
            <text x="580" y="-2" fill="#86efac" fontWeight="bold" textAnchor="middle">Adaptive: 67.6 MPa (Optimal)</text>
          </g>
        </svg>
      </div>

      {/* Mesh Quality & Performance Matrix */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
        <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800">
          <span className="text-[10px] text-slate-400 font-mono block">ELEMENT SIZE</span>
          <span className="text-sm font-bold text-cyan-400 font-mono">{meshStats.elementSize}</span>
        </div>
        <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800">
          <span className="text-[10px] text-slate-400 font-mono block">NODES / ELEMENTS</span>
          <span className="text-sm font-bold text-cyan-400 font-mono">
            {meshStats.totalNodes.toLocaleString()} / {meshStats.totalElements.toLocaleString()}
          </span>
        </div>
        <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800">
          <span className="text-[10px] text-slate-400 font-mono block">ESTIMATED SOLVE TIME</span>
          <span className="text-sm font-bold text-emerald-400 font-mono">{meshStats.solveTime}</span>
        </div>
        <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800">
          <span className="text-[10px] text-slate-400 font-mono block">PEAK VON MISES STRESS</span>
          <span className="text-sm font-bold text-amber-400 font-mono">{meshStats.peakStress}</span>
        </div>
      </div>
    </div>
  );
};
