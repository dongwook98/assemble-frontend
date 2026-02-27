import { createPortal } from 'react-dom';

export function DialogPortal({ children }: { children: React.ReactNode }) {
  // SSR 환경에서의 오류 방지
  if (typeof window === 'undefined') return null;

  return createPortal(children, document.body);
}
