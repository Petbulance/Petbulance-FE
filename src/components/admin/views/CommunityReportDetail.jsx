import { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import { patchAdminReportAction } from '@/apis/admin/reports';
import { fetchCommunityPostDetail } from '@/apis/community/posts';
import { Badge } from '@/components/admin/ui/Badge.jsx';

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

const ACTION_BUTTONS = [
  {
    type: 'WARNING',
    label: '경고',
    className: 'bg-yellow-50 text-yellow-700 hover:bg-yellow-100',
  },
  {
    type: 'SUSPEND',
    label: '정지',
    className: 'bg-red-50 text-red-700 hover:bg-red-100',
  },
  {
    type: 'PUBLISH',
    label: '게시',
    className: 'bg-green-50 text-green-700 hover:bg-green-100',
  },
];

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

const getPostId = (report) =>
  report?.post?.postId ?? report?.comment?.postId ?? null;

export default function CommunityReportDetail() {
  const { reportId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const initialReport = location.state?.report ?? null;
  const [report, setReport] = useState(initialReport);
  const [post, setPost] = useState(null);
  const [loadingPost, setLoadingPost] = useState(false);
  const [detailError, setDetailError] = useState('');
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    setReport(initialReport);
  }, [initialReport]);

  const postId = useMemo(() => getPostId(report), [report]);

  useEffect(() => {
    if (!postId) return;

    const loadPostDetail = async () => {
      setLoadingPost(true);
      setDetailError('');
      try {
        const data = await fetchCommunityPostDetail(postId, {
          authType: 'admin',
        });
        setPost(data);
      } catch (error) {
        console.error('커뮤니티 게시글 상세 조회 실패:', error);
        setDetailError('게시글 내용을 불러오지 못했습니다.');
        setPost(null);
      } finally {
        setLoadingPost(false);
      }
    };

    loadPostDetail();
  }, [postId]);

  const handleAction = async (actionType) => {
    if (!reportId || processing) return;
    setProcessing(true);

    try {
      const data = await patchAdminReportAction(reportId, actionType);
      window.alert(data.message || '신고 조치가 처리되었습니다.');
      setReport((prev) =>
        prev
          ? {
              ...prev,
              status: 'COMPLETED',
              actionType: data.reportActionType ?? actionType,
            }
          : prev
      );
    } catch (error) {
      const errorClass = error?.response?.data?.data?.errorClassName;
      const message = error?.response?.data?.data?.message;

      if (errorClass === 'ALREADY_COMPLETED') {
        window.alert(message || '이미 처리 완료된 신고입니다.');
        setReport((prev) =>
          prev
            ? {
                ...prev,
                status: 'COMPLETED',
              }
            : prev
        );
      } else {
        window.alert(message || '신고 조치 처리에 실패했습니다.');
      }
    } finally {
      setProcessing(false);
    }
  };

  if (!report) {
    return (
      <div className="space-y-4">
        <h3 className="text-xl font-bold">커뮤니티 신고 상세</h3>
        <div className="rounded-lg border border-gray-200 bg-white p-6 text-sm text-gray-600">
          신고 정보를 찾을 수 없습니다. 목록에서 다시 진입해주세요.
        </div>
        <button
          type="button"
          onClick={() => navigate('/admin/community')}
          className="rounded border px-3 py-2 text-sm hover:bg-gray-50"
        >
          목록으로
        </button>
      </div>
    );
  }

  return (
    <div className="animate-in fade-in space-y-6 duration-300">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold">커뮤니티 신고 상세</h3>
        <button
          type="button"
          onClick={() => navigate('/admin/community')}
          className="rounded border px-3 py-1.5 text-sm hover:bg-gray-50"
        >
          목록으로
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4 rounded-lg border border-gray-200 bg-white p-4 text-sm">
        <div>
          <span className="text-gray-500">신고 ID</span>
          <p className="font-medium text-gray-800">{report.reportId}</p>
        </div>
        <div>
          <span className="text-gray-500">유형</span>
          <p className="font-medium text-gray-800">
            {REPORT_TYPE_LABEL[report.reportType] || report.reportType || '-'}
          </p>
        </div>
        <div>
          <span className="text-gray-500">신고 사유</span>
          <p className="font-medium text-gray-800">
            {report.reportReason || '-'}
          </p>
        </div>
        <div>
          <span className="text-gray-500">신고일</span>
          <p className="font-medium text-gray-800">
            {report.reportedAt || '-'}
          </p>
        </div>
        <div>
          <span className="text-gray-500">상태</span>
          <div className="mt-1">
            <Badge color={getStatusColor(report.status)}>
              {STATUS_LABEL[report.status] || report.status || '-'}
            </Badge>
          </div>
        </div>
        <div>
          <span className="text-gray-500">조치 결과</span>
          <div className="mt-1">
            <Badge color={getActionColor(report.actionType)}>
              {ACTION_TYPE_LABEL[report.actionType] || report.actionType || '-'}
            </Badge>
          </div>
        </div>
      </div>

      <div className="rounded-lg border border-gray-200 bg-white p-5">
        <h4 className="mb-3 text-base font-bold text-gray-800">게시글 내용</h4>

        {!postId && (
          <p className="text-sm text-gray-500">
            게시글 정보를 찾을 수 없습니다.
          </p>
        )}

        {postId && loadingPost && (
          <p className="text-sm text-gray-500">게시글을 불러오는 중...</p>
        )}

        {postId && !loadingPost && detailError && (
          <p className="text-sm text-red-500">{detailError}</p>
        )}

        {postId && !loadingPost && !detailError && post && (
          <div className="space-y-3">
            <p className="text-lg font-semibold text-gray-900">
              {post.title || '(제목 없음)'}
            </p>
            <p className="text-xs text-gray-500">
              {post.writerNickname || '-'} | {post.createdAt || '-'}
            </p>
            <p className="text-sm leading-6 whitespace-pre-wrap text-gray-700">
              {post.content || '(내용 없음)'}
            </p>
          </div>
        )}
      </div>

      <div className="rounded-lg border border-gray-200 bg-white p-5">
        <h4 className="mb-3 text-base font-bold text-gray-800">판단 및 조치</h4>

        {report.status === 'PENDING' ? (
          <div className="flex gap-2">
            {ACTION_BUTTONS.map((action) => (
              <button
                key={action.type}
                type="button"
                disabled={processing}
                onClick={() => handleAction(action.type)}
                className={`rounded px-3 py-1.5 text-sm disabled:opacity-50 ${action.className}`}
              >
                {action.label}
              </button>
            ))}
          </div>
        ) : (
          <Badge color={getActionColor(report.actionType)}>
            {ACTION_TYPE_LABEL[report.actionType] || report.actionType || '-'}
          </Badge>
        )}
      </div>
    </div>
  );
}
