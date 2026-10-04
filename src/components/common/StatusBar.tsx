import React from 'react';
import { Wifi, Battery } from 'lucide-react';

interface StatusBarProps {
  lightMode?: boolean;
}

export const StatusBar: React.FC<StatusBarProps> = ({ lightMode = false }) => {
  return (
    <div
      className={`w-full px-7 pt-3 pb-1 flex items-center justify-between text-xs select-none ${
        lightMode ? 'text-slate-900' : 'text-slate-100'
      }`}
    >
      <span className="font-semibold text-xs tracking-tight">9:41</span>
      <div className="flex items-center space-x-2">
        {/* Signal bars */}
        <div className="flex items-end space-x-0.5 h-3">
          <span className={`w-0.5 h-1 rounded-xs ${lightMode ? 'bg-slate-900' : 'bg-slate-100'}`} />
          <span className={`w-0.5 h-1.5 rounded-xs ${lightMode ? 'bg-slate-900' : 'bg-slate-100'}`} />
          <span className={`w-0.5 h-2 rounded-xs ${lightMode ? 'bg-slate-900' : 'bg-slate-100'}`} />
          <span className={`w-0.5 h-2.5 rounded-xs ${lightMode ? 'bg-slate-900' : 'bg-slate-100'}`} />
        </div>
        <Wifi size={13} className="stroke-[2.5]" />
        <Battery size={15} className="stroke-[2.5]" />
      </div>
    </div>
  );
};
