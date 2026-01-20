import { useState } from 'react';

import placeholder from '@/assets/images/pageImages/placeholder.svg';
import { HosipitalDetail } from '@/components/hosiptals/ui/HospitalCard/HospitalDetail';
import { DetailContent } from '@/components/hosiptals/ui/HospitalDetail/detailInfo';
import { DetailTabMenu } from '@/components/hosiptals/ui/HospitalDetail/DetailTabMenu';
import { HospitalDetailHeader } from '@/components/hosiptals/ui/HospitalDetail/HospitalDetailHeader';
import { ReviewContent } from '@/components/hosiptals/ui/HospitalDetail/review';

export function HospitalDetail() {
  const [activeTab, setActiveTab] = useState('detail');

  const hospitalData = {
    img: placeholder,
    name: '리틀버드서울 버드앤주클리닉',
    status: '진료중',
    time: '20:00',
    distance: '1.2',
    phoneNumber: '02-1234-5678',
    rating: '4.8',
    reviews: '25',
    kinds: ['소형동물', '포유류'],
    address: '서울 마포구 독막로 13길 31, 병원명',
    hours: [
      { day: '월요일', time: '09:00 - 18:00' },
      { day: '화요일', time: '09:00 - 18:00' },
      { day: '수요일', time: '09:00 - 18:00' },
      { day: '목요일', time: '09:00 - 18:00' },
      { day: '금요일', time: '09:00 - 18:00' },
      { day: '토요일', time: '11:00 - 15:00', type: 'sat' },
      { day: '일요일', time: '휴무', type: 'hol' },
      { day: '공휴일', time: '휴무', type: 'hol' },
    ],
  };

  return (
    <div className="relative flex flex-col bg-[#F5F5F5]">
      <div className="bg-white px-8 py-10">
        <HosipitalDetail {...hospitalData} />
      </div>
      <DetailTabMenu activeTab={activeTab} onChangeTab={setActiveTab} />
      <div className="flex-1">
        {activeTab === 'detail' && (
          <DetailContent
            hospitalData={hospitalData}
            hours={hospitalData.hours}
          />
        )}
        {activeTab === 'review' && <ReviewContent />}
      </div>
    </div>
  );
}
