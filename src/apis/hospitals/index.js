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

const appendCursorParams = (params, pagination = {}) => {
  const { size, cursorId, cursorDistance, cursorRating, cursorReviewCount } =
    pagination || {};

  if (size !== undefined) params.size = size;
  if (cursorId !== undefined && cursorId !== null) params.cursorId = cursorId;
  if (cursorDistance !== undefined && cursorDistance !== null) {
    params.cursorDistance = cursorDistance;
  }
  if (cursorRating !== undefined && cursorRating !== null) {
    params.cursorRating = cursorRating;
  }
  if (cursorReviewCount !== undefined && cursorReviewCount !== null) {
    params.cursorReviewCount = cursorReviewCount;
  }
};

export const fetchHospitalsByLocation = async (
  bounds = [],
  filterState,
  pagination = {}
) => {
  try {
    const { city, region, animal, sort, isOpen } = filterState || {};

    console.log('api 병원 조회:', animal, bounds);

    const combinedRegion = formatRegionQuery(city, region);
    const params = {
      bounds: Array.isArray(bounds) ? bounds.join(',') : bounds,
      region: combinedRegion,
      animal:
        Array.isArray(animal) && animal.length > 0
          ? animal.join(',')
          : undefined,
      sortBy: sort,
      openNow: isOpen,
    };

    appendCursorParams(params, pagination);

    const response = await api.get('/hospitals', { params });

    console.log('병원출력:', response.data.data.list);
    return response.data.data;
  } catch (error) {
    console.error('병원 조회 중 오류 발생:', error);
    throw error;
  }
};

export const fetchHospitalsByName = async (
  name,
  filterState,
  pagination = {}
) => {
  try {
    const { city, region, animal, sort, isOpen } = filterState || {};

    const combinedRegion = formatRegionQuery(city, region);
    const params = {
      q: name,
      region: combinedRegion,
      animal:
        Array.isArray(animal) && animal.length > 0
          ? animal.join(',')
          : undefined,
      sortBy: sort,
      openNow: isOpen,
    };

    appendCursorParams(params, pagination);

    const response = await api.get('/hospitals', { params });

    return response.data.data;
  } catch (error) {
    console.error('병원 조회 중 오류 발생:', error);
    throw error;
  }
};
