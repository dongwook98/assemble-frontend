import { apiClient } from '@/shared/api/apiClient';

export interface NoticeDTO {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  isFixed: boolean;
  authorName: string;
}

export const getGroupNotices = async (groupId: string) => {
  return apiClient
    .get(`groups/${groupId}/notices`)
    .json<{ list: NoticeDTO[] }>();
};
