import { useNavigate } from 'react-router-dom';

import MapIcon from '@/assets/images/icons/MapIcon.svg';
import { ButtonSection } from '@/components/hosiptals/ui/ButtonSection';
import { GreenBtnWrap } from '@/components/hosiptals/ui/GreenBtnWrap';
import { HospitalCardList } from '@/components/hosiptals/ui/HospitalCardList';

export function HospitalsList() {
  const navigate = useNavigate();

  return (
    <div>
      <ButtonSection />
      <HospitalCardList />

      <div className="sticky inset-x-0 bottom-5 z-50 flex justify-center">
        <GreenBtnWrap onClick={() => navigate(-1)}>
          <img src={MapIcon} alt="MapIcon" />
          <span>지도보기</span>
        </GreenBtnWrap>
      </div>
    </div>
  );
}
