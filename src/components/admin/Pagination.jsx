import React, { useMemo } from 'react';

export default function Pagination({
  page,
  totalPages,
  onChange,
  groupSize = 10,
}) {
  const pageGroupStart = Math.floor((page - 1) / groupSize) * groupSize + 1;
  const pageGroupEnd = Math.min(pageGroupStart + groupSize - 1, totalPages);

  const pageNumbers = useMemo(
    () =>
      Array.from(
        { length: pageGroupEnd - pageGroupStart + 1 },
        (_, i) => pageGroupStart + i
      ),
    [pageGroupStart, pageGroupEnd]
  );

  return (
    <div className="flex items-center gap-1 text-xs">
      {/* 이전 그룹 */}
      <button
        className="rounded border px-3 py-1.5 disabled:opacity-40"
        onClick={() => onChange(Math.max(1, pageGroupStart - 1))}
        disabled={pageGroupStart === 1}
      >
        {'<'}
      </button>

      {pageNumbers.map((num) => (
        <button
          key={num}
          onClick={() => onChange(num)}
          className={`rounded border px-3 py-1.5 transition ${
            num === page
              ? 'border-blue-600 bg-blue-600 text-white'
              : 'hover:bg-white'
          }`}
        >
          {num}
        </button>
      ))}

      {/* 다음 그룹 */}
      <button
        className="rounded border px-3 py-1.5 disabled:opacity-40"
        onClick={() => onChange(Math.min(totalPages, pageGroupEnd + 1))}
        disabled={pageGroupEnd === totalPages}
      >
        {'>'}
      </button>
    </div>
  );
}
