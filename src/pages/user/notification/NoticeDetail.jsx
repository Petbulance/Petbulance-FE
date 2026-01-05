import { useNavigate, useParams } from 'react-router-dom';
import { NOTICE_ITEMS } from '@/data/notices.js';

const BADGE_STYLE = {
  이벤트: 'bg-[#E6FAEE] text-[#27BE69]',
  공지: 'bg-[#E6F2FF] text-[#0265CF]',
  광고: 'bg-[#FAF5B8] text-[#142435]',
};

export default function NoticeDetail() {
  const navigate = useNavigate();
  const { id } = useParams();

  const notice = NOTICE_ITEMS.find(
    (n) => n.id === Number(id)
  );

  if (!notice) {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="text-[18px] text-[#424242]">
          공지사항을 찾을 수 없어요
        </p>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col bg-white">

      {/* 내용 */}
      <main className="flex-1 overflow-y-auto px-6 py-5">
        <span
          className={`inline-block rounded px-2 py-0.5 text-[14px] font-medium ${
            BADGE_STYLE[notice.type]
          }`}
        >
          {notice.type}
        </span>

        <h1 className="mt-2 text-[20px] font-semibold">
          {notice.title}
        </h1>

        <p className="mt-1 text-[14px] text-gray-400 border-b">
          {notice.date}
        </p>

        <div className="mt-6 whitespace-pre-line text-[15px] leading-relaxed text-[#424242]">
          {notice.content}
        </div>
      </main>
    </div>
  );
}
