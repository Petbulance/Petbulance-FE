import { Search } from 'lucide-react';
import { useMemo, useState } from 'react';

import { HOSPITALS } from '@/components/admin/mock/hospitals.mock.js';
import Pagination from '@/components/admin/Pagination.jsx';
import HospitalDetail from '@/components/admin/views/Hosptial/HospitalDetail.jsx';
/* 병원 샘플 데이터 35개 */

export default function HospitalView() {
  /* 페이징 */
  const PAGE_SIZE = 10;
  const [page, setPage] = useState(1);

  /* 선택된 병원 */
  const [selectedHospitalId, setSelectedHospitalId] = useState(HOSPITALS[0].id);

  const totalPages = Math.ceil(HOSPITALS.length / PAGE_SIZE);

  const pagedHospitals = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return HOSPITALS.slice(start, start + PAGE_SIZE);
  }, [page]);

  const selectedHospital = useMemo(
    () => HOSPITALS.find((h) => h.id === selectedHospitalId),
    [selectedHospitalId]
  );

  return (
    <div className="animate-in fade-in space-y-6 duration-500">
      <div className="flex h-[calc(100vh-180px)] gap-6">
        {/* ================= 좌측 병원 리스트 ================= */}
        <div className="flex w-1/3 flex-col overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm">
          {/* 검색 */}
          <div className="border-b border-gray-100 bg-gray-50/50 p-4">
            <div className="relative">
              <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <input
                className="w-full rounded-lg border border-gray-200 py-2 pr-4 pl-9 text-sm outline-none focus:border-blue-500"
                placeholder="병원명 검색..."
              />
            </div>
          </div>

          {/* 테이블 */}
          <div className="flex-1 overflow-y-auto">
            <table className="w-full text-sm">
              <thead className="sticky top-0 bg-white">
                <tr className="border-b border-gray-100 bg-gray-50 text-xs text-gray-500">
                  <th className="px-4 py-2 text-left font-medium">병원명</th>
                  <th className="px-4 py-2 text-left font-medium">DB ID</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-50">
                {pagedHospitals.map((h) => (
                  <tr
                    key={h.id}
                    onClick={() => setSelectedHospitalId(h.id)}
                    className={`cursor-pointer transition ${
                      h.id === selectedHospitalId
                        ? 'border border-l-blue-600 bg-blue-50'
                        : 'border border-transparent hover:bg-blue-50/50'
                    }`}
                  >
                    <td className="px-4 py-3">
                      <div className="font-semibold">{h.name}</div>
                      <div className="mt-0.5 text-xs text-gray-400">
                        {h.address}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-xs text-gray-500">{h.id}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="border-t border-gray-100 bg-white py-4">
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
        <HospitalDetail hospital={selectedHospital} />
      </div>
    </div>
  );
}
