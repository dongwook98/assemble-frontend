import { Button } from '@/shared/ui/Button';
import { PlusIcon } from 'lucide-react';

interface GroupListLayoutProps {
  children: React.ReactNode;
}

export default function GroupListLayout({ children }: GroupListLayoutProps) {
  return (
    <>
      {children}
      <Button variant="primary" className="absolute right-2 bottom-4 md:hidden">
        <PlusIcon className="transition-transform duration-300 group-hover:rotate-90" />
        <span>모임 만들기</span>
      </Button>
    </>
  );
}
