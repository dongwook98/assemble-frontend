'use client';

import { Suspense } from 'react';
import { useJoinedGroups } from '@/entities/groups/api/useJoinedGroups';
import { JoinedGroupCard } from '@/entities/groups/ui/JoinedGroupCard';
import { Sparkles } from 'lucide-react';

const MyGroupsListContent = () => {
  const { data: groups } = useJoinedGroups();

  if (groups.length === 0) {
    return (
      <div className="flex min-h-[400px] flex-col items-center justify-center gap-6 rounded-[3rem] border border-dashed border-slate-200 bg-slate-50/50 p-8 text-center">
        <div className="text-brand-400 rounded-full bg-white p-4 shadow-sm">
          <Sparkles size={32} />
        </div>
        <div className="space-y-2">
          <p className="text-xl font-black text-slate-900">
            아직 가입한 모임이 없네요!
          </p>
          <p className="font-medium text-slate-400">
            새로운 모임에 참여하여 활동을 시작해보세요.
          </p>
        </div>
      </div>
    );
  }

  return (
    <main className="grid grid-cols-1 gap-6 px-2 sm:grid-cols-2 lg:grid-cols-3">
      {groups.map((group) => (
        <JoinedGroupCard key={group.id} group={group} />
      ))}
    </main>
  );
};

export default function GroupListMyPage() {
  return (
    <div className="flex flex-col space-y-8 py-8 md:py-12">
      {/* 헤더 섹션 */}
      <div className="group relative overflow-hidden rounded-[2.5rem] bg-slate-900 px-8 py-10 text-white shadow-2xl shadow-slate-200/50">
        <div className="relative z-10 space-y-2">
          <h1 className="text-3xl font-black tracking-tight md:text-4xl">
            나의 활동 모임
          </h1>
          <p className="text-lg font-medium text-slate-400">
            가입하신 모임들의 소식을 한눈에 확인하고 관리하세요.
          </p>
        </div>
        <div className="bg-brand-500 absolute -top-24 -right-24 h-64 w-64 rounded-full opacity-20 blur-3xl transition-transform duration-700 group-hover:scale-110" />
      </div>

      {/* 리스트 섹션 */}
      <Suspense
        fallback={
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="aspect-square w-full animate-pulse rounded-[2.5rem] bg-slate-100"
              />
            ))}
          </div>
        }
      >
        <MyGroupsListContent />
      </Suspense>
    </div>
  );
}
