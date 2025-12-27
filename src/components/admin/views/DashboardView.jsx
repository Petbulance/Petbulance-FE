import React from 'react';

export default function DashboardView() {
  return (
    <div className="animate-in fade-in space-y-6 duration-500">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        {[
          { label: '금일 가입자', value: '124', change: '+12%', color: 'blue' },
          { label: '신규 리뷰 수', value: '45', change: '+5%', color: 'green' },
          {
            label: '커뮤니티 신고',
            value: '5',
            change: '신규 2',
            color: 'red',
          },
          {
            label: '미답변 문의',
            value: '8',
            change: '신규 2',
            color: 'yellow',
          },
        ].map((kpi, i) => (
          <div
            key={i}
            className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm"
          >
            <p className="mb-1 text-sm text-gray-500">{kpi.label}</p>
            <div className="flex items-end justify-between">
              <h3 className="text-2xl font-bold">{kpi.value}</h3>
              <span className={`text-xs font-semibold text-${kpi.color}-600`}>
                {kpi.change}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm lg:col-span-2">
          <div className="flex items-center justify-between border-b border-gray-50 bg-gray-50/50 p-4">
            <h3 className="font-bold text-gray-700">
              검수 및 답변 대기 리스트
            </h3>
            <button className="text-xs text-blue-600 hover:underline">
              전체보기
            </button>
          </div>
          <div className="divide-y divide-gray-100">
            {[
              {
                type: '커뮤니티신고',
                name: '부적절한 게시글 신고',
                time: '2분 전',
                priority: 'high',
              },
              {
                type: '1:1 문의',
                name: '로그인 오류 발생',
                time: '5분 전',
                priority: 'high',
              },
              {
                type: '영수증',
                name: '아크리스 동물병원',
                time: '45분 전',
                priority: 'medium',
              },
            ].map((item, i) => (
              <div
                key={i}
                className="flex items-center justify-between p-4 transition-colors hover:bg-gray-50"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`h-2 w-2 rounded-full ${item.priority === 'high' ? 'bg-red-500' : 'bg-gray-300'}`}
                  />
                  <div>
                    <p className="text-sm font-medium">{item.name}</p>
                    <p className="text-xs text-gray-400">
                      {item.type} · {item.time}
                    </p>
                  </div>
                </div>
                <button className="rounded-md border border-gray-200 bg-gray-50 px-3 py-1 text-xs hover:bg-white">
                  처리
                </button>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
          <h3 className="mb-4 font-bold text-gray-700">서비스 공지 현황</h3>
          <div className="space-y-4">
            <div className="rounded-lg border border-blue-100 bg-blue-50 p-3">
              <p className="text-xs font-bold text-blue-700">
                진행 중인 광고 배너: 3건
              </p>
            </div>
            <div className="rounded-lg border border-gray-100 bg-gray-50 p-3">
              <p className="text-xs font-bold text-gray-700">
                등록된 병원 수: 1,240개
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
