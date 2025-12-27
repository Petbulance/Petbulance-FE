import { ShieldCheck, Lock, Mail, ArrowRight, Hospital } from 'lucide-react';
import React, { useState } from 'react';

export default function Login({ navigate, onLogin }) {
  const [email, setEmail] = useState('admin@petbulance.com');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    setTimeout(() => {
      onLogin();
      navigate('/index/admin');
    }, 500);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 via-white to-indigo-50 px-4">
      <div className="grid w-full max-w-5xl grid-cols-1 overflow-hidden rounded-3xl border border-gray-100 bg-white/80 shadow-xl backdrop-blur-xl lg:grid-cols-2">
        <div className="hidden flex-col justify-between bg-gradient-to-br from-blue-600 to-indigo-700 p-10 text-white lg:flex">
          <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-white/20 p-3">
              <Hospital className="h-8 w-8" />
            </div>
            <div>
              <p className="text-xs font-semibold tracking-[0.2em] text-white/70 uppercase">
                Petbulance Admin
              </p>
              <h2 className="text-2xl font-black tracking-tight">
                서비스 운영 대시보드
              </h2>
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="text-3xl leading-tight font-black">
              안전하고 효율적인 <br />
              반려동물 케어 플랫폼을 운영하세요.
            </h3>
            <p className="text-sm leading-relaxed text-white/80">
              관리자 계정으로 로그인하여 병원 관리, 리뷰 검수, 커뮤니티 모니터링
              등 핵심 기능을 빠르게 수행할 수 있습니다.
            </p>
            <div className="flex items-center gap-3 text-sm font-semibold">
              <ShieldCheck className="h-5 w-5" />
              <span>2-Step 인증 및 실시간 활동 로그 제공</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-10 lg:p-12">
          <div className="mb-8 space-y-1">
            <p className="text-xs font-semibold tracking-[0.2em] text-blue-600 uppercase">
              Admin Login
            </p>
            <h1 className="text-3xl font-black text-gray-800">
              PETBULANCE 관리자{' '}
            </h1>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-500">이메일</label>
              <div className="relative">
                <Mail className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pr-3 pl-9 text-sm focus:ring-4 focus:ring-blue-100 focus:outline-none"
                  placeholder="admin@example.com"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-500">
                비밀번호
              </label>
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
              <div className="flex items-center justify-between text-xs text-gray-500">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300"
                    defaultChecked
                  />
                  <span>로그인 상태 유지</span>
                </label>
                <button type="button" className="text-blue-600 hover:underline">
                  비밀번호 찾기
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-3 font-black text-white shadow-lg shadow-blue-100 transition-all hover:bg-blue-700 disabled:opacity-60"
            >
              {loading ? '로그인 중...' : '관리자 로그인'}{' '}
              <ArrowRight className="h-4 w-4" />
            </button>
          </form>

          <div className="mt-8 rounded-xl border border-gray-100 bg-gray-50 p-4 text-xs leading-relaxed text-gray-500">
            본 서비스는 등록된 관리자 계정만 접근 가능합니다. 로그인 시 보안
            정책에 따라 활동 로그가 기록됩니다.
          </div>
        </div>
      </div>
    </div>
  );
}
