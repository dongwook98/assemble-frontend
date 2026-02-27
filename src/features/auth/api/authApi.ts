import { apiClient } from '@/shared/api/apiClient';
import { ApiSuccess } from '@/shared/api/types';
import { SignupFormValues, LoginFormValues } from '../model/authSchema';

export interface SignupResult {
  id: number;
  createdAt: string;
}

export type AuthResponse = ApiSuccess<SignupResult>;

export const authApi = {
  /**
   * 회원가입 API
   * POST /api/members/signup
   */
  signup: async (data: SignupFormValues): Promise<AuthResponse> => {
    // confirmPassword는 API 서버로 보낼 필요가 없으므로 제외
    const { confirmPassword, ...signupData } = data;

    return await apiClient
      .post('members/signup', {
        json: signupData,
      })
      .json<AuthResponse>();
  },

  /**
   * 로그인 API
   * POST /api/members/login
   * (명세가 없으므로 임시 구현)
   */
  login: async (data: LoginFormValues): Promise<AuthResponse> => {
    return await apiClient
      .post('members/login', {
        json: data,
      })
      .json<AuthResponse>();
  },
};
