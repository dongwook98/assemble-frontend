import { useMutation, useQueryClient } from '@tanstack/react-query';
import { cancelSchedule } from './cancelSchedule';

export const useCancelSchedule = (groupId: string | number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (scheduleId: string | number) => cancelSchedule(groupId, scheduleId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['groups', groupId, 'schedules'] });
    },
  });
};
