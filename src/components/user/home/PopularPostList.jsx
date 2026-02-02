import { ChevronRight, Star } from 'lucide-react';

import soon from '@/assets/images/pageImages/soon.png';
export default function PopularPostList() {
  /* =============================
     🔽 기존 인기 게시글 리스트 (보존)
  ============================== */
  /*
  return (
    <section>
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-[19px] font-semibold">인기 게시글</h2>
         <button className="">
          <ChevronRight size={20} />{' '}
        </button>
      </div>

      <div className="space-y-3">
        {POPULAR_POSTS.slice(0, 5).map((post) => (
          <div
            key={post.id}
            className="flex items-center justify-between rounded-xl bg-gray-100 px-4 py-3"
          >
            <div className="flex flex-col gap-1">
              <p className="line-clamp-1 text-[15px] font-medium">
                {post.title}
              </p>

              <div className="flex items-center gap-2 text-xs text-gray-400">
                <span>{post.animalCategory}</span>
                <span>·</span>
                <span>{post.postCategory}</span>
                <span>·</span>
                <span>{post.createdAt}</span>
                <span>·</span>
                <span>조회 {post.viewCount}</span>
              </div>
            </div>

            <div className="flex h-[56px] w-[56px] flex-col items-center justify-center rounded-[12px] bg-white">
              <span className="text-success text-[19px] font-semibold">
                {post.commentCount}
              </span>
              <span className="text-[14px] text-gray-400">댓글</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
  */

  /* =============================
     ✅ Coming Soon 레이아웃
  ============================== */
  return (
    <section>
      {/* 헤더 */}
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-[19px] font-semibold">커뮤니티 인기 게시글</h2>
        <button className="">
          <ChevronRight size={20} />{' '}
        </button>
      </div>

      {/* Coming Soon 카드 */}
      <div className="rounded-xl bg-[#F7F7F7] px-4 py-10">
        <div className="flex flex-col items-center text-center">
          {/* ⏳ 아이콘 영역 */}
          <div className="mb-4 flex items-center justify-center">
            {/* 👉 여기 src만 채우면 됨 */}
            <img src={soon} alt="coming-soon" className="h-[64px] w-[64px]" />
          </div>

          {/* 텍스트 */}
          <p className="text-[18px] font-semibold text-[#1e1e1e]">
            Coming Soon
          </p>

          <p className="mt-2 text-[14px] leading-relaxed text-[#9E9E9E]">
            커뮤니티 기능 준비중이에요!
            <br />
            빠른 시일 내에 찾아qhlf게요.
          </p>
        </div>
      </div>
    </section>
  );
}
