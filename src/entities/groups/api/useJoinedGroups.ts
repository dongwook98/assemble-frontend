'use client';

import { useSuspenseQuery } from '@tanstack/react-query';
import { getJoinedGroups } from './getJoinedGroups';
import { JoinedGroup } from '../model/types';

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

export const useJoinedGroups = () => {
  return useSuspenseQuery({
    queryKey: ['groups', 'joined'],
    queryFn: getJoinedGroups,
    select: (data): JoinedGroup[] => {
      return data.list.map((group) => ({
        id: group.clubId,
        title: group.name,
        image: group.imageUrl || '/default-group.png',
        description: group.description,
        categoryLabel: CATEGORY_MAP[group.category] || group.category,
        location: group.region,
        levelLabel: LEVEL_MAP[group.level] || group.level,
        myRole: group.myRole || 'MEMBER',
        unreadChatCount: group.unreadChatCount || 0,
        nextSchedule: group.nextSchedule || null,
        lastMessage: group.lastMessage || null,
      }));
    },
    staleTime: 60 * 1000,
  });
};
