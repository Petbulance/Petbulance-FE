import { useState, useEffect, useMemo, useRef } from 'react';
import { fetchHospitalsByName } from '@/apis/hospitals';
import { ProgressBar } from '@/components/reviews/ui/ProgressBar';
import { ANIMAL_CATEGORY_VALUE, ANIMAL_GROUPS_VALUE } from '@/data/animalSort';
import down_arrow from '@/assets/images/icons/down_arrow2.svg';
import { WriteReviewHeader } from '@/components/reviews/layout/WriteReviewHeader';
import { InputField } from './ReviewForm_2';

export default function ReviewForm_1({ data, setData, onNext }) {
  const [searchTerm, setSearchTerm] = useState(data.hospitalName || '');
  const [recommendations, setRecommendations] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
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

  //입력 핸들러
  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    // 검색어를 다 지우면 즉시 드롭다운과 목록을 초기화
    if (!value.trim()) {
      setRecommendations([]);
      setShowDropdown(false);
      setData((prev) => ({ ...prev, hospitalName: '', hospitalId: null }));
    }
  };

  //외부 클릭 시 드롭다운 닫기
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

  const detailOptions = useMemo(() => {
    return data.animalType ? ANIMAL_GROUPS_VALUE[data.animalType] || [] : [];
  }, [data.animalType]);

  const handleChange = (field, value) => {
    setData((prev) => ({ ...prev, [field]: value }));
  };

  const isComplete =
    data.hospitalName && data.cost && data.animalType && data.animalDetail;

  return (
    <div className="flex h-dvh flex-col overflow-hidden bg-white">
      <WriteReviewHeader label="후기 작성" />

      <div className="flex-1 overflow-y-auto px-6 pt-[39px] pb-[66px]">
        <ProgressBar currentStep={1} />

        {/* 병원명 입력 섹션 */}
        <div className="relative mb-6" ref={containerRef}>
          <label className="mb-2 block text-[19px] font-medium text-[#424242]">
            병원명
          </label>
          <div className="relative">
            <input
              className="w-full rounded-[8px] border border-[#EEEEEE] bg-white px-4 py-[14px] text-[20px] placeholder:text-[#BCBCBC] focus:outline-none"
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

          {/* 추천 목록 드롭다운 */}
          {showDropdown && recommendations.length > 0 && (
            <ul className="absolute z-50 mt-1 max-h-[220px] w-full overflow-y-auto rounded-[8px] border border-t-0 border-[#EEEEEE] bg-white shadow-xl">
              {recommendations.map((hospital) => (
                <li
                  key={hospital.id}
                  className="cursor-pointer border-b border-[#F5F5F5] px-4 py-3 last:border-none hover:bg-[#F9F9F9] active:bg-[#F0F0F0]"
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

        {/* 비용 입력 */}
        <div className="mb-6">
          <InputField
            label="총 비용"
            placeholder="진료/치료 비용 총합을 입력해주세요."
            value={data.cost || ''}
            onChange={(val) => handleChange('cost', val)}
          />
        </div>

        {/* 동물종 선택 */}
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

        {/* 세부 동물명 선택 */}
        <SelectField
          label="세부 동물명"
          placeholder={
            data.animalType
              ? '세부 동물명을 선택해주세요.'
              : '동물종을 먼저 선택해주세요.'
          }
          value={data.animalDetail}
          options={detailOptions}
          onChange={(val) => handleChange('animalDetail', val)}
          disabled={!data.animalType}
        />

        <div className="mt-8">
          <NextBtn label="다음" onClick={onNext} isComplete={isComplete} />
        </div>
      </div>
    </div>
  );
}

export function NextBtn({ label, onClick, isComplete }) {
  return (
    <div className="pb-8">
      <button
        type="button"
        onClick={onClick}
        disabled={!isComplete}
        className={`w-full rounded-[16px] py-5 text-[20px] font-medium text-white shadow-md transition-all ${
          isComplete
            ? 'bg-[#2DA969] active:scale-[0.98]'
            : 'cursor-not-allowed bg-[#E0E0E0]'
        }`}
      >
        {label}
      </button>
    </div>
  );
}

export function SelectField({
  label,
  value,
  onChange,
  options,
  placeholder,
  disabled = false,
}) {
  return (
    <div className="mb-6">
      <label className="mb-2 block text-[19px] font-medium text-[#424242]">
        {label}
      </label>
      <div className="relative w-full">
        <select
          disabled={disabled}
          className={`w-full appearance-none rounded-[8px] border border-[#EEEEEE] bg-white px-4 py-[14px] text-[20px] focus:outline-none disabled:bg-[#FAFAFA] ${
            value ? 'text-[#424242]' : 'text-[#BCBCBC]'
          }`}
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2">
          <img
            src={down_arrow}
            alt="arrow"
            className={disabled ? 'opacity-20' : ''}
          />
        </div>
      </div>
    </div>
  );
}
