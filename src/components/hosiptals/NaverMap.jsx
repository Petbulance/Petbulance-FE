import React, { useEffect, useRef, useCallback, useState } from 'react';
import { fetchHospitalsByLocation } from '@/apis/hospitals';
import marker_closed from '@/assets/images/icons/close_hospital_marker.svg';
import current_location_btn from '@/assets/images/icons/current_location_btn.svg';
import current_location_marker from '@/assets/images/icons/current_location_marker.svg';
import marker_open from '@/assets/images/icons/open_hospital_marker.svg';
import selected_marker from '@/assets/images/icons/selected_marker.svg';
import selected_close_marker from '@/assets/images/icons/selected_close_marker.svg';

import { loadNaverMap } from '@/lib/loadNaverMap';
import { CurrentHospitalBtn } from './ui/CurrentHospitalBtn';

const NaverMap = React.memo(
  ({
    hospitals,
    setHospitals,
    selectedHospital,
    setSelectedHospital,
    filterState,
    setFilterState,
  }) => {
    const mapInstance = useRef(null);
    const mapElement = useRef(null);
    const hospitalMarkersRef = useRef([]);
    const currentLocationMarker = useRef(null);

    // 지도 로드 상태 관리
    const [isMapLoaded, setIsMapLoaded] = useState(false);

    // 마커 삭제
    const clearMarkers = useCallback(() => {
      if (hospitalMarkersRef.current.length > 0) {
        hospitalMarkersRef.current.forEach((marker) => {
          marker.setMap(null);
        });
        hospitalMarkersRef.current = [];
      }
    }, []);

    // 병원 검색
    const handleSearchHospitals = useCallback(async () => {
      if (!mapInstance.current) return;

      const bounds = mapInstance.current.getBounds();
      const sw = bounds.getSW();
      const ne = bounds.getNE();

      try {
        const data = await fetchHospitalsByLocation(
          [sw.lat(), sw.lng(), ne.lat(), ne.lng()],
          filterState
        );
        setHospitals(data.list || []);
      } catch (err) {
        console.error('병원 검색 실패:', err);
        setHospitals([]);
      }
    }, [filterState, setHospitals]);

    // 지도 이동 (필터 변경 시)
    useEffect(() => {
      const naver = window.naver;
      if (!isMapLoaded || !mapInstance.current || !naver?.maps?.Service) return;

      const { city, region } = filterState;

      if (!city || city === '전체') return;

      let addressesToSearch = [];
      let isWholeCity = false;

      if (Array.isArray(region) && region.length > 0) {
        addressesToSearch = region.map((r) => `${city} ${r}`);
      } else if (region && region !== '전체') {
        addressesToSearch = [`${city} ${region}`];
      } else {
        // 지역이 없거나 전체인 경우 -> 시/도 검색
        addressesToSearch = [city];
        isWholeCity = true;
      }

      // 주소 -> 좌표 변환
      const searchPromises = addressesToSearch.map((query) => {
        return new Promise((resolve) => {
          naver.maps.Service.geocode({ query }, (status, response) => {
            if (
              status === naver.maps.Service.Status.OK &&
              response.v2?.addresses?.length > 0
            ) {
              const { x, y } = response.v2.addresses[0];
              resolve(new naver.maps.LatLng(Number(y), Number(x)));
            } else {
              resolve(null);
            }
          });
        });
      });

      Promise.all(searchPromises).then((results) => {
        const validCoords = results.filter((coord) => coord !== null);

        if (validCoords.length > 0) {
          if (validCoords.length === 1) {
            const targetCoord = validCoords[0];

            mapInstance.current.setCenter(targetCoord);

            const zoomLevel = isWholeCity ? 7 : 13;
            mapInstance.current.setZoom(zoomLevel);
          } else {
            const bounds = new naver.maps.LatLngBounds();
            validCoords.forEach((coord) => bounds.extend(coord));

            mapInstance.current.fitBounds(bounds, {
              top: 50,
              right: 20,
              bottom: 50,
              left: 20,
            });
          }

          setTimeout(() => handleSearchHospitals(), 500);
        }
      });
    }, [
      filterState.city,
      filterState.region,
      isMapLoaded,
      handleSearchHospitals,
    ]);

    // 현위치 이동
    const handleCurrentLocation = useCallback(() => {
      if (!window.naver || !mapInstance.current || !navigator.geolocation)
        return;

      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const currentPos = new window.naver.maps.LatLng(
            pos.coords.latitude,
            pos.coords.longitude
          );

          mapInstance.current.setCenter(currentPos);
          mapInstance.current.setZoom(14);

          if (currentLocationMarker.current) {
            currentLocationMarker.current.setPosition(currentPos);
            currentLocationMarker.current.setMap(mapInstance.current);
          } else {
            currentLocationMarker.current = new window.naver.maps.Marker({
              position: currentPos,
              map: mapInstance.current,
              zIndex: 100,
              icon: {
                url: current_location_marker,
                size: new window.naver.maps.Size(40, 40),
                scaledSize: new window.naver.maps.Size(40, 40),
                anchor: new window.naver.maps.Point(20, 20),
              },
            });
          }
          // 초기화 후 검색
          setFilterState((prev) => ({ ...prev, city: '', region: '' }));
          setTimeout(handleSearchHospitals, 300);
        },
        (err) => {
          console.error('위치 조회 에러:', err);
        }
      );
    }, [handleSearchHospitals, setFilterState]);

    // 지도 초기화
    useEffect(() => {
      const keyId = import.meta.env.VITE_NAVER_MAP_CLIENT_ID;

      if (mapInstance.current) return;

      loadNaverMap(keyId).then((naver) => {
        if (!mapElement.current) return;

        const map = new naver.maps.Map(mapElement.current, {
          center: new naver.maps.LatLng(37.5665851, 126.9782038),
          zoom: 14,
          scaleControl: false,
          logoControl: false,
          mapDataControl: false,
          zoomControl: false,
        });

        mapInstance.current = map;

        naver.maps.Event.addListener(map, 'click', () =>
          setSelectedHospital(null)
        );

        setIsMapLoaded(true);

        if (!filterState.city) {
          handleCurrentLocation();
        }
      });
    }, []);

    // 마커 렌더링
    useEffect(() => {
      if (!mapInstance.current) return;
      clearMarkers();

      if (hospitals && hospitals.length > 0) {
        const newMarkers = hospitals.map((hospital) => {
          const isSelected =
            selectedHospital?.hospitalId === hospital.hospitalId;

          const markerImg = isSelected
            ? hospital.isOpenNow
              ? selected_marker
              : selected_close_marker
            : hospital.isOpenNow
              ? marker_open
              : marker_closed;

          const marker = new window.naver.maps.Marker({
            position: new window.naver.maps.LatLng(hospital.lat, hospital.lng),
            map: mapInstance.current,
            icon: {
              url: markerImg,
              size: new window.naver.maps.Size(60, 60),
              scaledSize: new window.naver.maps.Size(60, 60),
              anchor: new window.naver.maps.Point(30, 60),
            },
          });

          window.naver.maps.Event.addListener(marker, 'click', () => {
            setSelectedHospital(hospital);
            mapInstance.current.panTo(
              new window.naver.maps.LatLng(hospital.lat, hospital.lng)
            );
          });

          return marker;
        });
        hospitalMarkersRef.current = newMarkers;
      }
    }, [hospitals, selectedHospital, clearMarkers, setSelectedHospital]);

    return (
      <div className="relative h-full w-full">
        <div
          ref={mapElement}
          className="h-[calc(100dvh-63px-56px)] w-full bg-gray-100"
        />
        <CurrentHospitalBtn onClick={handleSearchHospitals} />
        <button
          onClick={handleCurrentLocation}
          className="absolute right-5 bottom-50 z-[1000] active:scale-95"
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
