'use client';

import { Suspense, type ReactNode } from 'react';
import { ErrorBoundary, type FallbackProps } from 'react-error-boundary';

type Props = {
  children: ReactNode;
  loadingFallback: ReactNode;
  errorFallback?: (props: FallbackProps) => ReactNode;
};

/**
 * useSuspenseQuery와 함께 사용하는 선언적 데이터 페칭 바운더리입니다.
 * Suspense와 ErrorBoundary를 결합하여 로딩과 에러 상태를 처리합니다.
 */
export function AsyncBoundary({
  children,
  loadingFallback,
  errorFallback,
}: Props) {
  return (
    <ErrorBoundary fallbackRender={errorFallback ?? DefaultErrorFallback}>
      <Suspense fallback={loadingFallback}>{children}</Suspense>
    </ErrorBoundary>
  );
}

function DefaultErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
  const message = error instanceof Error ? error.message : '알 수 없는 오류가 발생했습니다.';
  
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center">
      <h2 className="text-xl font-bold text-red-600">오류가 발생했습니다</h2>
      <p className="mt-2 text-gray-600">{message}</p>
      <button
        onClick={resetErrorBoundary}
        className="mt-4 rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
      >
        다시 시도
      </button>
    </div>
  );
}
