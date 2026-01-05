import { ChevronLeft, Handshake, MessageSquare } from 'lucide-react';
import { useMemo, useState } from 'react';

import { MOCK_CS } from '@/components/admin/mock/customerCenter.mock.js';
import Pagination from '@/components/admin/Pagination.jsx';

import { Badge } from '../ui/Badge';

const PAGE_SIZE = 10;

export default function CustomerCenterView() {
  const [subTab, setSubTab] = useState('oneonone'); // oneonone | partnership
  const [selectedItem, setSelectedItem] = useState(null);
  const [page, setPage] = useState(1);

  /* =========================
     상태 → Badge 색상 분기
  ========================= */
  const getStatusColor = (status) => {
    switch (status) {
      case '대기':
        return 'yellow';
      case '완료':
        return 'green';
      default:
        return 'gray';
    }
  };

  /* =========================
     탭별 필터
  ========================= */
  const filteredList = useMemo(
    () =>
      MOCK_CS.filter((item) =>
        subTab === 'oneonone' ? item.type === '1:1' : item.type === '제휴'
      ),
    [subTab]
  );

  /* =========================
     페이징 처리
  ========================= */
  const totalPages = Math.ceil(filteredList.length / PAGE_SIZE);

  const pagedList = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return filteredList.slice(start, start + PAGE_SIZE);
  }, [filteredList, page]);

  /* =========================
     상세 화면
  ========================= */
  if (selectedItem) {
    return (
      <div className="animate-in fade-in space-y-4 duration-300">
        <button
          onClick={() => setSelectedItem(null)}
          className="flex items-center text-sm text-gray-500 hover:text-gray-800"
        >
          <ChevronLeft size={16} className="mr-1" />
          목록으로 돌아가기
        </button>

        <h2 className="text-2xl font-bold text-gray-800">
          문의 상세 ({subTab === 'oneonone' ? '1:1 문의' : '제휴 문의'})
        </h2>

        <div className="space-y-6 rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <div className="border-b pb-4">
            <h3 className="mb-2 text-xl font-bold">{selectedItem.title}</h3>
            <p className="text-sm text-gray-500">
              작성자: {selectedItem.author} | 작성일: {selectedItem.date} |
              상태:{' '}
              <Badge color={getStatusColor(selectedItem.status)}>
                {selectedItem.status}
              </Badge>
            </p>
          </div>

          <div className="min-h-[100px] rounded bg-gray-50 p-4 text-sm leading-relaxed">
            {selectedItem.content}
          </div>

          <div className="pt-4">
            <h4 className="mb-2 text-sm font-bold">관리자 답변 작성</h4>
            <textarea
              className="mb-3 h-32 w-full rounded border border-gray-300 p-3 text-sm outline-none focus:ring-2 focus:ring-blue-100"
              placeholder="답변을 입력하세요..."
            />
            <div className="flex justify-end">
              <button className="rounded bg-blue-600 px-6 py-2 text-sm text-white hover:bg-blue-700">
                답변 전송 및 처리 완료
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* =========================
     목록 화면
  ========================= */
  return (
    <div className="animate-in fade-in space-y-6 duration-500">
      <h2 className="text-2xl font-bold text-gray-800">고객센터</h2>

      {/* 탭 */}
      <div className="flex border-b border-gray-200">
        <button
          onClick={() => {
            setSubTab('oneonone');
            setPage(1);
          }}
          className={`px-6 py-3 text-sm font-medium ${
            subTab === 'oneonone'
              ? 'border-b-2 border-blue-600 text-blue-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          <MessageSquare className="mr-1 inline h-4 w-4" />
          1:1 고객 문의
        </button>
        <button
          onClick={() => {
            setSubTab('partnership');
            setPage(1);
          }}
          className={`px-6 py-3 text-sm font-medium ${
            subTab === 'partnership'
              ? 'border-b-2 border-purple-600 text-purple-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          <Handshake className="mr-1 inline h-4 w-4" />
          기업 제휴 문의
        </button>
      </div>

      {/* 테이블 */}
      <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="w-20 px-6 py-3">no</th>
              <th className="w-24 px-6 py-3">상태</th>
              <th className="w-32 px-6 py-3">작성자</th>
              <th className="w-32 px-6 py-3">작성일</th>
              <th className="px-6 py-3">제목 및 내용</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {pagedList.map((item, i) => (
              <tr
                key={item.id}
                className="cursor-pointer border-gray-100 hover:bg-gray-50"
                onClick={() => setSelectedItem(item)}
              >
                <td className="px-6 py-4">{(page - 1) * PAGE_SIZE + i + 1}</td>
                <td className="px-6 py-4">
                  <Badge color={getStatusColor(item.status)}>
                    {item.status}
                  </Badge>
                </td>
                <td className="px-6 py-4 font-medium">{item.author}</td>
                <td className="px-6 py-4 text-gray-500">{item.date}</td>
                <td className="px-6 py-4">
                  <div className="font-medium text-gray-900">{item.title}</div>
                  <div className="max-w-lg truncate text-xs text-gray-500">
                    {item.content}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination  */}
        <div className="flex justify-center border-gray-100 bg-gray-50 py-4">
          <Pagination page={page} totalPages={totalPages} onChange={setPage} />
        </div>
      </div>
    </div>
  );
}
