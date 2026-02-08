import { NoReceiptResult } from '@/components/hosiptals/ui/HospitalDetail/review/noReceiptResult';
import { ReviewCard } from '@/components/hosiptals/ui/HospitalDetail/review/ReviewCard';

export function ReviewContent({ data }) {
  const isEmpty = !data || data.length === 0;

  return (
    <div
      className={`flex flex-col justify-center bg-white pt-14 ${isEmpty ? 'h-full min-h-[50vh]' : ''}`}
    >
      {isEmpty ? (
        <NoReceiptResult />
      ) : (
        data.map((review) => <ReviewCard key={review.id} review={review} />)
      )}
    </div>
  );
}
