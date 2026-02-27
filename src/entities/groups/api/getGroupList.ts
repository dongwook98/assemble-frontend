import { apiClient } from '@/shared/api/apiClient';

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

export const getGroupList = async (params?: Record<string, any>) => {
  // 1. 객체를 URLSearchParams로 변환
  const searchParams = new URLSearchParams();

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value === undefined || value === null) return;

      // 배열인 경우 (예: category=sport&category=study) 처리
      if (Array.isArray(value)) {
        value.forEach((v) => searchParams.append(key, String(v)));
      } else {
        searchParams.set(key, String(value));
      }
    });
  }

  // 2. 변환된 인스턴스를 Ky에 전달
  return apiClient
    .get('groups', { searchParams }) // 타입 에러 해결!
    .json<{ list: GroupListItemDTO[] }>();
};
