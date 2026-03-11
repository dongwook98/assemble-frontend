import { useMutation, useQueryClient } from '@tanstack/react-query';
import { joinSchedule } from './joinSchedule';

export const useJoinSchedule = (groupId: string | number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (scheduleId: string | number) => joinSchedule(groupId, scheduleId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['groups', groupId, 'schedules'] });
    },
  });
};
