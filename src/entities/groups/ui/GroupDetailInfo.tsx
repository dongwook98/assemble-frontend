import { GroupDetail } from '../model/types';

interface GroupDetailInfoProps {
  group: GroupDetail;
}

export const GroupDetailInfo = ({ group }: GroupDetailInfoProps) => {
  return (
    <div className="flex flex-col gap-10 py-12">
      <section className="flex flex-col gap-4">
        <h2 className="text-2xl font-black tracking-tight text-slate-900">
          모임 소개
        </h2>
        <div className="text-lg leading-relaxed font-medium whitespace-pre-wrap text-slate-500">
          {group.description}
        </div>
      </section>
    </div>
  );
};
