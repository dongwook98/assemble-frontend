'use client';

import { useRouter, usePathname } from 'next/navigation';
import { RotateCcwIcon } from 'lucide-react';
import { Button } from '@/shared/ui/Button';

export const FilterResetButton = () => {
  const router = useRouter();
  const pathname = usePathname();

  const handleReset = () => {
    // 현재 경로로 이동하되, 쿼리 파라미터를 모두 제거합니다.
    router.push(pathname, { scroll: false });
  };

  return (
    <Button onClick={handleReset} variant="outline" className="group">
      <RotateCcwIcon
        size={14}
        className="transition-transform duration-500 group-hover:rotate-180"
      />
      <span>필터 초기화</span>
    </Button>
  );
};
