import React from 'react';
import { useApp } from '../../context/AppContext';
import { StatusBar } from '../common/StatusBar';
import { ArrowLeft, Calendar, User, ShieldCheck } from 'lucide-react';

export const NoticeDetailModal: React.FC = () => {
  const { closeModal, selectedNotice } = useApp();

  if (!selectedNotice) return null;

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
          Hostel Notice
        </h2>
        <div className="w-8" />
      </div>

      <div className="flex-1 px-5 py-6 max-w-md mx-auto w-full space-y-5">
        <div>
          <div className="flex items-center space-x-2 mb-2">
            <span className="text-[10px] font-bold px-2.5 py-0.5 bg-blue-950 text-blue-400 border border-blue-500/40 rounded-full uppercase tracking-wider">
              {selectedNotice.category}
            </span>
            <div className="flex items-center space-x-1 text-xs text-slate-400 font-mono">
              <Calendar size={13} />
              <span>{selectedNotice.date} • {selectedNotice.time}</span>
            </div>
          </div>

          <h1 className="text-xl font-bold text-white leading-snug">
            {selectedNotice.title}
          </h1>
        </div>

        {/* Notice Body */}
        <div className="bg-[#101b36] border border-blue-900/40 rounded-2xl p-5 shadow-lg space-y-4">
          <p className="text-sm text-slate-200 leading-relaxed whitespace-pre-line">
            {selectedNotice.description}
          </p>

          <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
            <div className="flex items-center space-x-1.5">
              <User size={14} className="text-blue-400" />
              <span>Issued by: <strong className="text-white">{selectedNotice.issuedBy}</strong></span>
            </div>
            <div className="flex items-center space-x-1 text-emerald-400 text-[11px]">
              <ShieldCheck size={14} />
              <span>Verified Notice</span>
            </div>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 text-[11px] text-slate-400 text-center">
          Notice targeted to residents of Charak Chatras by Warden administration.
        </div>
      </div>
    </div>
  );
};
