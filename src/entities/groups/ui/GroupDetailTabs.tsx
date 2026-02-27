'use client';

import { cn } from '@/shared/lib/utils';
import Link from 'next/link';
import { useSelectedLayoutSegment } from 'next/navigation';
import { ROUTES } from '@/shared/constants/routes';

export type GroupDetailTabType =
  | 'home'
  | 'notice'
  | 'board'
  | 'chat'
  | 'schedules'
  | 'members'
  | 'manage';

interface TabItem {
  id: GroupDetailTabType;
  label: string;
  segment: string | null;
}

const TABS: TabItem[] = [
  { id: 'home', label: '홈', segment: null },
  { id: 'notice', label: '공지', segment: 'notice' },
  { id: 'board', label: '게시판', segment: 'board' },
  { id: 'schedules', label: '일정', segment: 'schedules' },
  { id: 'chat', label: '그룹 채팅', segment: 'chat' },
  { id: 'members', label: '멤버', segment: 'members' },
  { id: 'manage', label: '관리', segment: 'manage' },
];

interface GroupDetailTabsProps {
  groupId: string;
}

export const GroupDetailTabs = ({ groupId }: GroupDetailTabsProps) => {
  const activeSegment = useSelectedLayoutSegment();
  // null이면 '홈' 탭인 것으로 간주

  return (
    <div className="sticky top-16 z-10 w-full border-b border-slate-100 bg-white/80 backdrop-blur-md md:top-20">
      <div className="flex items-center gap-16 px-4 md:px-8">
        {TABS.map((tab) => {
          const isActive = activeSegment === tab.segment;
          const href = tab.segment
            ? `${ROUTES.GROUPS.DETAIL(groupId)}/${tab.segment}`
            : ROUTES.GROUPS.DETAIL(groupId);

          return (
            <Link
              key={tab.id}
              href={href}
              className={cn(
                'relative py-5 text-sm font-black tracking-tight transition-all',
                isActive
                  ? 'text-brand-600'
                  : 'text-slate-400 hover:text-slate-600'
              )}
            >
              {tab.label}
              {isActive && (
                <div className="bg-brand-500 absolute bottom-0 left-0 h-1 w-full rounded-full" />
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
};
