import { TrashCan } from '@carbon/icons-react';
import { useState } from 'react';
import { toast } from 'sonner';

import ConfirmDangerModal from '@/components/commons/layout/ConfirmDangerModal.jsx';

export default function ActivityList({ NOTIFICATIONS }) {
  const [openConfirm, setOpenConfirm] = useState(false);

  const activities = NOTIFICATIONS.filter((n) => !n.isNotice);

  const handleDeleteAll = () => {
    console.log('알림함 비우기');
    setOpenConfirm(false);
    toast('알림함을 비웠어요', {
      position: 'bottom-center',
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
    });
  };

  return (
    <div className="flex h-full flex-col bg-white">
      {/* 상단 액션 */}
      <div className="flex items-center justify-between px-4 py-3 text-xs text-gray-400">
        <button
          className="flex items-center gap-1 text-[#222222]"
          onClick={() => setOpenConfirm(true)}
        >
          <TrashCan className="h-[21px] w-[18px]" />
        </button>

        <button className="text-[16px] text-[#222222] underline underline-offset-2">
          전체읽음
        </button>
      </div>

      {/* 🔔 Empty State */}
      {activities.length === 0 ? (
        <div className="flex flex-1 items-center justify-center">
          <p className="text-[18px] text-[#424242]">내 활동 알림이 없어요</p>
        </div>
      ) : (
        activities.map((item) => (
          <div
            key={item.id}
            className={`border-b px-4 py-4 transition ${
              item.isRead ? 'bg-white' : 'bg-[#FDF4F1]'
            }`}
          >
            <div className="mb-1 flex items-center justify-between">
              <p className="text-caption text-[16px]">{item.category}</p>
              <p className="text-caption text-[16px]">{item.time}</p>
            </div>

            <p className="text-[16px] text-[#1e1e1e]">{item.content}</p>
          </div>
        ))
      )}

      {/* 알림함 비우기 컨펌 */}
      <ConfirmDangerModal
        open={openConfirm}
        content="알림함을 비우시겠습니까?"
        cancelText="아니오"
        confirmText="예"
        color="red"
        onCancel={() => setOpenConfirm(false)}
        onConfirm={handleDeleteAll}
      />
    </div>
  );
}
