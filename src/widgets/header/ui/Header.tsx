'use client';

import { useState } from 'react';
import { groupRoutes, ROUTES } from '@/shared/routes';
import { Button, NavButton } from '@/shared/ui/Button';
import { Logo } from '@/shared/ui/Logo';

import { BellIcon, LogInIcon, PlusIcon } from 'lucide-react';

import { NAV_ITEMS } from '../constants/navigation';
import MobileMenu from './MobileMenu';
import UserAccountDropdownMenu from './UserAccountDropdownMenu';

export default function Header() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <header className="sticky top-0 z-50 h-16 overflow-hidden border-b border-gray-100 bg-white/80 backdrop-blur-xl">
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-4">
        <div className="flex items-center gap-2 md:gap-14">
          <Logo href={ROUTES.HOME} />

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-x-4 md:flex">
            {NAV_ITEMS.map((item) => (
              <NavButton
                size="xs"
                key={item.category}
                href={item.href}
                activeParams={{ category: item.category }}
                className="border-none"
                exact
              >
                {item.label}
              </NavButton>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-2 md:gap-4">
          <NavButton
            size="xs"
            className="hidden md:flex"
            href={groupRoutes.create()}
            exact
          >
            <PlusIcon className="size-5" />
            모임 만들기
          </NavButton>

          {!isLogin && (
            <NavButton size="xs" variant="outline" href={ROUTES.AUTH.LOGIN}>
              <LogInIcon className="size-4" />
              <span>로그인</span>
            </NavButton>
          )}

          {isLogin && (
            <>
              <Button
                size="icon"
                variant="ghost"
                className="relative rounded-full"
              >
                <BellIcon className="size-6" />
                <span className="absolute -top-1 -right-1 flex h-6 w-6 animate-bounce items-center justify-center rounded-full border-4 border-white bg-red-500 text-[10px] font-black text-white">
                  2
                </span>
              </Button>
              <UserAccountDropdownMenu />
            </>
          )}

          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
