import api from '../api';

export const deleteReviewApi = async (reviewId) => {
  try {
    const response = await api.delete(`/receipts?ids=${reviewId}`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('리뷰 삭제 API 에러:', error);
    throw error;
  }
};
