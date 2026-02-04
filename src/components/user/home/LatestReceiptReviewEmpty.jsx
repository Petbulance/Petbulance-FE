import Autoplay from 'embla-carousel-autoplay';
import { ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';

const PLACEHOLDER_CARDS = [
  {
    title: '아직 등록된 후기가 없어요.',
    subtitle: '생생한 첫 후기를 남겨주세요!',
  },
  {
    title: '진료받은 경험을 공유해 주세요.',
    subtitle: '보호자님의 경험이 누군가에게 큰 도움이 될 수 있어요.',
  },
  {
    title: '아직 등록된 후기가 없어요.',
    subtitle: '우리 아이의 진료 경험을 공유해주세요!',
  },
  {
    title: '생생한 진료 후기를 남겨주세요.',
    subtitle: '후기를 작성하면 다른 보호자에게 큰 도움이 되어요!',
  },
  {
    title: '아직 후기가 없어요.',
    subtitle: '보호자님의 경험이 누군가에게 큰 도움이 될 수 있어요.',
  },
];

export default function LatestReceiptReviewEmpty({ images = [] }) {
  const navigate = useNavigate();

  return (
    <section className="bg-white px-[24px] py-[24px]">
      {/* ================= 타이틀 ================= */}
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-[19px] font-semibold">최신 영수증 후기</h2>
        <button onClick={() => navigate('/index/reviews')}>
          <ChevronRight size={20} />
        </button>
      </div>

      {/* ================= 플레이스홀더 캐러셀 ================= */}
      <div className="-mx-[12px]">
        <Carousel
          opts={{ loop: true, align: 'start' }}
          plugins={[
            Autoplay({
              delay: 2200,
              stopOnInteraction: false,
            }),
          ]}
        >
          <CarouselContent className="-ml-3">
            {PLACEHOLDER_CARDS.map((card, idx) => (
              <CarouselItem key={idx} className="basis-[60%] pl-4">
                <div className="flex h-[160px] flex-col items-center justify-center gap-3 rounded-2xl bg-[#F5F5F5] px-5 py-6 shadow-sm">
                  {/* 이미지 */}
                  <div className="flex h-16 w-16 items-center justify-center rounded-full">
                    {images.length > 0 && images[idx % images.length] ? (
                      <img
                        src={images[idx % images.length]}
                        alt="빈 후기"
                        className="h-[60px] w-[60px] object-contain"
                      />
                    ) : (
                      <span className="text-2xl">🧸</span>
                    )}
                  </div>

                  {/* 텍스트 */}
                  <div className="flex flex-col items-center gap-1">
                    <p className="text-[19px] font-semibold text-[#1e1e1e]">
                      {card.title}
                    </p>
                    <p className="text-[14px] text-[#1e1e1e]">
                      {card.subtitle}
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
