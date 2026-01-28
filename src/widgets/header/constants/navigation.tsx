import { BookOpen, Dumbbell, Code, Heart, Palette } from 'lucide-react';
import { ROUTES } from '@/shared/routes';

export const NAV_ITEMS = [
  {
    label: '스터디',
    category: 'study',
    icon: <BookOpen size={18} />,
    href: { pathname: ROUTES.GROUPS, query: { category: 'study' } },
  },
  {
    label: '운동',
    category: 'exercise',
    icon: <Dumbbell size={18} />,
    href: { pathname: ROUTES.GROUPS, query: { category: 'exercise' } },
  },
  {
    label: '프로젝트',
    category: 'project',
    icon: <Code size={18} />,
    href: { pathname: ROUTES.GROUPS, query: { category: 'project' } },
  },
  {
    label: '취미',
    category: 'hobby',
    icon: <Heart size={18} />,
    href: { pathname: ROUTES.GROUPS, query: { category: 'hobby' } },
  },
  {
    label: '문화/예술',
    category: 'culture_art',
    icon: <Palette size={18} />,
    href: { pathname: ROUTES.GROUPS, query: { category: 'culture_art' } },
  },
];
