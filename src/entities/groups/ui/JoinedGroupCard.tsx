'use client';

import {
  Calendar,
  MessageSquare,
  MapPin,
  ChartColumnIncreasing,
} from 'lucide-react';
import { cn } from '@/shared/lib/utils';
import Link from 'next/link';
import { ROUTES } from '@/shared/constants/routes';
import { JoinedGroup } from '../model/types';

interface JoinedGroupCardProps {
  group: JoinedGroup;
}

export const JoinedGroupCard = ({ group }: JoinedGroupCardProps) => {
  return (
    <div className="group hover:border-brand-200 relative flex flex-col overflow-hidden rounded-[2.5rem] border border-slate-100 bg-white transition-all duration-300 hover:shadow-2xl hover:shadow-slate-200/50">
      {/* 이미지 섹션 */}
      <Link
        href={ROUTES.GROUPS.DETAIL(String(group.id))}
        className="relative aspect-video w-full shrink-0 overflow-hidden"
      >
        <img
          src={group.image}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
          alt={group.title}
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent opacity-60" />
      </Link>

      {/* 정보 섹션 */}
      <div className="flex flex-1 flex-col gap-5 p-6 pt-5">
        <div className="space-y-3">
          <Link href={ROUTES.GROUPS.DETAIL(String(group.id))}>
            <h3 className="group-hover:text-brand-600 line-clamp-1 text-lg font-black tracking-tight text-slate-900 transition-colors md:text-xl">
              {group.title}
            </h3>
          </Link>

          <div className="flex flex-wrap gap-2">
            <Badge
              icon={<span className="text-brand-500 font-bold">#</span>}
              label={group.categoryLabel}
            />
            <Badge
              icon={
                <ChartColumnIncreasing size={12} className="text-brand-500" />
              }
              label={group.levelLabel}
            />
            <Badge
              icon={<MapPin size={12} className="text-brand-500" />}
              label={group.location}
            />
          </div>
        </div>

        {/* 액션 버튼 섹션: 아웃라인 스타일 및 정보 통합 */}
        <div className="mt-auto flex flex-col gap-2 border-t border-slate-50 pt-4">
          <div className="grid grid-cols-2 gap-2">
            {/* 채팅 버튼: 마지막 메시지 내용 포함 */}
            <ActionLink
              href={ROUTES.GROUPS.DETAIL(String(group.id)) + '/chat'}
              icon={
                <MessageSquare
                  size={16}
                  className={cn(
                    group.unreadChatCount > 0
                      ? 'text-rose-500'
                      : 'text-slate-400'
                  )}
                />
              }
              label="채팅장"
              active={group.unreadChatCount > 0}
            >
              <div className="flex min-w-0 flex-col items-start leading-none">
                <span
                  className={cn(
                    'text-[11px] font-black',
                    group.unreadChatCount > 0
                      ? 'text-rose-600'
                      : 'text-slate-900'
                  )}
                >
                  최신 대화
                </span>
                <div className="flex w-full items-center gap-1.5 overflow-hidden">
                  <p className="mt-0.5 line-clamp-1 flex-1 text-[9px] font-bold text-slate-400">
                    {group.lastMessage?.content ||
                      '주고받은 메시지가 없습니다.'}
                  </p>
                  {group.unreadChatCount > 0 && (
                    <span className="flex h-4 min-w-[16px] shrink-0 items-center justify-center rounded-full bg-rose-500 px-1 text-[8px] font-black text-white">
                      {group.unreadChatCount > 99
                        ? '99+'
                        : group.unreadChatCount}
                    </span>
                  )}
                </div>
              </div>
            </ActionLink>

            {/* 일정 버튼: 다음 일정 제목 포함 */}
            <ActionLink
              href={ROUTES.GROUPS.DETAIL(String(group.id)) + '/schedules'}
              icon={
                <Calendar
                  size={16}
                  className={cn(
                    group.nextSchedule ? 'text-brand-500' : 'text-slate-400'
                  )}
                />
              }
              label="일정"
              highlight={!!group.nextSchedule}
            >
              <div className="flex min-w-0 flex-col items-start leading-none">
                <span
                  className={cn(
                    'text-[11px] font-black',
                    group.nextSchedule ? 'text-brand-600' : 'text-slate-900'
                  )}
                >
                  {group.nextSchedule ? '일정' : '일정'}
                </span>
                {group.nextSchedule && (
                  <span className="mt-0.5 line-clamp-1 w-full text-[9px] font-bold text-slate-400">
                    {group.nextSchedule.title}
                  </span>
                )}
              </div>
            </ActionLink>
          </div>
        </div>
      </div>
    </div>
  );
};

const Badge = ({ icon, label }: { icon: React.ReactNode; label: string }) => (
  <span className="flex items-center gap-1.5 rounded-xl border border-slate-100 bg-slate-50/50 px-2.5 py-1.5 text-[10px] font-black tracking-widest text-slate-500 uppercase">
    {icon}
    {label}
  </span>
);

const ActionLink = ({
  href,
  icon,
  active,
  highlight,
  children,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  highlight?: boolean;
  children: React.ReactNode;
}) => (
  <Link
    href={href}
    className={cn(
      'flex h-12 items-center justify-start gap-3 rounded-2xl border px-3 transition-all duration-200',
      active
        ? 'border-rose-100 bg-rose-50/30 shadow-sm shadow-rose-100/50 hover:border-rose-200 hover:bg-rose-50'
        : highlight
          ? 'border-brand-100 bg-brand-50/30 hover:bg-brand-50 hover:border-brand-200 shadow-brand-100/50 shadow-sm'
          : 'border-slate-100 bg-white hover:border-slate-200 hover:bg-slate-50'
    )}
  >
    <div
      className={cn(
        'flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border transition-colors',
        active
          ? 'border-rose-100 bg-white'
          : highlight
            ? 'border-brand-100 bg-white'
            : 'border-slate-100 bg-slate-50'
      )}
    >
      {icon}
    </div>
    <div className="min-w-0 flex-1">{children}</div>
  </Link>
);
