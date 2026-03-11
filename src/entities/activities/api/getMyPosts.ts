import { apiClient } from '@/shared/api/apiClient';
import { ApiListResponse } from '@/shared/api/types';

export interface MyPostDTO {
  postId: number;
  clubId: number;
  clubName: string;
  title: string;
  content: string;
  imageUrl: string | null;
  commentCount: number;
  likeCount: number;
  createdAt: string;
}

/**
 * 내가 작성한 게시글 목록을 불러옵니다.
 * GET /users/me/posts
 */
export const getMyPosts = async () => {
  return apiClient.get('users/me/posts').json<ApiListResponse<MyPostDTO>>();
};
