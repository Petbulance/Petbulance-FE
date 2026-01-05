import { ChevronLeft, Image as ImageIcon } from 'lucide-react';
import { useMemo, useState } from 'react';

import { REVIEWS } from '@/components/admin/mock/reviews.mock.js';
import Pagination from '@/components/admin/Pagination.jsx';
import { Badge } from '@/components/admin/ui/Badge';

const PAGE_SIZE = 10;

export default function ReviewView() {
  const [selectedId, setSelectedId] = useState(null);
  const [page, setPage] = useState(1);

  const totalPages = Math.ceil(REVIEWS.length / PAGE_SIZE);

  const list = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return REVIEWS.slice(start, start + PAGE_SIZE);
  }, [page]);

  const selectedReview = useMemo(
    () => REVIEWS.find((r) => r.id === selectedId),
    [selectedId]
  );

  /* =========================
     목록 화면
  ========================= */
  if (!selectedId) {
    return (
      <div className="animate-in fade-in space-y-4 duration-500">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold">리뷰 검수 목록</h3>
          <span className="text-sm text-gray-500">
            총 {REVIEWS.length}건 · {page}/{totalPages}페이지
          </span>
        </div>

        <div className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm">
          <table className="w-full table-fixed text-left text-sm">
            <thead className="border-b border-gray-100 bg-gray-50">
              <tr>
                <th className="w-[6%] px-6 py-4">no</th>
                <th className="w-[20%] px-6 py-4">병원명</th>
                <th className="w-[15%] px-6 py-4">작성자</th>
                <th className="w-[15%] px-6 py-4">작성일</th>
                <th className="w-[10%] px-6 py-4">상태</th>
                <th className="w-[10%] px-6 py-4 text-center">신고수</th>
                <th className="w-[14%] px-6 py-4 text-center">검수</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-50">
              {list.map((r, i) => (
                <tr key={r.id} className="transition hover:bg-blue-50/40">
                  <td className="px-6 py-4 text-xs text-gray-500">
                    {(page - 1) * PAGE_SIZE + i + 1}
                  </td>
                  <td className="px-6 py-4">{r.hospital}</td>
                  <td className="px-6 py-4 font-medium">{r.user}</td>
                  <td className="px-6 py-4 text-gray-600">{r.date}</td>
                  <td className="px-6 py-4">
                    <Badge color={r.status === '신고' ? 'yellow' : 'green'}>
                      {r.status}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 text-center font-semibold text-red-500">
                    {r.count}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button
                      onClick={() => setSelectedId(r.id)}
                      className="rounded-md bg-blue-50 px-3 py-1 text-xs font-bold text-blue-600 hover:bg-blue-100"
                    >
                      상세보기
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex items-center justify-center py-6">
            <Pagination
              page={page}
              totalPages={totalPages}
              onChange={setPage}
            />
          </div>
        </div>
      </div>
    );
  }

  /* =========================
     상세 화면 (OCR + 리뷰 상세)
  ========================= */
  return (
    <div className="animate-in slide-in-from-bottom-4 space-y-4 duration-500">
      <button
        onClick={() => setSelectedId(null)}
        className="flex items-center text-sm text-gray-500 hover:text-gray-800"
      >
        <ChevronLeft size={16} /> 목록으로 돌아가기
      </button>

      <h2 className="text-2xl font-bold text-gray-800">리뷰 상세 및 검수</h2>

      <div className="grid grid-cols-2 gap-6">
        {/* OCR 정보 */}
        <div className="space-y-6 rounded-lg border border-gray-100 bg-white p-6 shadow-sm">
          <h3 className="border-b border-gray-100 pb-2 font-bold">
            OCR 추출 정보
          </h3>

          <div className="space-y-3 text-sm">
            <p>
              <span className="inline-block w-24 text-gray-500">병원명:</span>
              {selectedReview.ocrInfo.hospitalName}
            </p>
            <p>
              <span className="inline-block w-24 text-gray-500">주소:</span>
              {selectedReview.ocrInfo.address}
            </p>
            <p>
              <span className="inline-block w-24 text-gray-500">
                위도/경도:
              </span>
              {selectedReview.ocrInfo.latlng}
            </p>

            <div>
              <span className="mb-1 inline-block w-24 text-gray-500">
                세부 진료내역:
              </span>
              <ul className="space-y-1 rounded bg-gray-50 p-2 text-xs">
                {selectedReview.ocrInfo.items.map((item, idx) => (
                  <li key={idx} className="flex justify-between">
                    <span>{item.name}</span>
                    <span>{item.price}원</span>
                  </li>
                ))}
                <li className="mt-1 flex justify-between border-t border-gray-300 pt-1 font-bold">
                  <span>총액</span>
                  <span className="text-blue-600">
                    {selectedReview.ocrInfo.total}원
                  </span>
                </li>
              </ul>
            </div>
          </div>

          <div>
            <h4 className="mt-4 mb-2 text-sm font-bold">
              첨부 사진 (최대 10장)
            </h4>
            <div className="grid grid-cols-5 gap-2">
              {Array.from({ length: 10 }).map((_, i) => (
                <div
                  key={i}
                  className="flex aspect-square cursor-pointer flex-col items-center justify-center rounded border border-gray-100 bg-gray-100 text-xs text-gray-400 hover:bg-gray-50"
                >
                  <ImageIcon size={16} className="mb-1" />
                  <span>{i + 1}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 작성글 내용 */}
        <div className="space-y-6 rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <h3 className="border-b border-gray-100 pb-2 font-bold">
            작성글 내용
          </h3>

          <div className="space-y-4">
            <div>
              <label className="mb-1 block text-xs text-gray-500">제목</label>
              <h4 className="text-lg font-bold">{selectedReview.title}</h4>
            </div>

            <div className="flex gap-6 rounded bg-gray-50 p-4">
              {[
                ['진료 결과', selectedReview.ratings.result],
                ['친절도', selectedReview.ratings.kindness],
                ['가격 만족', selectedReview.ratings.price],
              ].map(([label, value]) => (
                <div key={label} className="text-center">
                  <div className="mb-1 text-xs text-gray-500">{label}</div>
                  <div className="text-lg font-bold text-yellow-500">
                    ★ {value}
                  </div>
                </div>
              ))}
            </div>

            <div>
              <label className="mb-1 block text-xs text-gray-500">
                작성 내용
              </label>
              <div className="min-h-[100px] rounded border border-gray-200 p-4 text-sm">
                {selectedReview.content}
              </div>
            </div>

            <div className="flex gap-2 border-gray-100 pt-4">
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
    </div>
  );
}
