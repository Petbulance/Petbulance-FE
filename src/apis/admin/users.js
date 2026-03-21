import api from '@/apis/api.jsx';

export async function fetchAdminUserDetail(userId) {
  const response = await api.get(`/admin/user/${userId}`);
  return response?.data?.data ?? null;
}

export async function reactivateAdminUserCommunity(userId) {
  const response = await api.patch(`/admin/user/reactive/community/${userId}`);
  return response?.data?.data ?? {};
}

export async function reactivateAdminUserReview(userId) {
  const response = await api.patch(`/admin/user/reactive/community/${userId}`);
  return response?.data?.data ?? {};
}

export async function deleteAdminUser(userId) {
  const response = await api.delete(`/admin/user/delete/${userId}`);
  return response?.data?.data ?? null;
}
