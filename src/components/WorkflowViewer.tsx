import React, { useState } from 'react';
import {
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  Wrench,
  AlertOctagon,
  Clock,
  Compass,
  FileCheck2,
  Sparkles,
  Info,
  Maximize2
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { WORKFLOW_PHASES } from '../data/phasesData';
import { PhaseId } from '../types';
import { QuadcopterDiagram } from './diagrams/QuadcopterDiagram';
import { RotorArmBlueprint } from './diagrams/RotorArmBlueprint';
import { FreeBodyDiagram } from './diagrams/FreeBodyDiagram';
import { MeshDiagram } from './diagrams/MeshDiagram';
import { FeaStressDiagram } from './diagrams/FeaStressDiagram';
import { ExplodedAssemblyDiagram } from './diagrams/ExplodedAssemblyDiagram';
import { VibrationModesDiagram } from './diagrams/VibrationModesDiagram';
import { OptimisationDiagram } from './diagrams/OptimisationDiagram';

interface WorkflowViewerProps {
  completedPhases: number[];
  onTogglePhaseComplete: (phaseId: number) => void;
  checkedTasks: Record<string, boolean>;
  onToggleTask: (taskId: string) => void;
  initialPhaseId?: number;
}

export const WorkflowViewer: React.FC<WorkflowViewerProps> = ({
  completedPhases,
  onTogglePhaseComplete,
  checkedTasks,
  onToggleTask,
  initialPhaseId = 1
}) => {
  const [activePhaseId, setActivePhaseId] = useState<number>(initialPhaseId);

  const activePhase = WORKFLOW_PHASES.find((p) => p.id === activePhaseId) || WORKFLOW_PHASES[0];
  const isCompleted = completedPhases.includes(activePhase.id);

  const handleNextPhase = () => {
    if (activePhaseId < 12) {
      setActivePhaseId(activePhaseId + 1);
      window.scrollTo({ top: 120, behavior: 'smooth' });
    }
  };

  const handlePrevPhase = () => {
    if (activePhaseId > 1) {
      setActivePhaseId(activePhaseId - 1);
      window.scrollTo({ top: 120, behavior: 'smooth' });
    }
  };

  const handleCompleteCurrent = () => {
    onTogglePhaseComplete(activePhase.id);
    if (!isCompleted && completedPhases.length === 11) {
      // Completed all 12! Confetti blast
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 }
      });
    }
    if (!isCompleted && activePhaseId < 12) {
      setActivePhaseId(activePhaseId + 1);
    }
  };

  // Render diagram based on phase
  const renderPhaseDiagram = () => {
    switch (activePhase.diagramType) {
      case 'quadcopter':
        return <QuadcopterDiagram />;
      case 'blueprint':
        return <RotorArmBlueprint />;
      case 'exploded':
        return <ExplodedAssemblyDiagram />;
      case 'fbd':
        return <FreeBodyDiagram />;
      case 'mesh':
        return <MeshDiagram />;
      case 'fea':
        return <FeaStressDiagram />;
      case 'vibration':
        return <VibrationModesDiagram />;
      case 'optimisation':
        return <OptimisationDiagram />;
      default:
        return <RotorArmBlueprint />;
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      {/* ============================================================== */}
      {/* LEFT SIDEBAR: 12-PHASE STEPPER NAVIGATOR */}
      {/* ============================================================== */}
      <div className="w-full lg:w-72 xl:w-80 flex-shrink-0 flex flex-col gap-3">
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 shadow-xl">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-cyan-400 font-mono">
              12-Phase Engineering Workflow
            </h3>
            <span className="text-[11px] font-mono text-slate-400">
              {completedPhases.length} / 12 Done
            </span>
          </div>

          {/* Progress bar */}
          <div className="w-full bg-slate-950 rounded-full h-1.5 overflow-hidden mb-4 border border-slate-800">
            <div
              className="bg-gradient-to-r from-cyan-500 to-blue-500 h-full rounded-full transition-all duration-300"
              style={{ width: `${(completedPhases.length / 12) * 100}%` }}
            />
          </div>

          {/* Phase items list */}
          <div className="flex flex-col gap-1.5 max-h-[640px] overflow-y-auto pr-1">
            {WORKFLOW_PHASES.map((phase) => {
              const isActive = phase.id === activePhaseId;
              const isDone = completedPhases.includes(phase.id);

              return (
                <button
                  key={phase.id}
                  onClick={() => setActivePhaseId(phase.id)}
                  className={`w-full text-left p-2.5 rounded-lg border transition-all flex items-start gap-2.5 ${
                    isActive
                      ? 'bg-cyan-950/60 border-cyan-500 text-white shadow-md'
                      : 'bg-slate-950/50 border-slate-800/80 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                  }`}
                >
                  <span
                    onClick={(e) => {
                      e.stopPropagation();
                      onTogglePhaseComplete(phase.id);
                    }}
                    className={`mt-0.5 w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 text-[10px] font-mono transition-colors ${
                      isDone
                        ? 'bg-emerald-500 text-slate-950 font-bold'
                        : 'bg-slate-800 text-slate-400 border border-slate-700'
                    }`}
                    title={isDone ? 'Mark Incomplete' : 'Mark Complete'}
                  >
                    {isDone ? '✓' : phase.id}
                  </span>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider">
                        PHASE {phase.id}
                      </span>
                      <span className="text-[9px] text-slate-500 font-mono">
                        {phase.estimatedMinutes}m
                      </span>
                    </div>
                    <div className="text-xs font-medium text-slate-200 truncate mt-0.5">
                      {phase.title}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ============================================================== */}
      {/* MAIN VIEWPORT: ACTIVE PHASE LEARNING MODULE */}
      {/* ============================================================== */}
      <div className="flex-1 flex flex-col gap-6">
        {/* Phase Header Card */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-xl flex flex-col gap-4">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 font-mono text-sm font-bold">
                PHASE {activePhase.id} OF 12
              </span>
              <span className="px-2.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-300 text-xs font-mono">
                {activePhase.category}
              </span>
              <span className="flex items-center gap-1 text-slate-400 text-xs font-mono">
                <Clock className="w-3.5 h-3.5 text-slate-500" />
                {activePhase.estimatedMinutes} min study
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handlePrevPhase}
                disabled={activePhaseId === 1}
                className="p-1.5 rounded-lg border border-slate-800 bg-slate-950 text-slate-300 hover:text-white disabled:opacity-40 disabled:hover:text-slate-300 transition-colors"
                title="Previous Phase"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={handleCompleteCurrent}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                  isCompleted
                    ? 'bg-emerald-500/20 border border-emerald-500/50 text-emerald-300'
                    : 'bg-cyan-500 hover:bg-cyan-400 text-slate-950'
                }`}
              >
                <CheckCircle2 className="w-4 h-4" />
                {isCompleted ? 'Completed' : 'Mark Complete'}
              </button>
              <button
                onClick={handleNextPhase}
                disabled={activePhaseId === 12}
                className="p-1.5 rounded-lg border border-slate-800 bg-slate-950 text-slate-300 hover:text-white disabled:opacity-40 disabled:hover:text-slate-300 transition-colors"
                title="Next Phase"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              {activePhase.title}
            </h1>
            <p className="text-sm text-cyan-300/80 mt-1 font-medium">
              {activePhase.subtitle}
            </p>
          </div>

          {/* SolidWorks Navigation Banner */}
          {activePhase.solidworksTool && (
            <div className="bg-slate-950 border border-cyan-500/30 rounded-lg p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
              <div className="flex items-center gap-2">
                <Wrench className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                <div>
                  <span className="text-[10px] text-slate-400 font-mono uppercase block">SOLIDWORKS TOOL:</span>
                  <span className="text-xs font-bold text-white font-mono">{activePhase.solidworksTool}</span>
                </div>
              </div>
              <div className="sm:text-right font-mono text-xs">
                <span className="text-[10px] text-slate-400 uppercase block">EXACT MENU NAVIGATION:</span>
                <span className="text-cyan-300 font-semibold">{activePhase.menuPath}</span>
              </div>
            </div>
          )}

          {/* Objective Statement */}
          <div className="bg-slate-950/80 p-3.5 rounded-lg border border-slate-800 text-xs">
            <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-400 font-bold block mb-1">
              ENGINEERING OBJECTIVE:
            </span>
            <p className="text-slate-200 leading-relaxed">{activePhase.objective}</p>
          </div>

          {/* Key Concepts Pills */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-[10px] text-slate-500 font-mono uppercase mr-1">CONCEPTS:</span>
            {activePhase.keyConcepts.map((concept, idx) => (
              <span
                key={idx}
                className="px-2 py-0.5 rounded-full bg-slate-800/80 border border-slate-700 text-slate-300 text-[11px] font-mono"
              >
                {concept}
              </span>
            ))}
          </div>
        </div>

        {/* STEP-BY-STEP INSTRUCTIONS ACCORDION */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-xl flex flex-col gap-4">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-cyan-400 font-mono flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            Detailed CAD & Analysis Methodology
          </h3>

          <div className="flex flex-col gap-3">
            {activePhase.instructions.map((step) => (
              <div
                key={step.step}
                className="bg-slate-950 p-4 rounded-lg border border-slate-800/80 flex flex-col gap-1.5"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-cyan-500/20 border border-cyan-500/50 text-cyan-300 flex items-center justify-center font-mono text-xs font-bold">
                      {step.step}
                    </span>
                    <h4 className="text-sm font-semibold text-white">{step.title}</h4>
                  </div>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed pl-7">
                  {step.description}
                </p>

                {step.tip && (
                  <div className="ml-7 mt-1 px-3 py-1.5 rounded bg-cyan-950/40 border-l-2 border-cyan-400 text-[11px] text-cyan-200">
                    <span className="font-semibold text-cyan-300 font-mono">CAD Pro-Tip: </span>
                    {step.tip}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* EMBEDDED TECHNICAL DIAGRAM FOR THIS PHASE */}
        <div>
          {renderPhaseDiagram()}
        </div>

        {/* EXPECTED OUTCOME CARD */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 shadow-xl">
          <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 font-bold block mb-1">
            EXPECTED DELIVERABLE OUTCOME:
          </span>
          <p className="text-xs text-slate-200 leading-relaxed font-mono">
            {activePhase.expectedOutcome}
          </p>
        </div>

        {/* COMMON BEGINNER MISTAKES & TROUBLESHOOTING */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-xl flex flex-col gap-4">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-rose-400 font-mono flex items-center gap-2">
            <AlertOctagon className="w-4 h-4 text-rose-400" />
            Common Beginner Mistakes & Direct Solutions
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {activePhase.commonMistakes.map((mistake, idx) => (
              <div
                key={idx}
                className="bg-slate-950 p-3.5 rounded-lg border border-slate-800 flex flex-col justify-between gap-2"
              >
                <div>
                  <div className="text-rose-300 font-semibold text-xs flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
                    {mistake.mistake}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1">
                    <strong className="text-slate-300">Consequence:</strong> {mistake.consequence}
                  </div>
                </div>

                <div className="mt-2 p-2 rounded bg-slate-900 border border-emerald-900/40 text-[11px] text-emerald-300">
                  <span className="font-bold font-mono">Direct Fix: </span>
                  {mistake.fix}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* PHASE VERIFICATION CHECKLIST */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-xl flex flex-col gap-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-cyan-400 font-mono flex items-center gap-2">
              <FileCheck2 className="w-4 h-4 text-cyan-400" />
              Phase Verification Checklist (Save to Progress)
            </h3>
            <span className="text-[11px] font-mono text-slate-400">
              {activePhase.checklist.filter((item) => checkedTasks[`${activePhase.id}-${item}`]).length} /{' '}
              {activePhase.checklist.length} Verified
            </span>
          </div>

          <div className="grid grid-cols-1 gap-2">
            {activePhase.checklist.map((item, idx) => {
              const taskId = `${activePhase.id}-${item}`;
              const isChecked = !!checkedTasks[taskId];

              return (
                <label
                  key={idx}
                  className={`flex items-start gap-3 p-2.5 rounded-lg border cursor-pointer transition-all ${
                    isChecked
                      ? 'bg-emerald-950/20 border-emerald-500/40 text-emerald-200'
                      : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => onToggleTask(taskId)}
                    className="mt-0.5 accent-emerald-500 w-4 h-4 rounded cursor-pointer"
                  />
                  <span className={`text-xs ${isChecked ? 'line-through text-slate-400' : ''}`}>
                    {item}
                  </span>
                </label>
              );
            })}
          </div>
        </div>

        {/* Bottom Navigation Buttons */}
        <div className="flex items-center justify-between pt-2">
          <button
            onClick={handlePrevPhase}
            disabled={activePhaseId === 1}
            className="px-4 py-2 rounded-lg border border-slate-800 bg-slate-900 text-slate-300 hover:text-white disabled:opacity-30 disabled:pointer-events-none transition-colors flex items-center gap-2 text-xs font-semibold"
          >
            <ChevronLeft className="w-4 h-4" />
            Previous Phase
          </button>

          <button
            onClick={handleCompleteCurrent}
            className="px-5 py-2.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold transition-all flex items-center gap-2 shadow-lg shadow-cyan-500/20"
          >
            <CheckCircle2 className="w-4 h-4" />
            {isCompleted ? 'Phase Completed (Next)' : 'Confirm Phase Complete'}
          </button>

          <button
            onClick={handleNextPhase}
            disabled={activePhaseId === 12}
            className="px-4 py-2 rounded-lg border border-slate-800 bg-slate-900 text-slate-300 hover:text-white disabled:opacity-30 disabled:pointer-events-none transition-colors flex items-center gap-2 text-xs font-semibold"
          >
            Next Phase
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
