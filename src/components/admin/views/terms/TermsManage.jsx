import { Check } from 'lucide-react';
import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { TERMS } from '@/components/admin/mock/terms.mock.js';
import Pagination from '@/components/admin/Pagination.jsx';

const PAGE_SIZE = 10;

export default function TermsManage() {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);

  const totalPages = Math.ceil(TERMS.length / PAGE_SIZE);
  const list = useMemo(
    () => TERMS.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE),
    [page]
  );

  const StatusBadge = ({ status }) => {
    const styles = {
      정상: 'bg-green-100 text-green-800',
      게시: 'bg-green-100 text-green-800',
      처리: 'bg-green-100 text-green-800',
      성공: 'bg-blue-100 text-blue-800',
      대기: 'bg-yellow-100 text-yellow-800',
      신고: 'bg-orange-100 text-orange-800',
      삭제: 'bg-red-100 text-red-800',
      중단: 'bg-red-100 text-red-800',
      실패: 'bg-red-100 text-red-800',
      후기정지: 'bg-purple-100 text-purple-800',
      커뮤정지: 'bg-purple-100 text-purple-800',
      '후기+커뮤정지': 'bg-gray-800 text-white',
      시행중: 'bg-green-100 text-green-800',
      예정: 'bg-blue-100 text-blue-800',
      만료: 'bg-gray-200 text-gray-500',
      // 공지사항 분류용
      이벤트: 'bg-pink-100 text-pink-800',
      공지: 'bg-gray-100 text-gray-800',
      광고: 'bg-blue-100 text-blue-800',
    };
    const defaultStyle = 'bg-gray-100 text-gray-800';
    return (
      <span
        className={`rounded-full px-2 py-1 text-xs font-semibold ${styles[status] || defaultStyle}`}
      >
        {status}
      </span>
    );
  };
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">약관 관리</h2>
        <button
          onClick={() => navigate('/admin/terms/create')}
          className="flex items-center gap-2 rounded bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700"
        >
          <Check size={16} /> 신규 버전 등록
        </button>
      </div>

      <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="border-b bg-gray-50">
            <tr>
              <th className="px-6 py-3">약관 유형</th>
              <th className="px-6 py-3">버전</th>
              <th className="px-6 py-3">시행일</th>
              <th className="px-6 py-3">상태</th>
              <th className="px-6 py-3">등록일/등록자</th>
              <th className="px-6 py-3">관리</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {list.map((term) => (
              <tr key={term.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 font-medium">{term.title}</td>
                <td className="px-6 py-4">{term.version}</td>
                <td className="px-6 py-4">{term.startedAt}</td>
                <td className="px-6 py-4">
                  <StatusBadge status={term.status} />
                </td>
                <td className="px-6 py-4 text-xs text-gray-500">
                  {term.updatedAt} ({term.author})
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => navigate(`/admin/terms/${term.id}`)}
                    className="text-blue-600 hover:underline"
                  >
                    수정
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 페이징 (정중앙) */}
      <div className="flex justify-center">
        <Pagination page={page} totalPages={totalPages} onChange={setPage} />
      </div>
    </div>
  );
}
