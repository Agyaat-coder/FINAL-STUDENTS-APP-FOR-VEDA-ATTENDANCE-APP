import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { StatusBar } from '../common/StatusBar';
import { sampleWeeklyMessMenu } from '../../data/mockData';
import {
  ArrowLeft,
  UtensilsCrossed,
  Clock,
  Sparkles,
  Coffee,
  Sun,
  Sunset,
  Moon,
} from 'lucide-react';

export const MessMenuModal: React.FC = () => {
  const { closeModal } = useApp();
  const [selectedDayIndex, setSelectedDayIndex] = useState(6); // Default Sunday for Gandhi Jayanti / weekend

  const currentMenu = sampleWeeklyMessMenu[selectedDayIndex];

  const mealCards = [
    {
      title: 'Breakfast',
      icon: <Coffee size={17} className="text-amber-400" />,
      time: currentMenu.breakfast.time,
      items: currentMenu.breakfast.items,
    },
    {
      title: 'Lunch',
      icon: <Sun size={17} className="text-yellow-400" />,
      time: currentMenu.lunch.time,
      items: currentMenu.lunch.items,
    },
    {
      title: 'Snacks',
      icon: <Sunset size={17} className="text-orange-400" />,
      time: currentMenu.snacks.time,
      items: currentMenu.snacks.items,
    },
    {
      title: 'Dinner',
      icon: <Moon size={17} className="text-blue-400" />,
      time: currentMenu.dinner.time,
      items: currentMenu.dinner.items,
      special: currentMenu.dinner.specialNote,
    },
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
          Mess Menu
        </h2>
        <div className="w-8" />
      </div>

      {/* Day Selector Ribbon */}
      <div className="px-4 py-3 border-b border-slate-800/80 overflow-x-auto no-scrollbar">
        <div className="flex space-x-2">
          {sampleWeeklyMessMenu.map((m, idx) => {
            const isSelected = selectedDayIndex === idx;
            return (
              <button
                key={m.day}
                onClick={() => setSelectedDayIndex(idx)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                    : 'bg-[#101b36] text-slate-400 hover:text-slate-200 border border-slate-800'
                }`}
              >
                {m.day}
              </button>
            );
          })}
        </div>
      </div>

      {/* Meals List */}
      <div className="flex-1 px-4 py-4 space-y-3.5 max-w-md mx-auto w-full">
        {mealCards.map((meal) => (
          <div
            key={meal.title}
            className="bg-[#101b36] border border-blue-900/40 rounded-2xl p-4 shadow-lg shadow-blue-950/20"
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-800/80">
              <div className="flex items-center space-x-2.5">
                <div className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center">
                  {meal.icon}
                </div>
                <h3 className="text-sm font-bold text-white">{meal.title}</h3>
              </div>
              <div className="flex items-center space-x-1 text-xs text-slate-400 font-mono">
                <Clock size={12} />
                <span>{meal.time}</span>
              </div>
            </div>

            {meal.special && (
              <div className="mt-2.5 px-3 py-1.5 rounded-lg bg-amber-950/60 border border-amber-500/30 flex items-center space-x-2 text-xs text-amber-300">
                <Sparkles size={14} className="text-amber-400 shrink-0" />
                <span className="font-semibold">{meal.special}</span>
              </div>
            )}

            <div className="mt-3 flex flex-wrap gap-1.5">
              {meal.items.map((item, i) => (
                <span
                  key={i}
                  className="text-xs bg-slate-900/90 text-slate-300 border border-slate-800 px-2.5 py-1 rounded-lg"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Read-Only Mess Note */}
      <div className="p-4 text-center border-t border-slate-800/80">
        <p className="text-[11px] text-slate-400">
          Weekly mess schedule managed by Hostel Mess Committee & Warden Office.
        </p>
      </div>
    </div>
  );
};
