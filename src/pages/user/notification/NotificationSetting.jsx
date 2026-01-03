import { useState } from 'react';
import { Switch } from '@/components/ui/switch';

export default function NotificationSetting() {
  const [push, setPush] = useState(true);
  const [event, setEvent] = useState(true);
  const [marketing, setMarketing] = useState(false);

  return (
    <div className="bg-white ">

      <div className="divide-y ">
        {/* 앱 push 알림 */}
        <div className="flex items-center justify-between border-t px-4 py-4">
          <span className="text-[16px]">
            앱 push 알림 수신
          </span>
          <Switch
            checked={push}
            onCheckedChange={setPush}
            className="data-[state=checked]:bg-success"
          />
        </div>

        {/* 이벤트 알림 */}
        <div className="flex items-center justify-between px-4 py-4">
          <span className="text-[16px]">
            이벤트 알림 수신
          </span>
          <Switch
            checked={event}
            onCheckedChange={setEvent}
            className="data-[state=checked]:bg-success"
          />
        </div>

        {/* 마케팅 알림 */}
        <div className="flex items-center justify-between border-b px-4 py-4">
          <span className="text-[16px]">
            마케팅 알림 수신
          </span>
          <Switch
            checked={marketing}
            onCheckedChange={setMarketing}
            className="data-[state=checked]:bg-success"
          />
        </div>
      </div>
    </div>
  );
}
