export function BusinessHoursSection({ hours }) {
  if (!hours) return null;

  return (
    <section className="p-6">
      <h3 className="mb-8 text-[20px] font-semibold text-[#424242]">
        영업 정보
      </h3>

      <div className="grid grid-cols-2 gap-x-10 gap-y-3 text-[18px] leading-5 font-medium text-[#424242]">
        {hours.map((item, index) => (
          <div key={index} className="flex items-center">
            <span
              className={`shrink-0 ${
                item.type === 'sat'
                  ? 'text-[#0265CF]'
                  : item.type === 'hol'
                    ? 'text-[#E74D23]'
                    : 'text-[#9E9E9E]'
              }`}
            >
              {item.day}
            </span>

            <span className="ml-8">{item.time}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
