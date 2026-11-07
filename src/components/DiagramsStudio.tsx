import React, { useState } from 'react';
import { Layers, Ruler, Compass, Grid, Activity, Radio, Sparkles, Box, Info } from 'lucide-react';
import { QuadcopterDiagram } from './diagrams/QuadcopterDiagram';
import { RotorArmBlueprint } from './diagrams/RotorArmBlueprint';
import { FreeBodyDiagram } from './diagrams/FreeBodyDiagram';
import { MeshDiagram } from './diagrams/MeshDiagram';
import { FeaStressDiagram } from './diagrams/FeaStressDiagram';
import { ExplodedAssemblyDiagram } from './diagrams/ExplodedAssemblyDiagram';
import { VibrationModesDiagram } from './diagrams/VibrationModesDiagram';
import { OptimisationDiagram } from './diagrams/OptimisationDiagram';

export type DiagramTabId = 'quadcopter' | 'blueprint' | 'fbd' | 'exploded' | 'mesh' | 'fea' | 'vibration' | 'optimisation';

interface DiagramsStudioProps {
  initialTab?: DiagramTabId;
}

export const DiagramsStudio: React.FC<DiagramsStudioProps> = ({ initialTab = 'blueprint' }) => {
  const [activeTab, setActiveTab] = useState<DiagramTabId>(initialTab);

  const diagramTabs: { id: DiagramTabId; title: string; subtitle: string; icon: React.ReactNode; phase: string }[] = [
    {
      id: 'blueprint',
      title: 'Orthographic CAD Drawing',
      subtitle: '200x20x5mm Dimensions & Tolerances',
      icon: <Ruler className="w-4 h-4" />,
      phase: 'Phase 2 & 3'
    },
    {
      id: 'quadcopter',
      title: 'Quadcopter Architecture',
      subtitle: 'Full Multi-rotor Airframe & Rotors',
      icon: <Box className="w-4 h-4" />,
      phase: 'Phase 1'
    },
    {
      id: 'exploded',
      title: 'Exploded Assembly View',
      subtitle: 'Chassis, Arms, Standoffs & Mates',
      icon: <Layers className="w-4 h-4" />,
      phase: 'Phase 4'
    },
    {
      id: 'fbd',
      title: 'Free-Body Diagram (FBD)',
      subtitle: 'Tri-Axial Loads & Root Reactions',
      icon: <Compass className="w-4 h-4" />,
      phase: 'Phase 6'
    },
    {
      id: 'mesh',
      title: 'FEA Mesh & Convergence',
      subtitle: 'Adaptive Tetrahedral Elements',
      icon: <Grid className="w-4 h-4" />,
      phase: 'Phase 8'
    },
    {
      id: 'fea',
      title: 'Von Mises Stress & Deflection',
      subtitle: 'Static Structural FEA Results',
      icon: <Activity className="w-4 h-4" />,
      phase: 'Phase 9'
    },
    {
      id: 'vibration',
      title: 'Dynamic Vibration Modes',
      subtitle: 'Resonant Frequencies (84.5 Hz)',
      icon: <Radio className="w-4 h-4" />,
      phase: 'Phase 10'
    },
    {
      id: 'optimisation',
      title: 'Design Optimisation',
      subtitle: 'Pocketing (-28.1% Mass Savings)',
      icon: <Sparkles className="w-4 h-4" />,
      phase: 'Phase 11'
    }
  ];

  return (
    <div className="flex flex-col gap-6">
      {/* Header Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
              <Layers className="w-5 h-5" />
            </span>
            <div>
              <h2 className="text-lg font-bold text-white tracking-wide">
                Visual Engineering Diagrams Studio
              </h2>
              <p className="text-xs text-slate-400">
                Interactive vector blueprints, dynamic FEA heatmaps, animated mode shapes & exploded assemblies
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-cyan-300 bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-800">
          <Info className="w-4 h-4 text-cyan-400 flex-shrink-0" />
          <span>Vector Scalable Graphics • Zero Generic Placeholders</span>
        </div>
      </div>

      {/* Diagram Selector Grid Buttons */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
        {diagramTabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`p-2.5 rounded-xl border text-left transition-all flex flex-col justify-between gap-1.5 ${
                isActive
                  ? 'bg-cyan-950/60 border-cyan-500 text-white shadow-lg shadow-cyan-500/10 ring-1 ring-cyan-500/40'
                  : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className={`p-1.5 rounded-lg ${isActive ? 'bg-cyan-500/20 text-cyan-300' : 'bg-slate-800 text-slate-400'}`}>
                  {tab.icon}
                </span>
                <span className="text-[9px] font-mono text-cyan-400/80 px-1 py-0.5 rounded bg-slate-950/80">
                  {tab.phase}
                </span>
              </div>
              <div>
                <div className="font-semibold text-xs leading-snug truncate">{tab.title}</div>
                <div className="text-[10px] text-slate-500 truncate mt-0.5">{tab.subtitle}</div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Render Active Diagram */}
      <div className="transition-all duration-200">
        {activeTab === 'blueprint' && <RotorArmBlueprint />}
        {activeTab === 'quadcopter' && <QuadcopterDiagram />}
        {activeTab === 'exploded' && <ExplodedAssemblyDiagram />}
        {activeTab === 'fbd' && <FreeBodyDiagram />}
        {activeTab === 'mesh' && <MeshDiagram />}
        {activeTab === 'fea' && <FeaStressDiagram />}
        {activeTab === 'vibration' && <VibrationModesDiagram />}
        {activeTab === 'optimisation' && <OptimisationDiagram />}
      </div>
    </div>
  );
};
