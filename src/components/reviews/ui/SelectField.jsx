import { useEffect, useRef, useState } from 'react';

import down_arrow from '@/assets/images/icons/down_arrow2.svg';

export function SelectField({
  label,
  value,
  onChange,
  options,
  placeholder,
  disabled = false,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (selectedValue) => {
    onChange(selectedValue);
    setIsOpen(false);
  };

  const selectedLabel = options.find((opt) => opt.value === value)?.label;

  return (
    <div className="relative mb-6" ref={dropdownRef}>
      <label className="mb-2 block text-[19px] font-medium text-[#424242]">
        {label}
      </label>

      <div
        onClick={() => !disabled && setIsOpen(!isOpen)}
        className={`relative flex w-full cursor-pointer items-center justify-between rounded-[8px] border bg-white px-4 py-[14px] text-[20px] transition-colors ${
          disabled
            ? 'cursor-not-allowed border-[#EEEEEE] bg-[#FAFAFA]'
            : 'border-[#EEEEEE] hover:border-[#BCBCBC]'
        } ${isOpen && !disabled ? 'border-[#2DA969]' : ''} `}
      >
        <span className={value ? 'text-[#424242]' : 'text-[#BDBDBD]'}>
          {selectedLabel || placeholder}
        </span>
        <img
          src={down_arrow}
          alt="arrow"
          className={`transition-transform duration-200 ${
            disabled ? 'opacity-20' : ''
          } ${isOpen ? 'rotate-180' : ''}`}
        />
      </div>

      {isOpen && !disabled && (
        <ul className="custom-scrollbar animate-fadeIn absolute z-50 mt-2 max-h-[220px] w-full overflow-y-auto rounded-[8px] border border-[#EEEEEE] bg-white shadow-lg">
          {options.map((option) => (
            <li
              key={option.value}
              onClick={() => handleSelect(option.value)}
              className={`cursor-pointer px-4 py-3 text-[18px] transition-colors hover:bg-[#F5F5F5] ${
                value === option.value
                  ? 'bg-[#EEEEEE] font-medium text-[#1E1E1E]'
                  : 'text-[#424242]'
              } `}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
