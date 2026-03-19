import { AlertTriangle, Plus, XCircle } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { fetchAdminReports } from '@/apis/admin/reports';
import Pagination from '@/components/admin/Pagination.jsx';

import { Badge } from '../ui/Badge';

const PAGE_SIZE = 20;

const REPORT_TYPE_LABEL = {
  POST: '게시글',
  COMMENT: '댓글',
  REVIEW: '리뷰',
};

const STATUS_LABEL = {
  PENDING: '대기',
  COMPLETED: '완료',
  REJECTED: '반려',
};

const ACTION_TYPE_LABEL = {
  WARNING: '경고',
  SUSPEND: '정지',
  PUBLISH: '게시',
};

const getReportTypeColor = (type) => {
  if (type === 'POST') return 'purple';
  if (type === 'COMMENT') return 'blue';
  if (type === 'REVIEW') return 'indigo';
  return 'gray';
};

const getStatusColor = (status) => {
  if (status === 'PENDING') return 'yellow';
  if (status === 'COMPLETED') return 'green';
  if (status === 'REJECTED') return 'gray';
  return 'gray';
};

const getActionColor = (actionType) => {
  if (actionType === 'WARNING') return 'yellow';
  if (actionType === 'SUSPEND') return 'red';
  if (actionType === 'PUBLISH') return 'green';
  return 'gray';
};

const getReportContent = (item) => {
  if (item.reportType === 'POST') {
    return {
      text: item.post?.title || '-',
      writer: item.post?.writerNickname || '-',
      createdAt: item.post?.createdAt || '-',
      reportCount: item.post?.reportCount ?? 0,
    };
  }

  if (item.reportType === 'COMMENT') {
    return {
      text: item.comment?.content || '-',
      writer: item.comment?.writerNickname || '-',
      createdAt: item.comment?.createdAt || '-',
      reportCount: item.comment?.reportCount ?? 0,
    };
  }

  return {
    text: '-',
    writer: '-',
    createdAt: '-',
    reportCount: 0,
  };
};

export default function CommunityManagementView() {
  const navigate = useNavigate();
  const activeTab = 'reports';
  const [page, setPage] = useState(1);
  const [reports, setReports] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const [loading, setLoading] = useState(false);

  const loadReports = useCallback(async () => {
    setLoading(true);
    try {
      const data = await fetchAdminReports({
        page,
        size: PAGE_SIZE,
      });
      setReports(data.content || []);
      setTotalPages(data.totalPages || 0);
      setTotalElements(data.totalElements || 0);
    } catch (error) {
      console.error('커뮤니티 신고 목록 조회 실패:', error);
      setReports([]);
      setTotalPages(0);
      setTotalElements(0);
    } finally {
      setLoading(false);
    }
  }, [page]);

  useEffect(() => {
    if (activeTab === 'reports') {
      loadReports();
    }
  }, [activeTab, loadReports]);

  const getPostId = (item) => item.post?.postId ?? item.comment?.postId ?? null;

  const handleMoveDetail = (item) => {
    const postId = getPostId(item);
    if (!postId) return;

    navigate(`/admin/community/${item.reportId}`, {
      state: { report: item },
    });
  };

  const forbiddenWords = ['바보', '멍청이', '비추천', '광고글', '스팸단어'];

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
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-800">커뮤니티 관리</h2>
            <span className="text-xs text-gray-500">
              총 {totalElements}건 · {page}/{Math.max(totalPages, 1)} 페이지
            </span>
            {/*   <span className="text-xs text-gray-500">
              최신순 10개씩 보기
            </span>*/}
          </div>

          <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
            <table className="w-full table-fixed text-left text-sm">
              <thead className="border-b border-gray-100 bg-gray-50">
                <tr>
                  <th className="w-[8%] px-6 py-3">유형</th>
                  <th className="w-[32%] px-6 py-3">콘텐츠 (제목/내용)</th>
                  <th className="w-[15%] px-6 py-3">신고 사유</th>
                  <th className="w-[15%] px-6 py-3">신고일</th>
                  <th className="w-[10%] px-6 py-3">상태</th>
                  <th className="w-[20%] px-6 py-3">판단 및 조치</th>
                </tr>
              </thead>

              <tbody className="divide-y border-gray-100">
                {!loading &&
                  reports.map((item) => {
                    const content = getReportContent(item);
                    return (
                      <tr
                        key={item.reportId}
                        className="border-gray-100 hover:bg-blue-50"
                      >
                        <td className="px-6 py-4">
                          <Badge color={getReportTypeColor(item.reportType)}>
                            {REPORT_TYPE_LABEL[item.reportType] ||
                              item.reportType}
                          </Badge>
                        </td>

                        <td className="px-6 py-4">
                          <button
                            type="button"
                            onClick={() => handleMoveDetail(item)}
                            disabled={!getPostId(item)}
                            className="max-w-full cursor-pointer truncate text-left font-medium text-blue-600 hover:underline disabled:cursor-not-allowed disabled:text-gray-400"
                          >
                            {content.text}
                          </button>
                          <div className="mt-1 text-xs text-gray-500">
                            {content.writer} | {content.createdAt} | 신고{' '}
                            {content.reportCount}회
                          </div>
                        </td>

                        <td className="px-6 py-4 text-sm font-semibold text-red-600">
                          {item.reportReason || '-'}
                        </td>

                        <td className="px-6 py-4">{item.reportedAt || '-'}</td>

                        <td className="px-6 py-4">
                          <Badge color={getStatusColor(item.status)}>
                            {STATUS_LABEL[item.status] || item.status}
                          </Badge>
                        </td>

                        <td className="px-6 py-4">
                          <Badge color={getActionColor(item.actionType)}>
                            {ACTION_TYPE_LABEL[item.actionType] ||
                              item.actionType ||
                              '-'}
                          </Badge>
                        </td>
                      </tr>
                    );
                  })}

                {!loading && reports.length === 0 && (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-6 py-10 text-center text-sm text-gray-400"
                    >
                      신고 내역이 없습니다.
                    </td>
                  </tr>
                )}

                {loading && (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-6 py-10 text-center text-sm text-gray-400"
                    >
                      불러오는 중...
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 0 && (
            <div className="flex justify-center pt-4">
              <Pagination
                page={page}
                totalPages={totalPages}
                onChange={setPage}
              />
            </div>
          )}
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
                  <XCircle className="h-4 w-4 cursor-pointer text-gray-400 hover:text-red-500" />
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
