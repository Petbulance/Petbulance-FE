import { useMemo, useState } from 'react';

import greenCheck from '@/assets/images/icons/green_check.svg';
import { ANIMAL_GROUPS } from '@/data/animalSort';
import { CITIES, REGION_DATA } from '@/data/regionData';

import { BottomTab } from './BottomTab';
import { ResetBtn } from './ResetBtn';

export function SearchFilterContent({ onApply, filterState }) {
  const [temp, setTemp] = useState({
    city: filterState.city,
    region: filterState.region,
  });

  const districts = useMemo(() => {
    if (!temp.city) return [];
    return REGION_DATA[temp.city] || [];
  }, [temp.city]);

  const handleCityClick = (cityValue) => {
    setTemp({ city: cityValue, region: '' });
  };

  const handleRegionClick = (regionValue) => {
    setTemp((prev) => ({ ...prev, region: regionValue }));
  };

  return (
    <>
      <ResetBtn setFilterState={setTemp} />
      <div className="flex h-[500px] min-h-0 flex-1 gap-4 text-[20px] font-medium">
        {/* 왼쪽: 시/도 */}
        <div className="w-1/3 overflow-y-auto bg-[#F5F5F5]">
          {CITIES.map((city) => (
            <div
              key={city}
              onClick={() => handleCityClick(city)}
              className={`cursor-pointer px-4 py-3 text-center transition-colors ${
                temp.city === city
                  ? 'bg-white font-bold text-[#1E1E1E]'
                  : 'text-[#9E9E9E]'
              }`}
            >
              {city}
            </div>
          ))}
        </div>

        {/* 오른쪽: 구/군 */}
        <div className="flex-1 overflow-y-auto bg-white">
          {districts.length > 0 ? (
            districts.map((dist) => (
              <div
                key={dist}
                onClick={() => handleRegionClick(dist)}
                className={`cursor-pointer border-b px-5 py-3 transition-colors hover:bg-gray-50 ${
                  temp.region === dist
                    ? 'font-bold text-[#2DA969]'
                    : 'text-[#1E1E1E]'
                }`}
              >
                {dist}
              </div>
            ))
          ) : (
            <div className="flex h-full items-center justify-center text-[16px] text-gray-400">
              시/도를 먼저 선택해주세요.
            </div>
          )}
        </div>
      </div>
      <BottomTab onClick={() => onApply(temp.city, temp.region)} />
    </>
  );
}

export function AnimalTypeContent({ onApply, filterState, setFilterState }) {
  const currentCategoryName = useMemo(() => {
    if (!filterState.animal || filterState.animal.length === 0) return '';

    return (
      Object.keys(ANIMAL_GROUPS).find(
        (key) =>
          JSON.stringify(ANIMAL_GROUPS[key]) ===
          JSON.stringify(filterState.animal)
      ) || ''
    );
  }, [filterState.animal]);

  const categories = useMemo(() => Object.keys(ANIMAL_GROUPS), []);

  const handleAnimalClick = (categoryName) => {
    const englishCodes = ANIMAL_GROUPS[categoryName];
    setFilterState((prev) => ({
      ...prev,
      animal: englishCodes,
    }));
  };

  return (
    <div className="flex h-full flex-col">
      <div className="min-h-0 flex-1 overflow-y-auto px-10 text-[25px] font-medium">
        <div className="bg-white">
          {categories.map((name) => {
            const isActive = currentCategoryName === name;
            return (
              <button
                key={name}
                type="button"
                onClick={() => handleAnimalClick(name)}
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
      </div>

      <BottomTab onClick={() => onApply(filterState.animal)} />
    </div>
  );
}
