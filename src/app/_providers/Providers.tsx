import { PropsWithChildren } from 'react';
import { MSWProvider } from './MSWProvider';
import { TanstackQueryProvider } from './TanstackQueryProvider';

export default function Providers({ children }: PropsWithChildren) {
  return (
    <MSWProvider>
      <TanstackQueryProvider>{children}</TanstackQueryProvider>
    </MSWProvider>
  );
}
