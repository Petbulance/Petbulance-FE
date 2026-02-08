import api from '../api';

const formatRegionQuery = (city, region) => {
  if (!city || city === '전체') return undefined;

  const cityPrefix = `${city}시`;

  if (Array.isArray(region) && region.length > 0) {
    return region.map((r) => `${cityPrefix}${r}`).join(',');
  }

  if (region) {
    return `${cityPrefix}${region}`;
  }
  return cityPrefix;
};

export const fetchHospitalsByLocation = async (bounds = [], filterState) => {
  try {
    const { city, region, animal, sort, isOpen } = filterState || {};

    console.log('api 병원 조회:', animal, bounds);

    const combinedRegion = formatRegionQuery(city, region);

    const response = await api.get('/hospitals', {
      params: {
        bounds: Array.isArray(bounds) ? bounds.join(',') : bounds,
        region: combinedRegion,
        animal:
          Array.isArray(animal) && animal.length > 0
            ? animal.join(',')
            : undefined,
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

    const combinedRegion = formatRegionQuery(city, region);

    const response = await api.get('/hospitals', {
      params: {
        q: name,
        region: combinedRegion,
        animal:
          Array.isArray(animal) && animal.length > 0
            ? animal.join(',')
            : undefined,
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
