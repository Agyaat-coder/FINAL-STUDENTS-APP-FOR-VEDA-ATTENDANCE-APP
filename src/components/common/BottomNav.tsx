import React from 'react';
import { useApp } from '../../context/AppContext';
import { NavigationTab } from '../../types';
import { CalendarCheck, History, Building2, User } from 'lucide-react';

export const BottomNav: React.FC = () => {
  const { activeTab, setActiveTab, activeSession, hasMarkedCurrentSession } = useApp();

  const navItems: { id: NavigationTab; label: string; icon: React.ReactNode; badge?: boolean }[] = [
    {
      id: 'today',
      label: 'Today',
      icon: <CalendarCheck size={20} className="stroke-[2.2]" />,
      badge: Boolean(activeSession && !hasMarkedCurrentSession),
    },
    {
      id: 'activity',
      label: 'Activity',
      icon: <History size={20} className="stroke-[2.2]" />,
    },
    {
      id: 'hostel',
      label: 'Hostel',
      icon: <Building2 size={20} className="stroke-[2.2]" />,
    },
    {
      id: 'me',
      label: 'Me',
      icon: <User size={20} className="stroke-[2.2]" />,
    },
  ];

  return (
    <nav
      aria-label="Bottom Navigation"
      className="sticky bottom-0 left-0 right-0 z-40 bg-[#091024]/95 backdrop-blur-md border-t border-slate-800/80 px-3 py-1.5"
    >
      <div className="max-w-md mx-auto grid grid-cols-4 items-center">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`relative flex flex-col items-center justify-center py-1 px-2 rounded-xl transition-all duration-200 min-h-[48px] ${
                isActive
                  ? 'text-blue-400 font-semibold'
                  : 'text-slate-400 hover:text-slate-200 active:scale-95'
              }`}
            >
              <div className="relative">
                {item.icon}
                {item.badge && (
                  <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-rose-500 rounded-full animate-pulse ring-2 ring-[#091024]" />
                )}
              </div>
              <span
                className={`text-[11px] tracking-tight mt-1 transition-colors ${
                  isActive ? 'text-blue-400 font-semibold' : 'text-slate-400'
                }`}
              >
                {item.label}
              </span>
              {isActive && (
                <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-0.5 shadow-sm shadow-blue-500/50" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
