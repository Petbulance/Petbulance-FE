import { ChevronLeft } from 'lucide-react';

const BADGE_STYLE = {
  이벤트: 'bg-[#E6FAEE] text-[#27BE69]',
  공지: 'bg-[#E6F2FF] text-[#0265CF]',
  광고: 'bg-[#FAF5B8] text-[#142435]',
};

export default function NoticeList({ NOTIFICATIONS }) {
  return (
    <div className="bg-white">
      {NOTIFICATIONS.filter((n) => n.isNotice).map((item) => (
        <div
          key={item.id}
          className="flex items-center justify-between border-b px-4 py-4"
        >
          <div>
            {/* 🔖 카테고리 뱃지 */}
            <span
              className={`mb-1 inline-block rounded px-2 py-0.5 text-[14px] font-medium ${
                BADGE_STYLE[item.type]
              }`}
            >
              {item.type}
            </span>

            {/* 제목 */}
            <p className="text-[19px] font-medium">
              {item.title}
            </p>

            {/* 날짜 */}
            <p className="mt-1 text-[15px] text-gray-400">
              {item.date}
            </p>
          </div>

          {/* 화살표 */}
          <ChevronLeft className="h-8 w-8 rotate-180 text-[#E0E0E0]" />
        </div>
      ))}
    </div>
  );
}
