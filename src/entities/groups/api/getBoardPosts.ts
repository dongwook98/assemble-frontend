import { apiClient } from '@/shared/api/apiClient';
import { ApiSuccess } from '@/shared/api/types';
import { GroupPost } from '../model/types';

export interface BoardPostDTO {
  postId: number;
  title: string;
  content: string;
  authorNickname: string;
  authorProfileImageUrl: string | null;
  createdAt: string;
  commentCount: number;
  likeCount: number;
}

export const getBoardPosts = async (
  groupId: string | number
): Promise<ApiSuccess<BoardPostDTO[]>> => {
  return apiClient.get(`groups/${groupId}/posts`).json<ApiSuccess<BoardPostDTO[]>>();
};
