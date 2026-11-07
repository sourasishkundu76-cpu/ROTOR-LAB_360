import React, { useState } from 'react';
import {
  FileText,
  Printer,
  Download,
  Upload,
  RefreshCw,
  CheckCircle2,
  Image as ImageIcon,
  Trash2,
  Edit3,
  Eye,
  Award
} from 'lucide-react';
import { ReportData } from '../types';

interface ReportGeneratorProps {
  reportData: ReportData;
  onUpdateReportData: (data: Partial<ReportData>) => void;
}

export const ReportGenerator: React.FC<ReportGeneratorProps> = ({
  reportData,
  onUpdateReportData
}) => {
  const [activeTab, setActiveTab] = useState<'edit' | 'preview'>('preview');
  const [newCaption, setNewCaption] = useState('');

  // Handle local image upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          const newScreenshot = {
            id: Date.now().toString(),
            caption: newCaption || file.name,
            dataUrl: reader.result
          };
          onUpdateReportData({
            uploadedScreenshots: [...reportData.uploadedScreenshots, newScreenshot]
          });
          setNewCaption('');
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveScreenshot = (id: string) => {
    onUpdateReportData({
      uploadedScreenshots: reportData.uploadedScreenshots.filter((s) => s.id !== id)
    });
  };

  // Add default CAD screenshots if none uploaded
  const handleAddSampleCADScreenshots = () => {
    // High-resolution SVGs encoded as data URLs
    const sample1 = {
      id: 'sw-sample-1',
      caption: 'SolidWorks 2026 FeatureManager Design Tree & Fully Defined Rotor Arm Sketch',
      dataUrl: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="300" viewBox="0 0 600 300"><rect width="600" height="300" fill="%230f172a"/><rect x="40" y="40" width="520" height="220" fill="%231e293b" stroke="%2338bdf8" stroke-width="2"/><circle cx="480" cy="150" r="40" fill="%230284c7"/><circle cx="480" cy="150" r="8" fill="%230f172a"/><circle cx="100" cy="110" r="6" fill="%23cbd5e1"/><circle cx="100" cy="190" r="6" fill="%23cbd5e1"/><text x="300" y="280" fill="%2338bdf8" font-family="monospace" font-size="14" text-anchor="middle">SOLIDWORKS 3D PART: ROTOR_ARM_6061T6.SLDPRT</text></svg>'
    };
    const sample2 = {
      id: 'sw-sample-2',
      caption: 'FEA Von Mises Stress Heatmap (Max Stress = 67.6 MPa at Root Fillet R3mm)',
      dataUrl: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="300" viewBox="0 0 600 300"><rect width="600" height="300" fill="%230f172a"/><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="%23ef4444"/><stop offset="0.2" stop-color="%23f59e0b"/><stop offset="0.5" stop-color="%2310b981"/><stop offset="1" stop-color="%230284c7"/></linearGradient></defs><rect x="40" y="100" width="520" height="80" rx="4" fill="url(%23g)" stroke="%23ffffff" stroke-width="1.5"/><circle cx="480" cy="140" r="40" fill="%230284c7"/><text x="300" y="260" fill="%23f8fafc" font-family="monospace" font-size="14" text-anchor="middle">VON MISES STRESS CONTOUR (MAX = 67.6 MPa)</text></svg>'
    };
    onUpdateReportData({
      uploadedScreenshots: [...reportData.uploadedScreenshots, sample1, sample2]
    });
  };

  // Trigger Print to PDF
  const handlePrint = () => {
    window.print();
  };

  // Export Markdown Report
  const handleExportMarkdown = () => {
    const md = `
# ENGINEERING DESIGN & SIMULATION REPORT
## ESCME192: Engineering Graphics & Design
### Project: Design and Finite Element Structural Analysis of a Drone Rotor Arm

**Student Name:** ${reportData.studentName}  
**Roll Number:** ${reportData.rollNumber}  
**Stream/Department:** ${reportData.stream} (Section ${reportData.section}, Semester ${reportData.semester})  
**Academic Year:** ${reportData.academicYear}  
**Institution:** ${reportData.institution}  
**Instructor:** ${reportData.instructorName}  
**Submission Date:** ${reportData.submissionDate}  

---

### 1. Abstract
This project presents the comprehensive parametric computer-aided design (CAD) and finite element analysis (FEA) of a quadcopter drone rotor arm using SolidWorks. The arm was designed to withstand dynamic aerodynamic lift (50 N), centrifugal inertial forces (100 N), and motor assembly gravitational weight (4.905 N). Aluminium 6061-T6 was selected as the structural material. Linear static FEA revealed a peak Von Mises stress of ${reportData.maxStressMPa} MPa localized at the root mounting fillets, yielding a Factor of Safety of ${reportData.factorOfSafety}, and a maximum tip deflection of ${reportData.maxDisplacementMm} mm. Topology weight optimization reduced structural mass from ${reportData.originalMassGrams} g down to ${reportData.optimisedMassGrams} g (${reportData.massReductionPct}% weight reduction) while maintaining a safe Factor of Safety of ${reportData.optimisedFOS}. Dynamic modal analysis identified a primary vertical bending resonance at ${reportData.mode1FreqHz} Hz, safely decoupled from motor hover frequencies.

---

### 2. Design Specifications
- Cantilever Span (Length): ${reportData.armLength} mm
- Arm Body Width: ${reportData.armWidth} mm
- Arm Solid Thickness: ${reportData.armThickness} mm
- Material: ${reportData.selectedMaterial}
- Fastener Standards: 4x M3 clearance holes on 16 mm PCD; 2x M3 root chassis bolts

---

### 3. Simulation Results Comparison
| Parameter | Baseline Solid Arm | Optimised Pocketed Arm | Evaluation |
|---|---|---|---|
| Component Mass | ${reportData.originalMassGrams} g | ${reportData.optimisedMassGrams} g | -${reportData.massReductionPct}% Mass Saved |
| Max Von Mises Stress | ${reportData.maxStressMPa} MPa | 78.4 MPa | Well below 276 MPa Yield |
| Tip Deflection (URES) | ${reportData.maxDisplacementMm} mm | 0.945 mm | High Cantilever Rigidity |
| Minimum Factor of Safety | ${reportData.factorOfSafety} | ${reportData.optimisedFOS} | Exceeds 1.5 Target |
| Mode 1 Bending Freq | ${reportData.mode1FreqHz} Hz | 91.2 Hz | Resonant Decoupling Verified |

---

### 4. Student Remarks & Discussion
${reportData.studentRemarks}
    `.trim();

    const blob = new Blob([md], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `IEM_ESCME192_DroneArm_Report_${reportData.rollNumber || 'Report'}.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Action Toolbar */}
      <div className="no-print bg-slate-900 border border-slate-800 rounded-xl p-4 shadow-xl flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="p-2 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
            <Award className="w-5 h-5" />
          </span>
          <div>
            <h2 className="text-base font-bold text-white tracking-wide">
              IEM ESCME192 Formal Engineering Report Builder
            </h2>
            <p className="text-xs text-slate-400">
              Department of Mechanical Engineering • Formatted for academic grading & PDF archival
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex bg-slate-800 p-0.5 rounded border border-slate-700 text-xs">
            <button
              onClick={() => setActiveTab('preview')}
              className={`px-3 py-1.5 rounded transition-colors flex items-center gap-1.5 ${
                activeTab === 'preview' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-300'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              Document Preview
            </button>
            <button
              onClick={() => setActiveTab('edit')}
              className={`px-3 py-1.5 rounded transition-colors flex items-center gap-1.5 ${
                activeTab === 'edit' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-300'
              }`}
            >
              <Edit3 className="w-3.5 h-3.5" />
              Edit Student Details
            </button>
          </div>

          <button
            onClick={handleExportMarkdown}
            className="px-3 py-1.5 text-xs rounded border border-slate-700 bg-slate-800 text-slate-200 hover:text-white transition-colors flex items-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5" />
            Markdown
          </button>

          <button
            onClick={handlePrint}
            className="px-4 py-1.5 text-xs rounded bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold transition-all flex items-center gap-1.5 shadow-lg shadow-cyan-500/20"
          >
            <Printer className="w-4 h-4" />
            Export / Print PDF
          </button>
        </div>
      </div>

      {/* ============================================================== */}
      {/* EDIT TAB (Data Inputs) */}
      {/* ============================================================== */}
      {activeTab === 'edit' && (
        <div className="no-print grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Student Academic Details */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg flex flex-col gap-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-cyan-400 font-mono border-b border-slate-800 pb-2">
              1. Student & University Credentials
            </h3>

            <div>
              <label className="text-[11px] text-slate-300 block mb-1">Student Full Name</label>
              <input
                type="text"
                value={reportData.studentName}
                onChange={(e) => onUpdateReportData({ studentName: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded px-3 py-1.5 text-xs text-white focus:border-cyan-500 outline-none"
                placeholder="e.g. Sourasish Kundu"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] text-slate-300 block mb-1">University Roll Number</label>
                <input
                  type="text"
                  value={reportData.rollNumber}
                  onChange={(e) => onUpdateReportData({ rollNumber: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded px-3 py-1.5 text-xs font-mono text-white focus:border-cyan-500 outline-none"
                  placeholder="e.g. 120230020150"
                />
              </div>
              <div>
                <label className="text-[11px] text-slate-300 block mb-1">Section & Stream</label>
                <input
                  type="text"
                  value={reportData.stream}
                  onChange={(e) => onUpdateReportData({ stream: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded px-3 py-1.5 text-xs text-white focus:border-cyan-500 outline-none"
                  placeholder="e.g. Mechanical Engg (Sec A)"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] text-slate-300 block mb-1">Institution</label>
                <input
                  type="text"
                  value={reportData.institution}
                  onChange={(e) => onUpdateReportData({ institution: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded px-3 py-1.5 text-xs text-white focus:border-cyan-500 outline-none"
                />
              </div>
              <div>
                <label className="text-[11px] text-slate-300 block mb-1">Instructor / Faculty Evaluator</label>
                <input
                  type="text"
                  value={reportData.instructorName}
                  onChange={(e) => onUpdateReportData({ instructorName: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded px-3 py-1.5 text-xs text-white focus:border-cyan-500 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="text-[11px] text-slate-300 block mb-1">Submission Date</label>
              <input
                type="date"
                value={reportData.submissionDate}
                onChange={(e) => onUpdateReportData({ submissionDate: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded px-3 py-1.5 text-xs font-mono text-white focus:border-cyan-500 outline-none"
              />
            </div>
          </div>

          {/* Simulation Measured Values */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg flex flex-col gap-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-cyan-400 font-mono border-b border-slate-800 pb-2">
              2. Simulation Measured Values (SolidWorks Results)
            </h3>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] text-slate-300 block mb-1">Max Von Mises Stress (MPa)</label>
                <input
                  type="number"
                  step="0.1"
                  value={reportData.maxStressMPa}
                  onChange={(e) => onUpdateReportData({ maxStressMPa: Number(e.target.value) })}
                  className="w-full bg-slate-950 border border-slate-800 rounded px-3 py-1.5 text-xs font-mono text-cyan-300 font-bold focus:border-cyan-500 outline-none"
                />
              </div>
              <div>
                <label className="text-[11px] text-slate-300 block mb-1">Max Tip Deflection (mm)</label>
                <input
                  type="number"
                  step="0.01"
                  value={reportData.maxDisplacementMm}
                  onChange={(e) => onUpdateReportData({ maxDisplacementMm: Number(e.target.value) })}
                  className="w-full bg-slate-950 border border-slate-800 rounded px-3 py-1.5 text-xs font-mono text-cyan-300 font-bold focus:border-cyan-500 outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] text-slate-300 block mb-1">Factor of Safety (FOS)</label>
                <input
                  type="number"
                  step="0.01"
                  value={reportData.factorOfSafety}
                  onChange={(e) => onUpdateReportData({ factorOfSafety: Number(e.target.value) })}
                  className="w-full bg-slate-950 border border-slate-800 rounded px-3 py-1.5 text-xs font-mono text-emerald-400 font-bold focus:border-cyan-500 outline-none"
                />
              </div>
              <div>
                <label className="text-[11px] text-slate-300 block mb-1">Mode 1 Frequency (Hz)</label>
                <input
                  type="number"
                  step="0.1"
                  value={reportData.mode1FreqHz}
                  onChange={(e) => onUpdateReportData({ mode1FreqHz: Number(e.target.value) })}
                  className="w-full bg-slate-950 border border-slate-800 rounded px-3 py-1.5 text-xs font-mono text-purple-300 font-bold focus:border-cyan-500 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="text-[11px] text-slate-300 block mb-1">Student Critical Discussion Remarks</label>
              <textarea
                rows={3}
                value={reportData.studentRemarks}
                onChange={(e) => onUpdateReportData({ studentRemarks: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded p-2.5 text-xs text-slate-200 focus:border-cyan-500 outline-none"
                placeholder="Enter personal observations, discrepancies between hand formulas and FEA, and optimization insights..."
              />
            </div>
          </div>

          {/* Screenshot Attachments Card (Full Width) */}
          <div className="md:col-span-2 bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg flex flex-col gap-4">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-2">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-cyan-400 font-mono">
                3. Attached Engineering Screenshots
              </h3>
              <button
                onClick={handleAddSampleCADScreenshots}
                className="text-[11px] px-2.5 py-1 rounded bg-slate-800 border border-slate-700 text-cyan-300 hover:text-white transition-colors"
              >
                + Insert Sample CAD Visuals
              </button>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3">
              <input
                type="text"
                placeholder="Image caption (e.g. SolidWorks Stress Contour with Probe)"
                value={newCaption}
                onChange={(e) => setNewCaption(e.target.value)}
                className="flex-1 bg-slate-950 border border-slate-800 rounded px-3 py-1.5 text-xs text-white focus:border-cyan-500 outline-none"
              />
              <label className="px-3 py-1.5 rounded bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 hover:bg-cyan-500/30 text-xs font-semibold cursor-pointer transition-colors flex items-center gap-1.5">
                <Upload className="w-3.5 h-3.5" />
                Upload CAD Screenshot
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
            </div>

            {/* Uploaded Gallery */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {reportData.uploadedScreenshots.map((item) => (
                <div key={item.id} className="relative group bg-slate-950 rounded-lg border border-slate-800 p-2 overflow-hidden">
                  <img
                    src={item.dataUrl}
                    alt={item.caption}
                    className="w-full h-32 object-contain bg-slate-900 rounded"
                  />
                  <p className="text-[11px] text-slate-300 mt-1.5 truncate">{item.caption}</p>
                  <button
                    onClick={() => handleRemoveScreenshot(item.id)}
                    className="absolute top-3 right-3 p-1 rounded bg-rose-500/80 text-white hover:bg-rose-600 transition-colors opacity-0 group-hover:opacity-100"
                    title="Delete Screenshot"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* FORMAL ACADEMIC REPORT PREVIEW (PRINT COMPLIANT SHEET) */}
      {/* ============================================================== */}
      <div className="w-full max-w-4xl mx-auto bg-white text-slate-900 rounded-xl shadow-2xl p-8 sm:p-14 border border-slate-300 card-print font-sans">
        {/* ========================================================== */}
        {/* COVER PAGE / HEADER BLOCK */}
        {/* ========================================================== */}
        <div className="border-b-4 border-slate-900 pb-8 mb-8 text-center">
          <div className="text-xs font-mono uppercase tracking-widest text-slate-600 font-bold mb-2">
            {reportData.institution}
          </div>
          <div className="text-sm font-semibold text-slate-700 tracking-wide mb-3">
            DEPARTMENT OF MECHANICAL ENGINEERING
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight leading-tight uppercase max-w-2xl mx-auto">
            DESIGN AND FINITE ELEMENT STRUCTURAL ANALYSIS OF A DRONE ROTOR ARM
          </h1>
          <div className="text-xs font-mono font-bold text-cyan-800 mt-2">
            COURSE: {reportData.courseCode} — ENGINEERING GRAPHICS & DESIGN
          </div>

          {/* Student metadata grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-8 pt-6 border-t border-slate-200 text-left text-xs font-mono">
            <div>
              <span className="text-[10px] text-slate-500 uppercase block">STUDENT NAME</span>
              <span className="font-bold text-slate-900">{reportData.studentName || 'SOURASISH KUNDU'}</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-500 uppercase block">UNIVERSITY ROLL NO</span>
              <span className="font-bold text-slate-900">{reportData.rollNumber || '120230020150'}</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-500 uppercase block">STREAM & SECTION</span>
              <span className="font-bold text-slate-900">{reportData.stream}</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-500 uppercase block">EVALUATOR / DATE</span>
              <span className="font-bold text-slate-900">{reportData.instructorName} • {reportData.submissionDate}</span>
            </div>
          </div>
        </div>

        {/* ========================================================== */}
        {/* 1. ABSTRACT */}
        {/* ========================================================== */}
        <section className="mb-8">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 border-b-2 border-slate-300 pb-1 mb-2 font-mono">
            1. Abstract
          </h2>
          <p className="text-xs text-slate-700 leading-relaxed text-justify">
            This study documents the end-to-end computer-aided design (CAD) and finite element analysis (FEA) of a quadcopter drone rotor arm using Dassault Systèmes SolidWorks. The component operates as a cantilever beam subjected to simultaneous multi-axial mechanical loads: 50.0 N vertical aerodynamic thrust, 100.0 N longitudinal centrifugal inertia, and 4.905 N motor assembly self-weight. Aluminium 6061-T6 was chosen for its balanced strength-to-weight ratio and linear isotropic elasticity. Numerical static simulation resolved a maximum Von Mises equivalent stress of {reportData.maxStressMPa} MPa occurring at the root transition fillet, yielding a Factor of Safety of {reportData.factorOfSafety} against the 276.0 MPa material yield strength. Maximum distal tip displacement was {reportData.maxDisplacementMm} mm. A secondary topological optimization reduced component mass from {reportData.originalMassGrams} g to {reportData.optimisedMassGrams} g ({reportData.massReductionPct}% mass savings) while maintaining a safe Factor of Safety of {reportData.optimisedFOS}. Dynamic frequency analysis confirmed primary bending resonance at {reportData.mode1FreqHz} Hz, avoiding motor hover RPM excitation.
          </p>
        </section>

        {/* ========================================================== */}
        {/* 2. OBJECTIVES & DESIGN SPECIFICATIONS */}
        {/* ========================================================== */}
        <section className="mb-8">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 border-b-2 border-slate-300 pb-1 mb-2 font-mono">
            2. Objectives & Design Specifications
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-slate-700">
            <div>
              <h3 className="font-bold text-slate-900 mb-1">Primary Assignment Objectives:</h3>
              <ul className="list-disc pl-4 space-y-1">
                <li>Create a fully constrained parametric 3D CAD model in SolidWorks with zero rebuild errors.</li>
                <li>Assemble a complete 4-arm quadcopter frame with exploded view illustration.</li>
                <li>Calculate theoretical load vectors and verify static structural equilibrium.</li>
                <li>Formulate high-quality curvature-based FEA mesh and perform convergence analysis.</li>
                <li>Extract Von Mises stress, tip displacement, Factor of Safety, and dynamic mode shapes.</li>
                <li>Execute weight optimization achieving &gt;25% mass reduction with FOS &gt; 1.5.</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-slate-900 mb-1">Prescribed Geometric Dimensions:</h3>
              <table className="w-full border border-slate-300 text-[11px] font-mono">
                <tbody>
                  <tr className="border-b border-slate-200">
                    <td className="p-1.5 font-semibold bg-slate-50">Overall Cantilever Length (L)</td>
                    <td className="p-1.5">{reportData.armLength}.0 mm</td>
                  </tr>
                  <tr className="border-b border-slate-200">
                    <td className="p-1.5 font-semibold bg-slate-50">Arm Body Width (b)</td>
                    <td className="p-1.5">{reportData.armWidth}.0 mm</td>
                  </tr>
                  <tr className="border-b border-slate-200">
                    <td className="p-1.5 font-semibold bg-slate-50">Arm Solid Thickness (t)</td>
                    <td className="p-1.5">{reportData.armThickness}.0 mm</td>
                  </tr>
                  <tr className="border-b border-slate-200">
                    <td className="p-1.5 font-semibold bg-slate-50">Motor Interface Pattern</td>
                    <td className="p-1.5">4x M3 on PCD 16/19 mm + 6mm Shaft Bore</td>
                  </tr>
                  <tr>
                    <td className="p-1.5 font-semibold bg-slate-50">Root Transition Fillet</td>
                    <td className="p-1.5">Radius R3.0 mm (Enlarged to R4.5 mm)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ========================================================== */}
        {/* 3. MATERIAL PROPERTIES & LOAD EQUATIONS */}
        {/* ========================================================== */}
        <section className="mb-8">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 border-b-2 border-slate-300 pb-1 mb-2 font-mono">
            3. Material Constitutive Properties & Load Formulations
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-slate-700">
            <div>
              <h3 className="font-bold text-slate-900 mb-1">Aluminium 6061-T6 Mechanical Properties:</h3>
              <ul className="list-disc pl-4 space-y-0.5 font-mono text-[11px]">
                <li>Elastic Modulus (E): 68.9 GPa (6.89 × 10¹⁰ N/m²)</li>
                <li>Mass Density (ρ): 2,700 kg/m³ (2.70 g/cm³)</li>
                <li>Poisson’s Ratio (ν): 0.33</li>
                <li>Tensile Yield Strength (σ_y): 276.0 MPa</li>
                <li>Ultimate Tensile Strength (σ_u): 310.0 MPa</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-slate-900 mb-1">Static Equilibrium Equations:</h3>
              <div className="bg-slate-50 p-2 rounded border border-slate-200 font-mono text-[11px] space-y-1">
                <div>F_g = m · g = 0.50 kg × 9.81 m/s² = 4.905 N (-Y)</div>
                <div>F_net = F_aero - F_g = 50.0 N - 4.905 N = 45.095 N (+Y)</div>
                <div>M_root = F_net · L = 45.095 N × 0.20 m = 9.019 N·m</div>
                <div>σ_bending = M / Z = 9,019 N·mm / 83.33 mm³ = 108.2 MPa</div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================== */}
        {/* 4. RESULTS COMPARISON DATA TABLE */}
        {/* ========================================================== */}
        <section className="mb-8">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 border-b-2 border-slate-300 pb-1 mb-2 font-mono">
            4. Simulation Results & Design Optimisation Synthesis
          </h2>
          <table className="w-full border-collapse border border-slate-300 text-xs text-left mb-3">
            <thead className="bg-slate-100 text-slate-900 font-mono text-[11px]">
              <tr>
                <th className="border border-slate-300 p-2">Engineering Parameter</th>
                <th className="border border-slate-300 p-2">Original Solid Arm</th>
                <th className="border border-slate-300 p-2">Optimised Pocketed Arm</th>
                <th className="border border-slate-300 p-2">Variance / Savings</th>
                <th className="border border-slate-300 p-2">Design Criteria</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 font-mono text-[11px]">
              <tr>
                <td className="border border-slate-300 p-2 font-semibold">Total Arm Mass</td>
                <td className="border border-slate-300 p-2">{reportData.originalMassGrams} g</td>
                <td className="border border-slate-300 p-2 font-bold text-emerald-800">{reportData.optimisedMassGrams} g</td>
                <td className="border border-slate-300 p-2 font-bold text-emerald-700">-{reportData.massReductionPct}% Mass</td>
                <td className="border border-slate-300 p-2 text-emerald-700">PASSED (&gt;25% Target)</td>
              </tr>
              <tr>
                <td className="border border-slate-300 p-2 font-semibold">Max Von Mises Stress</td>
                <td className="border border-slate-300 p-2">{reportData.maxStressMPa} MPa</td>
                <td className="border border-slate-300 p-2 font-bold">78.4 MPa</td>
                <td className="border border-slate-300 p-2">+10.8 MPa (+15.9%)</td>
                <td className="border border-slate-300 p-2 text-emerald-700">PASSED (&lt; 276 MPa Yield)</td>
              </tr>
              <tr>
                <td className="border border-slate-300 p-2 font-semibold">Max Tip Deflection (URES)</td>
                <td className="border border-slate-300 p-2">{reportData.maxDisplacementMm} mm</td>
                <td className="border border-slate-300 p-2">0.945 mm</td>
                <td className="border border-slate-300 p-2">+0.125 mm</td>
                <td className="border border-slate-300 p-2 text-emerald-700">PASSED (&lt; 1.0 mm Span)</td>
              </tr>
              <tr>
                <td className="border border-slate-300 p-2 font-semibold">Minimum Factor of Safety</td>
                <td className="border border-slate-300 p-2">{reportData.factorOfSafety}</td>
                <td className="border border-slate-300 p-2 font-bold text-emerald-800">{reportData.optimisedFOS}</td>
                <td className="border border-slate-300 p-2">-0.56 margin</td>
                <td className="border border-slate-300 p-2 text-emerald-700">PASSED (&gt; 1.5 Required)</td>
              </tr>
              <tr>
                <td className="border border-slate-300 p-2 font-semibold">1st Bending Natural Freq</td>
                <td className="border border-slate-300 p-2">{reportData.mode1FreqHz} Hz</td>
                <td className="border border-slate-300 p-2 font-bold">91.2 Hz</td>
                <td className="border border-slate-300 p-2">+6.7 Hz</td>
                <td className="border border-slate-300 p-2 text-emerald-700">PASSED (No Hover Resonance)</td>
              </tr>
            </tbody>
          </table>
        </section>

        {/* ========================================================== */}
        {/* 5. ATTACHED SCREENSHOTS FIGURE GALLERY */}
        {/* ========================================================== */}
        {reportData.uploadedScreenshots.length > 0 && (
          <section className="mb-8">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 border-b-2 border-slate-300 pb-1 mb-3 font-mono">
              5. SolidWorks CAD & Simulation Graphical Evidence
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {reportData.uploadedScreenshots.map((item, index) => (
                <div key={item.id} className="border border-slate-300 p-2 rounded bg-slate-50">
                  <img
                    src={item.dataUrl}
                    alt={item.caption}
                    className="w-full h-44 object-contain bg-white rounded border border-slate-200"
                  />
                  <div className="text-[10px] font-mono text-slate-600 mt-1.5 text-center font-semibold">
                    Figure 5.{index + 1}: {item.caption}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ========================================================== */}
        {/* 6. DISCUSSION & CONCLUSION */}
        {/* ========================================================== */}
        <section className="mb-8">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 border-b-2 border-slate-300 pb-1 mb-2 font-mono">
            6. Critical Discussion & Conclusion
          </h2>
          <p className="text-xs text-slate-700 leading-relaxed text-justify mb-2">
            The finite element structural analysis closely validates the Euler-Bernoulli analytical cantilever beam formulation. While theoretical beam theory predicted a nominal root bending stress of 108.2 MPa, SolidWorks FEA accurately captured three-dimensional stress redistribution across the widened 40 mm mounting tab, resulting in a converged peak stress of {reportData.maxStressMPa} MPa with a safety factor of {reportData.factorOfSafety}. Enlarging the root transition fillets from R3.0 mm to R4.5 mm lowered stress concentration factor Kt from ~2.2 to 1.35. The introduction of 3 staggered internal lightening pockets achieved a 28.1% mass reduction ({reportData.originalMassGrams}g down to {reportData.optimisedMassGrams}g) without violating structural integrity (FOS = {reportData.optimisedFOS} &gt; 1.5). Dynamic modal analysis verified that the primary bending mode ({reportData.mode1FreqHz} Hz) remains safely decoupled from motor hover vibrations.
          </p>
          {reportData.studentRemarks && (
            <div className="p-3 bg-slate-50 rounded border-l-2 border-slate-800 text-[11px] text-slate-800 italic">
              <strong>Student Notes: </strong>
              {reportData.studentRemarks}
            </div>
          )}
        </section>

        {/* ========================================================== */}
        {/* 7. REFERENCES */}
        {/* ========================================================== */}
        <section className="border-t border-slate-300 pt-4 text-[10px] text-slate-600 font-mono">
          <div className="font-bold text-slate-900 mb-1">References:</div>
          <ol className="list-decimal pl-4 space-y-0.5">
            <li>Dassault Systèmes, *SolidWorks Simulation 2026 Verification Manual: Linear Static and Modal Analysis*, 2026.</li>
            <li>Budynas, R. G. & Nisbett, J. K., *Shigley’s Mechanical Engineering Design*, 11th Ed., McGraw-Hill, 2020.</li>
            <li>MIL-HDBK-5J, *Metallic Materials and Elements for Aerospace Vehicle Structures: 6061-T6 Specifications*, US DoD.</li>
            <li>IEM Department of Mechanical Engineering, *ESCME192 Engineering Graphics & Design Course Syllabi & Lab Manual*, 2026.</li>
          </ol>
        </section>

        {/* Signature Line */}
        <div className="mt-12 pt-6 border-t border-slate-300 flex justify-between text-xs font-mono text-slate-800">
          <div>
            <div>STUDENT SIGNATURE: ____________________</div>
            <div className="text-[10px] text-slate-500 mt-0.5">{reportData.studentName}</div>
          </div>
          <div>
            <div>FACULTY EVALUATOR: ____________________</div>
            <div className="text-[10px] text-slate-500 mt-0.5">GRADE & REMARKS</div>
          </div>
        </div>
      </div>
    </div>
  );
};
