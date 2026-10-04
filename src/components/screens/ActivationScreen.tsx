import React, { useState, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { StatusBar } from '../common/StatusBar';
import { ArrowLeft, ArrowRight, ShieldCheck, KeyRound } from 'lucide-react';

export const ActivationScreen: React.FC = () => {
  const { setFlowState, activateAccountWithCode } = useApp();
  const [digits, setDigits] = useState<string[]>(['V', 'D', '1', '2', '3', '4']);
  const [errorMsg, setErrorMsg] = useState<string>('');
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleDigitChange = (index: number, val: string) => {
    setErrorMsg('');
    const char = val.slice(-1).toUpperCase();
    const newDigits = [...digits];
    newDigits[index] = char;
    setDigits(newDigits);

    // Auto advance to next box
    if (char && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !digits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleContinue = () => {
    const fullCode = digits.join('');
    if (fullCode.length < 6) {
      setErrorMsg('Please enter all 6 characters of your code.');
      return;
    }
    const success = activateAccountWithCode(fullCode);
    if (!success) {
      setErrorMsg('Invalid activation code. Ask your warden or try VD1234.');
    }
  };

  const setSampleCode = () => {
    setDigits(['V', 'D', '1', '2', '3', '4']);
    setErrorMsg('');
  };

  return (
    <div className="relative min-h-screen bg-[#070d1e] text-white flex flex-col justify-between overflow-y-auto select-none">
      <StatusBar lightMode={false} />

      {/* Top Bar with Back Button */}
      <div className="px-5 pt-2 flex items-center justify-between">
        <button
          onClick={() => setFlowState('welcome')}
          className="p-2 -ml-2 rounded-full text-slate-400 hover:text-white hover:bg-slate-800/60 active:scale-95 transition-all"
        >
          <ArrowLeft size={22} />
        </button>
        <span className="text-xs font-semibold text-slate-400 uppercase tracking-widest">
          Step 1 of 2
        </span>
        <div className="w-8" />
      </div>

      {/* Center Activation Box */}
      <div className="px-6 py-4 flex flex-col items-center text-center max-w-sm mx-auto w-full">
        {/* Key/Shield Icon in Blue Badge */}
        <div className="w-16 h-16 rounded-2xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center mb-6 shadow-lg shadow-blue-900/30">
          <KeyRound size={30} className="text-blue-400" />
        </div>

        <h1 className="text-2xl font-bold tracking-tight text-white mb-2">
          Activate your account
        </h1>
        <p className="text-sm text-slate-400 leading-relaxed max-w-xs mb-8">
          Enter the activation code provided by your warden to activate your student account.
        </p>

        {/* 6 Individual Code Boxes */}
        <div className="flex items-center justify-center gap-2 mb-4 w-full">
          {digits.map((digit, idx) => (
            <input
              key={idx}
              ref={(el) => {
                inputRefs.current[idx] = el;
              }}
              type="text"
              maxLength={1}
              value={digit}
              onChange={(e) => handleDigitChange(idx, e.target.value)}
              onKeyDown={(e) => handleKeyDown(idx, e)}
              className={`w-12 h-14 text-center text-xl font-bold font-mono rounded-xl border transition-all outline-none ${
                digit
                  ? 'border-blue-500 bg-blue-950/40 text-blue-300 ring-2 ring-blue-500/20'
                  : 'border-slate-800 bg-[#0d162e] text-white hover:border-slate-700 focus:border-blue-500'
              }`}
            />
          ))}
        </div>

        {errorMsg ? (
          <p className="text-xs text-rose-400 font-medium mt-1 mb-2">{errorMsg}</p>
        ) : (
          <div className="mt-2 flex items-center space-x-1.5 text-xs text-slate-400">
            <ShieldCheck size={14} className="text-emerald-400" />
            <span>Warden generated secure code</span>
            <button
              onClick={setSampleCode}
              className="text-blue-400 underline ml-1 hover:text-blue-300 cursor-pointer"
            >
              (Insert VD1234)
            </button>
          </div>
        )}
      </div>

      {/* Bottom Action Button & Skyline decoration */}
      <div className="px-6 pb-8 pt-4 w-full max-w-sm mx-auto z-10">
        <button
          onClick={handleContinue}
          className="w-full py-4 px-6 rounded-2xl bg-blue-600 hover:bg-blue-500 active:scale-[0.98] text-white font-bold text-base flex items-center justify-center space-x-2 shadow-lg shadow-blue-600/30 transition-all cursor-pointer"
        >
          <span>Continue</span>
          <ArrowRight size={20} />
        </button>
      </div>

      {/* Subtle bottom city/hostel skyline overlay */}
      <div className="absolute bottom-0 left-0 right-0 h-28 pointer-events-none opacity-15 overflow-hidden">
        <svg viewBox="0 0 400 80" fill="none" className="w-full h-full">
          <rect x="20" y="30" width="30" height="50" fill="#60a5fa" />
          <rect x="60" y="10" width="40" height="70" fill="#60a5fa" />
          <rect x="110" y="25" width="35" height="55" fill="#60a5fa" />
          <rect x="160" y="15" width="50" height="65" fill="#60a5fa" />
          <rect x="230" y="35" width="40" height="45" fill="#60a5fa" />
          <rect x="285" y="20" width="30" height="60" fill="#60a5fa" />
          <rect x="330" y="10" width="50" height="70" fill="#60a5fa" />
        </svg>
      </div>
    </div>
  );
};
