import { ChevronLeft, Clock } from 'lucide-react';
import React, { useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { MOCK_USERS, MOCK_USER_HISTORY } from '@/components/admin/views/usermanagement/mockData.js';

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

export default function UserManagementDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [userTab, setUserTab] = useState('info');

  const user = useMemo(
    () => MOCK_USERS.find((item) => String(item.id) === String(id)),
    [id],
  );

  if (!user) {
    return (
      <div className="space-y-4">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-sm text-gray-500 hover:text-gray-800"
        >
          <ChevronLeft size={16} /> 목록으로 돌아가기
        </button>
        <div className="rounded-lg border bg-white p-6 text-center text-sm text-gray-600">
          해당 유저 정보를 찾을 수 없습니다.
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <button
        onClick={() => navigate('/admin/users')}
        className="flex items-center text-sm text-gray-500 hover:text-gray-800"
      >
        <ChevronLeft size={16} /> 목록으로 돌아가기
      </button>
      <div className="flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
        <div className="border-b px-6 pt-6 pb-0">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-gray-800">{user.nickname}</h3>
              <span className="text-sm text-gray-500">{user.email}</span>
            </div>
            <StatusBadge status={user.status} />
          </div>
          <div className="flex gap-6">
            <button
              onClick={() => setUserTab('info')}
              className={`pb-3 text-sm font-medium ${
                userTab === 'info'
                  ? 'border-b-2 border-blue-600 text-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              기본 정보
            </button>
            <button
              onClick={() => setUserTab('history')}
              className={`pb-3 text-sm font-medium ${
                userTab === 'history'
                  ? 'border-b-2 border-blue-600 text-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              제재 이력
            </button>
          </div>
        </div>

        <div className="p-6">
          {userTab === 'info' ? (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    가입경로
                  </label>
                  <input
                    type="text"
                    readOnly
                    value={user.path}
                    className="w-full rounded border bg-gray-50 p-2 text-sm"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    가입일
                  </label>
                  <input
                    type="text"
                    readOnly
                    value={user.date}
                    className="w-full rounded border bg-gray-50 p-2 text-sm"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    누적 경고 수
                  </label>
                  <input
                    type="text"
                    readOnly
                    value={`${user.warnings}회`}
                    className="w-full rounded border bg-gray-50 p-2 text-sm font-bold text-red-500"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    계정 상태
                  </label>
                  <input
                    type="text"
                    readOnly
                    value={user.status}
                    className="w-full rounded border bg-gray-50 p-2 text-sm"
                  />
                </div>
              </div>
              <div className="border-t pt-4">
                <h4 className="mb-3 text-sm font-bold">관리 조치</h4>
                <div className="flex gap-2">
                  <button className="rounded bg-purple-50 px-4 py-2 text-sm text-purple-700 hover:bg-purple-100">
                    후기 정지 해제
                  </button>
                  <button className="rounded bg-indigo-50 px-4 py-2 text-sm text-indigo-700 hover:bg-indigo-100">
                    커뮤 정지 해제
                  </button>
                  <button className="rounded bg-red-50 px-4 py-2 text-sm text-red-600 hover:bg-red-100">
                    강제 탈퇴 처리
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="mb-4 flex items-start gap-2 rounded bg-red-50 p-4 text-sm text-red-800">
                <Clock size={16} className="mt-0.5 shrink-0" />
                <p>
                  해당 유저의 제재 및 상태 변경 이력입니다. 분쟁 발생 시 증빙
                  자료로 활용될 수 있습니다.
                </p>
              </div>
              <table className="w-full overflow-hidden rounded-lg border text-left text-sm">
                <thead className="border-b bg-gray-50">
                  <tr>
                    <th className="px-4 py-3">일시</th>
                    <th className="px-4 py-3">조치 내역</th>
                    <th className="px-4 py-3">상세 사유</th>
                    <th className="px-4 py-3">처리자</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {MOCK_USER_HISTORY.map((history) => (
                    <tr key={history.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-gray-500">{history.date}</td>
                      <td className="px-4 py-3 font-medium text-red-600">{history.action}</td>
                      <td className="px-4 py-3">{history.reason}</td>
                      <td className="px-4 py-3">{history.admin}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const Info = ({ label, value, highlight }) => (
  <div>
    <p className="mb-1 text-sm text-gray-500">{label}</p>
    <input
      readOnly
      value={value}
      className={`w-full rounded border bg-gray-50 p-2 text-sm ${
        highlight ? 'font-bold text-red-600' : ''
      }`}
    />
  </div>
);
