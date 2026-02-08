import { useMemo, useState, useEffect } from 'react';

import { GreenBtn } from '@/components/commons/button/greenBtn';
import { ResetBtn } from '@/components/hosiptals/ui/FilterPopup/ResetBtn';
import { CITIES, REGION_DATA } from '@/data/regionData';
import greenCheck from '@/assets/images/icons/green_check.svg';

export function ReviewRegionFilterSheet({ filterState, onApply }) {
  const [temp, setTemp] = useState({
    city: filterState.city || '',
    region: Array.isArray(filterState.region)
      ? filterState.region
      : filterState.region
        ? [filterState.region]
        : [],
  });

  useEffect(() => {
    setTemp({
      city: filterState.city || '',
      region: Array.isArray(filterState.region)
        ? filterState.region
        : filterState.region
          ? [filterState.region]
          : [],
    });
  }, [filterState]);

  // 해당 시/도의 전체 데이터
  const districts = useMemo(() => {
    if (!temp.city) return [];
    return REGION_DATA[temp.city] || [];
  }, [temp.city]);

  // '전체'를 제외한 순수 지역구 목록
  const pureDistricts = useMemo(() => {
    return districts.filter((d) => d !== '전체');
  }, [districts]);

  const handleCityClick = (cityValue) => {
    if (temp.city !== cityValue) {
      setTemp({ city: cityValue, region: [] });
    }
  };

  const handleRegionClick = (regionValue) => {
    setTemp((prev) => {
      const currentRegions = prev.region;

      if (regionValue === '전체') {
        const isCurrentlyAll = currentRegions.length === pureDistricts.length;
        return {
          ...prev,
          region: isCurrentlyAll ? [] : [...pureDistricts],
        };
      }

      let nextRegions;
      if (currentRegions.includes(regionValue)) {
        nextRegions = currentRegions.filter((r) => r !== regionValue);
      } else {
        nextRegions = [...currentRegions, regionValue];
      }

      return { ...prev, region: nextRegions };
    });
  };

  const handleReset = () => {
    setTemp({ city: '', region: [] });
  };

  return (
    <>
      <ResetBtn onReset={handleReset} />

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
            districts.map((dist) => {
              const isAllChecked =
                pureDistricts.length > 0 &&
                temp.region.length === pureDistricts.length;

              const isActive =
                dist === '전체' ? isAllChecked : temp.region.includes(dist);

              return (
                <div
                  key={dist}
                  onClick={() => handleRegionClick(dist)}
                  className={`flex cursor-pointer items-center justify-between border-b px-5 py-3 transition-colors hover:bg-gray-50 ${
                    isActive ? 'font-bold text-[#2DA969]' : 'text-[#1E1E1E]'
                  }`}
                >
                  <span>{dist}</span>
                </div>
              );
            })
          ) : (
            <div className="flex h-full items-center justify-center text-[16px] text-gray-400">
              시/도를 먼저 선택해주세요.
            </div>
          )}
        </div>
      </div>

      <GreenBtn
        name="후기 보기"
        onClick={() => {
          const isAllSelected =
            temp.region.length === pureDistricts.length ||
            temp.region.length === 0;

          const payload = {
            city: temp.city,
            region: isAllSelected ? [] : temp.region,
          };
          onApply(payload);
        }}
      />
    </>
  );
}
