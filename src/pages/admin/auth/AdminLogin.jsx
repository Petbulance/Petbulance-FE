import { ArrowRight, Lock, Mail } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import api from '@/apis/api.jsx';
import useAdminStore from '@/stores/useAdminStore.js';

export default function AdminLogin() {
  const [adminId, setAdminId] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const setAdminProfile = useAdminStore((state) => state.setAdminProfile);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    const payload = {
      username: adminId,
      password: password,
    };
    console.log(payload);
    try {
      const response = await api.post('/admin/login', payload);
      console.log(response);
      const data = response?.data?.data ?? {};
      const token = data.access_token;

      if (token) {
        localStorage.setItem('access_token', token);
      }

      const adminSource = data.admin ?? data.profile ?? data.user ?? data;
      const adminProfile = {
        nickname: adminSource?.nickname ?? '',
        username: adminSource?.username ?? adminId,
      };
      setAdminProfile(adminProfile);

      setTimeout(() => navigate('/admin'), 500);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 via-white to-indigo-50 px-4">
      <div className="w-full max-w-md rounded-3xl border border-gray-100 bg-white p-8 shadow-xl">
        {/* 헤더 */}
        <div className="mb-8 space-y-1 text-center">
          <h1 className="text-3xl font-black text-gray-800">
            PETBULANCE 관리자
          </h1>
        </div>

        {/* 로그인 폼 */}
        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* 이메일 */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-500">이메일</label>
            <div className="relative">
              <Mail className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <input
                // type=""
                value={adminId}
                onChange={(e) => setAdminId(e.target.value)}
                className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pr-3 pl-9 text-sm focus:ring-4 focus:ring-blue-100 focus:outline-none"
                placeholder="admin@example.com"
                required
              />
            </div>
          </div>

          {/* 비밀번호 */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-500">비밀번호</label>
            <div className="relative">
              <Lock className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pr-3 pl-9 text-sm focus:ring-4 focus:ring-blue-100 focus:outline-none"
                placeholder="비밀번호를 입력하세요"
                required
              />
            </div>
            {/* <div className="flex items-center justify-between text-xs text-gray-500">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="w-4 h-4 rounded border-gray-300" defaultChecked />
                로그인 상태 유지
              </label>
              <button type="button" className="text-blue-600 hover:underline">
                비밀번호 찾기
              </button>
            </div>*/}
          </div>

          {/* 버튼 */}
          <button
            type="submit"
            disabled={loading}
            className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#2DA969] py-3 font-black text-white shadow-lg shadow-blue-100 transition-all disabled:opacity-60"
          >
            {loading ? '로그인 중...' : '관리자 로그인'}
            <ArrowRight className="h-4 w-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
