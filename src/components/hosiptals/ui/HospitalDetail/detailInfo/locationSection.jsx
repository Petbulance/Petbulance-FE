import { useEffect, useRef } from 'react';

import selected_marker from '@/assets/images/icons/selected_marker.svg';
import { loadNaverMap } from '@/lib/loadNaverMap';

export function LocationSection({ hospitalData }) {
  const elRef = useRef(null);
  const mapRef = useRef(null);
  const markerRef = useRef(null);

  //길찾기 핸들러 함수
  const handleDirectionsClick = () => {
    if (!hospitalData) return;

    const { name, lat, lng } = hospitalData;
    const destination = encodeURIComponent(name);

    const url = `https://map.naver.com/index.nhn?slng=&slat=&stext=&elng=${lng}&elat=${lat}&etext=${destination}&menu=route&pathType=0`;

    window.open(url, '_blank');
  };

  useEffect(() => {
    if (!hospitalData?.lat || !hospitalData?.lng) return;

    const keyId = import.meta.env.VITE_NAVER_MAP_CLIENT_ID;
    let cancelled = false;

    loadNaverMap(keyId)
      .then((naver) => {
        if (cancelled || !elRef.current) return;

        const location = new naver.maps.LatLng(
          hospitalData.lat,
          hospitalData.lng
        );

        if (!mapRef.current) {
          mapRef.current = new naver.maps.Map(elRef.current, {
            center: location,
            zoom: 16,
            scrollWheel: false,
            zoomControl: true,
            zoomControlOptions: {
              position: naver.maps.Position.RIGHT_BOTTOM,
              style: naver.maps.ZoomControlStyle.SMALL,
            },
          });
        } else {
          mapRef.current.setCenter(location);
        }

        if (markerRef.current) {
          markerRef.current.setMap(null);
        }

        markerRef.current = new naver.maps.Marker({
          position: location,
          map: mapRef.current,
          title: hospitalData.name,
          icon: {
            url: selected_marker,
            anchor: new naver.maps.Point(16, 42),
          },
        });
      })
      .catch((e) => console.error('지도 로드 에러:', e));

    return () => {
      cancelled = true;
    };
  }, [hospitalData]);

  return (
    <div className="px-6 py-8">
      <h3 className="text-[20px] font-semibold text-[#424242]">병원 위치</h3>
      <p className="mt-2 text-[18px] font-medium text-[#616161]">
        {hospitalData?.address || '주소 정보가 없습니다.'}
      </p>

      <div
        ref={elRef}
        className="my-5 h-[280px] w-full overflow-hidden rounded-[13.78px] bg-[#E0E0E0]"
      >
        {!hospitalData && (
          <div className="flex h-full items-center justify-center text-gray-500">
            지도 영역
          </div>
        )}
      </div>

      <button
        type="button"
        onClick={handleDirectionsClick}
        className="w-full rounded-[16px] border border-[#E0E0E0] py-[14px] text-[23px] font-medium text-[#616161] transition-colors active:bg-gray-50"
      >
        병원 길찾기
      </button>
    </div>
  );
}
