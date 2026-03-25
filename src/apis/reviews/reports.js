import api from '../api';

export async function createReviewReport({ reviewId, reportReason }) {
  try {
    const response = await api.post('/reports', {
      reportType: 'REVIEW',
      reviewId,
      reportReason,
    });

    return {
      success: true,
      message: response.data?.data?.message,
    };
  } catch (error) {
    return {
      success: false,
      message:
        error?.response?.data?.data?.message || '신고 접수에 실패했습니다.',
      errorClassName: error?.response?.data?.data?.errorClassName,
    };
  }
}
