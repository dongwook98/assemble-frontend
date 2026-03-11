'use client';

import { useSuspenseQuery } from '@tanstack/react-query';
import { getGroupNotices } from './getNotices';
import { groupKeys } from '../model/group.queries';

export const useGroupNotices = (groupId: string) => {
  return useSuspenseQuery({
    queryKey: groupKeys.notices(groupId),
    queryFn: () => getGroupNotices(groupId),
    select: (data) => data.list,
    staleTime: 5 * 60 * 1000,
  });
};
