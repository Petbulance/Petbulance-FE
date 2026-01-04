import emptyReview from '@/assets/images/pageImages/emptyReview.svg';
import thumbsUpDouble from '@/assets/images/icons/Thumbs-up-double--filled.svg';
import reviewsCheck from '@/assets/images/icons/ReviewsCheck.svg';
import ReviewList from '@/components/user/my/reviewManage/ReviewList.jsx';
import EmptyReview from '@/components/user/my/reviewManage/EmptyReview.jsx';

/* ================= 더미 데이터 ================= */
const DUMMY_REVIEWS = [
  {
    id: 1,
    status: '등록완료',
    hospitalName: '리틀버드서울 버드앤조류클리닉',
    date: '2025-09-01',
    likeCount: 99,
    content:
      '작은 포유류 키우고 있는 분들한테 최고의 병원이에요. 진료비도 부담스럽지 않고, 전문 수의사분들이 많아서 믿고 갔어요. 햄스터 진료 경험이 많아서 설명도 아주 자세하게 해주셨습니다.',
    hasImage: false,
    hasReceipt: true,
  },
  {
    id: 2,
    status: '검수중',
    hospitalName: '24시 드림동물메디컬센터',
    date: '2025-09-01',
    likeCount: 87,
    content:
      '주차 2시간 무료라서 좋았어요. 소동물 전문병원이라 진료 경험이 많아 안심됐습니다. 야간에도 진료가 가능해서 급한 상황에 방문했는데 대응이 빨랐어요.',
    hasImage: true,
    hasReceipt: false,
  },
  {
    id: 3,
    status: '등록완료',
    hospitalName: '포유류 전문 해피펫동물병원',
    date: '2025-08-30',
    likeCount: 120,
    content:
      '햄스터 진료가 가능한 병원이 많지 않은데 여기서는 정말 세심하게 봐주셨어요. 작은 아이들 다루는 방법도 능숙해서 믿음이 갔습니다.',
    hasImage: false,
    hasReceipt: false,
  },
  {
    id: 4,
    status: '등록완료',
    hospitalName: '서울숲동물의료센터',
    date: '2025-08-28',
    likeCount: 45,
    content:
      '대기시간은 조금 있었지만 진료 설명이 정말 자세해서 충분히 만족했습니다. 검사 결과도 이해하기 쉽게 설명해주셔서 좋았어요.',
    hasImage: true,
    hasReceipt: true,
  },
  {
    id: 5,
    status: '검수중',
    hospitalName: '조류·이색동물 라온동물병원',
    date: '2025-08-25',
    likeCount: 63,
    content:
      '앵무새 진료로 방문했어요. 조류에 대한 이해도가 높아서 믿음이 갔고, 사육 환경에 대한 조언도 함께 해주셔서 도움이 많이 됐습니다.',
    hasImage: false,
    hasReceipt: false,
  },
  {
    id: 6,
    status: '등록완료',
    hospitalName: '스몰애니멀케어 동물병원',
    date: '2025-08-22',
    likeCount: 31,
    content:
      '고슴도치 진료를 받았는데 스트레스를 최소화해서 진료해주셔서 좋았어요. 아이가 크게 놀라지 않아서 보호자 입장에서 안심됐습니다.',
    hasImage: true,
    hasReceipt: true,
  },
  {
    id: 7,
    status: '등록완료',
    hospitalName: '한강소동물전문병원',
    date: '2025-08-20',
    likeCount: 76,
    content:
      '소형동물 전문 병원이라 그런지 수의사 선생님이 정말 익숙하게 다뤄주셨어요. 진료 과정이 매끄럽고 불필요한 검사도 없었습니다.',
    hasImage: false,
    hasReceipt: false,
  },
  {
    id: 8,
    status: '검수중',
    hospitalName: '우리동네펫케어동물병원',
    date: '2025-08-18',
    likeCount: 54,
    content:
      '시설이 깔끔하고 간호사분들도 친절해서 첫 방문인데도 편했어요. 예약 시스템도 잘 되어 있어서 대기시간이 길지 않았습니다.',
    hasImage: true,
    hasReceipt: false,
  },
  {
    id: 9,
    status: '등록완료',
    hospitalName: '24시 위드펫 응급동물병원',
    date: '2025-08-15',
    likeCount: 102,
    content:
      '야간 진료가 가능해서 급한 상황에 정말 도움이 됐습니다. 응급 상황에서도 차분하게 설명해주셔서 믿고 맡길 수 있었어요.',
    hasImage: false,
    hasReceipt: true,
  },
  {
    id: 10,
    status: '등록완료',
    hospitalName: '마이펫동물의료센터',
    date: '2025-08-12',
    likeCount: 88,
    content:
      '비용도 합리적이고 불필요한 검사 권유가 없어서 좋았어요. 보호자 입장에서 신뢰가 가는 병원이라고 느꼈습니다.',
    hasImage: false,
    hasReceipt: false,
  },
  {
    id: 11,
    status: '검수중',
    hospitalName: '이색동물전문 닥터펫클리닉',
    date: '2025-08-10',
    likeCount: 40,
    content:
      '도마뱀 진료가 가능한 병원이라 방문했습니다. 파충류 진료 경험이 많아 보였고, 사육 환경 관리 방법도 자세히 알려주셨어요.',
    hasImage: true,
    hasReceipt: false,
  },
  {
    id: 12,
    status: '등록완료',
    hospitalName: '초보보호자추천 동물병원',
    date: '2025-08-08',
    likeCount: 67,
    content:
      '설명이 정말 꼼꼼해서 초보 보호자도 이해하기 쉬웠습니다. 질문을 많이 해도 친절하게 하나하나 답변해주셨어요.',
    hasImage: false,
    hasReceipt: true,
  },
  {
    id: 13,
    status: '등록완료',
    hospitalName: '프리미엄펫메디컬센터',
    date: '2025-08-05',
    likeCount: 150,
    content:
      '우리 동네에 이런 병원이 있다는 게 너무 든든해요. 시설도 최신이고 의료 장비도 잘 갖춰져 있어서 재방문 의사 확실합니다.',
    hasImage: true,
    hasReceipt: true,
  },
];


export default function ReviewManage() {
  const reviews = DUMMY_REVIEWS;

  return (
    <div className="flex h-full flex-col bg-white">
      <main className="flex-1 overflow-y-auto">
        {reviews.length === 0 ? (
          <EmptyReview />
        ) : (
          <ReviewList reviews={reviews} />
        )}
      </main>
    </div>
  );
}

