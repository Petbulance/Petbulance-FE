import { Outlet, useSearchParams } from 'react-router-dom';

import { ServiceBanner } from '@/components/commons/banner';
import { LayoutShell } from '@/components/commons/layout/LayoutShell';
import { HospitalReviewLayout } from '@/components/reviews/layout/HospitalReviewLayout';

const POPUP_STEPS = ['confirm', 'scan', 'success'];

export default function HosptialsReviews() {
  const [params] = useSearchParams();
  const sheet = params.get('sheet');
  const step = params.get('step');

  const isSheetOpen = sheet === 'region' || sheet === 'animal';
  const isPopupStep = step && POPUP_STEPS.includes(step);

  const hideLayout = isSheetOpen || isPopupStep;

  return (
    <LayoutShell banner={<ServiceBanner />}>
      {hideLayout ? (
        <Outlet />
      ) : (
        <HospitalReviewLayout>
          <Outlet />
        </HospitalReviewLayout>
      )}
    </LayoutShell>
  );
}
