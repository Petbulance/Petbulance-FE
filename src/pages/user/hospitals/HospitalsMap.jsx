import { useNavigate, useSearchParams } from 'react-router-dom';

import ListIcon from '@/assets/images/icons/ListIcon.svg';
import { NaverMap } from '@/components/hosiptals/NaverMap';
import { ButtonSection } from '@/components/hosiptals/ui/ButtonSection';
import { HospitalFilterModalContainer } from '@/components/hosiptals/ui/FilterPopup';
import {
  AnimalTypeContent,
  SearchFilterContent,
} from '@/components/hosiptals/ui/FilterPopup/SearchFilterContent';
import { GreenBtnWrap } from '@/components/hosiptals/ui/GreenBtnWrap';
import { HospitalInfoSlide } from '@/components/hosiptals/ui/HospitalCard';

export default function HospitalsMap() {
  const navigate = useNavigate();
  const [params, setParams] = useSearchParams();
  const sheet = params.get('sheet');

  const closeSheet = () => {
    const next = new URLSearchParams(params);
    next.delete('sheet');
    setParams(next, { replace: true });
  };

  if (sheet === 'region' || sheet === 'animal') {
    return (
      <HospitalFilterModalContainer onClose={closeSheet} mode={sheet}>
        {sheet === 'region' ? <SearchFilterContent /> : <AnimalTypeContent />}
      </HospitalFilterModalContainer>
    );
  }

  return (
    <div className="relative">
      <ButtonSection />
      <NaverMap />

      <div className="absolute inset-x-0 bottom-47.75 z-50 flex justify-center">
        <GreenBtnWrap onClick={() => navigate('list')}>
          <img src={ListIcon} />
          <span>목록보기</span>
        </GreenBtnWrap>
      </div>

      <HospitalInfoSlide />
    </div>
  );
}
