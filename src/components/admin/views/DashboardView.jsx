import { useEffect, useState } from 'react';

import api from '@/apis/api.jsx';
import { Badge } from '@/components/admin/ui/Badge.jsx';

const getTrendText = (rate, trend) => {
  if (trend === 'UP') return `▲ ${rate}%`;
  if (trend === 'DOWN') return `▼ ${Math.abs(rate)}%`;
  return `- 0%`;
};

const getTrendColor = (trend) => {
  if (trend === 'UP') return 'red';
  if (trend === 'DOWN') return 'blue';
  return 'gray';
};

export default function DashboardView() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await api.get('/admin/dashboard');
        setData(res.data.data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  if (loading || !data) {
    return <div className="text-gray-400">대시보드 불러오는 중...</div>;
  }

  const kpis = [
    {
      label: '서비스 가입자',
      value: data.signUp.todaySignupCount.toLocaleString(),
      change: getTrendText(
        data.signUp.signupChangeRate,
        data.signUp.signupTrend
      ),
      color: getTrendColor(data.signUp.signupTrend),
    },
    {
      label: '병원검색 횟수',
      value: data.hospitalSearch.todayHospitalSearchCount.toLocaleString(),
      change: getTrendText(
        data.hospitalSearch.hospitalSearchChangeRate,
        data.hospitalSearch.hospitalSearchTrend
      ),
      color: getTrendColor(data.hospitalSearch.hospitalSearchTrend),
    },
    {
      label: '후기 작성 수',
      value: data.review.todayReviewCount.toLocaleString(),
      change: getTrendText(
        data.review.reviewChangeRate,
        data.review.reviewTrend
      ),
      color: getTrendColor(data.review.reviewTrend),
    },
    {
      label: '게시글 작성 수',
      value: data.post.todayPostCount.toLocaleString(),
      change: getTrendText(data.post.signupChangeRate, data.post.postTrend),
      color: getTrendColor(data.post.postTrend),
    },
  ];

  return (
    <div className="animate-in fade-in space-y-6 duration-500">
      {/* KPI */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        {kpis.map((kpi, i) => (
          <div
            key={i}
            className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm"
          >
            <p className="mb-1 text-sm text-gray-500">{kpi.label}</p>
            <div className="flex items-end gap-2">
              <h3 className="text-2xl font-bold">{kpi.value}</h3>
              <span className={`text-sm font-semibold text-${kpi.color}-600`}>
                {kpi.change}
              </span>
            </div>
            <p className="mt-1 text-xs text-gray-400">전일 대비</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* 핵심 기능 방문 현황 */}
        <div className="overflow-hidden rounded-xl border bg-white shadow-sm">
          <div className="border-b bg-gray-50/50 p-4">
            <h3 className="font-bold text-gray-700">
              핵심기능 방문 현황 (금일)
            </h3>
          </div>
          <div className="divide-y">
            {[
              {
                name: '병원 검색 방문',
                value: data.visit.hospitalSearchVisitCount,
              },
              {
                name: '후기 작성 방문',
                value: data.visit.reviewWriteVisitCount,
              },
              {
                name: '커뮤니티 방문',
                value: data.visit.communityVisitCount,
              },
            ].map((item, i) => (
              <div key={i} className="flex justify-between p-4">
                <p className="text-sm font-medium">{item.name}</p>
                <p className="font-bold">{item.value.toLocaleString()}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 신고 및 문의 */}
        <div className="overflow-hidden rounded-xl border bg-white shadow-sm">
          <div className="border-b bg-gray-50/50 p-4">
            <h3 className="font-bold text-gray-700">신고 및 문의 대응 현황</h3>
          </div>
          <div className="divide-y">
            {[
              {
                name: '후기 신고',
                total: data.reviewReport.totalCount,
                pending: data.reviewReport.pendingCount,
              },
              {
                name: '커뮤니티 신고',
                total: data.communityReport.totalCount,
                pending: data.communityReport.pendingCount,
              },
              {
                name: '고객센터 문의',
                total: data.qna.totalCount,
                pending: data.qna.pendingCount,
              },
            ].map((item, i) => (
              <div key={i} className="flex items-center p-4">
                <div className="flex-1">
                  <p className="text-sm font-medium">{item.name}</p>
                </div>
                <div className="w-20 text-center font-bold">{item.total}건</div>
                <div className="w-24 text-right">
                  <Badge color="red">미처리 {item.pending}건</Badge>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
