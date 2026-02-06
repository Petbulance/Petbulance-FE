import down_arrow from '@/assets/images/icons/down_arrow2.svg';
import empty_star_icon from '@/assets/images/icons/star_gray_40.svg';
import fill_star_icon from '@/assets/images/icons/star_yellow_40.svg';
import { WriteReviewHeader } from '@/components/reviews/layout/WriteReviewHeader';
import { NextBtn } from '@/components/reviews/ui/NextBtn';

import { ProgressBar } from '@/components/reviews/ui/ProgressBar';

export default function ReviewForm_2({ data, setData, onNext }) {
  const categories = [
    {
      id: 'expertise',
      label: '전문성',
      desc: '증상과 치료에 대해 자세히 설명했나요?',
    },
    {
      id: 'kindness',
      label: '친절도',
      desc: '접수/수납 과정에서 충분한 안내를 받았나요?',
    },
    {
      id: 'facility',
      label: '시설/환경',
      desc: '진료실과 병원 시설이 위생적이었나요?',
    },
  ];

  const handleRating = (cat, val) => {
    setData((prev) => ({
      ...prev,
      ratings: { ...prev.ratings, [cat]: val },
    }));
  };

  const isComplete = Object.values(data.ratings).every((v) => v > 0);

  return (
    <div className="h-dvh">
      <WriteReviewHeader label="후기 작성" />

      <div className="flex h-full flex-col overflow-y-auto bg-white px-6 pt-[39px]">
        <ProgressBar currentStep={2} />

        {/* 별점 섹션 */}
        <div className="mt-15 text-center">
          <h3 className="mb-15 text-left text-[23px] font-semibold text-[#424242]">
            솔직한 후기를 남겨주세요
          </h3>
          {categories.map((cat) => (
            <div key={cat.id} className="mb-15">
              <span className="text-[23px] font-semibold text-[#424242]">
                {cat.label}
              </span>
              <p className="my-3 text-[20px] font-medium text-[#9E9E9E]">
                {cat.desc}
              </p>
              <div className="flex justify-center">
                {[1, 2, 3, 4, 5].map((num) => {
                  const isSelected = num <= data.ratings[cat.id];

                  return (
                    <button
                      key={num}
                      type="button"
                      onClick={() => handleRating(cat.id, num)}
                      className="p-1 transition-transform active:scale-90"
                    >
                      <img
                        src={isSelected ? fill_star_icon : empty_star_icon}
                        alt={`${num}점`}
                      />
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
          <div className="h-[170px] w-max" />
        </div>
      </div>
      <div className="absolute right-6 bottom-0 left-6">
        <NextBtn label="다음" onClick={onNext} isComplete={isComplete} />
      </div>
    </div>
  );
}

export const InputField = ({ label, value, onChange, placeholder }) => (
  <div>
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
