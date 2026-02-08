import { Check } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import api from '@/apis/api.jsx';
import Pagination from '@/components/admin/Pagination.jsx';
import { StatusBadge } from '@/components/admin/ui/StatusBadge.jsx';

const PAGE_SIZE = 10;

export default function TermsManage() {
  const navigate = useNavigate();

  const [page, setPage] = useState(1);
  const [terms, setTerms] = useState([]);
  const [loading, setLoading] = useState(false);

  /* =========================
     API 조회
  ========================= */
  useEffect(() => {
    const fetchTerms = async () => {
      setLoading(true);
      try {
        const response = await api.get('/terms');
        setTerms(response.data.data || []);
        console.log(response.data.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchTerms();
  }, []);

  /* =========================
     프론트 페이징
  ========================= */
  const totalPages = Math.ceil(terms.length / PAGE_SIZE);

  const list = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return terms.slice(start, start + PAGE_SIZE);
  }, [terms, page]);

  /* =========================
     렌더링
  ========================= */
  return (
    <div className="space-y-4">
      {/* 헤더 */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">약관 관리</h2>
        <button
          onClick={() => navigate('/admin/terms/create')}
          className="flex items-center gap-2 rounded bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700"
        >
          <Check size={16} /> 신규 버전 등록
        </button>
      </div>

      {/* 테이블 */}
      <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="border-b bg-gray-50">
            <tr>
              <th className="px-6 py-3">약관 유형</th>
              <th className="px-6 py-3">버전</th>
              <th className="px-6 py-3">시행일</th>
              <th className="px-6 py-3">상태</th>
              <th className="px-6 py-3">등록일/등록자</th>
              <th className="px-6 py-3">관리</th>
            </tr>
          </thead>

          <tbody className="divide-y">
            {loading ? (
              <tr>
                <td colSpan={6} className="py-10 text-center text-gray-400">
                  불러오는 중...
                </td>
              </tr>
            ) : list.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-10 text-center text-gray-400">
                  등록된 약관이 없습니다.
                </td>
              </tr>
            ) : (
              list.map((term) => (
                <tr key={term.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium">{term.title}</td>
                  <td className="px-6 py-4">{term.version}</td>
                  <td className="px-6 py-4">-</td>
                  <td className="px-6 py-4">
                    <StatusBadge status={term.required ? '필수' : '선택'} />
                  </td>
                  <td className="px-6 py-4 text-xs text-gray-500">-</td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => navigate(`/admin/terms/${term.termsType}`)}
                      className="text-blue-600 hover:underline"
                    >
                      상세보기
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* 페이징 */}
      <div className="flex justify-center">
        <Pagination page={page} totalPages={totalPages} onChange={setPage} />
      </div>
    </div>
  );
}
