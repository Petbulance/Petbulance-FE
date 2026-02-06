import api from '../api';

export const uploadReceiptScan = async (imageFile) => {
  const image = new FormData();

  const token = localStorage.getItem('access_token');

  image.append('image', imageFile);

  try {
    const response = await api.post('/receipts', image, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
    });

    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('영수증 스캔 실패:', error);
  }
};
