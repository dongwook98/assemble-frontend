'use client';

import { useSuspenseQuery } from '@tanstack/react-query';
import { getJoinedGroups } from './getJoinedGroups';
import { JoinedGroup } from '../model/types';
import { groupKeys } from '../model/group.queries';
import { CATEGORY_MAP, LEVEL_MAP, STATUS_MAP } from '../lib/constants';

export const useJoinedGroups = () => {
  return useSuspenseQuery({
    queryKey: groupKeys.joined(),
    queryFn: getJoinedGroups,
    select: (data): JoinedGroup[] => {
      const mappedGroups = data.list.map((group) => ({
        id: group.clubId,
        title: group.name,
        image: group.imageUrl || '/default-group.png',
        description: group.description,
        categoryLabel: CATEGORY_MAP[group.category] || group.category,
        location: group.region,
        levelLabel: LEVEL_MAP[group.level] || group.level,
        statusLabel: STATUS_MAP[group.status] || group.status,
        myRole: group.myRole || 'MEMBER',
        unreadChatCount: group.unreadChatCount || 0,
        participants: {
          current: group.curNumbers,
          max: group.maxNumbers,
          isFull: group.curNumbers >= group.maxNumbers,
        },
        like: {
          count: group.likes,
          isLiked: group.liked,
        },
        nextSchedule: group.nextSchedule || null,
        lastMessage: group.lastMessage || null,
      }));

      // 정렬 로직: 다음 모임 일정이 가까운 순 (최신순)
      return mappedGroups.sort((a, b) => {
        // 둘 다 일정이 있는 경우: 날짜순 오름차순
        if (a.nextSchedule && b.nextSchedule) {
          return (
            new Date(a.nextSchedule.date).getTime() -
            new Date(b.nextSchedule.date).getTime()
          );
        }
        // a만 일정이 있는 경우: a가 앞으로
        if (a.nextSchedule) return -1;
        // b만 일정이 있는 경우: b가 앞으로
        if (b.nextSchedule) return 1;
        // 둘 다 일정이 없는 경우: 순서 유지
        return 0;
      });
    },
    staleTime: 60 * 1000,
  });
};
