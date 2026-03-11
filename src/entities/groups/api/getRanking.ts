import { apiClient } from '@/shared/api/apiClient';
import { ApiListResponse } from '@/shared/api/types';

export interface RankingItemDTO {
  id: number;
  title: string;
  rankingScore: number;
  rank: number;
  rankChange: string; // '+2', '-1', '0', 'NEW'
  imageUrl?: string;
  category?: string;
}

export const getHallOfFameRanking = async (): Promise<ApiListResponse<RankingItemDTO>> => {
  return apiClient.get('groups/ranking/hall-of-fame').json<ApiListResponse<RankingItemDTO>>();
};

export const getWeeklyRanking = async (): Promise<ApiListResponse<RankingItemDTO>> => {
  return apiClient.get('groups/ranking/weekly').json<ApiListResponse<RankingItemDTO>>();
};
