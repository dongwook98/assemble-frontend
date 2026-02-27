import ky from 'ky';
import { ApiError } from './ApiError';

export const apiClient = ky.create({
  prefixUrl: '/api', // 기본 경로 설정
  timeout: 10000, // 10초 타임아웃
  retry: {
    limit: 2, // 에러 시 최대 2번 재시도
    methods: ['get'], // GET 요청만 재시도
  },
  hooks: {
    beforeRequest: [],
    afterResponse: [
      async (request, options, response) => {
        if (!response.ok) {
          try {
            const errorData = await response.json<any>();
            // 백엔드에서 내려주는 에러 명세를 ApiError로 변환
            throw new ApiError(
              errorData.code || 'UNKNOWN_ERROR',
              errorData.message || '알 수 없는 오류가 발생했습니다.'
            );
          } catch (e) {
            if (e instanceof ApiError) throw e;

            // JSON 파싱 실패 혹은 기타 에러 시 기본 에러 처리
            if (response.status === 401) {
              console.error('인증이 만료되었습니다.');
            }
            // throw e를 하지 않으면 ky의 기본 HTTPError가 던져짐
          }
        }
      },
    ],
  },
});
