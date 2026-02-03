import Autoplay from 'embla-carousel-autoplay';
import { ChevronRight, Star } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import api from '@/apis/api.jsx';
import Spinner from '@/components/commons/Spinner.jsx';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';

/* ===============================
   별점 컴포넌트
=============================== */
function RatingStars({ rating }) {
  const filledStars = Math.floor(rating);
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

/* ===============================
   최신 영수증 후기
=============================== */
export default function LatestReceiptReview() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [reviews, setReviews] = useState([]);

  /* ===============================
     최신 영수증 후기 조회
  =============================== */
  const fetchLatestReceiptReviews = async () => {
    try {
      setLoading(true);
      const response = await api.get('/receipts/filter', {
        params: {
          receipt: true,
        },
      });

      setReviews(response.data.data.list || []);
    } catch (e) {
      console.error('최신 영수증 후기 조회 실패', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLatestReceiptReviews();
  }, []);

  if (loading) {
    return (
      <section className="bg-white px-[24px] py-[24px]">
        <div className="flex justify-center">
          <Spinner />
        </div>
      </section>
    );
  }

  // 데이터 없으면 렌더링 안 함
  if (reviews.length === 0) return null;

  return (
    <section className="bg-white px-[24px] py-[24px]">
      {/* ================= 타이틀 ================= */}
      <div className="mb-2 flex items-center justify-between">
        <h2 className="text-[19px] font-semibold">최신 영수증 후기</h2>
        <button onClick={() => navigate('/index/reviews')}>
          <ChevronRight size={20} />
        </button>
      </div>

      {/* ================= 캐러셀 ================= */}
      <div className="-mx-[24px]">
        <Carousel
          opts={{ loop: true, align: 'center' }}
          plugins={[
            Autoplay({
              delay: 2500,
              stopOnInteraction: false,
            }),
          ]}
        >
          <CarouselContent className="-ml-4">
            {reviews.map((review) => (
              <CarouselItem
                key={review.id}
                className="basis-[90%] pl-4"
                onClick={() => navigate(`/index/reviews/${review.id}`)}
              >
                {/* 카드 */}
                <div className="flex cursor-pointer gap-3 rounded-xl bg-gray-100 p-3 shadow-sm active:scale-[0.98]">
                  {/* 좌측 이미지 */}
                  <img
                    src={review.hospitalImage}
                    alt={review.hospitalName}
                    className="h-20 w-20 flex-shrink-0 rounded-lg object-cover"
                  />

                  {/* 우측 내용 */}
                  <div className="flex flex-1 flex-col">
                    <p className="text-sm font-semibold">
                      {review.hospitalName}
                    </p>

                    <div className="mt-0.5 flex items-center gap-1 text-xs text-gray-500">
                      <RatingStars rating={review.totalRating} />
                      <span>({review.totalRating.toFixed(1)})</span>
                      <span>· 후기 {review.reviewCount}</span>
                    </div>

                    <p className="mt-1 line-clamp-2 text-xs text-gray-500">
                      {review.reviewContent}
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
