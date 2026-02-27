'use client';

import FindPasswordForm from '@/features/auth/ui/FindPasswordForm';
import {
  Dialog,
  DialogContent,
  DialogOverlay,
  DialogPortal,
} from '@/shared/ui/Dialog';
import { useRouter } from 'next/navigation';

export default function FindPasswordModalPage() {
  const router = useRouter();

  return (
    <Dialog open={true} onClose={() => router.back()}>
      <DialogPortal>
        <DialogOverlay />
        <DialogContent>
          <FindPasswordForm />
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
}
