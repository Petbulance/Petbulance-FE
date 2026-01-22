import { Check } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import api from '@/apis/api.jsx';
import Pagination from '@/components/admin/Pagination.jsx';
import { StatusBadge } from '@/components/admin/ui/StatusBadge.jsx';

export default function ContentView() {
  const navigate = useNavigate();

  const [page, setPage] = useState(1);
  const [list, setList] = useState([]);
  const [pageSize, setPageSize] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const mapNoticeCategory = (status) => {
    switch (status) {
      case 'NOTICE':
        return '공지';
      case 'ADVERTISING':
        return '광고';
      case 'EVENT':
        return '이벤트';
      default:
        return '-';
    }
  };
  const mapStatusCategory = (status) => {
    switch (status) {
      case 'ACTIVE':
        return '게시';
      case 'INACTIVE':
        return '중단';
      default:
        return '-';
    }
  };

  /* =========================
     서버 페이징 조회
  ========================= */
  useEffect(() => {
    const fetchNotices = async () => {
      setLoading(true);
      try {
        const response = await api.get('/admin/notices', {
          params: { page },
        });

        const data = response.data.data;
        console.log(data);
        setList(data.content);
        setPageSize(data.size);
        setTotalPages(data.totalPages);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchNotices();
  }, [page]);

  /* =========================
     렌더링
  ========================= */
  return (
    <div className="space-y-6">
      {/* 헤더 */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">공지/배너 통합 관리</h2>

        <button
          onClick={() => navigate('/admin/content/create')}
          className="flex items-center gap-2 rounded bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700"
        >
          <Check size={16} /> 신규 등록
        </button>
      </div>

      {/* 테이블 */}
      <div className="overflow-hidden rounded-lg border bg-white">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-left">
            <tr>
              <th className="px-6 py-3">분류</th>
              <th className="px-6 py-3">제목</th>
              <th className="px-6 py-3">작성일</th>
              <th className="px-6 py-3">상태</th>
              <th className="px-6 py-3">관리</th>
            </tr>
          </thead>

          <tbody className="divide-y">
            {loading ? (
              <tr>
                <td colSpan={5} className="py-10 text-center text-gray-400">
                  불러오는 중...
                </td>
              </tr>
            ) : list.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-10 text-center text-gray-400">
                  데이터가 없습니다.
                </td>
              </tr>
            ) : (
              list.map((item, i) => (
                <tr key={item.noticeId} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <StatusBadge
                      status={mapNoticeCategory(item.noticeStatus)}
                    />
                  </td>

                  <td className="px-6 py-4 font-medium">
                    <div className="flex items-center gap-2">
                      {item.isBanner && (
                        <span className="rounded border border-indigo-200 bg-indigo-100 px-1.5 py-0.5 text-[10px] font-bold text-indigo-700">
                          MAIN BANNER
                        </span>
                      )}
                      {item.title}
                    </div>
                  </td>

                  <td className="px-6 py-4 text-gray-500">{item.createdAt}</td>

                  <td className="px-6 py-4">
                    <StatusBadge status={mapStatusCategory(item.postStatus)} />
                  </td>

                  <td className="px-6 py-4">
                    <button
                      onClick={() =>
                        navigate(`/admin/content/${item.noticeId}`)
                      }
                      className="text-blue-600 hover:underline"
                    >
                      수정
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center">
        <Pagination page={page} totalPages={totalPages} onChange={setPage} />
      </div>
    </div>
  );
}
