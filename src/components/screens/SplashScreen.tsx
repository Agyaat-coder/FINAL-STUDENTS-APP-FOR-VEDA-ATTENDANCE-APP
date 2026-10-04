import React from 'react';
import { useApp } from '../../context/AppContext';
import { VedaEmblem, HostelIllustration } from '../illustrations/VedaArt';
import { StatusBar } from '../common/StatusBar';
import { ChevronRight } from 'lucide-react';

export const SplashScreen: React.FC = () => {
  const { setFlowState } = useApp();

  return (
    <div className="relative min-h-screen bg-[#070d1e] text-white flex flex-col justify-between overflow-hidden select-none">
      <StatusBar lightMode={false} />

      {/* Top Branding Section */}
      <div className="px-6 pt-6 flex flex-col items-center text-center z-10">
        <div className="mb-3 transform hover:scale-105 transition-transform duration-300">
          <VedaEmblem size={64} />
        </div>

        <h1 className="text-3xl font-extrabold tracking-wider text-white">
          VEDA
        </h1>
        <p className="text-sm font-semibold text-blue-400 tracking-wide mt-0.5">
          Hostel Students
        </p>

        <div className="mt-4 text-center">
          <p className="text-xs uppercase tracking-widest text-slate-400 font-medium">Your Hostel</p>
          <p className="text-base font-bold text-slate-100 tracking-tight">Your Everyday Companion</p>
        </div>
      </div>

      {/* Center Peaceful Hostel Artwork */}
      <div className="px-5 my-auto z-10 w-full max-w-sm mx-auto">
        <HostelIllustration className="shadow-2xl shadow-blue-950/60 border border-blue-900/30" />
      </div>

      {/* Bottom Footer Section & Next Action */}
      <div className="px-6 pb-8 text-center z-10 flex flex-col items-center">
        <button
          onClick={() => setFlowState('welcome')}
          className="w-full max-w-xs py-3.5 px-6 rounded-2xl bg-blue-600 hover:bg-blue-500 active:scale-[0.98] text-white font-semibold text-sm flex items-center justify-center space-x-2 shadow-lg shadow-blue-600/30 transition-all cursor-pointer mb-5"
        >
          <span>Open Student Portal</span>
          <ChevronRight size={18} />
        </button>

        <p className="text-xs text-slate-400 tracking-wide font-medium">
          Built for a better hostel life
        </p>
      </div>

      {/* Soft atmospheric radial glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
    </div>
  );
};
