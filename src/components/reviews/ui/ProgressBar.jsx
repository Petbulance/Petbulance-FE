import React from 'react';

export function ProgressBar({ currentStep, totalSteps = 3 }) {
  const steps = Array.from({ length: totalSteps }, (_, i) => i + 1);

  return (
    <div className="mb-8 flex w-full items-center justify-between px-1">
      {steps.map((step, index) => {
        const isLast = index === steps.length - 1;

        const isActive = currentStep >= step;

        const isLineActive = currentStep > step;

        const isCurrent = currentStep === step;

        return (
          <React.Fragment key={step}>
            {/* 원형 노드 */}
            <div
              className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-[2px] transition-colors duration-300 ${
                isActive ? 'border-[#27BE69]' : 'border-[#9E9E9E]'
              }`}
            >
              {isCurrent && (
                <div className="h-[12px] w-[12px] rounded-full bg-[#27BE69]" />
              )}
            </div>

            {/* 연결 선 */}
            {!isLast && (
              <div
                className={`mx-1 h-[2px] flex-1 transition-colors duration-300 ${
                  isLineActive ? 'bg-[#27BE69]' : 'bg-[#9E9E9E]'
                }`}
              />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}
