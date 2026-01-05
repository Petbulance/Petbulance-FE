import { ChevronLeft, Plus } from 'lucide-react';
import { useState } from 'react';

import TermsEditor from '@/components/admin/editor/TermsEditor.jsx';
import Pagination from '@/components/admin/Pagination.jsx';

import { Badge } from '../ui/Badge';

const PAGE_SIZE = 10;
// mock/terms.mock.js
export const TERMS = [
  {
    id: 1,
    type: 'SERVICE',
    title: '서비스 이용약관',
    required: true,
    status: '게시',
    version: 'v1.0',
    updatedAt: '2025-12-01',
    content: '<p>서비스 이용약관 내용...</p>',
  },
  {
    id: 2,
    type: 'PRIVACY',
    title: '펫뷸런스 개인정보 처리방침',
    required: true,
    status: '게시',
    version: 'v2.1',
    updatedAt: '2025-11-20',
    content: '<p>개인정보 처리방침 내용...</p>',
  },
  {
    id: 3,
    type: 'POLICY',
    title: '운영정책',
    required: true,
    status: '게시',
    version: 'v1.3',
    updatedAt: '2025-10-15',
    content: '<p>운영정책 내용...</p>',
  },
  {
    id: 4,
    type: 'LOCATION',
    title: '위치기반서비스 이용약관',
    required: false,
    status: '게시',
    version: 'v1.0',
    updatedAt: '2025-09-01',
    content: '<p>위치기반서비스 약관 내용...</p>',
  },
  {
    id: 5,
    type: 'MARKETING',
    title: '마케팅 정보 수신 동의 약관',
    required: false,
    status: '중단',
    version: 'v1.2',
    updatedAt: '2025-08-10',
    content: '<p>마케팅 수신 동의 내용...</p>',
  },
];

export default function TermsManage() {
  const [isEditing, setIsEditing] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [page, setPage] = useState(1);

  const [editTitle, setEditTitle] = useState('');
  const [editRequired, setEditRequired] = useState(true);
  const [editContent, setEditContent] = useState('');

  const totalPages = Math.ceil(TERMS.length / PAGE_SIZE);
  const list = TERMS.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  /* =========================
     등록 / 수정 화면
  ========================= */
  if (isEditing) {
    const isNew = !selectedItem;

    return (
      <div className="space-y-4">
        <button
          onClick={() => setIsEditing(false)}
          className="flex items-center text-sm text-gray-500"
        >
          <ChevronLeft size={16} className="mr-1" />
          목록으로 돌아가기
        </button>

        <h2 className="text-2xl font-bold">
          {isNew ? '약관 등록' : '약관 수정'}
        </h2>

        <div className="space-y-4 rounded-lg border bg-white p-6">
          {/* 약관명 */}
          <div>
            <label className="mb-1 block text-sm font-medium">약관명</label>
            <input
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              placeholder="약관명을 입력하세요"
              className="w-full rounded border p-2 text-sm"
            />
          </div>

          {/* 필수 여부 */}
          <div>
            <label className="mb-1 block text-sm font-medium">필수 여부</label>
            <select
              value={editRequired ? '필수' : '선택'}
              onChange={(e) => setEditRequired(e.target.value === '필수')}
              className="w-full rounded border p-2 text-sm"
            >
              <option>필수</option>
              <option>선택</option>
            </select>
          </div>

          {/* 약관 내용 */}
          <div>
            <label className="mb-1 block text-sm font-medium">약관 내용</label>
            <TermsEditor value={editContent} onChange={setEditContent} />
          </div>

          {/* 저장 */}
          <div className="flex justify-end">
            <button
              onClick={() => {
                const payload = {
                  title: editTitle,
                  required: editRequired,
                  content: editContent,
                };

                console.log(isNew ? 'CREATE TERMS' : 'UPDATE TERMS', payload);
                // TODO:
                // POST /admin/terms
                // PUT  /admin/terms/{id}

                setIsEditing(false);
              }}
              className="rounded bg-blue-600 px-6 py-2 text-sm text-white"
            >
              저장
            </button>
          </div>
        </div>
      </div>
    );
  }

  /* =========================
     리스트 화면
  ========================= */
  return (
    <div className="space-y-4">
      {/* 헤더 */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">약관 관리</h2>

        <button
          onClick={() => {
            setSelectedItem(null);
            setEditTitle('');
            setEditRequired(true);
            setEditContent('');
            setIsEditing(true);
          }}
          className="flex items-center gap-2 rounded bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700"
        >
          <Plus size={16} />
          등록
        </button>
      </div>

      {/* 테이블 */}
      <div className="overflow-hidden rounded-lg border bg-white">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-center align-middle">no</th>
              <th className="px-6 py-3 text-center align-middle">약관명</th>
              <th className="px-6 py-3 text-center align-middle">필수 여부</th>
              <th className="px-6 py-3 text-center align-middle">버전</th>
              <th className="px-6 py-3 text-center align-middle">관리</th>
            </tr>
          </thead>

          <tbody className="divide-y">
            {list.map((item) => (
              <tr key={item.id} className="h-[56px]">
                <td className="px-6 py-4 text-center align-middle font-medium">
                  {item.id}
                </td>
                <td className="px-6 py-4 text-center align-middle font-medium">
                  {item.title}
                </td>
                <td className="px-6 py-4 text-center align-middle">
                  <Badge color={item.required ? 'blue' : 'gray'}>
                    {item.required ? '필수' : '선택'}
                  </Badge>
                </td>
                <td className="px-6 py-4 text-center align-middle">
                  {item.version}
                </td>
                <td className="px-6 py-4 text-center align-middle">
                  <button
                    onClick={() => {
                      setSelectedItem(item);
                      setEditTitle(item.title);
                      setEditRequired(item.required);
                      setEditContent(item.content);
                      setIsEditing(true);
                    }}
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
