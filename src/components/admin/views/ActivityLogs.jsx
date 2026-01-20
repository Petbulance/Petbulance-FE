import { useMemo, useState } from 'react';

import { ACTIVITY_LOGS } from '@/components/admin/mock/activityLogs.mock.js';
import Pagination from '@/components/admin/Pagination.jsx';
import { Badge } from '@/components/admin/ui/Badge';

export default function ActivityLogs() {
  const PAGE_SIZE = 10;
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(ACTIVITY_LOGS.length / PAGE_SIZE);

  const pagedLogs = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return ACTIVITY_LOGS.slice(start, start + PAGE_SIZE);
  }, [page]);

  return (
    <div className="animate-in fade-in space-y-6 duration-500">
      {/* 테이블 */}
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
            {pagedLogs.map((log, i) => (
              <tr key={log.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-center font-bold">
                  {(page - 1) * PAGE_SIZE + i + 1}
                </td>

                <td className="px-6 py-4 whitespace-nowrap">{log.datetime}</td>

                <td className="px-6 py-4 whitespace-nowrap">{log.adminName}</td>

                <td className="px-6 py-4 whitespace-nowrap">{log.page}</td>

                <td className="px-6 py-4">
                  <p className="truncate text-gray-700">{log.action}</p>
                </td>

                <td className="px-6 py-4 text-center">
                  <Badge color={log.result === '성공' ? 'blue' : 'red'}>
                    {log.result}
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
