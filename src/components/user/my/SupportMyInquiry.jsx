import { ChevronLeft, PenLine } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const STATUS_STYLE = {
  done: 'bg-[#E6F2FF] text-[#0265CF]',
  wait: 'bg-[#EEEEEE] text-[#757575]',
};

const NOTIFICATIONS = [
  {
    id: 1,
    title: '해결해주세요',
    date: '2025-11-22',
    status: 'done',
  },
  {
    id: 2,
    title: '건의합니다',
    date: '2025-11-22',
    status: 'wait',
  },
];

export default function SupportMyInquiry() {
  const navigate = useNavigate();

  if (NOTIFICATIONS.length === 0) {
    return (
      <div className="flex h-full items-center justify-center bg-white">
        <p className="text-[16px] text-[#9E9E9E]">작성한 문의가 없어요.</p>
      </div>
    );
  }

  return (
    <div className="relative h-full bg-white">
      {/* 리스트 */}
      <div>
        {NOTIFICATIONS.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() =>
              navigate(`/index/mypage/support/myinquiry/detail/${item.id}`)
            }
            className="flex w-full items-center justify-between border-b px-4 py-4 text-left hover:bg-gray-50 active:bg-gray-100"
          >
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <p className="text-[16px] font-medium">{item.title}</p>

                <span
                  className={`rounded px-2 py-0.5 text-[12px] font-medium ${
                    STATUS_STYLE[item.status]
                  }`}
                >
                  {item.status === 'done' ? '답변완료' : '확인중'}
                </span>
              </div>

              <p className="text-[13px] text-[#9E9E9E]">{item.date}</p>
            </div>

            <ChevronLeft className="h-6 w-6 rotate-180 text-[#E0E0E0]" />
          </button>
        ))}
      </div>

      {/* 글 작성 버튼 */}
      <button
        onClick={() => navigate('/index/mypage/support/write')}
        className="absolute right-5 bottom-6 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-[#27BE69] text-white shadow-lg active:scale-95"
      >
        <PenLine className="h-5 w-5" />
      </button>
    </div>
  );
}
