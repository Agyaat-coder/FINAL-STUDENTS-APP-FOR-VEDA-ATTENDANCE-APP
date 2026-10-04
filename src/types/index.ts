export type NavigationTab = 'today' | 'activity' | 'hostel' | 'me';

export type AppFlowState = 
  | 'splash'
  | 'welcome'
  | 'activation'
  | 'activation_success'
  | 'main';

export interface Student {
  id: string;
  studentId: string;
  name: string;
  rollNumber: string;
  course: string;
  branch: string;
  year: string;
  semester: string;
  hostelName: string;
  hostelCode: string;
  roomNumber: string;
  floor: number;
  avatarUrl?: string;
  email: string;
  phone: string;
  guardianName: string;
  guardianPhone: string;
  bloodGroup: string;
  activationCode: string;
  isActivated: boolean;
}

export type AttendanceSessionStatus = 'ACTIVE' | 'CLOSED' | 'SCHEDULED';
export type AttendanceRecordStatus = 'Present' | 'Missed' | 'Pending';

export interface AttendanceSession {
  id: string;
  title: string; // e.g. "Night Attendance", "Morning Attendance", "Evening Attendance"
  hostelName: string;
  date: string; // e.g. "2 Oct 2026"
  dateIso: string;
  startTime: string; // "08:00 PM"
  endTime: string; // "10:30 PM"
  status: AttendanceSessionStatus;
  createdByWarden: string;
  allowSelfMarking: boolean;
}

export interface AttendanceRecord {
  id: string;
  sessionId: string;
  sessionTitle: string;
  date: string;
  time: string;
  status: AttendanceRecordStatus;
  markedAt?: string;
  verificationMethod: 'Self-App' | 'Biometric' | 'Manual-Warden';
}

export interface HostelNotice {
  id: string;
  title: string;
  category: 'General' | 'Maintenance' | 'Mess' | 'Urgent' | 'Holiday';
  date: string;
  time: string;
  description: string;
  issuedBy: string;
  isUnread?: boolean;
  important?: boolean;
}

export interface MessDayMenu {
  day: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';
  breakfast: { time: string; items: string[] };
  lunch: { time: string; items: string[] };
  snacks: { time: string; items: string[] };
  dinner: { time: string; items: string[]; specialNote?: string };
}

export interface HostelInfo {
  name: string;
  campus: string;
  location: string;
  totalFloors: number;
  totalRooms: number;
  chiefWarden: string;
  wardenOfficePhone: string;
  caretakerName: string;
  caretakerPhone: string;
  emergencyAmbulance: string;
  securityGatePhone: string;
  gateClosingTime: string;
  wifiSsid: string;
}
