import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Radio,
  RefreshCw,
  Wifi,
  WifiOff,
  Code2,
  Smartphone,
  ChevronDown,
  ChevronUp,
  Sliders,
  ShieldCheck,
} from 'lucide-react';

export const WardenSyncBar: React.FC = () => {
  const {
    activeSession,
    toggleWardenSession,
    resetToSplash,
    isOffline,
    setIsOffline,
    openModal,
    isFramedView,
    setIsFramedView,
  } = useApp();

  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <aside aria-label="Warden Live Simulation Controls" className="w-full bg-[#0a1226]/95 border-b border-blue-900/60 text-xs text-slate-300 py-1.5 px-3 z-30 transition-all select-none">
      <div className="max-w-4xl mx-auto flex items-center justify-between">
        {/* Left Status Indicator */}
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-1.5 bg-blue-950/80 border border-blue-800/60 px-2 py-0.5 rounded-lg text-blue-300 text-[11px] font-medium">
            <Radio size={12} className={activeSession ? 'text-rose-400 animate-pulse' : 'text-slate-400'} />
            <span>Warden Session: <strong>{activeSession ? 'ACTIVE (Night)' : 'CLOSED (Idle)'}</strong></span>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex items-center space-x-2">
          <button
            onClick={toggleWardenSession}
            className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
              activeSession
                ? 'bg-rose-950 text-rose-300 border border-rose-500/40 hover:bg-rose-900'
                : 'bg-emerald-950 text-emerald-300 border border-emerald-500/40 hover:bg-emerald-900'
            }`}
          >
            {activeSession ? 'Warden: Close Session' : 'Warden: Open Attendance'}
          </button>

          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1 rounded-lg bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
            title="More simulation tools"
          >
            {isExpanded ? <ChevronUp size={15} /> : <Sliders size={15} />}
          </button>
        </div>
      </div>

      {/* Expanded Tools Drawer */}
      {isExpanded && (
        <div className="max-w-4xl mx-auto mt-2 pt-2 border-t border-slate-800 flex flex-wrap items-center justify-between gap-2">
          <div className="flex flex-wrap items-center gap-2">
            {/* Reset Onboarding / Activation */}
            <button
              onClick={resetToSplash}
              className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-[11px] font-medium flex items-center space-x-1 cursor-pointer"
            >
              <RefreshCw size={12} />
              <span>Test Splash & Activation Flow</span>
            </button>

            {/* Offline Mode Toggle */}
            <button
              onClick={() => setIsOffline(!isOffline)}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-medium flex items-center space-x-1 cursor-pointer transition-colors ${
                isOffline
                  ? 'bg-amber-950 text-amber-300 border border-amber-500/40'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              {isOffline ? <WifiOff size={12} /> : <Wifi size={12} />}
              <span>{isOffline ? 'Offline Active' : 'Simulate Offline'}</span>
            </button>

            {/* Framed View Toggle */}
            <button
              onClick={() => setIsFramedView(!isFramedView)}
              className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-[11px] font-medium flex items-center space-x-1 cursor-pointer"
            >
              <Smartphone size={12} />
              <span>{isFramedView ? 'Full Screen' : 'Phone Frame'}</span>
            </button>
          </div>

          {/* Android Code Viewer Button */}
          <button
            onClick={() => openModal('android_code_viewer')}
            className="px-3 py-1 rounded-lg bg-blue-600/30 border border-blue-500/40 hover:bg-blue-600/50 text-blue-200 text-[11px] font-semibold flex items-center space-x-1.5 cursor-pointer"
          >
            <Code2 size={13} />
            <span>Java + XML Code</span>
          </button>
        </div>
      )}
    </aside>
  );
};
