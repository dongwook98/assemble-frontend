import { RequestHandler } from 'msw';

export const initMsw = async (handlers: RequestHandler[]) => {
  if (process.env.NODE_ENV !== 'development') return;

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
