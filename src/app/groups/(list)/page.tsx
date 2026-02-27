import {
  GroupCategoryFilter,
  GroupLevelFilter,
  GroupStatusFilter,
} from '@/features/groups-filter';
import { FilterResetButton } from '@/features/groups-filter/ui/FilterResetButton';
import { getQueryClient } from '@/shared/lib/tanstack-query/getQueryClient';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { GroupList } from '@/entities/groups/ui/GroupList';
import { getGroupList } from '@/entities/groups/api/getGroupList';
import { GroupSortOrder } from '@/features/groups-filter/ui/GroupSortOrder';
import { GroupSearchResultHeader } from '@/entities/groups/ui/GroupSearchResultHeader';

interface Props {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function GroupListPage({ searchParams }: Props) {
  const queryClient = getQueryClient();
  const params = await searchParams;
  console.log('🚀 ~ GroupListPage ~ params:', params.query);

  // 1. 서버에서 프리페칭 시작
  await queryClient.prefetchQuery({
    queryKey: ['groups', params],
    queryFn: () => getGroupList(params), // 서버사이드 MSW가 이를 가로챔
  });

  return (
    <div className="flex flex-col gap-4 px-4">
      {/* 필터 섹션 */}
      <section className="space-y-6">
        <div className="flex flex-wrap items-center gap-4">
          <GroupStatusFilter />
          <div className="hidden h-5 w-[1px] bg-slate-200 sm:block" />
          <GroupLevelFilter />
        </div>
        <div>
          <GroupCategoryFilter />
          <div className="mt-4 flex justify-between">
            <FilterResetButton />
            <GroupSortOrder />
          </div>
        </div>
      </section>

      <HydrationBoundary state={dehydrate(queryClient)}>
        {params.query && <GroupSearchResultHeader />}
        {/* 리스트 결과 섹션 */}
        <GroupList />
      </HydrationBoundary>
    </div>
  );
}
