import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import {
  COMMUNITY_SORT_TO_API,
  COMMUNITY_TOPIC_TO_API,
  COMMUNITY_TYPE_TO_API,
  fetchCommunityPosts,
} from '@/apis/community/posts';
import { CommunityHeader } from '@/components/community/layout/CommunityHeader';
import { NoticeBanner } from '@/components/community/ui/NoticeBanner';
import { PostCard } from '@/components/community/ui/PostCard';
import { SortDropdown } from '@/components/community/ui/SortDropdown';
import { TopicFilterChips } from '@/components/community/ui/TopicFilterChips';
import { TOPIC_FILTERS } from '@/data/community';

export default function CommunityMain() {
  const sentinelRef = useRef(null);
  const isLoadingRef = useRef(false);
  const hasNextRef = useRef(false);
  const lastPostIdRef = useRef(null);
  const [selectedType, setSelectedType] = useState('전체');
  const [selectedTopic, setSelectedTopic] = useState(TOPIC_FILTERS[0]);
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [selectedSort, setSelectedSort] = useState('최신순');
  const [posts, setPosts] = useState([]);
  const [noticeBanner, setNoticeBanner] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  const requestParams = useMemo(
    () => ({
      type: COMMUNITY_TYPE_TO_API[selectedType],
      topic: COMMUNITY_TOPIC_TO_API[selectedTopic],
      sort: COMMUNITY_SORT_TO_API[selectedSort] ?? 'latest',
    }),
    [selectedSort, selectedTopic, selectedType]
  );

  const loadPosts = useCallback(
    async ({ reset }) => {
      if (isLoadingRef.current) return;

      if (!reset && !hasNextRef.current) return;

      isLoadingRef.current = true;
      setIsLoading(true);
      setErrorMessage('');

      if (reset) {
        setIsInitialLoading(true);
      }

      try {
        const data = await fetchCommunityPosts({
          ...requestParams,
          lastPostId: reset ? null : lastPostIdRef.current,
          pageSize: 20,
        });

        const incoming = Array.isArray(data.content) ? data.content : [];

        setPosts((prev) => {
          const merged = reset ? incoming : [...prev, ...incoming];
          const deduped = new Map();
          merged.forEach((item) => {
            const key = item.postId ?? item.id;
            deduped.set(key, item);
          });
          return Array.from(deduped.values());
        });

        if (reset) {
          setNoticeBanner(data.noticeBanner ?? null);
        }

        const nextLastPostId = data.lastPostId ?? null;
        const nextHasNext = Boolean(data.hasNext);

        lastPostIdRef.current = nextLastPostId;
        hasNextRef.current = nextHasNext;
      } catch (error) {
        const serverMessage = error?.response?.data?.data?.message;
        setErrorMessage(
          serverMessage ||
            '게시글 목록을 불러오지 못했습니다. 잠시 후 다시 시도해 주세요.'
        );
      } finally {
        isLoadingRef.current = false;
        setIsLoading(false);
        if (reset) {
          setIsInitialLoading(false);
        }
      }
    },
    [requestParams]
  );

  useEffect(() => {
    isLoadingRef.current = false;
    hasNextRef.current = false;
    lastPostIdRef.current = null;
    setPosts([]);
    setNoticeBanner(null);
    loadPosts({ reset: true });
  }, [loadPosts]);

  useEffect(() => {
    if (!sentinelRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          loadPosts({ reset: false });
        }
      },
      {
        root: null,
        threshold: 0.1,
      }
    );

    observer.observe(sentinelRef.current);
    return () => observer.disconnect();
  }, [loadPosts]);

  return (
    <div className="relative flex min-h-full flex-col bg-[#F2F4F6]">
      <section className="border-b border-gray-200 bg-white">
        <CommunityHeader
          selectedType={selectedType}
          onSelectType={setSelectedType}
        />
        <TopicFilterChips
          selectedTopic={selectedTopic}
          onSelectTopic={setSelectedTopic}
        />
        <SortDropdown
          selectedSort={selectedSort}
          isSortOpen={isSortOpen}
          onToggleSort={() => setIsSortOpen((prev) => !prev)}
          onCloseSort={() => setIsSortOpen(false)}
          onSelectSort={(sort) => {
            setSelectedSort(sort);
            setIsSortOpen(false);
          }}
        />
      </section>

      <NoticeBanner notice={noticeBanner} />

      <section className="flex-1 bg-white">
        {errorMessage && (
          <p className="px-6 py-10 text-center text-sm text-[#616161]">
            {errorMessage}
          </p>
        )}

        {!errorMessage && isInitialLoading && (
          <p className="px-6 py-10 text-center text-sm text-[#9E9E9E]">
            게시글을 불러오는 중이에요.
          </p>
        )}

        {!errorMessage && !isInitialLoading && posts.length === 0 && (
          <p className="px-6 py-10 text-center text-sm text-[#9E9E9E]">
            조회된 게시글이 없어요.
          </p>
        )}

        {posts.map((post) => (
          <PostCard key={post.postId ?? post.id} post={post} />
        ))}

        <div ref={sentinelRef} className="h-8 w-full" />

        {isLoading && !isInitialLoading && (
          <p className="pb-6 text-center text-sm text-[#9E9E9E]">
            더 불러오는 중...
          </p>
        )}
      </section>

    </div>
  );
}
