import api from '../api';

const REVIEW_IMAGE_CONFIRM_ENDPOINT = '/receipts/save/success';

const uploadFileToS3 = async (file, presignedUrl) => {
  const response = await fetch(presignedUrl, {
    method: 'PUT',
    headers: {
      'Content-Type': file.type || 'application/octet-stream',
    },
    body: file,
  });

  if (!response.ok) {
    throw new Error(
      `S3 업로드 실패: ${response.status} ${response.statusText || ''}`.trim()
    );
  }
};

const confirmSingleReviewImageUpload = async ({ reviewId, keys }) => {
  if (!Number.isFinite(reviewId) || reviewId <= 0) {
    throw new Error(`유효하지 않은 reviewId 입니다: ${reviewId}`);
  }

  const response = await api.post(REVIEW_IMAGE_CONFIRM_ENDPOINT, {
    reviewId: reviewId,
    type: 'NEW',
    keys,
  });
  return response.data;
};

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

  const imageFiles = (Array.isArray(images) ? images : [])
    .filter((file) => file instanceof File)
    .slice(0, 5);

  const normalizedImages = imageFiles
    .filter((file) => file && typeof file.name === 'string')
    .map((file) => ({
      filename: file.name,
      contentType: file.type || 'image/jpeg',
    }));

  const reviewData = {
    title: '병원 후기',
    receiptChecked: Boolean(receiptChecked),
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
    images: normalizedImages,
    detailAnimalType: animalDetail?.toUpperCase(),
  };

  try {
    // 1) 리뷰 저장 + presigned URL 발급
    const response = await api.post('/receipts/save/reviews', reviewData);
    const reviewId = response.data.data.reviewId;

    const urls = Array.isArray(response.data.data.urls)
      ? response.data.data.urls
      : [];

    // 2) presigned URL로 S3 업로드
    if (imageFiles.length > 0) {
      if (urls.length !== imageFiles.length) {
        throw new Error(
          `발급된 presigned URL 수(${urls.length})와 이미지 수(${imageFiles.length})가 다릅니다.`
        );
      }

      for (let i = 0; i < imageFiles.length; i += 1) {
        const file = imageFiles[i];
        const presignedUrl = urls[i]?.presignedUrl;
        if (!presignedUrl) {
          throw new Error('presignedUrl이 누락되었습니다.');
        }
        await uploadFileToS3(file, presignedUrl);
      }

      // 3) 서버에 업로드 완료 알림 (/save/success 재요청)
      const keys = urls.map((item) => item?.saveId).filter(Boolean);
      if (keys.length !== imageFiles.length) {
        throw new Error(
          `saveId 수(${keys.length})와 이미지 수(${imageFiles.length})가 다릅니다.`
        );
      }

      await confirmSingleReviewImageUpload({
        reviewId,
        keys,
      });
    }

    return reviewId;
  } catch (error) {
    console.error(
      '리뷰 등록 실패:',
      error?.response?.status,
      error?.response?.data || error
    );
    throw error;
  }
};
