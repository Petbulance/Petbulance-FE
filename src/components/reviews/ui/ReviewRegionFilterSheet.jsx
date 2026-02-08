import { useMemo, useState, useEffect } from 'react'; // useEffect 추가

import { GreenBtn } from '@/components/commons/button/greenBtn';
import { ResetBtn } from '@/components/hosiptals/ui/FilterPopup/ResetBtn';
import { CITIES, REGION_DATA } from '@/data/regionData';
import greenCheck from '@/assets/images/icons/green_check.svg'; // ✅ 체크 아이콘 import

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

  const districts = useMemo(() => {
    if (!temp.city) return [];
    return REGION_DATA[temp.city] || [];
  }, [temp.city]);

  const handleCityClick = (cityValue) => {
    if (temp.city !== cityValue) {
      setTemp({ city: cityValue, region: [] });
    }
  };

  const handleRegionClick = (regionValue) => {
    setTemp((prev) => {
      const currentRegions = prev.region;

      if (regionValue === '전체') {
        return { ...prev, region: [] };
      }

      if (currentRegions.includes(regionValue)) {
        return {
          ...prev,
          region: currentRegions.filter((r) => r !== regionValue),
        };
      } else {
        return {
          ...prev,
          region: [...currentRegions, regionValue],
        };
      }
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

        <div className="flex-1 overflow-y-auto bg-white">
          {districts.length > 0 ? (
            districts.map((dist) => {
              const isSelected = temp.region.includes(dist);
              const isAllSelected = dist === '전체' && temp.region.length === 0;
              const active = isSelected || isAllSelected;

              return (
                <div
                  key={dist}
                  onClick={() => handleRegionClick(dist)}
                  className={`flex cursor-pointer items-center justify-between border-b px-5 py-3 transition-colors hover:bg-gray-50 ${
                    active ? 'font-bold text-[#2DA969]' : 'text-[#1E1E1E]'
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
          const payload = {
            city: temp.city,
            region: temp.region,
          };
          onApply(payload);
        }}
      />
    </>
  );
}
