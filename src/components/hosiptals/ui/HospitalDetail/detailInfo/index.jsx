import { GreenBtn } from '@/components/commons/button/greenBtn';

import { BusinessHoursSection } from './businessHoursSection';
import { LocationSection } from './locationSection';
import { RequestSection } from './requestSection';

export function DetailContent({ hospitalData, hours }) {
  return (
    <div className="bg-white">
      <LocationSection hospitalData={hospitalData} />
      <Divider />
      <BusinessHoursSection hours={hours} />
      <Divider />
      <RequestSection />

      <GreenBtn name="전화 문의하기" />
    </div>
  );
}

const Divider = () => <div className="h-4 bg-[#EEEEEE]" />;
