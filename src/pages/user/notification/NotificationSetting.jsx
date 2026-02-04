import { useEffect, useRef, useState } from 'react';

import api from '@/apis/api.jsx';
import { Switch } from '@/components/ui/switch';

export default function NotificationSetting() {
  const [push, setPush] = useState(false);
  const [event, setEvent] = useState(false);
  const [marketing, setMarketing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [dirty, setDirty] = useState(false);
  const timerRef = useRef(null);
  const lastSentRef = useRef(null);

  /* =====================
     서버 전송
  ===================== */
  /*const sendSettings = async (nextState) => {
    // 변경 없으면 스킵
    if (
      lastSentRef.current &&
      lastSentRef.current.push === nextState.push &&
      lastSentRef.current.event === nextState.event &&
      lastSentRef.current.marketing === nextState.marketing
    ) {
      return;
    }

    try {
      console.log('PATCH request', nextState);
      const res = await api.patch('/users/settings/notification', {
        notificationsEnabled: nextState.push,
        eventNotificationsEnabled: nextState.event,
        marketingNotificationsEnabled: nextState.marketing,
      });
      console.log('PATCH response', res.status, res.data);
      lastSentRef.current = nextState;
      setDirty(false);
    } catch (e) {
      console.error('알림 설정 저장 실패', {
        message: e?.message,
        status: e?.response?.status,
        data: e?.response?.data,
      });
    }
  };
*/
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
      lastSentRef.current = {
        push: notificationsEnabled,
        event: eventNotificationsEnabled,
        marketing: marketingNotificationsEnabled,
      };
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNoti();
  }, []);

  /* =====================
     지연 전송 (1초)
  ===================== */
  /*  useEffect(() => {
    if (loading) return;

    setDirty(true);

    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(() => {
      sendSettings({ push, event, marketing });
    }, 1000);

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [push, event, marketing, loading]);*/

  // 화면 이탈 시 마지막 상태 전송
  /*useEffect(() => {
    const flush = () => {
      if (dirty) {
        sendSettings({ push, event, marketing });
      }
    };

    window.addEventListener('beforeunload', flush);

    return () => {
      window.removeEventListener('beforeunload', flush);
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dirty]);*/

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
            disabled
            onCheckedChange={(v) => {
              setPush(v);

              if (!v) {
                setEvent(false);
                setMarketing(false);
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
            disabled
            onCheckedChange={(v) => {
              setEvent(v);
            }}
            className="data-[state=checked]:bg-success"
          />
        </div>

        {/* 마케팅 */}
        <div className="flex items-center justify-between border-b px-4 py-4">
          <div className="flex flex-col">
            <span className="text-[16px]">마케팅 알림 수신</span>
          </div>
          <Switch
            checked={marketing}
            disabled
            onCheckedChange={(v) => {
              setMarketing(v);
            }}
            className="data-[state=checked]:bg-success"
          />
        </div>
        <div className="py-3 text-center text-[18px] font-semibold text-gray-700">
          이벤트·혜택·프로모션 소식을 받아요
        </div>
      </div>
    </div>
  );
}
