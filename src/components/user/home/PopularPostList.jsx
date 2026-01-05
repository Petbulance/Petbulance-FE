const POPULAR_POSTS = [
  {
    id: 1,
    title: '울집 햄찌 자랑좀 보고가세요ㅎㅎ',
    animalCategory: '소형포유류',
    postCategory: '일상/자랑',
    createdAt: '1시간 전',
    viewCount: 212,
    commentCount: 24,
  },
  {
    id: 2,
    title: '우리집 앵무새 말하는 영상',
    animalCategory: '조류',
    postCategory: '일상',
    createdAt: '2시간 전',
    viewCount: 180,
    commentCount: 18,
  },
  {
    id: 3,
    title: '도마뱀 탈피 성공 후기',
    animalCategory: '파충류',
    postCategory: '정보',
    createdAt: '3시간 전',
    viewCount: 95,
    commentCount: 7,
  },
  {
    id: 4,
    title: '고슴도치 병원 다녀왔어요',
    animalCategory: '소형포유류',
    postCategory: '후기',
    createdAt: '5시간 전',
    viewCount: 321,
    commentCount: 42,
  },
  {
    id: 5,
    title: '고양이 예방접종 시기 질문',
    animalCategory: '고양이',
    postCategory: '질문',
    createdAt: '6시간 전',
    viewCount: 144,
    commentCount: 9,
  },
];

export default function PopularPostList() {
  return (
    <section>
      {/* 헤더 */}
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-[19px] font-semibold">인기 게시글</h2>
        <button className="">{'>'}</button>
      </div>

      {/* 리스트 */}
      <div className="space-y-3">
        {POPULAR_POSTS.slice(0, 5).map((post) => (
          <div
            key={post.id}
            className="flex items-center justify-between rounded-xl bg-gray-100 px-4 py-3"
          >
            {/* 좌측 영역 */}
            <div className="flex flex-col gap-1">
              {/* 제목 */}
              <p className="line-clamp-1 text-[15px] font-medium">
                {post.title}
              </p>

              {/* 메타 정보 */}
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

            {/* 우측 댓글 영역 */}
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
}
