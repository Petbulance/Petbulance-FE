import { useRef } from 'react';

import camera_icon from '@/assets/images/icons/camera_icon.svg';
import { WriteReviewHeader } from '@/components/reviews/layout/WriteReviewHeader';

import { NextBtn } from './ReviewForm_1';

export default function ReviewForm_3({ data, setData, onNext }) {
  const fileInputRef = useRef(null);

  const handleContentChange = (e) => {
    setData((prev) => ({ ...prev, content: e.target.value }));
  };

  const handleImageUpload = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    const currentImages = data.images || [];

    if (currentImages.length + files.length > 10) {
      alert('사진은 최대 10장까지 첨부할 수 있어요.');
      return;
    }

    setData((prev) => ({
      ...prev,
      images: [...currentImages, ...files],
    }));

    e.target.value = '';
  };

  const isComplete = data.content.trim().length > 0;

  return (
    <div className="h-dvh">
      <WriteReviewHeader label="후기 작성" />

      <div className="flex h-full flex-col overflow-y-auto bg-white px-6 pt-10">
        <div className="mb-10">
          <button
            type="button"
            onClick={handleImageUpload}
            className="flex h-[124px] w-[124px] flex-col items-center justify-center rounded-[12px] border-[1.72px] border-[#EEEEEE] bg-white text-[#9E9E9E]"
          >
            <img src={camera_icon} alt="camera" />
            <span className="text-[20.67px] font-medium">
              <span>{data.images?.length || 0}</span>/10
            </span>
          </button>

          {/* hidden file input */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={handleFileChange}
          />
        </div>

        <div className="flex flex-col">
          <label className="mb-1 text-[19px] font-medium text-[#424242]">
            내용
          </label>
          <textarea
            className="h-[256px] w-full resize-none rounded-[6px] border border-[#EEEEEE] px-4 py-3 text-[18px] placeholder:text-[#BDBDBD] focus:outline-none"
            placeholder="반려동물 자랑글 혹은 케어 방법 질문 등을 작성해보세요."
            value={data.content}
            onChange={handleContentChange}
          />
        </div>

        <div className="absolute right-6 bottom-0 left-6">
          <NextBtn
            label="후기 등록하기"
            onClick={onNext}
            isComplete={isComplete}
          />
        </div>
      </div>
    </div>
  );
}
