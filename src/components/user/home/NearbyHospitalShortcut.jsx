import allIcon from '@/assets/images/icons/icon-all.svg';
import amphibianIcon from '@/assets/images/icons/icon-amphibian.svg';
import birdIcon from '@/assets/images/icons/icon-bird.svg';
import fishIcon from '@/assets/images/icons/icon-fish.svg';
import mammalIcon from '@/assets/images/icons/icon-mammal.svg';
import reptileIcon from '@/assets/images/icons/icon-reptile.svg';

const ICON_MAP = {
  전체: allIcon,
  소형포유류: mammalIcon,
  조류: birdIcon,
  파충류: reptileIcon,
  양서류: amphibianIcon,
  어류: fishIcon,
};

export default function NearbyHospitalShortcut() {
  const categories = ['전체', '소형포유류', '조류', '파충류', '양서류', '어류'];

  return (
    <div className="bg-white">
      <button className="flex w-full items-center justify-between">
        <span className="text-[19px] font-semibold text-gray-950">
          내 주변 병원 바로가기
        </span>
        <span className="">{'>'}</span>
      </button>

      <div className="mt-3 flex gap-2 overflow-x-auto">
        {categories.map((item) => (
          <div
            key={item}
            className="flex min-w-[64px] flex-col items-center text-xs"
          >
            <div className="mb-1 flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
              <img src={ICON_MAP[item]} alt={item} className="h-full w-full" />
            </div>
            <span>{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
