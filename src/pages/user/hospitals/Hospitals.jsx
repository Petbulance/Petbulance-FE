import { useState } from 'react';
import { Outlet } from 'react-router-dom';

import { ServiceBanner } from '@/components/commons/banner';
import { LayoutShell } from '@/components/commons/layout/LayoutShell';
import { HospitalSearchLayout } from '@/components/hosiptals/layout/hospitalSearchLayout';

export default function Hospitals() {
  const [activeSheet, setActiveSheet] = useState(null);

  const [hospitals, setHospitals] = useState([]);

  const [searchKeyword, setSearchKeyword] = useState('');

  const [filterState, setFilterState] = useState({
    city: '',
    region: [],
    animal: [],
    sort: 'distance',
    isOpen: false,
  });

  const hospitalContext = {
    activeSheet,
    setActiveSheet,
    hospitals,
    setHospitals,
    filterState,
    setFilterState,
    searchKeyword,
    setSearchKeyword,
  };

  return (
    <LayoutShell banner={<ServiceBanner />}>
      {activeSheet ? (
        <Outlet context={hospitalContext} />
      ) : (
        <HospitalSearchLayout onSearch={setSearchKeyword}>
          <Outlet context={hospitalContext} />
        </HospitalSearchLayout>
      )}
    </LayoutShell>
  );
}
