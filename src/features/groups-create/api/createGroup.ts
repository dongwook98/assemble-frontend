import { HTTPError } from 'ky';
import { CreateGroupFormValues } from '../model/schema';
import { ApiErrorResponse, ApiSuccess } from '@/shared/api/types';
import { apiClient } from '@/shared/api/apiClient';
import { ApiError } from '@/shared/api/ApiError';

interface CreateClubResult {
  clubId: number;
  createdAt: string;
}

type CreateClubErrorCode = 'MEMBER4006' | 'CLUB4001' | 'CLUB4002';

export const createGroup = async (
  data: CreateGroupFormValues
): Promise<ApiSuccess<CreateClubResult>> => {
  try {
    return await apiClient
      .post('clubs', { json: data })
      .json<ApiSuccess<CreateClubResult>>();
  } catch (error) {
    if (error instanceof HTTPError) {
      const errorBody =
        await error.response.json<ApiErrorResponse<CreateClubErrorCode>>();
      throw new ApiError(errorBody.code, errorBody.message);
    }
    throw error;
  }
};
