import { useSearchParams } from 'react-router-dom';

import { HospitalFilterModalContainer } from '@/components/hosiptals/ui/FilterPopup';
import { ReviewAnimalFilterSheet } from '@/components/reviews/ui/ReviewAnimalFilterSheet';
import { ReviewContent } from '@/components/reviews/ui/ReviewContent';
import { ReviewFilterBar } from '@/components/reviews/ui/ReviewFilterBar';
import { ReviewRegionFilterSheet } from '@/components/reviews/ui/ReviewRegionFilterSheet';
import { WriteBtn } from '@/components/reviews/ui/WriteBtn';

export function ReviewMain() {
  const [params, setParams] = useSearchParams();
  const sheet = params.get('sheet');

  const closeSheet = () => {
    const next = new URLSearchParams(params);
    next.delete('sheet');
    setParams(next, { replace: true });
  };

  if (sheet === 'region' || sheet === 'animal') {
    return (
      <HospitalFilterModalContainer onClose={closeSheet} mode={sheet}>
        {sheet === 'region' ? (
          <ReviewRegionFilterSheet />
        ) : (
          <ReviewAnimalFilterSheet />
        )}
      </HospitalFilterModalContainer>
    );
  }

  return (
    <div className="relative">
      <ReviewFilterBar />
      <ReviewContent />

      <div className="pointer-events-none sticky bottom-4 flex justify-end px-4">
        <WriteBtn />
      </div>
    </div>
  );
}
