import React, { useState } from 'react';
import {
  BookOpen,
  Search,
  CheckSquare,
  Wrench,
  AlertTriangle,
  FileText,
  Key,
  Plus,
  Trash2,
  Download,
  Filter
} from 'lucide-react';
import { GLOSSARY_ITEMS, FORMULA_LIBRARY, SOLIDWORKS_SHORTCUTS, TROUBLESHOOTING_GUIDE } from '../data/glossaryData';
import { ProjectNote } from '../types';

interface KnowledgeHubProps {
  notes: ProjectNote[];
  onAddNote: (note: Omit<ProjectNote, 'id' | 'timestamp'>) => void;
  onDeleteNote: (id: string) => void;
  submissionChecklist: Record<string, boolean>;
  onToggleChecklistItem: (key: string) => void;
}

export const KnowledgeHub: React.FC<KnowledgeHubProps> = ({
  notes,
  onAddNote,
  onDeleteNote,
  submissionChecklist,
  onToggleChecklistItem
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'glossary' | 'formulas' | 'troubleshooting' | 'shortcuts' | 'notes' | 'checklist'>('glossary');
  const [searchQuery, setSearchQuery] = useState('');
  const [glossaryCategory, setGlossaryCategory] = useState<string>('all');

  // New note form state
  const [newNoteTitle, setNewNoteTitle] = useState('');
  const [newNoteContent, setNewNoteContent] = useState('');

  // Filtered glossary
  const filteredGlossary = GLOSSARY_ITEMS.filter((item) => {
    const matchesSearch =
      item.term.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.definition.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.solidworksRelevance.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      glossaryCategory === 'all' || item.category.toLowerCase().includes(glossaryCategory.toLowerCase());
    return matchesSearch && matchesCategory;
  });

  const handleCreateNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNoteTitle.trim() || !newNoteContent.trim()) return;
    onAddNote({
      title: newNoteTitle.trim(),
      content: newNoteContent.trim(),
      tags: ['ESCME192', 'CadNotes']
    });
    setNewNoteTitle('');
    setNewNoteContent('');
  };

  const checklistItems = [
    { key: 'sw_model_saved', text: '3D Part (.SLDPRT) modeled with MMGS units and fully defined sketches (all black geometry)' },
    { key: 'holes_wizard', text: '4x M3 motor clearance holes (3.4 mm) on PCD 16/19 mm and 6 mm center shaft clearance bore created' },
    { key: 'root_fillets', text: 'Root transition fillets (R3 mm initial, R4.5 mm optimized) applied to reduce stress concentrations' },
    { key: 'quad_assembly', text: '4-arm quadcopter assembly (.SLDASM) created with concentric and coincident mates' },
    { key: 'exploded_view', text: 'Exploded view animation and routing lines created in ConfigurationManager' },
    { key: 'material_assigned', text: 'Aluminium 6061-T6 assigned from SolidWorks Materials library (E = 68.9 GPa, Yield = 276 MPa)' },
    { key: 'loads_verified', text: '50 N aero lift upward, 100 N centrifugal tension outward, and 4.905 N gravity downward applied' },
    { key: 'fixed_support', text: 'Fixed Geometry boundary condition applied to root bolt holes and root mating face' },
    { key: 'mesh_convergence', text: 'Curvature-based mesh generated with 1.0 mm local mesh control on fillets' },
    { key: 'static_results', text: 'Von Mises Stress (67.6 MPa), Tip Displacement (0.82 mm), and FOS (4.08) recorded' },
    { key: 'frequency_modal', text: 'Frequency study solved for Mode 1 (84.5 Hz) and verified safe from hover RPM resonance' },
    { key: 'topology_opt', text: '3 lightening pockets modeled saving 28.1% mass while maintaining FOS > 3.5' },
    { key: 'report_generated', text: 'Engineering report compiled, screenshots embedded, and printable PDF exported for submission' }
  ];

  return (
    <div className="flex flex-col gap-6">
      {/* Header Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
              <BookOpen className="w-5 h-5" />
            </span>
            <div>
              <h2 className="text-lg font-bold text-white tracking-wide">
                Engineering Knowledge Hub & Reference
              </h2>
              <p className="text-xs text-slate-400">
                Searchable CAD glossary, formula derivation library, SolidWorks shortcuts, notes & checklist
              </p>
            </div>
          </div>
        </div>

        {/* Sub-tab Switcher */}
        <div className="flex bg-slate-800 p-0.5 rounded-lg border border-slate-700 text-xs flex-wrap">
          <button
            onClick={() => setActiveSubTab('glossary')}
            className={`px-3 py-1.5 rounded transition-colors ${
              activeSubTab === 'glossary' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-300'
            }`}
          >
            Glossary
          </button>
          <button
            onClick={() => setActiveSubTab('formulas')}
            className={`px-3 py-1.5 rounded transition-colors ${
              activeSubTab === 'formulas' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-300'
            }`}
          >
            Formulas
          </button>
          <button
            onClick={() => setActiveSubTab('troubleshooting')}
            className={`px-3 py-1.5 rounded transition-colors ${
              activeSubTab === 'troubleshooting' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-300'
            }`}
          >
            Troubleshooting
          </button>
          <button
            onClick={() => setActiveSubTab('shortcuts')}
            className={`px-3 py-1.5 rounded transition-colors ${
              activeSubTab === 'shortcuts' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-300'
            }`}
          >
            Shortcuts
          </button>
          <button
            onClick={() => setActiveSubTab('checklist')}
            className={`px-3 py-1.5 rounded transition-colors ${
              activeSubTab === 'checklist' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-300'
            }`}
          >
            Checklist
          </button>
          <button
            onClick={() => setActiveSubTab('notes')}
            className={`px-3 py-1.5 rounded transition-colors ${
              activeSubTab === 'notes' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-300'
            }`}
          >
            My Notes ({notes.length})
          </button>
        </div>
      </div>

      {/* ============================================================== */}
      {/* 1. SEARCHABLE GLOSSARY */}
      {/* ============================================================== */}
      {activeSubTab === 'glossary' && (
        <div className="flex flex-col gap-4">
          <div className="flex flex-col sm:flex-row items-center gap-3 bg-slate-900 p-3 rounded-xl border border-slate-800">
            <div className="relative flex-1 w-full">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search engineering terms (e.g. Von Mises, PCD, Cantilever, Fillet)..."
                className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-3 py-2 text-xs text-white focus:border-cyan-500 outline-none"
              />
            </div>
            <div className="flex items-center gap-1.5 flex-wrap">
              {['all', 'FEA', 'SolidWorks', 'Drone', 'Materials'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setGlossaryCategory(cat)}
                  className={`px-2.5 py-1 text-xs rounded-lg border font-mono transition-colors ${
                    glossaryCategory === cat
                      ? 'bg-cyan-500/20 border-cyan-500 text-cyan-300'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  {cat.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredGlossary.map((item, idx) => (
              <div
                key={idx}
                className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-col justify-between gap-3 hover:border-slate-700 transition-colors"
              >
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-sm font-bold text-white font-mono">{item.term}</h3>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 border border-slate-700 text-cyan-400">
                      {item.category}
                    </span>
                  </div>
                  {item.symbol && (
                    <div className="text-[11px] font-mono text-cyan-300 mt-1">
                      Symbol: <span className="text-white font-bold">{item.symbol}</span>
                    </div>
                  )}
                  {item.formula && (
                    <div className="text-[11px] font-mono bg-slate-950 p-2 rounded border border-slate-800 text-amber-300 mt-2">
                      {item.formula}
                    </div>
                  )}
                  <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                    {item.definition}
                  </p>
                </div>

                <div className="p-2.5 rounded bg-slate-950 border border-cyan-900/40 text-[11px] text-cyan-200">
                  <strong className="text-cyan-400 font-mono block mb-0.5">SOLIDWORKS RELEVANCE:</strong>
                  {item.solidworksRelevance}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* 2. FORMULA LIBRARY */}
      {/* ============================================================== */}
      {activeSubTab === 'formulas' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {FORMULA_LIBRARY.map((item, idx) => (
            <div
              key={idx}
              className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg flex flex-col justify-between gap-3"
            >
              <div>
                <h3 className="text-sm font-bold text-white tracking-wide">{item.title}</h3>
                <div className="my-2.5 p-3 rounded-lg bg-slate-950 border border-cyan-500/40 font-mono text-cyan-300 font-bold text-xs">
                  {item.formula}
                </div>
                <p className="text-xs text-slate-400">{item.explanation}</p>
              </div>

              <div className="border-t border-slate-800 pt-3">
                <span className="text-[10px] font-mono uppercase text-slate-500 block mb-1">
                  VARIABLES & ASSIGNMENT VALUES:
                </span>
                <div className="grid grid-cols-2 gap-2 text-[11px] font-mono">
                  {item.variables.map((v, i) => (
                    <div key={i} className="p-1.5 rounded bg-slate-950 border border-slate-800/80">
                      <span className="text-amber-400 font-bold">{v.symbol}</span>: {v.name}
                      <span className="block text-slate-300 font-semibold">{v.defaultVal}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ============================================================== */}
      {/* 3. SOLIDWORKS SHORTCUTS */}
      {/* ============================================================== */}
      {activeSubTab === 'shortcuts' && (
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-xl flex flex-col gap-4">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Key className="w-4 h-4 text-cyan-400" />
            SolidWorks Essential Keyboard Shortcuts for Rapid CAD Modelling
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {SOLIDWORKS_SHORTCUTS.map((item, idx) => (
              <div
                key={idx}
                className="bg-slate-950 border border-slate-800 rounded-lg p-3 flex flex-col justify-between gap-2"
              >
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded bg-slate-800 text-cyan-300 font-mono font-bold text-xs border border-slate-700">
                    {item.key}
                  </span>
                  <span className="text-xs font-semibold text-white">{item.action}</span>
                </div>
                <p className="text-[11px] text-slate-400 mt-1">{item.context}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* 4. TROUBLESHOOTING GUIDE */}
      {/* ============================================================== */}
      {activeSubTab === 'troubleshooting' && (
        <div className="flex flex-col gap-3">
          {TROUBLESHOOTING_GUIDE.map((item, idx) => (
            <div
              key={idx}
              className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-col gap-2 hover:border-slate-700 transition-colors"
            >
              <div className="flex items-center gap-2 text-rose-400 font-semibold text-sm">
                <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                <span>Issue: {item.problem}</span>
              </div>
              <div className="text-xs text-slate-400">
                <strong className="text-slate-300">Root Cause: </strong>
                {item.cause}
              </div>
              <div className="p-2.5 rounded bg-slate-950 border border-emerald-900/40 text-xs text-emerald-300">
                <strong className="font-mono text-emerald-400">Solution: </strong>
                {item.solution}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ============================================================== */}
      {/* 5. SUBMISSION READINESS CHECKLIST */}
      {/* ============================================================== */}
      {activeSubTab === 'checklist' && (
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-xl flex flex-col gap-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <CheckSquare className="w-4 h-4 text-cyan-400" />
                IEM ESCME192 Final Project Submission Checklist
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Verify each prerequisite prior to submitting your SolidWorks models and laboratory report
              </p>
            </div>
            <div className="text-xs font-mono text-cyan-400 font-bold bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-800">
              {checklistItems.filter((i) => submissionChecklist[i.key]).length} / {checklistItems.length} READY
            </div>
          </div>

          <div className="grid grid-cols-1 gap-2.5">
            {checklistItems.map((item) => {
              const isChecked = !!submissionChecklist[item.key];
              return (
                <label
                  key={item.key}
                  className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-all ${
                    isChecked
                      ? 'bg-emerald-950/20 border-emerald-500/40 text-emerald-200'
                      : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => onToggleChecklistItem(item.key)}
                    className="mt-0.5 w-4 h-4 accent-emerald-500 rounded cursor-pointer"
                  />
                  <span className={`text-xs ${isChecked ? 'line-through text-slate-400' : 'text-slate-200'}`}>
                    {item.text}
                  </span>
                </label>
              );
            })}
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* 6. PERSONAL PROJECT NOTES NOTEBOOK */}
      {/* ============================================================== */}
      {activeSubTab === 'notes' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-xl flex flex-col gap-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-cyan-400 font-mono flex items-center gap-2">
              <Plus className="w-4 h-4 text-cyan-400" />
              Add Project Lab Note
            </h3>

            <form onSubmit={handleCreateNote} className="flex flex-col gap-3">
              <div>
                <label className="text-[11px] text-slate-300 block mb-1">Note Title</label>
                <input
                  type="text"
                  value={newNoteTitle}
                  onChange={(e) => setNewNoteTitle(e.target.value)}
                  placeholder="e.g. Mesh convergence finding at root"
                  className="w-full bg-slate-950 border border-slate-800 rounded px-3 py-2 text-xs text-white focus:border-cyan-500 outline-none"
                  required
                />
              </div>

              <div>
                <label className="text-[11px] text-slate-300 block mb-1">Content / Observation</label>
                <textarea
                  rows={4}
                  value={newNoteContent}
                  onChange={(e) => setNewNoteContent(e.target.value)}
                  placeholder="Record numerical values, faculty feedback, or dimensions..."
                  className="w-full bg-slate-950 border border-slate-800 rounded p-2.5 text-xs text-white focus:border-cyan-500 outline-none"
                  required
                />
              </div>

              <button
                type="submit"
                className="px-4 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
              >
                <Plus className="w-4 h-4" />
                Save Note
              </button>
            </form>
          </div>

          <div className="lg:col-span-7 flex flex-col gap-3">
            {notes.length === 0 ? (
              <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-8 text-center text-slate-500 text-xs">
                No notes saved yet. Add observations or formula calculations above!
              </div>
            ) : (
              notes.map((note) => (
                <div
                  key={note.id}
                  className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-col justify-between gap-2 shadow"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="text-sm font-bold text-white">{note.title}</h4>
                      <span className="text-[10px] text-slate-500 font-mono">{note.timestamp}</span>
                    </div>
                    <button
                      onClick={() => onDeleteNote(note.id)}
                      className="text-slate-500 hover:text-rose-400 transition-colors p-1"
                      title="Delete Note"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed whitespace-pre-wrap">
                    {note.content}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};
