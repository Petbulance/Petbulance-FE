import api from '../api';

export const getFilteredReceipts = async ({
  region,
  animalType,
  receipt = false,
  cursorId = null,
  size = 10,
}) => {
  try {
    const response = await api.get('/receipts/filter', {
      params: {
        region: region,
        animalType: animalType,
        receipt: receipt,
        cursorId: cursorId,
        size: size,
      },
    });

    return response.data;
  } catch (error) {
    console.error('리뷰 필터 조회 실패:', error);
    throw error;
  }
};
