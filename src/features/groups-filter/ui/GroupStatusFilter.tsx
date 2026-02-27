'use client';

import { Globe, Check } from 'lucide-react';
import { ToggleButton } from '@/shared/ui/Toggle';
import { useGroupListFilter } from '../lib/hooks/useGroupListFilter';

export const GroupStatusFilter = () => {
  const { selectedValues, updateFilter } = useGroupListFilter('status');

  return (
    <div className="flex items-center gap-2">
      <ToggleButton
        variant="rect"
        isActive={selectedValues.includes('online')}
        onClick={() => updateFilter('online')}
      >
        <Globe size={14} strokeWidth={2.5} />
        <span>온라인</span>
      </ToggleButton>
      <ToggleButton
        variant="rect"
        isActive={selectedValues.includes('recruiting')}
        onClick={() => updateFilter('recruiting')}
      >
        <Check size={14} strokeWidth={3} />
        <span>모집중</span>
      </ToggleButton>
    </div>
  );
};
