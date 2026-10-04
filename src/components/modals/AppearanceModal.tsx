import React from 'react';
import { useApp } from '../../context/AppContext';
import { StatusBar } from '../common/StatusBar';
import { ArrowLeft, Check, Moon, Sun, Smartphone } from 'lucide-react';

export const AppearanceModal: React.FC = () => {
  const { closeModal, appearance, setAppearance } = useApp();

  const options: { id: 'system' | 'dark' | 'light'; label: string; desc: string; icon: React.ReactNode }[] = [
    {
      id: 'dark',
      label: 'Dark Mode (VEDA Navy)',
      desc: 'Signature deep navy theme matching official VEDA design identity.',
      icon: <Moon size={20} className="text-blue-400" />,
    },
    {
      id: 'system',
      label: 'System Default',
      desc: 'Matches device system preference with VEDA contrast guard.',
      icon: <Smartphone size={20} className="text-blue-400" />,
    },
    {
      id: 'light',
      label: 'Light Mode',
      desc: 'High contrast daylight reading mode with crisp surfaces.',
      icon: <Sun size={20} className="text-amber-400" />,
    },
  ];

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
          Appearance
        </h2>
        <div className="w-8" />
      </div>

      <div className="flex-1 px-4 py-6 max-w-md mx-auto w-full space-y-3">
        <p className="text-xs text-slate-400 px-1 mb-2">
          Choose your interface theme. VEDA uses a dark navy palette as its visual foundation.
        </p>

        {options.map((opt) => {
          const isSelected = appearance === opt.id;
          return (
            <button
              key={opt.id}
              onClick={() => setAppearance(opt.id)}
              className={`w-full p-4 rounded-2xl border text-left transition-all flex items-start justify-between cursor-pointer ${
                isSelected
                  ? 'bg-[#122046] border-blue-500 shadow-md shadow-blue-900/30'
                  : 'bg-[#101b36] border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex items-start space-x-3.5">
                <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center shrink-0">
                  {opt.icon}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">{opt.label}</h4>
                  <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">
                    {opt.desc}
                  </p>
                </div>
              </div>

              {isSelected && (
                <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center shrink-0 ml-2">
                  <Check size={14} className="stroke-[3]" />
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
