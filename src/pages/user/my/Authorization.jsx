import { useState } from 'react';

import { Switch } from '@/components/ui/switch.jsx';

export default function Authorization() {
  const [location, setLocation] = useState(true);
  const [marketing, setMarketing] = useState(false);
  const [camera, setCamera] = useState(true);

  return (
    <div className="bg-white">
      <div className="divide-y">
        {/* 위치 기반 서비스 */}
        <div className="flex items-center justify-between border-t px-4 py-4">
          <span className="text-[16px]">위치기반 서비스 이용 동의</span>
          <Switch
            checked={location}
            onCheckedChange={setLocation}
            className="data-[state=checked]:bg-success"
          />
        </div>

        {/* 마케팅 활용 */}
        <div className="flex items-center justify-between px-4 py-4">
          <span className="text-[16px]">마케팅 활용 및 광고성 정보 수신</span>
          <Switch
            checked={marketing}
            onCheckedChange={setMarketing}
            className="data-[state=checked]:bg-success"
          />
        </div>

        {/* 카메라 */}
        <div className="flex items-center justify-between border-b px-4 py-4">
          <span className="text-[16px]">카메라 이용 동의</span>
          <Switch
            checked={camera}
            onCheckedChange={setCamera}
            className="data-[state=checked]:bg-success"
          />
        </div>
      </div>
    </div>
  );
}
