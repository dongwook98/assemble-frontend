'use client';

import {
  useMutation,
  useSuspenseQuery,
  useQueryClient,
} from '@tanstack/react-query';
import {
  getNotificationSettings,
  updateNotificationSettings,
} from './notifications';
import { NotificationSettings } from '../model/types';
import { userKeys } from '../model/user.queries';

export const useNotificationSettings = () => {
  return useSuspenseQuery({
    queryKey: userKeys.notifications(),
    queryFn: getNotificationSettings,
    staleTime: 5 * 60 * 1000,
  });
};

export const useUpdateNotificationSettings = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Partial<NotificationSettings>) =>
      updateNotificationSettings(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: userKeys.notifications(),
      });
    },
  });
};
