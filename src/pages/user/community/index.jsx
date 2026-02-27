import { ServiceBanner } from '@/components/commons/banner';
import { LayoutShell } from '@/components/commons/layout/LayoutShell';
import CommunityLayout from '@/components/community/layout';
import { Outlet } from 'react-router-dom';

export function Community() {
  return (
    <LayoutShell banner={<ServiceBanner />}>
      <CommunityLayout>
        <Outlet />
      </CommunityLayout>
    </LayoutShell>
  );
}
