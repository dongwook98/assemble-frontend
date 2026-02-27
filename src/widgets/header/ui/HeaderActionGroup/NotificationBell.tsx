'use client';

import { Button } from '@/shared/ui/Button';
import { Bell } from 'lucide-react';
import { NotificationPopover } from './NotificationPopover';
import { useJoinedGroups } from '@/entities/groups/api/useJoinedGroups';
import { Suspense } from 'react';

function NotificationBellContent() {
  const { data: groups } = useJoinedGroups();

  // 채팅 안읽은 개수 + 가짜 알림 개수(2개라고 가정)
  const unreadChatCount = groups.reduce((acc, g) => acc + g.unreadChatCount, 0);
  const notificationCount = 2; // 가짜 알림
  const totalCount = unreadChatCount + notificationCount;

  return (
    <NotificationPopover>
      <Button
        variant="ghost"
        size="icon"
        aria-label="알림 확인"
        className="relative"
      >
        <Bell size={22} strokeWidth={2.5} className="text-slate-600" />
        {totalCount > 0 && (
          <span className="absolute top-1.5 right-1.5 flex h-4.5 min-w-[18px] items-center justify-center rounded-full border-2 border-white bg-rose-500 px-1 text-[8px] font-black text-white shadow-sm">
            {totalCount > 99 ? '99+' : totalCount}
          </span>
        )}
      </Button>
    </NotificationPopover>
  );
}

export function NotificationBell() {
  return (
    <Suspense
      fallback={
        <Button variant="ghost" size="icon" disabled>
          <Bell size={22} strokeWidth={2.5} className="text-slate-300" />
        </Button>
      }
    >
      <NotificationBellContent />
    </Suspense>
  );
}
