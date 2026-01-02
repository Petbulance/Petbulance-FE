import { TrashCan } from '@carbon/icons-react';

export default function ActivityList({ NOTIFICATIONS }) {
  return (
    <div className="bg-white">
      {/* 상단 액션 */}
      <div className="flex items-center justify-between px-4 py-3 text-xs text-gray-400">
        <button className="flex items-center gap-1 text-[#222222]">
          <TrashCan className="h-[21px] w-[18px]" />
        </button>

        <button className="text-[18px] text-[#222222] underline underline-offset-2">
          전체읽음
        </button>
      </div>

      {/* 리스트 */}
      {NOTIFICATIONS.filter((n) => !n.isNotice).map((item) => (
        <div
          key={item.id}
          className={`border-b px-4 py-4 transition ${
            item.isRead ? 'bg-white' : 'bg-[#FDF4F1]'
          }`}
        >
          {/* 카테고리 + 시간 */}
          <div className="mb-1 flex items-center justify-between">
            <p className="text-[18px] text-caption">
              {item.category}
            </p>
            <p className="text-[18px] text-caption">
              {item.time}
            </p>
          </div>

          {/* 내용 */}
          <p className="text-[18px] text-[#1e1e1e]">
            {item.content}
          </p>
        </div>
      ))}
    </div>
  );
}
