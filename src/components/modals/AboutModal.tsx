import React from 'react';
import { useApp } from '../../context/AppContext';
import { StatusBar } from '../common/StatusBar';
import { VedaEmblem } from '../illustrations/VedaArt';
import { ArrowLeft, Shield, Heart } from 'lucide-react';

export const AboutModal: React.FC = () => {
  const { closeModal } = useApp();

  return (
    <div className="fixed inset-0 z-50 bg-[#070d1e] text-white flex flex-col justify-between overflow-y-auto select-none">
      <StatusBar lightMode={false} />

      <div className="px-5 pt-3 pb-2 flex items-center justify-between border-b border-slate-800/60 sticky top-0 bg-[#070d1e]/90 backdrop-blur-md z-10">
        <button
          onClick={closeModal}
          className="p-2 -ml-2 rounded-full text-slate-300 hover:text-white hover:bg-slate-800/60 active:scale-95 transition-all"
        >
          <ArrowLeft size={22} />
        </button>
        <h2 className="text-base font-bold text-white tracking-tight">
          About VEDA
        </h2>
        <div className="w-8" />
      </div>

      <div className="flex-1 px-6 py-8 flex flex-col items-center text-center max-w-sm mx-auto w-full my-auto">
        <VedaEmblem size={64} className="mb-3" />
        <h3 className="text-2xl font-black tracking-wider text-white">VEDA</h3>
        <p className="text-xs font-bold text-blue-400 uppercase tracking-widest mt-0.5">
          Hostel Students Companion
        </p>

        <div className="my-4 inline-flex items-center px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs font-mono text-slate-400">
          Version 1.0.0 (Build 2026.10)
        </div>

        <p className="text-xs text-slate-300 leading-relaxed max-w-xs mb-6">
          Your Hostel, Your Everyday Companion. Designed specifically for university students to mark attendance seamlessly, stay informed with official notices, access mess schedules, and view warden communications.
        </p>

        <div className="w-full bg-[#101b36] border border-slate-800 rounded-2xl p-4 text-left space-y-2 text-xs text-slate-400">
          <div className="flex items-center justify-between">
            <span>Companion App:</span>
            <span className="font-semibold text-slate-200">VEDA Hostel Warden</span>
          </div>
          <div className="flex items-center justify-between">
            <span>Data Security:</span>
            <span className="text-emerald-400 font-semibold flex items-center space-x-1">
              <Shield size={12} />
              <span>Isolated Student Record</span>
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span>Sync Architecture:</span>
            <span className="font-semibold text-slate-200">Real-time Cloud Sync</span>
          </div>
        </div>
      </div>

      <div className="p-6 text-center text-[11px] text-slate-400 border-t border-slate-800/80">
        <p>Built for a better hostel life • Charak Chatras</p>
      </div>
    </div>
  );
};
