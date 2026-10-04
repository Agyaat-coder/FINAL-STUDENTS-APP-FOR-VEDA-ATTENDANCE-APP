import React from 'react';
import { useApp } from '../../context/AppContext';
import { StatusBar } from '../common/StatusBar';
import { ArrowLeft, Bell, CalendarCheck, FileText, Megaphone } from 'lucide-react';

export const NotificationsModal: React.FC = () => {
  const { closeModal, notificationSettings, toggleNotificationSetting } = useApp();

  const toggles = [
    {
      key: 'attendance' as const,
      label: 'Attendance Reminders',
      desc: 'Get notified when night or evening attendance session is opened by the warden.',
      icon: <CalendarCheck size={18} className="text-blue-400" />,
      active: notificationSettings.attendance,
    },
    {
      key: 'notices' as const,
      label: 'Hostel Notices',
      desc: 'Instant notifications for maintenance, water supply, and mess schedule notices.',
      icon: <FileText size={18} className="text-blue-400" />,
      active: notificationSettings.notices,
    },
    {
      key: 'announcements' as const,
      label: 'Important Announcements',
      desc: 'Urgent gate alerts, warden orders, and campus circulars.',
      icon: <Megaphone size={18} className="text-blue-400" />,
      active: notificationSettings.announcements,
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
          Notifications
        </h2>
        <div className="w-8" />
      </div>

      <div className="flex-1 px-4 py-6 max-w-md mx-auto w-full space-y-4">
        <p className="text-xs text-slate-400 px-1 mb-2">
          Configure real-time alerts dispatched from the VEDA Warden console.
        </p>

        <div className="bg-[#101b36] border border-slate-800 rounded-2xl divide-y divide-slate-800/80 overflow-hidden shadow-lg">
          {toggles.map((item) => (
            <div key={item.key} className="p-4 flex items-center justify-between">
              <div className="flex items-start space-x-3.5 pr-4">
                <div className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center shrink-0 mt-0.5">
                  {item.icon}
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white">{item.label}</h4>
                  <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>

              {/* Simple Toggle Switch */}
              <button
                type="button"
                onClick={() => toggleNotificationSetting(item.key)}
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                  item.active ? 'bg-blue-600' : 'bg-slate-700'
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${
                    item.active ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
