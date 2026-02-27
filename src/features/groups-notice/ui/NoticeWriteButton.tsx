'use client';

import Button from '@/shared/ui/Button/Button';
import { PenLine } from 'lucide-react';

interface NoticeWriteButtonProps {
  myRole: 'LEADING' | 'MEMBER' | 'GUEST';
}

export const NoticeWriteButton = ({ myRole }: NoticeWriteButtonProps) => {
  if (myRole !== 'LEADING') return null;

  return (
    <Button
      variant="outline"
      className="border-brand-200 text-brand-600 hover:bg-brand-50 gap-2 rounded-full font-black"
      onClick={() => alert('공지 작성 기능은 준비 중입니다.')}
    >
      <PenLine size={18} />
      공지 작성하기
    </Button>
  );
};
