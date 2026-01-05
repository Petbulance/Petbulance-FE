import { Badge } from '@/components/admin/ui/Badge.jsx';

export default function DashboardView() {
  return (
    <div className="animate-in fade-in space-y-6 duration-500">
      {/*todo 컴포넌트화 해야함*/}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        {[
          {
            label: '서비스 가입자',
            value: '1,240',
            change: '▲ 12.5%',
            color: 'red',
          },
          {
            label: '병원검색 횟수',
            value: '3,500',
            change: '▲ 5.2%',
            color: 'red',
          },
          {
            label: '후기 작성 수',
            value: '45',
            change: '▼ 2.1%',
            color: 'blue',
          },
          {
            label: '게시글 작성 수',
            value: '120',
            change: '▲ 8.4%',
            color: 'red',
          },
        ].map((kpi, i) => (
          <div
            key={i}
            className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm"
          >
            {/* label */}
            <p className="mb-1 text-sm text-gray-500">{kpi.label}</p>

            {/* value + change (같은 줄) */}
            <div className="flex items-end gap-2">
              <h3 className="text-2xl font-bold">{kpi.value}</h3>
              <span className={`text-sm font-semibold text-${kpi.color}-600`}>
                {kpi.change}
              </span>
            </div>

            {/* 전일대비 */}
            <p className="mt-1 text-xs text-gray-400">전일 대비</p>
          </div>
        ))}
      </div>
      {/*todo 컴포넌트 해야함*/}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/*핵심 기능 방문현황*/}
        <div className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-gray-50 bg-gray-50/50 p-4">
            <h3 className="font-bold text-gray-700">
              핵심기능 방문 현황 (금일)
            </h3>
            {/*<button className="text-xs text-blue-600 hover:underline">*/}
            {/*  전체보기*/}
            {/*</button>*/}
          </div>
          <div className="divide-y divide-gray-100">
            {[
              {
                name: '부적절한 게시글 신고',
                time: '2분 전',
                priority: 'high',
                value: '5,200',
              },
              {
                name: '로그인 오류 발생',
                time: '5분 전',
                priority: 'high',
                value: '890',
              },
              {
                name: '아크리스 동물병원',
                time: '45분 전',
                priority: 'medium',
                value: '3,100',
              },
            ].map((item, i) => (
              <div
                key={i}
                className="flex items-center justify-between p-4 transition-colors hover:bg-gray-50"
              >
                <div className="flex items-center gap-3">
                  <div>
                    <p className="text-sm font-medium">{item.name}</p>
                  </div>
                </div>
                <p className="font-bold"> {item.value}</p>
              </div>
            ))}
          </div>
        </div>
        {/*신고 및 문의 대응 현황*/}
        <div className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-gray-50 bg-gray-50/50 p-4">
            <h3 className="font-bold text-gray-700">신고 및 문의 대응 현황</h3>
          </div>
          <div className="divide-y divide-gray-100">
            {[
              { name: '후기 신고', value: '3', unprocessed: 1 },
              { name: '커뮤니티 신고', value: '12', unprocessed: 4 },
              { name: '고객센터 문의', value: '25', unprocessed: 8 },
            ].map((item, i) => (
              <div
                key={i}
                className="flex items-center p-4 transition-colors hover:bg-gray-50"
              >
                {/* 왼쪽: 이름 */}
                <div className="flex-1">
                  <p className="text-sm font-medium">{item.name}</p>
                </div>

                {/* 가운데: 건수 */}
                <div className="w-20 text-center">
                  <p className="font-bold">{item.value}건</p>
                </div>

                {/* 오른쪽: 미처리 */}
                <div className="w-20 text-right">
                  <Badge color="red">미처리 {item.unprocessed}건</Badge>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
