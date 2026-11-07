import React, { useState } from 'react';
import { Layers, ZoomIn, ZoomOut, RotateCcw, Info } from 'lucide-react';

export const QuadcopterDiagram: React.FC = () => {
  const [selectedPart, setSelectedPart] = useState<string | null>('arm');
  const [zoom, setZoom] = useState(1);
  const [showRotorDirections, setShowRotorDirections] = useState(true);

  const partDetails: Record<string, { title: string; role: string; specs: string }> = {
    arm: {
      title: 'Cantilever Rotor Arm (ESCME192 Focus)',
      role: 'Transfers 50 N aerodynamic motor thrust to central drone chassis while resisting bending moments and rotational vibration.',
      specs: 'Material: Al 6061-T6 | Length: 200 mm | Width: 20 mm | Thickness: 5 mm | Mass: ~54 g'
    },
    central: {
      title: 'Central Fuselage Chassis (Top/Bottom Plates)',
      role: 'Rigid composite base housing the Flight Controller, 4-in-1 ESCs, power distribution board, and LiPo battery clamp.',
      specs: 'Material: 2.0 mm 3K Twill Carbon Fibre | Hexagonal geometry with 30 mm standoffs'
    },
    motor: {
      title: 'Brushless DC Motor (BLDC 2212 920KV)',
      role: 'High-efficiency 3-phase outrunner motor providing 50 N peak dynamic thrust per corner at full throttle.',
      specs: 'Operating Voltage: 11.1V (3S LiPo) | Mounting: 4x M3 on 16/19 mm PCD | Stator: 22x12 mm'
    },
    propeller: {
      title: 'Aerodynamic Propeller (1045 Multi-Rotor Prop)',
      role: '10-inch diameter, 4.5-inch pitch counter-rotating propellers creating upward lift and stabilizing yaw torque.',
      specs: 'Material: Glass-filled Nylon / Carbon | Configuration: 2x CW (Clockwise) and 2x CCW'
    },
    fc: {
      title: 'Flight Controller & IMU Sensor Bay',
      role: 'High-frequency gyroscope and accelerometer computing PID attitude stabilization algorithms at 8 kHz.',
      specs: 'Location: Exact geometric Center of Gravity (CG) to eliminate eccentric sensor offsets'
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-col gap-4 shadow-xl">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3">
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-cyan-400 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
            Figure 1.1: Complete Quadcopter X-Architecture
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">Interactive structural layout, load paths & rotor rotation mapping</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowRotorDirections(!showRotorDirections)}
            className={`px-2.5 py-1 text-xs rounded border transition-colors flex items-center gap-1.5 ${
              showRotorDirections ? 'bg-cyan-500/20 border-cyan-500/50 text-cyan-300' : 'bg-slate-800 border-slate-700 text-slate-400'
            }`}
          >
            <RotateCcw className="w-3 h-3" />
            Rotor Spin Vectors
          </button>
          <div className="flex items-center bg-slate-800 rounded border border-slate-700">
            <button
              onClick={() => setZoom(Math.max(0.8, zoom - 0.1))}
              className="p-1 hover:text-cyan-400 text-slate-300"
              title="Zoom Out"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <span className="text-[10px] font-mono px-1.5 text-slate-400">{Math.round(zoom * 100)}%</span>
            <button
              onClick={() => setZoom(Math.min(1.4, zoom + 0.1))}
              className="p-1 hover:text-cyan-400 text-slate-300"
              title="Zoom In"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* SVG Canvas */}
      <div className="relative w-full overflow-hidden bg-slate-950/70 rounded-lg border border-slate-800/80 aspect-[16/10] flex items-center justify-center blueprint-grid">
        <svg
          viewBox="-220 -220 440 440"
          className="w-full h-full max-h-[460px] transition-transform duration-200"
          style={{ transform: `scale(${zoom})` }}
        >
          <defs>
            {/* Grid Pattern */}
            <radialGradient id="centerGlow" cx="0" cy="0" r="100" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#06b6d4" stopOpacity="0" />
            </radialGradient>
            {/* Carbon Pattern */}
            <pattern id="carbonChassis" width="6" height="6" patternUnits="userSpaceOnUse">
              <rect width="6" height="6" fill="#1e293b" />
              <path d="M 0 3 L 3 0 L 6 3 L 3 6 Z" fill="#0f172a" />
            </pattern>
            {/* Marker Arrows */}
            <marker id="arrowCyan" markerWidth="6" markerHeight="6" refX="4" refY="3" orient="auto">
              <path d="M0,0 L0,6 L6,3 z" fill="#06b6d4" />
            </marker>
          </defs>

          {/* Coordinate Reference Circles */}
          <circle cx="0" cy="0" r="190" fill="none" stroke="#334155" strokeWidth="0.8" strokeDasharray="4 4" />
          <circle cx="0" cy="0" r="130" fill="none" stroke="#1e293b" strokeWidth="0.8" />
          <circle cx="0" cy="0" r="60" fill="none" stroke="#1e293b" strokeWidth="0.8" />
          <circle cx="0" cy="0" r="50" fill="url(#centerGlow)" />

          {/* Center Lines */}
          <line x1="-210" y1="0" x2="210" y2="0" stroke="#334155" strokeWidth="0.6" strokeDasharray="3 3" />
          <line x1="0" y1="-210" x2="0" y2="210" stroke="#334155" strokeWidth="0.6" strokeDasharray="3 3" />

          {/* Diagonal Reference Axes (45 deg) */}
          <line x1="-160" y1="-160" x2="160" y2="160" stroke="#0ea5e9" strokeWidth="0.8" strokeOpacity="0.3" strokeDasharray="2 4" />
          <line x1="160" y1="-160" x2="-160" y2="160" stroke="#0ea5e9" strokeWidth="0.8" strokeOpacity="0.3" strokeDasharray="2 4" />

          {/* 4 ROTOR ARMS (X-Quad arrangement at 45, 135, 225, 315 deg) */}
          {[45, 135, 225, 315].map((angle, idx) => {
            const isArmSelected = selectedPart === 'arm';
            return (
              <g
                key={angle}
                transform={`rotate(${angle})`}
                onClick={() => setSelectedPart('arm')}
                className="cursor-pointer group"
              >
                {/* Arm Beam */}
                <rect
                  x="28"
                  y="-10"
                  width="130"
                  height="20"
                  rx="3"
                  fill={isArmSelected ? '#0284c7' : '#334155'}
                  stroke={isArmSelected ? '#38bdf8' : '#64748b'}
                  strokeWidth={isArmSelected ? '2' : '1.2'}
                  className="transition-all duration-200"
                />

                {/* Stiffening Centerline Rib */}
                <line x1="38" y1="0" x2="148" y2="0" stroke="#94a3b8" strokeWidth="0.8" strokeDasharray="3 2" />

                {/* Root Mounting Bolts (Chassis Interface) */}
                <circle cx="38" cy="-5" r="2.2" fill="#0f172a" stroke="#cbd5e1" strokeWidth="0.8" />
                <circle cx="38" cy="5" r="2.2" fill="#0f172a" stroke="#cbd5e1" strokeWidth="0.8" />

                {/* Motor Mount Circular Pad at Distal End */}
                <circle
                  cx="160"
                  cy="0"
                  r="16"
                  fill={isArmSelected ? '#0369a1' : '#1e293b'}
                  stroke={isArmSelected ? '#38bdf8' : '#475569'}
                  strokeWidth="1.5"
                />
                {/* Motor Center Shaft Hole */}
                <circle cx="160" cy="0" r="3.2" fill="#0f172a" stroke="#94a3b8" strokeWidth="1" />
                {/* Motor 4x M3 Screws on 16mm PCD */}
                <circle cx="152" cy="0" r="1.8" fill="#e2e8f0" stroke="#0f172a" strokeWidth="0.6" />
                <circle cx="168" cy="0" r="1.8" fill="#e2e8f0" stroke="#0f172a" strokeWidth="0.6" />
                <circle cx="160" cy="-8" r="1.8" fill="#e2e8f0" stroke="#0f172a" strokeWidth="0.6" />
                <circle cx="160" cy="8" r="1.8" fill="#e2e8f0" stroke="#0f172a" strokeWidth="0.6" />

                {/* Arm Label */}
                <text
                  x="88"
                  y="4"
                  fill="#ffffff"
                  fontSize="7"
                  fontFamily="monospace"
                  fontWeight="bold"
                  textAnchor="middle"
                  className="select-none pointer-events-none"
                >
                  ARM #{idx + 1}
                </text>
              </g>
            );
          })}

          {/* 4 PROPELLERS (with translucent spinning disc & direction arrows) */}
          {[
            { angle: 45, dir: 'CCW', color: '#06b6d4' },
            { angle: 135, dir: 'CW', color: '#3b82f6' },
            { angle: 225, dir: 'CCW', color: '#06b6d4' },
            { angle: 315, dir: 'CW', color: '#3b82f6' }
          ].map(({ angle, dir, color }) => {
            const rad = (angle * Math.PI) / 180;
            const cx = Math.cos(rad) * 160;
            const cy = Math.sin(rad) * 160;
            const isPropSelected = selectedPart === 'propeller';

            return (
              <g
                key={`prop-${angle}`}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedPart('propeller');
                }}
                className="cursor-pointer"
              >
                {/* Propeller Sweep Disc */}
                <circle
                  cx={cx}
                  cy={cy}
                  r="45"
                  fill={isPropSelected ? `${color}30` : `${color}12`}
                  stroke={color}
                  strokeWidth="0.8"
                  strokeDasharray="3 3"
                />

                {/* Propeller Blades (2-Blade 1045) */}
                <g transform={`translate(${cx}, ${cy}) rotate(${angle + 30})`}>
                  <path
                    d="M-42,-3 C-20,-7 -6,-2 0,0 C6,2 20,7 42,3 C38,6 18,7 0,0 C-18,-7 -38,-6 -42,-3 Z"
                    fill={color}
                    fillOpacity="0.75"
                    stroke="#ffffff"
                    strokeWidth="0.8"
                  />
                  {/* Motor Bell Housing */}
                  <circle
                    cx="0"
                    cy="0"
                    r="12"
                    fill="#0f172a"
                    stroke="#94a3b8"
                    strokeWidth="1.2"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedPart('motor');
                    }}
                  />
                  <circle cx="0" cy="0" r="4" fill="#38bdf8" />
                </g>

                {/* Rotation Direction Arrow & Tag */}
                {showRotorDirections && (
                  <g transform={`translate(${cx}, ${cy})`}>
                    <path
                      d={
                        dir === 'CCW'
                          ? 'M -24, 0 A 24 24 0 0 1 0, -24'
                          : 'M 0, -24 A 24 24 0 0 1 24, 0'
                      }
                      fill="none"
                      stroke="#f8fafc"
                      strokeWidth="1.5"
                      markerEnd="url(#arrowCyan)"
                    />
                    <rect
                      x="-18"
                      y="16"
                      width="36"
                      height="12"
                      rx="2"
                      fill="#0f172a"
                      stroke={color}
                      strokeWidth="0.8"
                    />
                    <text
                      x="0"
                      y="25"
                      fill={color}
                      fontSize="8"
                      fontWeight="bold"
                      fontFamily="monospace"
                      textAnchor="middle"
                    >
                      {dir}
                    </text>
                  </g>
                )}
              </g>
            );
          })}

          {/* CENTRAL CHASSIS BODY (Hexagonal sandwich plate) */}
          <g
            onClick={() => setSelectedPart('central')}
            className="cursor-pointer"
          >
            {/* Bottom Carbon Plate */}
            <polygon
              points="0,-48 42,-24 42,24 0,48 -42,24 -42,-24"
              fill="url(#carbonChassis)"
              stroke={selectedPart === 'central' ? '#38bdf8' : '#64748b'}
              strokeWidth={selectedPart === 'central' ? '2.5' : '1.5'}
            />

            {/* Inner Electronics Plate */}
            <polygon
              points="0,-34 30,-17 30,17 0,34 -30,17 -30,-17"
              fill="#0f172a"
              stroke="#0284c7"
              strokeWidth="1"
            />

            {/* Flight Controller Cube in Center */}
            <rect
              x="-15"
              y="-15"
              width="30"
              height="30"
              rx="3"
              fill={selectedPart === 'fc' ? '#0284c7' : '#1e293b'}
              stroke="#38bdf8"
              strokeWidth="1.2"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedPart('fc');
              }}
            />
            {/* Forward Orientation Arrow on Flight Controller */}
            <polygon points="0,-11 -5,-2 5,-2" fill="#22c55e" />
            <text
              x="0"
              y="7"
              fill="#94a3b8"
              fontSize="6"
              fontWeight="bold"
              fontFamily="monospace"
              textAnchor="middle"
            >
              FC / IMU
            </text>

            {/* Stand-off Bolting Hardware */}
            {[-28, 28].map((x) =>
              [-14, 14].map((y) => (
                <circle
                  key={`${x}-${y}`}
                  cx={x}
                  cy={y}
                  r="2"
                  fill="#e2e8f0"
                  stroke="#0f172a"
                  strokeWidth="0.6"
                />
              ))
            )}
          </g>

          {/* Forward Flight Direction Indicator (+X / Forward heading) */}
          <g transform="translate(0, -185)">
            <line x1="0" y1="20" x2="0" y2="0" stroke="#22c55e" strokeWidth="2" markerEnd="url(#arrowCyan)" />
            <text x="0" y="-6" fill="#22c55e" fontSize="9" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
              ▲ FORWARD FLIGHT HEADING (+X)
            </text>
          </g>
        </svg>

        {/* Hover/Click instruction badge */}
        <div className="absolute bottom-2 left-2 px-2.5 py-1 rounded bg-slate-900/80 backdrop-blur border border-slate-700 text-[11px] text-slate-300 flex items-center gap-1.5">
          <Info className="w-3.5 h-3.5 text-cyan-400" />
          Click any component to inspect engineering role & specifications
        </div>
      </div>

      {/* Selected Component Information Panel */}
      {selectedPart && partDetails[selectedPart] && (
        <div className="bg-slate-950 p-3.5 rounded-lg border border-cyan-500/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 text-xs">
          <div className="flex-1">
            <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-400 font-bold">
              COMPONENT SPECIFICATION:
            </span>
            <h4 className="text-sm font-semibold text-white mt-0.5">{partDetails[selectedPart].title}</h4>
            <p className="text-slate-300 mt-1 leading-relaxed">{partDetails[selectedPart].role}</p>
          </div>
          <div className="bg-slate-900 px-3 py-2 rounded border border-slate-800 text-[11px] font-mono text-cyan-200">
            {partDetails[selectedPart].specs}
          </div>
        </div>
      )}
    </div>
  );
};
