import { useEffect, useState } from 'react';
import { toast } from 'sonner';

import api from '@/apis/api.jsx';
import ConfirmDangerModal from '@/components/commons/layout/ConfirmDangerModal.jsx';
import EmptyReview from '@/components/user/my/reviewManage/EmptyReview.jsx';
import ReviewItem from '@/components/user/my/reviewManage/ReviewItem.jsx';
import Spinner from '@/components/commons/Spinner.jsx';

export default function ReviewList() {
  const [reviews, setReviews] = useState([]);
  const [backupReviews, setBackupReviews] = useState([]);
  const [openConfirm, setOpenConfirm] = useState(false);

  const [cursorId, setCursorId] = useState(null);
  const [hasNext, setHasNext] = useState(true);
  const [loading, setLoading] = useState(false);

  /* =========================
     영수증 후기 조회
  ========================= */
  const fetchReviews = async () => {
    if (loading || !hasNext) return;

    try {
      setLoading(true);

      const res = await api.get('/receipts/me', {
        params: {
          cursorId,
          size: 10,
        },
      });

      const { list, nextCursorId, hasNext: next } = res.data.data;

      const mapped = list.map((item) => ({
        id: item.id,
        hospitalName: item.hospitalName,
        status: item.receiptChecked ? '게시됨' : '검수중',
        hasReceipt: item.receiptChecked,
        date: item.reviewDate,
        likeCount: item.likeCount,
        content: item.comment,
        hasImage: Boolean(item.hospitalImageUrl),
      }));

      setReviews((prev) => [...prev, ...mapped]);
      setCursorId(nextCursorId);
      setHasNext(next);
    } catch (e) {
      console.error('영수증 후기 조회 실패', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  if (loading && reviews.length === 0) {
    return (
      <div className="flex h-full items-center justify-center bg-white">
        <Spinner />
      </div>
    );
  }

  /* =========================
     전체 삭제 (UI 전용)
  ========================= */
  const handleConfirmDelete = () => {
    setOpenConfirm(false);

    const snapshot = [...reviews];
    setBackupReviews(snapshot);
    setReviews([]);

    toast('후기를 전부 삭제했어요', {
      position: 'bottom-center',
      duration: 4000,
      style: {
        width: '100%',
        height: '44px',
        background: '#222222E5',
        color: '#ffffff',
      },
      action: {
        label: '취소',
        onClick: () => {
          toast.dismiss();
          setReviews(snapshot);
        },
      },
    });
  };
  if (!loading && reviews.length === 0) {
    return <EmptyReview />;
  }
  return (
    <div>
      {/* 상단 바 */}
      <div className="flex h-[48px] items-center justify-between border-b px-[24px]">
        <label className="flex items-center gap-2">
          <input type="checkbox" className="h-[18px] w-[18px]" />
          <p className="text-[18px] font-medium">전체선택</p>
        </label>

        <button
          type="button"
          onClick={() => setOpenConfirm(true)}
          className="h-[28px] w-[52px] rounded-[8px] border text-[12px]"
        >
          삭제
        </button>
      </div>

      {/* 리뷰 리스트 */}
      {reviews.map((review) => (
        <ReviewItem key={review.id} review={review} />
      ))}

      {/* 더보기 */}
      {hasNext && (
        <button
          onClick={fetchReviews}
          className="w-full py-3 text-center text-sm text-gray-500"
        >
          더 불러오기
        </button>
      )}

      {/* 삭제 확인 모달 */}
      <ConfirmDangerModal
        open={openConfirm}
        onClose={() => setOpenConfirm(false)}
        onConfirm={handleConfirmDelete}
        title="주의"
        content={
          <>
            후기를 삭제하면 되돌릴 수 없어요.
            <br />
            그래도 삭제하시겠어요?
          </>
        }
        confirmText="전체 삭제"
      />
    </div>
  );
}
