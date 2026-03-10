import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';

import {
  COMMUNITY_TOPIC_TO_API,
  COMMUNITY_TYPE_TO_API,
  createCommunityPost,
  uploadPostImages,
} from '@/apis/community/posts';
import cameraIcon from '@/assets/images/icons/camera_icon.svg';
import downArrow from '@/assets/images/icons/gray_bottom_arrow.svg';
import reviewImage from '@/assets/images/icons/review_img_ex.svg';
import xIcon from '@/assets/images/icons/x_icon.svg';
import xIconBlack from '@/assets/images/icons/x_icon_black.svg';

const ANIMAL_CATEGORIES = ['소형포유류', '조류', '파충류', '양서류', '어류'];
const TOPIC_OPTIONS = ['건강/질병', '용품/사료', '일상/자랑', '중고거래'];
const EDIT_POSTS = {
  1: {
    category: '소형포유류',
    topic: '일상/자랑',
    title: '울집 햄스터 자랑하는 글',
    content:
      '진짜 귀엽죠? 어제는 해바라기씨 몇개 뺏었더니 삐져서 뒤돌아있었어요ㅋㅋㅋ 털이 얼마나 볼슬볼슬 하고 윤기가 나는지.. 이번에 받은 먹이가 잘 맞나봐요! 여기서 추천받았는데 역시 펫뷸런스 고수님들 고견이 최고입니다. 늘 감사합니다 선생님들ㅎ',
    images: [reviewImage, reviewImage],
  },
};

export default function CommunityWrite() {
  const navigate = useNavigate();
  const { postId } = useParams();
  const isEditMode = Boolean(postId);
  const initialEditPost = isEditMode
    ? (EDIT_POSTS[postId] ?? EDIT_POSTS['1'])
    : null;

  const [category, setCategory] = useState(initialEditPost?.category ?? '');
  const [topic, setTopic] = useState(initialEditPost?.topic ?? '');
  const [title, setTitle] = useState(initialEditPost?.title ?? '');
  const [content, setContent] = useState(initialEditPost?.content ?? '');
  const [images, setImages] = useState(
    initialEditPost
      ? initialEditPost.images.map((src, index) => ({
          id: `initial-${index}`,
          preview: src,
          isLocal: false,
          file: null,
        }))
      : []
  );
  const [isCategoryOpen, setIsCategoryOpen] = useState(!isEditMode);
  const [isTopicOpen, setIsTopicOpen] = useState(false);
  const [isExitConfirmOpen, setIsExitConfirmOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const canSubmit = useMemo(
    () => Boolean(category && topic && title.trim() && content.trim()),
    [category, topic, title, content]
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
      file,
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

  const handleSubmit = async () => {
    if (!canSubmit || isSubmitting) return;

    if (isEditMode) {
      toast('게시글을 수정했어요', {
        position: 'bottom-center',
        duration: 3000,
      });
      navigate(`/index/community/${postId}`, { replace: true });
      return;
    }

    const type = COMMUNITY_TYPE_TO_API[category];
    const topicValue = COMMUNITY_TOPIC_TO_API[topic];
    if (!type || !topicValue) return;

    setIsSubmitting(true);

    try {
      const imageFiles = images
        .map((image) => image.file)
        .filter((file) => file instanceof File);
      const imageUrls = await uploadPostImages(imageFiles);

      const data = await createCommunityPost({
        type,
        topic: topicValue,
        title: title.trim(),
        content: content.trim(),
        imageUrls,
      });

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

      navigate(`/index/community/${data.postId}`, { replace: true });
    } catch (error) {
      console.error('게시글 등록 실패', {
        status: error?.response?.status,
        data: error?.response?.data,
      });
      const errorClass = error?.response?.data?.data?.errorClassName;
      const message = error?.response?.data?.data?.message;

      if (errorClass === 'VALIDATION_ERROR') {
        toast(message || '제목과 내용을 확인해 주세요.', {
          position: 'bottom-center',
        });
      } else if (errorClass === 'EXCEEDED_MAX_IMAGE_COUNT') {
        toast('이미지는 최대 10장까지만 첨부할 수 있습니다.', {
          position: 'bottom-center',
        });
      } else if (errorClass === 'FAIL_IMAGE_UPLOAD') {
        toast('이미지 업로드에 실패하였습니다.', {
          position: 'bottom-center',
        });
      } else {
        toast(
          message ||
            '게시글 등록에 실패했습니다. 잠시 후 다시 시도해 주세요. (서버 오류)',
          {
            position: 'bottom-center',
          }
        );
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative flex h-full min-h-0 flex-col overflow-hidden bg-white">
      <header className="relative flex h-[48px] items-center justify-between border-b border-[#E0E0E0] px-4">
        <button onClick={() => setIsExitConfirmOpen(true)}>
          <img src={xIconBlack} alt="닫기" className="h-[20px] w-[20px]" />
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
          disabled={!canSubmit || isSubmitting}
          className={`h-10 w-full rounded-[8px] text-[14px] font-medium text-white ${canSubmit && !isSubmitting ? 'bg-[#2DA969]' : 'bg-[#DCDCDC]'}`}
        >
          {isSubmitting ? '등록 중...' : '작성 완료'}
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

      {isExitConfirmOpen && (
        <div className="absolute inset-0 z-50 flex items-center justify-center">
          <button
            className="absolute inset-0 bg-black/50"
            onClick={() => setIsExitConfirmOpen(false)}
            aria-label="수정중단 닫기"
          />
          <div className="relative mx-6 w-full max-w-[320px] rounded-[14px] bg-white px-5 py-5 text-center">
            <h2 className="text-[20px] font-semibold text-[#1E1E1E]">
              {isEditMode
                ? '게시글 수정을 그만할까요?'
                : '게시글 작성을 그만할까요?'}
            </h2>
            <p className="mt-3 text-[14px] leading-5 text-[#8A8A8A]">
              변경된 내용은 저장되지 않아요.
            </p>
            <div className="mt-5 flex gap-2">
              <button
                className="flex-1 rounded-[999px] border border-[#E3E3E3] py-2 text-[15px] text-[#8A8A8A]"
                onClick={() => setIsExitConfirmOpen(false)}
              >
                취소
              </button>
              <button
                className="flex-1 rounded-[999px] bg-[#FF2B2B] py-2 text-[15px] font-medium text-white"
                onClick={() => navigate('/index/community', { replace: true })}
              >
                나가기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
