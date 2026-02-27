'use client';

import { ToggleButton } from '@/shared/ui/Toggle';
import { useGroupListFilter } from '../lib/hooks/useGroupListFilter';

const CATEGORIES = [
  { label: '전체', value: 'all' }, // '전체'가 필요한 경우 추가, 아니면 제거 가능
  { label: '스터디', value: 'study' },
  { label: '운동', value: 'exercise' },
  { label: '프로젝트', value: 'project' },
  { label: '취미', value: 'hobby' },
  { label: '문화/예술', value: 'culture_art' },
] as const;

export const GroupCategoryFilter = () => {
  const { selectedValues, updateFilter } = useGroupListFilter('category');

  return (
    <div className="no-scrollbar flex items-center gap-6 overflow-x-auto border-b border-slate-100">
      {CATEGORIES.map((cat) => (
        <ToggleButton
          key={cat.value}
          variant="tab" // 탭 스타일 적용
          isActive={
            selectedValues.includes(cat.value) ||
            (cat.value === 'all' && selectedValues.length === 0)
          }
          onClick={() => updateFilter(cat.value, 'replace')}
        >
          {cat.label}
        </ToggleButton>
      ))}
    </div>
  );
};
