import React from 'react';
import { useApp } from '../../context/AppContext';
import { StatusBar } from '../common/StatusBar';
import { Check, Moon, ArrowRight, Home } from 'lucide-react';

export const AttendanceSuccessScreen: React.FC = () => {
  const { closeModal, setActiveTab, activeSession, attendanceRecords } = useApp();

  const latestRecord = attendanceRecords[0];

  const handleViewActivity = () => {
    closeModal();
    setActiveTab('activity');
  };

  const handleBackHome = () => {
    closeModal();
    setActiveTab('today');
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#070d1e] text-white flex flex-col justify-between overflow-y-auto select-none">
      <StatusBar lightMode={false} />

      <div className="px-6 py-8 flex flex-col items-center text-center max-w-sm mx-auto w-full my-auto">
        {/* Animated Green Checkmark with celebratory aura */}
        <div className="relative mb-6">
          <div className="w-24 h-24 rounded-full bg-emerald-500 flex items-center justify-center shadow-2xl shadow-emerald-500/40 text-white z-10">
            <Check size={48} className="stroke-[3]" />
          </div>

          {/* Celebratory subtle confetti/particle dots */}
          <div className="absolute -top-3 -right-2 w-3 h-3 rounded-full bg-blue-400 animate-bounce" />
          <div className="absolute top-2 -left-3 w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse" />
          <div className="absolute -bottom-2 -left-1 w-2 h-2 rounded-full bg-emerald-300" />
          <div className="absolute -bottom-1 -right-3 w-2.5 h-2.5 rounded-full bg-rose-400 animate-ping" />
        </div>

        <h1 className="text-2xl font-extrabold tracking-tight text-white mb-1.5">
          Attendance Recorded!
        </h1>
        <p className="text-sm text-slate-400 mb-8 max-w-xs">
          Your presence has been marked for today's session.
        </p>

        {/* Info Card matching Screen 8 */}
        <div className="w-full bg-[#101b36] border border-blue-900/50 rounded-2xl p-4 shadow-xl text-left flex items-center justify-between">
          <div className="flex items-center space-x-3.5">
            <div className="w-12 h-12 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400 shrink-0">
              <Moon size={22} />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">
                {latestRecord?.sessionTitle || activeSession?.title || 'Night Attendance'}
              </h3>
              <p className="text-xs text-slate-400 mt-0.5 font-mono">
                {latestRecord?.markedAt || '2 Oct 2026 • 08:12 PM'}
              </p>
            </div>
          </div>

          <span className="text-xs font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-3 py-1 rounded-full">
            Present
          </span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="px-5 pb-8 pt-4 space-y-3 max-w-sm mx-auto w-full">
        <button
          onClick={handleViewActivity}
          className="w-full py-3.5 px-6 rounded-2xl bg-[#142347] hover:bg-[#1a2c5a] border border-slate-700/80 active:scale-[0.98] text-slate-200 font-semibold text-sm flex items-center justify-center space-x-2 transition-all cursor-pointer"
        >
          <span>View in Activity</span>
          <ArrowRight size={16} />
        </button>

        <button
          onClick={handleBackHome}
          className="w-full py-4 px-6 rounded-2xl bg-blue-600 hover:bg-blue-500 active:scale-[0.98] text-white font-bold text-sm flex items-center justify-center space-x-2 shadow-lg shadow-blue-600/30 transition-all cursor-pointer"
        >
          <Home size={17} />
          <span>Back to Home</span>
        </button>
      </div>
    </div>
  );
};
