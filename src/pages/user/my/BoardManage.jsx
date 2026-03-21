import { Check, Heart, Trash2 } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

import {
  COMMUNITY_TOPIC_TO_API,
  COMMUNITY_TYPE_TO_API,
  createCommunityPost,
  deleteCommunityPosts,
  fetchCommunityPostDetail,
  fetchMyPosts,
} from '@/apis/community/posts';
import eyeIcon from '@/assets/images/icons/eye_icon.svg';
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

const resolveApiEnumValue = (value, mapTable) => {
  if (!value) return undefined;
  if (Object.values(mapTable).includes(value)) return value;
  return mapTable[value] ?? value;
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
          게시글을 삭제하면 되돌릴 수 없어요.
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
          <p className="mb-3 text-[24px] font-semibold text-[#1E1E1E]">
            커뮤니티 게시글 삭제
          </p>
          <button
            type="button"
            className="flex w-full items-center gap-2 rounded-lg py-2 text-left text-[22px] text-[#616161] hover:bg-[#F5F5F5]"
            onClick={onSelectDelete}
          >
            <Trash2 size={21} strokeWidth={1.8} />
            선택 삭제
          </button>
        </div>
      </div>
    </div>
  );
}

function PostItem({ post, isSelectMode, checked, onToggle, onClick }) {
  return (
    <article className="border-b border-[#EFEFEF] px-4 py-4">
      <div className="flex gap-2.5">
        {isSelectMode && (
          <button
            type="button"
            onClick={() => onToggle(post.postId)}
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
          <p className="line-clamp-1 text-[13px] font-medium text-[#1E1E1E]">
            {post.title || '제목'}
          </p>
          <p className="mt-1 flex items-center gap-1 text-[10px] text-[#B0B0B0]">
            <span>{formatCreatedAt(post.createdAt)}</span>
            <span>·</span>
            <img src={eyeIcon} alt="조회수" className="h-3 w-3 opacity-60" />
            <span>{post.viewCount ?? 0}</span>
            <span>·</span>
            <Heart size={12} strokeWidth={2} className="opacity-60" />
            <span>{post.likeCount ?? 0}</span>
          </p>

          {post.thumbnailUrl ? (
            <div className="mt-3 flex gap-3">
              <img
                src={post.thumbnailUrl}
                alt="썸네일"
                className="h-[84px] w-[84px] shrink-0 rounded-[10px] bg-[#F2F2F2] object-cover"
              />
              <p className="line-clamp-3 text-[12px] leading-6 text-[#424242]">
                {post.content}
              </p>
            </div>
          ) : (
            <div className="mt-2">
              <p className="mt-1 line-clamp-3 text-[12px] leading-6 text-[#424242]">
                {post.content}
              </p>
            </div>
          )}
        </button>
      </div>
    </article>
  );
}

export default function BoardManage() {
  const navigate = useNavigate();

  const observerRef = useRef(null);
  const lastPostIdRef = useRef(null);
  const isFetchingRef = useRef(false);

  const [posts, setPosts] = useState([]);
  const [hasNext, setHasNext] = useState(false);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const [isActionSheetOpen, setIsActionSheetOpen] = useState(false);
  const [isSelectMode, setIsSelectMode] = useState(false);
  const [selectedPostIds, setSelectedPostIds] = useState([]);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);

  const selectedCount = selectedPostIds.length;
  const isAllSelected = posts.length > 0 && selectedCount === posts.length;

  const loadPosts = useCallback(
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
        const data = await fetchMyPosts({
          lastPostId: reset ? null : lastPostIdRef.current,
          pageSize: PAGE_SIZE,
        });

        const incoming = Array.isArray(data.content) ? data.content : [];

        setPosts((prev) => {
          if (reset) return incoming;

          const deduped = new Map(prev.map((item) => [item.postId, item]));
          incoming.forEach((item) => deduped.set(item.postId, item));
          return Array.from(deduped.values());
        });

        lastPostIdRef.current = data.lastPostId ?? null;
        setHasNext(Boolean(data.hasNext));
      } catch (error) {
        const message = error?.response?.data?.data?.message;
        setErrorMessage(
          message || '게시글을 불러오지 못했습니다. 잠시 후 다시 시도해 주세요.'
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
    lastPostIdRef.current = null;
    setPosts([]);
    setHasNext(false);
    setSelectedPostIds([]);
    setIsSelectMode(false);
    loadPosts({ reset: true });
  }, [loadPosts]);

  useEffect(() => {
    if (!observerRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          loadPosts({ reset: false });
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(observerRef.current);
    return () => observer.disconnect();
  }, [loadPosts]);

  useEffect(() => {
    const handleOpenMenu = () => {
      if (isSelectMode) return;
      setIsActionSheetOpen(true);
    };

    window.addEventListener('boardmanage:open-menu', handleOpenMenu);
    return () =>
      window.removeEventListener('boardmanage:open-menu', handleOpenMenu);
  }, [isSelectMode]);

  const handleToggleSelect = (postId) => {
    setSelectedPostIds((prev) =>
      prev.includes(postId)
        ? prev.filter((id) => id !== postId)
        : [...prev, postId]
    );
  };

  const handleToggleAllSelect = () => {
    if (isAllSelected) {
      setSelectedPostIds([]);
      return;
    }

    setSelectedPostIds(posts.map((post) => post.postId));
  };

  const handleEnterSelectMode = () => {
    setIsActionSheetOpen(false);
    setIsSelectMode(true);
    setSelectedPostIds([]);
  };

  const handleCancelDeleteConfirm = () => {
    setIsDeleteConfirmOpen(false);
    toast('게시글 삭제를 취소했어요', {
      position: 'bottom-center',
      style: TOAST_STYLE,
      action: {
        label: 'x',
        onClick: () => toast.dismiss(),
      },
    });
  };

  const handleDeleteSelectedPosts = async () => {
    if (selectedPostIds.length === 0) return;

    try {
      const removedPostIds = [...selectedPostIds];
      const deletedSnapshots = (
        await Promise.all(
          removedPostIds.map(async (id) => {
            try {
              return await fetchCommunityPostDetail(id);
            } catch {
              return null;
            }
          })
        )
      ).filter(Boolean);

      await deleteCommunityPosts(removedPostIds);

      setPosts((prev) =>
        prev.filter((post) => !removedPostIds.includes(post.postId))
      );
      setSelectedPostIds([]);
      setIsSelectMode(false);
      setIsDeleteConfirmOpen(false);

      toast('게시글 삭제를 완료했어요', {
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
                  deletedSnapshots.map((snapshot) => {
                    const imageUrls = Array.isArray(snapshot.images)
                      ? [...snapshot.images]
                          .sort(
                            (a, b) => (a.imageOrder ?? 0) - (b.imageOrder ?? 0)
                          )
                          .map((image) => image.imageUrl)
                          .filter(Boolean)
                      : [];

                    return createCommunityPost({
                      type: resolveApiEnumValue(
                        snapshot.type,
                        COMMUNITY_TYPE_TO_API
                      ),
                      topic: resolveApiEnumValue(
                        snapshot.topic,
                        COMMUNITY_TOPIC_TO_API
                      ),
                      title: snapshot.title ?? '',
                      content: snapshot.content ?? '',
                      imageUrls,
                    });
                  })
                );

                lastPostIdRef.current = null;
                setHasNext(false);
                setPosts([]);
                await loadPosts({ reset: true });

                toast('게시글 삭제를 취소했어요', {
                  position: 'bottom-center',
                  style: TOAST_STYLE,
                  action: {
                    label: 'x',
                    onClick: () => toast.dismiss(),
                  },
                });
              } catch {
                toast('게시글 복원에 실패했습니다.', {
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
      toast(message || '게시글 삭제에 실패했습니다.', {
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

      {!isInitialLoading && !errorMessage && posts.length === 0 && (
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

      {!isInitialLoading && !errorMessage && posts.length > 0 && (
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
                    toast('삭제할 게시글을 선택해주세요.', {
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
            {posts.map((post) => (
              <PostItem
                key={post.postId}
                post={post}
                isSelectMode={isSelectMode}
                checked={selectedPostIds.includes(post.postId)}
                onToggle={handleToggleSelect}
                onClick={() => {
                  if (isSelectMode) {
                    handleToggleSelect(post.postId);
                    return;
                  }
                  navigate(`/index/community/${post.postId}`);
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
        onConfirm={handleDeleteSelectedPosts}
      />
    </div>
  );
}
