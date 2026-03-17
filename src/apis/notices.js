import api from '@/apis/api.jsx';

export async function fetchNotices({ lastNoticeId, pageSize = 10 } = {}) {
  const response = await api.get('/notices', {
    params: {
      lastNoticeId: lastNoticeId ?? undefined,
      pageSize,
    },
  });

  return response.data?.data ?? {};
}
