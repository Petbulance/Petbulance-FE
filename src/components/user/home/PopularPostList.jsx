export default function PopularPostList() {
  return (
    <section>
      <div className="mb-2 flex items-center justify-between">
        <h2 className="text-sm font-semibold">인기 게시글</h2>
        <button className="text-xs text-gray-400">{'>'}</button>
      </div>

      <div className="space-y-2">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="flex items-center justify-between rounded-lg bg-white p-3 shadow-sm"
          >
            <div>
              <p className="text-sm font-medium">
                울집 햄찌 자랑좀 보고가세요ㅎㅎ
              </p>
              <p className="text-xs text-gray-400">
                소형포유류 · 1시간 전 · 조회 212
              </p>
            </div>

            <span className="text-sm font-semibold text-green-500">
              24
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
