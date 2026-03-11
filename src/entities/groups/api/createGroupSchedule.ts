import { apiClient } from '@/shared/api/apiClient';
import { ApiSuccess } from '@/shared/api/types';
import { CreateScheduleRequest } from '../model/types';

export interface CreateScheduleResponse {
  scheduleId: number;
}

export const createGroupSchedule = async (
  groupId: string | number,
  data: CreateScheduleRequest
): Promise<ApiSuccess<CreateScheduleResponse>> => {
  return apiClient
    .post(`groups/${groupId}/schedules`, { json: data })
    .json<ApiSuccess<CreateScheduleResponse>>();
};
