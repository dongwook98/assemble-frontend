'use client';

import { usePathname } from 'next/navigation';
import { useSidebarStore } from '@/shared/model/sidebar';
import { cn } from '@/shared/lib/utils';

import { NavButton } from '@/shared/ui/Button';
import { ROUTES } from '@/shared/constants/routes';
import { SIDEBAR_MENU_ITEMS } from '../constants';

export function DesktopSidebar() {
  const pathname = usePathname();

  const { isCollapsed } = useSidebarStore();

  const isGroupListPage =
    pathname === ROUTES.GROUPS.LIST ||
    ROUTES.GROUPS.POPULAR ||
    ROUTES.GROUPS.MY;

  if (!isGroupListPage) return null;

  return (
    <aside
      className={cn(
        'hidden flex-col transition-all duration-300 lg:flex',
        'sticky top-0 h-[calc(100vh-64px)]',
        isCollapsed ? 'w-13' : 'w-64'
      )}
    >
      <div className="flex h-full flex-col">
        <nav className="flex-1 space-y-2">
          {SIDEBAR_MENU_ITEMS.map((item) => (
            <NavButton
              key={item.href}
              href={item.href}
              exact={item.exact}
              variant="ghost"
              className={cn(
                'group relative flex items-center rounded-2xl font-black transition-all',
                isCollapsed
                  ? 'w-13 justify-center gap-0 p-3' // 접힘: 고정 너비, 중앙 정렬, 마진 오토
                  : 'justify-start px-5' // 펼침: 전체 너비, 왼쪽 정렬, 패딩
              )}
            >
              {/* 아이콘 래퍼: shrink-0으로 찌그러짐 방지 */}
              <div className="flex shrink-0 items-center justify-center">
                <item.icon className="size-7 stroke-[2.5px]" />
              </div>

              {/* 텍스트 영역 */}
              <span
                className={cn(
                  'truncate transition-all duration-300',
                  isCollapsed ? 'ml-0 w-0 opacity-0' : 'ml-4 w-auto opacity-100'
                )}
              >
                {item.label}
              </span>

              {/* 활성화 표시 바 */}
              <div className="bg-brand-500 absolute top-3 bottom-3 left-0 w-1.5 rounded-r-full opacity-0 transition-opacity group-data-[active=true]:opacity-100" />
            </NavButton>
          ))}
        </nav>
      </div>
    </aside>
  );
}
