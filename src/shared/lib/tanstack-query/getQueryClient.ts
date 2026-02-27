import {
  QueryClient,
  defaultShouldDehydrateQuery,
} from '@tanstack/react-query';

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        // SSR에서는 클라이언트에서 즉시 refetch되는 것을 막기 위해
        // staleTime을 0보다 크게 설정하는 것이 중요합니다.
        staleTime: 60 * 1000,
      },
      dehydrate: {
        // 모든 쿼리를 기본적으로 dehydrate 하도록 설정
        shouldDehydrateQuery: (query) =>
          defaultShouldDehydrateQuery(query) ||
          query.state.status === 'pending',
      },
    },
  });
}

let browserQueryClient: QueryClient | undefined = undefined;

export function getQueryClient() {
  if (typeof window === 'undefined') {
    // 서버 환경: 항상 새로운 QueryClient를 생성합니다.
    return makeQueryClient();
  } else {
    // 브라우저 환경: 싱글톤 패턴으로 기존 클라이언트를 재사용합니다.
    if (!browserQueryClient) browserQueryClient = makeQueryClient();
    return browserQueryClient;
  }
}
