import React, { useEffect, useRef, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
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
    const [params] = useSearchParams();

    // 마커 완전 삭제 함수
    const clearMarkers = useCallback(() => {
      if (hospitalMarkersRef.current.length > 0) {
        hospitalMarkersRef.current.forEach((marker) => {
          if (marker) {
            marker.setMap(null);
            if (window.naver && window.naver.maps) {
              window.naver.maps.Event.clearInstanceListeners(marker);
            }
          }
        });
        hospitalMarkersRef.current = [];
      }
    }, []);

    // 위치 가져오기 함수
    const getUserLocation = () => {
      return new Promise((resolve) => {
        if (!navigator.geolocation) {
          resolve(null);
          return;
        }

        navigator.geolocation.getCurrentPosition(
          (pos) => {
            resolve({
              lat: pos.coords.latitude,
              lng: pos.coords.longitude,
            });
          },
          (err) => {
            console.warn('위치 정보를 가져올 수 없습니다. (권한 거부 등)', err);
            resolve(null);
          },
          {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0,
          }
        );
      });
    };

    //지역 필터 초기화 함수
    const resetLocationFilter = () => {
      setFilterState((prev) => ({
        ...prev,
        city: '',
        region: '',
      }));
    };

    // 병원 검색 함수
    const handleSearchHospitals = useCallback(async () => {
      if (!mapInstance) return;

      // 1. 지도 정보 가져오기
      const center = mapInstance.getCenter();
      const bounds = mapInstance.getBounds();
      const sw = bounds.getSW();
      const ne = bounds.getNE();

      try {
        setHospitals([]);

        // 사용자 현위치 가져오기
        const userPos = await getUserLocation();

        const searchLat = userPos ? userPos.lat : center.lat();
        const searchLng = userPos ? userPos.lng : center.lng();

        const data = await fetchHospitalsByLocation(
          searchLat,
          searchLng,
          [sw.lat(), sw.lng(), ne.lat(), ne.lng()],
          filterState
        );

        setHospitals(data.list || []);
        setSelectedHospital(null);
      } catch (err) {
        console.error('병원 검색 실패:', err);
      }
    }, [filterState, setHospitals, setSelectedHospital]);

    // 현위치 조회
    const handleCurrentLocation = useCallback(() => {
      if (!window.naver || !mapInstance || !navigator.geolocation) return;

      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const currentPos = new window.naver.maps.LatLng(
            pos.coords.latitude,
            pos.coords.longitude
          );

          mapInstance.setCenter(currentPos);
          mapInstance.setZoom(14);

          if (currentLocationMarker) {
            currentLocationMarker.setPosition(currentPos);
            currentLocationMarker.setMap(mapInstance);
          } else {
            currentLocationMarker = new window.naver.maps.Marker({
              position: currentPos,
              map: mapInstance,
              zIndex: 100,
              icon: {
                url: current_location_marker,
                size: new window.naver.maps.Size(40, 40),
                scaledSize: new window.naver.maps.Size(40, 40),
                anchor: new window.naver.maps.Point(20, 20),
              },
            });
          }
          handleSearchHospitals();
        },
        (err) => {
          console.error('위치 조회 에러:', err);
          handleSearchHospitals();
        }
      );
    }, [handleSearchHospitals]);

    // 필터 변경 감지
    useEffect(() => {
      if (!mapInstance) return;
      handleSearchHospitals();
    }, [
      filterState.isOpen,
      filterState.sort,
      filterState.animal,
      handleSearchHospitals,
    ]);

    // 지역 변경 감지
    useEffect(() => {
      const naver = window.naver;
      if (!mapInstance || !naver?.maps?.Service?.geocode) return;

      const { city, region } = filterState;
      if (!city || city === '전체') return;

      const isWholeCity =
        !region ||
        region === '전체' ||
        (Array.isArray(region) && region.length === 0);
      const regionText = Array.isArray(region)
        ? region.join(' ')
        : region === '전체'
          ? ''
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

          clearMarkers();

          mapInstance.setCenter(newPoint);
          mapInstance.setZoom(isWholeCity ? 11 : 14);

          setTimeout(() => handleSearchHospitals(), 300);
        }
      );
    }, [
      filterState.city,
      filterState.region,
      clearMarkers,
      handleSearchHospitals,
    ]);

    // 지도 초기화
    useEffect(() => {
      const keyId = import.meta.env.VITE_NAVER_MAP_CLIENT_ID;

      loadNaverMap(keyId).then((naver) => {
        if (!elRef.current) return;

        if (!mapInstance) {
          mapElement = document.createElement('div');
          mapElement.style.width = '100%';
          mapElement.style.height = '100%';

          mapInstance = new naver.maps.Map(mapElement, {
            center: new naver.maps.LatLng(37.5665851, 126.9782038),
            zoom: 14,
          });

          naver.maps.Event.addListener(mapInstance, 'click', () =>
            setSelectedHospital(null)
          );
        }

        if (elRef.current && !elRef.current.contains(mapElement)) {
          elRef.current.appendChild(mapElement);
          setTimeout(() => {
            window.naver.maps.Event.trigger(mapInstance, 'resize');
          }, 100);
        }

        const animalType = new URLSearchParams(window.location.search).get(
          'animalType'
        );
        if (animalType) {
          setFilterState((prev) => ({ ...prev, animal: [animalType] }));
          setTimeout(handleCurrentLocation, 200);
        } else {
          handleSearchHospitals();
        }
      });
    }, []);

    // 마커 렌더링
    useEffect(() => {
      if (!mapInstance) return;

      clearMarkers();

      if (hospitals && hospitals.length > 0) {
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
              anchor: new window.naver.maps.Point(30, 60),
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
      }

      return () => {
        clearMarkers();
      };
    }, [hospitals, selectedHospital, setSelectedHospital, clearMarkers]);

    return (
      <div className="relative h-full w-full">
        <div
          ref={elRef}
          className="h-[calc(100dvh-63px-56px)] w-full bg-gray-100"
        />
        <CurrentHospitalBtn onClick={handleSearchHospitals} />
        <button
          onClick={() => {
            resetLocationFilter();
            handleCurrentLocation();
          }}
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
