import {
  RotateCw,
  ZoomIn,
  ArrowLeft,
  ChevronLeft,
  Image as ImageIcon,
} from 'lucide-react';
import React, { useMemo, useState } from 'react';

import Pagination from '@/components/admin/Pagination.jsx';
import { Badge } from '@/components/admin/ui/Badge';
import { REVIEWS } from '@/components/admin/mock/reviews.mock.js';

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
              <tr
                key={r.id}
                className="transition hover:bg-blue-50/40"
              >
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
    <div className="space-y-4 animate-in slide-in-from-bottom-4 duration-500">
      <button
        onClick={() => setSelectedId(null)}
        className="flex items-center text-sm text-gray-500 hover:text-gray-800"
      >
        <ChevronLeft size={16} /> 목록으로 돌아가기
      </button>

      <h2 className="text-2xl font-bold text-gray-800">
        리뷰 상세 및 검수
      </h2>

      <div className="grid grid-cols-2 gap-6">
        {/* OCR 정보 */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 space-y-6 ">
          <h3 className="font-bold border-b pb-2 border-gray-100">OCR 추출 정보</h3>

          <div className="space-y-3 text-sm ">
            <p>
              <span className="text-gray-500 w-24 inline-block">병원명:</span>
              {selectedReview.ocrInfo.hospitalName}
            </p>
            <p>
              <span className="text-gray-500 w-24 inline-block">주소:</span>
              {selectedReview.ocrInfo.address}
            </p>
            <p>
              <span className="text-gray-500 w-24 inline-block">위도/경도:</span>
              {selectedReview.ocrInfo.latlng}
            </p>

            <div>
              <span className="text-gray-500 w-24 inline-block mb-1">
                세부 진료내역:
              </span>
              <ul className="bg-gray-50 p-2 rounded text-xs space-y-1">
                {selectedReview.ocrInfo.items.map((item, idx) => (
                  <li key={idx} className="flex justify-between">
                    <span>{item.name}</span>
                    <span>{item.price}원</span>
                  </li>
                ))}
                <li className="flex justify-between font-bold border-t border-gray-300 pt-1 mt-1">
                  <span>총액</span>
                  <span className="text-blue-600">
                    {selectedReview.ocrInfo.total}원
                  </span>
                </li>
              </ul>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-sm mb-2 mt-4">
              첨부 사진 (최대 10장)
            </h4>
            <div className="grid grid-cols-5 gap-2">
              {Array.from({ length: 10 }).map((_, i) => (
                <div
                  key={i}
                  className="aspect-square bg-gray-100 border border-gray-100 rounded flex flex-col items-center justify-center text-xs text-gray-400 hover:bg-gray-50 cursor-pointer"
                >
                  <ImageIcon size={16} className="mb-1" />
                  <span>{i + 1}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 작성글 내용 */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 space-y-6">
          <h3 className="font-bold border-b pb-2 border-gray-100">작성글 내용</h3>

          <div className="space-y-4">
            <div>
              <label className="text-xs text-gray-500 mb-1 block">제목</label>
              <h4 className="font-bold text-lg">
                {selectedReview.title}
              </h4>
            </div>

            <div className="flex gap-6 p-4 bg-gray-50 rounded">
              {[
                ['진료 결과', selectedReview.ratings.result],
                ['친절도', selectedReview.ratings.kindness],
                ['가격 만족', selectedReview.ratings.price],
              ].map(([label, value]) => (
                <div key={label} className="text-center">
                  <div className="text-xs text-gray-500 mb-1">{label}</div>
                  <div className="text-yellow-500 font-bold text-lg">
                    ★ {value}
                  </div>
                </div>
              ))}
            </div>

            <div>
              <label className="text-xs text-gray-500 mb-1 block">
                작성 내용
              </label>
              <div className="p-4 border rounded text-sm min-h-[100px] border-gray-200">
                {selectedReview.content}
              </div>
            </div>

            <div className="flex gap-2 pt-4 border-gray-100">
              <button className="flex-1 bg-red-50 text-red-600 py-2 rounded font-medium hover:bg-red-100">
                삭제 + 경고
              </button>
              <button className="flex-1 bg-blue-50 text-blue-600 py-2 rounded font-medium hover:bg-blue-100">
                게시 (복구)
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
