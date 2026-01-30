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
