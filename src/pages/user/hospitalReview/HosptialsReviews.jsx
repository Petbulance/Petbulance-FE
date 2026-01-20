import { Outlet, useSearchParams } from 'react-router-dom';

import { ServiceBanner } from '@/components/commons/banner';
import { LayoutShell } from '@/components/commons/layout/LayoutShell';
import { HospitalReviewLayout } from '@/components/reviews/layout/HospitalReviewLayout';

export default function HosptialsReviews() {
  const [params] = useSearchParams();
  const sheet = params.get('sheet');
  const isModalOpen = sheet === 'region' || sheet === 'animal';

  return (
    <LayoutShell banner={<ServiceBanner />}>
      {isModalOpen ? (
        <Outlet />
      ) : (
        <HospitalReviewLayout>
          <Outlet />
        </HospitalReviewLayout>
      )}
    </LayoutShell>
  );
}
