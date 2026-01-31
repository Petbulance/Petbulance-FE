import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import api from '@/apis/api.jsx';
import Pagination from '@/components/admin/Pagination.jsx';
import { Badge } from '@/components/admin/ui/Badge.jsx';

export default function ReviewView() {
  const navigate = useNavigate();

  // 서버 상태
  const [reviews, setReviews] = useState([]);
  const [page, setPage] = useState(1); // UI는 1-base
  const [pageSize, setPageSize] = useState(20);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const [loading, setLoading] = useState(false);

  /* =========================
     리뷰 목록 조회 (서버 페이징)
  ========================= */
  useEffect(() => {
    const fetchReviews = async () => {
      setLoading(true);
      try {
        const response = await api.get('/admin/review', {
          params: {
            page: page - 1, // ✅ 서버는 0-base
            size: pageSize,
          },
        });
        console.log(response);
        const data = response.data.data;

        setReviews(data.content);
        setPageSize(data.pageSize);
        setTotalPages(data.totalPages);
        setTotalElements(data.totalElements);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [page]);

  /* =========================
     로딩
  ========================= */
  if (loading) {
    return (
      <div className="py-10 text-center text-gray-400">불러오는 중...</div>
    );
  }

  return (
    <div className="animate-in fade-in space-y-4 duration-500">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold">리뷰 검수 목록</h3>
        <span className="text-sm text-gray-500">
          총 {totalElements}건 · {page}/{totalPages}페이지
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
            {reviews.map((r, i) => (
              <tr key={r.reviewId} className="transition hover:bg-blue-50/40">
                <td className="px-6 py-4 text-xs text-gray-500">
                  {(page - 1) * pageSize + i + 1}
                </td>
                <td className="px-6 py-4">{r.hospitalName}</td>
                <td className="px-6 py-4 font-medium">{r.userNickName}</td>
                <td className="px-6 py-4 text-gray-600">{r.reviewDate}</td>
                <td className="px-6 py-4">
                  <Badge
                    color={
                      r.reviewStatus === 'deleted'
                        ? 'gray'
                        : r.reportedCount > 0
                          ? 'yellow'
                          : 'green'
                    }
                  >
                    {r.reviewStatus}
                  </Badge>
                </td>
                <td className="px-6 py-4 text-center font-semibold text-red-500">
                  {r.reportedCount}
                </td>
                <td className="px-6 py-4 text-center">
                  <button
                    onClick={() => navigate(`/admin/reviews/${r.reviewId}`)}
                    className="rounded border px-3 py-1 hover:bg-gray-100"
                  >
                    상세
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {totalPages > 0 && (
          <div className="flex items-center justify-center py-6">
            <Pagination
              page={page}
              totalPages={totalPages}
              onChange={setPage}
            />
          </div>
        )}
      </div>
    </div>
  );
}
