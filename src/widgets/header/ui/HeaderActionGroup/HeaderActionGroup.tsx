'use client';

import { Search } from 'lucide-react';
import { CreateGroupButton } from './CreateGroupButton';
import { NotificationBell } from './NotificationBell';
import { UserAccountDropdownMenu } from './UserAccountDropdownMenu';
import { NavButton } from '@/shared/ui/Button';
import { ROUTES } from '@/shared/constants/routes';
import { useUserStore } from '@/entities/user';

export function HeaderActionGroup() {
  const { isAuthenticated } = useUserStore();

  return (
    <div className="flex shrink-0 items-center gap-3 md:gap-5">
      <CreateGroupButton />

      <div className="flex items-center gap-2 md:gap-3">
        {isAuthenticated ? (
          <>
            <NotificationBell />
            <UserAccountDropdownMenu />
          </>
        ) : (
          <NavButton href={ROUTES.AUTH.LOGIN}>로그인</NavButton>
        )}

        {/* 모바일 전용 검색 버튼 */}
        <button className="rounded-2xl p-3 text-gray-500 transition-all hover:bg-gray-50 md:hidden">
          <Search size={24} strokeWidth={2.5} />
        </button>
      </div>
    </div>
  );
}
