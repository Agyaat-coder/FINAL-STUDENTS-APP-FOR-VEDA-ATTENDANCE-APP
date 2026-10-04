import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { StatusBar } from '../common/StatusBar';
import {
  ArrowLeft,
  Filter,
  CheckCircle2,
  XCircle,
  Moon,
  Sunset,
  Sun,
  Calendar,
} from 'lucide-react';

export const ViewAllAttendanceModal: React.FC = () => {
  const { closeModal, attendanceRecords } = useApp();
  const [statusFilter, setStatusFilter] = useState<'All' | 'Present' | 'Missed'>('All');
  const [monthFilter, setMonthFilter] = useState<'All' | 'October 2026' | 'September 2026'>('All');

  const filteredRecords = attendanceRecords.filter((rec) => {
    if (statusFilter !== 'All' && rec.status !== statusFilter) return false;
    if (monthFilter === 'October 2026' && !rec.date.includes('Oct 2026')) return false;
    if (monthFilter === 'September 2026' && !rec.date.includes('Sep 2026')) return false;
    return true;
  });

  const getSessionIcon = (title: string) => {
    if (title.toLowerCase().includes('night')) {
      return <Moon size={16} className="text-blue-400" />;
    } else if (title.toLowerCase().includes('evening')) {
      return <Sunset size={16} className="text-amber-400" />;
    } else {
      return <Sun size={16} className="text-yellow-400" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#070d1e] text-white flex flex-col justify-between overflow-y-auto select-none">
      <StatusBar lightMode={false} />

      {/* Top Bar */}
      <div className="px-5 pt-3 pb-2 flex items-center justify-between border-b border-slate-800/60 sticky top-0 bg-[#070d1e]/90 backdrop-blur-md z-10">
        <button
          onClick={closeModal}
          className="p-2 -ml-2 rounded-full text-slate-300 hover:text-white hover:bg-slate-800/60 active:scale-95 transition-all"
        >
          <ArrowLeft size={22} />
        </button>
        <h2 className="text-base font-bold text-white tracking-tight">
          Attendance History
        </h2>
        <div className="w-8" />
      </div>

      {/* Filters Bar */}
      <div className="px-4 py-3 border-b border-slate-800 space-y-2.5">
        {/* Status Filter Tabs */}
        <div className="flex items-center space-x-2">
          {(['All', 'Present', 'Missed'] as const).map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                statusFilter === status
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                  : 'bg-[#101b36] text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              {status}
            </button>
          ))}
        </div>

        {/* Month Filter Selector */}
        <div className="flex items-center space-x-2">
          {(['All', 'October 2026', 'September 2026'] as const).map((m) => (
            <button
              key={m}
              onClick={() => setMonthFilter(m)}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-all cursor-pointer ${
                monthFilter === m
                  ? 'bg-slate-700 text-white'
                  : 'bg-slate-900/60 text-slate-400 hover:text-slate-300'
              }`}
            >
              {m}
            </button>
          ))}
        </div>
      </div>

      {/* Records List */}
      <div className="flex-1 px-4 py-4 space-y-2.5 max-w-md mx-auto w-full">
        {filteredRecords.length === 0 ? (
          <div className="p-8 text-center text-xs text-slate-400">
            No attendance records match the selected filter.
          </div>
        ) : (
          filteredRecords.map((record) => {
            const isPresent = record.status === 'Present';
            return (
              <div
                key={record.id}
                className="bg-[#101b36] border border-slate-800 rounded-2xl p-3.5 flex items-center justify-between"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center shrink-0">
                    {getSessionIcon(record.sessionTitle)}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">
                      {record.sessionTitle}
                    </h4>
                    <p className="text-[11px] text-slate-400 mt-0.5 font-mono">
                      {record.markedAt || `${record.date} • ${record.time}`}
                    </p>
                    <span className="text-[10px] text-slate-400 mt-0.5 block">
                      Verification: {record.verificationMethod}
                    </span>
                  </div>
                </div>

                <span
                  className={`text-xs font-bold px-2.5 py-1 rounded-full flex items-center space-x-1 ${
                    isPresent
                      ? 'bg-emerald-950/70 border border-emerald-500/30 text-emerald-400'
                      : 'bg-rose-950/70 border border-rose-500/30 text-rose-400'
                  }`}
                >
                  {isPresent ? <CheckCircle2 size={12} /> : <XCircle size={12} />}
                  <span>{record.status}</span>
                </span>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
