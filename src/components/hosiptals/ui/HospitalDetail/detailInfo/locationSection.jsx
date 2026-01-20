export function LocationSection({ hospitalData }) {
  return (
    <div className="px-6 py-8">
      <h3 className="text-[20px] font-semibold text-[#424242]">병원 위치</h3>
      <p className="mt-2 text-[18px] font-medium text-[#616161]">
        {hospitalData.address}
      </p>

      <div className="my-5 flex h-[280px] w-full items-center justify-center rounded-[13.78px] bg-[#E0E0E0] text-gray-500">
        지도 영역
      </div>

      <button
        type="button"
        className="w-full rounded-[16px] border border-[#E0E0E0] py-[14px] text-[23px] font-medium text-[#616161] active:bg-gray-50"
      >
        병원 길찾기
      </button>
    </div>
  );
}
