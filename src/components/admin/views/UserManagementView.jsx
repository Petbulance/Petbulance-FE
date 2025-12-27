import { Search } from 'lucide-react';
import React from 'react';

export default function UserManagementView() {
  const socialIcon = (provider) => {
    switch (provider) {
      case 'kakao':
        return (
          <span className="flex h-4 w-4 items-center justify-center rounded-sm bg-yellow-400 text-[8px] font-bold text-yellow-900">
            K
          </span>
        );
      case 'naver':
        return (
          <span className="flex h-4 w-4 items-center justify-center rounded-sm bg-green-500 text-[8px] font-bold text-white">
            N
          </span>
        );
      case 'google':
        return (
          <span className="flex h-4 w-4 items-center justify-center rounded-sm border bg-white text-[8px] font-bold text-blue-500">
            G
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="animate-in fade-in space-y-6 duration-500">
      <div className="flex items-end gap-4 rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
        <div className="max-sm flex-1 space-y-1">
          <label className="text-xs font-bold text-gray-400">
            유저 통합 검색
          </label>
          <div className="relative">
            <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              className="w-full rounded-lg border border-gray-200 bg-gray-50 py-2 pr-4 pl-9 text-sm"
              placeholder="닉네임, 이메일, UID 검색..."
            />
          </div>
        </div>
        <select className="rounded-lg border border-gray-200 bg-gray-50 px-4 py-2 text-sm">
          <option>모든 가입경로</option>
          <option>카카오</option>
          <option>네이버</option>
          <option>구글</option>
        </select>
        <button className="rounded-lg bg-blue-600 px-6 py-2 text-sm font-bold text-white">
          조회
        </button>
      </div>

      <div className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-gray-100 bg-gray-50">
            <tr>
              <th className="px-6 py-4 font-semibold text-gray-600">
                유저 정보
              </th>
              <th className="px-6 py-4 font-semibold text-gray-600">
                가입경로
              </th>
              <th className="px-6 py-4 font-semibold text-gray-600">가입일</th>
              <th className="px-6 py-4 font-semibold text-gray-600">활동량</th>
              <th className="px-6 py-4 text-right font-semibold text-gray-600">
                관리
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {[
              {
                name: '도마뱀집사',
                email: 'lizard@kakao.com',
                provider: 'kakao',
                date: '2024.01.12',
                reviews: 15,
                status: '정상',
              },
              {
                name: '앵무새아빠',
                email: 'parrot@naver.com',
                provider: 'naver',
                date: '2024.02.05',
                reviews: 2,
                status: '정상',
              },
              {
                name: '구글매니아',
                email: 'google@gmail.com',
                provider: 'google',
                date: '2024.03.20',
                reviews: 0,
                status: '정상',
              },
            ].map((u, i) => (
              <tr key={i} className="transition-colors hover:bg-gray-50">
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
                <td className="px-6 py-4 font-medium">{u.reviews}건</td>
                <td className="space-x-2 px-6 py-4 text-right">
                  <button className="rounded border border-red-100 bg-red-50 px-3 py-1 text-xs text-red-600 hover:bg-red-100">
                    탈퇴
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
