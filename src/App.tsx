/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar, TabId } from './components/Navbar';
import { Dashboard } from './components/Dashboard';
import { WorkflowViewer } from './components/WorkflowViewer';
import { DiagramsStudio } from './components/DiagramsStudio';
import { CalculationLab } from './components/CalculationLab';
import { ReportGenerator } from './components/ReportGenerator';
import { KnowledgeHub } from './components/KnowledgeHub';
import { ReportData, ProjectNote } from './types';
import { RotateCw, ShieldCheck, Github, ExternalLink, Heart } from 'lucide-react';

const STORAGE_KEY_PREFIX = 'rotorlab360_';

const DEFAULT_REPORT_DATA: ReportData = {
  studentName: 'SOURASISH KUNDU',
  rollNumber: '120230020150',
  stream: 'B.Tech Mechanical Engineering',
  section: 'Section B (Batch 2026)',
  semester: 'Semester II',
  academicYear: '2026-2027',
  institution: 'Institute of Engineering & Management (IEM), Kolkata',
  courseCode: 'ESCME192',
  instructorName: 'Prof. S. Sengupta / Faculty Evaluator',
  submissionDate: new Date().toISOString().split('T')[0],

  armLength: 200.0,
  armWidth: 20.0,
  armThickness: 5.0,
  selectedMaterial: 'Aluminium 6061-T6 (Yield = 276.0 MPa, E = 68.9 GPa)',

  meshType: 'Curvature-Based 10-Node Second-Order Tetrahedral Mesh',
  elementSize: 2.5,
  nodeCount: 38650,
  elementCount: 24180,
  maxStressMPa: 67.6,
  yieldStressMPa: 276.0,
  maxDisplacementMm: 0.820,
  factorOfSafety: 4.08,
  mode1FreqHz: 84.5,
  mode2FreqHz: 215.2,

  originalMassGrams: 54.0,
  optimisedMassGrams: 38.8,
  massReductionPct: 28.1,
  optimisedFOS: 3.52,

  studentRemarks:
    'Euler-Bernoulli cantilever beam formulations predicted nominal bending stresses of 108.2 MPa. SolidWorks FEA accurately accounted for stress dilution across the widened 40mm root tab and localized stress concentration Kt at the R3mm fillets, resolving a peak stress of 67.6 MPa with an exceptional 4.08 Factor of Safety. Enlarging fillets to R4.5mm and pocketing reduced structural weight by 28.1% with zero flutter risk.',
  uploadedScreenshots: []
};

export default function App() {
  const [activeTab, setActiveTab] = useState<TabId>('dashboard');
  const [activePhaseId, setActivePhaseId] = useState<number>(1);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);

  // Completed phases tracker
  const [completedPhases, setCompletedPhases] = useState<number[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY_PREFIX}completed_phases`);
      return saved ? JSON.parse(saved) : [1, 2];
    } catch {
      return [1, 2];
    }
  });

  // Checked verification checklist tasks
  const [checkedTasks, setCheckedTasks] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY_PREFIX}checked_tasks`);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // Submission checklist items
  const [submissionChecklist, setSubmissionChecklist] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY_PREFIX}submission_checklist`);
      return saved ? JSON.parse(saved) : { sw_model_saved: true, holes_wizard: true };
    } catch {
      return { sw_model_saved: true, holes_wizard: true };
    }
  });

  // Student notes
  const [notes, setNotes] = useState<ProjectNote[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY_PREFIX}notes`);
      return saved
        ? JSON.parse(saved)
        : [
            {
              id: 'sample-1',
              title: 'Fillet Radius Sensitivity Observation',
              content:
                'Increasing root fillet radius from 1.0mm to 3.0mm reduced peak stress from 124 MPa down to 67.6 MPa in SolidWorks Simulation, eliminating yellow stress warnings.',
              timestamp: '2026-11-07 10:15',
              tags: ['ESCME192', 'FEA']
            }
          ];
    } catch {
      return [];
    }
  });

  // Engineering Report state
  const [reportData, setReportData] = useState<ReportData>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY_PREFIX}report_data`);
      return saved ? JSON.parse(saved) : DEFAULT_REPORT_DATA;
    } catch {
      return DEFAULT_REPORT_DATA;
    }
  });

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY_PREFIX}completed_phases`, JSON.stringify(completedPhases));
  }, [completedPhases]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY_PREFIX}checked_tasks`, JSON.stringify(checkedTasks));
  }, [checkedTasks]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY_PREFIX}submission_checklist`, JSON.stringify(submissionChecklist));
  }, [submissionChecklist]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY_PREFIX}notes`, JSON.stringify(notes));
  }, [notes]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY_PREFIX}report_data`, JSON.stringify(reportData));
  }, [reportData]);

  // Handle theme class
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Handlers
  const handleTogglePhaseComplete = (phaseId: number) => {
    setCompletedPhases((prev) =>
      prev.includes(phaseId) ? prev.filter((id) => id !== phaseId) : [...prev, phaseId]
    );
  };

  const handleToggleTask = (taskId: string) => {
    setCheckedTasks((prev) => ({
      ...prev,
      [taskId]: !prev[taskId]
    }));
  };

  const handleToggleChecklistItem = (key: string) => {
    setSubmissionChecklist((prev) => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleAddNote = (newNote: Omit<ProjectNote, 'id' | 'timestamp'>) => {
    const note: ProjectNote = {
      ...newNote,
      id: Date.now().toString(),
      timestamp: new Date().toLocaleString()
    };
    setNotes((prev) => [note, ...prev]);
  };

  const handleDeleteNote = (id: string) => {
    setNotes((prev) => prev.filter((n) => n.id !== id));
  };

  const handleUpdateReportData = (data: Partial<ReportData>) => {
    setReportData((prev) => ({ ...prev, ...data }));
  };

  const handleNavigateToPhase = (phaseId: number) => {
    setActivePhaseId(phaseId);
    setActiveTab('workflow');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleExportCalcToReport = (results: {
    maxStress: number;
    deflection: number;
    fos: number;
  }) => {
    handleUpdateReportData({
      maxStressMPa: Number(results.maxStress.toFixed(1)),
      maxDisplacementMm: Number(results.deflection.toFixed(3)),
      factorOfSafety: Number(results.fos.toFixed(2))
    });
  };

  return (
    <div className={`min-h-screen flex flex-col ${isDarkMode ? 'bg-slate-950 text-slate-100' : 'bg-slate-100 text-slate-900'}`}>
      {/* Primary Sticky Header */}
      <Navbar
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        completedPhasesCount={completedPhases.length}
        totalPhasesCount={12}
        isDarkMode={isDarkMode}
        onToggleTheme={() => setIsDarkMode(!isDarkMode)}
      />

      {/* Main Content Workspace */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {activeTab === 'dashboard' && (
          <Dashboard
            completedPhases={completedPhases}
            onNavigateToPhase={handleNavigateToPhase}
            onNavigateToTab={setActiveTab}
          />
        )}

        {activeTab === 'workflow' && (
          <WorkflowViewer
            completedPhases={completedPhases}
            onTogglePhaseComplete={handleTogglePhaseComplete}
            checkedTasks={checkedTasks}
            onToggleTask={handleToggleTask}
            initialPhaseId={activePhaseId}
          />
        )}

        {activeTab === 'diagrams' && <DiagramsStudio />}

        {activeTab === 'calculator' && (
          <CalculationLab onExportToReport={handleExportCalcToReport} />
        )}

        {activeTab === 'report' && (
          <ReportGenerator
            reportData={reportData}
            onUpdateReportData={handleUpdateReportData}
          />
        )}

        {activeTab === 'hub' && (
          <KnowledgeHub
            notes={notes}
            onAddNote={handleAddNote}
            onDeleteNote={handleDeleteNote}
            submissionChecklist={submissionChecklist}
            onToggleChecklistItem={handleToggleChecklistItem}
          />
        )}
      </main>

      {/* Application Footer */}
      <footer className="no-print mt-auto border-t border-slate-800 bg-slate-950/80 text-slate-400 text-xs font-mono py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <RotateCw className="w-4 h-4 text-cyan-400" />
            <span className="font-bold text-white">ROTORLAB 360</span>
            <span className="text-slate-600">|</span>
            <span>AeroForge Drone Rotor Arm Design & Simulation Studio</span>
          </div>

          <div className="text-center md:text-right text-[11px] text-slate-500">
            <div>Course: IEM Engineering Graphics & Design (ESCME192)</div>
            <div className="text-slate-400 mt-0.5">
              Developed for Department of Mechanical Engineering • SolidWorks CAD & Simulation Companion
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
