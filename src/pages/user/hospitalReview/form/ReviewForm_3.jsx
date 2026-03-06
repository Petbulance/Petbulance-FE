import { useRef } from 'react';

import camera_icon from '@/assets/images/icons/camera_icon.svg';
import { WriteReviewHeader } from '@/components/reviews/layout/WriteReviewHeader';
import delete_icon from '@/assets/images/icons/circle_x.svg';
import add_icon from '@/assets/images/icons/add_icon.svg';
import { ProgressBar } from '@/components/reviews/ui/ProgressBar';
import { NextBtn } from '@/components/reviews/ui/NextBtn';

export default function ReviewForm_3({ data, setData, onNext }) {
  const MAX_IMAGE_COUNT = 5;
  const fileInputRef = useRef(null);

  const handleContentChange = (e) => {
    setData((prev) => ({ ...prev, content: e.target.value }));
  };

  const handleImageUpload = () => {
    if ((data.images?.length || 0) >= MAX_IMAGE_COUNT) {
      alert(`사진은 최대 ${MAX_IMAGE_COUNT}장까지 첨부할 수 있어요.`);
      return;
    }
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    const currentImages = data.images || [];

    if (currentImages.length + files.length > MAX_IMAGE_COUNT) {
      alert(`사진은 최대 ${MAX_IMAGE_COUNT}장까지 첨부할 수 있어요.`);
      return;
    }

    setData((prev) => ({
      ...prev,
      images: [...currentImages, ...files],
    }));

    e.target.value = '';
  };

  const handleRemoveImage = (indexToRemove) => {
    setData((prev) => ({
      ...prev,
      images: prev.images.filter((_, index) => index !== indexToRemove),
    }));
  };

  const isComplete = data.content.trim().length > 0;
  const hasImages = (data.images?.length || 0) > 0;

  return (
    <div className="h-dvh">
      <WriteReviewHeader label="후기 작성" />

      <div className="flex h-full flex-col overflow-y-auto bg-white px-6 pt-10 pb-6">
        <ProgressBar currentStep={3} />

        {/* === 이미지 영역 === */}
        <div className="mb-10 flex w-full flex-wrap gap-4">
          {!hasImages && (
            <button
              type="button"
              onClick={handleImageUpload}
              className="flex h-[96px] w-[96px] flex-col items-center justify-center rounded-[12px] border-[1.72px] border-[#EEEEEE] bg-white text-[#9E9E9E]"
            >
              <img src={camera_icon} alt="camera" />
              <span className="text-[20.67px] font-medium">
                0/{MAX_IMAGE_COUNT}
              </span>
            </button>
          )}

          {hasImages && (
            <>
              {data.images.map((file, index) => (
                <div
                  key={`${file.name}-${index}`}
                  className="relative h-[96px] w-[96px]"
                >
                  <img
                    src={URL.createObjectURL(file)}
                    alt={`preview-${index}`}
                    className="h-full w-full rounded-[12px] object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(index)}
                    className="absolute top-[-2.33px] right-[-1.67px] flex h-6 w-6 items-center justify-center rounded-full bg-[#1E1E1E] shadow-md transition-colors hover:bg-black"
                  >
                    <img src={delete_icon} alt="delete" />
                  </button>
                </div>
              ))}

              {data.images.length < MAX_IMAGE_COUNT && (
                <button
                  type="button"
                  onClick={handleImageUpload}
                  className="flex h-[96px] w-[96px] items-center justify-center rounded-[12px] border-[1.72px] border-[#EEEEEE] bg-white transition-colors hover:bg-gray-50"
                >
                  <img src={add_icon} alt="add" />
                </button>
              )}
            </>
          )}
        </div>

        {/* hidden file input */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={handleFileChange}
        />

        <div className="flex flex-col">
          <label className="mb-1 text-[19px] font-medium text-[#424242]">
            내용
          </label>
          <textarea
            className="h-[256px] w-full resize-none rounded-[6px] border border-[#EEEEEE] px-4 py-3 text-[18px] placeholder:text-[#BDBDBD] focus:outline-none"
            placeholder="생생한 진료/치료 후기를 공유해주세요."
            value={data.content}
            onChange={handleContentChange}
          />
        </div>

        <div className="mt-auto mb-8 pt-6">
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
