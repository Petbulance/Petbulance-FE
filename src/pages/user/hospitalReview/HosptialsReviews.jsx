import { Outlet, useSearchParams } from 'react-router-dom';

import { ServiceBanner } from '@/components/commons/banner';
import { LayoutShell } from '@/components/commons/layout/LayoutShell';
import { HospitalReviewLayout } from '@/components/reviews/layout/HospitalReviewLayout';

const POPUP_STEPS = ['confirm', 'scan', 'success', 'form1', 'form2', 'form3'];

export default function HosptialsReviews() {
  const [params] = useSearchParams();
  const step = params.get('step');

  const isPopupStep = step && POPUP_STEPS.includes(step);

  const hideLayout = isPopupStep;

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
