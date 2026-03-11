import { apiClient } from '@/shared/api/apiClient';
import { ApiListResponse } from '@/shared/api/types';

/**
 * [DTO] 모임 목록 아이템 규격 (백엔드 명세)
 */
export interface GroupListItemDTO {
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
}

export const getGroupList = async (
  params?: Record<string, string | number | boolean | string[] | undefined>
) => {
  const searchParams = new URLSearchParams();

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value === undefined || value === null) return;
      if (Array.isArray(value)) {
        value.forEach((v) => searchParams.append(key, String(v)));
      } else {
        searchParams.set(key, String(value));
      }
    });
  }

  // 표준 ApiResponse 규격 적용 (apiClient에서 result 자동 추출)
  return apiClient
    .get('groups', { searchParams })
    .json<ApiListResponse<GroupListItemDTO>>();
};
