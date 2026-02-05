import api from '../api';

export const modifyReview = async (payload) => {
  try {
    const response = await api.put('/receipts/modify', payload);
    return response.data;
  } catch (error) {
    console.error('리뷰 수정 실패:', error);
    throw error;
  }
};
