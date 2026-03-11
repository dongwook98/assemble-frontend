import { apiClient } from '@/shared/api/apiClient';
import { ApiSuccess } from '@/shared/api/types';

export interface GroupScheduleDTO {
  scheduleId: number;
  title: string;
  content: string;
  date: string;
  time: string;
  location: string;
  maxParticipants: number;
  curParticipants: number;
  isJoined: boolean;
}

export const getGroupSchedules = async (
  groupId: string | number
): Promise<ApiSuccess<GroupScheduleDTO[]>> => {
  return apiClient
    .get(`groups/${groupId}/schedules`)
    .json<ApiSuccess<GroupScheduleDTO[]>>();
};
