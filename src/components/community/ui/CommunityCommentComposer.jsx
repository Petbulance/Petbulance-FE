import { AtSign, Camera, Lock, LockOpen } from 'lucide-react';
import { useRef } from 'react';

import { toast } from 'sonner';
import xIcon from '@/assets/images/icons/x_icon.svg';

const isBlobUrl = (value) =>
  typeof value === 'string' && value.startsWith('blob:');

export function CommunityCommentComposer({
  commentInput,
  setCommentInput,
  isSecretComment,
  setIsSecretComment,
  replyTarget,
  setReplyTarget,
  commentImagePreview,
  setCommentImagePreview,
  setCommentImageFile,
  isSubmittingComment,
  isEditingComment,
  onCancelEdit,
  onSubmit,
}) {
  const commentInputRef = useRef(null);

  const handleInsertMention = () => {
    const input = commentInputRef.current;
    const mentionText = replyTarget?.nickname
      ? `@${replyTarget.nickname} `
      : '@';

    if (!input) {
      setCommentInput((prev) => `${prev}${mentionText}`);
      return;
    }

    const start = input.selectionStart ?? commentInput.length;
    const end = input.selectionEnd ?? start;
    const nextValue =
      commentInput.slice(0, start) + mentionText + commentInput.slice(end);

    setCommentInput(nextValue);

    requestAnimationFrame(() => {
      input.focus();
      const nextCaret = start + mentionText.length;
      input.setSelectionRange(nextCaret, nextCaret);
    });
  };

  const handleCommentImageChange = (e) => {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;

    const allowedTypes = [
      'image/jpeg',
      'image/png',
      'image/webp',
      'image/heic',
      'image/gif',
    ];

    if (!allowedTypes.includes(file.type)) {
      toast('지원하지 않는 이미지 형식입니다.', { position: 'bottom-center' });
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      toast('이미지 크기는 10MB 이하로 업로드 해주세요.', {
        position: 'bottom-center',
      });
      return;
    }

    if (isBlobUrl(commentImagePreview)) {
      URL.revokeObjectURL(commentImagePreview);
    }

    setCommentImageFile(file);
    setCommentImagePreview(URL.createObjectURL(file));
  };

  const handleRemoveCommentImage = () => {
    if (isBlobUrl(commentImagePreview)) {
      URL.revokeObjectURL(commentImagePreview);
    }
    setCommentImagePreview('');
    setCommentImageFile(null);
  };

  return (
    <>
      {replyTarget && !isEditingComment && (
        <div className="flex items-center justify-between border-b border-[#D9D9D9] bg-[#F5F5F5] px-4 py-2">
          <p className="text-[13px] text-[#616161]">
            {replyTarget.nickname}님에게 답글을 남기는 중
          </p>
          <button
            type="button"
            className="text-[#9E9E9E]"
            onClick={() => setReplyTarget(null)}
            aria-label="답글 취소"
          >
            <img src={xIcon} alt="" className="h-3.5 w-3.5" />
          </button>
        </div>
      )}

      <div className="border-b border-[#EFEFEF] px-4 py-3">
        <input
          ref={commentInputRef}
          value={commentInput}
          onChange={(e) => setCommentInput(e.target.value)}
          placeholder={
            isEditingComment
              ? '댓글 수정하기'
              : replyTarget
                ? `@${replyTarget.nickname} 님에게 답글 남기기`
                : '댓글 남기기'
          }
          className="w-full text-[14px] text-[#424242] outline-none placeholder:text-[#B8B8B8]"
        />
        {commentImagePreview && (
          <div className="mt-2 inline-flex items-center gap-2 rounded border border-[#E5E5E5] px-2 py-1">
            <img
              src={commentImagePreview}
              alt="댓글 첨부"
              className="h-8 w-8 rounded object-cover"
            />
            <button onClick={handleRemoveCommentImage}>
              <img src={xIcon} alt="이미지 제거" className="h-3 w-3" />
            </button>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between border-b border-[#EFEFEF] px-4 py-2">
        <div className="flex items-center gap-3 text-[#A8A8A8]">
          <button
            className={`text-[13px] ${isSecretComment ? 'text-[#27BE69]' : ''}`}
            onClick={() => setIsSecretComment((prev) => !prev)}
            type="button"
          >
            {isSecretComment ? (
              <Lock size={16} strokeWidth={2} />
            ) : (
              <LockOpen size={16} strokeWidth={2} />
            )}
          </button>

          <label className="cursor-pointer">
            <Camera size={16} strokeWidth={2} />
            <input
              type="file"
              accept="image/*"
              className="sr-only"
              onChange={handleCommentImageChange}
            />
          </label>

          <button type="button" onClick={handleInsertMention}>
            <AtSign size={16} strokeWidth={2} />
          </button>

          {isEditingComment && (
            <button
              className="text-[11px] text-[#27BE69]"
              onClick={onCancelEdit}
            >
              수정취소
            </button>
          )}
        </div>

        <button
          className={`rounded-md px-3 py-1 text-[18px] disabled:opacity-60 ${
            !commentInput.trim() || isSubmittingComment
              ? 'bg-[#EFEFEF] text-[#8F8F8F]'
              : 'bg-[#2DA969] text-white'
          }`}
          disabled={!commentInput.trim() || isSubmittingComment}
          onClick={onSubmit}
        >
          {isSubmittingComment
            ? isEditingComment
              ? '수정중'
              : '등록중'
            : isEditingComment
              ? '수정'
              : '등록'}
        </button>
      </div>
    </>
  );
}
