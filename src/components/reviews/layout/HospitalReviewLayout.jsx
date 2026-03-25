import { useState } from 'react';
import MainFooter from '@/components/user/layout/MainFooter';

import { HospitalReviewDefaultHeader } from './HospitalReviewDefaultHeader';
import { matchPath, useLocation } from 'react-router-dom';
import { HospitalReviewDetailHeader } from './HospitalReviewDetailHeader';
import { ReviewGuideModal } from '@/components/commons/layout/ReviewGuideModal';

export function HospitalReviewLayout({ setIsDeleteModalOpen, children }) {
  const location = useLocation();
  const [isGuideModalOpen, setIsGuideModalOpen] = useState(false);

  const isDetailPage = matchPath(
    { path: '/index/reviews/:reviewId', end: true },
    location.pathname
  );

  return (
    <div className="flex h-full min-h-0 flex-col overflow-hidden">
      {isDetailPage ? (
        <HospitalReviewDetailHeader
          setIsDeleteModalOpen={setIsDeleteModalOpen}
        />
      ) : (
        <HospitalReviewDefaultHeader
          onInfoClick={() => setIsGuideModalOpen(true)}
        />
      )}

      <main className="min-h-0 flex-1 overflow-y-auto">{children}</main>

      <MainFooter />

      <ReviewGuideModal
        isOpen={isGuideModalOpen}
        onClose={() => setIsGuideModalOpen(false)}
      />
    </div>
  );
}
