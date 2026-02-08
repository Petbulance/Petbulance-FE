import { RotateCcw, Search } from 'lucide-react';

export default function UserManagementSearch({
  search,
  onChange,
  onSearch,
  onReset,
}) {
  return (
    <div className="flex flex-wrap items-center gap-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
      {/* 키워드 */}
      <div className="flex w-64 items-center gap-2 rounded border bg-gray-50 px-3 py-2">
        <Search size={18} className="text-gray-400" />
        <input
          type="text"
          placeholder="닉네임/이메일 검색"
          value={search.keyword}
          onChange={(e) => onChange({ ...search, keyword: e.target.value })}
          className="w-full bg-transparent text-sm outline-none"
        />
      </div>

      <div className="mx-2 h-6 w-px bg-gray-300"></div>

      {/* 가입 경로 */}
      <select
        value={search.provider}
        onChange={(e) => onChange({ ...search, provider: e.target.value })}
        className="rounded border bg-white px-3 py-2 text-sm"
      >
        <option value="ALL">가입경로 전체</option>
        <option value="NAVER">네이버</option>
        <option value="KAKAO">카카오</option>
        <option value="GOOGLE">구글</option>
      </select>

      {/* 상태 */}
      <select
        value={search.status}
        onChange={(e) => onChange({ ...search, status: e.target.value })}
        className="rounded border bg-white px-3 py-2 text-sm"
      >
        <option value="ALL">상태 전체</option>
        <option value="NORMAL">정상</option>
        <option value="REVIEW_BAN">후기정지</option>
        <option value="COMMUNITY_BAN">커뮤정지</option>
        <option value="ALL_BAN">후기+커뮤정지</option>
      </select>

      <button
        onClick={onSearch}
        className="rounded bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700"
      >
        검색
      </button>

      <button
        onClick={onReset}
        className="flex items-center gap-2 rounded border border-gray-300 bg-white px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
      >
        <RotateCcw size={14} />
        초기화
      </button>
    </div>
  );
}
