import { Outlet, useSearchParams } from 'react-router-dom';

import { ServiceBanner } from '@/components/commons/banner';
import { LayoutShell } from '@/components/commons/layout/LayoutShell';
import { HospitalReviewLayout } from '@/components/reviews/layout/HospitalReviewLayout';
import { useState } from 'react';

const POPUP_STEPS = ['confirm', 'scan', 'success', 'form1', 'form2', 'form3'];

export default function HosptialsReviews() {
  const [activeSheet, setActiveSheet] = useState(false);
  const [params] = useSearchParams();
  const step = params.get('step');

  const isPopupStep = step && POPUP_STEPS.includes(step);

  const hideLayout = isPopupStep || activeSheet;

  return (
    <LayoutShell banner={<ServiceBanner />}>
      {hideLayout ? (
        <Outlet context={[activeSheet, setActiveSheet]} />
      ) : (
        <HospitalReviewLayout>
          <Outlet context={[activeSheet, setActiveSheet]} />
        </HospitalReviewLayout>
      )}
    </LayoutShell>
  );
}
