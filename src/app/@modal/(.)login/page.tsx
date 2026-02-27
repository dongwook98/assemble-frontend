'use client';

import LoginForm from '@/features/auth/ui/LoginForm';
import {
  Dialog,
  DialogContent,
  DialogOverlay,
  DialogPortal,
} from '@/shared/ui/Dialog';
import { useRouter } from 'next/navigation';

export default function LoginModalPage() {
  const router = useRouter();

  return (
    <Dialog open={true} onClose={() => router.back()}>
      <DialogPortal>
        <DialogOverlay />
        <DialogContent>
          <LoginForm onSuccess={() => router.back()} />
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
}
