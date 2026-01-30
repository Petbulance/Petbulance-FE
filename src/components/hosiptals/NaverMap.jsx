import React, { useEffect, useRef, useCallback } from 'react';

import { fetchHospitalsByLocation } from '@/apis/hospitals';
import marker_closed from '@/assets/images/icons/close_hospital_marker.svg';
import current_location_btn from '@/assets/images/icons/current_location_btn.svg';
import current_location_marker from '@/assets/images/icons/current_location_marker.svg';
import marker_open from '@/assets/images/icons/open_hospital_marker.svg';
import selected_marker from '@/assets/images/icons/selected_marker.svg';
import { loadNaverMap } from '@/lib/loadNaverMap';

import { CurrentHospitalBtn } from './ui/CurrentHospitalBtn';

let mapInstance = null;
let mapElement = null;
let currentLocationMarker = null;

const NaverMap = React.memo(
  ({
    hospitals,
    setHospitals,
    selectedHospital,
    setSelectedHospital,
    filterState,
    setFilterState,
  }) => {
    const elRef = useRef(null);
    const hospitalMarkersRef = useRef([]);

    //지도 마커 제거 함수
    const clearMarkers = useCallback(() => {
      hospitalMarkersRef.current.forEach((m) => m.setMap(null));
      hospitalMarkersRef.current = [];
    }, []);

    //지역 필터 초기화 함수
    const resetLocationFilter = () => {
      setFilterState((prev) => ({
        ...prev,
        city: '',
        region: '',
      }));
    };

    //현재 지도 중심으로 병원 검색 함수
    const handleSearchHospitals = useCallback(async () => {
      if (!mapInstance) return;
      const center = mapInstance.getCenter();
      const bounds = mapInstance.getBounds();
      const sw = bounds.getSW();
      const ne = bounds.getNE();

      try {
        const data = await fetchHospitalsByLocation(
          center.lat(),
          center.lng(),
          [sw.lat(), sw.lng(), ne.lat(), ne.lng()],
          filterState
        );
        setHospitals(data.list || []);
        setSelectedHospital(null);
      } catch (err) {
        console.error(err);
      }
    }, [filterState, setHospitals, setSelectedHospital]);

    //지도 초기화
    useEffect(() => {
      const keyId = import.meta.env.VITE_NAVER_MAP_CLIENT_ID;

      loadNaverMap(keyId).then((naver) => {
        if (!elRef.current) return;

        if (!mapInstance) {
          mapElement = document.createElement('div');
          mapElement.style.width = '100%';
          mapElement.style.height = '100%';

          mapInstance = new naver.maps.Map(mapElement, {
            center: new naver.maps.LatLng(37.3595704, 127.105399),
            zoom: 14,
          });

          naver.maps.Event.addListener(mapInstance, 'click', () =>
            setSelectedHospital(null)
          );
        }

        if (elRef.current && mapElement) {
          elRef.current.appendChild(mapElement);
          window.naver.maps.Event.trigger(mapInstance, 'resize');
        }
      });
    }, [setSelectedHospital]);

    //지역 필터 선택시 지도 이동
    useEffect(() => {
      const naver = window.naver;
      if (!mapInstance || !naver?.maps?.Service?.geocode) return;

      const { city, region } = filterState;
      if (!city || city === '전체') return;

      const regionText = Array.isArray(region)
        ? region.join(' ')
        : region || '';
      const addressQuery = `${city} ${regionText}`.trim();

      naver.maps.Service.geocode(
        { query: addressQuery },
        (status, response) => {
          if (
            status !== naver.maps.Service.Status.OK ||
            !response.v2?.addresses?.length
          )
            return;
          const { x, y } = response.v2.addresses[0];
          const newPoint = new naver.maps.LatLng(parseFloat(y), parseFloat(x));
          mapInstance.setCenter(newPoint);
          mapInstance.setZoom(13);
          setTimeout(handleSearchHospitals, 300);
        }
      );
    }, [filterState.city, filterState.region, handleSearchHospitals]);

    //병원 마커 렌더링
    useEffect(() => {
      if (!mapInstance) return;
      clearMarkers();
      const newMarkers = hospitals.map((hospital) => {
        const markerImg =
          selectedHospital?.hospitalId === hospital.hospitalId
            ? selected_marker
            : hospital.isOpenNow
              ? marker_open
              : marker_closed;
        const marker = new window.naver.maps.Marker({
          position: new window.naver.maps.LatLng(hospital.lat, hospital.lng),
          map: mapInstance,
          icon: {
            url: markerImg,
            size: new window.naver.maps.Size(60, 60),
            scaledSize: new window.naver.maps.Size(60, 60),
          },
        });
        window.naver.maps.Event.addListener(marker, 'click', () => {
          setSelectedHospital(hospital);
          mapInstance.panTo(
            new window.naver.maps.LatLng(hospital.lat, hospital.lng)
          );
        });
        return marker;
      });
      hospitalMarkersRef.current = newMarkers;
    }, [hospitals, selectedHospital, setSelectedHospital, clearMarkers]);

    //현위치 조회
    const handleCurrentLocation = useCallback(() => {
      if (!mapInstance) return;
      navigator.geolocation.getCurrentPosition((pos) => {
        const currentPos = new window.naver.maps.LatLng(
          pos.coords.latitude,
          pos.coords.longitude
        );
        mapInstance.setCenter(currentPos);
        if (currentLocationMarker)
          currentLocationMarker.setPosition(currentPos);
        else {
          currentLocationMarker = new window.naver.maps.Marker({
            position: currentPos,
            map: mapInstance,
            zIndex: 100,
            icon: {
              url: current_location_marker,
              size: new window.naver.maps.Size(40, 40),
              scaledSize: new window.naver.maps.Size(40, 40),
            },
          });
        }
        handleSearchHospitals();
      });
    }, [handleSearchHospitals]);

    return (
      <div className="relative h-full w-full">
        <div ref={elRef} className="h-[calc(100dvh-63px-56px)] bg-gray-100" />
        <CurrentHospitalBtn onClick={handleSearchHospitals} />
        <button
          onClick={() => {
            resetLocationFilter();
            handleCurrentLocation();
          }}
          className="absolute right-5 bottom-[184px] z-[1000] active:scale-95"
        >
          <img src={current_location_btn} alt="location" />
        </button>
      </div>
    );
  },
  (prev, next) =>
    prev.hospitals === next.hospitals &&
    prev.selectedHospital === next.selectedHospital &&
    prev.filterState === next.filterState
);

export { NaverMap };
