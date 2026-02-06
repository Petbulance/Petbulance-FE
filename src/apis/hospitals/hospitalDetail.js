import api from '../api';

export const fetchHospitalDetail = async (hospitalId) => {
  try {
    const response = await api.get(`/hospitals/${hospitalId}`);
    return response.data.data;
  } catch (error) {
    console.error('병원 상세 정보 조회 중 오류 발생:', error);
    throw error;
  }
};
