export default function NearbyHospitalShortcut() {
  return (
    <div className=" bg-white p-1">
      <button className="flex w-full items-center justify-between">
        <span className="text-sm font-semibold">내 주변 병원 바로가기</span>
        <span className="text-gray-400">{'>'}</span>
      </button>

      <div className="mt-3 flex gap-3 overflow-x-auto">
        {['전체', '소형포유류', '조류', '파충류', '양서류', '어류'].map(
          (item, i) => (
            <div
              key={i}
              className="flex min-w-[64px] flex-col items-center text-xs"
            >
              <div className="mb-1 h-12 w-12 rounded-full bg-gray-100" />
              {item}
            </div>
          )
        )}
      </div>
    </div>
  );
}
