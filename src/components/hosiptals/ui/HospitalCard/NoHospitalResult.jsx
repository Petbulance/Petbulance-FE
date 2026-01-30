import React from 'react';

export function NoHospitalResult({
  title = '검색된 병원이 없어요.',
  description = '지역 범위를 넓히거나 필터를 조정해주세요.',
}) {
  return (
    <div
      className="flex flex-col items-center justify-center rounded-[16px] bg-white py-[46px]"
      style={{
        boxShadow: `
            0px 2px 3px 0px rgba(0, 0, 0, 0.30), 
            0px 6px 10px 4px rgba(0, 0, 0, 0.15)
          `,
      }}
    >
      <h3 className="mb-3 text-center text-[25px] leading-tight font-medium text-[#1E1E1E]">
        {title}
      </h3>

      <p className="text-center text-[19px] leading-relaxed font-medium text-[#616161]">
        {description}
      </p>
    </div>
  );
}
