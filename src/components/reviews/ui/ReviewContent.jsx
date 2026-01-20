import placeholder from '@/assets/images/pageImages/placeholder.svg';
import { ReviewCard } from '@/components/hosiptals/ui/HospitalDetail/review/ReviewCard';

export function ReviewContent() {
  const reviewData = [
    {
      id: 1,
      tag: '소형포유류',
      user: '햄스터조련사',
      date: '2025.11.10',
      category: '햄스터',
      treatment: '상처봉합, 약처방',
      content:
        '주말에 갑자기 햄스터가 원인불명으로 아픈 바람에 급하게 펫불런스에서 가까운 병원을 찾았는데 정말 다행이었어요. 선생님도 너무 친절하시고 설명도 잘 해주셨습니다.',
      price: '84,700원',
      rating: 4,
      image: null,
      imageCount: 0,
      likeCount: 24,
    },
    {
      id: 2,
      tag: '조류',
      user: '앵무새조련사',
      date: '2025.12.05',
      category: '앵무새',
      treatment: '비타민 주사, 진료',
      content:
        '정말 친절한 의사선생님이 계셔서 좋았습니다. 앵무새가 무기력해 보여서 방문했는데 비타민 주사 맞고 금방 기운을 차렸네요. 시설도 아주 깔끔합니다.',
      price: '125,000원',
      rating: 5,
      image: placeholder,
      imageCount: 5,
      likeCount: 25,
    },
    {
      id: 2,
      tag: '조류',
      user: '앵무새조련사',
      date: '2025.12.05',
      category: '앵무새',
      treatment: '비타민 주사, 진료',
      content:
        '정말 친절한 의사선생님이 계셔서 좋았습니다. 앵무새가 무기력해 보여서 방문했는데 비타민 주사 맞고 금방 기운을 차렸네요. 시설도 아주 깔끔합니다.',
      price: '125,000원',
      rating: 5,
      image: placeholder,
      imageCount: 5,
      likeCount: 25,
    },
    {
      id: 2,
      tag: '조류',
      user: '앵무새조련사',
      date: '2025.12.05',
      category: '앵무새',
      treatment: '비타민 주사, 진료',
      content:
        '정말 친절한 의사선생님이 계셔서 좋았습니다. 앵무새가 무기력해 보여서 방문했는데 비타민 주사 맞고 금방 기운을 차렸네요. 시설도 아주 깔끔합니다.',
      price: '125,000원',
      rating: 5,
      image: placeholder,
      imageCount: 5,
      likeCount: 25,
    },
    {
      id: 2,
      tag: '조류',
      user: '앵무새조련사',
      date: '2025.12.05',
      category: '앵무새',
      treatment: '비타민 주사, 진료',
      content:
        '정말 친절한 의사선생님이 계셔서 좋았습니다. 앵무새가 무기력해 보여서 방문했는데 비타민 주사 맞고 금방 기운을 차렸네요. 시설도 아주 깔끔합니다.',
      price: '125,000원',
      rating: 5,
      image: placeholder,
      imageCount: 5,
      likeCount: 25,
    },
  ];

  return (
    <div className="flex flex-col bg-white pt-14">
      {reviewData.map((review) => (
        <ReviewCard key={review.id} review={review} />
      ))}
    </div>
  );
}
