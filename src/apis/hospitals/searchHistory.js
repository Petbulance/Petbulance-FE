import api from '../api';

export const fetchRecentKeywords = async () => {
  try {
    const response = await api.get('/recents/hospitals');

    return response.data.data;
  } catch (error) {
    console.error('최근 검색어 조회 실패:', error);
    return [];
  }
};

export const fetchRecentHospitals = async () => {
  try {
    const response = await api.get('/recents/viewed');
    return response.data.data.viewedHospitals;
  } catch (error) {
    console.error('최근 본 병원 조회 실패:', error);
    return [];
  }
};

export const deleteRecentKeyword = async (keywordId) => {
  try {
    await api.delete(`/recents/hospitals/${keywordId}`);
    return true;
  } catch (error) {
    console.error('검색어 삭제 실패:', error);
    return false;
  }
};

export const deleteRecentHospital = async (hospitalId) => {
  try {
    await api.delete(`/recents/viewed/${hospitalId}`);
    return true;
  } catch (error) {
    console.error('최근 병원 삭제 실패:', error);
    return false;
  }
};

export const registerRecentViewedHospital = async (hospitalId) => {
  const id = parseInt(hospitalId, 10);

  try {
    const response = await api.post('/recents/viewed', {
      hospitalId: id,
    });
    return response.data;
  } catch (error) {
    console.error('최근 본 병원 등록 중 에러 발생:', error);
    throw error;
  }
};

export const registerRecentKeyword = async (keyword) => {
  try {
    const response = await api.post('/recents/hospitals', {
      keyword: keyword,
    });
    return response.data;
  } catch (error) {
    console.error('최근 검색어 등록 중 에러 발생:', error);
    throw error;
  }
};
