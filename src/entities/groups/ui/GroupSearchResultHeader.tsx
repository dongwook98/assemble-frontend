'use client';

import { useSearchParams } from 'next/navigation';

export const GroupSearchResultHeader = () => {
  const searchParams = useSearchParams();

  // 1. 쿼리 파라미터 추출
  const searchQuery = searchParams.get('search'); // 검색어
  const category = searchParams.get('category'); // 카테고리 필터

  // 2. 타이틀 결정 로직
  // 검색어가 있으면 검색어를 우선 노출, 없으면 카테고리, 둘 다 없으면 '전체'
  const getDisplayTitle = () => {
    if (searchQuery) return `"${searchQuery}" 검색 결과`;
    if (category && category !== 'all') return `#${category}`;
    return '모든 모임';
  };

  return (
    <div className="flex flex-col items-start justify-between gap-6 px-2 sm:flex-row sm:items-center">
      <div className="space-y-2">
        {/* 메인 타이틀 */}
        <h2 className="text-3xl leading-[1.1] font-black tracking-tight text-gray-900 md:text-5xl">
          <span className="flex flex-wrap items-center gap-x-3">
            <span className="text-brand-500">{getDisplayTitle()}</span>
            <span className="text-gray-900">탐색</span>
          </span>
        </h2>

        <div className="flex items-center gap-3">
          <span className="text-[10px] font-black tracking-widest text-gray-400 uppercase">
            {/* totalCount는 Props로 받거나 전역 상태에서 가져오는 것이 좋습니다 */}
            LISTING GROUPS
          </span>
          <div className="h-1 w-1 rounded-full bg-gray-300" />
          <span className="text-brand-500 text-[10px] font-black tracking-widest uppercase">
            지역 전체
          </span>
          {searchQuery && (
            <>
              <div className="h-1 w-1 rounded-full bg-gray-300" />
              <button
                onClick={() => (window.location.href = '/groups')} // 검색 초기화 예시
                className="text-[10px] font-black text-gray-400 uppercase underline underline-offset-2 transition-colors hover:text-red-500"
              >
                검색 초기화
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
