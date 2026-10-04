import React from 'react';
import { useApp } from '../../context/AppContext';
import { StatusBar } from '../common/StatusBar';
import { CampusWalkIllustration } from '../illustrations/VedaArt';
import { CheckCheck, Bell, Building, Sparkles, ArrowRight } from 'lucide-react';

export const WelcomeScreen: React.FC = () => {
  const { setFlowState } = useApp();

  const benefits = [
    {
      icon: <CheckCheck size={18} className="text-blue-600" />,
      text: 'Mark attendance easily',
    },
    {
      icon: <Bell size={18} className="text-blue-600" />,
      text: 'Stay updated with hostel notices',
    },
    {
      icon: <Building size={18} className="text-blue-600" />,
      text: 'View your hostel information',
    },
    {
      icon: <Sparkles size={18} className="text-blue-600" />,
      text: 'All in one place',
    },
  ];

  return (
    <div className="relative min-h-screen bg-white text-slate-900 flex flex-col justify-between overflow-y-auto select-none">
      <StatusBar lightMode={true} />

      <div className="px-6 pt-4 flex flex-col items-center text-center">
        <h2 className="text-xl font-normal text-slate-600">
          Welcome to
        </h2>
        <h1 className="text-3xl font-extrabold text-[#0d172e] tracking-tight">
          VEDA Hostel
        </h1>
        <p className="text-sm text-slate-500 font-medium mt-1">
          Your hostel, made simpler.
        </p>
      </div>

      {/* Campus Illustration */}
      <div className="px-6 my-4 w-full max-w-sm mx-auto">
        <CampusWalkIllustration className="shadow-lg shadow-blue-100" />
      </div>

      {/* 4 Benefits List */}
      <div className="px-8 space-y-3.5 my-2 max-w-sm mx-auto w-full">
        {benefits.map((b, i) => (
          <div key={i} className="flex items-center space-x-3.5">
            <div className="w-8 h-8 rounded-full bg-blue-50 border border-blue-200/80 flex items-center justify-center shrink-0">
              {b.icon}
            </div>
            <span className="text-sm font-semibold text-slate-700">
              {b.text}
            </span>
          </div>
        ))}
      </div>

      {/* Action Button */}
      <div className="px-6 pb-8 pt-4 w-full max-w-sm mx-auto">
        <button
          onClick={() => setFlowState('activation')}
          className="w-full py-4 px-6 rounded-2xl bg-blue-600 hover:bg-blue-700 active:scale-[0.98] text-white font-bold text-base flex items-center justify-center space-x-2 shadow-lg shadow-blue-600/25 transition-all cursor-pointer"
        >
          <span>Get Started</span>
          <ArrowRight size={20} />
        </button>
      </div>
    </div>
  );
};
