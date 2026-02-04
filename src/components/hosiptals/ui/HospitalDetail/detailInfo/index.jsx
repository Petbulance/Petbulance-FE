import { GreenBtn } from '@/components/commons/button/greenBtn';

import { BusinessHoursSection } from './businessHoursSection';
import { LocationSection } from './locationSection';
import { RequestSection } from './requestSection';
import { HospitalIntroSection } from './hospitalIntroSection';

export function DetailContent({ hospitalData }) {
  return (
    <div className="bg-white">
      <LocationSection hospitalData={hospitalData} />
      <BusinessHoursSection hours={hospitalData.openHours} />
      <HospitalIntroSection content={hospitalData.description} />
      <Divider />
      <RequestSection />

      <GreenBtn
        name="전화 문의하기"
        onClick={() => (window.location.href = `tel:${hospitalData.phone}`)}
      />
    </div>
  );
}

const Divider = () => <div className="h-4 bg-[#EEEEEE]" />;
