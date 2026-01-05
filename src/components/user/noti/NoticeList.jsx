import { ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const BADGE_STYLE = {
  이벤트: 'bg-[#E6FAEE] text-[#27BE69]',
  공지: 'bg-[#E6F2FF] text-[#0265CF]',
  광고: 'bg-[#FAF5B8] text-[#142435]',
};

export default function NoticeList({ NOTIFICATIONS }) {
  const navigate = useNavigate();
  const notices = NOTIFICATIONS.filter((n) => n.isNotice);

  if (notices.length === 0) {
    return (
      <div className="flex h-full items-center justify-center bg-white">
        <p className="text-[18px] text-[#424242]">공지사항이 없어요</p>
      </div>
    );
  }

  return (
    <div className="bg-white">
      {notices.map((item) => (
        <button
          key={item.id}
          type="button"
          onClick={() => navigate(`/index/mypage/notice/${item.id}`)}
          className="flex w-full items-center justify-between border-b px-4 py-4 text-left hover:bg-gray-50 active:bg-gray-100"
        >
          <div>
            <span
              className={`mb-1 inline-block rounded px-2 py-0.5 text-[14px] font-medium ${
                BADGE_STYLE[item.type]
              }`}
            >
              {item.type}
            </span>

            <p className="text-[19px] font-medium">{item.title}</p>

            <p className="mt-1 text-[15px] text-gray-400">{item.date}</p>
          </div>

          <ChevronLeft className="h-8 w-8 rotate-180 text-[#E0E0E0]" />
        </button>
      ))}
    </div>
  );
}
