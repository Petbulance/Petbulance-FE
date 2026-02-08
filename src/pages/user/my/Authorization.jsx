import { useEffect, useState } from 'react';

import api from '@/apis/api.jsx';
import { Switch } from '@/components/ui/switch.jsx';

const toBool = (value) => value === true || value === 'true' || value === 1;

export default function Authorization() {
  const [location, setLocation] = useState(false);
  const [marketing, setMarketing] = useState(false);
  const [camera, setCamera] = useState(false);
  const [loading, setLoading] = useState(true);
  const [updatingType, setUpdatingType] = useState('');

  useEffect(() => {
    const fetchAuthority = async () => {
      try {
        const res = await api.get('/users/authority');
        const data = res.data?.data ?? res.data ?? {};

        setLocation(toBool(data.locationService));
        setMarketing(toBool(data.marketing));
        setCamera(toBool(data.camera));
      } catch (error) {
        console.error('권한 조회 실패', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAuthority();
  }, []);

  const updateAuthority = async (type, nextValue, rollback) => {
    setUpdatingType(type);

    try {
      await api.patch(`/users/authority/${type}`);
    } catch (error) {
      console.error('권한 수정 실패', error);
      rollback(!nextValue);
      alert('권한 변경에 실패했습니다. 다시 시도해 주세요.');
    } finally {
      setUpdatingType('');
    }
  };

  return (
    <div className="bg-white">
      <div className="divide-y">
        {/* 위치 기반 서비스 */}
        <div className="flex items-center justify-between border-t px-4 py-4">
          <span className="text-[16px]">위치기반 서비스 이용 동의</span>
          <Switch
            checked={location}
            disabled={loading || updatingType === 'locationService'}
            onCheckedChange={(nextValue) => {
              setLocation(nextValue);
              updateAuthority('locationService', nextValue, setLocation);
            }}
            className="data-[state=checked]:bg-success"
          />
        </div>

        {/* 마케팅 활용 */}
        <div className="flex items-center justify-between px-4 py-4">
          <span className="text-[16px]">마케팅 활용 및 광고성 정보 수신</span>
          <Switch
            checked={marketing}
            disabled={loading || updatingType === 'marketing'}
            onCheckedChange={(nextValue) => {
              setMarketing(nextValue);
              updateAuthority('marketing', nextValue, setMarketing);
            }}
            className="data-[state=checked]:bg-success"
          />
        </div>

        {/* 카메라 */}
        <div className="flex items-center justify-between border-b px-4 py-4">
          <span className="text-[16px]">카메라 이용 동의</span>
          <Switch
            checked={camera}
            disabled={loading || updatingType === 'camera'}
            onCheckedChange={(nextValue) => {
              setCamera(nextValue);
              updateAuthority('camera', nextValue, setCamera);
            }}
            className="data-[state=checked]:bg-success"
          />
        </div>
      </div>
    </div>
  );
}
