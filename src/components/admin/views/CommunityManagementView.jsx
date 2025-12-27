import { Flag, Slash, AlertTriangle, Plus, XCircle } from 'lucide-react';
import React, { useState } from 'react';

import { Badge } from '../ui/Badge';

export default function CommunityManagementView() {
  const [activeTab, setActiveTab] = useState('reports');

  const reportList = [
    {
      id: 1,
      type: '게시글',
      content: '이 병원 정말 비추합니다...',
      reason: '비방/욕설',
      reporter: '앵무새아빠',
      author: '도마뱀집사',
      date: '5분 전',
      status: '대기',
    },
    {
      id: 2,
      type: '댓글',
      content: '너나 잘하세요 ㅋㅋㅋ',
      reason: '부적절한 언행',
      reporter: '나나맘',
      author: '구글매니아',
      date: '2시간 전',
      status: '완료',
    },
    {
      id: 3,
      type: '게시글',
      content: '광고) 최저가 파충류 사료...',
      reason: '스팸/홍보',
      reporter: '도마뱀집사',
      author: '홍보로봇',
      date: '3시간 전',
      status: '대기',
    },
  ];

  const forbiddenWords = ['바보', '멍청이', '비추천', '광고글', '스팸단어'];

  return (
    <div className="animate-in fade-in space-y-6 duration-500">
      <div className="flex border-b border-gray-200">
        <button
          onClick={() => setActiveTab('reports')}
          className={`flex items-center gap-2 px-8 py-4 text-sm font-bold transition-all ${activeTab === 'reports' ? 'border-b-4 border-red-600 bg-red-50/30 text-red-600' : 'text-gray-400 hover:text-gray-600'}`}
        >
          <Flag className="h-4 w-4" /> 신고 관리
        </button>
        <button
          onClick={() => setActiveTab('forbidden')}
          className={`flex items-center gap-2 px-8 py-4 text-sm font-bold transition-all ${activeTab === 'forbidden' ? 'border-b-4 border-indigo-600 bg-indigo-50/30 text-indigo-600' : 'text-gray-400 hover:text-gray-600'}`}
        >
          <Slash className="h-4 w-4" /> 금칙어 관리
        </button>
      </div>

      <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
        {activeTab === 'reports' ? (
          <table className="w-full text-left text-sm">
            <thead className="border-b border-gray-100 bg-gray-50">
              <tr>
                <th className="px-6 py-4 font-semibold text-gray-600">
                  신고 대상
                </th>
                <th className="px-6 py-4 font-semibold text-gray-600">
                  신고 사유
                </th>
                <th className="px-6 py-4 font-semibold text-gray-600">
                  신고자
                </th>
                <th className="px-6 py-4 font-semibold text-gray-600">
                  대상자
                </th>
                <th className="px-6 py-4 text-center font-semibold text-gray-600">
                  상태
                </th>
                <th className="px-6 py-4 text-right font-semibold text-gray-600">
                  조치
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {reportList.map((r) => (
                <tr key={r.id} className="transition-colors hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <div className="mb-1 flex items-center gap-1.5">
                        <Badge color={r.type === '게시글' ? 'purple' : 'blue'}>
                          {r.type}
                        </Badge>
                        <span className="font-mono text-[10px] text-gray-400">
                          {r.date}
                        </span>
                      </div>
                      <span className="line-clamp-1 font-medium">
                        {r.content}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-bold text-red-500">{r.reason}</span>
                  </td>
                  <td className="px-6 py-4 text-gray-500">{r.reporter}</td>
                  <td className="px-6 py-4 font-bold">{r.author}</td>
                  <td className="px-6 py-4 text-center">
                    <Badge color={r.status === '대기' ? 'yellow' : 'green'}>
                      {r.status}
                    </Badge>
                  </td>
                  <td className="space-x-2 px-6 py-4 text-right">
                    <button className="rounded border px-2 py-1 text-xs font-bold text-gray-400 hover:text-gray-600">
                      유지
                    </button>
                    <button className="rounded bg-red-500 px-3 py-1 text-xs font-bold text-white shadow-sm hover:bg-red-600">
                      삭제/차단
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="animate-in fade-in space-y-8 p-10 duration-300">
            <div className="max-w-xl">
              <h4 className="mb-4 flex items-center gap-2 text-sm font-black text-gray-700">
                <Plus className="h-4 w-4 text-indigo-600" /> 신규 금칙어 등록
              </h4>
              <div className="flex gap-2">
                <input
                  className="flex-1 rounded-xl border border-gray-200 p-3 text-sm outline-none focus:ring-4 focus:ring-indigo-100"
                  placeholder="추가할 금칙어를 입력하세요..."
                />
                <button className="rounded-xl bg-indigo-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-indigo-100 transition-all hover:bg-indigo-700">
                  등록하기
                </button>
              </div>
            </div>

            <div>
              <h4 className="mb-4 text-sm font-black text-gray-700">
                등록된 금칙어 목록 ({forbiddenWords.length})
              </h4>
              <div className="flex flex-wrap gap-3">
                {forbiddenWords.map((word, i) => (
                  <div
                    key={i}
                    className="group flex items-center gap-2 rounded-2xl border border-gray-100 bg-gray-50 px-4 py-2 transition-all hover:border-red-200"
                  >
                    <span className="text-sm font-medium text-gray-600">
                      {word}
                    </span>
                    <button className="text-gray-300 transition-colors hover:text-red-500">
                      <XCircle className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="flex items-start gap-3 rounded-xl border border-red-100 bg-red-50 p-6">
        <AlertTriangle className="mt-0.5 h-5 w-5 flex-shrink-0 text-red-600" />
        <div>
          <h4 className="text-sm font-black text-red-800">
            커뮤니티 운영 원칙 가이드
          </h4>
          <p className="mt-1 text-xs leading-relaxed text-red-700">
            신고된 항목은 정보통신망법 및 서비스 이용약관에 의거하여
            처리해주시기 바랍니다. <br />
            누적 신고 3회 이상의 유저는 시스템 설정에서 계정 상태를 '차단'으로
            변경하여 서비스 이용을 제한할 수 있습니다.
          </p>
        </div>
      </div>
    </div>
  );
}
