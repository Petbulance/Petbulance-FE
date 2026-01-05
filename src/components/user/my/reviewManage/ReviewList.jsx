import { useState } from 'react';
import { toast } from 'sonner';

import ConfirmDangerModal from '@/components/commons/layout/ConfirmDangerModal.jsx';
import ReviewItem from '@/components/user/my/reviewManage/ReviewItem.jsx';

export default function ReviewList({
  reviews,
  setReviews,
  backupReviews,
  setBackupReviews,
}) {
  const [openConfirm, setOpenConfirm] = useState(false);

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
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: '#222222E5',
        color: '#ffffff',
      },
      action: {
        label: '취소',
        onClick: () => {
          toast.dismiss();
          handleUndoDelete(snapshot);
        },
      },
      actionButtonStyle: {
        background: 'transparent',
        color: '#ffffff',
        fontWeight: 500,
        padding: 0,
        marginLeft: '24px',
      },
    });
  };

  const handleUndoDelete = (snapshot) => {
    setReviews(snapshot);
    setBackupReviews([]);

    toast('후기 삭제를 취소했어요', {
      position: 'bottom-center',
      duration: 2500,
      style: {
        width: '100%',
        height: '44px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: '#222222E5',
        color: '#ffffff',
      },
      action: {
        label: 'X',
        onClick: () => {
          toast.dismiss();
        },
      },
      actionButtonStyle: {
        background: 'transparent',
        color: '#ffffff',
        fontWeight: 500,
        padding: 0,
        marginLeft: '24px',
      },
    });
  };

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
