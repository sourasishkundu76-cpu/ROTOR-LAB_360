import React, { useState, useEffect } from 'react';
import { Radio, Activity, Play, Pause, AlertTriangle } from 'lucide-react';

export const VibrationModesDiagram: React.FC = () => {
  const [activeMode, setActiveMode] = useState<1 | 2 | 3>(1);
  const [isPlaying, setIsPlaying] = useState(true);
  const [oscillationPhase, setOscillationPhase] = useState(0);

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setOscillationPhase((prev) => (prev + 0.15) % (Math.PI * 2));
    }, 30);
    return () => clearInterval(interval);
  }, [isPlaying]);

  const sinVal = Math.sin(oscillationPhase);

  const modeData = {
    1: {
      title: 'Mode 1: 1st Vertical Bending (Flapping)',
      freq: '84.5 Hz',
      omega: '531.0 rad/s',
      description: 'Cantilever bending along weak axis (thickness 5mm). Arm flaps vertically up and down in phase with propeller thrust pulses.',
      damping: 'Aluminium internal hysteresis damping ratio ζ ≈ 0.005',
      rpmComparison: 'Exceeds standard hover motor RPM fundamental frequency (4,500 RPM = 75 Hz). 12% safety margin from hover resonance.'
    },
    2: {
      title: 'Mode 2: 1st In-Plane Bending (Lead-Lag)',
      freq: '215.2 Hz',
      omega: '1,352.1 rad/s',
      description: 'Bending along stiff width axis (width 20mm). Natural frequency is 2.5x higher than Mode 1 due to high cross-sectional width.',
      damping: 'Very low structural risk from aerodynamic drag oscillation',
      rpmComparison: 'Near 2-blade Propeller Blade Pass Frequency (BPF = 200 Hz at 6,000 RPM). Optimized pocketing in Phase 11 shifts this to 238 Hz.'
    },
    3: {
      title: 'Mode 3: 1st Structural Torsion (Twisting)',
      freq: '482.0 Hz',
      omega: '3,028.5 rad/s',
      description: 'Torsional twisting about arm longitudinal axis. Resists motor reaction torque and aerodynamic gyroscopic precession.',
      damping: 'High natural resistance due to wide 20mm base flange',
      rpmComparison: 'Far beyond maximum BLDC motor operational frequencies (8,000 RPM = 133 Hz). Complete resonance immunity.'
    }
  }[activeMode];

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-col gap-4 shadow-xl">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3">
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-cyan-400 flex items-center gap-2">
            <Radio className="w-4 h-4 text-cyan-400" />
            Figure 10.1: Dynamic Modal Analysis & Resonant Mode Shapes
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Eigenvalue Solver: Natural Frequencies, Bending/Torsional Eigenvectors & Resonance Avoidance
          </p>
        </div>

        {/* Mode Selector Buttons */}
        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex bg-slate-800 p-0.5 rounded border border-slate-700 text-xs">
            <button
              onClick={() => setActiveMode(1)}
              className={`px-2.5 py-1 rounded transition-colors ${
                activeMode === 1 ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-300'
              }`}
            >
              Mode 1 (84.5 Hz)
            </button>
            <button
              onClick={() => setActiveMode(2)}
              className={`px-2.5 py-1 rounded transition-colors ${
                activeMode === 2 ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-300'
              }`}
            >
              Mode 2 (215.2 Hz)
            </button>
            <button
              onClick={() => setActiveMode(3)}
              className={`px-2.5 py-1 rounded transition-colors ${
                activeMode === 3 ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-300'
              }`}
            >
              Mode 3 (482.0 Hz)
            </button>
          </div>

          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="p-1.5 rounded border border-slate-700 bg-slate-800 text-slate-300 hover:text-cyan-400"
            title={isPlaying ? 'Pause Oscillation' : 'Play Oscillation'}
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* SVG Animation Viewport */}
      <div className="relative w-full overflow-hidden bg-slate-950 rounded-lg border border-slate-800 p-2 blueprint-grid">
        <svg viewBox="0 0 880 340" className="w-full h-auto max-h-[380px]">
          <defs>
            <linearGradient id="modeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#0284c7" />
              <stop offset="70%" stopColor="#38bdf8" />
              <stop offset="100%" stopColor="#a855f7" />
            </linearGradient>
          </defs>

          {/* Root Boundary Clamped Support */}
          <g transform="translate(100, 160)">
            <rect x="-25" y="-50" width="25" height="100" fill="#1e293b" stroke="#64748b" strokeWidth="1.5" />
            <line x1="0" y1="-50" x2="0" y2="50" stroke="#cbd5e1" strokeWidth="3" />
            <text x="-12" y="-56" fill="#94a3b8" fontSize="9" fontFamily="monospace" textAnchor="middle">
              NODE (FIXED)
            </text>

            {/* Undeformed Baseline Guide */}
            <line x1="0" y1="0" x2="600" y2="0" stroke="#334155" strokeWidth="1" strokeDasharray="4 4" />

            {/* Dynamic Modal Shape Paths */}
            {activeMode === 1 && (
              // Mode 1: Pure 1st vertical bending (flapping)
              <g>
                {/* Sine modulated curve: y = Amp * (x/L)^2 */}
                <path
                  d={`
                    M 0, -10 
                    Q 300, ${-10 + sinVal * 15} 600, ${-10 + sinVal * 48} 
                    L 600, ${10 + sinVal * 48} 
                    Q 300, ${10 + sinVal * 15} 0, 10 
                    Z
                  `}
                  fill="url(#modeGrad)"
                  fillOpacity="0.8"
                  stroke="#ffffff"
                  strokeWidth="1.5"
                />
                {/* Motor Mount at oscillating tip */}
                <circle cx="600" cy={sinVal * 48} r="25" fill="#0f172a" stroke="#c084fc" strokeWidth="2" />
                <circle cx="600" cy={sinVal * 48} r="5" fill="#38bdf8" />

                {/* Antinode Label at Tip */}
                <g transform={`translate(600, ${sinVal * 48 - 35})`}>
                  <rect x="-55" y="-14" width="110" height="20" rx="3" fill="#3b0764" stroke="#c084fc" strokeWidth="1" />
                  <text x="0" y="0" fill="#e9d5ff" fontSize="9" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
                    ANTINODE (MAX AMPLITUDE)
                  </text>
                </g>
              </g>
            )}

            {activeMode === 2 && (
              // Mode 2: In-plane bending (horizontal/width flex)
              <g>
                <path
                  d={`
                    M 0, ${-12 + sinVal * 4} 
                    Q 300, ${-12 + sinVal * 28} 600, ${-12 + sinVal * 62} 
                    L 600, ${12 + sinVal * 62} 
                    Q 300, ${12 + sinVal * 28} 0, ${12 + sinVal * 4} 
                    Z
                  `}
                  fill="#0284c7"
                  fillOpacity="0.85"
                  stroke="#38bdf8"
                  strokeWidth="1.5"
                />
                <circle cx="600" cy={sinVal * 62} r="25" fill="#0f172a" stroke="#38bdf8" strokeWidth="2" />
                <circle cx="600" cy={sinVal * 62} r="5" fill="#38bdf8" />
                <text x="300" y={sinVal * 28 - 20} fill="#38bdf8" fontSize="10" fontFamily="monospace" textAnchor="middle">
                  IN-PLANE LATERAL DISPLACEMENT
                </text>
              </g>
            )}

            {activeMode === 3 && (
              // Mode 3: Torsional twisting
              <g>
                {/* 3D twisted ribbon appearance */}
                <path
                  d={`
                    M 0, -10 
                    C 200, ${-10 + sinVal * 25} 400, ${10 - sinVal * 25} 600, ${-10 + sinVal * 35}
                    L 600, ${10 + sinVal * 35}
                    C 400, ${-10 - sinVal * 25} 200, ${10 + sinVal * 25} 0, 10
                    Z
                  `}
                  fill="url(#modeGrad)"
                  fillOpacity="0.85"
                  stroke="#e2e8f0"
                  strokeWidth="1.5"
                />
                {/* Elliptical tilted motor pad representing torsional angle */}
                <ellipse
                  cx="600"
                  cy={0}
                  rx="18"
                  ry="28"
                  transform={`rotate(${sinVal * 30} 600 0)`}
                  fill="#0f172a"
                  stroke="#c084fc"
                  strokeWidth="2"
                />
                <text x="450" y="-35" fill="#c084fc" fontSize="10" fontFamily="monospace" textAnchor="middle">
                  TORSIONAL TWIST θ(x)
                </text>
              </g>
            )}
          </g>

          {/* Operational Frequency Spectrum Bar (Bottom) */}
          <g transform="translate(100, 270)" className="font-mono text-[9px]">
            {/* Axis */}
            <line x1="0" y1="20" x2="680" y2="20" stroke="#475569" strokeWidth="1" />
            <text x="340" y="38" fill="#94a3b8" textAnchor="middle">DYNAMIC EXCITATION FREQUENCY SPECTRUM (Hz)</text>

            {/* Motor Operational Range Band (16.7 Hz - 133.3 Hz) */}
            <rect x="25" y="5" width="180" height="15" fill="#3b82f6" fillOpacity="0.25" stroke="#3b82f6" strokeWidth="1" rx="2" />
            <text x="115" y="16" fill="#93c5fd" textAnchor="middle" fontSize="8" fontWeight="bold">
              MOTOR OPERATING ZONE (1,000 - 8,000 RPM)
            </text>

            {/* Mode 1 Marker (84.5 Hz) */}
            <line x1="128" y1="-5" x2="128" y2="20" stroke="#06b6d4" strokeWidth="2" />
            <circle cx="128" cy="-5" r="3" fill="#06b6d4" />
            <text x="128" y="-12" fill="#06b6d4" textAnchor="middle" fontWeight="bold">fn1: 84.5 Hz</text>

            {/* Mode 2 Marker (215.2 Hz) */}
            <line x1="326" y1="-5" x2="326" y2="20" stroke="#3b82f6" strokeWidth="2" />
            <circle cx="326" cy="-5" r="3" fill="#3b82f6" />
            <text x="326" y="-12" fill="#60a5fa" textAnchor="middle" fontWeight="bold">fn2: 215.2 Hz</text>

            {/* Mode 3 Marker (482.0 Hz) */}
            <line x1="580" y1="-5" x2="580" y2="20" stroke="#a855f7" strokeWidth="2" />
            <circle cx="580" cy="-5" r="3" fill="#a855f7" />
            <text x="580" y="-12" fill="#c084fc" textAnchor="middle" fontWeight="bold">fn3: 482.0 Hz</text>
          </g>
        </svg>
      </div>

      {/* Mode Details Card */}
      <div className="bg-slate-950 p-3.5 rounded-lg border border-slate-800 text-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h4 className="text-sm font-bold text-white font-mono">{modeData.title}</h4>
            <span className="px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 font-mono font-bold text-xs border border-cyan-800">
              {modeData.freq}
            </span>
          </div>
          <p className="text-slate-300 mt-1">{modeData.description}</p>
          <div className="flex items-center gap-2 mt-2 text-[11px] text-amber-300">
            <AlertTriangle className="w-3.5 h-3.5 flex-shrink-0" />
            <span>{modeData.rpmComparison}</span>
          </div>
        </div>
        <div className="bg-slate-900 p-2.5 rounded border border-slate-800 text-[11px] font-mono text-slate-300 flex-shrink-0">
          <div>ANGULAR FREQ: <span className="text-cyan-400 font-bold">{modeData.omega}</span></div>
          <div className="mt-1">DAMPING: <span className="text-emerald-400">{modeData.damping}</span></div>
        </div>
      </div>
    </div>
  );
};
