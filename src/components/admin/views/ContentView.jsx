import { Check, ChevronLeft, Upload } from 'lucide-react';
import { useMemo, useState } from 'react';

import { CONTENTS } from '@/components/admin/mock/contents.mock.js';
import Pagination from '@/components/admin/Pagination.jsx';

import { Badge } from '../ui/Badge';

const PAGE_SIZE = 10;

export default function ContentView() {
  const [subTab, setSubTab] = useState('banner'); // banner | notice
  const [isEditingContent, setIsEditingContent] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [page, setPage] = useState(1);

  /* =========================
     리스트 필터 & 페이징
  ========================= */
  const filteredList = useMemo(
    () => CONTENTS.filter((c) => c.type === subTab),
    [subTab]
  );

  const totalPages = Math.ceil(filteredList.length / PAGE_SIZE);

  const list = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return filteredList.slice(start, start + PAGE_SIZE);
  }, [page, filteredList]);

  /* =========================
     등록 / 수정 화면
  ========================= */
  if (isEditingContent) {
    return (
      <div className="animate-in fade-in space-y-4 duration-300">
        <button
          onClick={() => setIsEditingContent(false)}
          className="flex items-center text-sm text-gray-500 hover:text-gray-800"
        >
          <ChevronLeft size={16} className="mr-1" />
          목록으로 돌아가기
        </button>

        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-800">
            {subTab === 'banner' ? '배너' : '공지사항'}{' '}
            {selectedItem ? '수정' : '신규 등록'}
          </h2>
          <button
            onClick={() => setIsEditingContent(false)}
            className="rounded bg-blue-600 px-6 py-2 text-sm text-white hover:bg-blue-700"
          >
            저장
          </button>
        </div>

        <div className="space-y-6 rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium">분류</label>
              <select
                defaultValue={selectedItem?.category || '이벤트'}
                className="w-full rounded border border-gray-200 p-2 text-sm"
              >
                <option>이벤트</option>
                <option>공지</option>
                <option>광고</option>
              </select>
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium">상태</label>
              <div className="flex h-[38px] items-center gap-4">
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="radio"
                    name="status"
                    defaultChecked={selectedItem?.status !== '중단'}
                  />
                  게시
                </label>
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="radio"
                    name="status"
                    defaultChecked={selectedItem?.status === '중단'}
                  />
                  중단
                </label>
              </div>
            </div>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">제목</label>
            <input
              type="text"
              defaultValue={selectedItem?.title || ''}
              placeholder="제목을 입력하세요"
              className="w-full rounded border border-gray-200 p-2 text-sm"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">게시 기간</label>
            <div className="flex items-center gap-2">
              <input
                type="date"
                className="rounded border border-gray-200 p-2 text-sm"
              />
              <span>~</span>
              <input
                type="date"
                className="rounded border border-gray-200 p-2 text-sm"
              />
            </div>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">
              사진 및 파일 첨부
            </label>
            <div className="flex cursor-pointer flex-col items-center rounded-lg border-2 bg-gray-50 p-6 text-gray-400 hover:bg-gray-100">
              <Upload size={24} className="mb-2" />
              <span className="text-xs">클릭하여 파일 업로드</span>
            </div>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">본문 내용</label>
            <textarea
              rows={8}
              defaultValue={selectedItem?.content || ''}
              placeholder="내용을 입력하세요"
              className="w-full rounded border border-gray-200 p-2 text-sm"
            />
          </div>
        </div>
      </div>
    );
  }

  /* =========================
     리스트 화면
  ========================= */
  return (
    <div className="animate-in fade-in space-y-4 duration-500">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">콘텐츠 관리</h2>
        <button
          onClick={() => {
            setSelectedItem(null);
            setIsEditingContent(true);
          }}
          className="flex items-center gap-2 rounded bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700"
        >
          <Check size={16} /> 신규 등록
        </button>
      </div>

      <div className="flex border-gray-200">
        <button
          onClick={() => {
            setSubTab('banner');
            setPage(1);
          }}
          className={`px-6 py-3 text-sm font-medium ${
            subTab === 'banner'
              ? 'border-b-2 border-blue-600 text-blue-600'
              : 'text-gray-500'
          }`}
        >
          배너 관리
        </button>
        <button
          onClick={() => {
            setSubTab('notice');
            setPage(1);
          }}
          className={`px-6 py-3 text-sm font-medium ${
            subTab === 'notice'
              ? 'border-b-2 border-blue-600 text-blue-600'
              : 'text-gray-500'
          }`}
        >
          공지사항 관리
        </button>
      </div>

      <div className="overflow-hidden rounded-lg border border-gray-100 bg-white shadow-sm">
        <table className="w-full border-gray-100 text-sm">
          <thead className="border-gray-100 bg-gray-50">
            <tr>
              <th className="px-6 py-3">분류</th>
              <th className="px-6 py-3">제목</th>
              <th className="px-6 py-3">상태</th>
              <th className="px-6 py-3">관리</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {list.map((item) => (
              <tr key={item.id} className="border-gray-100 hover:bg-gray-50">
                <td className="px-6 py-4">{item.category}</td>
                <td className="px-6 py-4 font-medium">{item.title}</td>
                <td className="px-6 py-4">
                  <Badge color={item.status === '게시' ? 'green' : 'red'}>
                    {item.status}
                  </Badge>
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => {
                      setSelectedItem(item);
                      setIsEditingContent(true);
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

      <div className="flex justify-center">
        <Pagination page={page} totalPages={totalPages} onChange={setPage} />
      </div>
    </div>
  );
}
