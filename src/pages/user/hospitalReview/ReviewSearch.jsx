import { useState } from 'react';

import { RecentSearchList } from '@/components/reviews/ui/review/RecentSearchList';
import { ReviewFilterBar } from '@/components/reviews/ui/ReviewFilterBar';

export function ReviewSerch() {
  const [recentKeywords, setRecentKeywords] = useState([
    { id: 1, text: '골절' },
    { id: 2, text: '탈구' },
    { id: 3, text: '타박상' },
    { id: 4, text: '햄스터골절' },
  ]);

  // 검색어 삭제 핸들러
  const handleDelete = (id) => {
    setRecentKeywords(recentKeywords.filter((item) => item.id !== id));
  };

  return (
    <div className="relative flex h-full flex-col bg-white pr-3.5 pl-4">
      <ReviewFilterBar />

      <h2 className="mt-25 mb-3 text-[23px] font-semibold text-[#1E1E1E]">
        최근 검색어
      </h2>

      {recentKeywords.length === 0 ? (
        <EmptyRecentSearch />
      ) : (
        <RecentSearchList keywords={recentKeywords} onDelete={handleDelete} />
      )}
    </div>
  );
}
