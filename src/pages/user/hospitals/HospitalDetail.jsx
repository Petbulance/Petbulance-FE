import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';

import { fetchHospitalDetail } from '@/apis/hospitals/hospitalDetail';
import { HosipitalDetail } from '@/components/hosiptals/ui/HospitalCard/HospitalDetail';
import { DetailContent } from '@/components/hosiptals/ui/HospitalDetail/detailInfo';
import { DetailTabMenu } from '@/components/hosiptals/ui/HospitalDetail/DetailTabMenu';
import { ReviewContent } from '@/components/hosiptals/ui/HospitalDetail/review';

export function HospitalDetail() {
  const { id } = useParams();
  const location = useLocation();

  const fromScreen = location.state?.from_screen || 'hospital_detail';

  const [hospital, setHospital] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('detail');

  const [userLocation, setUserLocation] = useState({
    lat: null,
    lng: null,
  });

  useEffect(() => {
    const getDetail = async () => {
      try {
        // ✅ [GTM] 병원 상세 진입 이벤트
        if (typeof window !== 'undefined') {
          window.dataLayer = window.dataLayer || [];
          const gaPayload = {
            event: 'view_hospital_detail',
            hospital_id: String(id),
            from_screen: fromScreen,
          };
          console.log('[GA] view_hospital_detail payload', gaPayload);
          window.dataLayer.push(gaPayload);
        }

        const data = await fetchHospitalDetail(id);
        setHospital(data);
      } catch (error) {
        console.error('상세 정보 조회 실패', error);
      } finally {
        setIsLoading(false);
      }
    };

    const getPosition = () => {
      if (!navigator.geolocation) return;

      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setUserLocation({
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
          });
        },
        (err) => {
          console.error('위치 정보 취득 실패', err);
        },
        {
          enableHighAccuracy: false,
          timeout: 5000,
          maximumAge: 60000,
        }
      );
    };

    if (id) {
      getDetail();
      getPosition();
    }
  }, [id]);

  if (isLoading)
    return (
      <div className="flex h-screen items-center justify-center bg-[#F5F5F5]">
        <div className="text-lg font-medium text-gray-500">
          정보를 불러오는 중입니다...
        </div>
      </div>
    );

  if (!hospital)
    return (
      <div className="flex h-screen items-center justify-center">
        <div>정보를 찾을 수 없습니다.</div>
      </div>
    );

  return (
    <div className="relative flex min-h-screen flex-col bg-[#F5F5F5]">
      <div className="bg-white px-8 py-10">
        <HosipitalDetail
          {...hospital}
          userLat={userLocation.lat}
          userLng={userLocation.lng}
          fromScreen="hospital_detail"
        />
      </div>

      <DetailTabMenu activeTab={activeTab} onChangeTab={setActiveTab} />

      <div className="flex-1">
        {activeTab === 'detail' && (
          <div className="animate-fade-in">
            <DetailContent hospitalData={hospital} />
          </div>
        )}
        {activeTab === 'review' && (
          <div className="animate-fade-in">
            <ReviewContent hospitalName={hospital.name} />
          </div>
        )}
      </div>
    </div>
  );
}
