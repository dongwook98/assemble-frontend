'use client';

import { Heart } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/shared/lib/utils';

interface LikeButtonProps {
  groupId: number;
  initialLiked: boolean;
  initialCount: number;
}

export const LikeButton = ({
  groupId,
  initialLiked,
  initialCount,
}: LikeButtonProps) => {
  const [isLiked, setIsLiked] = useState(initialLiked);
  const [count, setCount] = useState(initialCount);

  const toggleLike = () => {
    // 실제 API 연동 로직 추가 예정
    setIsLiked(!isLiked);
    setCount((prev) => (isLiked ? prev - 1 : prev + 1));
  };

  return (
    <button
      onClick={toggleLike}
      className={cn(
        'flex h-full min-w-16 flex-col items-center justify-center gap-1 transition-all',
        isLiked ? 'text-red-500' : 'text-slate-400 hover:text-slate-600'
      )}
    >
      <Heart size={28} className={cn(isLiked && 'fill-red-500')} />
      <span className="text-[10px] font-black tracking-widest uppercase">
        {count}
      </span>
    </button>
  );
};
