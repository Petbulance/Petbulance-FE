import React from 'react';
import { useNavigate } from 'react-router-dom';

import { StatusBadge } from '@/components/admin/ui/StatusBadge.jsx';

/* =====================
   상태 변환
===================== */
const deriveUserStatus = ({ communityBan, reviewBan }) => {
  if (communityBan && reviewBan) return '후기 + 커뮤정지';
  if (reviewBan) return '후기정지';
  if (communityBan) return '커뮤정지';
  return '정상';
};

/* =====================
   가입경로 변환
===================== */
const mapSignUpPath = (path) => {
  console.log(path);
  switch (path) {
    case 'NAVER':
      return '네이버';
    case 'KAKAO':
      return '카카오';
    case 'GOOGLE':
      return '구글';
    default:
      return '-';
  }
};

export default function UserManagementList({ users = [] }) {
  const navigate = useNavigate();

  const handleSelect = (userId) => {
    navigate(`/admin/users/${userId}`);
  };

  return (
    <div className="space-y-4">
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
            {users.map((user) => {
              const status = deriveUserStatus(user);
              const signUpPath = mapSignUpPath(user.signUpPath);

              return (
                <tr
                  key={user.userId}
                  className="cursor-pointer hover:bg-gray-50"
                  onClick={() => handleSelect(user.userId)}
                >
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900">
                      {user.nickname}
                    </div>
                    <div className="text-xs text-gray-500">
                      {user.email || '-'}
                    </div>
                  </td>

                  <td className="px-6 py-4">{signUpPath}</td>

                  <td className="px-6 py-4">{user.createdAt || '-'}</td>

                  <td className="px-6 py-4">
                    <StatusBadge status={status} />
                    <span className="ml-2 text-xs text-gray-500">
                      경고 {user.warnings ?? 0}회
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    <button
                      className="text-xs text-blue-600 hover:underline"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSelect(user.userId);
                      }}
                    >
                      상세보기
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
