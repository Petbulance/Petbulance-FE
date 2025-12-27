import { Search } from 'lucide-react';
import React, { useMemo, useState } from 'react';
import { Badge } from '@/components/admin/ui/Badge';
import { ConfirmModal } from '@/components/admin/ui/ConfirmModal.jsx';
import Pagination from '@/components/admin/Pagination.jsx';

export default function UserManagementView() {
  /* 소셜 아이콘 */
  const socialIcon = (provider) => {
    switch (provider) {
      case 'kakao':
        return (
          <span
            className="flex h-4 w-4 items-center justify-center rounded-sm bg-yellow-400 text-[8px] font-bold text-yellow-900">
            K
          </span>
        );
      case 'naver':
        return (
          <span
            className="flex h-4 w-4 items-center justify-center rounded-sm bg-green-500 text-[8px] font-bold text-white">
            N
          </span>
        );
      case 'google':
        return (
          <span
            className="flex h-4 w-4 items-center justify-center rounded-sm border bg-white text-[8px] font-bold text-blue-500">
            G
          </span>
        );
      default:
        return null;
    }
  };

  /* 상태 라벨 + 뱃지 색상 */
  const getStatusMeta = (type) => {
    switch (type) {
      case 'clean':
        return { label: '정상', color: 'green' };
      case 'review':
        return { label: '리뷰정지', color: 'yellow' };
      case 'comunity':
        return { label: '커뮤정지', color: 'purple' };
      case 'all':
        return { label: '리뷰 + 커뮤 정지', color: 'red' };
      default:
        return { label: '-', color: 'gray' };
    }
  };

  /* 목업 데이터 25개 */
  const USERS = Array.from({ length: 25 }).map((_, i) => {
    const providers = ['kakao', 'naver', 'google'];
    const types = ['clean', 'review', 'comunity', 'all'];

    return {
      name: `유저${i + 1}`,
      email: `user${i + 1}@test.com`,
      provider: providers[i % providers.length],
      date: `2024.03.${String((i % 28) + 1).padStart(2, '0')}`,
      type: types[i % types.length],
      reviews: i % 7,
    };
  });

  const [confirm, setConfirm] = useState({
    open: false,
    action: null,
    user: null,
  });
  const PAGE_SIZE = 10;
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(USERS.length / PAGE_SIZE);

  const pagedUsers = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return USERS.slice(start, start + PAGE_SIZE);
  }, [page, USERS]);
  const openConfirm = (action, user) => {
    setConfirm({ open: true, action, user });
  };
  const handleConfirm = () => {
    const { action, user } = confirm;

    console.log('CONFIRM ACTION:', action, user);
    // TODO: API 호출 위치
    // ex) api.post('/admin/user/action', { userId: user.id, action })

    setConfirm({ open: false, action: null, user: null });
  };
  return (
    <div className="animate-in fade-in space-y-6 duration-500">
      {/* 검색 영역 */}
      <div className="flex items-end gap-4 rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
        <div className="w-[40%] space-y-1">
          <div
            className="flex items-center gap-2 rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 focus-within:border-green-500 focus-within:ring-2 focus-within:ring-green-200 transition">
            <Search className="h-4 w-4 text-gray-400" />
            <input
              className="w-full bg-transparent text-sm outline-none"
              placeholder="닉네임/이메일 검색"
            />
          </div>
        </div>

        <select
          className="rounded-lg border border-gray-200 bg-gray-50 px-4 py-2 text-sm focus:border-green-500 focus:ring-2 focus:ring-green-200 focus:outline-none transition">
          <option>가입경로 전체</option>
          <option>카카오</option>
          <option>네이버</option>
          <option>구글</option>
        </select>

        <button className="rounded-lg bg-blue-600 px-6 py-2 text-sm font-bold text-white hover:bg-blue-700 transition">
          검색
        </button>
      </div>

      {/* 테이블 */}
      <div className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-gray-100 bg-gray-50">
          <tr>
            <th className="px-6 py-4 font-semibold text-gray-600">no</th>
            <th className="px-6 py-4 font-semibold text-gray-600">유저 정보</th>
            <th className="px-6 py-4 font-semibold text-gray-600">가입경로</th>
            <th className="px-6 py-4 font-semibold text-gray-600">가입일</th>
            <th className="px-6 py-4 font-semibold text-gray-600">
              상태 (누적경고)
            </th>
            <th className="px-6 py-4 font-semibold text-gray-600">
              관리조치
            </th>
          </tr>
          </thead>

          <tbody className="divide-y divide-gray-50">
          {pagedUsers.map((u, i) => {
            const status = getStatusMeta(u.type);

            return (
              <tr key={i} className="transition-colors hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="font-bold">
                    {(page - 1) * PAGE_SIZE + i + 1}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="font-bold">{u.name}</div>
                  <div className="text-xs text-gray-400">{u.email}</div>
                </td>

                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    {socialIcon(u.provider)}
                    <span className="text-xs capitalize">{u.provider}</span>
                  </div>
                </td>

                <td className="px-6 py-4 text-gray-500">{u.date}</td>

                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <Badge color={status.color}>
                      {status.label}
                    </Badge>
                    <span className="text-gray-500 text-xs">
                    경고 {u.reviews}건
                    </span>
                  </div>
                </td>

                <td className="px-6 py-4">
                  <div className="inline-flex flex-col gap-1">
                    {(u.type === 'review' || u.type === 'all') && (
                      <button
                        onClick={() => openConfirm('UNBLOCK_REVIEW', u)}
                        className="rounded-md bg-purple-50 px-3 py-1 text-xs font-medium text-purple-600 hover:bg-purple-100 transition"
                      >
                        후기 정지 해제
                      </button>
                    )}

                    {(u.type === 'comunity' || u.type === 'all') && (
                      <button
                        onClick={() => openConfirm('UNBLOCK_COMMUNITY', u)}
                        className="rounded-md bg-blue-50 px-3 py-1 text-xs font-medium text-blue-600 hover:bg-blue-100 transition"
                      >
                        커뮤 정지 해제
                      </button>
                    )}

                    <button
                      onClick={() => openConfirm('DELETE', u)}
                      className="rounded-md bg-red-50 px-3 py-1 text-xs font-medium text-red-600 hover:bg-red-100 transition"
                    >
                      탈퇴 처리
                    </button>
                  </div>
                </td>


              </tr>
            );
          })}

          </tbody>
        </table>
        <div className="flex items-center justify-center py-6">
          <Pagination
            page={page}
            totalPages={totalPages}
            onChange={setPage}
          />
        </div>
      </div>
      <ConfirmModal
        open={confirm.open}
        title={
          confirm.action === 'DELETE'
            ? '탈퇴 처리'
            : '정지 해제'
        }
        message={
          confirm.action === 'DELETE'
            ? '정말로 해당 유저를 탈퇴 처리하시겠습니까?'
            : '정말로 정지를 해제하시겠습니까?'
        }
        onConfirm={handleConfirm}
        onCancel={() =>
          setConfirm({ open: false, action: null, user: null })
        }
      />
    </div>

  );

}
