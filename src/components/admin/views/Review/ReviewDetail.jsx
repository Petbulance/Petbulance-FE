import { ChevronLeft, Clock, Image as ImageIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import api from '@/apis/api.jsx';
import { StatusBadge } from '@/components/admin/ui/StatusBadge.jsx';

const MOCK_REVIEW_HISTORY = [
  {
    id: 1,
    date: '2024-10-05 10:30',
    action: '신고 접수',
    detail: '허위 정보 신고 1건 접수',
    admin: '시스템',
  },
  {
    id: 2,
    date: '2024-10-05 11:00',
    action: '검수 진행',
    detail: '관리자 확인 완료, 게시 유지',
    admin: '관리자A',
  },
];

export default function ReviewDetail() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [review, setReview] = useState(null);
  const [reviewTab, setReviewTab] = useState('info');
  const [loading, setLoading] = useState(false);
  const treatmentItems = review?.treatmentService
    ? review.treatmentService
        .split('), ')
        .map((v, i, arr) => (i === arr.length - 1 ? v.trim() : `${v.trim()})`))
    : [];

  console.log(review);
  /* =========================
     리뷰 상세 조회
  ========================= */ useEffect(() => {
    const fetchReviewDetail = async () => {
      setLoading(true);
      try {
        const res = await api.get(`/admin/review/${id}`);
        console.log(res);
        setReview(res.data.data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };

    fetchReviewDetail();
  }, [id]);

  /* =========================
     로딩
  ========================= */ if (loading) {
    return (
      <div className="py-10 text-center text-gray-400">불러오는 중...</div>
    );
  }

  /* =========================
     데이터 없음
  ========================= */ if (!review) {
    return (
      <div className="space-y-4">
        <button
          onClick={() => navigate('/admin/reviews')}
          className="flex items-center text-sm text-gray-500 hover:text-gray-800"
        >
          <ChevronLeft size={16} /> 목록으로 돌아가기
        </button>
        <div className="rounded-lg border bg-white p-6 text-center text-sm text-gray-600">
          해당 리뷰 정보를 찾을 수 없습니다.
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* 뒤로가기 */}
      <button
        onClick={() => navigate('/admin/reviews')}
        className="flex items-center text-sm text-gray-500 hover:text-gray-800"
      >
        <ChevronLeft size={16} /> 목록으로 돌아가기
      </button>

      <div className="flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
        {/* ================= 헤더 ================= */}
        <div className="border-b px-6 pt-6 pb-0">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">
                리뷰 상세 및 검수
              </h2>
              <p className="text-sm text-gray-500">{review.hospitalName}</p>
            </div>
            <StatusBadge status={review.reviewStatus} />
          </div>

          {/* 탭 */}
          <div className="flex gap-6">
            <button
              onClick={() => setReviewTab('info')}
              className={`pb-3 text-sm font-medium ${
                reviewTab === 'info'
                  ? 'border-b-2 border-blue-600 text-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              리뷰 정보
            </button>
            <button
              onClick={() => setReviewTab('history')}
              className={`pb-3 text-sm font-medium ${
                reviewTab === 'history'
                  ? 'border-b-2 border-blue-600 text-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              검수 이력
            </button>
          </div>
        </div>

        {/* ================= 내용 ================= */}
        <div className="p-6">
          {reviewTab === 'info' ? (
            <div className="grid grid-cols-2 gap-6">
              {/* ===== OCR 정보 ===== */}
              <div className="space-y-6">
                <h3 className="border-b pb-2 font-bold">OCR 추출 정보</h3>

                <div className="space-y-3 text-sm">
                  <p>
                    <span className="inline-block w-24 text-gray-500">
                      병원명:
                    </span>
                    {review.hospitalName}
                  </p>
                  <p>
                    <span className="inline-block w-24 text-gray-500">
                      주소:
                    </span>
                    {review.address}
                  </p>
                  <p>
                    <span className="inline-block w-24 text-gray-500">
                      도로명:
                    </span>
                    {review.roadAddress}
                  </p>
                  <p>
                    <span className="inline-block w-24 text-gray-500">
                      위도/경도:
                    </span>
                    {review.latitude}, {review.longitude}
                  </p>
                  <div>
                    <span className="mb-1 inline-block w-24 text-gray-500">
                      세부 진료내역:
                    </span>

                    <ol className="list-decimal space-y-1 rounded bg-gray-50 p-2 pl-5 text-xs">
                      {treatmentItems.length > 0 ? (
                        treatmentItems.map((text, idx) => (
                          <li key={idx}>{text}</li>
                        ))
                      ) : (
                        <li className="text-gray-400">진료 내역 없음</li>
                      )}
                    </ol>

                    <div className="mt-1 border-t border-gray-300 pt-1 text-right text-xs font-bold text-blue-600">
                      총액: {review.totalPrice?.toLocaleString() ?? '-'}
                    </div>
                  </div>
                </div>

                {/* 이미지 */}
                <div>
                  <h4 className="mb-2 text-sm font-bold">첨부 사진</h4>
                  <div className="grid grid-cols-5 gap-2">
                    {review.images?.length > 0 ? (
                      review.images.map((url, i) => (
                        <img
                          key={i}
                          src={url}
                          alt={`review-${i}`}
                          className="aspect-square rounded object-cover"
                        />
                      ))
                    ) : (
                      <div className="col-span-5 flex items-center justify-center rounded border border-dashed p-6 text-xs text-gray-400">
                        <ImageIcon size={16} className="mr-2" />
                        첨부 이미지 없음
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* ===== 작성글 ===== */}
              <div className="space-y-6">
                <h3 className="border-b pb-2 font-bold">작성글 내용</h3>

                <div className="space-y-4">
                  <div>
                    <label className="mb-1 block text-xs text-gray-500">
                      제목
                    </label>
                    <h4 className="text-lg font-bold">{review.title}</h4>
                  </div>

                  {/* 별점 */}
                  <div className="flex gap-6 rounded bg-gray-50 p-4">
                    <Rating label="시설" value={review.facilityRating} />
                    <Rating label="전문성" value={review.expertiseRating} />
                    <Rating label="친절도" value={review.kindnessRating} />
                  </div>

                  <div>
                    <label className="mb-1 block text-xs text-gray-500">
                      작성 내용
                    </label>
                    <div className="min-h-[100px] rounded border p-4 text-sm">
                      {review.reviewContent}
                    </div>
                  </div>

                  <div className="flex gap-2 border-t pt-4">
                    <button className="flex-1 rounded bg-red-50 py-2 font-medium text-red-600 hover:bg-red-100">
                      삭제 + 경고
                    </button>
                    <button className="flex-1 rounded bg-blue-50 py-2 font-medium text-blue-600 hover:bg-blue-100">
                      게시 (복구)
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* ===== 검수 이력 ===== */ <div className="space-y-4">
              <div className="flex items-start gap-2 rounded bg-blue-50 p-4 text-sm text-blue-800">
                <Clock size={16} className="mt-0.5 shrink-0" />
                <p>해당 리뷰에 대한 신고 접수 및 관리자 검수 이력입니다.</p>
              </div>

              <table className="w-full overflow-hidden rounded-lg border text-left text-sm">
                <thead className="border-b bg-gray-50">
                  <tr>
                    <th className="px-4 py-3">일시</th>
                    <th className="px-4 py-3">처리 내역</th>
                    <th className="px-4 py-3">상세 내용</th>
                    <th className="px-4 py-3">처리자</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {MOCK_REVIEW_HISTORY.map((h) => (
                    <tr key={h.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-gray-500">{h.date}</td>
                      <td className="px-4 py-3 font-medium">{h.action}</td>
                      <td className="px-4 py-3">{h.detail}</td>
                      <td className="px-4 py-3">{h.admin}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* =========================
   별점 컴포넌트
========================= */
function Rating({ label, value }) {
  return (
    <div className="text-center">
      <div className="mb-1 text-xs text-gray-500">{label}</div>
      <div className="text-lg font-bold text-yellow-500">★ {value ?? '-'}</div>
    </div>
  );
}
