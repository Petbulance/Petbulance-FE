import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';

import {
  createContentReport,
  createPostComment,
  deletePostComment,
  deleteCommunityPosts,
  fetchCommunityPostDetail,
  fetchPostComments,
  updatePostComment,
  uploadCommentImages,
} from '@/apis/community/posts';
import cameraIcon from '@/assets/images/icons/camera_icon.svg';
import defaultProfile from '@/assets/images/icons/defaultImg.svg';
import eye from '@/assets/images/icons/eye_icon.svg';
import leftArrow from '@/assets/images/icons/left_arrow.svg';
import message from '@/assets/images/icons/message.svg';
import seeMore from '@/assets/images/icons/see_more.svg';
import shareIcon from '@/assets/images/icons/share_icon.svg';
import thumbs from '@/assets/images/icons/thumbs.svg';
import xIcon from '@/assets/images/icons/x_icon.svg';

function CommentText({ text }) {
  const tokens = String(text || '').split(/(@[^\s]+)/g);

  return (
    <p className="mt-1 text-[14px] leading-5 text-[#1E1E1E]">
      {tokens.map((token, index) =>
        token.startsWith('@') ? (
          <span
            key={`${token}-${index}`}
            className="font-medium text-[#27BE69]"
          >
            {token}
          </span>
        ) : (
          <span key={`${token}-${index}`}>{token}</span>
        )
      )}
    </p>
  );
}

function CommentItem({ comment, onReply, onMore }) {
  const depth = comment.depth ?? 0;
  const isReply = depth > 0;

  return (
    <article
      className="border-b border-[#F0F0F0] px-4 py-3"
      style={{ paddingLeft: `${16 + depth * 18}px` }}
    >
      <div className="flex gap-2.5">
        <img
          src={comment.profileUrl || defaultProfile}
          alt="프로필"
          className="mt-0.5 h-6 w-6 shrink-0 rounded-full"
        />
        <div
          className={`min-w-0 flex-1 ${isReply ? 'border-l border-[#DDEEDF] pl-3' : ''}`}
        >
          <div className="flex items-center justify-between">
            <p className="text-[12px] text-[#9E9E9E]">
              <span className="font-medium text-[#424242]">
                {comment.nickname}
              </span>{' '}
              {comment.time}
            </p>
            <button
              className="text-[14px] leading-none text-[#B8B8B8]"
              onClick={() => onMore(comment)}
            >
              ⋮
            </button>
          </div>
          <CommentText text={comment.text} />
          {comment.image && (
            <img
              src={comment.image}
              alt="댓글 첨부"
              className="mt-2 h-[84px] w-[84px] rounded-md object-cover"
            />
          )}
          <button
            className="mt-2 rounded border border-[#D7D7D7] px-2 py-0.5 text-[11px] text-[#767676]"
            onClick={() => onReply(comment)}
          >
            답글
          </button>
        </div>
      </div>
    </article>
  );
}

const normalizeComment = (comment = {}) => {
  const commentId = comment.commentId ?? comment.id;
  const parentId = comment.parentId ?? null;
  const writerNickname = comment.writerNickname || comment.nickname || '익명';
  const rawIsMine = comment.isCommentAuthor;
  const isMineByFlag =
    rawIsMine === true || rawIsMine === 'true' || rawIsMine === 1;

  return {
    id: commentId,
    parentId,
    nickname: writerNickname,
    profileUrl: comment.writerProfileUrl || comment.profileUrl || null,
    time: comment.createdAt || '',
    text: comment.content || '',
    image: comment.imageUrl || null,
    isSecret: Boolean(comment.secret ?? comment.isSecret),
    isMine: isMineByFlag,
    depth:
      typeof comment.depth === 'number'
        ? comment.depth
        : parentId && parentId !== commentId
          ? 1
          : 0,
  };
};

const isBlobUrl = (value) =>
  typeof value === 'string' && value.startsWith('blob:');

export default function CommunityDetail() {
  const navigate = useNavigate();
  const { postId } = useParams();

  const fileInputRef = useRef(null);

  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingComments, setIsLoadingComments] = useState(false);
  const [detailError, setDetailError] = useState('');

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [isReportReasonOpen, setIsReportReasonOpen] = useState(false);
  const [selectedReportReason, setSelectedReportReason] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [selectedComment, setSelectedComment] = useState(null);
  const [isCommentMenuOpen, setIsCommentMenuOpen] = useState(false);
  const [isCommentDeleteConfirmOpen, setIsCommentDeleteConfirmOpen] =
    useState(false);
  const [isDeletingComment, setIsDeletingComment] = useState(false);
  const [isCommentReportOpen, setIsCommentReportOpen] = useState(false);
  const [selectedCommentReportReason, setSelectedCommentReportReason] =
    useState('');
  const [isSubmittingPostReport, setIsSubmittingPostReport] = useState(false);
  const [isSubmittingCommentReport, setIsSubmittingCommentReport] =
    useState(false);

  const [commentInput, setCommentInput] = useState('');
  const [isSecretComment, setIsSecretComment] = useState(false);
  const [replyTarget, setReplyTarget] = useState(null);
  const [commentImageFile, setCommentImageFile] = useState(null);
  const [commentImagePreview, setCommentImagePreview] = useState('');
  const [isSubmittingComment, setIsSubmittingComment] = useState(false);
  const [editingComment, setEditingComment] = useState(null);

  const reportReasons = [
    '욕설/비방/선정적',
    '도배/광고',
    '허위/가짜 정보',
    '저작권 침해',
    '개인정보 노출',
    '사기/금융 범죄',
    '기타',
  ];

  const loadComments = async (targetPostId) => {
    setIsLoadingComments(true);
    try {
      const list = await fetchPostComments(targetPostId);
      setComments((Array.isArray(list) ? list : []).map(normalizeComment));
    } catch (error) {
      console.error('댓글 조회 실패', error);
      setComments([]);
    } finally {
      setIsLoadingComments(false);
    }
  };

  useEffect(() => {
    let mounted = true;

    const loadDetail = async () => {
      setIsLoading(true);
      setDetailError('');

      try {
        const data = await fetchCommunityPostDetail(postId);
        if (!mounted) return;
        setPost(data);
      } catch (error) {
        if (!mounted) return;
        const errorClass = error?.response?.data?.data?.errorClassName;
        const message = error?.response?.data?.data?.message;

        if (errorClass === 'POST_NOT_FOUND') {
          setDetailError('요청하신 게시글을 찾을 수 없습니다.');
        } else if (errorClass === 'POST_HIDDEN') {
          setDetailError('숨겨진 게시글입니다.');
        } else if (errorClass === 'POST_DELETED') {
          setDetailError('삭제된 게시글입니다.');
        } else {
          setDetailError(
            message ||
              '게시글을 불러오지 못했습니다. 잠시 후 다시 시도해 주세요.'
          );
        }
      } finally {
        if (mounted) setIsLoading(false);
      }
    };

    loadDetail();

    return () => {
      mounted = false;
    };
  }, [postId]);

  useEffect(() => {
    if (!post?.postId) return;
    loadComments(post.postId);
  }, [post?.postId]);

  useEffect(() => {
    return () => {
      if (isBlobUrl(commentImagePreview)) {
        URL.revokeObjectURL(commentImagePreview);
      }
    };
  }, [commentImagePreview]);

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center bg-white text-sm text-[#757575]">
        게시글을 불러오는 중이에요.
      </div>
    );
  }

  if (!post || detailError) {
    return (
      <div className="flex h-full items-center justify-center bg-white text-sm text-[#757575]">
        {detailError || '게시글을 찾을 수 없습니다.'}
      </div>
    );
  }

  const isMyPost = Boolean(post.isCurrentUserPost);
  const postImages = Array.isArray(post.images)
    ? [...post.images].sort((a, b) => (a.imageOrder ?? 0) - (b.imageOrder ?? 0))
    : [];
  const writerProfileSrc = post.writerProfileUrl
    ? /^https?:\/\//i.test(post.writerProfileUrl)
      ? post.writerProfileUrl
      : `/${String(post.writerProfileUrl).replace(/^\/+/, '')}`
    : defaultProfile;
  const commentCount =
    comments.length > 0 ? comments.length : (post.commentCount ?? 0);

  const handleDeleteClick = () => {
    setIsMenuOpen(false);
    setIsDeleteConfirmOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (isDeleting) return;
    setIsDeleting(true);

    try {
      await deleteCommunityPosts([post.postId]);
      setIsDeleteConfirmOpen(false);
      navigate('/index/community', { replace: true });
      toast('게시글을 삭제했어요', {
        position: 'bottom-center',
        duration: 3000,
      });
    } catch (error) {
      const errorClass = error?.response?.data?.data?.errorClassName;
      const message = error?.response?.data?.data?.message;

      if (errorClass === 'FORBIDDEN_POST_ACCESS') {
        toast('본인이 작성한 글이 아니거나 관리자 권한이 없습니다.', {
          position: 'bottom-center',
        });
      } else if (errorClass === 'POST_NOT_FOUND') {
        toast('요청하신 게시글을 찾을 수 없습니다.', {
          position: 'bottom-center',
        });
      } else {
        toast(message || '게시글 삭제에 실패했습니다.', {
          position: 'bottom-center',
        });
      }
    } finally {
      setIsDeleting(false);
    }
  };

  const handleSubmitReport = async () => {
    if (!selectedReportReason) {
      toast('신고 사유를 선택해주세요', { position: 'bottom-center' });
      return;
    }

    if (isSubmittingPostReport) {
      return;
    }

    setIsSubmittingPostReport(true);
    try {
      await createContentReport({
        reportType: 'POST',
        reportReason: selectedReportReason,
        postId: post.postId,
        commentId: null,
        reviewId: null,
      });

      setIsReportReasonOpen(false);
      setIsMenuOpen(false);
      setSelectedReportReason('');
      toast('신고가 정상적으로 접수되었습니다.', {
        position: 'bottom-center',
      });
    } catch (error) {
      const errorClass = error?.response?.data?.data?.errorClassName;
      const message = error?.response?.data?.data?.message;

      if (errorClass === 'POST_NOT_FOUND') {
        toast('요청하신 게시글을 찾을 수 없습니다.', {
          position: 'bottom-center',
        });
      } else if (errorClass === 'ALREADY_REPORTED') {
        toast('이미 접수된 신고입니다.', { position: 'bottom-center' });
      } else if (errorClass === 'ALREADY_COMPLETED') {
        toast('이미 처리 완료된 신고입니다.', { position: 'bottom-center' });
      } else {
        toast(message || '신고 접수에 실패했습니다.', {
          position: 'bottom-center',
        });
      }
    } finally {
      setIsSubmittingPostReport(false);
    }
  };

  const handlePickCommentImage = () => {
    fileInputRef.current?.click();
  };

  const openCommentMenu = (comment) => {
    setSelectedComment(comment);
    setIsCommentMenuOpen(true);
  };

  const handleCommentImageChange = (e) => {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;

    if (!file.type?.startsWith('image/')) {
      toast('이미지 파일만 첨부할 수 있어요.', { position: 'bottom-center' });
      return;
    }

    if (isBlobUrl(commentImagePreview)) {
      URL.revokeObjectURL(commentImagePreview);
    }
    setCommentImageFile(file);
    setCommentImagePreview(URL.createObjectURL(file));
  };

  const clearCommentInput = () => {
    setCommentInput('');
    setReplyTarget(null);
    setIsSecretComment(false);
    setCommentImageFile(null);
    setEditingComment(null);
    if (isBlobUrl(commentImagePreview)) {
      URL.revokeObjectURL(commentImagePreview);
    }
    setCommentImagePreview('');
  };

  const handleReplyClick = (targetComment) => {
    clearCommentInput();
    setReplyTarget(targetComment);
  };

  const handleSubmitComment = async () => {
    const content = commentInput.trim();
    if (!content || isSubmittingComment) return;

    setIsSubmittingComment(true);
    try {
      let imageUrl = commentImagePreview || null;
      if (commentImageFile) {
        const uploadedUrls = await uploadCommentImages([commentImageFile]);
        imageUrl = uploadedUrls[0] ?? null;
      }

      if (editingComment?.id) {
        await updatePostComment(editingComment.id, {
          content,
          imageUrl: imageUrl,
          isSecret: isSecretComment,
        });
      } else {
        const payload = {
          content,
          parentId: replyTarget?.id ?? null,
          mentionUserNickname: replyTarget?.nickname ?? null,
          imageUrl,
          isSecret: isSecretComment,
        };

        await createPostComment(post.postId, payload);
      }

      clearCommentInput();
      await loadComments(post.postId);
      toast(editingComment?.id ? '댓글을 수정했어요.' : '댓글을 등록했어요.', {
        position: 'bottom-center',
      });
    } catch (error) {
      const errorClass = error?.response?.data?.data?.errorClassName;
      const message = error?.response?.data?.data?.message;

      if (errorClass === 'EMPTY_COMMENT_CONTENT') {
        toast('댓글 내용을 입력해주세요.', { position: 'bottom-center' });
      } else if (errorClass === 'INVALID_PARENT_COMMENT') {
        toast('상위 댓글 정보를 찾을 수 없습니다.', {
          position: 'bottom-center',
        });
      } else if (errorClass === 'INVALID_MENTION_USER') {
        toast('멘션된 사용자 정보를 찾을 수 없습니다.', {
          position: 'bottom-center',
        });
      } else if (errorClass === 'INVALID_INPUT_RELATION') {
        toast('입력 관계가 잘못되었습니다.', { position: 'bottom-center' });
      } else if (errorClass === 'POST_NOT_FOUND') {
        toast('요청하신 게시글을 찾을 수 없습니다.', {
          position: 'bottom-center',
        });
      } else if (errorClass === 'COMMENT_NOT_FOUND') {
        toast('요청하신 댓글을 찾을 수 없습니다.', {
          position: 'bottom-center',
        });
      } else if (errorClass === 'FORBIDDEN_COMMENT_ACCESS') {
        toast('댓글에 대한 권한이 존재하지 않습니다.', {
          position: 'bottom-center',
        });
      } else {
        toast(
          message ||
            (editingComment?.id
              ? '댓글 수정에 실패했습니다.'
              : '댓글 등록에 실패했습니다.'),
          {
            position: 'bottom-center',
          }
        );
      }
    } finally {
      setIsSubmittingComment(false);
    }
  };

  const startEditComment = (comment) => {
    if (!comment?.id) return;

    if (isBlobUrl(commentImagePreview)) {
      URL.revokeObjectURL(commentImagePreview);
    }

    setIsCommentMenuOpen(false);
    setSelectedComment(null);
    setReplyTarget(null);
    setEditingComment(comment);
    setCommentInput(comment.text || '');
    setIsSecretComment(Boolean(comment.isSecret));
    setCommentImageFile(null);
    setCommentImagePreview(comment.image || '');
  };

  const handleDeleteComment = async () => {
    if (!selectedComment?.id || isDeletingComment) return;

    const deletedComment = selectedComment;
    setIsDeletingComment(true);
    try {
      await deletePostComment(deletedComment.id);
      setIsCommentDeleteConfirmOpen(false);
      setIsCommentMenuOpen(false);
      setSelectedComment(null);
      await loadComments(post.postId);
      toast('댓글을 삭제했어요', {
        position: 'bottom-center',
        duration: 4000,
        style: {
          width: '100%',
          height: '44px',
          display: 'flex',
          alignItems: 'center',
          background: '#222222E5',
          color: '#ffffff',
        },
        action: {
          label: '취소',
          onClick: async () => {
            try {
              const basePayload = {
                content: deletedComment.text || '',
                imageUrl: deletedComment.image ?? null,
                isSecret: false,
              };

              try {
                await createPostComment(post.postId, {
                  ...basePayload,
                  parentId: deletedComment.parentId ?? null,
                  mentionUserNickname: null,
                });
              } catch (firstRestoreError) {
                const firstErrorClass =
                  firstRestoreError?.response?.data?.data?.errorClassName;

                if (firstErrorClass !== 'INVALID_INPUT_RELATION') {
                  throw firstRestoreError;
                }

                // 답글 관계 복구가 불가능한 경우 일반 댓글로 복구
                await createPostComment(post.postId, {
                  ...basePayload,
                  parentId: null,
                  mentionUserNickname: null,
                });
              }
              await loadComments(post.postId);
              toast('댓글을 복구했어요.', {
                position: 'bottom-center',
              });
            } catch (restoreError) {
              const restoreMessage =
                restoreError?.response?.data?.data?.message ||
                '댓글 복구에 실패했습니다.';
              toast(restoreMessage, { position: 'bottom-center' });
            }
          },
        },
        actionButtonStyle: {
          background: 'transparent',
          border: 'none',
          color: '#ffffff',
          padding: 0,
          cursor: 'pointer',
        },
      });
    } catch (error) {
      const errorClass = error?.response?.data?.data?.errorClassName;
      const message = error?.response?.data?.data?.message;

      if (errorClass === 'COMMENT_NOT_FOUND') {
        toast('요청하신 댓글을 찾을 수 없습니다.', {
          position: 'bottom-center',
        });
      } else if (errorClass === 'FORBIDDEN_COMMENT_ACCESS') {
        toast('댓글에 대한 권한이 존재하지 않습니다.', {
          position: 'bottom-center',
        });
      } else {
        toast(message || '댓글 삭제에 실패했습니다.', {
          position: 'bottom-center',
        });
      }
    } finally {
      setIsDeletingComment(false);
    }
  };

  const handleSubmitCommentReport = async () => {
    if (!selectedCommentReportReason) {
      toast('신고 사유를 선택해주세요', {
        position: 'bottom-center',
      });
      return;
    }

    if (!selectedComment?.id || isSubmittingCommentReport) return;

    setIsSubmittingCommentReport(true);
    try {
      await createContentReport({
        reportType: 'COMMENT',
        reportReason: selectedCommentReportReason,
        postId: null,
        commentId: selectedComment.id,
        reviewId: null,
      });

      setIsCommentReportOpen(false);
      setSelectedCommentReportReason('');
      setSelectedComment(null);
      toast('신고가 정상적으로 접수되었습니다.', {
        position: 'bottom-center',
      });
    } catch (error) {
      const errorClass = error?.response?.data?.data?.errorClassName;
      const message = error?.response?.data?.data?.message;

      if (errorClass === 'COMMENT_NOT_FOUND') {
        toast('요청하신 댓글을 찾을 수 없습니다.', {
          position: 'bottom-center',
        });
      } else if (errorClass === 'ALREADY_REPORTED') {
        toast('이미 접수된 신고입니다.', { position: 'bottom-center' });
      } else if (errorClass === 'ALREADY_COMPLETED') {
        toast('이미 처리 완료된 신고입니다.', { position: 'bottom-center' });
      } else {
        toast(message || '신고 접수에 실패했습니다.', {
          position: 'bottom-center',
        });
      }
    } finally {
      setIsSubmittingCommentReport(false);
    }
  };
  return (
    <div className="relative flex h-full min-h-0 flex-col overflow-hidden bg-[#F2F4F6]">
      <header className="sticky top-0 z-10 flex h-[48px] items-center justify-between border-b border-[#E0E0E0] bg-white px-5">
        <button onClick={() => navigate(-1)}>
          <img src={leftArrow} alt="뒤로가기" />
        </button>
        <div className="flex items-center gap-4">
          <button>
            <img src={shareIcon} alt="공유" />
          </button>
          <button onClick={() => setIsMenuOpen(true)}>
            <img src={seeMore} alt="더보기" />
          </button>
        </div>
      </header>

      <div className="min-h-0 flex-1 overflow-y-auto">
        <section className="bg-white px-5 pt-4 pb-5">
          <div className="mb-3 flex items-center gap-1 text-[12px]">
            <span className="rounded-full bg-[#F1E89A] px-2 py-1 text-[#424242]">
              {post.type}
            </span>
            <span className="rounded-full bg-[#F2F2F2] px-2 py-1 text-[#9E9E9E]">
              {post.topic}
            </span>
          </div>

          <div className="mb-3 flex items-center gap-2">
            <img
              src={writerProfileSrc}
              alt="프로필"
              className="h-8 w-8 rounded-full"
            />
            <div>
              <p className="text-[14px] font-medium text-[#424242]">
                {post.writerNickname}
              </p>
              <p className="text-[12px] text-[#9E9E9E]">{post.createdAt}</p>
            </div>
          </div>

          <h1 className="mb-3 text-[26px] font-semibold text-[#1E1E1E]">
            {post.title}
          </h1>
          <p className="text-[16px] leading-7 text-[#424242]">{post.content}</p>

          {postImages.length > 0 && (
            <div className="mt-4 space-y-2">
              {postImages.map((image) => (
                <img
                  key={image.imageId}
                  src={image.imageUrl}
                  alt="게시글 첨부"
                  className="w-full rounded"
                />
              ))}
            </div>
          )}

          <div className="mt-4 flex items-center gap-3 text-[15px] text-[#9E9E9E]">
            <p className="flex items-center gap-1">
              <img src={thumbs} alt="좋아요" /> {post.likeCount}
            </p>
            <p className="flex items-center gap-1">
              <img src={eye} alt="조회수" /> {post.viewCount}
            </p>
            <p className="flex items-center gap-1">
              <img src={message} alt="댓글" /> {commentCount}
            </p>
          </div>
        </section>

        <section className="mt-2 bg-white">
          <div className="border-b border-[#EFEFEF] px-4 py-3">
            <input
              value={commentInput}
              onChange={(e) => setCommentInput(e.target.value)}
              placeholder={
                editingComment
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
                <button
                  onClick={() => {
                    if (isBlobUrl(commentImagePreview))
                      URL.revokeObjectURL(commentImagePreview);
                    setCommentImagePreview('');
                    setCommentImageFile(null);
                  }}
                >
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
              >
                🔒
              </button>
              <button>
                <span className="text-[13px]">@</span>
              </button>
              <button onClick={handlePickCommentImage}>
                <img
                  src={cameraIcon}
                  alt="사진"
                  className="h-3.5 w-3.5 opacity-60"
                />
              </button>
              {replyTarget && (
                <button
                  className="text-[11px] text-[#27BE69]"
                  onClick={() => setReplyTarget(null)}
                >
                  답글취소
                </button>
              )}
              {editingComment && (
                <button
                  className="text-[11px] text-[#27BE69]"
                  onClick={clearCommentInput}
                >
                  수정취소
                </button>
              )}
            </div>
            <button
              className="rounded bg-[#EFEFEF] px-3 py-1 text-[12px] text-[#8F8F8F] disabled:opacity-60"
              disabled={!commentInput.trim() || isSubmittingComment}
              onClick={handleSubmitComment}
            >
              {isSubmittingComment
                ? editingComment
                  ? '수정중'
                  : '등록중'
                : editingComment
                  ? '수정'
                  : '등록'}
            </button>
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleCommentImageChange}
          />

          <div className="border-b border-[#EFEFEF] px-4 py-2 text-[13px] text-[#616161]">
            댓글 {commentCount}
          </div>

          {isLoadingComments ? (
            <div className="px-4 py-5 text-[13px] text-[#B0B0B0]">
              댓글을 불러오는 중...
            </div>
          ) : comments.length > 0 ? (
            <div>
              {comments.map((comment) => (
                <CommentItem
                  key={comment.id}
                  comment={comment}
                  onReply={handleReplyClick}
                  onMore={openCommentMenu}
                />
              ))}
            </div>
          ) : (
            <div className="px-4 py-5 text-[13px] text-[#B0B0B0]">
              작성된 댓글이 없습니다.
            </div>
          )}
        </section>
      </div>

      {isCommentMenuOpen && selectedComment && (
        <div className="absolute inset-0 z-[80]">
          <button
            className="absolute inset-0 bg-black/50"
            onClick={() => {
              setIsCommentMenuOpen(false);
              setSelectedComment(null);
            }}
            aria-label="댓글 메뉴 닫기"
          />
          {selectedComment.isMine ? (
            <div className="absolute right-0 bottom-0 left-0 px-3 pb-[calc(12px+env(safe-area-inset-bottom))]">
              <div className="overflow-hidden rounded-[10px] bg-white">
                <button
                  className="w-full border-b border-[#EDEDED] py-3 text-[18px] font-medium text-[#F04438]"
                  onClick={() => {
                    setIsCommentMenuOpen(false);
                    setIsCommentDeleteConfirmOpen(true);
                  }}
                >
                  댓글 삭제
                </button>
                <button
                  className="w-full py-3 text-[18px] text-[#1E1E1E]"
                  onClick={() => startEditComment(selectedComment)}
                >
                  댓글 수정
                </button>
              </div>
              <button
                className="mt-3 w-full rounded-[10px] bg-white py-3 text-[18px] text-[#1E1E1E]"
                onClick={() => {
                  setIsCommentMenuOpen(false);
                  setSelectedComment(null);
                }}
              >
                취소
              </button>
            </div>
          ) : (
            <div className="absolute top-1/2 left-1/2 w-[168px] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-[10px] bg-white">
              <p className="border-b border-[#EFEFEF] px-4 py-2.5 text-[15px] font-medium text-[#1E1E1E]">
                신고하기
              </p>
              <button
                className="flex w-full items-center gap-2 px-4 py-3 text-[13px] text-[#616161]"
                onClick={() => {
                  setIsCommentMenuOpen(false);
                  setIsCommentReportOpen(true);
                }}
              >
                <span className="text-[12px]">⚑</span>
                댓글 신고
              </button>
            </div>
          )}
        </div>
      )}

      {isCommentDeleteConfirmOpen && (
        <div className="absolute inset-0 z-[90] flex items-center justify-center">
          <button
            className="absolute inset-0 bg-black/50"
            onClick={() => setIsCommentDeleteConfirmOpen(false)}
            aria-label="댓글 삭제 확인 닫기"
          />
          <div className="relative mx-6 w-full max-w-[320px] rounded-[14px] bg-white px-5 py-5 text-center">
            <h2 className="text-[20px] font-semibold text-[#1E1E1E]">
              댓글을 삭제할까요?
            </h2>
            <p className="mt-3 text-[14px] leading-5 text-[#8A8A8A]">
              삭제 후 하단 알림에서 취소를 누르면 복구할 수 있어요.
            </p>
            <div className="mt-5 flex gap-2">
              <button
                className="flex-1 rounded-[999px] border border-[#E3E3E3] py-2 text-[15px] text-[#8A8A8A]"
                onClick={() => setIsCommentDeleteConfirmOpen(false)}
              >
                취소
              </button>
              <button
                className="flex-1 rounded-[999px] bg-[#FF2B2B] py-2 text-[15px] font-medium text-white"
                disabled={isDeletingComment}
                onClick={handleDeleteComment}
              >
                {isDeletingComment ? '삭제 중...' : '삭제'}
              </button>
            </div>
          </div>
        </div>
      )}

      {isCommentReportOpen && (
        <div className="absolute inset-0 z-[95] flex items-center justify-center">
          <button
            className="absolute inset-0 bg-black/50"
            onClick={() => {
              setIsCommentReportOpen(false);
              setSelectedCommentReportReason('');
            }}
            aria-label="댓글 신고 닫기"
          />
          <div className="relative mx-6 w-full max-w-[320px] rounded-[12px] bg-white p-4">
            <h3 className="mb-3 text-[14px] font-medium text-[#1E1E1E]">
              댓글 신고 이유를 알려주세요.
            </h3>
            <div className="space-y-1.5">
              {reportReasons.map((reason) => (
                <label
                  key={reason}
                  className="flex cursor-pointer items-center gap-2 text-[12px] text-[#424242]"
                >
                  <input
                    type="radio"
                    name="commentReportReason"
                    checked={selectedCommentReportReason === reason}
                    onChange={() => setSelectedCommentReportReason(reason)}
                    className="h-3.5 w-3.5 accent-[#27BE69]"
                  />
                  {reason}
                </label>
              ))}
            </div>
            <div className="mt-4 flex gap-2">
              <button
                className="flex-1 rounded-[6px] border border-[#E0E0E0] py-2 text-[13px] text-[#757575]"
                onClick={() => {
                  setIsCommentReportOpen(false);
                  setSelectedCommentReportReason('');
                }}
              >
                취소
              </button>
              <button
                className="flex-1 rounded-[6px] bg-[#27BE69] py-2 text-[13px] text-white"
                disabled={isSubmittingCommentReport}
                onClick={handleSubmitCommentReport}
              >
                {isSubmittingCommentReport ? '제출 중...' : '제출'}
              </button>
            </div>
          </div>
        </div>
      )}

      {isMenuOpen && (
        <div className="absolute inset-0 z-50">
          <button
            className="absolute inset-0 bg-black/50"
            onClick={() => setIsMenuOpen(false)}
            aria-label="메뉴 닫기"
          />
          {isMyPost ? (
            <div className="absolute right-0 bottom-0 left-0 px-3 pb-[calc(12px+env(safe-area-inset-bottom))]">
              <div className="overflow-hidden rounded-[10px] bg-white">
                <button
                  className="w-full border-b border-[#EDEDED] py-3 text-[18px] font-medium text-[#F04438]"
                  onClick={handleDeleteClick}
                >
                  게시글 삭제
                </button>
                <button
                  className="w-full py-3 text-[18px] text-[#1E1E1E]"
                  onClick={() => {
                    setIsMenuOpen(false);
                    navigate(`/index/community/${post.postId}/edit`);
                  }}
                >
                  수정
                </button>
              </div>
              <button
                className="mt-3 w-full rounded-[10px] bg-white py-3 text-[18px] text-[#1E1E1E]"
                onClick={() => setIsMenuOpen(false)}
              >
                취소
              </button>
            </div>
          ) : (
            <div className="absolute top-1/2 left-1/2 w-[168px] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-[10px] bg-white">
              <p className="border-b border-[#EFEFEF] px-4 py-2.5 text-[15px] font-medium text-[#1E1E1E]">
                신고하기
              </p>
              <button
                className="flex w-full items-center gap-2 px-4 py-3 text-[13px] text-[#616161]"
                onClick={() => setIsReportReasonOpen(true)}
              >
                <span className="text-[12px]">⚑</span>
                게시글 신고
              </button>
            </div>
          )}
        </div>
      )}

      {isDeleteConfirmOpen && (
        <div className="absolute inset-0 z-[60] flex items-center justify-center">
          <button
            className="absolute inset-0 bg-black/50"
            onClick={() => setIsDeleteConfirmOpen(false)}
            aria-label="삭제 확인 닫기"
          />
          <div className="relative mx-6 w-full max-w-[320px] rounded-[14px] bg-white px-5 py-5 text-center">
            <h2 className="text-[20px] font-semibold text-[#1E1E1E]">
              게시글을 삭제할까요?
            </h2>
            <p className="mt-3 text-[14px] leading-5 text-[#8A8A8A]">
              게시글을 삭제하면 모든 데이터가 삭제되고 다시 볼 수 없어요.
            </p>
            <div className="mt-5 flex gap-2">
              <button
                className="flex-1 rounded-[999px] border border-[#E3E3E3] py-2 text-[15px] text-[#8A8A8A]"
                onClick={() => setIsDeleteConfirmOpen(false)}
              >
                취소
              </button>
              <button
                className="flex-1 rounded-[999px] bg-[#FF2B2B] py-2 text-[15px] font-medium text-white"
                disabled={isDeleting}
                onClick={handleDeleteConfirm}
              >
                {isDeleting ? '삭제 중...' : '삭제'}
              </button>
            </div>
          </div>
        </div>
      )}

      {isReportReasonOpen && (
        <div className="absolute inset-0 z-[70] flex items-center justify-center">
          <button
            className="absolute inset-0 bg-black/50"
            onClick={() => {
              setIsReportReasonOpen(false);
              setIsMenuOpen(false);
            }}
            aria-label="신고 사유 닫기"
          />
          <div className="relative mx-6 w-full max-w-[320px] rounded-[12px] bg-white p-4">
            <h3 className="mb-3 text-[14px] font-medium text-[#1E1E1E]">
              게시글 신고 이유를 알려주세요.
            </h3>
            <div className="space-y-1.5">
              {reportReasons.map((reason) => (
                <label
                  key={reason}
                  className="flex cursor-pointer items-center gap-2 text-[12px] text-[#424242]"
                >
                  <input
                    type="radio"
                    name="reportReason"
                    checked={selectedReportReason === reason}
                    onChange={() => setSelectedReportReason(reason)}
                    className="h-3.5 w-3.5 accent-[#27BE69]"
                  />
                  {reason}
                </label>
              ))}
            </div>
            <div className="mt-4 flex gap-2">
              <button
                className="flex-1 rounded-[6px] border border-[#E0E0E0] py-2 text-[13px] text-[#757575]"
                onClick={() => {
                  setIsReportReasonOpen(false);
                  setIsMenuOpen(false);
                }}
              >
                취소
              </button>
              <button
                className="flex-1 rounded-[6px] bg-[#27BE69] py-2 text-[13px] text-white"
                disabled={isSubmittingPostReport}
                onClick={handleSubmitReport}
              >
                {isSubmittingPostReport ? '제출 중...' : '제출'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
