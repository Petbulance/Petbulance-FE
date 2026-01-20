import { ChevronLeft, Clock, Image as ImageIcon } from 'lucide-react';
import { useMemo, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import { REVIEWS } from '@/components/admin/mock/reviews.mock.js';
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
  {
    id: 3,
    date: '2024-10-06 09:20',
    action: '신고 접수',
    detail: '부적절한 표현 신고 1건 접수',
    admin: '시스템',
  },
];

export default function ReviewDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const [reviewTab, setReviewTab] = useState('info');

  const reviewFromState = location.state?.review;
  const review = useMemo(
    () => reviewFromState ?? REVIEWS.find((r) => String(r.id) === String(id)),
    [reviewFromState, id]
  );

  const ocr = review?.ocrInfo ?? {};
  const ratings = review?.ratings ?? {};

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

      <div className="flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
        <div className="border-b px-6 pt-6 pb-0">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">리뷰 상세 및 검수</h2>
              <p className="text-sm text-gray-500">{review.hospital}</p>
            </div>
            <StatusBadge status={review.status} />
          </div>
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

        <div className="p-6">
          {reviewTab === 'info' ? (
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-6">
                <h3 className="border-b pb-2 font-bold">OCR 추출 정보</h3>
                <div className="space-y-3 text-sm">
                  <p>
                    <span className="inline-block w-24 text-gray-500">병원명:</span>{' '}
                    {ocr.hospitalName || '-'}
                  </p>
                  <p>
                    <span className="inline-block w-24 text-gray-500">주소:</span>{' '}
                    {ocr.address || '-'}
                  </p>
                  <p>
                    <span className="inline-block w-24 text-gray-500">위도/경도:</span>{' '}
                    {ocr.latlng || '-'}
                  </p>
                  <div>
                    <span className="mb-1 inline-block w-24 text-gray-500">세부 진료내역:</span>
                    <ul className="space-y-1 rounded bg-gray-50 p-2 text-xs">
                      {(ocr.items ?? []).map((item, idx) => (
                        <li key={idx} className="flex justify-between">
                          <span>{item.name}</span>
                          <span>{typeof item.price === 'number' ? item.price.toLocaleString() : item.price}원</span>
                        </li>
                      ))}
                      <li className="mt-1 flex justify-between border-t border-gray-300 pt-1 font-bold">
                        <span>총액</span>
                        <span className="text-blue-600">
                          {typeof ocr.total === 'number' ? ocr.total.toLocaleString() : ocr.total || '-'}원
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
                <div>
                  <h4 className="mt-4 mb-2 text-sm font-bold">첨부 사진 (최대 10장)</h4>
                  <div className="grid grid-cols-5 gap-2">
                    {Array.from({ length: 10 }).map((_, i) => (
                      <div
                        key={i}
                        className="flex aspect-square flex-col items-center justify-center rounded border border-dashed bg-gray-100 text-xs text-gray-400"
                      >
                        <ImageIcon size={16} className="mb-1" />
                        <span>{i + 1}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <h3 className="border-b pb-2 font-bold">작성글 내용</h3>
                <div className="space-y-4">
                  <div>
                    <label className="mb-1 block text-xs text-gray-500">제목</label>
                    <h4 className="text-lg font-bold">{review.title}</h4>
                  </div>
                  <div className="flex gap-6 rounded bg-gray-50 p-4">
                    <div className="text-center">
                      <div className="mb-1 text-xs text-gray-500">진료 결과</div>
                      <div className="text-lg font-bold text-yellow-500">★ {ratings.result ?? '-'}</div>
                    </div>
                    <div className="text-center">
                      <div className="mb-1 text-xs text-gray-500">친절도</div>
                      <div className="text-lg font-bold text-yellow-500">★ {ratings.kindness ?? '-'}</div>
                    </div>
                    <div className="text-center">
                      <div className="mb-1 text-xs text-gray-500">가격 만족</div>
                      <div className="text-lg font-bold text-yellow-500">★ {ratings.price ?? '-'}</div>
                    </div>
                  </div>
                  <div>
                    <label className="mb-1 block text-xs text-gray-500">작성 내용</label>
                    <div className="min-h-[100px] rounded border p-4 text-sm">{review.content}</div>
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
            <div className="space-y-4">
              <div className="mb-4 flex items-start gap-2 rounded bg-blue-50 p-4 text-sm text-blue-800">
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
                  {MOCK_REVIEW_HISTORY.map((history) => (
                    <tr key={history.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-gray-500">{history.date}</td>
                      <td className="px-4 py-3 font-medium">{history.action}</td>
                      <td className="px-4 py-3">{history.detail}</td>
                      <td className="px-4 py-3">{history.admin}</td>
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
