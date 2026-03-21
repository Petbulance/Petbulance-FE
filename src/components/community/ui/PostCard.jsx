import { useNavigate } from 'react-router-dom';

import dot from '@/assets/images/icons/DotIcon.svg';
import eye from '@/assets/images/icons/eye_icon.svg';
import message from '@/assets/images/icons/message.svg';

function LikeHeartIcon({ liked }) {
  if (liked) {
    return (
      <svg
        aria-hidden
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54z" />
      </svg>
    );
  }

  return (
    <svg
      aria-hidden
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  );
}

export function PostCard({ post }) {
  const navigate = useNavigate();
  const postId = post.postId ?? post.id;
  const categoryLabel = post.category ?? post.topic ?? '-';
  const animalLabel = post.boardName ?? post.type ?? post.animal ?? '-';
  const createdAt = post.createdAt ?? post.time ?? '-';
  const likeCount = post.likeCount ?? post.likes ?? 0;
  const isLiked =
    post.liked === true ||
    post.likedByUser === true ||
    post.isLikedByUser === true ||
    post.isLiked === true;
  const commentCount = post.commentCount ?? post.comments ?? 0;
  const viewCount = post.viewCount ?? post.views ?? 0;
  const hasImage = (post.imageCount ?? 0) > 0 || post.hasImage;
  const imageCount = post.imageCount ?? (post.hasImage ? 1 : 0);
  const nickname = post.nickname ?? post.nickname;

  return (
    <article
      key={postId}
      className="cursor-pointer border-b border-[#EEEEEE] px-6 py-4"
      onClick={() => navigate(`/index/community/${postId}`)}
    >
      <div className="flex gap-3">
        <div className="min-w-0 flex-1">
          <div className="flex justify-between">
            <div>
              <div className="mb-2 flex items-center gap-1 text-[14px]">
                <span className="rounded border-[0.5px] border-[#9E9E9E] px-2 py-[2px] text-[#616161]">
                  {categoryLabel}
                </span>
                <span className="rounded bg-[#F5F5F5] px-2 py-[2px] text-[#9E9E9E]">
                  {animalLabel}
                </span>
              </div>

              <h3 className="mb-2 text-[18px] font-medium text-[#1E1E1E]">
                {post.title}
              </h3>
              <p className="mb-[28px] text-[16px] text-[#424242]">
                {post.content}
              </p>
            </div>

            {hasImage && (
              <div className="relative ml-3 h-[90px] w-[90px] shrink-0 overflow-hidden rounded-[8px] bg-gray-100">
                {post.thumbnailUrl && (
                  <img
                    src={post.thumbnailUrl}
                    alt="게시글 썸네일"
                    className="h-full w-full object-cover"
                  />
                )}
                <span className="absolute top-0 left-0 rounded-tl-[8px] rounded-br-[8px] bg-[#222222]/50 px-1 px-[6.5px] py-[2px] text-[11px] text-white">
                  {imageCount}
                </span>
              </div>
            )}
          </div>

          <div className="flex items-center justify-between">
            <div className="flex flex-row items-center gap-[2px] text-[14px] text-[#9E9E9E]">
              {
                <>
                  {nickname}
                  <img src={dot} alt="구분점" />
                </>
              }
              {createdAt}
              <img src={dot} alt="구분점" />
              <img src={eye} alt="조회수" /> {viewCount}
            </div>

            <div className="flex justify-end gap-3 text-sm text-[#A3A3A3]">
              <p className="flex items-center gap-1">
                <span className={isLiked ? 'text-[#E74D23]' : 'text-[#B8B8B8]'}>
                  <LikeHeartIcon liked={isLiked} />
                </span>{' '}
                {likeCount}
              </p>
              <p className="flex items-center gap-1">
                <img src={message} alt="댓글" /> {commentCount}
              </p>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
