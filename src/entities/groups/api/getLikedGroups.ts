import { apiClient } from '@/shared/api/apiClient';
import { ApiListResponse } from '@/shared/api/types';
import { GroupListItemDTO } from './getGroupList';

/**
 * 내가 좋아요(찜)한 모임 목록을 불러옵니다.
 * GET /groups/liked
 */
export const getLikedGroups = async () => {
  return apiClient.get('groups/liked').json<ApiListResponse<GroupListItemDTO>>();
};
