import { ChevronLeft, PenLine } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import api from '@/apis/api.jsx';

const STATUS_STYLE = {
  ANSWER_COMPLETED: 'bg-[#E6F2FF] text-[#0265CF]',
  ANSWER_WAITING: 'bg-[#EEEEEE] text-[#757575]',
};

const STATUS_LABEL = {
  ANSWER_COMPLETED: '답변완료',
  ANSWER_WAITING: '확인중',
};

export default function SupportMyInquiry() {
  const navigate = useNavigate();

  const [qnaList, setQnaList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasNext, setHasNext] = useState(false);
  const [lastQnaId, setLastQnaId] = useState(null);

  /* =========================
     문의 목록 조회
  ========================= */
  const fetchQnaList = async () => {
    try {
      const res = await api.get('/qna', {});
      console.log(res);
      const { content, hasNext } = res.data.data;

      setQnaList((prev) => [...prev, ...content]);
      setHasNext(hasNext);

      if (content.length > 0) {
        setLastQnaId(content[content.length - 1].qnaId);
      }
    } catch (e) {
      console.error('문의 목록 조회 실패', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQnaList();
  }, []);

  /* =========================
     로딩 / 빈 상태
  ========================= */
  if (!loading && qnaList.length === 0) {
    return (
      <div className="flex h-full items-center justify-center bg-white">
        <p className="text-[16px] text-[#9E9E9E]">작성한 문의가 없어요.</p>

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

  return (
    <div className="relative h-full bg-white">
      {/* ================= 리스트 ================= */}
      <div>
        {qnaList.map((item) => (
          <button
            key={item.qnaId}
            type="button"
            onClick={() =>
              navigate(`/index/mypage/support/myinquiry/detail/${item.qnaId}`)
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
                  {STATUS_LABEL[item.status]}
                </span>
              </div>

              <p className="text-[13px] text-[#9E9E9E]">
                {item.createdAt.slice(0, 10)}
              </p>
            </div>

            <ChevronLeft className="h-6 w-6 rotate-180 text-[#E0E0E0]" />
          </button>
        ))}
      </div>

      {/* ================= 글 작성 버튼 ================= */}
      <button
        onClick={() => navigate('/index/mypage/support/write')}
        className="absolute right-5 bottom-6 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-[#27BE69] text-white shadow-lg active:scale-95"
      >
        <PenLine className="h-5 w-5" />
      </button>
    </div>
  );
}
