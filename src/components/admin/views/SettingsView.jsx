import { Shield } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';

import api from '@/apis/api.jsx';
import Pagination from '@/components/admin/Pagination.jsx';
import { ConfirmModal } from '@/components/admin/ui/ConfirmModal.jsx';

export default function SettingsView() {
  const PAGE_SIZE = 10;

  const [page, setPage] = useState(1);
  const [admins, setAdmins] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);

  const [confirm, setConfirm] = useState({
    open: false,
    admin: null,
  });

  /* ================= 관리자 조회 ================= */
  const fetchAdmins = async () => {
    setLoading(true);
    try {
      const response = await api.get('/admin/user/search', {
        params: {
          userType: 'ROLE_ADMIN', // ✅ 관리자만 조회
          page: page - 1, // backend 0-base
          size: PAGE_SIZE,
        },
      });
      console.log(response);
      const data = response.data.data;
      setAdmins(data.content || []);
      setTotalPages(data.totalPages || 0);
    } catch (error) {
      console.error('관리자 조회 실패', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdmins();
  }, [page]);

  /* ================= 삭제 ================= */
  const openDeleteConfirm = (admin) => {
    setConfirm({ open: true, admin });
  };

  const handleDelete = async () => {
    try {
      await api.delete(`/admin/users/${confirm.admin.id}`);
      fetchAdmins(); // 삭제 후 재조회
    } catch (e) {
      console.error('관리자 삭제 실패', e);
    } finally {
      setConfirm({ open: false, admin: null });
    }
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
              <th className="w-[80px] px-6 py-4 text-center font-semibold">
                No
              </th>
              <th className="w-[30%] px-6 py-4 font-semibold">성함 / 아이디</th>
              <th className="px-6 py-4 font-semibold">이메일 주소</th>
              <th className="w-[120px] px-6 py-4 text-center font-semibold">
                계정 관리
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-50">
            {admins.map((adm, i) => (
              <tr key={adm.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-center font-bold text-gray-700">
                  {(page - 1) * PAGE_SIZE + i + 1}
                </td>

                <td className="px-6 py-4">
                  <div className="font-bold text-gray-700">{adm.nickname}</div>
                  {/*<div className="font-mono text-xs text-gray-400">*/}
                  {/*  ({adm.username})*/}
                  {/*</div>*/}
                </td>

                <td className="truncate px-6 py-4 text-gray-700">
                  {adm.email}
                </td>

                <td className="px-6 py-4 text-center">
                  <button
                    onClick={() => openDeleteConfirm(adm)}
                    className="rounded bg-red-50 px-3 py-1 text-red-500 hover:bg-red-100"
                  >
                    삭제
                  </button>
                </td>
              </tr>
            ))}

            {!loading && admins.length === 0 && (
              <tr>
                <td colSpan={4} className="py-10 text-center text-gray-400">
                  관리자 계정이 없습니다.
                </td>
              </tr>
            )}
          </tbody>
        </table>

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

      <ConfirmModal
        open={confirm.open}
        title="관리자 계정 삭제"
        message={`${confirm.admin?.name} (${confirm.admin?.username}) 계정을 삭제하시겠습니까?`}
        onConfirm={handleDelete}
        onCancel={() => setConfirm({ open: false, admin: null })}
      />
    </div>
  );
}
