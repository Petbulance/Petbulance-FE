import { ChevronLeft, Handshake, MessageSquare } from 'lucide-react';
import { useEffect, useState } from 'react';
import {
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from 'react-router-dom';

import api from '@/apis/api.jsx';
import { Badge } from '@/components/admin/ui/Badge.jsx';

/* =========================
   상태 → Badge 색상
========================= */
const getStatusColor = (status) => {
  switch (status) {
    case 'ANSWER_WAITING':
      return 'yellow';
    case 'ANSWER_COMPLETED':
      return 'green';
    default:
      return 'gray';
  }
};

export default function CustomerCenterDetail() {
  const navigate = useNavigate();
  const { id } = useParams(); // inquiryId or qnaId
  const location = useLocation();
  const type = location.state?.type; // oneonone | partnership
  console.log('타입은', type);
  const [data, setData] = useState(null);
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);

  /* =========================
     상세 조회 (타입 분기)
  ========================= */
  useEffect(() => {
    const fetchDetail = async () => {
      setLoading(true);
      try {
        let response;

        if (type === 'oneonone') {
          console.log('1:1');
          // 🔁 QNA (현재 롤백 상태)
          response = await api.get(`/qna/${id}`);
          const detail = response.data.data;
          console.log('1:1 데이터 받아와', detail);
          setData({
            title: detail.title,
            content: detail.content,
            createdAt: detail.createdAt,
            status: detail.status,
            answer: detail?.answer.content,
            writer: detail.writerNickname,
          });
          setAnswer(detail.answer?.content ?? 'aaaㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴ');
        } else {
          console.log('기업');

          // ✅ 기업 제휴 문의
          response = await api.get(`/admin/inquiries/${id}`);
          const detail = response.data.data;

          setData(detail);
          setAnswer(detail.answer?.content ?? '');
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchDetail();
  }, [id, type]);

  /* =========================
     답변 등록
  ========================= */
  const handleSubmitAnswer = async () => {
    try {
      if (type === 'oneonone') {
        console.log('1:1 답', answer);
        console.log('타입', type);
        await api.patch(`/admin/qna/${id}`, { content: answer });
      } else {
        await api.patch(`/admin/inquiries/${id}`, {
          content: answer,
        });
      }

      alert('답변이 등록되었습니다.');
      navigate('/admin/cs');
    } catch (e) {
      console.error(e);
      alert('답변 등록 실패');
    }
  };

  /* =========================
     상태 처리
  ========================= */
  if (loading) {
    return (
      <div className="py-10 text-center text-gray-400">불러오는 중...</div>
    );
  }

  if (!data) {
    return (
      <div className="space-y-4">
        <button
          onClick={() => navigate('/admin/cs')}
          className="flex items-center text-sm text-gray-500 hover:text-gray-800"
        >
          <ChevronLeft size={16} className="mr-1" />
          고객센터 목록으로 돌아가기
        </button>

        <div className="rounded-lg border bg-white p-6 text-sm text-gray-600">
          해당 문의를 찾을 수 없습니다.
        </div>
      </div>
    );
  }

  const isCompleted =
    type === 'oneonone'
      ? data.status === 'ANSWER_COMPLETED'
      : data.answer.inquiryAnswerType === 'ANSWER_COMPLETED';

  /* =========================
     렌더링
  ========================= */
  return (
    <div className="animate-in fade-in space-y-6 duration-500">
      {/* 뒤로가기 */}
      <button
        onClick={() => navigate('/admin/cs')}
        className="flex items-center text-sm text-gray-500 hover:text-gray-800"
      >
        <ChevronLeft size={16} className="mr-1" />
        목록으로 돌아가기
      </button>

      {/* 유형 */}
      <div className="flex items-center gap-2 text-sm text-gray-500">
        {type === 'oneonone' ? (
          <>
            <MessageSquare className="h-4 w-4" />
            <span>1:1 고객 문의</span>
          </>
        ) : (
          <>
            <Handshake className="h-4 w-4" />
            <span>기업 제휴 문의</span>
          </>
        )}
      </div>

      <h2 className="text-2xl font-bold text-gray-800">문의 상세</h2>

      <div className="space-y-6 rounded-lg border bg-white p-6 shadow-sm">
        {/* 헤더 */}
        <div className="border-b pb-4">
          <h3 className="text-xl font-bold text-gray-900">
            {type === 'oneonone' ? data.title : data.companyName}
          </h3>

          <p className="mt-1 text-sm text-gray-500">
            작성일: {data.createdAt} | 상태:{' '}
            <Badge
              color={getStatusColor(
                type === 'oneonone'
                  ? data.status
                  : data.answer.inquiryAnswerType
              )}
            >
              {isCompleted ? '완료' : '대기'}
            </Badge>
          </p>
        </div>

        {/* 문의 내용 */}
        <div className="space-y-2">
          <h4 className="text-sm font-semibold text-gray-700">문의 내용</h4>
          <div className="rounded bg-gray-50 p-4 text-sm leading-relaxed text-gray-800">
            {data.content}
          </div>
        </div>

        {/* 관리자 답변 */}
        <div className="space-y-3">
          <h4 className="text-sm font-semibold text-gray-700">관리자 답변</h4>

          <textarea
            className="h-32 w-full rounded border p-3 text-sm outline-none focus:ring-2 focus:ring-blue-100"
            placeholder="답변을 입력하세요..."
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            disabled={isCompleted}
          />

          <div className="flex justify-end">
            <button
              onClick={handleSubmitAnswer}
              disabled={isCompleted}
              className={`rounded px-6 py-2 text-sm text-white ${
                isCompleted
                  ? 'cursor-not-allowed bg-gray-400'
                  : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              답변 전송 및 처리 완료
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
