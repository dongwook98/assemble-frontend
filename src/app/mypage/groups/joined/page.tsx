'use client';

import { Suspense } from 'react';
import { useJoinedGroups } from '@/entities/groups/api/useJoinedGroups';
import { JoinedGroupCard } from '@/entities/groups/ui/JoinedGroupCard';

const JoinedGroupsContent = () => {
  const { data: groups } = useJoinedGroups();

  if (groups.length === 0) {
    return (
      <div className="flex h-64 flex-col items-center justify-center gap-4 rounded-[3rem] border border-dashed border-slate-200 bg-slate-50/50">
        <p className="font-bold text-slate-400">아직 가입한 모임이 없습니다.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      {groups.map((group) => (
        <JoinedGroupCard key={group.id} group={group} />
      ))}
    </div>
  );
};

export default function JoinedGroupsPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-1">
        <h2 className="text-2xl font-black text-slate-900">가입한 모임</h2>
        <p className="font-medium text-slate-400">
          내가 현재 활동 중인 모임 리스트입니다.
        </p>
      </div>

      <Suspense
        fallback={
          <div className="flex animate-pulse flex-col gap-6">
            {[...Array(2)].map((_, i) => (
              <div
                key={i}
                className="h-44 w-full rounded-[3rem] bg-slate-100"
              />
            ))}
          </div>
        }
      >
        <JoinedGroupsContent />
      </Suspense>
    </div>
  );
}
