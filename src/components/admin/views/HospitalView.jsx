import {
  Search,
} from 'lucide-react';
import React, { useMemo, useState } from 'react';
import Pagination from '@/components/admin/Pagination.jsx';
import { HOSPITALS } from '@/components/admin/mock/hospitals.mock.js';
/* 병원 샘플 데이터 35개 */


export default function HospitalView() {
  /* 페이징 */
  const PAGE_SIZE = 10;
  const [page, setPage] = useState(1);

  /* 선택된 병원 */
  const [selectedHospitalId, setSelectedHospitalId] = useState(
    HOSPITALS[0].id
  );

  const totalPages = Math.ceil(HOSPITALS.length / PAGE_SIZE);

  const pagedHospitals = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return HOSPITALS.slice(start, start + PAGE_SIZE);
  }, [page]);

  const selectedHospital = useMemo(
    () =>
      HOSPITALS.find((h) => h.id === selectedHospitalId),
    [selectedHospitalId]
  );

  return (
    <div className="animate-in fade-in space-y-6 duration-500">
      <div className="flex h-[calc(100vh-180px)] gap-6">

        {/* ================= 좌측 병원 리스트 ================= */}
        <div className="flex w-1/3 flex-col overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm ">
          {/* 검색 */}
          <div className="border-b bg-gray-50/50 p-4 border-gray-100">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <input
                className="w-full rounded-lg border border-gray-200 py-2 pl-9 pr-4 text-sm outline-none focus:border-blue-500"
                placeholder="병원명 검색..."
              />
            </div>
          </div>

          {/* 테이블 */}
          <div className="flex-1 overflow-y-auto ">
            <table className="w-full text-sm ">
              <thead className="sticky top-0 bg-white ">
              <tr className="border-b bg-gray-50 text-xs text-gray-500 border-gray-100">
                <th className="px-4 py-2 text-left font-medium">
                  병원명
                </th>
                <th className="px-4 py-2 text-left font-medium">
                  DB ID
                </th>
              </tr>
              </thead>

              <tbody className="divide-y divide-gray-50 ">
              {pagedHospitals.map((h) => (
                <tr
                  key={h.id}
                  onClick={() => setSelectedHospitalId(h.id)}
                  className={`cursor-pointer transition ${
                    h.id === selectedHospitalId
                      ? 'bg-blue-50 border border-l-blue-600'
                      : 'border border-transparent hover:bg-blue-50/50'
                  }`}
                >

                <td className="px-4 py-3">
                    <div className="font-semibold">
                      {h.name}
                    </div>
                    <div className="mt-0.5 text-xs text-gray-400">
                      {h.address}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-xs text-gray-500">
                    {h.id}
                  </td>
                </tr>
              ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="border-t bg-white py-4 border-gray-100">
            <div className="flex justify-center">
              <Pagination
                page={page}
                totalPages={totalPages}
                onChange={setPage}
              />
            </div>
          </div>
        </div>

        {/* ================= 우측 병원 상세 ================= */}
        <div className="flex-1 overflow-y-auto rounded-xl border-gray-100 bg-white p-8">
          {/* 헤더 */}
          <div className="mb-8 flex items-start justify-between">
            <div>
              <h2 className="text-2xl font-bold">{selectedHospital.name}</h2>
              <p className="text-sm text-gray-400">
                DB ID: {selectedHospital.id}
              </p>
            </div>
            <button className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-bold text-white hover:bg-blue-700">
              변경사항 저장
            </button>
          </div>

          <div className="grid grid-cols-2 gap-8">
            {/* ================= 좌측 컬럼 ================= */}
            <div className="space-y-6 ">
              {/* 병원명 */}
              <div className="space-y-1 ">
                <label className="text-sm font-medium">병원명</label>
                <input
                  className="w-full rounded border p-2 text-sm border-gray-200 mt-2"
                  value={selectedHospital.name}
                  readOnly
                />
              </div>

              {/* 전화번호 */}
              <div className="space-y-1 ">
                <label className="text-sm font-medium">전화번호</label>
                <input
                  className="w-full rounded border p-2 text-sm border-gray-200 mt-2"
                  value={selectedHospital.phone}
                  readOnly
                />
              </div>

              {/* 주소 */}
              <div className="space-y-1">
                <label className="text-sm font-medium">주소</label>
                <input
                  className="w-full rounded border p-2 text-sm border-gray-200 mt-2"
                  value={selectedHospital.address}
                  readOnly
                />
              </div>

              {/* 위도 / 경도 */}
              <div className="space-y-1">
                <label className="text-sm font-medium">위도 / 경도</label>
                <div className="flex gap-2">
                  <input
                    className="w-1/2 rounded border p-2 text-sm text-gray-400 border-gray-200 mt-2"
                    value="37.12345"
                    readOnly
                  />
                  <input
                    className="w-1/2 rounded border p-2 text-sm text-gray-400 border-gray-200 mt-2"
                    value="127.12345"
                    readOnly
                  />
                </div>
              </div>
            </div>

            {/* ================= 우측 컬럼 ================= */}
            <div className="space-y-6">
              {/* 운영 시간 */}
              <div className="space-y-2">
                <label className="text-sm font-medium">운영시간</label>

                <div className="grid grid-cols-2 gap-x-6 gap-y-2 ">
                  {[
                    { day: '월', value: '09:00 ~ 18:00' },
                    { day: '화', value: '09:00 ~ 18:00' },
                    { day: '수', value: '09:00 ~ 18:00' },
                    { day: '목', value: '09:00 ~ 18:00' },
                    { day: '금', value: '09:00 ~ 18:00' },
                    { day: '토', value: '09:00 ~ 13:00' },
                    { day: '일', value: '휴무' },
                  ].map(({ day, value }) => (
                    <div
                      key={day}
                      className="flex items-center gap-2 text-sm"
                    >
                      <span className="w-6 text-gray-500">{day}</span>
                      <input
                        className="flex-1 rounded border px-2 py-1 text-xs text-gray-700 border-gray-200 mt-2"
                        value={value}
                        readOnly
                      />
                    </div>
                  ))}
                </div>
              </div>


              {/* 진료 가능 종 */}
              <div className="space-y-1">
                <label className="text-sm font-medium">
                  진료 가능 종 (태그)
                </label>
                <input
                  className="w-full rounded border p-2 text-sm border-gray-200 mt-2"
                  value={selectedHospital.tags.join(', ')}
                  readOnly
                />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium">
                  태그 (쉼표 구분)
                </label>
                <input
                  className="w-full rounded border p-2 text-sm border-gray-200 mt-2"
                  value={selectedHospital.tags.join(', ')}
                  readOnly
                />
              </div>

              {/* 병원 소개글 */}
              <div className="space-y-1">
                <label className="text-sm font-medium">병원 소개글</label>
                <textarea
                  className="h-32 w-full rounded border p-3 text-sm border-gray-200 mt-2"
                  value={selectedHospital.intro}
                  readOnly
                />
              </div>
            </div>
          </div>
        </div>


      </div>
    </div>
  );
}
