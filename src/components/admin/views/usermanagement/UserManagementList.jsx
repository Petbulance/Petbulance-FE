import React from 'react';
import { useNavigate } from 'react-router-dom';

/* =====================
   Components
===================== */

const StatusBadge = ({ status }) => {
  const styles = {
    정상: 'bg-green-100 text-green-800',
    후기정지: 'bg-purple-100 text-purple-800',
    커뮤정지: 'bg-purple-100 text-purple-800',
    '후기+커뮤정지': 'bg-gray-800 text-white',
  };

  return (
    <span
      className={`rounded-full px-2 py-1 text-xs font-semibold ${styles[status] || 'bg-gray-100 text-gray-700'}`}
    >
      {status}
    </span>
  );
};

export default function UserManagementList({ users = [] }) {
  const navigate = useNavigate();

  const handleSelect = (userId) => {
    navigate(`/admin/users/${userId}`);
  };
  /* =====================
     리스트 화면
  ===================== */
  return (
    <div className="space-y-4">
      {/* Table */}
      <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="border-b bg-gray-50 font-medium text-gray-600">
            <tr>
              <th className="px-6 py-3">유저 정보</th>
              <th className="px-6 py-3">가입경로</th>
              <th className="px-6 py-3">가입일</th>
              <th className="px-6 py-3">상태 (누적경고)</th>
              <th className="px-6 py-3">상세</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {users.map((user) => (
              <tr
                key={user.id}
                className="cursor-pointer hover:bg-gray-50"
                onClick={() => handleSelect(user.id)}
              >
                <td className="px-6 py-4">
                  <div className="font-medium text-gray-900">
                    {user.nickname}
                  </div>
                  <div className="text-xs text-gray-500">{user.email}</div>
                </td>
                <td className="px-6 py-4">{user.path}</td>
                <td className="px-6 py-4">{user.date}</td>
                <td className="px-6 py-4">
                  <StatusBadge status={user.status} />
                  <span className="ml-2 text-xs text-gray-500">
                    경고 {user.warnings}회
                  </span>
                </td>
                <td className="px-6 py-4">
                  <button
                    className="text-xs text-blue-600 hover:underline"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSelect(user.id);
                    }}
                  >
                    상세보기
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
