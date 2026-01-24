import empty_star_icon from '@/assets/images/icons/star_gray_40.svg';
import fill_star_icon from '@/assets/images/icons/star_yellow_40.svg';
import { WriteReviewHeader } from '@/components/reviews/layout/WriteReviewHeader';

export default function ReviewForm_1({ data, setData, onNext }) {
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

  const isComplete =
    data.hospitalName && Object.values(data.ratings).every((v) => v > 0);

  return (
    <div className="h-dvh">
      <WriteReviewHeader label="후기 작성" />
      <div className="flex h-full flex-col overflow-y-auto bg-white px-6 pt-[39px] pb-[66px]">
        {/* 병원명 입력 */}
        <div>
          <label className="mb-2 block text-[19px] font-medium text-[#424242]">
            병원명
          </label>
          <input
            className="text-5 w-full rounded-[8px] border border-[#EEEEEE] bg-white px-4 py-[14px] focus:outline-none"
            placeholder="병원명을 입력하세요"
            value={data.hospitalName}
            onChange={(e) => setData({ ...data, hospitalName: e.target.value })}
          />
        </div>

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

        <NextBtn label="다음" onClick={onNext} isComplete={isComplete} />
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
        className="w-full rounded-[16px] bg-[#2DA969] py-5 text-[27px] font-medium text-white shadow-lg transition-transform hover:bg-[#258d58] active:scale-[0.98]"
      >
        {label}
      </button>
    </div>
  );
}
