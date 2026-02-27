'use client';

import { useSuspenseQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import { getGroupList } from './getGroupList';
import { Group } from '../model/types';

const CATEGORY_MAP: Record<string, string> = {
  EXERCISE: '운동',
  STUDY: '스터디',
  PROJECT: '프로젝트',
  HOBBY: '취미',
  CULTURE_ART: '문화/예술',
};

const LEVEL_MAP: Record<string, string> = {
  LOW: '입문',
  MID: '경험자',
  HIGH: '전문가',
};

export const useGroupList = () => {
  const searchParams = useSearchParams();
  const params = Object.fromEntries(searchParams.entries());

  return useSuspenseQuery({
    queryKey: ['groups', params],
    queryFn: () => getGroupList(params),
    select: (data): Group[] => {
      return data.list.map((group) => ({
        id: group.clubId,
        title: group.name,
        image: group.imageUrl || '/default-group.png',
        description: group.description, // types.ts에 description이 있으므로 유지 (UI에서는 안씀)
        categoryLabel: CATEGORY_MAP[group.category] || group.category,
        location: group.region,
        levelLabel: LEVEL_MAP[group.level] || group.level,
        participants: {
          current: group.curNumbers,
          max: group.maxNumbers,
          isFull: group.curNumbers >= group.maxNumbers,
        },
        like: {
          count: group.likes,
          isLiked: group.liked,
        },
        isRecruiting: group.status === 'RECRUTING',
      }));
    },
    staleTime: 60 * 1000,
  });
};
