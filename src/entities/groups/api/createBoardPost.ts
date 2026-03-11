import { apiClient } from '@/shared/api/apiClient';
import { ApiSuccess } from '@/shared/api/types';
import { CreatePostRequest } from '../model/types';

export interface CreatePostResponse {
  postId: number;
}

export const createBoardPost = async (
  groupId: string | number,
  data: CreatePostRequest
): Promise<ApiSuccess<CreatePostResponse>> => {
  return apiClient
    .post(`groups/${groupId}/posts`, { json: data })
    .json<ApiSuccess<CreatePostResponse>>();
};
