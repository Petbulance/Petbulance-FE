import { useState, useEffect, useMemo, useRef } from 'react';
import { fetchHospitalsByName } from '@/apis/hospitals';
import { ProgressBar } from '@/components/reviews/ui/ProgressBar';
import { ANIMAL_CATEGORY_VALUE, ANIMAL_GROUPS_VALUE } from '@/data/animalSort';
import down_arrow from '@/assets/images/icons/down_arrow2.svg';
import { WriteReviewHeader } from '@/components/reviews/layout/WriteReviewHeader';
import { InputField } from './ReviewForm_2';
import { GreenBtn } from '@/components/commons/button/greenBtn'; // GreenBtn 경로 확인 필요
import { NextBtn } from '@/components/reviews/ui/NextBtn';
import { SelectField } from '@/components/reviews/ui/SelectField';

export default function ReviewForm_1({ data, setData, onNext }) {
  const [searchTerm, setSearchTerm] = useState(data.hospitalName || '');
  const [recommendations, setRecommendations] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  // 🚩 바텀 시트 상태 관리
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const containerRef = useRef(null);

  useEffect(() => {
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
  }, [searchTerm, data.hospitalName]);

  // 입력 핸들러
  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (!value.trim()) {
      setRecommendations([]);
      setShowDropdown(false);
      setData((prev) => ({ ...prev, hospitalName: '', hospitalId: null }));
    }
  };

  // 외부 클릭 시 드롭다운 닫기
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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

  // 세부 동물 옵션 계산
  const detailOptions = useMemo(() => {
    return data.animalType ? ANIMAL_GROUPS_VALUE[data.animalType] || [] : [];
  }, [data.animalType]);

  const handleChange = (field, value) => {
    setData((prev) => ({ ...prev, [field]: value }));
  };

  // 세부 동물명 선택 핸들러 (바텀시트에서 호출)
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
              className="w-full rounded-[8px] border border-[#EEEEEE] bg-white px-4 py-[14px] text-[20px] placeholder:text-[#BDBDBD] focus:outline-none"
              placeholder="병원명을 입력하세요"
              value={searchTerm}
              onChange={handleInputChange}
              onFocus={() =>
                searchTerm &&
                recommendations.length > 0 &&
                setShowDropdown(true)
              }
            />
          </div>
          {showDropdown && recommendations.length > 0 && (
            <ul className="custom-scrollbar absolute z-50 mt-2 max-h-[220px] w-full overflow-y-auto rounded-[8px] border border-[#EEEEEE] bg-white shadow-lg">
              {recommendations.map((hospital) => (
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
              ))}
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

        {/* 3. 동물종 선택 (기존 드롭다운 유지) */}
        <SelectField
          label="동물종"
          placeholder="동물종을 선택해주세요."
          value={data.animalType}
          options={ANIMAL_CATEGORY_VALUE}
          onChange={(value) => {
            setData((prev) => ({
              ...prev,
              animalType: value,
              animalDetail: '', // 상위 카테고리 변경 시 상세 초기화
            }));
          }}
        />

        {/* 🚩 4. 세부 동물명 선택 (바텀 시트 트리거로 변경) */}
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

        <div className="mt-8">
          <NextBtn label="다음" onClick={onNext} isComplete={isComplete} />
        </div>
      </div>

      {/* 🚩 바텀 시트 컴포넌트 렌더링 */}
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

// 🚩 세부 동물명 선택용 바텀 시트 컴포넌트 (디자인 시안 반영)
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
      {/* 배경 오버레이 */}
      <div
        className="absolute inset-0 z-[100] bg-black/50 transition-opacity"
        onClick={onClose}
      />

      {/* 바텀 시트 본체 */}
      <div className="animate-slideUp right-0 bottom-0 left-0 z-[101] w-full rounded-t-[32px] bg-white pt-4 shadow-2xl">
        {/* 핸들바 (Drag Handle) */}
        <div className="mx-auto mb-6 h-1 w-[32px] rounded-full bg-black" />

        <div className="px-6">
          <div className="mb-6 text-[18px] font-semibold text-[#1E1E1E]">
            세부 동물명
          </div>

          {/* 칩(Chip) 리스트 영역 */}
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

          {/* 선택 버튼 */}
          <GreenBtn
            name="선택"
            onClick={handleConfirm}
            disabled={!tempSelected} // 선택된 값이 없으면 비활성화
          />
        </div>
      </div>
    </>
  );
}
