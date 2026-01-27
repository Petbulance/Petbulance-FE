import Autoplay from 'embla-carousel-autoplay';
import { useEffect, useState } from 'react';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';

const BANNERS = [
  {
    id: 1,
    title: '신규 제휴 병원 공지',
    desc: '리틀버드서울 버드앤조류클리닉',
    image: 'https://picsum.photos/seed/banner1/800/400',
  },
  {
    id: 2,
    title: '야간 진료 병원 안내',
    desc: '조류 전문 24시 응급 병원',
    image: 'https://picsum.photos/seed/banner2/800/400',
  },
  {
    id: 3,
    title: '응급 진료 가능 병원',
    desc: '주말 · 공휴일 진료',
    image: 'https://picsum.photos/seed/banner3/800/400',
  },
  {
    id: 4,
    title: '소형동물 전문 병원',
    desc: '리뷰 만족도 1위',
    image: 'https://picsum.photos/seed/banner4/800/400',
  },
  {
    id: 5,
    title: '이색동물 진료 가능',
    desc: '도마뱀 · 앵무새 · 햄스터',
    image: 'https://picsum.photos/seed/banner5/800/400',
  },
  {
    id: 6,
    title: '초보 보호자 추천',
    desc: '상담이 친절한 병원 모음',
    image: 'https://picsum.photos/seed/banner6/800/400',
  },
  {
    id: 7,
    title: '고양이 전문 클리닉',
    desc: '스트레스 최소화 진료',
    image: 'https://picsum.photos/seed/banner7/800/400',
  },
  {
    id: 8,
    title: '강아지 예방접종 시즌',
    desc: '합리적인 비용 안내',
    image: 'https://picsum.photos/seed/banner8/800/400',
  },
  {
    id: 9,
    title: '우리동네 동물병원',
    desc: '거리순 · 후기순 추천',
    image: 'https://picsum.photos/seed/banner9/800/400',
  },
  {
    id: 10,
    title: '프리미엄 동물 메디컬',
    desc: '최신 의료 장비 보유',
    image: 'https://picsum.photos/seed/banner10/800/400',
  },
];

export default function HomeBanner() {
  const [api, setApi] = useState(null);
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) return;

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <div className="w-full">
      {/* ================= 배너 캐러셀 ================= */}
      <Carousel
        setApi={setApi}
        opts={{ loop: true, align: 'center' }}
        plugins={[
          Autoplay({
            delay: 2500,
            stopOnInteraction: false,
          }),
        ]}
        className="overflow-hidden"
      >
        <CarouselContent className="-ml-0">
          {BANNERS.map((banner) => (
            <CarouselItem
              key={banner.id}
              className="mr-[10px] basis-[90%] pl-0"
            >
              <div className="relative overflow-hidden rounded-lg">
                <img
                  src={banner.image}
                  alt={banner.title}
                  className="h-40 w-full object-cover"
                />

                {/* 오버레이 */}
                <div className="absolute inset-0 bg-black/30 p-4 text-white">
                  <p className="text-sm">{banner.title}</p>
                  <h3 className="mt-1 text-base font-semibold">
                    {banner.desc}
                  </h3>

                  {/* 하단 버튼 영역 */}
                  <div className="absolute right-3 bottom-3 left-3 flex items-center justify-between">
                    <button className="rounded-md bg-white/90 px-3 py-1 text-xs font-medium text-black">
                      자세히
                    </button>

                    <button className="rounded-full bg-black/60 px-3 py-1 text-xs text-white">
                      {current + 1} / {count} 모두 보기
                    </button>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      {/* ================= dot 인디케이터 ================= */}
      <div className="mt-3 flex justify-center gap-3">
        {Array.from({ length: count }).map((_, index) => (
          <button
            key={index}
            onClick={() => api?.scrollTo(index)}
            className={`h-1 w-1 rounded-full transition-colors ${
              index === current ? 'bg-black' : 'bg-gray-400'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
