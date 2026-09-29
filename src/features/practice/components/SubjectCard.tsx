import React from 'react';
import { ChevronRight, Lock } from 'lucide-react';

interface SubjectCardProps {
  id: string;
  title: string;
  topicsCount: number;
  isLocked?: boolean;
  onTap: () => void;
  onLockedTap?: () => void;
}

const getSubjectIconUrl = (title: string) => {
  const t = title.toLowerCase();
  if (t.includes('aptitude')) return 'https://api.iconify.design/material-symbols:assignment-ind-rounded.svg?color=white';
  if (t.includes('biology')) return 'https://api.iconify.design/material-symbols:insights-rounded.svg?color=white';
  if (t.includes('chemistry')) return 'https://api.iconify.design/material-symbols:science-rounded.svg?color=white';
  if (t.includes('math')) return 'https://api.iconify.design/material-symbols:calculate-rounded.svg?color=white';
  if (t.includes('english')) return 'https://api.iconify.design/material-symbols:menu-book-rounded.svg?color=white';
  if (t.includes('physics')) return 'https://api.iconify.design/material-symbols:biotech-rounded.svg?color=white';
  if (t.includes('civics')) return 'https://api.iconify.design/material-symbols:account-balance-rounded.svg?color=white';
  if (t.includes('geography')) return 'https://api.iconify.design/material-symbols:public-rounded.svg?color=white';
  if (t.includes('history')) return 'https://api.iconify.design/material-symbols:auto-stories-rounded.svg?color=white';
  return 'https://api.iconify.design/material-symbols:menu-book-rounded.svg?color=white';
};

export function SubjectCard({ id, title, topicsCount, isLocked = false, onTap, onLockedTap }: SubjectCardProps) {
  const iconUrl = getSubjectIconUrl(title);
  const topicText = `${topicsCount} ${topicsCount === 1 ? 'Topic' : 'Topics'}`;

  return (
    <button
      onClick={isLocked ? onLockedTap : onTap}
      className="w-full mb-3 bg-white rounded-[20px] border-[1.2px] border-[#D7DEE8] shadow-[0_8px_16px_rgba(0,0,0,0.045)] text-left flex items-center p-3.5 transition-all active:scale-[0.98]"
    >
      <div className="w-[52px] h-[52px] bg-[#0D367A] rounded-[14px] flex items-center justify-center shrink-0">
        <img src={iconUrl} alt={title} className="w-[26px] h-[26px]" />
      </div>
      <div className="ml-3.5 flex-1 overflow-hidden">
        <h3 className="text-[16px] font-bold text-[#0F172A] truncate">{title}</h3>
        <p className="text-[12px] text-[#64748B] mt-1">{topicText}</p>
      </div>
      <div className="ml-2.5 shrink-0">
        {isLocked ? (
          <Lock size={20} color="#94A3B8" />
        ) : (
          <ChevronRight size={26} color="#E2E8F0" />
        )}
      </div>
    </button>
  );
}
