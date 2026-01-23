import { useEffect } from 'react';

export function ReceiptPreview({ image, onTimeout }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      if (onTimeout) onTimeout();
    }, 5000);

    return () => clearTimeout(timer);
  }, [image, onTimeout]);

  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center gap-5 bg-black px-10 py-12">
      <div className="z-10 text-[27px] font-semibold text-white">
        인식 중이에요
      </div>

      <div className="relative flex max-h-[70%] w-full flex-1 items-center justify-center">
        <img
          src={image}
          alt="receipt"
          className="h-full w-full object-contain"
        />

        <div className="absolute inset-0 border-[3px] border-[#27BE69]">
          <Corner className="top-4 left-4" />
          <Corner className="top-4 right-4 rotate-90" />
          <Corner className="right-4 bottom-4 rotate-180" />
          <Corner className="bottom-4 left-4 -rotate-90" />
        </div>
      </div>

      <div className="z-10 text-[20px] text-white">
        영수증 테두리를 감지하고 있어요
      </div>
    </div>
  );
}

function Corner({ className }) {
  return (
    <div
      className={`absolute h-12 w-12 border-t-[4px] border-l-[4px] border-[#27BE69] ${className}`}
    />
  );
}
