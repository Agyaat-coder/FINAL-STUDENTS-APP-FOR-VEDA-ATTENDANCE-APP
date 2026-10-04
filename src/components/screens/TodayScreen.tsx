import React from 'react';
import { useApp } from '../../context/AppContext';
import { HostelIllustration } from '../illustrations/VedaArt';
import {
  Bell,
  Check,
  AlertCircle,
  FileText,
  UtensilsCrossed,
  Building,
  ArrowRight,
  ShieldCheck,
  Clock,
  WifiOff,
} from 'lucide-react';

export const TodayScreen: React.FC = () => {
  const {
    student,
    activeSession,
    hasMarkedCurrentSession,
    notices,
    openModal,
    setActiveTab,
    isOffline,
    lastSyncedTime,
  } = useApp();

  const unreadNoticesCount = notices.filter((n) => n.isUnread).length;

  // Determine greeting based on current hour
  const currentHour = new Date().getHours();
  let greeting = 'Good evening';
  if (currentHour < 12) greeting = 'Good morning';
  else if (currentHour < 17) greeting = 'Good afternoon';

  return (
    <div className="flex-1 pb-6 px-4 select-none">
      {/* Offline banner if enabled in simulation */}
      {isOffline && (
        <div className="mb-4 bg-amber-950/60 border border-amber-500/40 rounded-xl p-2.5 flex items-center justify-between text-xs text-amber-200">
          <div className="flex items-center space-x-2">
            <WifiOff size={15} className="text-amber-400" />
            <span>Offline Mode • Cached data active</span>
          </div>
          <span className="text-[10px] text-amber-300/80">{lastSyncedTime}</span>
        </div>
      )}

      {/* Top Header Section */}
      <div className="pt-2 pb-4 flex items-center justify-between">
        <div>
          <p className="text-xs font-medium text-slate-400">
            {greeting},
          </p>
          <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-1.5">
            <span>{student.name.split(' ')[0]}</span>
            <span>👋</span>
          </h1>
          <p className="text-xs text-slate-400 mt-0.5 flex items-center space-x-1.5">
            <span className="font-semibold text-blue-400">Room {student.roomNumber}</span>
            <span>•</span>
            <span className="truncate">{student.hostelName}</span>
          </p>
        </div>

        {/* Notification Bell */}
        <button
          onClick={() => setActiveTab('activity')}
          aria-label="View notifications"
          className="relative w-10 h-10 rounded-full bg-[#121d38] border border-slate-700/60 flex items-center justify-center text-slate-300 hover:text-white hover:border-slate-500 transition-all cursor-pointer active:scale-95"
        >
          <Bell size={18} />
          {unreadNoticesCount > 0 && (
            <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full ring-2 ring-[#0c152a]" />
          )}
        </button>
      </div>

      {/* DYNAMIC ATTENDANCE HERO CARD */}
      {activeSession ? (
        hasMarkedCurrentSession ? (
          // ALREADY MARKED STATE FOR CURRENT SESSION
          <div className="w-full bg-gradient-to-br from-emerald-950/70 via-[#0e2720] to-[#0c1c28] border border-emerald-500/40 rounded-3xl p-5 mb-5 shadow-xl shadow-emerald-950/40">
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-11 h-11 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                  <ShieldCheck size={24} />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs uppercase font-bold tracking-wider text-emerald-400">
                      Attendance Recorded
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  </div>
                  <h3 className="text-lg font-bold text-white mt-0.5">
                    {activeSession.title}
                  </h3>
                </div>
              </div>
            </div>

            <p className="text-xs text-slate-300 mt-3 leading-relaxed">
              Your presence has been confirmed by Warden system for today's session.
            </p>

            <div className="mt-4 pt-3 border-t border-emerald-900/60 flex items-center justify-between">
              <div className="flex items-center space-x-1.5 text-xs text-emerald-300">
                <Clock size={13} />
                <span>Marked Present • {activeSession.date}</span>
              </div>
              <button
                onClick={() => setActiveTab('activity')}
                className="text-xs font-semibold text-emerald-400 hover:text-emerald-300 flex items-center space-x-1 cursor-pointer"
              >
                <span>View Activity</span>
                <ArrowRight size={13} />
              </button>
            </div>
          </div>
        ) : (
          // ACTIVE ATTENDANCE CARD - EXACT VISUAL MATCH TO SCREEN 6 IN REFERENCE
          <div className="w-full bg-gradient-to-br from-[#ea384d] via-[#d62839] to-[#ba182b] rounded-3xl p-6 mb-5 text-white shadow-xl shadow-rose-950/60 relative overflow-hidden transition-all duration-300 hover:shadow-rose-900/40">
            {/* Background circular watermarks */}
            <div className="absolute -top-12 -right-12 w-44 h-44 rounded-full bg-white/10 blur-xl pointer-events-none" />
            <div className="absolute bottom-0 right-16 w-32 h-32 rounded-full bg-black/10 blur-md pointer-events-none" />

            <div className="relative z-10">
              <div className="w-11 h-11 rounded-2xl bg-white/20 backdrop-blur-sm border border-white/25 flex items-center justify-center mb-3.5">
                <AlertCircle size={22} className="text-white" />
              </div>

              <h2 className="text-2xl font-extrabold tracking-tight text-white">
                Attendance is open
              </h2>

              <p className="text-sm text-white/90 mt-1 font-medium">
                Please mark your presence before <span className="font-bold underline decoration-white/40">{activeSession.endTime}</span>.
              </p>

              <div className="mt-5">
                <button
                  onClick={() => openModal('attendance_details')}
                  className="w-full py-3.5 px-5 rounded-2xl bg-white text-[#d62839] hover:bg-slate-100 active:scale-[0.98] font-bold text-sm flex items-center justify-center space-x-2 shadow-lg shadow-black/20 transition-all cursor-pointer"
                >
                  <span>Mark Present</span>
                  <ArrowRight size={17} className="stroke-[2.5]" />
                </button>
              </div>
            </div>
          </div>
        )
      ) : (
        // IDLE STATE - EXACT VISUAL MATCH TO SCREEN 5 IN REFERENCE
        <div className="w-full bg-[#101b36] border border-blue-900/40 rounded-3xl p-5 mb-5 text-center shadow-xl shadow-blue-950/50 relative overflow-hidden">
          {/* Hostel at night artwork */}
          <div className="mb-4">
            <HostelIllustration className="border border-blue-800/30 max-h-48" />
          </div>

          <div className="w-10 h-10 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto mb-2 shadow-inner">
            <Check size={22} className="stroke-[3]" />
          </div>

          <h2 className="text-lg font-bold text-white">
            You're all caught up!
          </h2>
          <p className="text-xs text-slate-400 mt-1 max-w-xs mx-auto leading-relaxed">
            No attendance is active right now. Enjoy your day!
          </p>
        </div>
      )}

      {/* QUICK ACCESS CARDS - EXACT VISUAL MATCH TO REFERENCE SCREENS 5 & 6 */}
      <div className="grid grid-cols-3 gap-3">
        {/* Notices Card */}
        <button
          onClick={() => setActiveTab('activity')}
          className="bg-[#101a33] hover:bg-[#142244] border border-slate-800 hover:border-slate-700/80 rounded-2xl p-3.5 text-left transition-all active:scale-[0.98] flex flex-col justify-between min-h-[96px] cursor-pointer group"
        >
          <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center group-hover:scale-105 transition-transform">
            <FileText size={17} />
          </div>
          <div>
            <p className="text-xs font-bold text-white">Notices</p>
            <p className="text-[11px] text-amber-400/90 font-medium">
              {unreadNoticesCount > 0 ? `${unreadNoticesCount} new` : 'All read'}
            </p>
          </div>
        </button>

        {/* Mess Menu Card */}
        <button
          onClick={() => openModal('mess_menu')}
          className="bg-[#101a33] hover:bg-[#142244] border border-slate-800 hover:border-slate-700/80 rounded-2xl p-3.5 text-left transition-all active:scale-[0.98] flex flex-col justify-between min-h-[96px] cursor-pointer group"
        >
          <div className="w-8 h-8 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center group-hover:scale-105 transition-transform">
            <UtensilsCrossed size={17} />
          </div>
          <div>
            <p className="text-xs font-bold text-white">Mess Menu</p>
            <p className="text-[11px] text-cyan-400/90 font-medium">Today</p>
          </div>
        </button>

        {/* Hostel Info Card */}
        <button
          onClick={() => setActiveTab('hostel')}
          className="bg-[#101a33] hover:bg-[#142244] border border-slate-800 hover:border-slate-700/80 rounded-2xl p-3.5 text-left transition-all active:scale-[0.98] flex flex-col justify-between min-h-[96px] cursor-pointer group"
        >
          <div className="w-8 h-8 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center group-hover:scale-105 transition-transform">
            <Building size={17} />
          </div>
          <div>
            <p className="text-xs font-bold text-white">Hostel Info</p>
            <p className="text-[11px] text-blue-400/90 font-medium">View</p>
          </div>
        </button>
      </div>
    </div>
  );
};
