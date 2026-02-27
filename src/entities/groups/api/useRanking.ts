'use client';

import { useSuspenseQuery } from '@tanstack/react-query';
import { getHallOfFameRanking, getWeeklyRanking } from './getRanking';

export const useRanking = (type: 'hall-of-fame' | 'weekly') => {
  return useSuspenseQuery({
    queryKey: ['groups', 'ranking', type],
    queryFn: type === 'hall-of-fame' ? getHallOfFameRanking : getWeeklyRanking,
    staleTime: 5 * 60 * 1000, // 5분 캐시
  });
};
