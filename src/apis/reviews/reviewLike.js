import api from '../api';

export const toggleReviewLike = async (reviewId) => {
  try {
    const response = await api.post(`/receipts/${reviewId}/like`, {});

    return response.data.success;
  } catch (error) {
    console.error('리뷰 좋아요 처리 중 에러 발생:', error);
    throw error;
  }
};

export const cancelReviewLike = async (reviewId) => {
  try {
    const response = await api.delete(`/receipts/${reviewId}/like`);
    return response.data;
  } catch (error) {
    console.error('리뷰 좋아요 취소 중 에러 발생:', error);
    throw error;
  }
};
