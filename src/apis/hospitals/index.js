import api from '../api';

export const fetchHospitalsByLocation = async (
  lat,
  lng,
  bounds = [],
  filterState
) => {
  try {
    const { city, region, animal, sort, isOpen } = filterState || {};

    const combinedRegion =
      city && city !== '전체' ? `${city}시${region || ''}` : '';

    const response = await api.get('/hospitals', {
      params: {
        lat: lat,
        lng: lng,
        bounds: Array.isArray(bounds) ? bounds.join(',') : bounds,
        region: combinedRegion,
        species: animal,
        size: 20,
        sortBy: sort,
        openNow: isOpen,
      },
    });

    console.log('병원출력:', response.data.data.list);
    return response.data.data;
  } catch (error) {
    console.error('병원 조회 중 오류 발생:', error);
    throw error;
  }
};

export const fetchHospitalsByName = async (name, filterState) => {
  try {
    const { city, region, animal, sort, isOpen } = filterState || {};

    const combinedRegion =
      city && city !== '전체' ? `${city}시${region || ''}` : '';

    const response = await api.get('/hospitals', {
      params: {
        q: name,
        region: combinedRegion,
        species: animal,
        sortBy: sort,
        openNow: isOpen,
      },
    });

    return response.data.data;
  } catch (error) {
    console.error('병원 조회 중 오류 발생:', error);
    throw error;
  }
};
