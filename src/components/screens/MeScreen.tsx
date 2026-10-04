import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { StudentAvatar } from '../illustrations/VedaArt';
import {
  User,
  Palette,
  Bell,
  HelpCircle,
  Info,
  LogOut,
  ChevronRight,
  ShieldAlert,
} from 'lucide-react';

export const MeScreen: React.FC = () => {
  const { student, openModal, resetToSplash, appearance } = useApp();
  const [showSignOutConfirm, setShowSignOutConfirm] = useState(false);

  const menuItems = [
    {
      id: 'account',
      icon: <User size={18} className="text-blue-400" />,
      label: 'Account',
      action: () => openModal('account_details'),
    },
    {
      id: 'appearance',
      icon: <Palette size={18} className="text-blue-400" />,
      label: 'Appearance',
      badge: appearance.charAt(0).toUpperCase() + appearance.slice(1),
      action: () => openModal('appearance_modal'),
    },
    {
      id: 'notifications',
      icon: <Bell size={18} className="text-blue-400" />,
      label: 'Notifications',
      action: () => openModal('notifications_modal'),
    },
    {
      id: 'help',
      icon: <HelpCircle size={18} className="text-blue-400" />,
      label: 'Help & Feedback',
      action: () => openModal('help_modal'),
    },
    {
      id: 'about',
      icon: <Info size={18} className="text-blue-400" />,
      label: 'About VEDA',
      badge: 'Version 1.0.0',
      action: () => openModal('about_modal'),
    },
  ];

  return (
    <div className="flex-1 pb-6 px-4 select-none">
      {/* Profile Header Card - Screen 10 (Right) */}
      <div className="pt-4 pb-6 flex flex-col items-center text-center">
        <StudentAvatar size={80} className="mb-3" />

        <h2 className="text-xl font-extrabold text-white tracking-tight">
          {student.name}
        </h2>

        <p className="text-xs font-mono text-blue-400 font-semibold mt-0.5">
          Student ID: {student.studentId}
        </p>

        <p className="text-xs text-slate-400 mt-1">
          {student.hostelName} • Room {student.roomNumber}
        </p>
      </div>

      {/* Settings Menu List */}
      <div className="bg-[#101b36] border border-slate-800/90 rounded-3xl overflow-hidden mb-6 shadow-xl shadow-blue-950/20 divide-y divide-slate-800/60">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={item.action}
            className="w-full px-5 py-4 flex items-center justify-between hover:bg-[#142347] active:bg-[#182952] transition-colors cursor-pointer text-left"
          >
            <div className="flex items-center space-x-3.5">
              <div className="w-8 h-8 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center">
                {item.icon}
              </div>
              <span className="text-sm font-semibold text-slate-200">
                {item.label}
              </span>
            </div>

            <div className="flex items-center space-x-2 text-xs text-slate-400">
              {item.badge && <span>{item.badge}</span>}
              <ChevronRight size={16} className="text-slate-400" />
            </div>
          </button>
        ))}
      </div>

      {/* Sign Out Action Button */}
      {showSignOutConfirm ? (
        <div className="bg-rose-950/80 border border-rose-500/50 rounded-2xl p-4 text-center">
          <div className="flex items-center justify-center space-x-1.5 text-xs text-rose-300 mb-2 font-medium">
            <ShieldAlert size={16} />
            <span>Are you sure you want to sign out?</span>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setShowSignOutConfirm(false)}
              className="flex-1 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold hover:bg-slate-700"
            >
              Cancel
            </button>
            <button
              onClick={resetToSplash}
              className="flex-1 py-2 rounded-xl bg-rose-600 text-white text-xs font-bold hover:bg-rose-700"
            >
              Confirm Sign Out
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setShowSignOutConfirm(true)}
          className="w-full py-4 px-6 rounded-2xl bg-rose-950/60 hover:bg-rose-900/60 border border-rose-500/40 active:scale-[0.98] text-rose-400 font-bold text-sm flex items-center justify-center space-x-2 shadow-lg shadow-rose-950/40 transition-all cursor-pointer"
        >
          <LogOut size={17} />
          <span>Sign Out</span>
        </button>
      )}
    </div>
  );
};
