import Autoplay from 'embla-carousel-autoplay';
import { useEffect, useState } from 'react';

import api from '@/apis/api.jsx';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';

/* ===============================
   상태 → 라벨 매핑
=============================== */
const NOTICE_STATUS_LABEL = {
  NOTICE: '공지',
  EVENT: '이벤트',
  ADVERTISING: '광고',
};

export default function HomeBanner() {
  const [apiEmbla, setApiEmbla] = useState(null);
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  const [notices, setNotices] = useState([]);

  /* ===============================
     공지사항 조회 (최초 1회)
  =============================== */
  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const res = await api.get('/notices', {
          params: {
            pageSize: 10,
            lastNoticeId: null,
          },
        });
        console.log(res);
        setNotices(res.data.data.content);
      } catch (e) {
        console.error(e);
      }
    };

    fetchNotices();
  }, []);

  /* ===============================
     캐러셀 상태 연동
  =============================== */
  useEffect(() => {
    if (!apiEmbla) return;

    setCount(apiEmbla.scrollSnapList().length);
    setCurrent(apiEmbla.selectedScrollSnap());

    apiEmbla.on('select', () => {
      setCurrent(apiEmbla.selectedScrollSnap());
    });
  }, [apiEmbla]);

  if (notices.length === 0) return null;

  return (
    <div className="w-full">
      {/* ================= 배너 캐러셀 ================= */}
      <Carousel
        setApi={setApiEmbla}
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
          {notices.map((notice) => (
            <CarouselItem
              key={notice.noticeId}
              className="mr-[10px] basis-[90%] pl-0"
            >
              <div className="relative overflow-hidden rounded-lg">
                {/* 임시 배너 이미지 (공지용) */}
                <div className="h-40 w-full bg-gradient-to-r from-gray-800 to-gray-600" />

                {/* 오버레이 */}
                <div className="absolute inset-0 bg-black/30 p-4 text-white">
                  {/* 상태 배지 */}
                  <span className="inline-block rounded-full bg-white/90 px-2 py-0.5 text-xs font-semibold text-black">
                    {NOTICE_STATUS_LABEL[notice.noticeStatus]}
                  </span>

                  <p className="mt-2 text-sm">{notice.title}</p>
                  <h3 className="mt-1 line-clamp-2 text-base font-semibold">
                    {notice.content}
                  </h3>

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
            onClick={() => apiEmbla?.scrollTo(index)}
            className={`h-1 w-1 rounded-full transition-colors ${
              index === current ? 'bg-black' : 'bg-gray-400'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
