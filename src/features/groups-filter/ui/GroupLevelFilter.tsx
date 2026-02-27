'use client';

import { ChartColumnIncreasing } from 'lucide-react';
import { ToggleButton } from '@/shared/ui/Toggle';
import { useGroupListFilter } from '../lib/hooks/useGroupListFilter';

const LEVELS = [
  { label: '입문', value: 'beginner' },
  { label: '중급', value: 'intermediate' },
  { label: '심화', value: 'advanced' },
] as const;

export const GroupLevelFilter = () => {
  const { selectedValues, updateFilter } = useGroupListFilter('level');

  return (
    <div className="flex items-center gap-2">
      {LEVELS.map((level) => (
        <ToggleButton
          key={level.value}
          variant="rect"
          isActive={selectedValues.includes(level.value)}
          onClick={() => updateFilter(level.value)}
          className="gap-2.5" // 아이콘과 텍스트 간격 통일
        >
          <ChartColumnIncreasing size={14} strokeWidth={2.5} />
          <span>{level.label}</span>
        </ToggleButton>
      ))}
    </div>
  );
};
