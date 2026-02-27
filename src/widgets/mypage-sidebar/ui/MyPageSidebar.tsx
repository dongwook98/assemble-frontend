'use client';

import {
  Home,
  Users,
  History,
  Settings,
  Heart,
  UserPlus,
  FileText,
  MessageSquare,
  UserCircle,
  Bell,
  LucideIcon,
} from 'lucide-react';
import { usePathname } from 'next/navigation';
import { cn } from '@/shared/lib/utils';
import { ROUTES } from '@/shared/constants/routes';
import { NavButton } from '@/shared/ui/Button';

interface NavItem {
  label: string;
  href: string;
  icon: LucideIcon;
  exact?: boolean;
  items?: { label: string; href: string; icon: LucideIcon }[];
}

const NAV_ITEMS: NavItem[] = [
  {
    label: '홈',
    href: ROUTES.MYPAGE.HOME,
    icon: Home,
    exact: true,
  },
  {
    label: '모임',
    href: ROUTES.MYPAGE.GROUPS.LIKED,
    icon: Users,
    items: [
      {
        label: '좋아요 모임',
        href: ROUTES.MYPAGE.GROUPS.LIKED,
        icon: Heart,
      },
      {
        label: '가입한 모임',
        href: ROUTES.MYPAGE.GROUPS.JOINED,
        icon: UserPlus,
      },
    ],
  },
  {
    label: '활동내역',
    href: ROUTES.MYPAGE.ACTIVITIES.POSTS,
    icon: History,
    items: [
      {
        label: '나의 게시글',
        href: ROUTES.MYPAGE.ACTIVITIES.POSTS,
        icon: FileText,
      },
      {
        label: '나의 댓글',
        href: ROUTES.MYPAGE.ACTIVITIES.COMMENTS,
        icon: MessageSquare,
      },
    ],
  },
  {
    label: '설정',
    href: ROUTES.MYPAGE.SETTINGS.PROFILE,
    icon: Settings,
    items: [
      {
        label: '프로필 설정',
        href: ROUTES.MYPAGE.SETTINGS.PROFILE,
        icon: UserCircle,
      },
      {
        label: '알림 설정',
        href: ROUTES.MYPAGE.SETTINGS.NOTIFICATIONS,
        icon: Bell,
      },
    ],
  },
];

export const MyPageSidebar = () => {
  const pathname = usePathname();

  return (
    <aside className="w-full shrink-0 md:w-64">
      <nav className="flex flex-col gap-6">
        {NAV_ITEMS.map((group) => (
          <div key={group.label} className="flex flex-col gap-2">
            <NavButton
              href={group.href}
              exact={group.exact}
              variant="ghost"
              className="group relative flex items-center justify-start rounded-2xl px-5 font-black transition-all"
            >
              {/* 아이콘 래퍼 */}
              <div className="flex shrink-0 items-center justify-center">
                <group.icon className="size-7 stroke-[2.5px]" />
              </div>

              {/* 텍스트 영역 */}
              <span className="ml-4 truncate">{group.label}</span>

              {/* 활성화 표시 바 - DesktopSidebar 디자인 통일 */}
              <div className="bg-brand-500 absolute top-3 bottom-3 left-0 w-1.5 rounded-r-full opacity-0 transition-opacity group-data-[active=true]:opacity-100" />
            </NavButton>

            {group.items && (
              <div className="ml-9 flex flex-col gap-1 border-l border-slate-100 pl-4">
                {group.items.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <NavButton
                      key={item.href}
                      href={item.href}
                      variant="ghost"
                      className={cn(
                        'flex h-auto items-center justify-start gap-2 rounded-xl px-2 py-2 text-xs font-bold transition-all',
                        isActive
                          ? 'text-brand-500'
                          : 'text-slate-400 hover:text-slate-600'
                      )}
                    >
                      {item.label}
                    </NavButton>
                  );
                })}
              </div>
            )}
          </div>
        ))}
      </nav>
    </aside>
  );
};
