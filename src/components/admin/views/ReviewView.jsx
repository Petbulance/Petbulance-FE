import { RotateCw, ZoomIn, Star, ArrowLeft } from 'lucide-react';
import React, { useMemo, useState } from 'react';

import Pagination from '@components/admin/Pagination.tsx';

import { Badge } from '../ui/Badge';

const PAGE_SIZE = 10;

const REVIEWS = Array.from({ length: 30 }).map((_, idx) => {
  const baseId = 4892 + idx;
  return {
    id: `REV_${baseId}`,
    hospital: ['아크리스 동물병원', '에코 특수동물병원', '우성 동물센터'][
      idx % 3
    ],
    user: ['도마뱀집사', '나나맘', '구글매니아'][idx % 3],
    animal: ['비어디 드래곤', '앵무새', '고슴도치'][idx % 3],
    amount: `${120000 + idx * 1200}원`,
    date: `2024.05.${(15 - (idx % 10)).toString().padStart(2, '0')}`,
    status: idx % 5 === 0 ? '보류' : '검수 대기',
    rating: 3.5 + (idx % 3) * 0.4,
  };
});

export default function ReviewView() {
  const [selected, setSelected] = useState<string | null>(null);
  const [page, setPage] = useState(1);

  const totalPages = Math.ceil(REVIEWS.length / PAGE_SIZE);
  const list = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return REVIEWS.slice(start, start + PAGE_SIZE);
  }, [page]);

  const pageGroupStart = Math.floor((page - 1) / 10) * 10 + 1;
  const pageGroupEnd = Math.min(pageGroupStart + 9, totalPages);
  const pageNumbers = useMemo(
    () =>
      Array.from(
        { length: pageGroupEnd - pageGroupStart + 1 },
        (_, i) => pageGroupStart + i
      ),
    [pageGroupStart, pageGroupEnd]
  );

  const target = REVIEWS.find((r) => r.id === selected) || null;

  if (!selected) {
    return (
      <div className="animate-in fade-in space-y-4 duration-500">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold">리뷰 검수 목록</h3>
          <span className="text-sm text-gray-500">
            총 {REVIEWS.length}건 · {page}/{totalPages}페이지
          </span>
        </div>
        <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-gray-100 bg-gray-50">
              <tr>
                <th className="px-6 py-4 font-semibold text-gray-600">
                  리뷰 ID
                </th>
                <th className="px-6 py-4 font-semibold text-gray-600">병원</th>
                <th className="px-6 py-4 font-semibold text-gray-600">
                  작성자
                </th>
                <th className="px-6 py-4 text-center font-semibold text-gray-600">
                  평점
                </th>
                <th className="px-6 py-4 font-semibold text-gray-600">
                  결제 금액
                </th>
                <th className="px-6 py-4 font-semibold text-gray-600">
                  등록일
                </th>
                <th className="px-6 py-4 text-right font-semibold text-gray-600">
                  상태
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {list.map((r) => (
                <tr
                  key={r.id}
                  className="cursor-pointer transition-colors hover:bg-blue-50/40"
                  onClick={() => setSelected(r.id)}
                >
                  <td className="px-6 py-4 font-mono text-xs text-gray-500">
                    {r.id}
                  </td>
                  <td className="px-6 py-4 font-medium">{r.hospital}</td>
                  <td className="px-6 py-4 text-gray-600">{r.user}</td>
                  <td className="px-6 py-4 text-center font-semibold">
                    {r.rating.toFixed(1)}
                  </td>
                  <td className="px-6 py-4 text-gray-700">{r.amount}</td>
                  <td className="px-6 py-4 text-xs text-gray-500">{r.date}</td>
                  <td className="px-6 py-4 text-right">
                    <Badge color={r.status === '검수 대기' ? 'yellow' : 'red'}>
                      {r.status}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex items-center justify-center border-t bg-gray-50 px-6 py-4 text-sm text-gray-600">
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

  return (
    <div className="animate-in slide-in-from-bottom-4 space-y-4 duration-500">
      <div className="flex items-center gap-3">
        <button
          onClick={() => setSelected(null)}
          className="flex items-center gap-2 rounded-lg border px-3 py-2 text-sm text-gray-600 hover:bg-gray-50"
        >
          <ArrowLeft className="h-4 w-4" /> 목록으로
        </button>
        <div className="font-mono text-xs text-gray-400">ID: {target.id}</div>
      </div>

      <div className="flex h-[calc(100vh-200px)] gap-6">
        <div className="relative flex flex-1 items-center justify-center overflow-hidden rounded-2xl bg-gray-900 p-10">
          <div className="flex h-full w-full items-center justify-center gap-4">
            <div className="h-full w-80 space-y-4 bg-white p-6 text-[10px] shadow-2xl">
              <div className="mb-4 text-center text-lg font-bold">영 수 증</div>
              <div className="flex justify-between">
                <span>병원명:</span>
                <span>{target.hospital}</span>
              </div>
              <div className="flex justify-between">
                <span>날짜:</span>
                <span>{target.date}</span>
              </div>
              <div className="flex justify-between border-t pt-4 text-sm font-bold">
                <span>결제금액</span>
                <span>{target.amount}</span>
              </div>
            </div>
            <div className="h-full w-48 space-y-2 overflow-y-auto pr-2">
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className="flex aspect-square items-center justify-center rounded border border-gray-700 bg-gray-800 text-[10px] text-gray-500"
                >
                  사진 {i}
                </div>
              ))}
            </div>
          </div>
          <div className="absolute top-4 right-4 flex gap-2">
            <button className="rounded-full bg-white/10 p-2 text-white hover:bg-white/20">
              <ZoomIn className="h-5 w-5" />
            </button>
            <button className="rounded-full bg-white/10 p-2 text-white hover:bg-white/20">
              <RotateCw className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="w-[450px] overflow-y-auto rounded-2xl border border-gray-100 bg-white p-8 shadow-sm">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <Badge color={target.status === '검수 대기' ? 'yellow' : 'red'}>
                {target.status}
              </Badge>
              <h3 className="mt-1 text-xl font-black">리뷰 내용 편집</h3>
              <p className="mt-1 text-xs text-gray-400">
                작성자: {target.user} · 동물: {target.animal}
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-500">
                동물종 선택 (필수)
              </label>
              <select
                className="w-full rounded-lg border bg-gray-50 p-2 text-sm"
                defaultValue={target.animal}
              >
                <option>파충류 - 비어디 드래곤</option>
                <option>조류 - 앵무새</option>
                <option>포유류 - 고슴도치</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-500">
                별점 3항목 관리
              </label>
              <div className="grid grid-cols-1 gap-3 rounded-xl border bg-gray-50 p-4">
                {[
                  { label: '전문성', value: 5 },
                  { label: '친절도', value: 4 },
                  { label: '시설/환경', value: 5 },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <span className="text-xs font-bold text-gray-600">
                      {item.label}
                    </span>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`h-4 w-4 ${star <= item.value ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-gray-500">
                  후기 내용 (최대 500자)
                </label>
                <span className="text-[10px] text-gray-400">120 / 500</span>
              </div>
              <textarea
                className="h-32 w-full rounded-lg border bg-gray-50 p-3 text-sm"
                defaultValue="선생님이 아주 친절하시고 도마뱀 진료를 정말 잘 봐주십니다. 시설도 깨끗해서 좋았어요. 다만 주차 공간이 조금 협소합니다."
              />
            </div>

            <div className="grid grid-cols-2 gap-3 border-t pt-6">
              <button className="rounded-xl border border-red-100 bg-red-50 py-4 font-bold text-red-600 hover:bg-red-100">
                반려 (R)
              </button>
              <button className="rounded-xl bg-green-600 py-4 font-bold text-white shadow-lg shadow-green-100 hover:bg-green-700">
                최종 승인 (A)
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
