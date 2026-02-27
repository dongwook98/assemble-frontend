import { apiClient } from '@/shared/api/apiClient';

export interface RankingItemDTO {
  id: number;
  title: string;
  rankingScore: number;
  rank: number;
  rankChange: string; // '+2', '-1', '0', 'NEW'
  imageUrl?: string;
  category?: string;
}

export const getHallOfFameRanking = async (): Promise<RankingItemDTO[]> => {
  return apiClient.get('groups/ranking/hall-of-fame').json();
};

export const getWeeklyRanking = async (): Promise<RankingItemDTO[]> => {
  return apiClient.get('groups/ranking/weekly').json();
};
