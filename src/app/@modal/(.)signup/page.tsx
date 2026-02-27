'use client';

import SignupForm from '@/features/auth/ui/SignupForm';
import {
  Dialog,
  DialogContent,
  DialogOverlay,
  DialogPortal,
} from '@/shared/ui/Dialog';
import { useRouter } from 'next/navigation';

export default function SignupModalPage() {
  const router = useRouter();

  return (
    <Dialog open={true} onClose={() => router.back()}>
      <DialogPortal>
        <DialogOverlay />
        <DialogContent>
          <SignupForm />
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
}
