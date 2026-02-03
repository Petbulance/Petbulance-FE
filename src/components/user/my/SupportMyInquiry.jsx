import { ChevronLeft, PenLine } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import api from '@/apis/api.jsx';
import Spinner from '@/components/commons/Spinner.jsx';

const PAGE_SIZE = 5;

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
  const [isFetching, setIsFetching] = useState(false);
  const [hasNext, setHasNext] = useState(true);
  const [lastQnaId, setLastQnaId] = useState(null);

  const observerRef = useRef(null);

  const fetchQnaList = async () => {
    if (isFetching || !hasNext) return;

    setIsFetching(true);

    try {
      const res = await api.get('/qna', {
        params: {
          lastQnaId,
          pageSize: PAGE_SIZE,
        },
      });

      const { content, hasNext: next } = res.data.data;

      setQnaList((prev) => [...prev, ...content]);
      setHasNext(next);

      if (content.length > 0) {
        setLastQnaId(content[content.length - 1].qnaId);
      }
    } catch (e) {
      console.error('문의 목록 조회 실패', e);
    } finally {
      setLoading(false);
      setIsFetching(false);
    }
  };

  useEffect(() => {
    fetchQnaList();
  }, []);

  useEffect(() => {
    if (!observerRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && fetchQnaList(),
      { threshold: 1 }
    );

    observer.observe(observerRef.current);
    return () => observer.disconnect();
  }, [hasNext, lastQnaId]);

  return (
    <div className="relative h-full bg-white">
      {loading && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/80">
          <Spinner />
        </div>
      )}
      {/* ================= 리스트 ================= */}
      <div className="h-full overflow-y-auto pb-32">
        {qnaList.map((item) => (
          <button
            key={item.qnaId}
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

        {hasNext && (
          <div
            ref={observerRef}
            className="flex h-12 items-center justify-center text-sm text-gray-400"
          >
            {isFetching ? <Spinner /> : '불러오는 중...'}
          </div>
        )}
      </div>

      {/* ================= 글 작성 버튼 (완전 하단 고정) ================= */}
      <button
        onClick={() => navigate('/index/mypage/support/write')}
        className="absolute right-5 bottom-6 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-[#27BE69] text-white shadow-lg active:scale-95"
      >
        <PenLine className="h-5 w-5" />
      </button>
    </div>
  );
}
