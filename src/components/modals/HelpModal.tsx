import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { StatusBar } from '../common/StatusBar';
import {
  ArrowLeft,
  PhoneCall,
  Wrench,
  MessageSquare,
  Check,
  Send,
} from 'lucide-react';

export const HelpModal: React.FC = () => {
  const { closeModal, hostelInfo } = useApp();
  const [selectedTopic, setSelectedTopic] = useState<'contact' | 'problem' | 'feedback'>('contact');
  const [problemCategory, setProblemCategory] = useState('Electricity / Fan / Light');
  const [roomNote, setRoomNote] = useState('');
  const [submittedMessage, setSubmittedMessage] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmittedMessage('Report successfully dispatched to Warden Office & Caretaker ticket board.');
    setTimeout(() => {
      setSubmittedMessage(null);
      closeModal();
    }, 2000);
  };

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
          Help & Feedback
        </h2>
        <div className="w-8" />
      </div>

      <div className="flex-1 px-4 py-5 max-w-md mx-auto w-full space-y-4">
        {/* Topic Selector */}
        <div className="grid grid-cols-3 gap-2">
          <button
            onClick={() => setSelectedTopic('contact')}
            className={`p-3 rounded-2xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center space-y-1.5 ${
              selectedTopic === 'contact'
                ? 'bg-blue-600 border-blue-500 text-white'
                : 'bg-[#101b36] border-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            <PhoneCall size={18} />
            <span className="text-xs font-semibold">Contact Warden</span>
          </button>

          <button
            onClick={() => setSelectedTopic('problem')}
            className={`p-3 rounded-2xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center space-y-1.5 ${
              selectedTopic === 'problem'
                ? 'bg-blue-600 border-blue-500 text-white'
                : 'bg-[#101b36] border-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            <Wrench size={18} />
            <span className="text-xs font-semibold">Report Issue</span>
          </button>

          <button
            onClick={() => setSelectedTopic('feedback')}
            className={`p-3 rounded-2xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center space-y-1.5 ${
              selectedTopic === 'feedback'
                ? 'bg-blue-600 border-blue-500 text-white'
                : 'bg-[#101b36] border-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            <MessageSquare size={18} />
            <span className="text-xs font-semibold">Feedback</span>
          </button>
        </div>

        {/* Content based on selection */}
        {selectedTopic === 'contact' && (
          <div className="bg-[#101b36] border border-blue-900/40 rounded-2xl p-5 space-y-4">
            <h3 className="text-sm font-bold text-white">Direct Hostel Office Contacts</h3>
            
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-slate-200">Chief Warden: {hostelInfo.chiefWarden}</p>
                <p className="text-xs text-blue-400 font-mono mt-0.5">{hostelInfo.wardenOfficePhone}</p>
              </div>
              <a
                href={`tel:${hostelInfo.wardenOfficePhone.replace(/\s+/g, '')}`}
                className="px-3 py-1.5 rounded-lg bg-blue-600 text-xs font-semibold text-white"
              >
                Call
              </a>
            </div>

            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-slate-200">Hostel Caretaker: {hostelInfo.caretakerName}</p>
                <p className="text-xs text-blue-400 font-mono mt-0.5">{hostelInfo.caretakerPhone}</p>
              </div>
              <a
                href={`tel:${hostelInfo.caretakerPhone.replace(/\s+/g, '')}`}
                className="px-3 py-1.5 rounded-lg bg-slate-800 text-xs font-semibold text-slate-300"
              >
                Call
              </a>
            </div>
          </div>
        )}

        {(selectedTopic === 'problem' || selectedTopic === 'feedback') && (
          <form onSubmit={handleSubmit} className="bg-[#101b36] border border-blue-900/40 rounded-2xl p-5 space-y-4">
            <h3 className="text-sm font-bold text-white">
              {selectedTopic === 'problem' ? 'Report a Hostel Problem' : 'Send Feedback to Management'}
            </h3>

            {selectedTopic === 'problem' && (
              <div>
                <label className="text-xs text-slate-400 block mb-1.5 font-medium">Issue Category</label>
                <select
                  value={problemCategory}
                  onChange={(e) => setProblemCategory(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-white outline-none focus:border-blue-500"
                >
                  <option>Electricity / Fan / Light</option>
                  <option>Plumbing / Tap / Bathroom</option>
                  <option>Carpenter / Door / Window</option>
                  <option>Water Cooler / Filter</option>
                  <option>Wi-Fi Connectivity</option>
                  <option>Cleanliness / Pest Control</option>
                </select>
              </div>
            )}

            <div>
              <label className="text-xs text-slate-400 block mb-1.5 font-medium">
                {selectedTopic === 'problem' ? 'Describe the issue (Room 214)' : 'Your comments / suggestions'}
              </label>
              <textarea
                required
                rows={4}
                value={roomNote}
                onChange={(e) => setRoomNote(e.target.value)}
                placeholder={selectedTopic === 'problem' ? 'e.g. Ceiling fan bearing noise on speed 4...' : 'e.g. Suggestions for evening tea snacks...'}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-xs text-white placeholder-slate-500 outline-none focus:border-blue-500"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center justify-center space-x-2 shadow-lg shadow-blue-600/30 transition-all cursor-pointer"
            >
              <Send size={15} />
              <span>Submit to Warden Office</span>
            </button>
          </form>
        )}

        {submittedMessage && (
          <div className="p-3 bg-emerald-950/80 border border-emerald-500/40 rounded-xl text-center text-xs text-emerald-300 font-medium">
            ✓ {submittedMessage}
          </div>
        )}
      </div>
    </div>
  );
};
