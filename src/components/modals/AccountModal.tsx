import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { StatusBar } from '../common/StatusBar';
import { StudentAvatar } from '../illustrations/VedaArt';
import {
  ArrowLeft,
  Lock,
  Edit2,
  Check,
  ShieldCheck,
  GraduationCap,
  Building,
  Phone,
  Droplet,
  Save,
} from 'lucide-react';

export const AccountModal: React.FC = () => {
  const { student, closeModal } = useApp();
  const [phone, setPhone] = useState(student.phone);
  const [guardianPhone, setGuardianPhone] = useState(student.guardianPhone);
  const [bloodGroup, setBloodGroup] = useState(student.bloodGroup);
  const [isEditingContact, setIsEditingContact] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = () => {
    student.phone = phone;
    student.guardianPhone = guardianPhone;
    student.bloodGroup = bloodGroup;
    setIsEditingContact(false);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  const adminFields = [
    { label: 'Student ID', value: student.studentId, mono: true },
    { label: 'Roll Number', value: student.rollNumber, mono: true },
    { label: 'Full Name', value: student.name },
    { label: 'Course', value: student.course },
    { label: 'Branch', value: student.branch },
    { label: 'Year / Semester', value: `${student.year} • ${student.semester}` },
    { label: 'Hostel Name', value: student.hostelName },
    { label: 'Room Number', value: `Room ${student.roomNumber} (Floor ${student.floor})` },
    { label: 'University Email', value: student.email, mono: true },
    { label: 'Guardian Name', value: student.guardianName },
  ];

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
          Account Details
        </h2>
        <div className="w-8" />
      </div>

      <div className="flex-1 px-4 py-4 max-w-md mx-auto w-full space-y-5">
        {/* Profile Card Header */}
        <div className="bg-[#101b36] border border-blue-900/40 rounded-3xl p-5 flex items-center space-x-4 shadow-xl">
          <StudentAvatar size={68} />
          <div>
            <h3 className="text-lg font-bold text-white leading-snug">
              {student.name}
            </h3>
            <p className="text-xs text-blue-400 font-mono font-semibold">
              {student.studentId}
            </p>
            <div className="mt-1 flex items-center space-x-1.5 text-xs text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-2 py-0.5 rounded-full w-fit">
              <ShieldCheck size={12} />
              <span>Hostel Account Active</span>
            </div>
          </div>
        </div>

        {/* Administrative Details (Locked) */}
        <div>
          <div className="flex items-center justify-between px-1 mb-2">
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
              Academic & Hostel Records
            </h4>
            <div className="flex items-center space-x-1 text-[11px] text-slate-400">
              <Lock size={12} />
              <span>Read-only (Warden verified)</span>
            </div>
          </div>

          <div className="bg-[#101b36] border border-slate-800 rounded-2xl divide-y divide-slate-800/70 overflow-hidden">
            {adminFields.map((f, i) => (
              <div key={i} className="px-4 py-3 flex items-center justify-between text-xs">
                <span className="text-slate-400 font-medium">{f.label}</span>
                <span
                  className={`font-semibold text-slate-100 text-right ${
                    f.mono ? 'font-mono' : ''
                  }`}
                >
                  {f.value}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Editable Personal Contact Fields */}
        <div>
          <div className="flex items-center justify-between px-1 mb-2">
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
              Personal Contact Information
            </h4>
            {!isEditingContact && (
              <button
                onClick={() => setIsEditingContact(true)}
                className="text-xs font-semibold text-blue-400 flex items-center space-x-1 hover:text-blue-300 cursor-pointer"
              >
                <Edit2 size={12} />
                <span>Edit</span>
              </button>
            )}
          </div>

          <div className="bg-[#101b36] border border-slate-800 rounded-2xl p-4 space-y-3.5">
            <div>
              <label className="text-[11px] text-slate-400 block mb-1">
                Student Mobile Phone
              </label>
              <input
                disabled={!isEditingContact}
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className={`w-full text-xs font-mono rounded-xl px-3 py-2.5 transition-all outline-none ${
                  isEditingContact
                    ? 'bg-slate-900 border border-blue-500 text-white'
                    : 'bg-slate-900/60 border border-slate-800 text-slate-300'
                }`}
              />
            </div>

            <div>
              <label className="text-[11px] text-slate-400 block mb-1">
                Guardian Emergency Phone
              </label>
              <input
                disabled={!isEditingContact}
                type="text"
                value={guardianPhone}
                onChange={(e) => setGuardianPhone(e.target.value)}
                className={`w-full text-xs font-mono rounded-xl px-3 py-2.5 transition-all outline-none ${
                  isEditingContact
                    ? 'bg-slate-900 border border-blue-500 text-white'
                    : 'bg-slate-900/60 border border-slate-800 text-slate-300'
                }`}
              />
            </div>

            <div>
              <label className="text-[11px] text-slate-400 block mb-1">
                Blood Group
              </label>
              <input
                disabled={!isEditingContact}
                type="text"
                value={bloodGroup}
                onChange={(e) => setBloodGroup(e.target.value)}
                className={`w-full text-xs font-mono rounded-xl px-3 py-2.5 transition-all outline-none ${
                  isEditingContact
                    ? 'bg-slate-900 border border-blue-500 text-white'
                    : 'bg-slate-900/60 border border-slate-800 text-slate-300'
                }`}
              />
            </div>

            {isEditingContact && (
              <div className="pt-2 flex items-center space-x-2">
                <button
                  onClick={() => setIsEditingContact(false)}
                  className="flex-1 py-2.5 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold hover:bg-slate-700"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="flex-1 py-2.5 rounded-xl bg-blue-600 text-white text-xs font-bold hover:bg-blue-500 flex items-center justify-center space-x-1.5 shadow-md shadow-blue-600/30"
                >
                  <Save size={14} />
                  <span>Save Changes</span>
                </button>
              </div>
            )}

            {savedSuccess && (
              <p className="text-xs text-emerald-400 text-center font-medium">
                ✓ Contact details updated successfully
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
