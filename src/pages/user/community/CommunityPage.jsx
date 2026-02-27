import { useState } from 'react';

import { CommunityHeader } from '@/components/community/layout/CommunityHeader';
import { TOPIC_FILTERS } from '@/data/community';
import { TopicFilterChips } from '@/components/community/ui/TopicFilterChips';
import { SortDropdown } from '@/components/community/ui/SortDropdown';
import { NoticeBanner } from '@/components/community/ui/NoticeBanner';
import { PostCard } from '@/components/community/ui/PostCard';
import { WriteButton } from '@/components/community/ui/WriteButton';

const POSTS = [
  {
    id: 1,
    nickname: '파충류집사',
    category: '용품/사료',
    animal: '동물종',
    title: '게코 도마뱀 키우시는 분 있나요?',
    content: '케이지 추천해주세요!',
    time: '19시간 전',
    views: 132,
    likes: 8,
    comments: 12,
    hasImage: true,
  },
  {
    id: 2,
    nickname: '햄찌맘',
    category: '카테고리',
    animal: '동물종',
    title: '햄스터 다리 왜이럴까요??',
    content:
      '어제부터 약간씩 저는것같은데 병원을 가봐야할지 어떻게 할지 모르겠어요. 케이지 안에 미끄럼틀 타다가 그런건지걱정돼요',
    time: '3시간 전',
    views: 54,
    likes: 4,
    comments: 3,
    hasImage: false,
  },
  {
    id: 3,
    nickname: '베타아빠',
    category: '건강/질병',
    animal: '동물종',
    title: '베타 먹이 급여량 문제일까요?',
    content:
      '베타가 움직임이 엄청 둔해지고 먹는 것도 줄어든 것 같고 소화가 잘 안되는 것 같아요. 먹이의 문제일까요? 소금욕이라도 해줘야 될까요?',
    time: '19시간 전',
    views: 132,
    likes: 8,
    comments: 12,
    hasImage: true,
  },
  {
    id: 4,
    nickname: '거북이러버',
    category: '건강/질병',
    animal: '동물종',
    title: '거북이 비만',
    content:
      '거북이가 너무 살이 쪄서 걱정이에요. 운동을 시키고 싶은데, 어떤 놀이가 좋을까요? 원래 거북이들 살 잘 안찌지 않나요?',
    time: '19시간 전',
    views: 132,
    likes: 8,
    comments: 12,
    hasImage: true,
  },
  {
    id: 5,
    nickname: '토순이집사',
    category: '건강/질병',
    animal: '동물종',
    title: '토끼 식사량 질문',
    content:
      '최근에 식사를 잘 하지 않는 것 같아요. 건강 상태가 걱정되네요. 얼마 전에 건초 새로 바꿨는데, 이게 문제일까요? 스트레스에 민감한 아이라 걱정돼요.',
    time: '19시간 전',
    views: 132,
    likes: 8,
    comments: 12,
    hasImage: true,
  },
  {
    id: 6,
    nickname: '기니피그초보',
    category: '건강/질병',
    animal: '동물종',
    title: '기니피그 붉은 발진',
    content:
      '기니피그 발바닥 부분에 붉은 발진이 갑자기 생겼어요. 급히 약이 필요한지, 집에서 먼저 해줄 수 있는 게 있을까요?',
    time: '19시간 전',
    views: 132,
    likes: 8,
    comments: 12,
    hasImage: true,
  },
];

export default function CommunityPage() {
  const [selectedTopic, setSelectedTopic] = useState(TOPIC_FILTERS[0]);
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [selectedSort, setSelectedSort] = useState('최신순');

  return (
    <div className="relative min-h-full bg-[#F2F4F6]">
      <section className="border-b border-gray-200 bg-white">
        <CommunityHeader />
        <TopicFilterChips
          selectedTopic={selectedTopic}
          onSelectTopic={setSelectedTopic}
        />
        <SortDropdown
          selectedSort={selectedSort}
          isSortOpen={isSortOpen}
          onToggleSort={() => setIsSortOpen((prev) => !prev)}
          onSelectSort={(sort) => {
            setSelectedSort(sort);
            setIsSortOpen(false);
          }}
        />
      </section>

      <NoticeBanner />

      <section className="bg-white">
        {POSTS.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </section>

      <WriteButton />
    </div>
  );
}
