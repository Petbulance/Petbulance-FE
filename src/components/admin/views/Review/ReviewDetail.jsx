import { ChevronLeft, Clock, Image as ImageIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import api from '@/apis/api.jsx';
import { StatusBadge } from '@/components/admin/ui/StatusBadge.jsx';

export default function ReviewDetail() {
  const navigate = useNavigate();
  const { reviewId } = useParams();

  const [review, setReview] = useState(null);
  const [reviewTab, setReviewTab] = useState('info');
  const [loading, setLoading] = useState(false);

  /* =========================
     리뷰 상세 조회
  ========================= */
  useEffect(() => {
    const fetchReviewDetail = async () => {
      setLoading(true);
      try {
        const response = await api.get(`/admin/review/${reviewId}`);
        setReview(response.data.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchReviewDetail();
  }, [reviewId]);

  /* =========================
     로딩
  ========================= */
  if (loading) {
    return (
      <div className="py-10 text-center text-gray-400">불러오는 중...</div>
    );
  }

  /* =========================
     데이터 없음
  ========================= */
  if (!review) {
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
      <button
        onClick={() => navigate('/admin/reviews')}
        className="flex items-center text-sm text-gray-500 hover:text-gray-800"
      >
        <ChevronLeft size={16} /> 목록으로 돌아가기
      </button>

      <div className="flex flex-col overflow-hidden rounded-lg border bg-white shadow-sm">
        {/* ===== 헤더 ===== */}
        <div className="border-b px-6 pt-6">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">리뷰 상세 및 검수</h2>
              <p className="text-sm text-gray-500">{review.hospitalName}</p>
            </div>
            <StatusBadge status={review.reviewStatus} />
          </div>

          <div className="flex gap-6">
            <button
              onClick={() => setReviewTab('info')}
              className={`pb-3 text-sm font-medium ${
                reviewTab === 'info'
                  ? 'border-b-2 border-blue-600 text-blue-600'
                  : 'text-gray-500'
              }`}
            >
              리뷰 정보
            </button>
            <button
              onClick={() => setReviewTab('history')}
              className={`pb-3 text-sm font-medium ${
                reviewTab === 'history'
                  ? 'border-b-2 border-blue-600 text-blue-600'
                  : 'text-gray-500'
              }`}
            >
              검수 이력
            </button>
          </div>
        </div>

        {/* ===== 내용 ===== */}
        <div className="p-6">
          {reviewTab === 'info' ? (
            <div className="grid grid-cols-2 gap-6">
              {/* ===== OCR 정보 ===== */}
              <div className="space-y-6">
                <h3 className="border-b pb-2 font-bold">OCR 추출 정보</h3>

                <div className="space-y-2 text-sm">
                  <p>
                    <span className="inline-block w-24 text-gray-500">
                      병원명
                    </span>
                    {review.hospitalName}
                  </p>
                  <p>
                    <span className="inline-block w-24 text-gray-500">
                      주소
                    </span>
                    {review.address}
                  </p>
                  <p>
                    <span className="inline-block w-24 text-gray-500">
                      도로명
                    </span>
                    {review.roadAddress}
                  </p>
                  <p>
                    <span className="inline-block w-24 text-gray-500">
                      좌표
                    </span>
                    {review.latitude}, {review.longitude}
                  </p>
                </div>

                <div>
                  <h4 className="mb-2 text-sm font-bold">첨부 사진</h4>
                  <div className="grid grid-cols-5 gap-2">
                    {review.images?.map((url, i) => (
                      <img
                        key={i}
                        src={url}
                        alt={`review-${i}`}
                        className="aspect-square rounded object-cover"
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* ===== 작성 내용 ===== */}
              <div className="space-y-6">
                <h3 className="border-b pb-2 font-bold">작성글 내용</h3>

                <div>
                  <label className="text-xs text-gray-500">제목</label>
                  <h4 className="text-lg font-bold">{review.title}</h4>
                </div>

                <div className="flex gap-6 rounded bg-gray-50 p-4 text-center">
                  <div>시설 ★ {review.facilityRating}</div>
                  <div>전문성 ★ {review.expertiseRating}</div>
                  <div>친절도 ★ {review.kindnessRating}</div>
                </div>

                <div>
                  <label className="text-xs text-gray-500">내용</label>
                  <div className="min-h-[100px] rounded border p-4 text-sm">
                    {review.reviewContent}
                  </div>
                </div>

                <div className="flex gap-2 border-t pt-4">
                  <button className="flex-1 rounded bg-red-50 py-2 text-red-600">
                    삭제 + 경고
                  </button>
                  <button className="flex-1 rounded bg-blue-50 py-2 text-blue-600">
                    게시 (복구)
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex gap-2 rounded bg-blue-50 p-4 text-sm">
                <Clock size={16} /> 검수 이력 영역 (API 연동 예정)
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
