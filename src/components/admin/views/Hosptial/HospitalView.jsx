import { Search } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import api from '@/apis/api.jsx';
import Pagination from '@/components/admin/Pagination.jsx';
import HospitalDetail from '@/components/admin/views/Hosptial/HospitalDetail.jsx';

export default function HospitalView() {
  /* =========================
     상태
  ========================= */
  const PAGE_SIZE = 20;

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [hospitals, setHospitals] = useState([]);
  const [selectedHospitalId, setSelectedHospitalId] = useState(null);
  const [keyword, setKeyword] = useState('');
  const navigate = useNavigate();
  /* =========================
     병원 목록 조회 (서버 페이징)
  ========================= */
  useEffect(() => {
    const fetchHospitals = async () => {
      try {
        const res = await api.get('/admin/hospital', {
          params: {
            page: page - 1,
            size: PAGE_SIZE,
            keyword,
          },
        });

        const data = res.data.data;
        console.log(data);
        setHospitals(data.content || []);
        setTotalPages(data.totalPages || 0);

        // 페이지 변경 / 검색 시 첫 항목 자동 선택
        if (data.content?.length > 0) {
          setSelectedHospitalId(data.content[0].id);
        } else {
          setSelectedHospitalId(null);
        }
      } catch (error) {
        console.error(error);
        setHospitals([]);
        setTotalPages(0);
        setSelectedHospitalId(null);
      }
    };

    fetchHospitals();
  }, [page, keyword]);

  return (
    <div className="animate-in fade-in space-y-6 duration-500">
      {/* ===== 상단 헤더 ===== */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">병원 관리</h2>
        <button
          onClick={() => navigate('/admin/hospitals/create')}
          className="rounded bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700"
        >
          병원 등록
        </button>
      </div>

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
                value={keyword}
                onChange={(e) => {
                  setPage(1);
                  setKeyword(e.target.value);
                }}
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
                {hospitals.map((h) => (
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
                        {h.address || '주소 없음'}
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
                groupSize={5}
              />
            </div>
          </div>
        </div>

        {/* ================= 우측 병원 상세 ================= */}
        <HospitalDetail hospitalId={selectedHospitalId} />
      </div>
    </div>
  );
}
