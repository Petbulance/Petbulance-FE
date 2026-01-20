import { Check } from 'lucide-react';
import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { CONTENTS } from '@/components/admin/mock/contents.mock.js';
import Pagination from '@/components/admin/Pagination.jsx';

import { Badge } from '../../ui/Badge.jsx';

const PAGE_SIZE = 10;

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

export default function ContentView() {
  const [subTab, setSubTab] = useState('banner');
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  const filteredList = useMemo(
    () => CONTENTS.filter((c) => c.type === subTab),
    [subTab]
  );

  const totalPages = Math.ceil(filteredList.length / PAGE_SIZE);

  const list = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return filteredList.slice(start, start + PAGE_SIZE);
  }, [page, filteredList]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-3">
          <h2 className="text-2xl font-bold">공지/배너 통합 관리</h2>
          <div className="flex gap-2">
            {[
              { key: 'banner', label: '메인 배너' },
              { key: 'notice', label: '공지사항' },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => {
                  setSubTab(tab.key);
                  setPage(1);
                }}
                className={`rounded-full px-3 py-1 text-xs font-semibold transition-colors ${
                  subTab === tab.key
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
        <button
          onClick={() => navigate('/admin/content/create')}
          className="flex items-center gap-2 rounded bg-blue-600 px-4 py-2 text-sm text-white"
        >
          <Check size={16} /> 신규 등록
        </button>
      </div>

      <div className="overflow-hidden rounded-lg border bg-white">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-left">
            <tr>
              <th className="px-6 py-3">분류</th>
              <th className="px-6 py-3">제목</th>
              <th className="px-6 py-3">작성일</th>
              <th className="px-6 py-3">상태</th>
              <th className="px-6 py-3">관리</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {list.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <StatusBadge status={item.category} />
                </td>
                <td className="px-6 py-4 font-medium">
                  <div className="flex items-center gap-2">
                    {item.isBanner && (
                      <span className="rounded border border-indigo-200 bg-indigo-100 px-1.5 py-0.5 text-[10px] font-bold text-indigo-700">
                        MAIN BANNER
                      </span>
                    )}
                    {item.title}
                  </div>
                </td>
                <td className="px-6 py-4 text-gray-500">{item.createdAt}</td>
                <td className="px-6 py-4">
                  <Badge color={item.status === '게시' ? 'green' : 'red'}>
                    {item.status}
                  </Badge>
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => navigate(`/admin/content/${item.id}`)}
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

      <div className="flex justify-center">
        <Pagination page={page} totalPages={totalPages} onChange={setPage} />
      </div>
    </div>
  );
}
