import {
  Outlet,
  useSearchParams,
  useLocation,
  matchPath,
} from 'react-router-dom'; // 1. useLocation, matchPath 추가

import { ServiceBanner } from '@/components/commons/banner';
import { LayoutShell } from '@/components/commons/layout/LayoutShell';
import { HospitalReviewLayout } from '@/components/reviews/layout/HospitalReviewLayout';
import { useState } from 'react';

const POPUP_STEPS = ['confirm', 'scan', 'success', 'form1', 'form2', 'form3'];

export default function HosptialsReviews() {
  const [params] = useSearchParams();
  const location = useLocation(); // 2. 현재 경로 정보를 가져옴
  const step = params.get('step');

  const [activeSheet, setActiveSheet] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const reviewContext = {
    activeSheet,
    setActiveSheet,
    isDeleteModalOpen,
    setIsDeleteModalOpen,
  };

  const isEditPage = matchPath(
    { path: '/index/reviews/:id/edit', end: true },
    location.pathname
  );

  const isPopupStep = step && POPUP_STEPS.includes(step);

  const hideLayout = isPopupStep || activeSheet || isEditPage;

  return (
    <LayoutShell banner={<ServiceBanner />}>
      {hideLayout ? (
        <Outlet context={reviewContext} />
      ) : (
        <HospitalReviewLayout setIsDeleteModalOpen={setIsDeleteModalOpen}>
          <Outlet context={reviewContext} />
        </HospitalReviewLayout>
      )}
    </LayoutShell>
  );
}
