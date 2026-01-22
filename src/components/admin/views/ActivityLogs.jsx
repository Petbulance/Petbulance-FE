import { useEffect, useState } from 'react';

import api from '@/apis/api.jsx';
import Pagination from '@/components/admin/Pagination.jsx';
import { Badge } from '@/components/admin/ui/Badge';

export default function ActivityLogs() {
  const PAGE_SIZE = 20;

  const [page, setPage] = useState(1);
  const [logs, setLogs] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const formatDateTime = (dateString) => {
    if (!dateString) return '-';

    const date = new Date(dateString);

    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');

    const hh = String(date.getHours()).padStart(2, '0');
    const min = String(date.getMinutes()).padStart(2, '0');
    const ss = String(date.getSeconds()).padStart(2, '0');

    return `${yyyy}-${mm}-${dd} ${hh}:${min}:${ss}`;
  };

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const response = await api.get('/admin/logs', {
          params: {
            page, // 1-base라면 그대로
            size: PAGE_SIZE,
          },
        });

        const data = response.data.data;

        setLogs(data.content);
        setTotalPages(data.totalPages);
        setTotalElements(data.totalElements);

        console.log('[logs]', data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchLogs();
  }, [page]);

  return (
    <div className="animate-in fade-in space-y-6 duration-500">
      <h2 className="text-2xl font-bold text-gray-800">관리자 행동 로그</h2>

      <div className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm">
        <table className="w-full table-fixed text-left text-sm">
          <thead className="border-b border-gray-100 bg-gray-50">
            <tr>
              <th className="w-[5%] px-6 py-4 text-center font-semibold text-gray-600">
                NO
              </th>
              <th className="w-[15%] px-6 py-4 font-semibold text-gray-600">
                일시
              </th>
              <th className="w-[15%] px-6 py-4 font-semibold text-gray-600">
                관리자명
              </th>
              <th className="w-[15%] px-6 py-4 font-semibold text-gray-600">
                페이지 위치
              </th>
              <th className="px-6 py-4 font-semibold text-gray-600">
                행동 상세
              </th>
              <th className="w-[10%] px-6 py-4 text-center font-semibold text-gray-600">
                결과
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-50">
            {logs.map((log, i) => (
              <tr key={log.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-center font-bold">
                  {totalElements - ((page - 1) * PAGE_SIZE + i)}
                </td>

                <td className="px-6 py-4 whitespace-nowrap">
                  {formatDateTime(log.createdAt)}
                </td>

                <td className="px-6 py-4 whitespace-nowrap">{log.adminName}</td>

                <td className="px-6 py-4 whitespace-nowrap">{log.pageType}</td>

                <td className="px-6 py-4">
                  <p className="truncate text-gray-700">{log.description}</p>
                </td>

                <td className="px-6 py-4 text-center">
                  <Badge
                    color={log.actionResult === 'SUCCESS' ? 'blue' : 'red'}
                  >
                    {log.actionResult === 'SUCCESS' ? '성공' : '실패'}
                  </Badge>
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
