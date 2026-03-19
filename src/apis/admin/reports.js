import api from '@/apis/api.jsx';

export async function fetchAdminReports({ page = 1, size = 20 } = {}) {
  const response = await api.get('/admin/reports', {
    params: { page, size },
  });

  return response?.data?.data ?? {};
}

export async function patchAdminReportAction(reportId, actionType) {
  const response = await api.patch(`/admin/reports/${reportId}`, {
    actionType,
  });

  return response?.data?.data ?? {};
}
