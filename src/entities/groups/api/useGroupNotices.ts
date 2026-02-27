'use client';

import { useSuspenseQuery } from '@tanstack/react-query';
import { getGroupNotices } from './getNotices';

export const useGroupNotices = (groupId: string) => {
  return useSuspenseQuery({
    queryKey: ['groups', groupId, 'notices'],
    queryFn: () => getGroupNotices(groupId),
    select: (data) => data.list,
    staleTime: 5 * 60 * 1000,
  });
};
