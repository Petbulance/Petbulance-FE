import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { fetchHospitalDetail } from '@/apis/hospitals/hospitalDetail';
import { HosipitalDetail } from '@/components/hosiptals/ui/HospitalCard/HospitalDetail';
import { DetailContent } from '@/components/hosiptals/ui/HospitalDetail/detailInfo';
import { DetailTabMenu } from '@/components/hosiptals/ui/HospitalDetail/DetailTabMenu';
import { ReviewContent } from '@/components/hosiptals/ui/HospitalDetail/review';

export function HospitalDetail() {
  const { id } = useParams();

  const [hospital, setHospital] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('detail');

  const [userLocation, setUserLocation] = useState({
    lat: null,
    lng: null,
  });

  useEffect(() => {
    const getDetail = async () => {
      setIsLoading(true);

      navigator.geolocation.getCurrentPosition(
        async (pos) => {
          setUserLocation({
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
          });

          try {
            const data = await fetchHospitalDetail(id);
            setHospital(data);
          } catch (error) {
            console.error('상세 정보 조회 실패', error);
          } finally {
            setIsLoading(false);
          }
        },
        async (err) => {
          console.error('위치 정보 차단됨', err);
          try {
            const data = await fetchHospitalDetail(id);
            setHospital(data);
          } catch (error) {
            console.error('상세 정보 조회 실패', error);
          } finally {
            setIsLoading(false);
          }
        }
      );
    };

    if (id) getDetail();
  }, [id]);

  if (isLoading) return <div>로딩 중...</div>;
  if (!hospital) return <div>정보를 찾을 수 없습니다.</div>;

  return (
    <div className="relative flex flex-col bg-[#F5F5F5]">
      <div className="bg-white px-8 py-10">
        <HosipitalDetail
          {...hospital}
          userLat={userLocation.lat}
          userLng={userLocation.lng}
        />
      </div>
      <DetailTabMenu activeTab={activeTab} onChangeTab={setActiveTab} />
      <div className="flex-1">
        {activeTab === 'detail' && <DetailContent hospitalData={hospital} />}
        {activeTab === 'review' && <ReviewContent />}
      </div>
    </div>
  );
}
