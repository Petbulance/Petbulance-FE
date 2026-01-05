import { Shield, Trash2 } from 'lucide-react';
import { useMemo, useState } from 'react';

import { ADMIN_ACCOUNTS } from '@/components/admin/mock/adminAccounts.mock.js';
import Pagination from '@/components/admin/Pagination.jsx';
import { ConfirmModal } from '@/components/admin/ui/ConfirmModal.jsx';

export default function SettingsView() {
  const PAGE_SIZE = 10;
  const [page, setPage] = useState(1);

  const [confirm, setConfirm] = useState({
    open: false,
    admin: null,
  });

  const totalPages = Math.ceil(ADMIN_ACCOUNTS.length / PAGE_SIZE);

  const pagedAccounts = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return ADMIN_ACCOUNTS.slice(start, start + PAGE_SIZE);
  }, [page]);

  const openDeleteConfirm = (admin) => {
    setConfirm({ open: true, admin });
  };

  const handleDelete = () => {
    console.log('DELETE ADMIN:', confirm.admin);
    // TODO: API 삭제 호출
    setConfirm({ open: false, admin: null });
  };

  return (
    <div className="animate-in fade-in space-y-6 duration-500">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-xl font-bold">관리자 계정</h3>
      </div>
      <div className="mb-4 flex items-start gap-2 rounded bg-blue-50 p-4 text-sm text-blue-800">
        <Shield size={16} className="mt-0.5 shrink-0" />
        <p>
          모든 관리자 계정은 서비스 내 데이터 편집 및 최종 승인에 대해 Edit
          권한을 가지며, 보안을 위해 모든 행동은 로그에 기록됩니다.
        </p>
      </div>
      <div className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm">
        <table className="w-full table-fixed text-left text-sm">
          <thead className="border-b border-gray-100 bg-gray-50">
            <tr>
              <th className="w-[80px] px-6 py-4 text-center font-semibold text-gray-600">
                No
              </th>
              <th className="w-[30%] px-6 py-4 font-semibold text-gray-600">
                성함 / 아이디
              </th>
              <th className="px-6 py-4 font-semibold text-gray-600">
                이메일 주소
              </th>
              <th className="w-[120px] px-6 py-4 text-center font-semibold text-gray-600">
                계정 관리
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-50">
            {pagedAccounts.map((adm, i) => (
              <tr key={adm.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-center font-bold">
                  {(page - 1) * PAGE_SIZE + i + 1}
                </td>

                <td className="px-6 py-4">
                  <div className="font-bold">{adm.name}</div>
                  <div className="font-mono text-xs text-gray-400">
                    ({adm.id})
                  </div>
                </td>

                <td className="truncate px-6 py-4 text-gray-700">
                  {adm.email}
                </td>

                <td className="px-6 py-4 text-center">
                  <button
                    onClick={() => openDeleteConfirm(adm)}
                    className="inline-flex items-center gap-1 rounded-md bg-red-50 px-3 py-1 text-xs font-medium text-red-600 transition hover:bg-red-100"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

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

      {/* Confirm Modal */}
      <ConfirmModal
        open={confirm.open}
        title="관리자 계정 삭제"
        message={`${confirm.admin?.name} (${confirm.admin?.id}) 계정을 삭제하시겠습니까?`}
        onConfirm={handleDelete}
        onCancel={() => setConfirm({ open: false, admin: null })}
      />
    </div>
  );
}
