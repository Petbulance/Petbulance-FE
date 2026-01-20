import { Outlet } from 'react-router-dom';

import { ServiceBanner } from '@/components/commons/banner';
import { LayoutShell } from '@/components/commons/layout/LayoutShell';
import MainLayout from '@/components/user/layout/MainLayout';

export default function Hospitals() {
  return (
    <LayoutShell banner={<ServiceBanner />}>
      <MainLayout title="병원 검색">
        <Outlet />
      </MainLayout>
    </LayoutShell>
  );
}
