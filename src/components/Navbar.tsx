import React, { useState } from 'react';
import {
  Compass,
  Layers,
  Calculator,
  FileText,
  BookOpen,
  LayoutDashboard,
  Sun,
  Moon,
  Menu,
  X,
  RotateCw,
  Sparkles,
  Award
} from 'lucide-react';

export type TabId = 'dashboard' | 'workflow' | 'diagrams' | 'calculator' | 'report' | 'hub';

interface NavbarProps {
  activeTab: TabId;
  onSelectTab: (tab: TabId) => void;
  completedPhasesCount: number;
  totalPhasesCount: number;
  isDarkMode: boolean;
  onToggleTheme: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  onSelectTab,
  completedPhasesCount,
  totalPhasesCount,
  isDarkMode,
  onToggleTheme
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const progressPct = Math.round((completedPhasesCount / totalPhasesCount) * 100);

  const navItems: { id: TabId; label: string; icon: React.ReactNode; badge?: string }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
    { id: 'workflow', label: '12-Phase Workflow', icon: <Compass className="w-4 h-4" />, badge: '12 Steps' },
    { id: 'diagrams', label: 'Diagrams Studio', icon: <Layers className="w-4 h-4" /> },
    { id: 'calculator', label: 'Calculation Lab', icon: <Calculator className="w-4 h-4" /> },
    { id: 'report', label: 'Report Generator', icon: <FileText className="w-4 h-4" />, badge: 'PDF' },
    { id: 'hub', label: 'Knowledge Hub', icon: <BookOpen className="w-4 h-4" /> }
  ];

  return (
    <header className="no-print sticky top-0 z-50 bg-slate-950/90 backdrop-blur-md border-b border-slate-800 text-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo & Title */}
          <div
            onClick={() => onSelectTab('dashboard')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-600 to-blue-500 p-0.5 flex items-center justify-center shadow-lg shadow-cyan-500/20 group-hover:shadow-cyan-400/30 transition-all">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <RotateCw className="w-5 h-5 text-cyan-400 group-hover:rotate-180 transition-transform duration-500" />
              </div>
            </div>

            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-base tracking-wider font-mono text-white">
                  ROTORLAB<span className="text-cyan-400">360</span>
                </span>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-cyan-950 border border-cyan-800 text-cyan-300 font-bold hidden sm:inline-block">
                  AeroForge
                </span>
              </div>
              <div className="text-[10px] font-mono text-slate-400 truncate hidden sm:block">
                IEM ESCME192 • Drone Rotor Arm CAD & FEA Studio
              </div>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onSelectTab(item.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 relative ${
                    isActive
                      ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/40 shadow-sm'
                      : 'text-slate-300 hover:text-white hover:bg-slate-900 border border-transparent'
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="text-[9px] font-mono px-1 rounded bg-slate-800 text-cyan-400 border border-slate-700">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action Widgets */}
          <div className="flex items-center gap-3">
            {/* Completion Pill */}
            <div
              onClick={() => onSelectTab('workflow')}
              className="hidden sm:flex items-center gap-2 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-lg cursor-pointer hover:border-slate-700 transition-colors"
            >
              <div className="flex flex-col text-right">
                <span className="text-[9px] font-mono text-slate-400 uppercase">PROGRESS</span>
                <span className="text-xs font-bold font-mono text-cyan-400">{progressPct}%</span>
              </div>
              <div className="w-12 bg-slate-800 h-1.5 rounded-full overflow-hidden border border-slate-700">
                <div
                  className="bg-cyan-400 h-full rounded-full transition-all duration-300"
                  style={{ width: `${progressPct}%` }}
                />
              </div>
            </div>

            {/* Dark / Light Mode Toggle */}
            <button
              onClick={onToggleTheme}
              className="p-2 rounded-lg border border-slate-800 bg-slate-900 text-slate-300 hover:text-white hover:border-slate-700 transition-colors"
              title={isDarkMode ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
            >
              {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-cyan-400" />}
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg border border-slate-800 bg-slate-900 text-slate-300 hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-800 bg-slate-950 px-4 pt-3 pb-4 space-y-1">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  onSelectTab(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full text-left px-3 py-2 rounded-lg text-xs font-semibold flex items-center justify-between ${
                  isActive
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                    : 'text-slate-300 hover:bg-slate-900'
                }`}
              >
                <div className="flex items-center gap-2">
                  {item.icon}
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-cyan-400">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
};
