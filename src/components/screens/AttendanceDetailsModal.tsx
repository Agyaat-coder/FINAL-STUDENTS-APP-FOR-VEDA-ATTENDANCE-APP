import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { StatusBar } from '../common/StatusBar';
import {
  ArrowLeft,
  Moon,
  Calendar,
  Clock,
  CheckCircle2,
  Info,
  Building,
  Loader2,
} from 'lucide-react';

export const AttendanceDetailsModal: React.FC = () => {
  const { activeSession, closeModal, markCurrentAttendance, student } = useApp();
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!activeSession) {
    return null;
  }

  const handleMark = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      markCurrentAttendance();
      setIsSubmitting(false);
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#070d1e] text-white flex flex-col justify-between overflow-y-auto select-none">
      <StatusBar lightMode={false} />

      {/* Top Bar */}
      <div className="px-5 pt-3 pb-2 flex items-center justify-between border-b border-slate-800/60">
        <button
          onClick={closeModal}
          className="p-2 -ml-2 rounded-full text-slate-300 hover:text-white hover:bg-slate-800/60 active:scale-95 transition-all"
        >
          <ArrowLeft size={22} />
        </button>
        <h2 className="text-base font-bold text-white tracking-tight">
          Mark Attendance
        </h2>
        <div className="w-8" />
      </div>

      {/* Center Details Card - Screen 7 Layout */}
      <div className="px-5 py-6 max-w-sm mx-auto w-full my-auto">
        <div className="bg-[#101b36] border border-blue-900/50 rounded-3xl p-6 shadow-xl shadow-blue-950/40">
          {/* Header with Moon Icon */}
          <div className="flex items-center space-x-3.5 pb-5 border-b border-slate-800/80">
            <div className="w-12 h-12 rounded-2xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
              <Moon size={24} className="stroke-[2.2]" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">
                {activeSession.title}
              </h3>
              <p className="text-xs text-slate-400 flex items-center space-x-1 mt-0.5">
                <Building size={13} />
                <span>{student.hostelName}</span>
              </p>
            </div>
          </div>

          {/* Details list: Date, Time, Status */}
          <div className="py-5 space-y-4 border-b border-slate-800/80">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 text-xs text-slate-400">
                <Calendar size={15} className="text-blue-400" />
                <span>Date</span>
              </div>
              <span className="text-xs font-semibold text-slate-200">
                {activeSession.date}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 text-xs text-slate-400">
                <Clock size={15} className="text-blue-400" />
                <span>Time</span>
              </div>
              <span className="text-xs font-semibold text-slate-200 font-mono">
                {activeSession.startTime} – {activeSession.endTime}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 text-xs text-slate-400">
                <CheckCircle2 size={15} className="text-emerald-400" />
                <span>Status</span>
              </div>
              <div className="flex items-center space-x-1.5 bg-emerald-950/60 border border-emerald-500/30 px-2.5 py-0.5 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs font-bold text-emerald-400">Active</span>
              </div>
            </div>
          </div>

          {/* Student Presence Verification Details */}
          <div className="pt-4 flex items-center justify-between text-xs text-slate-400">
            <span>Marking for:</span>
            <span className="font-semibold text-white">
              {student.name} ({student.studentId})
            </span>
          </div>
        </div>
      </div>

      {/* Bottom Action Section */}
      <div className="px-5 pb-8 pt-2 max-w-sm mx-auto w-full">
        <button
          disabled={isSubmitting}
          onClick={handleMark}
          className="w-full py-4 px-6 rounded-2xl bg-blue-600 hover:bg-blue-500 active:scale-[0.98] text-white font-bold text-base flex items-center justify-center space-x-2 shadow-lg shadow-blue-600/30 transition-all cursor-pointer disabled:opacity-50"
        >
          {isSubmitting ? (
            <>
              <Loader2 size={20} className="animate-spin" />
              <span>Verifying presence...</span>
            </>
          ) : (
            <span>Mark My Presence</span>
          )}
        </button>

        <div className="mt-3.5 flex items-start space-x-2 px-1">
          <Info size={14} className="text-slate-400 shrink-0 mt-0.5" />
          <p className="text-[11px] text-slate-400 leading-normal">
            You can mark your own attendance only once for this session.
          </p>
        </div>
      </div>
    </div>
  );
};
