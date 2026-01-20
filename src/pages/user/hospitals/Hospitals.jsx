import { Outlet, useSearchParams } from 'react-router-dom';

import { ServiceBanner } from '@/components/commons/banner';
import { LayoutShell } from '@/components/commons/layout/LayoutShell';
import { HospitalSearchLayout } from '@/components/hosiptals/layout/hospitalSearchLayout';

export default function Hospitals() {
  const [params] = useSearchParams();
  const sheet = params.get('sheet');
  const isModalOpen = sheet === 'region' || sheet === 'animal';

  return (
    <LayoutShell banner={<ServiceBanner />}>
      {isModalOpen ? (
        <Outlet />
      ) : (
        <HospitalSearchLayout>
          <Outlet />
        </HospitalSearchLayout>
      )}
    </LayoutShell>
  );
}
