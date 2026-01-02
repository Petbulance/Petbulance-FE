import { useEffect, useState } from 'react';
import Autoplay from 'embla-carousel-autoplay';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';

const BANNERS = [
  { id: 1, title: '신규 제휴 병원 공지', desc: '리틀버드서울 버드앤조류클리닉', image: 'https://placehold.co/600x300?text=Banner+1' },
  { id: 2, title: '야간 진료 병원 안내', desc: '조류 전문 24시 응급 병원', image: 'https://placehold.co/600x300?text=Banner+2' },
  { id: 3, title: '응급 진료 가능 병원', desc: '주말 · 공휴일 진료', image: 'https://placehold.co/600x300?text=Banner+3' },
  { id: 4, title: '소형동물 전문 병원', desc: '리뷰 만족도 1위', image: 'https://placehold.co/600x300?text=Banner+4' },
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
        opts={{ loop: true }}
        plugins={[
          Autoplay({
            delay: 1000,
            stopOnInteraction: false,
          }),
        ]}
        className="overflow-hidden rounded-xl"
      >
        <CarouselContent className="-ml-4">
          {BANNERS.map((banner) => (
            <CarouselItem
              key={banner.id}
              className="basis-[90%] pl-4"
            >
              <div className="relative overflow-hidden rounded-xl">
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
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
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
            className={`h-2 w-2 rounded-full transition-colors ${
              index === current
                ? 'bg-black'
                : 'bg-gray-400'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
