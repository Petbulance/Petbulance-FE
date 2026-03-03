import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

import cameraIcon from '@/assets/images/icons/camera_icon.svg';
import downArrow from '@/assets/images/icons/gray_bottom_arrow.svg';
import leftArrow from '@/assets/images/icons/left_arrow.svg';
import xIcon from '@/assets/images/icons/x_icon.svg';

const ANIMAL_CATEGORIES = ['소형포유류', '조류', '파충류', '양서류', '어류'];
const TOPIC_OPTIONS = ['건강/질병', '용품/사료', '일상/자랑', '중고거래'];

export default function CommunityWrite() {
  const navigate = useNavigate();

  const [category, setCategory] = useState('');
  const [topic, setTopic] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [images, setImages] = useState([]);
  const [isCategoryOpen, setIsCategoryOpen] = useState(true);
  const [isTopicOpen, setIsTopicOpen] = useState(false);

  const canSubmit = useMemo(
    () => Boolean(category && topic && title.trim() && content.trim()),
    [category, topic, title, content]
  );

  useEffect(() => {
    return () => {
      images.forEach((image) => URL.revokeObjectURL(image.preview));
    };
  }, [images]);

  const handleAddImages = (event) => {
    const files = Array.from(event.target.files || []);
    if (files.length === 0) return;

    const remainCount = 10 - images.length;
    const selected = files.slice(0, remainCount).map((file) => ({
      id: `${file.name}-${file.size}-${Date.now()}`,
      file,
      preview: URL.createObjectURL(file),
    }));

    if (files.length > remainCount) {
      toast('사진은 최대 10장까지 첨부할 수 있어요', {
        position: 'bottom-center',
      });
    }

    setImages((prev) => [...prev, ...selected]);
    event.target.value = '';
  };

  const handleRemoveImage = (id) => {
    setImages((prev) => {
      const target = prev.find((item) => item.id === id);
      if (target) URL.revokeObjectURL(target.preview);
      return prev.filter((item) => item.id !== id);
    });
  };

  const handleSubmit = () => {
    if (!canSubmit) return;

    toast('게시글 등록을 완료했어요', {
      position: 'bottom-center',
      duration: 3000,
      style: {
        width: '100%',
        height: '44px',
        display: 'flex',
        alignItems: 'center',
        background: '#222222E5',
        color: '#ffffff',
      },
      action: {
        label: '✕',
        onClick: () => toast.dismiss(),
      },
      actionButtonStyle: {
        background: 'transparent',
        border: 'none',
        color: '#ffffff',
        padding: 0,
        cursor: 'pointer',
      },
    });

    navigate('/index/community/1');
  };

  return (
    <div className="relative flex h-full min-h-0 flex-col overflow-hidden bg-white">
      <header className="relative flex h-[48px] items-center justify-between border-b border-[#E0E0E0] px-4">
        <button onClick={() => navigate(-1)}>
          <img src={leftArrow} alt="뒤로가기" />
        </button>

        <button
          onClick={() => setIsCategoryOpen(true)}
          className="absolute left-1/2 flex -translate-x-1/2 items-center gap-1 text-[14px] text-[#424242]"
        >
          {category || '라운지 선택'}
          <img src={downArrow} alt="라운지 선택" className="h-3 w-3" />
        </button>

        <div className="w-5" />
      </header>

      <div className="min-h-0 flex-1 overflow-y-auto px-4 pt-3 pb-4">
        <div className="relative">
          <button
            className="flex h-8 items-center gap-1 rounded-md px-2 text-[12px] text-[#616161]"
            onClick={() => setIsTopicOpen((prev) => !prev)}
          >
            {topic || '주제를 선택해주세요'}
            <img src={downArrow} alt="주제 펼치기" className="h-3 w-3" />
          </button>

          {isTopicOpen && (
            <div className="absolute top-9 left-0 z-20 w-[132px] overflow-hidden rounded-md border border-[#E0E0E0] bg-white">
              {TOPIC_OPTIONS.map((option) => (
                <button
                  key={option}
                  className="block w-full border-b border-[#EFEFEF] px-3 py-2 text-left text-[12px] text-[#616161] last:border-b-0"
                  onClick={() => {
                    setTopic(option);
                    setIsTopicOpen(false);
                  }}
                >
                  {option}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="mt-4">
          <label className="mb-1 block text-[12px] text-[#757575]">제목</label>
          <div className="relative">
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="글 제목"
              className="h-9 w-full rounded-[6px] border border-[#E5E5E5] px-2 pr-8 text-[13px] outline-none"
              maxLength={40}
            />
            {title && (
              <button
                className="absolute top-1/2 right-2 -translate-y-1/2"
                onClick={() => setTitle('')}
              >
                <img src={xIcon} alt="제목 지우기" className="h-3 w-3" />
              </button>
            )}
          </div>
        </div>

        <div className="mt-3">
          <label className="mb-1 block text-[12px] text-[#757575]">사진</label>
          <div className="flex items-center gap-1.5 overflow-x-auto overflow-y-visible py-1">
            {images.length === 0 ? (
              <label className="flex h-[60px] w-[60px] shrink-0 cursor-pointer flex-col items-center justify-center rounded-[8px] border border-[#E0E0E0] bg-[#FAFAFA] text-[#9E9E9E]">
                <img
                  src={cameraIcon}
                  alt="사진추가"
                  className="h-4 w-4 opacity-70"
                />
                <span className="mt-1 text-[12px]">0/10</span>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={handleAddImages}
                />
              </label>
            ) : (
              <>
                {images.map((image, index) => (
                  <div
                    key={image.id}
                    className="relative h-[60px] w-[60px] shrink-0"
                  >
                    <div className="relative h-full w-full overflow-hidden rounded-[6px] border border-[#E0E0E0]">
                      <img
                        src={image.preview}
                        alt="첨부 이미지"
                        className="h-full w-full object-cover"
                      />
                      <span className="absolute top-0 left-0 flex h-[15px] w-[15px] items-center justify-center rounded-br-[6px] bg-black/45 text-[8.25px] font-medium text-white">
                        {index + 1}
                      </span>
                    </div>
                    <button
                      onClick={() => handleRemoveImage(image.id)}
                      className="absolute top-0 right-0 z-10 flex h-4 w-4 translate-x-1/4 -translate-y-1/4 items-center justify-center rounded-full bg-black"
                    >
                      <img
                        src={xIcon}
                        alt="이미지 삭제"
                        className="h-2.5 w-2.5"
                      />
                    </button>
                  </div>
                ))}

                {images.length < 10 && (
                  <label className="flex h-[60px] w-[60px] shrink-0 cursor-pointer items-center justify-center rounded-[6px] border border-[#E0E0E0] bg-[#FAFAFA]">
                    <span className="text-[34px] leading-none text-[#D0D0D0]">
                      +
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      className="hidden"
                      onChange={handleAddImages}
                    />
                  </label>
                )}
              </>
            )}
          </div>
        </div>

        <div className="mt-3">
          <label className="mb-1 block text-[12px] text-[#757575]">내용</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="반려동물 자랑글 혹은 케어 방법 팁 등을 작성해보세요."
            className="h-[240px] w-full rounded-[6px] border border-[#E5E5E5] px-2 py-2 text-[13px] leading-5 text-[#424242] outline-none"
            maxLength={1200}
          />
        </div>
      </div>

      <footer className="border-t border-[#F0F0F0] bg-white px-4 py-3">
        <button
          onClick={handleSubmit}
          disabled={!canSubmit}
          className={`h-10 w-full rounded-[8px] text-[14px] font-medium text-white ${canSubmit ? 'bg-[#2DA969]' : 'bg-[#DCDCDC]'}`}
        >
          작성 완료
        </button>
      </footer>

      {isCategoryOpen && (
        <div className="absolute inset-0 z-30 flex items-center justify-center">
          <button
            className="absolute inset-0 bg-black/40"
            onClick={() => setIsCategoryOpen(false)}
            aria-label="카테고리 선택 닫기"
          />
          <div className="relative w-[260px] rounded-[12px] bg-white p-4">
            <p className="mb-2 text-[14px] font-medium text-[#1E1E1E]">
              작성할 라운지를 선택해주세요
            </p>
            <div className="space-y-1">
              {ANIMAL_CATEGORIES.map((item) => (
                <button
                  key={item}
                  className="flex w-full items-center justify-between rounded px-1 py-2 text-left text-[14px] text-[#424242]"
                  onClick={() => {
                    setCategory(item);
                    setIsCategoryOpen(false);
                  }}
                >
                  {item}
                  {category === item && (
                    <span className="text-[#2DA969]">✓</span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
