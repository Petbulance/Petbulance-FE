import { Activity } from 'lucide-react';

export default function HospitalHistories({ histories }) {
  return (
    <div className="space-y-4">
      <div className="mb-4 flex items-start gap-2 rounded bg-blue-50 p-4 text-sm text-blue-800">
        <Activity size={16} className="mt-0.5 shrink-0" />
        <p>해당 병원 정보에 대한 수정 이력입니다.</p>
      </div>

      <table className="w-full overflow-hidden rounded-lg border text-left text-sm">
        <thead className="border-b bg-gray-50">
          <tr>
            <th className="px-4 py-3">일시</th>
            <th className="px-4 py-3">항목</th>
            <th className="px-4 py-3">변경 전</th>
            <th className="px-4 py-3">변경 후</th>
            <th className="px-4 py-3">담당자</th>
          </tr>
        </thead>

        <tbody className="divide-y">
          {histories.length === 0 ? (
            <tr>
              <td colSpan={4} className="px-4 py-6 text-center text-gray-400">
                변경 이력이 없습니다.
              </td>
            </tr>
          ) : (
            histories.map((h, idx) => (
              <tr key={idx} className="hover:bg-gray-50">
                {/* 일시 */}
                <td className="px-4 py-3 text-gray-500">
                  {new Date(h.createdAt).toLocaleString()}
                </td>
                {/* 처리 내역 */}
                <td className="px-4 py-3 font-medium">{h.modifySubject}</td>
                {/* 변경 전 */}
                <td className="px-4 py-3 text-xs text-red-700">
                  {h.beforeModify || '-'}
                </td>
                {/* 변경 후 */}
                <td className="px-4 py-3 text-blue-600">
                  {h.afterModify || '-'}
                </td>{' '}
                <td className="px-4 py-3 text-gray-600">
                  {h.actorId ?? '시스템'}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
