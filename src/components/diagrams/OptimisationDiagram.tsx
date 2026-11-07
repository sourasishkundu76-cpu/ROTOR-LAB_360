import React, { useState } from 'react';
import { Sparkles, ArrowRight, CheckCircle2, TrendingDown, Layers } from 'lucide-react';

export const OptimisationDiagram: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'compare' | 'original' | 'optimised'>('compare');

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-col gap-4 shadow-xl">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3">
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-cyan-400 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            Figure 11.1: Design Optimisation & Weight Reduction
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Topology Weight Pocketing & Root Fillet Refinement: -28.1% Mass Savings with FOS 3.52
          </p>
        </div>

        {/* View Switcher */}
        <div className="flex bg-slate-800 p-0.5 rounded border border-slate-700 text-xs">
          <button
            onClick={() => setActiveTab('compare')}
            className={`px-2.5 py-1 rounded transition-colors ${
              activeTab === 'compare' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-300'
            }`}
          >
            Side-by-Side Comparison
          </button>
          <button
            onClick={() => setActiveTab('original')}
            className={`px-2.5 py-1 rounded transition-colors ${
              activeTab === 'original' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-300'
            }`}
          >
            Original Solid (54.0g)
          </button>
          <button
            onClick={() => setActiveTab('optimised')}
            className={`px-2.5 py-1 rounded transition-colors ${
              activeTab === 'optimised' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-300'
            }`}
          >
            Optimised Pocketed (38.8g)
          </button>
        </div>
      </div>

      {/* Comparison SVG Viewport */}
      <div className="relative w-full overflow-hidden bg-slate-950 rounded-lg border border-slate-800 p-2 blueprint-grid">
        <svg viewBox="0 0 900 420" className="w-full h-auto max-h-[480px]">
          <defs>
            <marker id="optArrow" markerWidth="6" markerHeight="6" refX="4" refY="3" orient="auto">
              <path d="M0,0 L0,6 L6,3 z" fill="#10b981" />
            </marker>
          </defs>

          {/* ============================================================== */}
          {/* CONFIGURATION A: BASELINE ORIGINAL SOLID ARM */}
          {/* ============================================================== */}
          {(activeTab === 'compare' || activeTab === 'original') && (
            <g transform={`translate(80, ${activeTab === 'compare' ? 70 : 160})`}>
              <text x="0" y="-20" fill="#94a3b8" fontSize="12" fontWeight="bold" fontFamily="monospace">
                BASELINE REVISION A (SOLID ALUMINIUM 6061-T6)
              </text>
              <rect x="520" y="-30" width="130" height="20" rx="3" fill="#1e293b" stroke="#64748b" strokeWidth="0.8" />
              <text x="585" y="-17" fill="#cbd5e1" fontSize="9" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
                MASS: 54.0 GRAMS
              </text>

              {/* Arm Contour with R3 Fillets */}
              <path
                d="M 0,0 L 40,0 Q 55,0 65,15 L 560,15 A 25 25 0 0 1 585,35 A 25 25 0 0 1 560,55 L 65,55 Q 55,70 40,70 L 0,70 Z"
                fill="#1e293b"
                stroke="#64748b"
                strokeWidth="1.8"
              />

              {/* Motor Pad & Holes */}
              <circle cx="560" cy="35" r="25" fill="#0f172a" stroke="#64748b" strokeWidth="1.5" />
              <circle cx="560" cy="35" r="6" fill="#020617" />
              <circle cx="545" cy="35" r="3" fill="#cbd5e1" />
              <circle cx="575" cy="35" r="3" fill="#cbd5e1" />

              {/* Root Holes */}
              <circle cx="20" cy="20" r="4" fill="#020617" stroke="#cbd5e1" strokeWidth="1" />
              <circle cx="20" cy="50" r="4" fill="#020617" stroke="#cbd5e1" strokeWidth="1" />

              {/* Inefficient Dead-Weight Core Callout */}
              <rect x="180" y="24" width="260" height="22" fill="#ef4444" fillOpacity="0.15" stroke="#ef4444" strokeWidth="0.8" strokeDasharray="3 2" />
              <text x="310" y="38" fill="#fca5a5" fontSize="9" fontFamily="monospace" textAnchor="middle">
                LOW STRESS ZONE (&lt; 15 MPa): EXCESS DEAD WEIGHT
              </text>

              {/* Fillet R3 Annotation */}
              <text x="50" y="85" fill="#94a3b8" fontSize="8" fontFamily="monospace">
                Root Fillet R3.0 mm (Kt = 2.2)
              </text>
            </g>
          )}

          {/* ============================================================== */}
          {/* CONFIGURATION B: OPTIMISED POCKETED ARM WITH R4.5 FILLETS */}
          {/* ============================================================== */}
          {(activeTab === 'compare' || activeTab === 'optimised') && (
            <g transform={`translate(80, ${activeTab === 'compare' ? 240 : 160})`}>
              <text x="0" y="-20" fill="#38bdf8" fontSize="12" fontWeight="bold" fontFamily="monospace">
                OPTIMISED REVISION B (LIGHTENING POCKETS + R4.5 ROOT FILLET)
              </text>
              <rect x="520" y="-30" width="150" height="20" rx="3" fill="#064e3b" stroke="#10b981" strokeWidth="1" />
              <text x="595" y="-17" fill="#6ee7b7" fontSize="9" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
                MASS: 38.8 g (-28.1% SAVED)
              </text>

              {/* Arm Contour with Enlarged R4.5 Fillets */}
              <path
                d="M 0,0 L 35,0 Q 60,0 75,15 L 560,15 A 25 25 0 0 1 585,35 A 25 25 0 0 1 560,55 L 75,55 Q 60,70 35,70 L 0,70 Z"
                fill="#0f172a"
                stroke="#38bdf8"
                strokeWidth="2"
              />

              {/* 3 Internal Lightening Pockets with 2.5mm perimeter ribs */}
              {/* Pocket 1 */}
              <rect x="150" y="20" width="90" height="30" rx="10" fill="#020617" stroke="#38bdf8" strokeWidth="1.2" />
              {/* Pocket 2 */}
              <rect x="270" y="20" width="105" height="30" rx="10" fill="#020617" stroke="#38bdf8" strokeWidth="1.2" />
              {/* Pocket 3 */}
              <rect x="405" y="20" width="95" height="30" rx="10" fill="#020617" stroke="#38bdf8" strokeWidth="1.2" />

              {/* Stiffening Web Rib Annotations */}
              <text x="195" y="38" fill="#38bdf8" fontSize="8" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
                POCKET #1
              </text>
              <text x="322" y="38" fill="#38bdf8" fontSize="8" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
                POCKET #2
              </text>
              <text x="452" y="38" fill="#38bdf8" fontSize="8" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
                POCKET #3
              </text>

              {/* Motor Pad & Holes */}
              <circle cx="560" cy="35" r="25" fill="#0284c7" fillOpacity="0.3" stroke="#38bdf8" strokeWidth="1.5" />
              <circle cx="560" cy="35" r="6" fill="#020617" />
              <circle cx="545" cy="35" r="3" fill="#cbd5e1" />
              <circle cx="575" cy="35" r="3" fill="#cbd5e1" />

              {/* Root Holes with Solid 40mm clamping tab preserved */}
              <circle cx="20" cy="20" r="4" fill="#020617" stroke="#cbd5e1" strokeWidth="1" />
              <circle cx="20" cy="50" r="4" fill="#020617" stroke="#cbd5e1" strokeWidth="1" />

              {/* Enlarged R4.5 Fillet Callout */}
              <line x1="55" y1="5" x2="80" y2="-10" stroke="#10b981" strokeWidth="1" markerEnd="url(#optArrow)" />
              <text x="85" y="-12" fill="#10b981" fontSize="9" fontWeight="bold" fontFamily="monospace">
                SMOOTH BLEND R4.5 mm (Kt DROPS TO 1.35)
              </text>
            </g>
          )}

          {/* SolidWorks Feature Tree Steps Callout (Bottom) */}
          <g transform="translate(100, 375)" className="font-mono text-[9px] fill-slate-400">
            <text x="0" y="0">
              OPTIMISATION STEPS: 1. SolidWorks Extruded Cut (3 Pockets) → 2. Fillet R2mm internal corners → 3. Edit Root Fillet R3 → R4.5mm
            </text>
            <text x="0" y="16" fill="#38bdf8">
              RESULT: 15.2g mass removed per arm (60.8g total drone frame weight reduction, boosting flight endurance by ~18%)
            </text>
          </g>
        </svg>
      </div>

      {/* Quantitative Engineering Comparison Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-xs text-left border border-slate-800 rounded-lg overflow-hidden">
          <thead className="bg-slate-950 text-cyan-400 font-mono uppercase text-[10px] border-b border-slate-800">
            <tr>
              <th className="py-2.5 px-3">Performance Metric</th>
              <th className="py-2.5 px-3">Original Design (Rev A)</th>
              <th className="py-2.5 px-3">Optimised Design (Rev B)</th>
              <th className="py-2.5 px-3">Engineering Delta</th>
              <th className="py-2.5 px-3">Evaluation Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60 font-mono text-slate-300">
            <tr className="hover:bg-slate-800/40">
              <td className="py-2.5 px-3 font-semibold text-white">Component Mass</td>
              <td className="py-2.5 px-3 text-slate-400">54.0 grams</td>
              <td className="py-2.5 px-3 text-emerald-400 font-bold">38.8 grams</td>
              <td className="py-2.5 px-3 text-emerald-400 font-bold">-15.2 g (-28.1%)</td>
              <td className="py-2.5 px-3 text-emerald-400">✓ Target (&gt;25%) Met</td>
            </tr>
            <tr className="hover:bg-slate-800/40">
              <td className="py-2.5 px-3 font-semibold text-white">Max Von Mises Stress</td>
              <td className="py-2.5 px-3 text-slate-400">67.6 MPa</td>
              <td className="py-2.5 px-3 text-amber-400 font-bold">78.4 MPa</td>
              <td className="py-2.5 px-3 text-amber-400">+10.8 MPa (+15.9%)</td>
              <td className="py-2.5 px-3 text-emerald-400">✓ Well Below 276 MPa Yield</td>
            </tr>
            <tr className="hover:bg-slate-800/40">
              <td className="py-2.5 px-3 font-semibold text-white">Tip Deflection (URES)</td>
              <td className="py-2.5 px-3 text-slate-400">0.820 mm</td>
              <td className="py-2.5 px-3 text-slate-300">0.945 mm</td>
              <td className="py-2.5 px-3 text-slate-400">+0.125 mm</td>
              <td className="py-2.5 px-3 text-emerald-400">✓ &lt; 1.0 mm (Rigid)</td>
            </tr>
            <tr className="hover:bg-slate-800/40">
              <td className="py-2.5 px-3 font-semibold text-white">Factor of Safety (FOS)</td>
              <td className="py-2.5 px-3 text-slate-400">4.08</td>
              <td className="py-2.5 px-3 text-emerald-400 font-bold">3.52</td>
              <td className="py-2.5 px-3 text-slate-400">-0.56 margin</td>
              <td className="py-2.5 px-3 text-emerald-400">✓ Substantially &gt; 1.5 Target</td>
            </tr>
            <tr className="hover:bg-slate-800/40">
              <td className="py-2.5 px-3 font-semibold text-white">Mode 1 Frequency (fn1)</td>
              <td className="py-2.5 px-3 text-slate-400">84.5 Hz</td>
              <td className="py-2.5 px-3 text-cyan-400 font-bold">91.2 Hz</td>
              <td className="py-2.5 px-3 text-cyan-400 font-bold">+6.7 Hz (+7.9%)</td>
              <td className="py-2.5 px-3 text-emerald-400">✓ Higher Natural Frequency</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
