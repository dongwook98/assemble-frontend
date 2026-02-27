'use client';

import { cn } from '@/shared/lib/utils';
import { Award, TrendingUp } from 'lucide-react';

interface RankingTabSwitchProps {
  activeTab: 'hall-of-fame' | 'weekly';
  onTabChange: (tab: 'hall-of-fame' | 'weekly') => void;
}

export const RankingTabSwitch = ({
  activeTab,
  onTabChange,
}: RankingTabSwitchProps) => {
  return (
    <div className="mx-auto flex w-fit items-center gap-1 rounded-[1.5rem] bg-slate-100 p-1 md:gap-2">
      <button
        onClick={() => onTabChange('hall-of-fame')}
        className={cn(
          'flex items-center gap-2 rounded-[1.25rem] px-4 py-2 text-sm font-black transition-all md:px-6 md:py-3 md:text-base',
          activeTab === 'hall-of-fame'
            ? 'text-brand-600 bg-white shadow-sm'
            : 'text-slate-400 hover:text-slate-600'
        )}
      >
        <Award size={activeTab === 'hall-of-fame' ? 20 : 18} />
        명예의 전당
      </button>
      <button
        onClick={() => onTabChange('weekly')}
        className={cn(
          'flex items-center gap-2 rounded-[1.25rem] px-4 py-2 text-sm font-black transition-all md:px-6 md:py-3 md:text-base',
          activeTab === 'weekly'
            ? 'text-brand-600 bg-white shadow-sm'
            : 'text-slate-400 hover:text-slate-600'
        )}
      >
        <TrendingUp size={activeTab === 'weekly' ? 20 : 18} />
        주간 랭킹
      </button>
    </div>
  );
};
