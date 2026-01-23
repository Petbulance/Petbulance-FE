import { NextBtn } from './ReviewForm_1';
import down_arrow from '@/assets/images/icons/down_arrow2.svg';

export default function ReviewForm_2({ data, setData, onNext }) {
  const inputFields = [
    {
      id: 'animalDetail',
      label: '세부 동물명',
      placeholder: '예: 골든햄스터, 코뉴어, 코리도라스',
      value: data.animalDetail,
    },
    {
      id: 'treatment1',
      label: '진료명',
      placeholder: '예: 골절, 발톱정리, 종양수술',
      value: data.treatments[0] || '',
    },
    {
      id: 'treatment2',
      label: '진료명',
      placeholder: '예: 골절, 발톱정리, 종양수술',
      value: data.treatments[1] || '',
    },
  ];

  const animalOptions = [
    { value: 'dog', label: '강아지' },
    { value: 'cat', label: '고양이' },
    { value: 'etc', label: '특수동물' },
  ];

  // 입력값 변경 핸들러
  const handleChange = (field, value) => {
    setData((prev) => ({ ...prev, [field]: value }));
  };

  // 필수 입력값 확인
  const isComplete =
    data.animalType && data.animalDetail && data.treatments?.length > 0;

  return (
    <div className="flex h-full flex-col overflow-y-auto bg-white px-6 pt-[39px]">
      <div className="space-y-10">
        <div>
          <label className="mb-2 block text-[19px] font-medium text-[#424242]">
            동물종
          </label>
          <div className="relative w-[280px]">
            <select
              className={`w-full appearance-none rounded-[8px] border border-[#EEEEEE] bg-white px-4 py-2 text-[20px] focus:outline-none ${data.animalType ? 'text-[#424242]' : 'text-[#BCBCBC]'}`}
              onChange={(e) => handleChange('animalType', e.target.value)}
            >
              <option value="" disabled>
                동물종을 선택해주세요
              </option>
              {animalOptions.map((option) => (
                <option
                  key={option.value}
                  value={option.value}
                  className="text-[#424242]"
                >
                  {option.label}
                </option>
              ))}
            </select>

            <div className="pointer-events-none absolute top-[10px] right-4 flex items-center">
              <img src={down_arrow} alt="drop_down" />
            </div>
          </div>
        </div>

        {inputFields.map((field, index) => (
          <InputField
            key={`${field.id}-${index}`}
            label={field.label}
            placeholder={field.placeholder}
            value={field.value}
            onChange={(val) => {
              if (field.id.startsWith('treatment')) {
                const newTreatments = [...(data.treatments || [])];
                const tIndex = field.id === 'treatment1' ? 0 : 1;
                newTreatments[tIndex] = val;
                handleChange('treatments', newTreatments);
              } else {
                handleChange(field.id, val);
              }
            }}
          />
        ))}
      </div>
      <div className="absolute right-6 bottom-0 left-6">
        <NextBtn label="다음" onClick={onNext} />
      </div>
    </div>
  );
}

const InputField = ({ label, value, onChange, placeholder }) => (
  <div className="mb-10">
    <label className="mb-2 block text-[19px] font-medium text-[#424242]">
      {label}
    </label>
    <input
      className="w-full rounded-[8px] border border-[#EEEEEE] bg-white px-4 py-[10px] text-[20px] placeholder:text-[#BDBDBD] focus:outline-none"
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  </div>
);
