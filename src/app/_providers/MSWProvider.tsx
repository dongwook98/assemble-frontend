'use client';

import { useEffect, useState } from 'react';

export const MSWProvider = ({ children }: { children: React.ReactNode }) => {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (isReady) return;

    const setup = async () => {
      try {
        if (process.env.NODE_ENV === 'development') {
          const { initMsw } = await import('@/shared/lib/msw/init');
          const { allHandlers } = await import('@/app/_msw/handlers'); // 여기서 핸들러 가져옴

          await initMsw(allHandlers); // 주입!
          setIsReady(true);
        }
      } catch (error) {
        console.error('[MSW] Failed to initialize:', error);
      } finally {
        // 2. 비동기 작업이 끝난 후 상태 업데이트
        setIsReady(true);
      }
    };

    setup();
  }, [isReady]);

  // MSW 준비 전까지 하이드레이션 에러 방지 및 안전한 모킹 보장
  if (process.env.NODE_ENV === 'development' && !isReady) {
    return null;
  }

  return <>{children}</>;
};
