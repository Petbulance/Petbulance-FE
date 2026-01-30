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

  useEffect(() => {
    const getDetail = async () => {
      setIsLoading(true);

      //사용자의 현위치 조회
      navigator.geolocation.getCurrentPosition(
        async (pos) => {
          const { latitude, longitude } = pos.coords;
          try {
            const data = await fetchHospitalDetail(id, latitude, longitude);
            setHospital(data);
          } catch (error) {
            console.error('상세 정보 조회 실패');
          } finally {
            setIsLoading(false);
          }
        },
        async (err) => {
          console.error('위치 정보 차단됨', err);
          setIsLoading(false);
        }
      );
    };

    if (id) getDetail();
  }, [id]);

  //TODO: 로딩화면 변경
  if (isLoading) return <div>로딩 중...</div>;
  if (!hospital) return <div>정보를 찾을 수 없습니다.</div>;

  return (
    <div className="relative flex flex-col bg-[#F5F5F5]">
      <div className="bg-white px-8 py-10">
        <HosipitalDetail {...hospital} />
      </div>
      <DetailTabMenu activeTab={activeTab} onChangeTab={setActiveTab} />
      <div className="flex-1">
        {activeTab === 'detail' && <DetailContent hospitalData={hospital} />}
        {activeTab === 'review' && <ReviewContent />}
      </div>
    </div>
  );
}
