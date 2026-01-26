import Autoplay from 'embla-carousel-autoplay';
import { Star } from 'lucide-react';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';

const REVIEWS = [
  {
    id: 1,
    hospital: '리틀버드 동물병원',
    rating: 3.8,
    count: 124,
    image: 'https://picsum.photos/seed/hospital1/200/200',
    content:
      '동스탑을 사용해서 동물병원에 갔습니다. 대기시간은 30분 정도였고, 원장님께서 매우 꼼꼼하게 봐주셨매우 꼼꼼하게 봐주셨매우 꼼꼼하게 봐주셨매우 꼼꼼하게 봐주셨매우 꼼꼼하게 봐주셨매우 꼼꼼하게 봐주셨어요.',
  },
  {
    id: 2,
    hospital: '조류전문 병원A',
    rating: 2.6,
    count: 98,
    image: 'https://picsum.photos/seed/hospital2/200/200',
    content:
      '앵무새 진료로 방문했는데 설명이 정말 자세했고, 시설도 깔끔해서 믿음이 갔어요.',
  },
  {
    id: 3,
    hospital: '24시 응급동물병원',
    rating: 4.4,
    count: 210,
    image: 'https://picsum.photos/seed/hospital3/200/200',
    content:
      '야간에 급하게 방문했는데도 빠르게 대응해주셔서 정말 감사했습니다.',
  },
  {
    id: 4,
    hospital: '소형동물 전문병원',
    rating: 4.7,
    count: 156,
    image: 'https://picsum.photos/seed/hospital4/200/200',
    content:
      '햄스터 진료가 가능한 병원이 많지 않은데, 여기서는 정말 세심하게 봐주세요.',
  },
  {
    id: 5,
    hospital: '동물병원 더케어',
    rating: 4.5,
    count: 87,
    image: 'https://picsum.photos/seed/hospital5/200/200',
    content: '강아지 예방접종으로 방문했는데 친절하고 비용도 합리적이었어요.',
  },
  {
    id: 6,
    hospital: '고양이전문 병원C',
    rating: 4.9,
    count: 302,
    image: 'https://picsum.photos/seed/hospital6/200/200',
    content:
      '고양이 스트레스를 최소화해주는 환경이 인상적이었고 설명도 아주 만족스러웠어요.',
  },
  {
    id: 7,
    hospital: '이색동물 클리닉',
    rating: 4.3,
    count: 65,
    image: 'https://picsum.photos/seed/hospital7/200/200',
    content: '도마뱀 진료가 가능한 병원이라 방문했습니다. 전문성이 느껴졌어요.',
  },
  {
    id: 8,
    hospital: '펫케어 동물병원',
    rating: 4.6,
    count: 143,
    image: 'https://picsum.photos/seed/hospital8/200/200',
    content: '대기시간은 조금 있었지만 진료가 꼼꼼해서 충분히 만족했습니다.',
  },
  {
    id: 9,
    hospital: '우리동네 동물의원',
    rating: 4.2,
    count: 54,
    image: 'https://picsum.photos/seed/hospital9/200/200',
    content: '동네 병원이라 편하게 방문했어요. 전반적으로 무난했습니다.',
  },
  {
    id: 10,
    hospital: '프리미엄 동물메디컬',
    rating: 4.8,
    count: 189,
    image: 'https://picsum.photos/seed/hospital10/200/200',
    content: '시설이 최신식이고 의료진이 정말 전문적이라는 느낌을 받았습니다.',
  },
];

function RatingStars({ rating }) {
  const filledStars = Math.floor(rating); // 4.8 → 4
  const totalStars = 5;

  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: totalStars }).map((_, index) => (
        <Star
          key={index}
          size={12}
          className={
            index < filledStars
              ? 'fill-yellow-400 text-yellow-400'
              : 'fill-gray-300 text-gray-300'
          }
        />
      ))}
    </div>
  );
}

export default function LatestReceiptReview() {
  return (
    <section className="bg-white px-[24px] py-[24px]">
      {/* 타이틀 */}
      <div className="mb-2 flex items-center justify-between">
        <h2 className="text-[19px] font-semibold">최신 영수증 후기</h2>
        <button className=" ">{'>'}</button>
      </div>

      {/* 캐러셀 */}
      <div className="-mr-[24px]">
        <Carousel
          opts={{ loop: true, align: 'start' }}
          plugins={[
            Autoplay({
              delay: 2500,
              stopOnInteraction: false,
            }),
          ]}
          className="pr-[-24px]"
        >
          <CarouselContent className="-ml-4">
            {REVIEWS.map((review) => (
              <CarouselItem key={review.id} className="basis-[70%] pl-4">
                {/* 카드 */}
                <div className="flex gap-3 rounded-xl bg-gray-100 p-3 shadow-sm">
                  {/* 좌측 이미지 */}
                  <img
                    src={review.image}
                    alt={review.hospital}
                    className="h-20 w-20 flex-shrink-0 rounded-lg object-cover"
                  />

                  {/* 우측 내용 */}
                  <div className="flex flex-1 flex-col">
                    <p className="text-sm font-semibold">{review.hospital}</p>

                    <div className="mt-0.5 flex items-center gap-1 text-xs text-gray-500">
                      <RatingStars rating={review.rating} />
                      <span>({review.rating})</span>
                      <span>· 후기 {review.count}</span>
                    </div>

                    <p className="mt-1 line-clamp-2 text-xs text-gray-500">
                      {review.content}
                    </p>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
}
