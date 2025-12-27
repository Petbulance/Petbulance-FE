import {
  Flag,
  Slash,
  AlertTriangle,
  Plus,
  XCircle,
} from 'lucide-react';
import React, { useState } from 'react';

import { Badge } from '../ui/Badge';
import Pagination from '@/components/admin/Pagination.jsx';
import { COMMUNITY_REPORTS } from '@/components/admin/mock/communityReports.mock';

const PAGE_SIZE = 10;

export default function CommunityManagementView() {
  const [activeTab, setActiveTab] = useState('reports');
  const [page, setPage] = useState(1);

  const totalPages = Math.ceil(COMMUNITY_REPORTS.length / PAGE_SIZE);
  const pagedList = COMMUNITY_REPORTS.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE
  );

  const forbiddenWords = [
    '바보',
    '멍청이',
    '비추천',
    '광고글',
    '스팸단어',
  ];

  return (
    <div className="animate-in fade-in space-y-6 duration-500">

      {/* 탭 */}
    {/*  <div className="flex border-b border-gray-200">
        <button
          onClick={() => setActiveTab('reports')}
          className={`flex items-center gap-2 px-8 py-4 text-sm font-bold ${
            activeTab === 'reports'
              ? 'border-b-4 border-red-600 bg-red-50/30 text-red-600'
              : 'text-gray-400 hover:text-gray-600'
          }`}
        >
          <Flag className="h-4 w-4" /> 신고 관리
        </button>

        <button
          onClick={() => setActiveTab('forbidden')}
          className={`flex items-center gap-2 px-8 py-4 text-sm font-bold ${
            activeTab === 'forbidden'
              ? 'border-b-4 border-indigo-600 bg-indigo-50/30 text-indigo-600'
              : 'text-gray-400 hover:text-gray-600'
          }`}
        >
          <Slash className="h-4 w-4" /> 금칙어 관리
        </button>
      </div>*/}

      {/* ================= 신고 관리 ================= */}
      {activeTab === 'reports' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-800">
              커뮤니티 관리
            </h2>
         {/*   <span className="text-xs text-gray-500">
              최신순 10개씩 보기
            </span>*/}
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <table className="w-full text-sm text-left table-fixed">
              <thead className="bg-gray-50 border-b">
              <tr>
                <th className="w-[8%] px-6 py-3">유형</th>
                <th className="w-[32%] px-6 py-3">
                  콘텐츠 (제목/내용)
                </th>
                <th className="w-[15%] px-6 py-3">신고 사유</th>
                <th className="w-[15%] px-6 py-3">신고일</th>
                <th className="w-[10%] px-6 py-3">상태</th>
                <th className="w-[20%] px-6 py-3">
                  판단 및 조치
                </th>
              </tr>
              </thead>

              <tbody className="divide-y border-gray-100">
              {pagedList.map((item) => (
                <tr
                  key={item.id}
                  className="hover:bg-blue-50 border-gray-100"
                >
                  <td className="px-6 py-4">
                    <Badge
                      color={
                        item.type === '게시글'
                          ? 'purple'
                          : 'blue'
                      }
                    >
                      {item.type}
                    </Badge>
                  </td>

                  <td className="px-6 py-4 ">
                    <div className="font-medium truncate text-blue-600 hover:underline cursor-pointer">
                      {item.content}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      {item.author} | {item.date}
                    </div>
                  </td>

                  <td className="px-6 py-4 text-sm text-red-600 font-semibold">
                    {item.caseType}
                  </td>

                  <td className="px-6 py-4">
                    {item.reportDate}
                  </td>

                  <td className="px-6 py-4">
                    <Badge
                      color={
                        item.status === '대기'
                          ? 'yellow'
                          : item.status === '완료'
                            ? 'green'
                            : 'gray'
                      }
                    >
                      {item.status}
                    </Badge>
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex gap-1">
                      <button className="px-2 py-1 bg-yellow-50 text-yellow-700 text-xs rounded hover:bg-yellow-100">
                        경고
                      </button>
                      <button className="px-2 py-1 bg-red-50 text-red-700 text-xs rounded hover:bg-red-100">
                        정지
                      </button>
                      <button className="px-2 py-1 bg-green-50 text-green-700 text-xs rounded hover:bg-green-100">
                        게시
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex justify-center pt-4">
            <Pagination
              page={page}
              totalPages={totalPages}
              onChange={setPage}
            />
          </div>
        </div>
      )}

      {/* ================= 금칙어 관리 ================= */}
      {activeTab === 'forbidden' && (
        <div className="animate-in fade-in space-y-8 p-10 duration-300">
          <div className="max-w-xl">
            <h4 className="mb-4 flex items-center gap-2 text-sm font-black">
              <Plus className="h-4 w-4 text-indigo-600" />
              신규 금칙어 등록
            </h4>

            <div className="flex gap-2">
              <input
                className="flex-1 rounded-xl border p-3 text-sm focus:ring-4 focus:ring-indigo-100"
                placeholder="금칙어 입력"
              />
              <button className="rounded-xl bg-indigo-600 px-6 py-3 text-sm font-bold text-white hover:bg-indigo-700">
                등록
              </button>
            </div>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-black">
              등록된 금칙어 ({forbiddenWords.length})
            </h4>
            <div className="flex flex-wrap gap-3">
              {forbiddenWords.map((word, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 rounded-2xl bg-gray-50 px-4 py-2"
                >
                  <span className="text-sm">{word}</span>
                  <XCircle className="h-4 w-4 text-gray-400 hover:text-red-500 cursor-pointer" />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 가이드 */}
      <div className="flex gap-3 rounded-xl border border-red-100 bg-red-50 p-6">
        <AlertTriangle className="h-5 w-5 text-red-600" />
        <p className="text-xs text-red-700">
          신고 누적 3회 이상 유저는 자동 차단 처리될 수 있습니다.
        </p>
      </div>
    </div>
  );
}
