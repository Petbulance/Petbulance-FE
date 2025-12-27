import { Plus, Paperclip, ChevronRight } from 'lucide-react';
import React, { useState } from 'react';

import { Badge } from '../ui/Badge';

export default function ContentView() {
  const [mode, setMode] = useState('list');

  if (mode === 'edit') {
    return (
      <div className="animate-in slide-in-from-right-4 space-y-6 duration-500">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold">콘텐츠 등록/수정</h3>
          <button
            onClick={() => setMode('list')}
            className="text-sm text-gray-500 hover:underline"
          >
            목록으로 돌아가기
          </button>
        </div>
        <div className="space-y-6 rounded-2xl border bg-white p-8 shadow-sm">
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold">제목</label>
              <input
                className="w-full rounded-lg border bg-gray-50 p-3 text-sm"
                placeholder="제목을 입력하세요"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold">분류</label>
              <select className="w-full rounded-lg border bg-gray-50 p-3 text-sm">
                <option>공지사항</option>
                <option>이벤트</option>
                <option>배너광고</option>
              </select>
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold">대표 사진 및 파일 첨부</label>
            <div className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed bg-gray-50 p-10 text-gray-400 transition-all hover:bg-white">
              <Paperclip className="mb-2 h-10 w-10" />
              <p className="text-sm">파일을 드래그하거나 클릭하여 업로드</p>
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold">본문 내용</label>
            <textarea
              className="h-64 w-full rounded-xl border bg-gray-50 p-4 text-sm"
              placeholder="내용을 입력하세요..."
            />
          </div>
          <div className="flex justify-end gap-2">
            <button
              onClick={() => setMode('list')}
              className="rounded-lg border px-6 py-2 font-bold"
            >
              취소
            </button>
            <button
              onClick={() => setMode('list')}
              className="rounded-lg bg-blue-600 px-6 py-2 font-bold text-white"
            >
              저장 및 게시
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-in fade-in space-y-6 duration-500">
      <div className="flex items-end justify-between">
        <div className="flex w-fit border-b">
          <button className="border-b-2 border-blue-600 px-6 py-3 text-sm font-bold text-blue-600">
            배너 관리
          </button>
          <button className="px-6 py-3 text-sm font-medium text-gray-500">
            공지사항 관리
          </button>
        </div>
        <button
          onClick={() => setMode('edit')}
          className="flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-2 text-sm font-bold text-white"
        >
          <Plus className="h-4 w-4" /> 신규 등록
        </button>
      </div>
      <div className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-gray-100 bg-gray-50">
            <tr>
              <th className="px-6 py-4 font-semibold text-gray-600">제목</th>
              <th className="px-6 py-4 text-center font-semibold text-gray-600">
                분류
              </th>
              <th className="px-6 py-4 font-semibold text-gray-600">
                게시 기간
              </th>
              <th className="px-6 py-4 text-right font-semibold text-gray-600">
                관리
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {[
              {
                title: '봄맞이 특수동물 정기검진 배너',
                type: '배너',
                period: '24.05.01 ~ 24.05.31',
              },
              {
                title: '개인정보 처리방침 변경 안내',
                type: '공지',
                period: '상시게시',
              },
            ].map((c, i) => (
              <tr
                key={i}
                className="cursor-pointer hover:bg-gray-50"
                onClick={() => setMode('edit')}
              >
                <td className="px-6 py-4 font-medium">{c.title}</td>
                <td className="px-6 py-4 text-center">
                  <Badge color={c.type === '배너' ? 'purple' : 'blue'}>
                    {c.type}
                  </Badge>
                </td>
                <td className="px-6 py-4 text-xs text-gray-500">{c.period}</td>
                <td className="px-6 py-4 text-right">
                  <button className="text-gray-400 hover:text-blue-600">
                    <ChevronRight className="h-4 w-4" />
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
