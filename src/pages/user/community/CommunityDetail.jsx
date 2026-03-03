import { useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';

import cameraIcon from '@/assets/images/icons/camera_icon.svg';
import defaultProfile from '@/assets/images/icons/defaultImg.svg';
import eye from '@/assets/images/icons/eye_icon.svg';
import leftArrow from '@/assets/images/icons/left_arrow.svg';
import message from '@/assets/images/icons/message.svg';
import reviewImage from '@/assets/images/icons/review_img_ex.svg';
import seeMore from '@/assets/images/icons/see_more.svg';
import shareIcon from '@/assets/images/icons/share_icon.svg';
import thumbs from '@/assets/images/icons/thumbs.svg';
import xIcon from '@/assets/images/icons/x_icon.svg';

const COMMUNITY_DETAIL_POSTS = [
  {
    id: 1,
    nickname: '햄스터조련사',
    category: '소형포유류',
    topic: '일상/자랑',
    title: '울집 햄스터 자랑하는 글',
    content:
      '진짜 귀엽죠? 어제는 해바라기씨 몇개 뺏었더니 삐져서 뒤돌아있었어요ㅋㅋㅋ 털이 얼마나 볼슬볼슬 하고 윤기가 나는지.. 이번에 받은 먹이가 잘 맞나봐요! 여기서 추천받았는데 역시 펫뷸런스 고수님들 고견이 최고입니다. 늘 감사합니다 선생님들ㅎ',
    time: '38초 전',
    views: 55,
    likes: 24,
    comments: 0,
    image: reviewImage,
    commentItems: [],
  },
  {
    id: 2,
    nickname: '햄스터조련사',
    category: '소형포유류',
    topic: '일상/자랑',
    title: '울집 햄스터 자랑하는 글',
    content:
      '진짜 귀엽죠? 어제는 해바라기씨 몇개 뺏었더니 삐져서 뒤돌아있었어요ㅋㅋㅋ 털이 얼마나 볼슬볼슬 하고 윤기가 나는지.. 이번에 받은 먹이가 잘 맞나봐요! 여기서 추천받았는데 역시 펫뷸런스 고수님들 고견이 최고입니다. 늘 감사합니다 선생님들ㅎ',
    time: '38초 전',
    views: 55,
    likes: 24,
    comments: 5,
    image: reviewImage,
    commentItems: [
      {
        id: 1,
        nickname: '알많은앵무새',
        time: '18분 전',
        depth: 0,
        text: '와 천사가 따로없네요. 넘 귀엽다..',
      },
      {
        id: 2,
        nickname: '죽순이도련님',
        time: '2분 전',
        depth: 1,
        text: '@알많은앵무새 진짜 꼭 껴안고 싶죠',
      },
      {
        id: 3,
        nickname: '알많은앵무새',
        time: '45초 전',
        depth: 1,
        text: '@죽순이도련님 네. 넉넉히 다줘야죠 주변시선 받으니까 세상에서 제일 귀여운 햄스터같아요',
      },
      {
        id: 4,
        nickname: '용감한코끼리',
        time: '4분 전',
        depth: 0,
        text: '와 근데 햄스터 폴문인가요? 엄청 건강해보이네요! 사진 딱 먹이시간 같네용 급여 어케하나요?',
      },
      {
        id: 5,
        nickname: '복부팡기니피그',
        time: '2분 전',
        depth: 1,
        text: '@용감한코끼리 지나가다 남겨요.. 영양제만 매니큐어 끝에다만 참치캔줘요. 울집 기니도 보내기시켜주듯 귀여워요',
        image: reviewImage,
      },
    ],
  },
];

function CommentText({ text }) {
  const tokens = text.split(/(@[^\s]+)/g);

  return (
    <p className="mt-1 text-[14px] leading-5 text-[#1E1E1E]">
      {tokens.map((token, index) => {
        if (token.startsWith('@')) {
          return (
            <span
              key={`${token}-${index}`}
              className="font-medium text-[#27BE69]"
            >
              {token}
            </span>
          );
        }
        return <span key={`${token}-${index}`}>{token}</span>;
      })}
    </p>
  );
}

function CommentItem({ comment }) {
  const depth = comment.depth ?? 0;
  const isReply = depth > 0;

  return (
    <article
      className="border-b border-[#F0F0F0] px-5 py-3"
      style={{ paddingLeft: `${20 + depth * 20}px` }}
    >
      <div className="flex gap-2">
        <img
          src={defaultProfile}
          alt="프로필"
          className="mt-0.5 h-7 w-7 shrink-0 rounded-full"
        />
        <div
          className={`min-w-0 flex-1 ${isReply ? 'border-l border-[#DDEEDF] pl-3' : ''}`}
        >
          <p className="text-[13px] text-[#757575]">
            <span className="font-medium text-[#424242]">
              {comment.nickname}
            </span>{' '}
            {comment.time}
          </p>
          <CommentText text={comment.text} />
          {comment.image && (
            <img
              src={comment.image}
              alt="댓글 이미지"
              className="mt-2 h-[84px] w-[84px] rounded-md object-cover"
            />
          )}
          <button className="mt-2 rounded border border-[#D7D7D7] px-2 py-0.5 text-[12px] text-[#767676]">
            답글
          </button>
        </div>
      </div>
    </article>
  );
}

export default function CommunityDetail() {
  const navigate = useNavigate();
  const { postId } = useParams();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);

  const post = useMemo(
    () => COMMUNITY_DETAIL_POSTS.find((item) => String(item.id) === postId),
    [postId]
  );

  if (!post) {
    return (
      <div className="flex h-full items-center justify-center bg-white text-sm text-[#757575]">
        게시글을 찾을 수 없습니다.
      </div>
    );
  }

  const hasComments = post.commentItems.length > 0;
  const handleDeleteClick = () => {
    setIsMenuOpen(false);
    setIsDeleteConfirmOpen(true);
  };

  const handleDeleteConfirm = () => {
    setIsDeleteConfirmOpen(false);
    navigate('/index/community', { replace: true });
    toast('게시글을 삭제했어요', {
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
        label: '취소',
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
              {post.category}
            </span>
            <span className="rounded-full bg-[#F2F2F2] px-2 py-1 text-[#9E9E9E]">
              {post.topic}
            </span>
          </div>

          <div className="mb-3 flex items-center gap-2">
            <img
              src={defaultProfile}
              alt="프로필"
              className="h-8 w-8 shrink-0 rounded-full"
            />
            <div>
              <p className="text-[14px] font-medium text-[#424242]">
                {post.nickname}
              </p>
              <p className="text-[12px] text-[#9E9E9E]">{post.time}</p>
            </div>
          </div>

          <h1 className="mb-3 text-[26px] font-semibold text-[#1E1E1E]">
            {post.title}
          </h1>
          <p className="text-[16px] leading-7 text-[#424242]">{post.content}</p>

          {post.image && (
            <img
              src={post.image}
              alt="게시글 첨부"
              className="mt-4 h-[160px] w-[160px] rounded object-cover"
            />
          )}

          <div className="mt-4 flex items-center gap-3 text-[15px] text-[#9E9E9E]">
            <p className="flex items-center gap-1">
              <img src={thumbs} alt="좋아요" /> {post.likes}
            </p>
            <p className="flex items-center gap-1">
              <img src={eye} alt="조회수" /> {post.views}
            </p>
            <p className="flex items-center gap-1">
              <img src={message} alt="댓글" /> {post.comments}
            </p>
          </div>
        </section>

        <section className="mt-2 bg-white">
          <div className="border-b border-[#EFEFEF] px-5 py-3 text-[15px] text-[#616161]">
            댓글 {post.comments}
          </div>

          {hasComments ? (
            <div>
              {post.commentItems.map((comment) => (
                <CommentItem key={comment.id} comment={comment} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center py-8">
              <p className="mb-4 text-[22px] font-semibold text-[#B0B0B0]">
                첫 댓글을 남겨보세요.
              </p>
              <button className="rounded-[10px] border border-[#CFCFCF] px-5 py-2 text-[26px] font-medium text-[#616161]">
                댓글 쓰기
              </button>
            </div>
          )}
        </section>
      </div>

      {hasComments && (
        <footer className="sticky bottom-0 border-t border-[#DCDCDC] bg-white pb-[calc(8px+env(safe-area-inset-bottom))]">
          <div className="flex items-center justify-between border-b border-[#E5E5E5] bg-[#F5F5F5] px-3 py-2">
            <p className="text-[13px] text-[#5F5F5F]">
              뚝딱한기니피그님에게 답글을 남기는 중
            </p>
            <button className="p-1">
              <img src={xIcon} alt="닫기" className="h-3 w-3" />
            </button>
          </div>

          <div className="px-3 pt-2">
            <textarea
              rows={2}
              placeholder="오 네네 맞아요. 콜라비 먹이고 있고 간식은 해바라기씨만 주고있어요! 기억력 너무 좋으신데요? ㅣ"
              className="w-full resize-none text-[14px] leading-5 text-[#424242] outline-none"
            />
          </div>

          <div className="mt-1 flex items-center justify-between px-3">
            <div className="flex items-center gap-3 text-[#9E9E9E]">
              <span className="text-[14px]">🔒</span>
              <button>
                <img
                  src={cameraIcon}
                  alt="사진"
                  className="h-4 w-4 opacity-60"
                />
              </button>
            </div>
            <button className="rounded-[8px] bg-[#27BE69] px-4 py-1.5 text-[14px] font-medium text-white">
              등록
            </button>
          </div>
        </footer>
      )}

      {isMenuOpen && (
        <div className="absolute inset-0 z-50">
          <button
            className="absolute inset-0 bg-black/50"
            onClick={() => setIsMenuOpen(false)}
            aria-label="메뉴 닫기"
          />
          <div className="absolute right-0 bottom-0 left-0 px-3 pb-[calc(12px+env(safe-area-inset-bottom))]">
            <div className="overflow-hidden rounded-[10px] bg-white">
              <button
                className="w-full border-b border-[#EDEDED] py-3 text-[18px] font-medium text-[#F04438]"
                onClick={handleDeleteClick}
              >
                게시글 삭제
              </button>
              <button className="w-full py-3 text-[18px] text-[#1E1E1E]">
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
                onClick={handleDeleteConfirm}
              >
                삭제
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
