import api from '@/apis/api.jsx';

export async function fetchNotifications({ lastNotificationId, size } = {}) {
  const response = await api.get('/notifications', {
    params: {
      lastNotificationId: lastNotificationId ?? undefined,
      size: size ?? undefined,
    },
  });

  return (
    response?.data?.data ?? {
      content: [],
      hasNext: false,
      lastNotificationId: null,
    }
  );
}

export async function readAllNotifications() {
  const response = await api.patch('/notifications/read-all');
  return response?.data?.data ?? {};
}

export async function deleteAllNotifications() {
  const response = await api.delete('/notifications');
  return response?.data?.data ?? {};
}
