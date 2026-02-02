import Autoplay from 'embla-carousel-autoplay';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import api from '@/apis/api.jsx';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';

export default function HomeBanner() {
  const navigate = useNavigate();

  const [apiInstance, setApiInstance] = useState(null);
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);
  const [banners, setBanners] = useState([]);

  /* ===============================
     배너 조회
  =============================== */
  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const res = await api.get('/banners/home');
        setBanners(res.data.data);
      } catch (e) {
        console.error(e);
      }
    };

    fetchBanners();
  }, []);

  /* ===============================
     캐러셀 상태
  =============================== */
  useEffect(() => {
    if (!apiInstance) return;

    setCount(apiInstance.scrollSnapList().length);
    setCurrent(apiInstance.selectedScrollSnap());

    apiInstance.on('select', () => {
      setCurrent(apiInstance.selectedScrollSnap());
    });
  }, [apiInstance]);

  if (!banners.length) return null;

  return (
    <div className="w-full">
      {/* ================= 배너 캐러셀 ================= */}
      <Carousel
        setApi={setApiInstance}
        opts={{ loop: true, align: 'center' }}
        plugins={[
          Autoplay({
            delay: 2500,
            stopOnInteraction: false,
          }),
        ]}
        className="mx-auto max-w-full overflow-hidden"
      >
        <CarouselContent className="-ml-0">
          {banners.map((banner) => (
            <CarouselItem key={banner.bannerId} className="basis-full pl-0">
              <div
                className="relative cursor-pointer overflow-hidden rounded-lg"
                onClick={() =>
                  navigate(`/index/mypage/notice/${banner.noticeId}`)
                }
              >
                <img
                  src={banner.imageUrl}
                  alt="banner"
                  className="h-40 w-full object-cover"
                />

                {/* 오버레이 */}
                <div className="absolute inset-0 p-4 text-white">
                  {/* 하단 버튼 영역 */}
                  <div className="absolute right-3 bottom-3 left-3 flex items-center justify-between">
                    <button className="rounded-md bg-white/90 px-3 py-1 text-xs font-medium text-black">
                      자세히
                    </button>

                    <button className="rounded-full bg-black/60 px-3 py-1 text-xs text-white">
                      {current + 1} / {count}
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
            onClick={() => apiInstance?.scrollTo(index)}
            className={`h-1 w-1 rounded-full transition-colors ${
              index === current ? 'bg-black' : 'bg-gray-400'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
