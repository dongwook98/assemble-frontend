import { RequestHandler } from 'msw';

export const initMsw = async (handlers: RequestHandler[]) => {
  // 환경 체크 로직은 이를 호출하는 쪽(instrumentation, MSWProvider)으로 위임합니다.
  if (typeof window === 'undefined') {
    // 서버(Node.js) 환경
    const { server } = await import('./server');

    server.use(...handlers);
    server.listen({ onUnhandledRequest: 'bypass' });
    console.log('[MSW] Server-side mocking enabled.');
  } else {
    // 브라우저 환경
    const { worker } = await import('./browser');
    await worker.use(...handlers);
    await worker.start({ onUnhandledRequest: 'bypass' });
    console.log('[MSW] Client-side mocking enabled.');
  }
};
