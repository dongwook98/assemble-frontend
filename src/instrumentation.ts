export async function register() {
  // 서버 사이드(Node.js) 런타임인지 확인
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    // 개발 환경이거나 명시적으로 모킹이 활성화된 경우
    if (
      process.env.NODE_ENV === 'development' ||
      process.env.NEXT_PUBLIC_API_MOCKING === 'enabled'
    ) {
      const { initMsw } = await import('@/shared/lib/msw/init');
      const { allHandlers } = await import('@/shared/api/mock/handlers');

      await initMsw(allHandlers);

      console.log('🚀 [Instrumentation] Server-side MSW Initialized');
    }
  }
}

