import ky, { type BeforeErrorHook, type BeforeRequestHook } from 'ky';
import { useAuthStore } from '@/shared/model/auth/store';

const beforeRequest: BeforeRequestHook = async (request) => {
  // Zustand 메모리에서 access_token 꺼내서 헤더 주입
  const token = useAuthStore.getState().accessToken;
  if (token) {
    request.headers.set('Authorization', `Bearer ${token}`);
  }
};

const afterResponseRetry = async (
  request: Request,
  _options: unknown,
  response: Response
) => {
  if (response.status !== 401) return response;

  // access_token 만료 -> /api/auth/refresh 로 재발급 (Next.js Route Handler 호출)
  try {
    const result = await ky
      .post('/api/auth/refresh')
      .json<{ accessToken: string }>();

    if (result.accessToken) {
      // 새 토큰 저장 후 원래 요청 재시도
      useAuthStore.getState().setToken(result.accessToken);
      request.headers.set('Authorization', `Bearer ${result.accessToken}`);
      return ky(request);
    }
  } catch (error) {
    // refresh_token도 만료 -> 로그인 페이지로 리다이렉트
    useAuthStore.getState().clearToken();
    if (typeof window !== 'undefined') {
      window.location.href = '/login';
    }
  }

  return response;
};

const beforeError: BeforeErrorHook = async (error) => {
  const body = (await error.response
    .json()
    .catch(() => ({}))) as { message?: string };
  (error as Error).message =
    body.message ?? '알 수 없는 오류가 발생했습니다.';
  return error;
};

export const apiClient = ky.create({
  prefixUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api',
  credentials: 'include', // refresh_token 쿠키를 함께 전송
  hooks: {
    beforeRequest: [beforeRequest],
    afterResponse: [afterResponseRetry],
    beforeError: [beforeError],
  },
});
