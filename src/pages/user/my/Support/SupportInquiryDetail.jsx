import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import api from '@/apis/api.jsx';
import { useSupportInquiryStore } from '@/stores/useSupportInquiryStore';

/* ================= 상태 매핑 ================= */
const STATUS_LABEL = {
  ANSWER_COMPLETED: '답변 완료',
  WAITING: '답변 대기',
};

export default function SupportInquiryDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { setInquiry, clearInquiry } = useSupportInquiryStore();

  const [inquiry, setLocalInquiry] = useState(null);
  const [error, setError] = useState(null);

  /* ================= 단건 조회 ================= */
  const fetchInquiryDetail = async () => {
    try {
      const res = await api.get(`/qna/${id}`);
      const data = res.data.data;

      setLocalInquiry(data); // 로컬 렌더링용
      setInquiry(data);
    } catch (e) {
      const errorName = e?.response?.data?.data?.errorClassName;

      if (errorName === 'FORBIDDEN_QNA_ACCESS') {
        setError('접근 권한이 없는 문의입니다.');
      } else if (errorName === 'QNA_NOT_FOUND') {
        setError('해당 문의를 찾을 수 없습니다.');
      } else {
        setError('문의 조회에 실패했어요.');
      }
    }
  };

  useEffect(() => {
    fetchInquiryDetail();

    return () => {
      clearInquiry(); // ✅ 페이지 이탈 시 store 정리
    };
  }, [id]);

  /* ================= 에러 화면 ================= */
  if (error) {
    return (
      <div className="flex h-full items-center justify-center bg-white">
        <p className="text-[16px] text-[#9E9E9E]">{error}</p>
      </div>
    );
  }

  /* ================= 로딩 ================= */
  if (!inquiry) return null;

  const isAnswered = inquiry.status === 'ANSWER_COMPLETED';

  return (
    <div className="flex h-full flex-col bg-white">
      {/* ================= 문의 ================= */}
      <main className="flex-1 space-y-6 px-4 py-5">
        <section className="space-y-2">
          <h1 className="text-[17px] font-semibold text-[#1e1e1e]">
            {inquiry.title}
          </h1>

          <p className="text-[13px] text-[#9E9E9E]">{inquiry.createdAt}</p>

          <div className="rounded-lg text-[14px] whitespace-pre-line text-[#1e1e1e]">
            {inquiry.content}
          </div>
        </section>
      </main>

      {/* ================= 구분선 ================= */}
      {isAnswered && <div className="my-3 h-[12px] bg-[#EEEEEE]" />}

      {/* ================= 답변 ================= */}
      {isAnswered && inquiry.answer && (
        <main className="flex-1 space-y-6 px-4 py-5">
          <section className="space-y-2">
            <p className="text-[14px] font-semibold text-[#27BE69]">
              펫뷸런스 운영팀 답변
            </p>

            <p className="text-[13px] text-[#9E9E9E]">
              {inquiry.answer.answeredAt}
            </p>

            <div className="rounded-lg text-[14px] whitespace-pre-line text-[#1e1e1e]">
              {inquiry.answer.content}
            </div>
          </section>
        </main>
      )}

      {/* ================= 하단 버튼 ================= */}
      <footer className="flex gap-3 px-4 py-[32px]">
        <button
          onClick={() => navigate('/index/mypage/support/MyInquiry')}
          className="flex-1 rounded-lg border border-[#E0E0E0] py-3 text-[15px] font-medium text-[#424242]"
        >
          목록
        </button>

        <button
          onClick={() => alert('삭제 API 연결')}
          className="flex-1 rounded-lg border border-[#27BE69] py-3 text-[15px] font-medium text-[#27BE69]"
        >
          삭제
        </button>
      </footer>
    </div>
  );
}
