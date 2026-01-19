import React from 'react';

export function SelectButton({
  label,
  onClick,
  leftIcon,
  rightIcon,
  isSelected = false,
}) {
  const base =
    'bg-white flex items-center gap-[4px] h-[32px] px-4 rounded-full border whitespace-nowrap transition active:scale-[0.9]';
  const selectedStyle = 'border-[#067DFD] text-[#067DFD] scale-[0.9]';
  const normalStyle = 'border-[#EEEEEE] text-[#222222]';
  const iconColor = isSelected ? '#067DFD' : '#222222';

  return (
    <button
      type="button"
      onClick={onClick}
      className={`${base} ${isSelected ? selectedStyle : normalStyle}`}
    >
      {leftIcon ? (
        <span className="shrink-0">
          {React.cloneElement(leftIcon, { color: iconColor })}
        </span>
      ) : null}
      <span className="text-[16px] font-medium">{label}</span>
      {rightIcon ? (
        <span className="shrink-0">
          {React.cloneElement(rightIcon, { color: iconColor })}
        </span>
      ) : null}
    </button>
  );
}
