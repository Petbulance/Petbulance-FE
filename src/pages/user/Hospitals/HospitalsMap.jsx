import { useNavigate } from 'react-router-dom';

import ListIcon from '@/assets/images/icons/ListIcon.svg?react';
import { HospitalSearchHeader } from '@/components/hosiptals/header';
import { NaverMap } from '@/components/hosiptals/NaverMap';
import { ButtonSection } from '@/components/hosiptals/ui/ButtonSection';
import { GreenBtnWrap } from '@/components/hosiptals/ui/GreenBtnWrap';
import { HospitalInfoSlide } from '@/components/hosiptals/ui/HospitalCard';

export default function HospitalsMap() {
  const navigate = useNavigate();

  return (
    <div className="relative">
      {/* <HospitalSearchHeader /> */}
      <ButtonSection />
      <NaverMap />

      <div className="absolute inset-x-0 bottom-47.75 z-50 flex justify-center">
        <GreenBtnWrap
          onClick={() => {
            navigate('list');
          }}
        >
          <ListIcon />
          <span>목록보기</span>
        </GreenBtnWrap>
      </div>

      <HospitalInfoSlide />
    </div>
  );
}
