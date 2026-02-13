import { useNavigate } from 'react-router-dom';

import allIcon from '@/assets/images/icons/icon-all.png';
import amphibianIcon from '@/assets/images/icons/icon-amphibian.png';
import birdIcon from '@/assets/images/icons/icon-bird.png';
import fishIcon from '@/assets/images/icons/icon-fish.png';
import mammalIcon from '@/assets/images/icons/icon-mammal.png';
import reptileIcon from '@/assets/images/icons/icon-reptile.png';
import { pushDataLayer } from '@/lib/gtm';

const ICON_MAP = {
  전체: allIcon,
  소형포유류: mammalIcon,
  조류: birdIcon,
  파충류: reptileIcon,
  양서류: amphibianIcon,
  어류: fishIcon,
};

const CATEGORY_TO_TYPE = {
  전체: null,
  소형포유류: 'SMALLMAMMALS',
  조류: 'AVIAN',
  파충류: 'REPTILE',
  양서류: 'AMPHIBIAN',
  어류: 'FISH',
};

export default function NearbyHospitalShortcut() {
  const navigate = useNavigate();
  const categories = ['전체', '소형포유류', '조류', '파충류', '양서류', '어류'];

  const handleClick = (category) => {
    pushDataLayer('select_pet_category_home', { pet_type: category });

    const animalType = CATEGORY_TO_TYPE[category];

    if (!animalType) {
      navigate('/index/hospitals');
      return;
    }
    console.log('anim,al', animalType);
    navigate(`/index/hospitals?animalType=${animalType}`);
  };

  return (
    <div className="bg-white">
      {/* 타이틀 */}
      <button className="flex w-full items-center justify-between">
        <span className="text-[19px] font-semibold text-gray-950">
          내 주변 병원 바로가기
        </span>
      </button>

      {/* 카테고리 */}
      <div className="mt-3 flex gap-2 overflow-x-auto">
        {categories.map((item) => (
          <button
            key={item}
            onClick={() => handleClick(item)}
            className="flex min-w-[64px] flex-col items-center text-xs"
          >
            <div className="mb-1 flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
              <img src={ICON_MAP[item]} alt={item} className="h-full w-full" />
            </div>
            <span>{item}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
