import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { HostelIllustration } from '../illustrations/VedaArt';
import {
  MapPin,
  Phone,
  User,
  Layers,
  DoorClosed,
  PhoneCall,
  Shield,
  Clock,
  Wifi,
  Copy,
  Check,
} from 'lucide-react';

export const HostelScreen: React.FC = () => {
  const { student, hostelInfo, notices, openModal } = useApp();
  const [activeSegment, setActiveSegment] = useState<'overview' | 'notices'>('overview');
  const [copiedNumber, setCopiedNumber] = useState<string | null>(null);

  const copyToClipboard = (text: string) => {
    navigator.clipboard?.writeText(text);
    setCopiedNumber(text);
    setTimeout(() => setCopiedNumber(null), 1800);
  };

  return (
    <div className="flex-1 pb-6 px-4 select-none">
      {/* Top Page Title */}
      <div className="pt-2 pb-3">
        <h1 className="text-2xl font-bold tracking-tight text-white">
          Hostel
        </h1>
      </div>

      {/* Segmented Control: Overview / Notices - Screen 10 */}
      <div className="bg-[#101b36] p-1 rounded-2xl flex items-center mb-5 border border-slate-800">
        <button
          onClick={() => setActiveSegment('overview')}
          className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
            activeSegment === 'overview'
              ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          Overview
        </button>
        <button
          onClick={() => setActiveSegment('notices')}
          className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
            activeSegment === 'notices'
              ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          Notices
        </button>
      </div>

      {activeSegment === 'overview' ? (
        <div className="space-y-5">
          {/* Hostel Photo / Architectural Card - Screen 10 */}
          <div className="bg-[#101b36] border border-blue-900/40 rounded-3xl overflow-hidden shadow-xl shadow-blue-950/40">
            {/* Visual illustration of Charak Chatras */}
            <div className="relative">
              <HostelIllustration className="rounded-none max-h-44 object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#101b36] via-transparent to-transparent" />
            </div>

            <div className="p-5 pt-1">
              <h2 className="text-xl font-bold text-white">
                {hostelInfo.name}
              </h2>
              <p className="text-xs text-slate-400 flex items-center space-x-1.5 mt-1">
                <MapPin size={13} className="text-rose-400 shrink-0" />
                <span>{hostelInfo.location}</span>
              </p>

              {/* Student Room, Floor, Warden Specs Grid - Screen 10 */}
              <div className="mt-4 pt-4 border-t border-slate-800/80 space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400 flex items-center space-x-2">
                    <DoorClosed size={15} className="text-blue-400" />
                    <span>Room</span>
                  </span>
                  <span className="font-bold text-white font-mono text-sm">
                    {student.roomNumber}
                  </span>
                </div>

                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400 flex items-center space-x-2">
                    <Layers size={15} className="text-blue-400" />
                    <span>Floor</span>
                  </span>
                  <span className="font-bold text-white font-mono text-sm">
                    {student.floor}
                  </span>
                </div>

                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400 flex items-center space-x-2">
                    <User size={15} className="text-blue-400" />
                    <span>Warden</span>
                  </span>
                  <span className="font-bold text-white">
                    {hostelInfo.chiefWarden}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Important Contacts Section - Screen 10 */}
          <div>
            <h3 className="text-sm font-bold text-white mb-2.5 px-1">
              Important Contacts
            </h3>

            <div className="space-y-2.5">
              {/* Warden Office Contact Card with Direct Call Button */}
              <div className="bg-[#101b36] border border-blue-900/50 rounded-2xl p-4 flex items-center justify-between shadow-md">
                <div className="flex items-center space-x-3.5">
                  <div className="w-10 h-10 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
                    <Phone size={18} />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">
                      Warden Office
                    </h4>
                    <p className="text-xs text-slate-300 font-mono mt-0.5">
                      {hostelInfo.wardenOfficePhone}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => copyToClipboard(hostelInfo.wardenOfficePhone)}
                    title="Copy Phone"
                    className="p-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 active:scale-95 transition-all cursor-pointer"
                  >
                    {copiedNumber === hostelInfo.wardenOfficePhone ? (
                      <Check size={16} className="text-emerald-400" />
                    ) : (
                      <Copy size={16} />
                    )}
                  </button>
                  <a
                    href={`tel:${hostelInfo.wardenOfficePhone.replace(/\s+/g, '')}`}
                    className="p-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white shadow-md shadow-blue-600/30 active:scale-95 transition-all flex items-center justify-center cursor-pointer"
                  >
                    <PhoneCall size={16} />
                  </a>
                </div>
              </div>

              {/* Caretaker Contact */}
              <div className="bg-[#101b36] border border-slate-800/80 rounded-2xl p-3.5 flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-slate-200">
                    Hostel Caretaker ({hostelInfo.caretakerName})
                  </h4>
                  <p className="text-[11px] text-slate-400 font-mono mt-0.5">
                    {hostelInfo.caretakerPhone}
                  </p>
                </div>
                <a
                  href={`tel:${hostelInfo.caretakerPhone.replace(/\s+/g, '')}`}
                  className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-blue-400 transition-all cursor-pointer"
                >
                  <Phone size={15} />
                </a>
              </div>

              {/* Campus Emergency / Ambulance */}
              <div className="bg-[#101b36] border border-slate-800/80 rounded-2xl p-3.5 flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-rose-300 flex items-center space-x-1.5">
                    <Shield size={13} className="text-rose-400" />
                    <span>Campus Emergency / Ambulance</span>
                  </h4>
                  <p className="text-[11px] text-slate-400 font-mono mt-0.5">
                    {hostelInfo.emergencyAmbulance}
                  </p>
                </div>
                <a
                  href={`tel:108`}
                  className="p-2 rounded-xl bg-rose-950/60 border border-rose-500/30 text-rose-400 hover:bg-rose-900/50 transition-all cursor-pointer"
                >
                  <PhoneCall size={15} />
                </a>
              </div>
            </div>
          </div>

          {/* Hostel Rules & Hours Read-Only note */}
          <div className="bg-[#0b1429] border border-slate-800/80 rounded-2xl p-4 space-y-2 text-xs text-slate-400">
            <div className="flex items-center space-x-2 text-slate-300">
              <Clock size={14} className="text-blue-400" />
              <span>Gate Closing Time: <strong className="text-white">{hostelInfo.gateClosingTime}</strong></span>
            </div>
            <div className="flex items-center space-x-2 text-slate-300">
              <Wifi size={14} className="text-blue-400" />
              <span>Hostel Wi-Fi: <strong className="text-white font-mono">{hostelInfo.wifiSsid}</strong></span>
            </div>
            <p className="text-[11px] text-slate-400 pt-1 border-t border-slate-800/60">
              ℹ Hostel information is managed and verified by the Warden Office.
            </p>
          </div>
        </div>
      ) : (
        /* Notices Tab under Hostel */
        <div className="space-y-3">
          {notices.map((notice) => (
            <button
              key={notice.id}
              onClick={() => openModal('notice_detail', notice)}
              className="w-full text-left bg-[#101b36] hover:bg-[#142244] border border-slate-800 rounded-2xl p-4 transition-all active:scale-[0.99] cursor-pointer"
            >
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="text-[10px] font-bold px-2 py-0.5 bg-blue-950 text-blue-400 border border-blue-500/30 rounded-full uppercase">
                  {notice.category}
                </span>
                <span className="text-[11px] text-slate-400 font-mono">{notice.date}</span>
              </div>
              <h4 className="text-sm font-bold text-white">{notice.title}</h4>
              <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                {notice.description}
              </p>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
