import placeholder from '@/assets/images/pageImages/placeholder.svg';
import { ReviewCard } from '@/components/hosiptals/ui/HospitalDetail/review/ReviewCard';

export function ReviewContent({ data }) {
  return (
    <div className="flex flex-col bg-white pt-14">
      {data.map((review) => (
        <ReviewCard key={review.id} review={review} />
      ))}
    </div>
  );
}
