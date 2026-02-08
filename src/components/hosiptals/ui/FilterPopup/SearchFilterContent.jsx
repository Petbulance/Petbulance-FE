import { useMemo, useState, useEffect } from 'react';

import greenCheck from '@/assets/images/icons/green_check.svg';
import { CITIES, REGION_DATA } from '@/data/regionData';
import { ANIMAL_CATEGORY_KO } from '@/data/animalSort';

import { BottomTab } from './BottomTab';
import { ResetBtn } from './ResetBtn';

export function SearchFilterContent({ onApply, filterState }) {
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

  // 시/도 클릭 핸들러
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

  // 현재 위치 찾기
  const handleCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert('위치 정보를 사용할 수 없는 브라우저입니다.');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const naver = window.naver;

        if (!naver || !naver.maps || !naver.maps.Service) {
          console.error('네이버 지도 API가 로드되지 않았습니다.');
          return;
        }

        naver.maps.Service.reverseGeocode(
          {
            coords: new naver.maps.LatLng(latitude, longitude),
            orders: [naver.maps.Service.OrderType.ADDR].join(','),
          },
          (status, response) => {
            if (status !== naver.maps.Service.Status.OK) {
              return alert('주소를 찾을 수 없습니다.');
            }

            const result = response.v2.address;

            if (result && result.jibunAddress) {
              const addressItems = response.v2.results[0]?.region;
              if (addressItems) {
                const apiCity = addressItems.area1.name;
                const apiRegion = addressItems.area2.name;

                const mappedCity = matchCityName(apiCity);

                if (mappedCity && CITIES.includes(mappedCity)) {
                  setTemp({
                    city: mappedCity,
                    region: [apiRegion],
                  });
                } else {
                  alert('지원하지 않는 지역이거나 데이터를 찾을 수 없습니다.');
                }
              }
            }
          }
        );
      },
      (err) => {
        console.error(err);
        alert('위치 정보를 가져오는데 실패했습니다.');
      }
    );
  };

  const matchCityName = (fullCityName) => {
    if (!fullCityName) return '';
    const mapping = {
      서울특별시: '서울',
      경기도: '경기',
      부산광역시: '부산',
      대구광역시: '대구',
      인천광역시: '인천',
      광주광역시: '광주',
      대전광역시: '대전',
      울산광역시: '울산',
      세종특별자치시: '세종',
      강원특별자치도: '강원',
      강원도: '강원',
      충청북도: '충북',
      충청남도: '충남',
      전북특별자치도: '전북',
      전라북도: '전북',
      전라남도: '전남',
      경상북도: '경북',
      경상남도: '경남',
      제주특별자치도: '제주',
      제주도: '제주',
    };
    return mapping[fullCityName] || fullCityName;
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

        {/* 오른쪽: 구/군 (다중 선택 UI) */}
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
              전체 지역을 선택하셨어요.
            </div>
          )}
        </div>
      </div>

      <BottomTab
        showSite={handleCurrentLocation}
        showHospital={() => onApply(temp.city, temp.region)}
      />
    </>
  );
}

export function AnimalTypeContent({ onApply, filterState, setFilterState }) {
  const selectedAnimals = useMemo(
    () => filterState.animal || [],
    [filterState.animal]
  );

  const handleAnimalClick = (englishCode) => {
    setFilterState((prev) => {
      const currentList = prev.animal || [];
      const newList = currentList.includes(englishCode)
        ? currentList.filter((item) => item !== englishCode)
        : [...currentList, englishCode];

      return {
        ...prev,
        animal: newList,
      };
    });
  };

  return (
    <div className="flex h-full flex-col">
      <div className="min-h-0 flex-1 overflow-y-auto px-10 text-[25px] font-medium">
        <div className="bg-white">
          {Object.entries(ANIMAL_CATEGORY_KO).map(([code, name]) => {
            const isActive = selectedAnimals.includes(code);

            return (
              <button
                key={code}
                type="button"
                onClick={() => handleAnimalClick(code)}
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

      <div className="sticky right-0 left-0 z-50 px-8 pt-4">
        <button
          onClick={() => onApply(selectedAnimals)}
          className="w-full rounded-[16px] bg-[#2DA969] py-5 text-[27px] font-medium text-white shadow-lg transition-transform hover:bg-[#258d58] active:scale-[0.98]"
        >
          병원 보기
        </button>
      </div>
    </div>
  );
}
