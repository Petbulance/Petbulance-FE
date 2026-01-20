import MainFooter from '@/components/user/layout/MainFooter';

import { HospitalReviewHeader } from './header';

export function HospitalReviewLayout({ children }) {
  return (
    <div className="flex h-full min-h-0 flex-col overflow-hidden bg-gray-100">
      <HospitalReviewHeader />

      <main className="min-h-0 flex-1 overflow-y-auto">{children}</main>

      <MainFooter />
    </div>
  );
}
