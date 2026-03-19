import { GreenBtn } from '@/components/commons/button/greenBtn';
import { pushDataLayer } from '@/lib/gtm';

import { BusinessHoursSection } from './businessHoursSection';
import { HospitalIntroSection } from './hospitalIntroSection';
import { LocationSection } from './locationSection';
import { RequestSection } from './requestSection';

export function DetailContent({ hospitalData }) {
  const handleCallInquiryClick = () => {
    pushDataLayer('tag_call_cta_click', {
      hospital_id: String(hospitalData?.hospitalId || ''),
      from_screen: 'detail_cta',
      call_type: '직접전화',
      click_location: 'cta_button',
      hospital_name: hospitalData?.name || '',
    });
    window.location.href = `tel:${hospitalData.phone}`;
  };

  return (
    <div className="bg-white">
      <LocationSection hospitalData={hospitalData} />
      <BusinessHoursSection hours={hospitalData.openHours} />
      <HospitalIntroSection content={hospitalData.description} />
      <Divider />
      <RequestSection />

      <GreenBtn name="전화 문의하기" onClick={handleCallInquiryClick} />
    </div>
  );
}

const Divider = () => <div className="h-4 bg-[#EEEEEE]" />;
