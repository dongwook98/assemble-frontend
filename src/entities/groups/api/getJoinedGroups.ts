import { apiClient } from '@/shared/api/apiClient';
import { ApiListResponse } from '@/shared/api/types';

export interface JoinedGroupDTO {
  clubId: number;
  name: string;
  imageUrl: string | null;
  description: string;
  category: 'EXERCISE' | 'STUDY' | 'PROJECT' | 'HOBBY' | 'CULTURE_ART';
  level: 'LOW' | 'MID' | 'HIGH';
  region: string;
  status: 'RECRUTING' | 'CLOSED';
  curNumbers: number;
  maxNumbers: number;
  likes: number;
  liked: boolean;
  myRole?: 'LEADING' | 'MEMBER' | 'GUEST';
  unreadChatCount?: number;
  nextSchedule?: {
    title: string;
    date: string;
  } | null;
  lastMessage?: {
    content: string;
    createdAt: string;
  } | null;
}

export const getJoinedGroups = async () => {
  return apiClient.get('groups/joined').json<ApiListResponse<JoinedGroupDTO>>();
};
