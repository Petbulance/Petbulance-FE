import { ChevronRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { fetchCommunityPosts } from '@/apis/community/posts';
import Spinner from '@/components/commons/Spinner.jsx';

export default function PopularPostList() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    let mounted = true;

    const loadPopularPosts = async () => {
      setLoading(true);
      setErrorMessage('');

      try {
        const data = await fetchCommunityPosts({
          type: null,
          topic: null,
          sort: 'popular',
          lastPostId: null,
          pageSize: 4,
        });

        if (!mounted) return;
        const list = Array.isArray(data.content) ? data.content : [];
        setPosts(list.slice(0, 4));
      } catch (error) {
        if (!mounted) return;
        const serverMessage = error?.response?.data?.data?.message;
        setErrorMessage(
          serverMessage || '인기 게시글을 불러오지 못했습니다. 잠시 후 다시 시도해 주세요.'
        );
      } finally {
        if (mounted) setLoading(false);
      }
    };

    loadPopularPosts();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <section>
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-[19px] font-semibold">커뮤니티 인기 게시글</h2>
        <button onClick={() => navigate('/index/community')}>
          <ChevronRight size={20} />
        </button>
      </div>

      {loading && (
        <div className="flex justify-center py-6">
          <Spinner />
        </div>
      )}

      {!loading && errorMessage && (
        <p className="rounded-xl bg-[#F7F7F7] px-4 py-6 text-center text-[14px] text-[#757575]">
          {errorMessage}
        </p>
      )}

      {!loading && !errorMessage && posts.length === 0 && (
        <p className="rounded-xl bg-[#F7F7F7] px-4 py-6 text-center text-[14px] text-[#9E9E9E]">
          인기 게시글이 아직 없어요.
        </p>
      )}

      {!loading && !errorMessage && posts.length > 0 && (
        <div className="space-y-2">
          {posts.map((post) => {
            const postId = post.postId ?? post.id;
            const typeLabel = post.type ?? post.boardName ?? '-';
            const topicLabel = post.topic ?? post.category ?? '-';
            const likeCount = post.likeCount ?? 0;
            const commentCount = post.commentCount ?? 0;

            return (
              <button
                key={postId}
                className="w-full rounded-xl bg-[#F7F7F7] px-4 py-3 text-left"
                onClick={() => navigate(`/index/community/${postId}`)}
              >
                <p className="line-clamp-1 text-[15px] font-medium text-[#1E1E1E]">
                  {post.title}
                </p>
                <p className="mt-1 line-clamp-1 text-[13px] text-[#757575]">
                  {typeLabel} · {topicLabel} · {post.createdAt}
                </p>
                <p className="mt-2 text-[12px] text-[#9E9E9E]">
                  좋아요 {likeCount} · 댓글 {commentCount}
                </p>
              </button>
            );
          })}
        </div>
      )}
    </section>
  );
}
