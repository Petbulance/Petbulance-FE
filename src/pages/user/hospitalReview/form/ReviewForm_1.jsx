import { useState, useEffect, useMemo, useRef } from 'react';
import { fetchHospitalsByName } from '@/apis/hospitals';
import { ProgressBar } from '@/components/reviews/ui/ProgressBar';
import { ANIMAL_CATEGORY_VALUE, ANIMAL_GROUPS_VALUE } from '@/data/animalSort';
import down_arrow from '@/assets/images/icons/down_arrow2.svg';
import { WriteReviewHeader } from '@/components/reviews/layout/WriteReviewHeader';
import { InputField } from './ReviewForm_2';
import { NextBtn } from '@/components/reviews/ui/NextBtn';
import { SelectField } from '@/components/reviews/ui/SelectField';
import { GreenBtn } from '@/components/commons/button/greenBtn'; // 바텀시트 내부용

export default function ReviewForm_1({
  data,
  setData,
  onNext,
  isHospitalFixed,
}) {
  const [searchTerm, setSearchTerm] = useState(data.hospitalName || '');
  const [recommendations, setRecommendations] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const containerRef = useRef(null);

  useEffect(() => {
    if (isHospitalFixed) return;

    if (!searchTerm.trim() || searchTerm === data.hospitalName) {
      return;
    }

    const timer = setTimeout(async () => {
      try {
        const results = await fetchHospitalsByName(searchTerm, {});
        setRecommendations(results.list || []);
        setShowDropdown(true);
      } catch (error) {
        console.error('병원 추천 목록 로드 실패:', error);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm, data.hospitalName, isHospitalFixed]);

  const handleInputChange = (e) => {
    if (isHospitalFixed) return;

    const value = e.target.value;
    setSearchTerm(value);

    // 사용자가 입력값을 변경하면 기존 선택된 병원 ID 초기화
    if (data.hospitalId || (data.hospitalName && value !== data.hospitalName)) {
      setData((prev) => ({ ...prev, hospitalId: null, hospitalName: '' }));
    }

    if (!value.trim()) {
      setRecommendations([]);
      setShowDropdown(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setShowDropdown(false);
        if (!isHospitalFixed && !data.hospitalId) {
          if (searchTerm !== data.hospitalName) {
            setSearchTerm('');
          }
        }
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [data.hospitalId, data.hospitalName, searchTerm, isHospitalFixed]);

  const handleSelectHospital = (hospital) => {
    setData((prev) => ({
      ...prev,
      hospitalName: hospital.name,
      hospitalId: hospital.hospitalId,
    }));
    setSearchTerm(hospital.name);
    setRecommendations([]);
    setShowDropdown(false);
  };

  const detailOptions = useMemo(() => {
    return data.animalType ? ANIMAL_GROUPS_VALUE[data.animalType] || [] : [];
  }, [data.animalType]);

  const handleChange = (field, value) => {
    setData((prev) => ({ ...prev, [field]: value }));
  };

  const handleDetailSelect = (value) => {
    handleChange('animalDetail', value);
    setIsSheetOpen(false);
  };

  const isComplete =
    data.hospitalName && data.cost && data.animalType && data.animalDetail;

  return (
    <div className="relative flex h-dvh flex-col overflow-hidden bg-white">
      <WriteReviewHeader label="후기 작성" />

      <div className="flex-1 overflow-y-auto px-6 pt-[39px] pb-[66px]">
        <ProgressBar currentStep={1} />

        {/* 1. 병원명 입력 */}
        <div className="relative mb-6" ref={containerRef}>
          <label className="mb-2 block text-[19px] font-medium text-[#424242]">
            병원명
          </label>
          <div className="relative">
            <input
              // ✅ 고정 여부에 따른 스타일 분기
              className={`w-full rounded-[8px] border border-[#EEEEEE] bg-white px-4 py-[14px] text-[20px] focus:outline-none placeholder:text-[#BDBDBD]${
                isHospitalFixed && 'cursor-not-allowed'
              }`}
              placeholder="검색하여 선택해주세요."
              value={searchTerm}
              onChange={handleInputChange}
              readOnly={isHospitalFixed}
              onFocus={() => {
                if (!isHospitalFixed && !data.hospitalId && searchTerm) {
                  setShowDropdown(true);
                }
              }}
            />
          </div>

          {!isHospitalFixed &&
            showDropdown &&
            searchTerm &&
            !data.hospitalId && (
              <ul className="custom-scrollbar absolute z-50 mt-2 max-h-[220px] w-full overflow-y-auto rounded-[8px] border border-[#EEEEEE] bg-white shadow-lg">
                {recommendations.length > 0 ? (
                  recommendations.map((hospital) => (
                    <li
                      key={hospital.id}
                      className="cursor-pointer border-b border-[#F5F5F5] px-4 py-3 transition-colors last:border-none hover:bg-[#F9F9F9]"
                      onClick={() => handleSelectHospital(hospital)}
                    >
                      <div className="text-[18px] font-medium text-[#424242]">
                        {hospital.name}
                      </div>
                      {hospital.address && (
                        <div className="truncate text-[14px] text-[#9E9E9E]">
                          {hospital.address}
                        </div>
                      )}
                    </li>
                  ))
                ) : (
                  <li className="px-4 py-3 text-center text-[18px] text-[#BDBDBD]">
                    검색 결과가 없습니다.
                  </li>
                )}
              </ul>
            )}
        </div>

        {/* 2. 비용 입력 */}
        <div className="mb-6">
          <InputField
            label="총 비용"
            placeholder="진료/치료 비용 총합을 입력해주세요."
            value={data.cost || ''}
            onChange={(val) => {
              const numericValue = val.replace(/[^0-9]/g, '');
              handleChange('cost', numericValue);
            }}
          />
        </div>

        {/* 3. 동물종 선택 */}
        <SelectField
          label="동물종"
          placeholder="동물종을 선택해주세요."
          value={data.animalType}
          options={ANIMAL_CATEGORY_VALUE}
          onChange={(value) => {
            setData((prev) => ({
              ...prev,
              animalType: value,
              animalDetail: '',
            }));
          }}
        />

        {/* 4. 세부 동물명 선택 */}
        <div className="mb-6">
          <label className="mb-2 block text-[19px] font-medium text-[#424242]">
            세부 동물명
          </label>
          <div
            onClick={() => data.animalType && setIsSheetOpen(true)}
            className={`relative flex w-full cursor-pointer items-center justify-between rounded-[8px] border bg-white px-4 py-[14px] text-[20px] transition-colors ${
              !data.animalType
                ? 'cursor-not-allowed border-[#EEEEEE] bg-[#FAFAFA]'
                : 'border-[#EEEEEE] hover:border-[#BCBCBC]'
            } ${isSheetOpen ? 'border-[#2DA969]' : ''} `}
          >
            <span
              className={
                data.animalDetail ? 'text-[#424242]' : 'text-[#BDBDBD]'
              }
            >
              {detailOptions.find((opt) => opt.value === data.animalDetail)
                ?.label ||
                (data.animalType
                  ? '세부 동물명을 선택해주세요.'
                  : '동물종을 먼저 선택해주세요.')}
            </span>
            <img
              src={down_arrow}
              alt="arrow"
              className={`transition-transform duration-200 ${
                !data.animalType ? 'opacity-20' : ''
              } ${isSheetOpen ? 'rotate-180' : ''}`}
            />
          </div>
        </div>

        <div className="absolute right-6 bottom-0 left-6">
          <NextBtn label="다음" onClick={onNext} isComplete={isComplete} />
        </div>
      </div>

      {/* 바텀 시트 */}
      {isSheetOpen && (
        <DetailAnimalBottomSheet
          options={detailOptions}
          selectedValue={data.animalDetail}
          onSelect={handleDetailSelect}
          onClose={() => setIsSheetOpen(false)}
        />
      )}
    </div>
  );
}

// 바텀 시트 컴포넌트
function DetailAnimalBottomSheet({
  options,
  selectedValue,
  onSelect,
  onClose,
}) {
  const [tempSelected, setTempSelected] = useState(selectedValue);

  const handleConfirm = () => {
    onSelect(tempSelected);
  };

  return (
    <>
      <div
        className="absolute inset-0 z-[100] bg-black/50 transition-opacity"
        onClick={onClose}
      />
      <div className="animate-slideUp absolute right-0 bottom-0 left-0 z-[101] w-full rounded-t-[32px] bg-white pt-4 shadow-2xl">
        <div className="mx-auto mb-6 h-1 w-[32px] rounded-full bg-black" />
        <div className="px-6">
          <div className="mb-6 text-[18px] font-semibold text-[#1E1E1E]">
            세부 동물명
          </div>
          <div className="mb-8 flex max-h-[40vh] flex-wrap gap-2.5 overflow-y-auto">
            {options.map((option) => (
              <button
                key={option.value}
                onClick={() => setTempSelected(option.value)}
                className={`rounded-[1000px] border bg-white px-[16px] py-[8px] text-[16px] font-medium transition-all ${
                  tempSelected === option.value
                    ? 'border-[#1E1E1E] text-[#1E1E1E]'
                    : 'border-[#9E9E9E] text-[#9E9E9E] hover:bg-[#F9F9F9]'
                } `}
              >
                {option.label}
              </button>
            ))}
          </div>
          <GreenBtn
            name="선택"
            onClick={handleConfirm}
            disabled={!tempSelected}
          />
        </div>
      </div>
    </>
  );
}
