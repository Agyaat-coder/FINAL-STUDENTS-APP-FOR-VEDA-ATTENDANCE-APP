import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { StatusBar } from './components/common/StatusBar';
import { BottomNav } from './components/common/BottomNav';
import { WardenSyncBar } from './components/WardenSyncBar';

// Flow Screens
import { SplashScreen } from './components/screens/SplashScreen';
import { WelcomeScreen } from './components/screens/WelcomeScreen';
import { ActivationScreen } from './components/screens/ActivationScreen';
import { ActivationSuccessScreen } from './components/screens/ActivationSuccessScreen';

// Primary Tab Screens
import { TodayScreen } from './components/screens/TodayScreen';
import { ActivityScreen } from './components/screens/ActivityScreen';
import { HostelScreen } from './components/screens/HostelScreen';
import { MeScreen } from './components/screens/MeScreen';

// Modals
import { AttendanceDetailsModal } from './components/screens/AttendanceDetailsModal';
import { AttendanceSuccessScreen as AttendanceSuccessModal } from './components/screens/AttendanceSuccessScreen';
import { MessMenuModal } from './components/modals/MessMenuModal';
import { AccountModal } from './components/modals/AccountModal';
import { AppearanceModal } from './components/modals/AppearanceModal';
import { NotificationsModal } from './components/modals/NotificationsModal';
import { HelpModal } from './components/modals/HelpModal';
import { AboutModal } from './components/modals/AboutModal';
import { NoticeDetailModal } from './components/modals/NoticeDetailModal';
import { ViewAllAttendanceModal } from './components/modals/ViewAllAttendanceModal';
import { AndroidCodeViewerModal } from './components/modals/AndroidCodeViewerModal';

const AppContent: React.FC = () => {
  const { flowState, activeTab, activeModal, isFramedView } = useApp();

  // Onboarding & Initial Activation State
  if (flowState === 'splash') {
    return (
      <div className="min-h-screen bg-[#070d1e] flex flex-col justify-center items-center">
        <div className="w-full max-w-md min-h-screen shadow-2xl relative flex flex-col">
          <SplashScreen />
        </div>
      </div>
    );
  }

  if (flowState === 'welcome') {
    return (
      <div className="min-h-screen bg-slate-900 flex flex-col justify-center items-center">
        <div className="w-full max-w-md min-h-screen shadow-2xl relative flex flex-col bg-white">
          <WelcomeScreen />
        </div>
      </div>
    );
  }

  if (flowState === 'activation') {
    return (
      <div className="min-h-screen bg-[#070d1e] flex flex-col justify-center items-center">
        <div className="w-full max-w-md min-h-screen shadow-2xl relative flex flex-col">
          <ActivationScreen />
        </div>
      </div>
    );
  }

  if (flowState === 'activation_success') {
    return (
      <div className="min-h-screen bg-slate-900 flex flex-col justify-center items-center">
        <div className="w-full max-w-md min-h-screen shadow-2xl relative flex flex-col bg-white">
          <ActivationSuccessScreen />
        </div>
      </div>
    );
  }

  // Main Student Application Interface
  return (
    <div className={`min-h-screen bg-[#050914] flex flex-col justify-center items-center ${isFramedView ? 'p-4 md:p-8' : ''}`}>
      {/* Mobile Device Mockup Container */}
      <div
        className={`w-full max-w-md min-h-screen bg-[#070d1e] text-white flex flex-col relative overflow-hidden ${
          isFramedView
            ? 'rounded-[44px] border-[10px] border-slate-800 shadow-2xl shadow-blue-950/80 ring-1 ring-slate-700/50 min-h-[844px]'
            : 'shadow-2xl'
        }`}
      >
        {/* Warden Simulation Bar for live companion synchronization */}
        <WardenSyncBar />

        {/* Mobile Device Status Bar */}
        <StatusBar lightMode={false} />

        {/* Dynamic Tab Screen Body */}
        <main className="flex-1 flex flex-col overflow-y-auto no-scrollbar pt-1">
          {activeTab === 'today' && <TodayScreen />}
          {activeTab === 'activity' && <ActivityScreen />}
          {activeTab === 'hostel' && <HostelScreen />}
          {activeTab === 'me' && <MeScreen />}
        </main>

        {/* Primary 4-Tab Bottom Navigation: TODAY, ACTIVITY, HOSTEL, ME */}
        <BottomNav />

        {/* Modals & Subscreens */}
        {activeModal === 'attendance_details' && <AttendanceDetailsModal />}
        {activeModal === 'attendance_success' && <AttendanceSuccessModal />}
        {activeModal === 'mess_menu' && <MessMenuModal />}
        {activeModal === 'account_details' && <AccountModal />}
        {activeModal === 'appearance_modal' && <AppearanceModal />}
        {activeModal === 'notifications_modal' && <NotificationsModal />}
        {activeModal === 'help_modal' && <HelpModal />}
        {activeModal === 'about_modal' && <AboutModal />}
        {activeModal === 'notice_detail' && <NoticeDetailModal />}
        {activeModal === 'view_all_attendance' && <ViewAllAttendanceModal />}
        {activeModal === 'android_code_viewer' && <AndroidCodeViewerModal />}
      </div>
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
