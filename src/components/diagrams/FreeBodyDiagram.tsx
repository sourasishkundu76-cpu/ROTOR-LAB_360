import React, { useState } from 'react';
import { Compass, ToggleLeft, ToggleRight, ArrowUp, ArrowRight, ArrowDown, Activity } from 'lucide-react';

export const FreeBodyDiagram: React.FC = () => {
  const [showAero, setShowAero] = useState(true);
  const [showGravity, setShowGravity] = useState(true);
  const [showCentrifugal, setShowCentrifugal] = useState(true);
  const [showReactions, setShowReactions] = useState(true);
  const [showDiagrams, setShowDiagrams] = useState<'fbd' | 'sfd' | 'bmd'>('fbd');

  // Load values
  const fAero = showAero ? 50.0 : 0;
  const fGravity = showGravity ? 4.905 : 0;
  const fArmWeight = showGravity ? 0.52 : 0; // distributed arm weight
  const fCentrifugal = showCentrifugal ? 100.0 : 0;

  const fNetVertical = fAero - fGravity - 0.5 * fArmWeight; // net upward force
  const mReaction = fNetVertical * 0.20; // 200mm = 0.2m

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-col gap-4 shadow-xl">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3">
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-cyan-400 flex items-center gap-2">
            <Compass className="w-4 h-4 text-cyan-400" />
            Figure 6.1: Free-Body Diagram (FBD) & Equilibrium Reactions
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Cantilever equilibrium under tri-axial aerodynamic, inertial & gravitational forces
          </p>
        </div>
        
        {/* Toggle Controls */}
        <div className="flex items-center gap-2 flex-wrap text-xs">
          <div className="flex bg-slate-800 p-0.5 rounded border border-slate-700">
            <button
              onClick={() => setShowDiagrams('fbd')}
              className={`px-2.5 py-1 rounded transition-colors ${
                showDiagrams === 'fbd' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-300'
              }`}
            >
              FBD Loads
            </button>
            <button
              onClick={() => setShowDiagrams('sfd')}
              className={`px-2.5 py-1 rounded transition-colors ${
                showDiagrams === 'sfd' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-300'
              }`}
            >
              Shear (SFD)
            </button>
            <button
              onClick={() => setShowDiagrams('bmd')}
              className={`px-2.5 py-1 rounded transition-colors ${
                showDiagrams === 'bmd' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-300'
              }`}
            >
              Moment (BMD)
            </button>
          </div>

          <button
            onClick={() => setShowReactions(!showReactions)}
            className={`px-2 py-1 rounded border transition-colors flex items-center gap-1 ${
              showReactions ? 'bg-rose-500/20 border-rose-500/50 text-rose-300' : 'bg-slate-800 border-slate-700 text-slate-400'
            }`}
          >
            Reactions
          </button>
        </div>
      </div>

      {/* Force Vectors Filter Bar */}
      <div className="flex items-center gap-2 flex-wrap bg-slate-950 p-2 rounded-lg border border-slate-800 text-xs">
        <span className="text-[10px] text-slate-400 font-mono uppercase mr-1">ACTIVE LOADS:</span>
        <button
          onClick={() => setShowAero(!showAero)}
          className={`px-2 py-1 rounded border flex items-center gap-1.5 transition-colors ${
            showAero ? 'bg-cyan-950 border-cyan-500 text-cyan-300 font-semibold' : 'bg-slate-900 border-slate-800 text-slate-500'
          }`}
        >
          <ArrowUp className="w-3.5 h-3.5 text-cyan-400" />
          Aero Thrust (+50 N)
        </button>
        <button
          onClick={() => setShowCentrifugal(!showCentrifugal)}
          className={`px-2 py-1 rounded border flex items-center gap-1.5 transition-colors ${
            showCentrifugal ? 'bg-amber-950 border-amber-500 text-amber-300 font-semibold' : 'bg-slate-900 border-slate-800 text-slate-500'
          }`}
        >
          <ArrowRight className="w-3.5 h-3.5 text-amber-400" />
          Centrifugal (+100 N)
        </button>
        <button
          onClick={() => setShowGravity(!showGravity)}
          className={`px-2 py-1 rounded border flex items-center gap-1.5 transition-colors ${
            showGravity ? 'bg-indigo-950 border-indigo-500 text-indigo-300 font-semibold' : 'bg-slate-900 border-slate-800 text-slate-500'
          }`}
        >
          <ArrowDown className="w-3.5 h-3.5 text-indigo-400" />
          Gravity (-4.905 N)
        </button>
      </div>

      {/* SVG Canvas */}
      <div className="relative w-full overflow-hidden bg-slate-950 rounded-lg border border-slate-800 p-2 blueprint-grid">
        <svg viewBox="0 0 880 380" className="w-full h-auto max-h-[440px]">
          <defs>
            {/* Arrow Markers for vectors */}
            <marker id="fbdCyanUp" markerWidth="8" markerHeight="8" refX="4" refY="2" orient="auto">
              <path d="M0,8 L4,0 L8,8 z" fill="#06b6d4" />
            </marker>
            <marker id="fbdIndigoDown" markerWidth="8" markerHeight="8" refX="4" refY="6" orient="auto">
              <path d="M0,0 L4,8 L8,0 z" fill="#818cf8" />
            </marker>
            <marker id="fbdAmberRight" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
              <path d="M0,0 L8,4 L0,8 z" fill="#f59e0b" />
            </marker>
            <marker id="fbdRoseArrow" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
              <path d="M0,0 L8,4 L0,8 z" fill="#f43f5e" />
            </marker>

            {/* Fixed Wall Hatch Pattern */}
            <pattern id="fixedWallHatch" width="8" height="8" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
              <line x1="0" y1="0" x2="0" y2="8" stroke="#64748b" strokeWidth="1.2" />
            </pattern>
          </defs>

          {/* Coordinate System Origin */}
          <g transform="translate(40, 40)" className="font-mono text-[9px] fill-slate-400">
            <line x1="0" y1="30" x2="40" y2="30" stroke="#06b6d4" strokeWidth="1.5" markerEnd="url(#fbdCyanUp)" />
            <line x1="0" y1="30" x2="0" y2="0" stroke="#10b981" strokeWidth="1.5" markerEnd="url(#fbdCyanUp)" />
            <text x="44" y="33" fill="#06b6d4">+X (Longitudinal)</text>
            <text x="-4" y="-4" fill="#10b981">+Y (Lift)</text>
          </g>

          {/* MAIN FBD MODE */}
          {showDiagrams === 'fbd' && (
            <g transform="translate(140, 140)">
              {/* FIXED SUPPORT WALL (Chassis Boundary Condition) */}
              <rect x="-30" y="-60" width="30" height="120" fill="url(#fixedWallHatch)" stroke="#64748b" strokeWidth="1.5" />
              <line x1="0" y1="-60" x2="0" y2="60" stroke="#cbd5e1" strokeWidth="3" />

              {/* Fixed Support Annotation */}
              <text x="-15" y="-68" fill="#94a3b8" fontSize="10" fontFamily="monospace" textAnchor="middle">
                FIXED CHASSIS ROOT
              </text>

              {/* ROTOR ARM BODY */}
              <rect
                x="0"
                y="-15"
                width="520"
                height="30"
                rx="2"
                fill="#1e293b"
                stroke="#38bdf8"
                strokeWidth="2"
              />

              {/* Neutral axis */}
              <line x1="0" y1="0" x2="520" y2="0" stroke="#38bdf8" strokeWidth="0.8" strokeDasharray="6 3" strokeOpacity="0.6" />

              {/* Motor Mounting Pad at Tip */}
              <circle cx="520" cy="0" r="28" fill="#0f172a" stroke="#38bdf8" strokeWidth="2" />
              <circle cx="520" cy="0" r="6" fill="#020617" stroke="#94a3b8" strokeWidth="1.2" />

              {/* Distributed Arm Self-Weight Arrows (0.52 N) */}
              {showGravity && (
                <g className="text-[8px] font-mono fill-slate-400">
                  {[80, 160, 240, 320, 400].map((x) => (
                    <g key={x}>
                      <line x1={x} y1="15" x2={x} y2="40" stroke="#64748b" strokeWidth="1" markerEnd="url(#fbdIndigoDown)" />
                    </g>
                  ))}
                  <text x="240" y="52" textAnchor="middle" fill="#64748b">
                    ARM SELF-WEIGHT w = 2.6 N/m (Total 0.52 N)
                  </text>
                </g>
              )}

              {/* LOAD 1: AERODYNAMIC LIFT (50 N, Upward +Y) */}
              {showAero && (
                <g>
                  <line
                    x1="520"
                    y1="-15"
                    x2="520"
                    y2="-105"
                    stroke="#06b6d4"
                    strokeWidth="3.5"
                    markerEnd="url(#fbdCyanUp)"
                  />
                  <rect x="440" y="-132" width="160" height="24" rx="4" fill="#083344" stroke="#06b6d4" strokeWidth="1" />
                  <text x="520" y="-116" fill="#38bdf8" fontSize="11" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
                    F_aero = +50.0 N (LIFT)
                  </text>
                </g>
              )}

              {/* LOAD 2: MOTOR & PROP GRAVITATIONAL WEIGHT (4.905 N, Downward -Y) */}
              {showGravity && (
                <g>
                  <line
                    x1="535"
                    y1="15"
                    x2="535"
                    y2="85"
                    stroke="#818cf8"
                    strokeWidth="2.5"
                    markerEnd="url(#fbdIndigoDown)"
                  />
                  <rect x="460" y="92" width="150" height="22" rx="4" fill="#1e1b4b" stroke="#818cf8" strokeWidth="1" />
                  <text x="535" y="107" fill="#a5b4fc" fontSize="10" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
                    F_g = -4.905 N (MASS 0.5kg)
                  </text>
                </g>
              )}

              {/* LOAD 3: CENTRIFUGAL TENSION (100 N, Outward +X) */}
              {showCentrifugal && (
                <g>
                  <line
                    x1="548"
                    y1="0"
                    x2="660"
                    y2="0"
                    stroke="#f59e0b"
                    strokeWidth="3.5"
                    markerEnd="url(#fbdAmberRight)"
                  />
                  <rect x="668" y="-13" width="155" height="26" rx="4" fill="#451a03" stroke="#f59e0b" strokeWidth="1" />
                  <text x="745" y="4" fill="#fbbf24" fontSize="11" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
                    F_c = 100.0 N (TENSION)
                  </text>
                </g>
              )}

              {/* REACTION FORCES AT ROOT FIXED SUPPORT */}
              {showReactions && (
                <g>
                  {/* Reaction Rx (Horizontal opposition to Centrifugal) */}
                  {showCentrifugal && (
                    <g>
                      <line x1="-5" y1="0" x2="-80" y2="0" stroke="#f43f5e" strokeWidth="2.5" markerEnd="url(#fbdRoseArrow)" />
                      <text x="-85" y="4" fill="#f43f5e" fontSize="9" fontWeight="bold" fontFamily="monospace" textAnchor="end">
                        R_x = -100.0 N
                      </text>
                    </g>
                  )}

                  {/* Reaction Ry (Vertical opposition to Net Lift) */}
                  <g>
                    <line x1="0" y1="20" x2="0" y2="90" stroke="#f43f5e" strokeWidth="2.5" markerEnd="url(#fbdIndigoDown)" />
                    <text x="5" y="95" fill="#f43f5e" fontSize="9" fontWeight="bold" fontFamily="monospace">
                      R_y = -{fNetVertical.toFixed(2)} N
                    </text>
                  </g>

                  {/* Reaction Moment Mz (Clockwise resisting counter-clockwise bending) */}
                  <g>
                    <path
                      d="M -15,-35 A 35 35 0 0 1 15,-15"
                      fill="none"
                      stroke="#f43f5e"
                      strokeWidth="2.5"
                      markerEnd="url(#fbdRoseArrow)"
                    />
                    <text x="-40" y="-45" fill="#f43f5e" fontSize="9" fontWeight="bold" fontFamily="monospace">
                      M_z = {mReaction.toFixed(2)} N·m (CW)
                    </text>
                  </g>
                </g>
              )}

              {/* Cantilever Span Dimension (L = 200 mm) */}
              <line x1="0" y1="-35" x2="520" y2="-35" stroke="#64748b" strokeWidth="0.8" />
              <line x1="0" y1="-40" x2="0" y2="-30" stroke="#64748b" strokeWidth="0.8" />
              <line x1="520" y1="-40" x2="520" y2="-30" stroke="#64748b" strokeWidth="0.8" />
              <text x="260" y="-42" fill="#94a3b8" fontSize="10" fontFamily="monospace" textAnchor="middle">
                CANTILEVER SPAN L = 200 mm (0.20 m)
              </text>
            </g>
          )}

          {/* SHEAR FORCE DIAGRAM (SFD) */}
          {showDiagrams === 'sfd' && (
            <g transform="translate(140, 150)">
              <text x="260" y="-70" fill="#38bdf8" fontSize="12" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
                SHEAR FORCE DIAGRAM (SFD)
              </text>
              {/* Baseline */}
              <line x1="0" y1="0" x2="520" y2="0" stroke="#64748b" strokeWidth="1.5" />
              <text x="-10" y="4" fill="#94a3b8" fontSize="10" fontFamily="monospace" textAnchor="end">0 N</text>

              {/* Shear Force Polygon (Uniform net shear across arm) */}
              <polygon
                points={`0,0 0,-60 520,-60 520,0`}
                fill="#06b6d4"
                fillOpacity="0.25"
                stroke="#06b6d4"
                strokeWidth="2"
              />
              <text x="260" y="-30" fill="#38bdf8" fontSize="12" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
                V = +{fNetVertical.toFixed(2)} N (Constant Shear)
              </text>
              <line x1="0" y1="-60" x2="-20" y2="-60" stroke="#06b6d4" strokeWidth="0.8" strokeDasharray="2 2" />
              <text x="-24" y="-57" fill="#06b6d4" fontSize="10" fontFamily="monospace" textAnchor="end">
                +{fNetVertical.toFixed(2)} N
              </text>
            </g>
          )}

          {/* BENDING MOMENT DIAGRAM (BMD) */}
          {showDiagrams === 'bmd' && (
            <g transform="translate(140, 150)">
              <text x="260" y="-70" fill="#f59e0b" fontSize="12" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
                BENDING MOMENT DIAGRAM (BMD)
              </text>
              {/* Baseline */}
              <line x1="0" y1="0" x2="520" y2="0" stroke="#64748b" strokeWidth="1.5" />
              <text x="-10" y="4" fill="#94a3b8" fontSize="10" fontFamily="monospace" textAnchor="end">0 N·m</text>

              {/* Triangle BMD (Peak at root, 0 at motor tip) */}
              <polygon
                points={`0,0 0,-90 520,0`}
                fill="#f59e0b"
                fillOpacity="0.25"
                stroke="#f59e0b"
                strokeWidth="2"
              />
              <text x="120" y="-40" fill="#fbbf24" fontSize="12" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
                M(x) = F_net · (L - x)
              </text>
              <line x1="0" y1="-90" x2="-20" y2="-90" stroke="#f59e0b" strokeWidth="0.8" strokeDasharray="2 2" />
              <text x="-24" y="-87" fill="#f59e0b" fontSize="10" fontWeight="bold" fontFamily="monospace" textAnchor="end">
                M_max = {mReaction.toFixed(3)} N·m
              </text>
              <text x="520" y="16" fill="#94a3b8" fontSize="10" fontFamily="monospace" textAnchor="middle">
                M_tip = 0.0 N·m
              </text>
            </g>
          )}
        </svg>
      </div>

      {/* Equilibrium Equations & Live Values */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
        <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
          <span className="text-[10px] text-cyan-400 font-mono font-bold block">1. VERTICAL EQUILIBRIUM (ΣFy = 0)</span>
          <p className="font-mono text-slate-200 mt-1">
            F_aero - F_g - R_y = 0
          </p>
          <p className="text-cyan-300 font-bold font-mono mt-1">
            Net Upward Force = {fNetVertical.toFixed(2)} N
          </p>
          <span className="text-[10px] text-slate-500 block mt-0.5">Determines transverse shear stress</span>
        </div>

        <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
          <span className="text-[10px] text-amber-400 font-mono font-bold block">2. AXIAL EQUILIBRIUM (ΣFx = 0)</span>
          <p className="font-mono text-slate-200 mt-1">
            F_centrifugal - R_x = 0
          </p>
          <p className="text-amber-300 font-bold font-mono mt-1">
            Axial Tension = {fCentrifugal.toFixed(1)} N
          </p>
          <span className="text-[10px] text-slate-500 block mt-0.5">Tensile stress σ_a = 1.00 MPa</span>
        </div>

        <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
          <span className="text-[10px] text-rose-400 font-mono font-bold block">3. MOMENT EQUILIBRIUM (ΣM_root = 0)</span>
          <p className="font-mono text-slate-200 mt-1">
            M_root = F_net × L = {fNetVertical.toFixed(2)} N × 0.20 m
          </p>
          <p className="text-rose-300 font-bold font-mono mt-1">
            Peak Bending Moment = {mReaction.toFixed(3)} N·m
          </p>
          <span className="text-[10px] text-slate-500 block mt-0.5">Generates peak 67.6 MPa stress at root</span>
        </div>
      </div>
    </div>
  );
};
