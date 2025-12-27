import React, { useState } from 'react';
import { Lock, Mail, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function AdminLogin() {
  const [adminId, setAdminId] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    setTimeout(() => {
      // onLogin();
      navigate('/admin');
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white border border-gray-100 shadow-xl rounded-3xl p-8">
        {/* 헤더 */}
        <div className="mb-8 text-center space-y-1">
          <h1 className="text-3xl font-black text-gray-800">
            PETBULANCE 관리자
          </h1>
        </div>

        {/* 로그인 폼 */}
        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* 이메일 */}
          <div className="space-y-2 ">
            <label className="text-xs font-bold text-gray-500">이메일</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                // type=""
                value={adminId}
                onChange={(e) => setAdminId(e.target.value)}
                className="w-full pl-9 pr-3 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:outline-none focus:ring-4 focus:ring-blue-100 text-sm"
                placeholder="admin@example.com"
                required
              />
            </div>
          </div>

          {/* 비밀번호 */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-500">비밀번호</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-9 pr-3 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:outline-none focus:ring-4 focus:ring-blue-100 text-sm"
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
            className="w-full flex items-center justify-center gap-2 bg-[#2DA969]  text-white font-black py-3 rounded-xl shadow-lg shadow-blue-100 transition-all disabled:opacity-60 cursor-pointer"
          >
            {loading ? '로그인 중...' : '관리자 로그인'}
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>


      </div>
    </div>
  );
}
