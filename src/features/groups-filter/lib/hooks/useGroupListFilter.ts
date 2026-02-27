'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import {
  GroupFilterKey,
  GroupFilterValues,
} from '@/features/groups-filter/model/types';

/**
 * @template K - GroupFilterKey 중 하나 ('category' | 'status' | 'level' | 'sort')
 */
export const useGroupListFilter = <K extends GroupFilterKey>(key: K) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // 해당 키에 허용된 타입으로 강제 캐스팅
  const selectedValues = searchParams.getAll(key) as GroupFilterValues[K][];

  /**
   * @param value - 변경할 값
   * @param mode - 'toggle' (다중 선택/해제), 'replace' (단일 선택/교체)
   */
  const updateFilter = (
    value: GroupFilterValues[K],
    mode: 'toggle' | 'replace' = 'toggle'
  ) => {
    const params = new URLSearchParams(searchParams.toString());

    if (mode === 'replace') {
      // 단일 선택: 기존 값을 모두 지우고 새로운 값 하나만 세팅
      params.delete(key);
      params.set(key, value);
    } else {
      // 다중 선택: 기존 toggle 로직 유지
      const currentSet = new Set(selectedValues);
      if (currentSet.has(value)) {
        currentSet.delete(value);
      } else {
        currentSet.add(value);
      }
      params.delete(key);
      currentSet.forEach((v) => params.append(key, v));
    }

    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return { selectedValues, updateFilter };
};
