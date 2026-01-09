import { useEffect, useRef } from 'react';

import { loadNaverMap } from '@/lib/loadNaverMap';

export function NaverMap() {
  const elRef = useRef(null);
  const mapInstanceRef = useRef(null);

  useEffect(() => {
    const keyId = import.meta.env.VITE_NAVER_MAP_CLIENT_ID;

    let cancelled = false;

    loadNaverMap(keyId)
      .then((naver) => {
        if (cancelled) return;
        if (!elRef.current) return;

        //지도 인스턴스 생성
        if (!mapInstanceRef.current) {
          mapInstanceRef.current = new naver.maps.Map(elRef.current, {
            center: new naver.maps.LatLng(37.3595704, 127.105399),
            zoom: 10,
          });
        }

        //지도 사이즈 재계산 트리거
        requestAnimationFrame(() =>
          naver.maps.Event.trigger(mapInstanceRef.current, 'resize')
        );
        setTimeout(
          () => naver.maps.Event.trigger(mapInstanceRef.current, 'resize'),
          300
        );
      })
      .catch((e) => {
        console.error(e);
        alert(e.message);
      });

    //인스턴스 참조를 해제하여 메모리 누수 방지
    return () => {
      cancelled = true;
      mapInstanceRef.current = null;
    };
  }, []);

  return <div ref={elRef} className="h-[calc(100dvh-63px-56px)] bg-gray-100" />;
}
