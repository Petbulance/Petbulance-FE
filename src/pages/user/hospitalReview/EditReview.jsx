import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import add from '@/assets/images/icons/add_icon.svg';
import circle_x from '@/assets/images/icons/circle_x.svg';
import down_arrow from '@/assets/images/icons/down_arrow2.svg';
import reviewImg from '@/assets/images/icons/review_img_ex.svg';
import empty_star_icon from '@/assets/images/icons/star_gray_40.svg';
import fill_star_icon from '@/assets/images/icons/star_yellow_40.svg';

import { NextBtn } from './form/ReviewForm_1';
import { InputField } from './form/ReviewForm_2';

export function EditReview() {
  const { reviewId } = useParams();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  // 1. 전체 데이터 상태 통합 관리
  const [data, setData] = useState({
    hospitalName: '',
    animalType: '',
    animalDetail: '',
    treatments: ['', ''],
    ratings: {
      expertise: 0,
      kindness: 0,
      facility: 0,
    },
    images: [],
    content: '',
  });

  // 2. 카테고리 및 옵션 설정
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

  const animalOptions = [
    { value: 'dog', label: '강아지' },
    { value: 'cat', label: '고양이' },
    { value: 'etc', label: '특수동물' },
  ];

  const inputFields = [
    {
      id: 'animalDetail',
      label: '세부 동물명',
      placeholder: '예: 골든햄스터, 코뉴어, 코리도라스',
      value: data.animalDetail || '',
    },
    {
      id: 'treatment1',
      label: '진료명',
      placeholder: '예: 골절, 발톱정리, 종양수술',
      value: data.treatments[0] || '',
    },
  ];

  // 3. 기존 리뷰 데이터 불러오기
  useEffect(() => {
    // 실제 구현 시: const response = await fetchReview(reviewId);
    const mockData = {
      hospitalName: '튼튼 동물병원',
      animalType: 'etc',
      animalDetail: '골든햄스터',
      treatments: ['종양수술', '약처방'],
      ratings: {
        expertise: 5,
        kindness: 4,
        facility: 5,
      },
      images: [reviewImg, reviewImg, reviewImg],
      content:
        '주말에 갑자기 햄스터가 원인불명으로 아픈 바람에 급하게 찾아갔는데 정말 친절하셨어요. 시설도 깔끔해서 믿음이 갔습니다.',
    };
    setData(mockData);
  }, [reviewId]);

  // 4. 핸들러 함수들
  const handleChange = (field, value) => {
    setData((prev) => ({ ...prev, [field]: value }));
  };

  const handleRating = (catId, score) => {
    setData((prev) => ({
      ...prev,
      ratings: { ...prev.ratings, [catId]: score },
    }));
  };

  const handleAddImage = (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;
    const newImageUrls = files.map((file) => URL.createObjectURL(file));
    setData((prev) => ({
      ...prev,
      images: [...prev.images, ...newImageUrls].slice(0, 5),
    }));
  };

  const handleRemoveImage = (index) => {
    setData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const handleContentChange = (e) => {
    handleChange('content', e.target.value);
  };

  return (
    <div className="min-h-screen bg-white p-6">
      {/* 병원명 섹션 */}
      <section className="mb-10">
        <label className="mb-2 block text-[19px] font-medium text-[#424242]">
          병원명
        </label>
        <input
          className="w-full rounded-[8px] border border-[#EEEEEE] bg-white px-4 py-[14px] text-[18px] focus:border-[#27BE69] focus:outline-none"
          placeholder="병원명을 입력하세요"
          value={data.hospitalName}
          onChange={(e) => handleChange('hospitalName', e.target.value)}
        />
      </section>

      {/* 별점 섹션 */}
      <section className="mt-15 text-center">
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
            <div className="flex justify-center gap-1">
              {[1, 2, 3, 4, 5].map((num) => (
                <button
                  key={num}
                  type="button"
                  onClick={() => handleRating(cat.id, num)}
                  className="p-1 transition-transform active:scale-90"
                >
                  <img
                    src={
                      num <= data.ratings[cat.id]
                        ? fill_star_icon
                        : empty_star_icon
                    }
                    alt={`${num}점`}
                    className="h-10 w-10"
                  />
                </button>
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* 동물종 및 진료 상세 정보 섹션 */}
      <section className="mt-10">
        <label className="mb-2 block text-[19px] font-medium text-[#424242]">
          동물종
        </label>
        <div className="relative mb-6 w-[280px]">
          <select
            className={`w-full appearance-none rounded-[8px] border border-[#EEEEEE] bg-white px-4 py-2 text-[20px] focus:outline-none ${
              data.animalType ? 'text-[#424242]' : 'text-[#BCBCBC]'
            }`}
            value={data.animalType}
            onChange={(e) => handleChange('animalType', e.target.value)}
          >
            <option value="" disabled>
              동물종을 선택해주세요
            </option>
            {animalOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute top-[10px] right-4 flex items-center">
            <img src={down_arrow} alt="drop_down" />
          </div>
        </div>

        <div className="flex flex-col gap-4">
          {inputFields.map((field, index) => (
            <InputField
              key={`${field.id}-${index}`}
              label={field.label}
              placeholder={field.placeholder}
              value={field.value}
              onChange={(val) => {
                if (field.id.startsWith('treatment')) {
                  const newTreatments = [...(data.treatments || ['', ''])];
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
      </section>

      {/* 사진 및 내용 수정 섹션 */}
      <section className="mt-10">
        <h3 className="mb-4 text-[19px] font-medium text-[#424242]">
          사진 수정
        </h3>
        <div className="mb-8 flex flex-wrap gap-[10.32px]">
          {data.images.map((img, index) => (
            <div key={index} className="relative h-[116px] w-[116px]">
              <div className="absolute top-0 left-0 z-10 rounded-tl-[6px] rounded-br-[6px] bg-black/50 px-[5.5px] py-[1.5px] text-[8.25px] font-medium text-white">
                {index + 1}
              </div>
              <img
                src={img}
                alt="review"
                className="h-full w-full rounded-[8px] object-cover"
              />
              <button
                type="button"
                onClick={() => handleRemoveImage(index)}
                className="absolute -top-[4px] -right-[6px] z-20"
              >
                <img src={circle_x} alt="delete" />
              </button>
            </div>
          ))}

          {data.images.length < 5 && (
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="flex h-[116px] w-[116px] flex-col items-center justify-center rounded-[8px] border border-[1.53px] border-[#E0E0E0] bg-[#FFFFFF]"
            >
              <img src={add} alt="add_file" />
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept="image/*"
                onChange={handleAddImage}
                className="hidden"
              />
            </button>
          )}
        </div>

        <div className="flex flex-col">
          <label className="mb-2 text-[19px] font-medium text-[#424242]">
            내용
          </label>
          <textarea
            className="h-[256px] w-full resize-none rounded-[6px] border border-[#EEEEEE] px-4 py-3 text-[18px] placeholder:text-[#BDBDBD] focus:border-[#27BE69] focus:outline-none"
            placeholder="반려동물 자랑글 혹은 케어 방법 질문 등을 작성해보세요."
            value={data.content}
            onChange={handleContentChange}
          />
        </div>
      </section>

      <div className="mt-12 mb-8">
        <NextBtn
          label="후기 등록하기"
          onClick={() => navigate(-1)}
          isComplete={true}
        />
      </div>
    </div>
  );
}
