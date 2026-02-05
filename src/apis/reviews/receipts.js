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
  const combinedRegion =
    params.city && params.city !== '전체'
      ? `${params.city}시${params.region || ''}`
      : '';

  try {
    const response = await api.get('/receipts/filter', {
      params: {
        region: combinedRegion,
        animalType: params.animal,
        receipt: params.receipt,
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
