import React, { useMemo } from 'react';

export default function Pagination({
                                     page,
                                     totalPages,
                                     onChange,
                                     groupSize = 10,
                                   }) {
  const pageGroupStart =
    Math.floor((page - 1) / groupSize) * groupSize + 1;
  const pageGroupEnd = Math.min(
    pageGroupStart + groupSize - 1,
    totalPages
  );

  const pageNumbers = useMemo(
    () =>
      Array.from(
        { length: pageGroupEnd - pageGroupStart + 1 },
        (_, i) => pageGroupStart + i
      ),
    [pageGroupStart, pageGroupEnd]
  );

  return (
    <div className="flex items-center gap-1 text-sm">
      {/* 이전 페이지 */}
      <button
        onClick={() => onChange(page - 1)}
        disabled={page === 1}
        className="
          rounded-md px-2 py-1
          text-black-500
          hover:bg-blue-50
          disabled:opacity-30
          transition
        "
      >
        {'<'}
      </button>

      {pageNumbers.map((num) => (
        <button
          key={num}
          onClick={() => onChange(num)}
          className={`
            rounded-md px-3 py-1.5 transition
            ${
            num === page
              ? 'bg-blue-600 text-white'
              : 'text-gray-600 hover:bg-gray-100'
          }
          `}
        >
          {num}
        </button>
      ))}

      {/* 다음 페이지 */}
      <button
        onClick={() => onChange(page + 1)}
        disabled={page === totalPages}
        className="
          rounded-md px-2 py-1
          text-black-500
          hover:bg-blue-50
          disabled:opacity-30
          transition
        "
      >
        {'>'}
      </button>
    </div>
  );
}
