import { useEffect, useState } from 'react';

import api from '@/apis/api.jsx';
import { Switch } from '@/components/ui/switch';

export default function NotificationSetting() {
  const [push, setPush] = useState(false);
  const [event, setEvent] = useState(false);
  const [marketing, setMarketing] = useState(false);
  const [loading, setLoading] = useState(true);

  /* =====================
     서버 전송
  ===================== */
  const sendSettings = async (nextState) => {
    try {
      console.log('PATCH', nextState);
      await api.patch('/users/settings/notification', {
        notifications_enabled: nextState.push,
        event_notifications_enabled: nextState.event,
        marketing_notifications_enabled: nextState.marketing,
      });
    } catch (e) {
      console.error('알림 설정 저장 실패', e);
    }
  };

  /* =====================
     조회
  ===================== */
  const fetchNoti = async () => {
    try {
      const res = await api.get('/users/settings/notification');
      console.log(res.data);
      const {
        notificationsEnabled,
        eventNotificationsEnabled,
        marketingNotificationsEnabled,
      } = res.data.data;

      setPush(notificationsEnabled);
      setEvent(eventNotificationsEnabled);
      setMarketing(marketingNotificationsEnabled);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNoti();
  }, []);

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center bg-white">
        <p className="text-gray-400">설정을 불러오는 중...</p>
      </div>
    );
  }

  return (
    <div className="bg-white">
      <div className="divide-y">
        {/* 앱 push */}
        <div className="flex items-center justify-between border-t px-4 py-4">
          <span className="text-[16px]">앱 push 알림 수신</span>
          <Switch
            checked={push}
            onCheckedChange={(v) => {
              setPush(v);

              if (!v) {
                setEvent(false);
                setMarketing(false);
                sendSettings({
                  push: false,
                  event: false,
                  marketing: false,
                });
              } else {
                sendSettings({
                  push: true,
                  event,
                  marketing,
                });
              }
            }}
            className="data-[state=checked]:bg-success"
          />
        </div>

        {/* 이벤트 */}
        <div className="flex items-center justify-between px-4 py-4">
          <span className="text-[16px]">이벤트 알림 수신</span>
          <Switch
            checked={event}
            disabled={!push}
            onCheckedChange={(v) => {
              setEvent(v);
              sendSettings({
                push,
                event: v,
                marketing,
              });
            }}
            className="data-[state=checked]:bg-success"
          />
        </div>

        {/* 마케팅 */}
        <div className="flex items-center justify-between border-b px-4 py-4">
          <span className="text-[16px]">마케팅 알림 수신</span>
          <Switch
            checked={marketing}
            disabled={!push}
            onCheckedChange={(v) => {
              setMarketing(v);
              sendSettings({
                push,
                event,
                marketing: v,
              });
            }}
            className="data-[state=checked]:bg-success"
          />
        </div>
      </div>
    </div>
  );
}
