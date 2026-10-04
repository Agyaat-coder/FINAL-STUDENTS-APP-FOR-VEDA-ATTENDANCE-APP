import React from 'react';
import { useApp } from '../../context/AppContext';
import { StatusBar } from '../common/StatusBar';
import { Check, Building2, ArrowRight } from 'lucide-react';

export const ActivationSuccessScreen: React.FC = () => {
  const { setFlowState, student } = useApp();

  return (
    <div className="relative min-h-screen bg-white text-slate-900 flex flex-col justify-between overflow-y-auto select-none">
      <StatusBar lightMode={true} />

      <div className="px-6 py-10 flex flex-col items-center text-center max-w-sm mx-auto w-full my-auto">
        {/* Animated Green Checkmark Ring */}
        <div className="relative mb-6">
          <div className="w-24 h-24 rounded-full bg-emerald-500 flex items-center justify-center shadow-xl shadow-emerald-500/30 text-white">
            <Check size={48} className="stroke-[3]" />
          </div>
          <div className="absolute inset-0 rounded-full border-4 border-emerald-400/40 animate-ping opacity-40 pointer-events-none" />
        </div>

        <h1 className="text-3xl font-extrabold text-[#0d172e] tracking-tight mb-1">
          You're all set!
        </h1>
        <p className="text-sm font-medium text-slate-500 mb-8">
          Welcome to <span className="font-semibold text-slate-800">{student.hostelName}</span>
        </p>

        {/* Hostel Allocation Card */}
        <div className="w-full bg-slate-50 border border-slate-200/90 rounded-2xl p-5 shadow-sm text-left flex items-start space-x-4">
          <div className="w-12 h-12 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-md shadow-blue-600/20">
            <Building2 size={24} />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-base font-bold text-slate-900 truncate">
              {student.hostelName}
            </h3>
            <div className="mt-1 space-y-0.5 text-xs text-slate-500">
              <p>Room <span className="font-semibold text-slate-700">{student.roomNumber}</span></p>
              <p>Floor <span className="font-semibold text-slate-700">{student.floor}</span></p>
            </div>
          </div>
        </div>
      </div>

      {/* Continue Action */}
      <div className="px-6 pb-8 pt-4 w-full max-w-sm mx-auto">
        <button
          onClick={() => setFlowState('main')}
          className="w-full py-4 px-6 rounded-2xl bg-blue-600 hover:bg-blue-700 active:scale-[0.98] text-white font-bold text-base flex items-center justify-center space-x-2 shadow-lg shadow-blue-600/25 transition-all cursor-pointer"
        >
          <span>Continue</span>
          <ArrowRight size={20} />
        </button>
      </div>
    </div>
  );
};
