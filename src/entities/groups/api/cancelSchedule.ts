import { apiClient } from '@/shared/api/apiClient';
import { ApiSuccess } from '@/shared/api/types';

export const cancelSchedule = async (
  groupId: string | number,
  scheduleId: string | number
): Promise<ApiSuccess<null>> => {
  return apiClient
    .delete(`groups/${groupId}/schedules/${scheduleId}/join`)
    .json<ApiSuccess<null>>();
};
