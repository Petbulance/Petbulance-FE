import api from '../api';

export const fetchHospitalReviews = async (hospitalId, params = {}) => {
  try {
    const response = await api.get(`/receipts/reviews/${hospitalId}`, {
      params: {
        hospitalId: hospitalId,
        images: params.images,
        sortBy: params.sortBy ?? 'createdAt',
      },
    });

    return response.data.data;
  } catch (error) {
    console.error('리뷰 목록을 불러오는 중 에러 발생:', error);
    throw error;
  }
};

export const getFilteredReceipts = async (params = {}) => {
  const formatRegion = (city, region) => {
    if (!city || city === '전체') return '';

    const cityPrefix = `${city}시`;

    if (Array.isArray(region) && region.length > 0) {
      return region.map((r) => `${cityPrefix}${r}`).join(',');
    }

    if (region) {
      return `${cityPrefix}${region}`;
    }

    return cityPrefix;
  };

  const combinedRegion = formatRegion(params.city, params.region);

  try {
    const response = await api.get('/receipts/filter', {
      params: {
        region: combinedRegion,
        animalType: Array.isArray(params.animal)
          ? params.animal.join(',')
          : params.animal,
        receipt: params.receipt,
        images: params.image,
        sort: params.sort,
      },
    });

    console.log('api 출력:', response.data.data.list);
    return response.data.data.list;
  } catch (error) {
    if (error.response) {
      console.error('서버 에러:', error.response.status, error.response.data);
    } else {
      console.error('필터 목록을 불러오는 중 에러 발생:', error.message);
    }
    throw error;
  }
};

export const fetchReceiptDetail = async (reviewId) => {
  try {
    const response = await api.get(`/receipts/detail/${reviewId}`);

    return response.data.data;
  } catch (error) {
    console.error(`영수증 상세 조회 실패 (ID: ${reviewId}):`, error);
    throw error;
  }
};
