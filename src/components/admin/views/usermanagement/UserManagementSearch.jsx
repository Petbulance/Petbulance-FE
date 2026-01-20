import { Search } from 'lucide-react';

export default function UserManagementSearch() {
  return (
    <>
      <div className="flex flex-wrap items-center gap-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
        <div className="flex w-64 items-center gap-2 rounded border bg-gray-50 px-3 py-2">
          <Search size={18} className="text-gray-400" />
          <input
            type="text"
            placeholder="닉네임/이메일 검색"
            className="w-full bg-transparent text-sm outline-none"
          />
        </div>

        <div className="mx-2 h-6 w-px bg-gray-300"></div>
        <select className="rounded border bg-white px-3 py-2 text-sm">
          <option>가입경로 전체</option>
          <option>네이버</option>
          <option>카카오</option>
          <option>구글</option>
        </select>
        <select className="rounded border bg-white px-3 py-2 text-sm">
          <option>상태 전체</option>
          <option>정상</option>
          <option>후기정지</option>
          <option>커뮤정지</option>
          <option>후기+커뮤정지</option>
        </select>
        <button className="rounded bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700">
          검색
        </button>
      </div>
    </>
  );
}
