import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  NavigationTab,
  AppFlowState,
  Student,
  AttendanceSession,
  AttendanceRecord,
  HostelNotice,
  HostelInfo,
} from '../types';
import {
  initialStudent,
  sampleActiveSession,
  sampleAttendanceRecords,
  sampleNotices,
  sampleHostelInfo,
} from '../data/mockData';

export type ActiveModal =
  | 'none'
  | 'attendance_details'
  | 'attendance_success'
  | 'mess_menu'
  | 'view_all_attendance'
  | 'account_details'
  | 'appearance_modal'
  | 'notifications_modal'
  | 'help_modal'
  | 'about_modal'
  | 'notice_detail'
  | 'android_code_viewer';

interface AppContextType {
  flowState: AppFlowState;
  setFlowState: (state: AppFlowState) => void;
  activeTab: NavigationTab;
  setActiveTab: (tab: NavigationTab) => void;
  student: Student;
  activeSession: AttendanceSession | null;
  hasMarkedCurrentSession: boolean;
  attendanceRecords: AttendanceRecord[];
  notices: HostelNotice[];
  hostelInfo: HostelInfo;
  activeModal: ActiveModal;
  openModal: (modal: ActiveModal, notice?: HostelNotice) => void;
  closeModal: () => void;
  selectedNotice: HostelNotice | null;
  
  // Actions
  markCurrentAttendance: () => boolean;
  toggleWardenSession: () => void;
  activateAccountWithCode: (code: string) => boolean;
  resetToSplash: () => void;
  
  // Preferences
  appearance: 'system' | 'dark' | 'light';
  setAppearance: (mode: 'system' | 'dark' | 'light') => void;
  notificationSettings: {
    attendance: boolean;
    notices: boolean;
    announcements: boolean;
  };
  toggleNotificationSetting: (key: 'attendance' | 'notices' | 'announcements') => void;
  
  // Offline simulation
  isOffline: boolean;
  setIsOffline: (offline: boolean) => void;
  lastSyncedTime: string;

  // View mode: simulated phone frame vs full responsive
  isFramedView: boolean;
  setIsFramedView: (framed: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = 'veda_student_app_state_v1';

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load saved state or use defaults
  const [flowState, setFlowState] = useState<AppFlowState>('main');
  const [activeTab, setActiveTab] = useState<NavigationTab>('today');
  const [student, setStudent] = useState<Student>(initialStudent);
  const [activeSession, setActiveSession] = useState<AttendanceSession | null>(sampleActiveSession);
  const [hasMarkedCurrentSession, setHasMarkedCurrentSession] = useState<boolean>(false);
  const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>(sampleAttendanceRecords);
  const [notices, setNotices] = useState<HostelNotice[]>(sampleNotices);
  const [hostelInfo] = useState<HostelInfo>(sampleHostelInfo);
  const [activeModal, setActiveModal] = useState<ActiveModal>('none');
  const [selectedNotice, setSelectedNotice] = useState<HostelNotice | null>(null);
  const [appearance, setAppearance] = useState<'system' | 'dark' | 'light'>('dark');
  const [notificationSettings, setNotificationSettings] = useState({
    attendance: true,
    notices: true,
    announcements: true,
  });
  const [isOffline, setIsOffline] = useState<boolean>(false);
  const [lastSyncedTime] = useState<string>('Just now (08:12 PM)');
  const [isFramedView, setIsFramedView] = useState<boolean>(false);

  // Check if current active session is already marked
  useEffect(() => {
    if (!activeSession) {
      setHasMarkedCurrentSession(false);
      return;
    }
    const alreadyMarked = attendanceRecords.some(
      (r) => r.sessionId === activeSession.id && r.status === 'Present'
    );
    setHasMarkedCurrentSession(alreadyMarked);
  }, [activeSession, attendanceRecords]);

  const openModal = (modal: ActiveModal, notice?: HostelNotice) => {
    if (notice) {
      setSelectedNotice(notice);
      // Mark notice as read
      setNotices((prev) =>
        prev.map((n) => (n.id === notice.id ? { ...n, isUnread: false } : n))
      );
    }
    setActiveModal(modal);
  };

  const closeModal = () => {
    setActiveModal('none');
    setSelectedNotice(null);
  };

  const markCurrentAttendance = (): boolean => {
    if (!activeSession || hasMarkedCurrentSession) {
      return false;
    }

    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const dateStr = '2 Oct 2026';

    const newRecord: AttendanceRecord = {
      id: `att_${Date.now()}`,
      sessionId: activeSession.id,
      sessionTitle: activeSession.title,
      date: dateStr,
      time: timeStr,
      status: 'Present',
      markedAt: `${dateStr} • ${timeStr}`,
      verificationMethod: 'Self-App',
    };

    setAttendanceRecords((prev) => [newRecord, ...prev]);
    setHasMarkedCurrentSession(true);
    setActiveModal('attendance_success');
    return true;
  };

  // Simulation: Warden creates or ends session
  const toggleWardenSession = () => {
    if (activeSession) {
      // Close session
      setActiveSession(null);
    } else {
      // Create new session
      setActiveSession({
        id: `sess_${Date.now()}`,
        title: 'Night Attendance',
        hostelName: student.hostelName,
        date: '2 Oct 2026',
        dateIso: '2026-10-02',
        startTime: '08:00 PM',
        endTime: '10:30 PM',
        status: 'ACTIVE',
        createdByWarden: 'Dr. S. Mishra (Chief Warden)',
        allowSelfMarking: true,
      });
      setHasMarkedCurrentSession(false);
    }
  };

  // Warden activation code validation
  const activateAccountWithCode = (code: string): boolean => {
    const cleanCode = code.trim().toUpperCase();
    // Valid Warden codes can be VD1234 or any 6-digit code
    if (cleanCode.length === 6) {
      setStudent((prev) => ({
        ...prev,
        isActivated: true,
        activationCode: cleanCode,
      }));
      setFlowState('activation_success');
      return true;
    }
    return false;
  };

  const resetToSplash = () => {
    setFlowState('splash');
    setActiveModal('none');
    setActiveTab('today');
  };

  const toggleNotificationSetting = (key: 'attendance' | 'notices' | 'announcements') => {
    setNotificationSettings((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <AppContext.Provider
      value={{
        flowState,
        setFlowState,
        activeTab,
        setActiveTab,
        student,
        activeSession,
        hasMarkedCurrentSession,
        attendanceRecords,
        notices,
        hostelInfo,
        activeModal,
        openModal,
        closeModal,
        selectedNotice,
        markCurrentAttendance,
        toggleWardenSession,
        activateAccountWithCode,
        resetToSplash,
        appearance,
        setAppearance,
        notificationSettings,
        toggleNotificationSetting,
        isOffline,
        setIsOffline,
        lastSyncedTime,
        isFramedView,
        setIsFramedView,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
