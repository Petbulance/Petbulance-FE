import api from '../api';

export const postReview = async (formData, receiptChecked) => {
  const {
    hospitalId,
    cost,
    animalType,
    animalDetail,
    ratings,
    images,
    content,
  } = formData;

  const reviewData = {
    title: '병원 후기',
    receiptChecked: receiptChecked,
    hospitalId: Number(hospitalId),
    expertiseRating: Number(ratings.expertise),
    kindnessRating: Number(ratings.kindness),
    facilityRating: Number(ratings.facility),
    totalPrice: Number(cost),
    animalType: animalType?.toUpperCase(),
    receiptItems: [
      {
        name: '진료비',
        price: Number(cost),
      },
    ],
    visitDate: new Date().toISOString().split('T')[0],
    reviewComment: content,
    images: images.map((file) => ({
      filename: file.name,
      contentType: file.type,
    })),
    detailAnimalType: animalDetail,
  };

  try {
    const response = await api.post('/receipts/save/reviews', reviewData);

    console.log('리뷰 등록 성공:', response.data.data.reviewId);
    return response.data.data.reviewId;
  } catch (error) {
    console.error('리뷰 등록 실패:', error);
    throw error;
  }
};
