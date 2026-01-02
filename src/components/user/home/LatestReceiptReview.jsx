import Autoplay from 'embla-carousel-autoplay';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';

const REVIEWS = [
  {
    id: 1,
    hospital: '동물병원A',
    content: '친절하고 설명이 자세했어요.',
  },
  {
    id: 2,
    hospital: '조류전문병원B',
    content: '시설이 깔끔하고 믿음이 갔어요.',
  },
  {
    id: 3,
    hospital: '24시 응급병원C',
    content: '야간에도 빠르게 대응해줬어요.',
  },
];

export default function LatestReceiptReview() {
  return (
    <section>
      <div className="mb-2 flex items-center justify-between">
        <h2 className="text-sm font-semibold">최신 영수증 후기</h2>
        <button className="text-xs text-gray-400">{'>'}</button>
      </div>

      <Carousel
        opts={{ loop: true, align: 'start' }}
        plugins={[
          Autoplay({
            delay: 1000,
            stopOnInteraction: false,
          }),
        ]}
      >
        <CarouselContent>
          {REVIEWS.map((review) => (
            <CarouselItem
              key={review.id}
              className="basis-[85%]"
            >
              <div className="rounded-xl bg-white p-4 shadow-sm">
                <div className="mb-2 h-24 rounded bg-gray-100" />
                <p className="text-sm font-semibold">
                  {review.hospital}
                </p>
                <p className="mt-1 text-xs text-gray-500 line-clamp-2">
                  {review.content}
                </p>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </section>
  );
}
