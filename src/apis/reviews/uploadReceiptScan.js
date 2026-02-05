import api from '../api';

export const uploadReceiptScan = async (imageFile) => {
  const image = new FormData();

  const token = localStorage.getItem('access_token');
  console.log('토큰:', token);

  image.append('image', imageFile);

  console.log('전송되는 파일 확인:', image.get('image'));

  try {
    const response = await api.post('/receipts', image, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
    });

    console.log('영수증 스캔 성공:', response.data);
    return response.data;
  } catch (error) {
    console.error('영수증 스캔 실패:', error);
  }
};
