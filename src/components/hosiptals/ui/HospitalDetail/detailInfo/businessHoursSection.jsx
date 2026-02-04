const DAY_MAP = {
  MON: '월요일',
  TUE: '화요일',
  WED: '수요일',
  THU: '목요일',
  FRI: '금요일',
  SAT: '토요일',
  SUN: '일요일',
  공휴일: '공휴일',
};

export function BusinessHoursSection({ hours }) {
  if (!hours) return null;

  return (
    <section className="border-y-[1.72px] border-[#E0E0E0] p-6">
      <h3 className="mb-8 text-[20px] font-semibold text-[#424242]">
        영업 정보
      </h3>

      <div className="grid grid-cols-2 gap-x-10 gap-y-3 text-[18px] leading-5 font-medium text-[#424242]">
        {hours.map((item, index) => (
          <div key={index} className="flex items-center">
            <span
              className={`shrink-0 ${
                item.day === 'SAT'
                  ? 'text-[#0265CF]'
                  : item.day === 'SUN'
                    ? 'text-[#E74D23]'
                    : item.day === '공휴일'
                      ? 'text-[#E74D23]'
                      : 'text-[#9E9E9E]'
              }`}
            >
              {DAY_MAP[item.day] || item.day}
            </span>

            <span className="ml-8">
              {item.hours === 'CLOSED' ? '휴무' : item.hours}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
