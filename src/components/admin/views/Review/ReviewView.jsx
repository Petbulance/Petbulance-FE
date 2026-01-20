import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import api from '@/apis/api.jsx';
import { REVIEWS } from '@/components/admin/mock/reviews.mock.js';
import Pagination from '@/components/admin/Pagination.jsx';
import { Badge } from '@/components/admin/ui/Badge.jsx';

const PAGE_SIZE = 10;

export default function ReviewView() {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);

  const totalPages = Math.ceil(REVIEWS.length / PAGE_SIZE);

  const list = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return REVIEWS.slice(start, start + PAGE_SIZE);
  }, [page]);
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await api.get('/admin/review');
        console.log(response);
      } catch (error) {
        console.error(error);
      }
    };
    fetchReviews();
  }, []);
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
                    onClick={() =>
                      navigate(`/admin/reviews/${r.id}`, {
                        state: { review: r },
                      })
                    }
                    className="rounded border px-3 py-1 hover:bg-gray-100"
                  >
                    상세
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex items-center justify-center py-6">
          <Pagination page={page} totalPages={totalPages} onChange={setPage} />
        </div>
      </div>
    </div>
  );
}
