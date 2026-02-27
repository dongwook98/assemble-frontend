'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from '@/shared/ui/Select';
import { useGroupListFilter } from '../lib/hooks/useGroupListFilter';

// 1. 정렬 옵션 상수화
const SORT_OPTIONS = [
  { value: 'latest', label: '최신순' },
  { value: 'popular', label: '인기순' },
] as const;

export const GroupSortOrder = () => {
  const { selectedValues, updateFilter } = useGroupListFilter('sort');

  // 2. 현재 선택된 값 추출 (기본값: latest)
  const currentSortValue = selectedValues[0] || 'latest';

  // 3. 트리거에 보여줄 한글 라벨 찾기
  const currentLabel = SORT_OPTIONS.find(
    (opt) => opt.value === currentSortValue
  )?.label;

  return (
    <div className="flex items-center justify-end">
      <Select
        value={currentSortValue}
        onChange={(val) => updateFilter(val as 'latest' | 'popular', 'replace')}
      >
        {/* 트리거 디자인을 위해 border-none, shadow-none 등을 적용 가능 */}
        <SelectTrigger
          displayValue={currentLabel}
          placeholder="정렬 선택"
          className="w-[110px] border-none bg-transparent font-bold text-slate-700 shadow-none hover:bg-slate-50"
        />

        <SelectContent>
          {SORT_OPTIONS.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
