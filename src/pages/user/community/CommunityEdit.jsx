import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';

import downArrow from '@/assets/images/icons/gray_bottom_arrow.svg';
import leftArrow from '@/assets/images/icons/left_arrow.svg';
import reviewImage from '@/assets/images/icons/review_img_ex.svg';
import xIcon from '@/assets/images/icons/x_icon.svg';

const ANIMAL_CATEGORIES = ['소형포유류', '조류', '파충류', '양서류', '어류'];
const TOPIC_OPTIONS = ['건강/질병', '용품/사료', '일상/자랑', '중고거래'];

const EDIT_POSTS = {
  '1': {
    category: '소형포유류',
    topic: '일상/자랑',
    title: '울집 햄스터 자랑하는 글',
    content:
      '진짜 귀엽죠? 어제는 해바라기씨 몇개 뺏었더니 삐져서 뒤돌아있었어요ㅋㅋㅋ 털이 얼마나 볼슬볼슬 하고 윤기가 나는지.. 이번에 받은 먹이가 잘 맞나봐요! 여기서 추천받았는데 역시 펫뷸런스 고수님들 고견이 최고입니다. 늘 감사합니다 선생님들ㅎ',
    images: [reviewImage, reviewImage],
  },
  '2': {
    category: '소형포유류',
    topic: '일상/자랑',
    title: '울집 햄스터 자랑하는 글',
    content:
      '진짜 귀엽죠? 어제는 해바라기씨 몇개 뺏었더니 삐져서 뒤돌아있었어요ㅋㅋㅋ 털이 얼마나 볼슬볼슬 하고 윤기가 나는지.. 이번에 받은 먹이가 잘 맞나봐요! 여기서 추천받았는데 역시 펫뷸런스 고수님들 고견이 최고입니다. 늘 감사합니다 선생님들ㅎ',
    images: [reviewImage],
  },
};

export default function CommunityEdit() {
  const navigate = useNavigate();
  const { postId } = useParams();

  const initialPost = EDIT_POSTS[postId] ?? EDIT_POSTS['1'];
  const [category, setCategory] = useState(initialPost.category);
  const [topic, setTopic] = useState(initialPost.topic);
  const [title, setTitle] = useState(initialPost.title);
  const [content, setContent] = useState(initialPost.content);
  const [images, setImages] = useState(
    initialPost.images.map((src, index) => ({
      id: `initial-${index}`,
      preview: src,
      isLocal: false,
    })),
  );

  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isTopicOpen, setIsTopicOpen] = useState(false);
  const [isExitConfirmOpen, setIsExitConfirmOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');

  const canSubmit = useMemo(
    () => Boolean(category && topic && title.trim() && content.trim()),
    [category, topic, title, content],
  );

  useEffect(() => {
    return () => {
      images.forEach((image) => {
        if (image.isLocal) URL.revokeObjectURL(image.preview);
      });
    };
  }, [images]);

  const handleAddImages = (event) => {
    const files = Array.from(event.target.files || []);
    if (files.length === 0) return;

    const remainCount = 10 - images.length;
    const selected = files.slice(0, remainCount).map((file) => ({
      id: `${file.name}-${file.size}-${Date.now()}`,
      preview: URL.createObjectURL(file),
      isLocal: true,
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
      if (target?.isLocal) URL.revokeObjectURL(target.preview);
      return prev.filter((item) => item.id !== id);
    });
  };

  const handleSubmit = () => {
    if (!canSubmit) return;

    toast('게시글을 수정했어요', {
      position: 'bottom-center',
      duration: 2500,
      style: {
        width: '100%',
        height: '44px',
        display: 'flex',
        alignItems: 'center',
        background: '#222222E5',
        color: '#ffffff',
      },
    });

    navigate(`/index/community/${postId ?? '1'}`, { replace: true });
  };

  return (
    <div className="relative flex h-full min-h-0 flex-col overflow-hidden bg-white">
      <header className="relative flex h-[48px] items-center justify-between border-b border-[#E0E0E0] px-3">
        <button onClick={() => setIsExitConfirmOpen(true)}>
          <img src={xIcon} alt="닫기" className="h-3 w-3" />
        </button>

        <button
          onClick={() => setIsCategoryOpen((prev) => !prev)}
          className="absolute left-1/2 flex -translate-x-1/2 items-center gap-1 text-[12px] font-medium text-[#424242]"
        >
          {category}
          <img src={downArrow} alt="카테고리" className="h-3 w-3" />
        </button>

        <button
          onClick={handleSubmit}
          disabled={!canSubmit}
          className={`text-[11px] ${canSubmit ? 'text-[#424242]' : 'text-[#BDBDBD]'}`}
        >
          완료
        </button>
      </header>

      <div className="min-h-0 flex-1 overflow-y-auto px-3 pt-3 pb-4">
        <div className="relative">
          <button
            className="flex h-7 items-center gap-1 text-[11px] text-[#616161]"
            onClick={() => setIsTopicOpen((prev) => !prev)}
          >
            {topic || '주제를 선택해주세요'}
            <img src={downArrow} alt="주제" className="h-3 w-3" />
          </button>

          {isTopicOpen && (
            <div className="absolute top-7 left-0 z-20 w-[92px] overflow-hidden rounded-[4px] border border-[#E0E0E0] bg-white">
              {TOPIC_OPTIONS.map((option) => (
                <button
                  key={option}
                  className="block w-full border-b border-[#EFEFEF] px-2 py-1.5 text-left text-[11px] text-[#616161] last:border-b-0"
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

        <div className="mt-2">
          <label className="mb-1 block text-[11px] text-[#757575]">제목</label>
          <div className="relative">
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="글 제목"
              className="h-7 w-full rounded-[4px] border border-[#E5E5E5] px-2 pr-6 text-[10px] outline-none"
            />
            <button
              className="absolute top-1/2 right-2 -translate-y-1/2"
              onClick={() => setTitle('')}
            >
              <img src={xIcon} alt="제목 지우기" className="h-2.5 w-2.5" />
            </button>
          </div>
        </div>

        <div className="mt-2 flex items-center gap-1.5 overflow-x-auto overflow-y-visible py-1">
          {images.map((image, index) => (
            <button
              key={image.id}
              className="relative h-[44px] w-[44px] shrink-0"
              onClick={() => setPreviewImage(image.preview)}
            >
              <div className="relative h-full w-full overflow-hidden rounded-[4px] border border-[#E0E0E0]">
                <img
                  src={image.preview}
                  alt="첨부 이미지"
                  className="h-full w-full object-cover"
                />
                <span className="absolute top-0 left-0 flex h-3 w-3 items-center justify-center rounded-br-[4px] bg-black/45 text-[7px] text-white">
                  {index + 1}
                </span>
              </div>
              <span
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemoveImage(image.id);
                }}
                className="absolute top-0 right-0 z-10 flex h-3.5 w-3.5 translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-black"
              >
                <img src={xIcon} alt="이미지 삭제" className="h-2 w-2" />
              </span>
            </button>
          ))}

          {images.length < 10 && (
            <label className="flex h-[44px] w-[44px] shrink-0 cursor-pointer items-center justify-center rounded-[4px] border border-[#E0E0E0] bg-[#FAFAFA] text-[#D0D0D0]">
              <span className="text-[26px] leading-none">+</span>
              <input
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={handleAddImages}
              />
            </label>
          )}
        </div>

        <div className="mt-2">
          <label className="mb-1 block text-[11px] text-[#757575]">내용</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="h-[118px] w-full rounded-[4px] border border-[#E5E5E5] px-2 py-2 text-[10px] leading-4 text-[#424242] outline-none"
          />
        </div>
      </div>

      {isCategoryOpen && (
        <div className="absolute top-[46px] left-1/2 z-40 w-[98px] -translate-x-1/2 overflow-hidden rounded-[4px] border border-[#E0E0E0] bg-white">
          {ANIMAL_CATEGORIES.map((item) => (
            <button
              key={item}
              className="block w-full border-b border-[#EFEFEF] px-2 py-1.5 text-left text-[11px] text-[#616161] last:border-b-0"
              onClick={() => {
                setCategory(item);
                setIsCategoryOpen(false);
              }}
            >
              {item}
            </button>
          ))}
        </div>
      )}

      {isExitConfirmOpen && (
        <div className="absolute inset-0 z-50 flex items-center justify-center">
          <button
            className="absolute inset-0 bg-black/50"
            onClick={() => setIsExitConfirmOpen(false)}
          />
          <div className="relative w-[196px] rounded-[10px] bg-white px-4 py-4 text-center">
            <h3 className="text-[12px] font-medium text-[#1E1E1E]">
              게시글 수정을 그만할까요?
            </h3>
            <p className="mt-1 text-[10px] text-[#8A8A8A]">
              변경된 내용은 저장되지 않아요.
            </p>
            <div className="mt-3 flex gap-1.5">
              <button
                className="flex-1 rounded-[999px] border border-[#E0E0E0] py-1.5 text-[10px] text-[#8A8A8A]"
                onClick={() => setIsExitConfirmOpen(false)}
              >
                취소
              </button>
              <button
                className="flex-1 rounded-[999px] bg-[#FF2B2B] py-1.5 text-[10px] text-white"
                onClick={() => navigate('/index/community', { replace: true })}
              >
                나가기
              </button>
            </div>
          </div>
        </div>
      )}

      {previewImage && (
        <div className="absolute inset-0 z-[60] flex items-center justify-center bg-[#1D1F24]">
          <button
            className="absolute top-5 right-5 text-white"
            onClick={() => setPreviewImage('')}
          >
            <img src={xIcon} alt="미리보기 닫기" className="h-3 w-3" />
          </button>
          <img
            src={previewImage}
            alt="첨부 사진 미리보기"
            className="w-full max-w-[620px] object-contain"
          />
        </div>
      )}
    </div>
  );
}
