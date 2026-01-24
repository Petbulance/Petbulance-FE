import { ChevronLeft, Clock } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import api from '@/apis/api.jsx';
import { StatusBadge } from '@/components/admin/ui/StatusBadge.jsx';

/* =========================
   유틸
========================= */
const SIGN_UP_PATH_LABEL = {
  NAVER: '네이버',
  KAKAO: '카카오',
  GOOGLE: '구글',
};

const ACTION_LABEL = {
  COMMUNITY_BAN: '커뮤니티 정지',
  REVIEW_BAN: '후기 정지',
  WARNING: '경고',
};

const formatDate = (iso) => (iso ? new Date(iso).toLocaleString('ko-KR') : '-');

export default function UserManagementDetail() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [userTab, setUserTab] = useState('info');
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  /* =========================
     API 조회
  ========================= */
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get(`/admin/user/${id}`);
        setUser(res.data.data);
      } catch (error) {
        console.error(error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  /* =========================
     로딩 / 에러
  ========================= */
  if (loading) {
    return <div className="text-sm text-gray-500">로딩 중...</div>;
  }

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

  /* =========================
     렌더링
  ========================= */
  return (
    <div className="space-y-4">
      <button
        onClick={() => navigate('/admin/users')}
        className="flex items-center text-sm text-gray-500 hover:text-gray-800"
      >
        <ChevronLeft size={16} /> 목록으로 돌아가기
      </button>

      <div className="flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
        {/* 헤더 */}
        <div className="border-b px-6 pt-6 pb-0">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-gray-800">사용자 상세</h3>
              <span className="text-sm text-gray-500">
                가입 경로:{' '}
                {SIGN_UP_PATH_LABEL[user.signUpPath] ?? user.signUpPath}
              </span>
            </div>
            <StatusBadge status={user.userStatus} />
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

        {/* 콘텐츠 */}
        <div className="p-6">
          {userTab === 'info' ? (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <Info
                  label="가입 경로"
                  value={SIGN_UP_PATH_LABEL[user.signUpPath] ?? user.signUpPath}
                />
                <Info label="가입일" value={formatDate(user.signUpTime)} />
                <Info
                  label="누적 경고 수"
                  value={`${user.warningCount}회`}
                  highlight
                />
                <Info label="계정 상태" value={user.userStatus} />
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
                  {user.reportInfo.length === 0 ? (
                    <tr>
                      <td
                        colSpan={4}
                        className="py-6 text-center text-gray-400"
                      >
                        제재 이력이 없습니다.
                      </td>
                    </tr>
                  ) : (
                    user.reportInfo.map((history, idx) => (
                      <tr key={idx} className="hover:bg-gray-50">
                        <td className="px-4 py-3 text-gray-500">
                          {formatDate(history.reportTime)}
                        </td>
                        <td className="px-4 py-3 font-medium text-red-600">
                          {ACTION_LABEL[history.actionContent] ??
                            history.actionContent}
                        </td>
                        <td className="px-4 py-3">{history.actionReason}</td>
                        <td className="px-4 py-3">{history.adminId}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* =========================
   공용 Info 컴포넌트
========================= */
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
