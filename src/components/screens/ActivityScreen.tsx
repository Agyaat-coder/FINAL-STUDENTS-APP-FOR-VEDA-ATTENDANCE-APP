import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { HostelNotice } from '../../types';
import {
  Moon,
  Sun,
  Sunset,
  Calendar,
  FileText,
  AlertTriangle,
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
  XCircle,
} from 'lucide-react';

export const ActivityScreen: React.FC = () => {
  const { attendanceRecords, notices, openModal } = useApp();
  const [activeSegment, setActiveSegment] = useState<'attendance' | 'notices'>('attendance');
  const [selectedMonth, setSelectedMonth] = useState<string>('September 2026');

  // Compute attendance stats
  const total = 25;
  const present = 22;
  const missed = 3;
  const percentage = Math.round((present / total) * 100); // 88%

  // Circular gauge SVG parameters
  const radius = 38;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

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
    <div className="flex-1 pb-6 px-4 select-none">
      {/* Top Page Title */}
      <div className="pt-2 pb-3">
        <h1 className="text-2xl font-bold tracking-tight text-white">
          Activity
        </h1>
      </div>

      {/* Segmented Control: Attendance / Notices - Screen 9 */}
      <div className="bg-[#101b36] p-1 rounded-2xl flex items-center mb-5 border border-slate-800">
        <button
          onClick={() => setActiveSegment('attendance')}
          className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
            activeSegment === 'attendance'
              ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          Attendance
        </button>
        <button
          onClick={() => setActiveSegment('notices')}
          className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all relative ${
            activeSegment === 'notices'
              ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <span>Notices</span>
          {notices.some((n) => n.isUnread) && (
            <span className="ml-1.5 px-1.5 py-0.2 text-[10px] bg-rose-500 text-white rounded-full font-bold">
              {notices.filter((n) => n.isUnread).length}
            </span>
          )}
        </button>
      </div>

      {activeSegment === 'attendance' ? (
        <div className="space-y-5">
          {/* Monthly Attendance Summary Card - Screen 9 */}
          <div className="bg-[#101b36] border border-blue-900/40 rounded-3xl p-5 shadow-xl shadow-blue-950/30">
            {/* Month Header */}
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold text-slate-300">
                {selectedMonth}
              </span>
              <div className="flex items-center space-x-1.5 text-[11px] text-blue-400 bg-blue-950/60 border border-blue-800/40 px-2 py-0.5 rounded-lg">
                <ShieldCheck size={12} />
                <span>Verified by Warden</span>
              </div>
            </div>

            {/* Circular Progress & Breakdown */}
            <div className="flex items-center justify-between px-2">
              {/* Circular Gauge */}
              <div className="relative flex items-center justify-center">
                <svg width="104" height="104" className="rotate-[-90deg]">
                  {/* Track circle */}
                  <circle
                    cx="52"
                    cy="52"
                    r={radius}
                    stroke="#1e293b"
                    strokeWidth="9"
                    fill="transparent"
                  />
                  {/* Progress circle */}
                  <circle
                    cx="52"
                    cy="52"
                    r={radius}
                    stroke="#10b981"
                    strokeWidth="9"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                    fill="transparent"
                  />
                </svg>
                <div className="absolute flex flex-col items-center justify-center text-center">
                  <span className="text-xl font-extrabold text-white font-mono tracking-tight">
                    {percentage}%
                  </span>
                </div>
              </div>

              {/* Stats Numbers */}
              <div className="space-y-2.5 text-xs">
                <div className="flex items-center justify-between space-x-6">
                  <span className="text-slate-400 flex items-center space-x-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    <span>Present:</span>
                  </span>
                  <span className="font-bold text-white font-mono text-sm">{present}</span>
                </div>

                <div className="flex items-center justify-between space-x-6">
                  <span className="text-slate-400 flex items-center space-x-1.5">
                    <span className="w-2 h-2 rounded-full bg-rose-400" />
                    <span>Missed:</span>
                  </span>
                  <span className="font-bold text-white font-mono text-sm">{missed}</span>
                </div>

                <div className="pt-1.5 border-t border-slate-800 flex items-center justify-between space-x-6">
                  <span className="text-slate-400 font-medium">Total:</span>
                  <span className="font-bold text-slate-200 font-mono text-sm">{total}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Activity Section */}
          <div>
            <div className="flex items-center justify-between mb-3 px-1">
              <h2 className="text-sm font-bold text-white">
                Recent Activity
              </h2>
              <button
                onClick={() => openModal('view_all_attendance')}
                className="text-xs font-semibold text-blue-400 hover:text-blue-300 cursor-pointer"
              >
                View All
              </button>
            </div>

            {/* List of Recent Attendance */}
            <div className="space-y-2.5">
              {attendanceRecords.slice(0, 5).map((record) => {
                const isPresent = record.status === 'Present';
                return (
                  <div
                    key={record.id}
                    className="bg-[#101b36] border border-slate-800/80 hover:border-slate-700/80 rounded-2xl p-3.5 flex items-center justify-between transition-all"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center shrink-0">
                        {getSessionIcon(record.sessionTitle)}
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-white">
                          {record.sessionTitle}
                        </h4>
                        <p className="text-[11px] text-slate-400 mt-0.5 font-mono">
                          {record.markedAt || `${record.date} • ${record.time}`}
                        </p>
                      </div>
                    </div>

                    <span
                      className={`text-xs font-bold px-2.5 py-0.5 rounded-full flex items-center space-x-1 ${
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
              })}
            </div>
          </div>
        </div>
      ) : (
        /* Notices Tab */
        <div className="space-y-3">
          <div className="flex items-center justify-between px-1 mb-1">
            <span className="text-xs text-slate-400">
              Official circulars from Warden & Management
            </span>
          </div>

          {notices.map((notice) => (
            <button
              key={notice.id}
              onClick={() => openModal('notice_detail', notice)}
              className="w-full text-left bg-[#101b36] hover:bg-[#142244] border border-slate-800 rounded-2xl p-4 transition-all active:scale-[0.99] cursor-pointer group"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-2">
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                      notice.category === 'Urgent'
                        ? 'bg-rose-950 text-rose-400 border border-rose-500/40'
                        : notice.category === 'Mess'
                        ? 'bg-cyan-950 text-cyan-400 border border-cyan-500/40'
                        : 'bg-blue-950 text-blue-400 border border-blue-500/40'
                    }`}
                  >
                    {notice.category}
                  </span>
                  {notice.isUnread && (
                    <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
                  )}
                </div>
                <span className="text-[11px] text-slate-400 font-mono">
                  {notice.date}
                </span>
              </div>

              <h3 className="text-sm font-bold text-white mt-2 group-hover:text-blue-300 transition-colors">
                {notice.title}
              </h3>
              <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                {notice.description}
              </p>

              <div className="mt-3 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
                <span>By {notice.issuedBy}</span>
                <ChevronRight size={14} className="text-slate-400 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
