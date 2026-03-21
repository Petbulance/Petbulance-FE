import { TrashCan } from '@carbon/icons-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

import {
  deleteAllNotifications,
  fetchNotifications,
  readAllNotifications,
} from '@/apis/notifications';
import ConfirmDangerModal from '@/components/commons/layout/ConfirmDangerModal.jsx';

export default function ActivityList() {
  const [openConfirm, setOpenConfirm] = useState(false);
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isDeletingAll, setIsDeletingAll] = useState(false);
  const [isReadingAll, setIsReadingAll] = useState(false);

  const loadNotifications = async () => {
    setLoading(true);
    try {
      const data = await fetchNotifications();
      setActivities(data?.content ?? []);
    } catch (error) {
      setActivities([]);
      console.error('알림 조회 실패', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadNotifications();
  }, []);

  const handleDeleteAll = async () => {
    if (isDeletingAll) return;

    setIsDeletingAll(true);
    try {
      await deleteAllNotifications();
      setActivities([]);
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
    } catch {
      toast('알림 전체 삭제에 실패했습니다.', { position: 'bottom-center' });
    } finally {
      setIsDeletingAll(false);
      setOpenConfirm(false);
    }
  };

  const handleReadAll = async () => {
    if (isReadingAll || activities.length === 0) return;

    setIsReadingAll(true);
    try {
      const data = await readAllNotifications();
      setActivities((prev) => prev.map((item) => ({ ...item, read: true })));
      toast(data?.message || '모든 알림을 읽음 처리했어요.', {
        position: 'bottom-center',
      });
    } catch {
      toast('모든 알림 읽음 처리에 실패했습니다.', {
        position: 'bottom-center',
      });
    } finally {
      setIsReadingAll(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center bg-white text-[16px] text-[#9E9E9E]">
        알림을 불러오는 중이에요.
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col bg-white">
      <div className="flex items-center justify-between px-4 py-3 text-xs text-gray-400">
        <button
          className="flex items-center gap-1 text-[#222222] disabled:opacity-50"
          onClick={() => setOpenConfirm(true)}
          disabled={activities.length === 0 || isDeletingAll}
        >
          <TrashCan className="h-[21px] w-[18px]" />
        </button>

        <button
          className="text-[16px] text-[#222222] underline underline-offset-2 disabled:opacity-50"
          onClick={handleReadAll}
          disabled={activities.length === 0 || isReadingAll}
        >
          {isReadingAll ? '처리중...' : '전체읽음'}
        </button>
      </div>

      {activities.length === 0 ? (
        <div className="flex flex-1 items-center justify-center">
          <p className="text-[18px] text-[#424242]">내 활동 알림이 없어요</p>
        </div>
      ) : (
        activities.map((item) => (
          <div
            key={item.notificationId}
            className={`border-b px-4 py-4 transition ${
              item.read ? 'bg-white' : 'bg-[#FDF4F1]'
            }`}
          >
            <div className="mb-1 flex items-center justify-between">
              <p className="text-caption text-[16px]">
                {item.type} · {item.topic}
              </p>
              <p className="text-caption text-[16px]">{item.createdAt}</p>
            </div>

            <p className="text-[16px] text-[#1e1e1e]">{item.message}</p>
          </div>
        ))
      )}

      <ConfirmDangerModal
        open={openConfirm}
        content="알림함을 비우시겠습니까?"
        cancelText="아니오"
        confirmText="예"
        onCancel={() => setOpenConfirm(false)}
        onConfirm={handleDeleteAll}
      />
    </div>
  );
}
