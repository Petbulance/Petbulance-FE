import React, {
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { useSearchParams } from 'react-router-dom';

import { fetchHospitalsByLocation } from '@/apis/hospitals';
import marker_closed from '@/assets/images/icons/close_hospital_marker.svg';
import current_location_btn from '@/assets/images/icons/current_location_btn.svg';
import current_location_marker from '@/assets/images/icons/current_location_marker.svg';
import marker_open from '@/assets/images/icons/open_hospital_marker.svg';
import selected_close_marker from '@/assets/images/icons/selected_close_marker.svg';
import selected_marker from '@/assets/images/icons/selected_marker.svg';
import { loadNaverMap } from '@/lib/loadNaverMap';

import { CurrentHospitalBtn } from './ui/CurrentHospitalBtn';

const HOSPITAL_PAGE_SIZE = 20;
const CLUSTER_GRID_SIZE = 90;
const CLUSTER_MIN_SIZE = 2;
const CLUSTER_MAX_ZOOM = 14;
const DEFAULT_MAP_ZOOM = 13;
const DEFAULT_CURRENT_LOCATION_ZOOM = 13;

const extractCursor = (data = {}) => ({
  cursorId: data.nextCursorId ?? data.cursorId ?? null,
  cursorDistance: data.nextCursorDistance ?? data.cursorDistance ?? null,
  cursorRating: data.nextCursorRating ?? data.cursorRating ?? null,
  cursorReviewCount:
    data.nextCursorReviewCount ?? data.cursorReviewCount ?? null,
  hasNext: Boolean(data.hasNext),
});

const dedupeHospitals = (prev = [], next = []) => {
  const map = new Map();

  [...prev, ...next].forEach((hospital) => {
    if (hospital?.hospitalId == null) return;
    map.set(hospital.hospitalId, hospital);
  });

  return [...map.values()];
};

const getBoundsPayload = (mapInstance) => {
  const bounds = mapInstance.getBounds();
  const sw = bounds.getSW();
  const ne = bounds.getNE();

  return [sw.lat(), sw.lng(), ne.lat(), ne.lng()];
};

const createHospitalMarkerIcon = (hospital, isSelected) => {
  const markerImg = isSelected
    ? hospital.isOpenNow
      ? selected_marker
      : selected_close_marker
    : hospital.isOpenNow
      ? marker_open
      : marker_closed;

  return {
    url: markerImg,
    size: new window.naver.maps.Size(60, 60),
    scaledSize: new window.naver.maps.Size(60, 60),
    anchor: new window.naver.maps.Point(30, 60),
  };
};

const createClusterIcon = () => {
  return {
    url: marker_open,
    size: new window.naver.maps.Size(60, 60),
    scaledSize: new window.naver.maps.Size(60, 60),
    anchor: new window.naver.maps.Point(30, 60),
  };
};

const getClusterKey = (point) =>
  `${Math.floor(point.x / CLUSTER_GRID_SIZE)}:${Math.floor(
    point.y / CLUSTER_GRID_SIZE
  )}`;

const NaverMapBase = React.forwardRef(
  (
    {
      hospitals,
      setHospitals,
      selectedHospital,
      setSelectedHospital,
      filterState,
      setFilterState,
      searchTrigger,
      onPagingChange,
    },
    ref
  ) => {
    const mapInstance = useRef(null);
    const mapElement = useRef(null);
    const hospitalMarkersRef = useRef([]);
    const currentLocationMarker = useRef(null);
    const mapEventListenersRef = useRef([]);
    const hospitalsRef = useRef(hospitals);
    const selectedHospitalRef = useRef(selectedHospital);

    const [searchParams] = useSearchParams();
    const hasProcessedParams = useRef(false);
    const requestSeqRef = useRef(0);
    const searchStateRef = useRef({
      cursor: null,
      hasNext: false,
      bounds: null,
      isLoading: false,
    });

    const [isMapLoaded, setIsMapLoaded] = useState(false);
    const [paging, setPaging] = useState({
      hasNext: false,
      isLoadingMore: false,
    });
    const regionKey = Array.isArray(filterState.region)
      ? filterState.region.join(',')
      : String(filterState.region ?? '');
    const animalKey = Array.isArray(filterState.animal)
      ? filterState.animal.join(',')
      : String(filterState.animal ?? '');

    useEffect(() => {
      hospitalsRef.current = hospitals;
    }, [hospitals]);

    useEffect(() => {
      selectedHospitalRef.current = selectedHospital;
    }, [selectedHospital]);

    useEffect(() => {
      onPagingChange?.(paging);
    }, [paging, onPagingChange]);

    const clearMarkers = useCallback(() => {
      if (hospitalMarkersRef.current.length === 0) return;

      hospitalMarkersRef.current.forEach((marker) => {
        marker.setMap(null);
      });
      hospitalMarkersRef.current = [];
    }, []);

    const renderMarkers = useCallback(() => {
      if (!mapInstance.current || !window.naver) return;

      const map = mapInstance.current;
      const hospitalsData = hospitalsRef.current || [];
      const zoom = map.getZoom();
      const bounds = map.getBounds();
      const projection = map.getProjection?.();

      clearMarkers();

      if (hospitalsData.length === 0) return;

      const shouldCluster =
        zoom < CLUSTER_MAX_ZOOM && hospitalsData.length >= CLUSTER_MIN_SIZE;

      if (!shouldCluster || !projection) {
        hospitalMarkersRef.current = hospitalsData.map((hospital) => {
          const isSelected =
            selectedHospitalRef.current?.hospitalId === hospital.hospitalId;

          const marker = new window.naver.maps.Marker({
            position: new window.naver.maps.LatLng(hospital.lat, hospital.lng),
            map,
            icon: createHospitalMarkerIcon(hospital, isSelected),
          });

          window.naver.maps.Event.addListener(marker, 'click', () => {
            selectedHospitalRef.current = hospital;
            setSelectedHospital(hospital);
            map.panTo(new window.naver.maps.LatLng(hospital.lat, hospital.lng));
          });

          return marker;
        });

        return;
      }

      const clusters = new Map();

      hospitalsData.forEach((hospital) => {
        const position = new window.naver.maps.LatLng(
          hospital.lat,
          hospital.lng
        );

        if (!bounds.hasLatLng(position)) return;

        const point = projection.fromCoordToOffset(position);
        if (!point) return;

        const key = getClusterKey(point);
        const bucket = clusters.get(key) || {
          items: [],
          latSum: 0,
          lngSum: 0,
        };

        bucket.items.push(hospital);
        bucket.latSum += hospital.lat;
        bucket.lngSum += hospital.lng;
        clusters.set(key, bucket);
      });

      clusters.forEach((bucket) => {
        const { items, latSum, lngSum } = bucket;

        if (items.length < CLUSTER_MIN_SIZE) {
          const hospital = items[0];
          const isSelected =
            selectedHospitalRef.current?.hospitalId === hospital.hospitalId;

          const marker = new window.naver.maps.Marker({
            position: new window.naver.maps.LatLng(hospital.lat, hospital.lng),
            map,
            icon: createHospitalMarkerIcon(hospital, isSelected),
          });

          window.naver.maps.Event.addListener(marker, 'click', () => {
            selectedHospitalRef.current = hospital;
            setSelectedHospital(hospital);
            map.panTo(new window.naver.maps.LatLng(hospital.lat, hospital.lng));
          });

          hospitalMarkersRef.current.push(marker);
          return;
        }

        const center = new window.naver.maps.LatLng(
          latSum / items.length,
          lngSum / items.length
        );

        const marker = new window.naver.maps.Marker({
          position: center,
          map,
          clickable: true,
          icon: createClusterIcon(items.length),
        });

        window.naver.maps.Event.addListener(marker, 'click', () => {
          selectedHospitalRef.current = null;
          setSelectedHospital(null);
          map.setCenter(center);
          map.setZoom(Math.min(map.getZoom() + 3, 18));
        });

        hospitalMarkersRef.current.push(marker);
      });
    }, [clearMarkers, setSelectedHospital]);

    const handleSearchHospitals = useCallback(
      async ({ reset = true, overrideFilterState } = {}) => {
        if (!mapInstance.current) return;
        if (
          !reset &&
          (!searchStateRef.current.hasNext || searchStateRef.current.isLoading)
        ) {
          return;
        }

        const activeFilterState = overrideFilterState ?? filterState;
        const boundsPayload =
          reset || !searchStateRef.current.bounds
            ? getBoundsPayload(mapInstance.current)
            : searchStateRef.current.bounds;
        const requestId = ++requestSeqRef.current;

        searchStateRef.current.isLoading = true;

        if (reset) {
          searchStateRef.current.cursor = null;
          searchStateRef.current.hasNext = false;
          setPaging({
            hasNext: false,
            isLoadingMore: false,
          });
        } else {
          setPaging((prev) => ({ ...prev, isLoadingMore: true }));
        }

        const pagination = reset
          ? { size: HOSPITAL_PAGE_SIZE }
          : {
              size: HOSPITAL_PAGE_SIZE,
              ...(searchStateRef.current.cursor ?? {}),
            };

        try {
          const data = await fetchHospitalsByLocation(
            boundsPayload,
            activeFilterState,
            pagination
          );

          if (requestSeqRef.current !== requestId) return;

          const nextList = Array.isArray(data?.list) ? data.list : [];
          const nextCursor = extractCursor(data);

          searchStateRef.current.bounds = boundsPayload;
          searchStateRef.current.cursor = nextCursor;
          searchStateRef.current.hasNext = nextCursor.hasNext;

          if (reset) {
            setHospitals(nextList);
          } else {
            setHospitals((prev) => dedupeHospitals(prev, nextList));
          }

          setPaging({
            hasNext: nextCursor.hasNext,
            isLoadingMore: false,
          });
        } catch (err) {
          if (requestSeqRef.current !== requestId) return;

          console.error('병원 검색 실패:', err);
          if (reset) {
            setHospitals([]);
          }

          setPaging((prev) => ({
            ...prev,
            isLoadingMore: false,
            hasNext: reset ? false : prev.hasNext,
          }));
        } finally {
          if (requestSeqRef.current === requestId) {
            searchStateRef.current.isLoading = false;
          }
        }
      },
      [filterState, setHospitals]
    );

    const handleCurrentLocation = useCallback(
      (nextFilterState) => {
        if (!window.naver || !mapInstance.current || !navigator.geolocation)
          return;

        const geoOptions = {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0,
        };

        const baseFilterState = nextFilterState ?? filterState;
        const resetFilterState = {
          ...baseFilterState,
          city: '',
          region: [],
        };

        navigator.geolocation.getCurrentPosition(
          (pos) => {
            const { latitude, longitude } = pos.coords;
            const currentPos = new window.naver.maps.LatLng(
              latitude,
              longitude
            );

            mapInstance.current.setCenter(currentPos);
            mapInstance.current.setZoom(DEFAULT_CURRENT_LOCATION_ZOOM);

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

            setFilterState(resetFilterState);
            handleSearchHospitals({
              reset: true,
              overrideFilterState: resetFilterState,
            });
          },
          (err) => {
            console.error('위치 조회 에러:', err);
            handleSearchHospitals({
              reset: true,
              overrideFilterState: resetFilterState,
            });
          },
          geoOptions
        );
      },
      [filterState, handleSearchHospitals, setFilterState]
    );

    useImperativeHandle(
      ref,
      () => ({
        loadMoreHospitals: () => handleSearchHospitals({ reset: false }),
        refreshHospitals: () => handleSearchHospitals({ reset: true }),
      }),
      [handleSearchHospitals]
    );

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
        addressesToSearch = [city];
        isWholeCity = true;
      }

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
            mapInstance.current.setZoom(isWholeCity ? 10 : 10);
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

          setTimeout(() => handleSearchHospitals({ reset: true }), 500);
        }
      });
    }, [filterState, regionKey, isMapLoaded, handleSearchHospitals]);

    useEffect(() => {
      if (!isMapLoaded || !mapInstance.current) return;
      handleSearchHospitals({ reset: true });
    }, [
      filterState.sort,
      animalKey,
      filterState.isOpen,
      isMapLoaded,
      handleSearchHospitals,
    ]);

    useEffect(() => {
      if (!isMapLoaded || !mapInstance.current) return;
      if (!searchTrigger) return;
      handleSearchHospitals({ reset: true });
    }, [searchTrigger, isMapLoaded, handleSearchHospitals]);

    useEffect(() => {
      const keyId = import.meta.env.VITE_NAVER_MAP_CLIENT_ID;

      if (mapInstance.current) return;

      loadNaverMap(keyId).then((naver) => {
        if (!mapElement.current) return;

        const map = new naver.maps.Map(mapElement.current, {
          center: new naver.maps.LatLng(37.5665851, 126.9782038),
          zoom: DEFAULT_MAP_ZOOM,
          scaleControl: false,
          logoControl: false,
          mapDataControl: false,
          zoomControl: false,
        });

        mapInstance.current = map;

        const clickListener = naver.maps.Event.addListener(map, 'click', () =>
          setSelectedHospital(null)
        );
        const zoomListener = naver.maps.Event.addListener(
          map,
          'zoom_changed',
          () => {
            renderMarkers();
          }
        );
        const idleListener = naver.maps.Event.addListener(map, 'idle', () => {
          renderMarkers();
        });

        mapEventListenersRef.current = [
          clickListener,
          zoomListener,
          idleListener,
        ];

        setIsMapLoaded(true);

        const animalTypeParam = searchParams.get('animalType');

        if (animalTypeParam && !hasProcessedParams.current) {
          const nextFilterState = {
            ...filterState,
            animal: [animalTypeParam],
            city: '',
            region: [],
          };

          setFilterState(nextFilterState);
          handleCurrentLocation(nextFilterState);
          hasProcessedParams.current = true;
        } else {
          handleSearchHospitals({ reset: true });
        }
      });
    }, [
      filterState,
      handleCurrentLocation,
      handleSearchHospitals,
      renderMarkers,
      searchParams,
      setFilterState,
      setSelectedHospital,
    ]);

    useEffect(() => {
      if (!mapInstance.current) return;
      renderMarkers();
    }, [hospitals, selectedHospital, renderMarkers]);

    useEffect(
      () => () => {
        if (mapEventListenersRef.current.length > 0) {
          mapEventListenersRef.current.forEach((listener) => {
            window.naver?.maps?.Event.removeListener(listener);
          });
          mapEventListenersRef.current = [];
        }
        clearMarkers();
      },
      [clearMarkers]
    );

    const handleSearchCurrentLocationClick = useCallback(() => {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: 'search_map_current_location',
        is_first_search: false,
      });

      handleSearchHospitals({ reset: true });
    }, [handleSearchHospitals]);

    return (
      <div className="relative h-full w-full">
        <div
          ref={mapElement}
          className="h-[calc(100dvh-63px-56px)] w-full bg-gray-100"
        />
        <CurrentHospitalBtn onClick={handleSearchCurrentLocationClick} />
        <button
          onClick={() => handleCurrentLocation()}
          className="absolute right-5 bottom-50 z-[1000] active:scale-95"
        >
          <img src={current_location_btn} alt="location" />
        </button>
      </div>
    );
  }
);

const NaverMap = React.memo(
  NaverMapBase,
  (prev, next) =>
    prev.hospitals === next.hospitals &&
    prev.selectedHospital === next.selectedHospital &&
    prev.filterState.city === next.filterState.city &&
    JSON.stringify(prev.filterState.region) ===
      JSON.stringify(next.filterState.region) &&
    JSON.stringify(prev.filterState.animal) ===
      JSON.stringify(next.filterState.animal) &&
    prev.filterState.isOpen === next.filterState.isOpen &&
    prev.filterState.sort === next.filterState.sort &&
    prev.searchTrigger === next.searchTrigger
);

export { NaverMap };
