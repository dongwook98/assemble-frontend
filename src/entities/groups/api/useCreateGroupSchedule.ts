import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createGroupSchedule } from './createGroupSchedule';
import { CreateScheduleRequest } from '../model/types';

export const useCreateGroupSchedule = (groupId: string | number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateScheduleRequest) => createGroupSchedule(groupId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['groups', groupId, 'schedules'] });
    },
  });
};
