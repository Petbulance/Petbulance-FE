import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { fetchMyComments } from '@/apis/community/posts';
import Spinner from '@/components/commons/Spinner.jsx';

const PAGE_SIZE = 10;

function CommentItem({ comment }) {
  const navigate = useNavigate();

  const createdAt = comment.createdAt
    ? new Date(comment.createdAt).toLocaleString('ko-KR')
    : '-';

  return (
    <button
      type="button"
      className="w-full border-b border-[#EEEEEE] px-4 py-4 text-left"
      onClick={() => navigate(`/index/community/${comment.postId}`)}
    >
      <div className="mb-2 flex items-center gap-2">
        <span className="rounded border border-[#E0E0E0] px-2 py-0.5 text-[12px] text-[#616161]">
          {comment.hidden ? '숨김' : '게시중'}
        </span>
        <span className="text-[12px] text-[#9E9E9E]">{createdAt}</span>
      </div>

      <p className="line-clamp-1 text-[16px] font-medium text-[#1E1E1E]">
        {comment.postTitle}
      </p>
      <p className="mt-1 line-clamp-2 text-[14px] text-[#616161]">
        {comment.commentContent}
      </p>
    </button>
  );
}

export default function CommentManage() {
  const observerRef = useRef(null);
  const lastCommentIdRef = useRef(null);
  const isFetchingRef = useRef(false);

  const [comments, setComments] = useState([]);
  const [hasNext, setHasNext] = useState(false);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const [keywordInput, setKeywordInput] = useState('');
  const [keyword, setKeyword] = useState('');

  const requestKeyword = useMemo(() => keyword.trim(), [keyword]);

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
          keyword: requestKeyword || undefined,
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
    [hasNext, requestKeyword]
  );

  useEffect(() => {
    lastCommentIdRef.current = null;
    setComments([]);
    setHasNext(false);
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

  const handleSearch = () => {
    setKeyword(keywordInput);
  };

  return (
    <div className="flex h-full flex-col bg-white">
      <div className="border-b border-[#EEEEEE] px-4 py-3">
        <div className="flex gap-2">
          <input
            value={keywordInput}
            onChange={(e) => setKeywordInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSearch();
            }}
            placeholder="댓글 내용 검색"
            className="h-9 flex-1 rounded border border-[#E0E0E0] px-3 text-[14px] outline-none"
          />
          <button
            type="button"
            onClick={handleSearch}
            className="h-9 rounded bg-[#2DA969] px-4 text-[14px] text-white"
          >
            검색
          </button>
        </div>
      </div>

      <main className="min-h-0 flex-1 overflow-y-auto">
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
          <p className="px-4 py-10 text-center text-[14px] text-[#9E9E9E]">
            작성한 댓글이 없어요.
          </p>
        )}

        {!isInitialLoading &&
          !errorMessage &&
          comments.map((comment) => (
            <CommentItem key={comment.commentId} comment={comment} />
          ))}

        <div ref={observerRef} className="h-8 w-full" />

        {isFetchingMore && (
          <div className="pb-6 text-center text-[13px] text-[#9E9E9E]">
            불러오는 중...
          </div>
        )}
      </main>
    </div>
  );
}
