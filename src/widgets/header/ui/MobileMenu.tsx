'use client';

import { useState } from 'react';
import { MenuIcon } from 'lucide-react';
import { Button } from '@/shared/ui/Button';
import { NavButton } from '@/shared/ui/Button';

import { Drawer } from '@/shared/ui/Drawer';
import { Logo } from '@/shared/ui/Logo';
import { NAV_ITEMS } from '../constants/navigation';

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = () => setIsOpen((prev) => !prev);
  const closeDrawer = () => setIsOpen(false);

  return (
    <>
      {/* 1. 트리거 버튼: 오직 모바일에서만 노출 */}
      <Button
        variant="ghost"
        size="icon"
        className="md:hidden"
        onClick={toggleDrawer}
        aria-label="메뉴 열기"
      >
        <MenuIcon size={24} strokeWidth={2.5} />
      </Button>

      <Drawer isOpen={isOpen} onClose={closeDrawer}>
        <Drawer.Content side="right">
          <Drawer.Header title={<Logo />} onClose={closeDrawer} />
          <Drawer.Body>
            <nav className="flex flex-col gap-2">
              {/* 메뉴 클릭 시 Drawer가 자동으로 닫히도록 closeDrawer 전달 */}
              {NAV_ITEMS.map((item) => (
                <NavButton
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
          </Drawer.Body>
        </Drawer.Content>
      </Drawer>
    </>
  );
}
