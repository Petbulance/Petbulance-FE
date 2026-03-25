import { Check, Lock, Trash2 } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

import {
  createPostComment,
  deletePostComment,
  fetchMyComments,
} from '@/apis/community/posts';
import lock from '@/assets/images/icons/lock_Comment.png';
import sadHam from '@/assets/images/icons/sadHam.png';
import Spinner from '@/components/commons/Spinner.jsx';

const PAGE_SIZE = 10;

const TOAST_STYLE = {
  width: '100%',
  height: '44px',
  display: 'flex',
  alignItems: 'center',
  background: '#222222E5',
  color: '#ffffff',
};

const formatCreatedAt = (value) => {
  if (!value) return '-';
  if (typeof value === 'string' && value.includes('전')) return value;

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;

  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = String(date.getHours()).padStart(2, '0');
  const minute = String(date.getMinutes()).padStart(2, '0');
  return `${month}월 ${day}일 · ${hour}:${minute}`;
};

function DeleteConfirmModal({ open, onCancel, onConfirm }) {
  if (!open) return null;

  return (
    <div className="absolute inset-0 z-40 flex items-center justify-center">
      <button
        type="button"
        className="absolute inset-0 bg-black/50"
        onClick={onCancel}
        aria-label="삭제 취소"
      />
      <div className="relative mx-5 w-full max-w-[320px] rounded-xl bg-white px-5 py-5 text-center">
        <p className="mb-1 text-[12px] text-[#9E9E9E]">주의</p>
        <p className="text-[15px] leading-6 text-[#1E1E1E]">
          댓글을 삭제하면 되돌릴 수 없어요.
          <br />
          그래도 삭제하시겠어요?
        </p>

        <div className="mt-4 flex gap-2">
          <button
            type="button"
            onClick={onCancel}
            className="h-9 flex-1 rounded-full border border-[#E0E0E0] text-[14px] text-[#9E9E9E]"
          >
            취소
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="h-9 flex-1 rounded-full bg-[#FF3B30] text-[14px] text-white"
          >
            삭제
          </button>
        </div>
      </div>
    </div>
  );
}

function ActionSheet({ open, onClose, onSelectDelete }) {
  if (!open) return null;

  return (
    <div className="absolute inset-0 z-30">
      <button
        type="button"
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
        aria-label="액션시트 닫기"
      />

      <div className="absolute inset-0 flex items-center px-4">
        <div className="w-full rounded-xl bg-white px-5 py-5 shadow-[0_8px_20px_rgba(0,0,0,0.12)]">
          <p className="mb-3 text-[28px] font-semibold text-[#1E1E1E]">
            커뮤니티 댓글 삭제
          </p>
          <button
            type="button"
            className="flex w-full items-center gap-2 rounded-lg py-2 text-left text-[22px] text-[#424242] hover:bg-[#F5F5F5]"
            onClick={onSelectDelete}
          >
            <Trash2 size={22} strokeWidth={1.8} />
            선택 삭제
          </button>
        </div>
      </div>
    </div>
  );
}

function CommentItem({ comment, isSelectMode, checked, onToggle, onClick }) {
  const isSecretComment = Boolean(comment.secret ?? comment.isSecret);

  return (
    <article className="border-b border-[#EFEFEF] px-4 py-4">
      <div className="flex gap-2.5">
        {isSelectMode && (
          <button
            type="button"
            onClick={() => onToggle(comment.commentId)}
            className={`mt-0.5 h-4 w-4 shrink-0 rounded-[3px] border ${
              checked
                ? 'border-[#27BE69] bg-[#27BE69] text-white'
                : 'border-[#CFCFCF] bg-white'
            }`}
          >
            {checked && <Check size={12} strokeWidth={3} />}
          </button>
        )}

        <button
          type="button"
          className="min-w-0 flex-1 text-left"
          onClick={onClick}
        >
          <p className="line-clamp-1 text-[19px] font-medium text-[#424242]">
            {comment.postTitle || '제목'}
          </p>
          <p className="mt-1 text-[14px] text-[#9e9e9e]">
            {formatCreatedAt(comment.createdAt)}
          </p>
          <p className="mt-2 line-clamp-3 text-[16px] leading-6 text-[#424242]">
            {isSecretComment && (
              <span className="mr-0.5 inline-flex items-center align-middle text-[#1E1E1E]">
                {/*<Lock size={14} strokeWidth={2.2} />*/}
                <img
                  className="block h-[14px] w-[14px]"
                  src={lock}
                  alt="비밀 댓글"
                />
              </span>
            )}
            <span className="align-middle">{comment.commentContent}</span>
          </p>
        </button>
      </div>
    </article>
  );
}

export default function CommentManage() {
  const navigate = useNavigate();

  const observerRef = useRef(null);
  const lastCommentIdRef = useRef(null);
  const isFetchingRef = useRef(false);

  const [comments, setComments] = useState([]);
  const [hasNext, setHasNext] = useState(false);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const [isActionSheetOpen, setIsActionSheetOpen] = useState(false);
  const [isSelectMode, setIsSelectMode] = useState(false);
  const [selectedCommentIds, setSelectedCommentIds] = useState([]);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);

  const selectedCount = selectedCommentIds.length;
  const isAllSelected =
    comments.length > 0 && selectedCount === comments.length;

  const loadComments = useCallback(
    async ({ reset }) => {
      if (isFetchingRef.current) return;
      if (!reset && !hasNext) return;

      isFetchingRef.current = true;
      setErrorMessage('');

      if (reset) {
        setIsInitialLoading(true);
      } else {
        setIsFetchingMore(true);
      }

      try {
        const data = await fetchMyComments({
          lastCommentId: reset ? null : lastCommentIdRef.current,
          pageSize: PAGE_SIZE,
        });

        const incoming = Array.isArray(data.content) ? data.content : [];

        setComments((prev) => {
          if (reset) return incoming;

          const deduped = new Map(prev.map((item) => [item.commentId, item]));
          incoming.forEach((item) => deduped.set(item.commentId, item));
          return Array.from(deduped.values());
        });

        const lastItem = incoming[incoming.length - 1];
        lastCommentIdRef.current = lastItem?.commentId ?? null;
        setHasNext(Boolean(data.hasNext));
      } catch (error) {
        const message = error?.response?.data?.data?.message;
        setErrorMessage(
          message || '댓글을 불러오지 못했습니다. 잠시 후 다시 시도해 주세요.'
        );
      } finally {
        isFetchingRef.current = false;
        setIsInitialLoading(false);
        setIsFetchingMore(false);
      }
    },
    [hasNext]
  );

  useEffect(() => {
    lastCommentIdRef.current = null;
    setComments([]);
    setHasNext(false);
    setSelectedCommentIds([]);
    setIsSelectMode(false);
    loadComments({ reset: true });
  }, [loadComments]);

  useEffect(() => {
    if (!observerRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          loadComments({ reset: false });
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(observerRef.current);
    return () => observer.disconnect();
  }, [loadComments]);

  useEffect(() => {
    const handleOpenMenu = () => {
      if (isSelectMode) return;
      setIsActionSheetOpen(true);
    };

    window.addEventListener('commentmanage:open-menu', handleOpenMenu);
    return () =>
      window.removeEventListener('commentmanage:open-menu', handleOpenMenu);
  }, [isSelectMode]);

  const handleToggleSelect = (commentId) => {
    setSelectedCommentIds((prev) =>
      prev.includes(commentId)
        ? prev.filter((id) => id !== commentId)
        : [...prev, commentId]
    );
  };

  const handleToggleAllSelect = () => {
    if (isAllSelected) {
      setSelectedCommentIds([]);
      return;
    }
    setSelectedCommentIds(comments.map((comment) => comment.commentId));
  };

  const handleEnterSelectMode = () => {
    setIsActionSheetOpen(false);
    setIsSelectMode(true);
    setSelectedCommentIds([]);
  };

  const handleCancelDeleteConfirm = () => {
    setIsDeleteConfirmOpen(false);
    toast('댓글 삭제를 취소했어요', {
      position: 'bottom-center',
      style: TOAST_STYLE,
      action: {
        label: 'x',
        onClick: () => toast.dismiss(),
      },
    });
  };

  const handleDeleteSelectedComments = async () => {
    if (selectedCommentIds.length === 0) return;

    try {
      const removedCommentIds = [...selectedCommentIds];
      const deletedSnapshots = comments.filter((comment) =>
        removedCommentIds.includes(comment.commentId)
      );

      await Promise.all(removedCommentIds.map((id) => deletePostComment(id)));

      setComments((prev) =>
        prev.filter((comment) => !removedCommentIds.includes(comment.commentId))
      );
      setSelectedCommentIds([]);
      setIsSelectMode(false);
      setIsDeleteConfirmOpen(false);

      toast('댓글 삭제를 완료했어요', {
        position: 'bottom-center',
        style: TOAST_STYLE,
        action: {
          label: '취소',
          onClick: () => {
            toast.dismiss();
            (async () => {
              try {
                if (deletedSnapshots.length === 0) {
                  throw new Error('NO_SNAPSHOT');
                }

                await Promise.all(
                  deletedSnapshots.map((snapshot) =>
                    createPostComment(snapshot.postId, {
                      content: snapshot.commentContent || '',
                      imageUrl: null,
                      isSecret: false,
                      parentId: null,
                      mentionUserNickname: null,
                    })
                  )
                );

                lastCommentIdRef.current = null;
                setHasNext(false);
                setComments([]);
                await loadComments({ reset: true });

                toast('댓글 삭제를 취소했어요', {
                  position: 'bottom-center',
                  style: TOAST_STYLE,
                  action: {
                    label: 'x',
                    onClick: () => toast.dismiss(),
                  },
                });
              } catch {
                toast('댓글 복원에 실패했습니다.', {
                  position: 'bottom-center',
                  style: TOAST_STYLE,
                  action: {
                    label: 'x',
                    onClick: () => toast.dismiss(),
                  },
                });
              }
            })();
          },
        },
      });
    } catch (error) {
      const message = error?.response?.data?.data?.message;
      toast(message || '댓글 삭제에 실패했습니다.', {
        position: 'bottom-center',
        style: TOAST_STYLE,
        action: {
          label: 'x',
          onClick: () => toast.dismiss(),
        },
      });
      setIsDeleteConfirmOpen(false);
    }
  };

  return (
    <div className="relative flex h-full flex-col bg-white">
      {isInitialLoading && (
        <div className="flex h-full items-center justify-center">
          <Spinner />
        </div>
      )}

      {!isInitialLoading && errorMessage && (
        <p className="px-4 py-10 text-center text-[14px] text-[#616161]">
          {errorMessage}
        </p>
      )}

      {!isInitialLoading && !errorMessage && comments.length === 0 && (
        <div className="flex h-full flex-col items-center justify-center px-4 pb-24 text-center">
          <img
            src={sadHam}
            alt="작성한 글 없음"
            className="mb-4 h-[160px] w-[160px]"
          />
          <p className="text-[27px] text-[#424242]">작성한 글이 없어요.</p>
          <p className="mt-2 text-[20px] text-[#616161]">
            첫 게시글을 작성하고
            <br />
            펫뷸런스 커뮤니티에 참여해보세요!
          </p>

          <button
            type="button"
            onClick={() => navigate('/index/community')}
            className="mt-8 min-h-[68px] w-full rounded-xl border border-[#2DA969] text-[27px] text-[#2DA969]"
          >
            커뮤니티 구경하기
          </button>
        </div>
      )}

      {!isInitialLoading && !errorMessage && comments.length > 0 && (
        <>
          {isSelectMode && (
            <div className="flex items-center justify-between border-b border-[#EFEFEF] px-4 py-2">
              <button
                type="button"
                className="flex items-center gap-2 text-[13px] text-[#616161]"
                onClick={handleToggleAllSelect}
              >
                <span
                  className={`flex h-4 w-4 items-center justify-center rounded-[3px] border ${
                    isAllSelected
                      ? 'border-[#27BE69] bg-[#27BE69] text-white'
                      : 'border-[#CFCFCF] bg-white'
                  }`}
                >
                  {isAllSelected && <Check size={12} strokeWidth={3} />}
                </span>
                전체선택
              </button>

              <button
                type="button"
                className="h-6 rounded border border-[#E0E0E0] px-2 text-[11px] text-[#757575]"
                onClick={() => {
                  if (selectedCount === 0) {
                    toast('삭제할 댓글을 선택해주세요.', {
                      position: 'bottom-center',
                      style: TOAST_STYLE,
                      action: {
                        label: 'x',
                        onClick: () => toast.dismiss(),
                      },
                    });
                    return;
                  }
                  setIsDeleteConfirmOpen(true);
                }}
              >
                삭제
              </button>
            </div>
          )}

          <main className="min-h-0 flex-1 overflow-y-auto">
            {comments.map((comment) => (
              <CommentItem
                key={comment.commentId}
                comment={comment}
                isSelectMode={isSelectMode}
                checked={selectedCommentIds.includes(comment.commentId)}
                onToggle={handleToggleSelect}
                onClick={() => {
                  if (isSelectMode) {
                    handleToggleSelect(comment.commentId);
                    return;
                  }
                  navigate(`/index/community/${comment.postId}`);
                }}
              />
            ))}

            <div ref={observerRef} className="h-8 w-full" />

            {isFetchingMore && (
              <div className="pb-6 text-center text-[13px] text-[#9E9E9E]">
                불러오는 중...
              </div>
            )}
          </main>
        </>
      )}

      <ActionSheet
        open={isActionSheetOpen}
        onClose={() => setIsActionSheetOpen(false)}
        onSelectDelete={handleEnterSelectMode}
      />

      <DeleteConfirmModal
        open={isDeleteConfirmOpen}
        onCancel={handleCancelDeleteConfirm}
        onConfirm={handleDeleteSelectedComments}
      />
    </div>
  );
}
