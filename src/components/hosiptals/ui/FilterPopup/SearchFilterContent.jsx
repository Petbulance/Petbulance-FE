import { useMemo, useState } from 'react';

import greenCheck from '@/assets/images/icons/green_check.svg';

import { ResetBtn } from './ResetBtn';
import { BottomTab } from './BottomTab';

export function SearchFilterContent() {
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');

  const cities = useMemo(
    () => [
      '서울',
      '경기',
      '지역',
      '지역',
      '지역',
      '지역',
      '지역',
      '지역',
      '지역',
      '지역',
    ],
    []
  );

  const districts = useMemo(
    () => [
      '강남구',
      '강동구',
      '강북구',
      '강서구',
      '관악구',
      '광진구',
      '구로구',
      '금천구',
      '노원구',
      '도봉구',
      '동작구',
      '마포구',
      '서대문구',
      '서초구',
      '성동구',
    ],
    []
  );

  return (
    <>
      <ResetBtn
        setSelectedCity={setSelectedCity}
        setSelectedRegion={setSelectedRegion}
      />
      <div className="flex min-h-0 flex-1 gap-4 text-[20px] font-medium">
        {/* 왼쪽: 시/도 */}
        <div className="w-1/3 overflow-y-auto">
          {cities.map((city, idx) => (
            <div
              key={`${city}-${idx}`}
              onClick={() => setSelectedCity(city)}
              className={[
                'cursor-pointer px-10.5 py-3 text-center',
                selectedCity === city
                  ? 'bg-white text-[#1E1E1E]'
                  : 'bg-[#F5F5F5] text-[#9E9E9E]',
              ].join(' ')}
            >
              {city}
            </div>
          ))}
        </div>

        {/* 오른쪽: 구/군 */}
        <div className="flex-1 overflow-y-auto bg-white">
          {districts.map((dist, idx) => (
            <div
              key={`${dist}-${idx}`}
              onClick={() => setSelectedRegion(dist)}
              className={[
                'cursor-pointer border-b px-5 py-3 hover:bg-gray-50',
                selectedRegion === dist ? 'text-[#2DA969]' : 'text-[#1E1E1E]',
              ].join(' ')}
            >
              {dist}
            </div>
          ))}
        </div>

        <BottomTab />
      </div>
    </>
  );
}

export function AnimalTypeContent() {
  const [selectedAnimal, setSelectedAnimal] = useState('');

  const animals = useMemo(() => ['소형포유류', '파충류', '양서류', '어류'], []);

  return (
    <div className="min-h-0 flex-1 overflow-y-auto px-10 text-[25px] font-medium">
      <div className="flex-1 bg-white">
        {animals.map((name) => {
          const isActive = selectedAnimal === name;
          return (
            <button
              key={name}
              type="button"
              onClick={() => setSelectedAnimal(name)}
              className="flex w-full items-center justify-between pt-10"
            >
              <span
                className={`${isActive ? 'text-[#2DA969]' : 'text-[#616161]'}`}
              >
                {name}
              </span>

              {isActive && <img src={greenCheck} alt="green_check_icon" />}
            </button>
          );
        })}
      </div>

      <BottomTab />
    </div>
  );
}
