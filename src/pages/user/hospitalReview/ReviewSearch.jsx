import { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';

import { getFilteredReceipts } from '@/apis/reviews/receipts';
import { RecentSearchList } from '@/components/reviews/ui/review/RecentSearchList';
import { ReviewFilterBar } from '@/components/reviews/ui/ReviewFilterBar';
import { ReviewContent } from '@/components/reviews/ui/ReviewContent';

export function ReviewSerch() {
  const { searchKeyword } = useOutletContext();

  const [recentKeywords, setRecentKeywords] = useState([
    { id: 1, text: '골절' },
    { id: 2, text: '탈구' },
    { id: 3, text: '타박상' },
    { id: 4, text: '햄스터골절' },
  ]);

  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [localFilter, setLocalFilter] = useState({
    city: '',
    region: '',
    animal: [],
    sort: 'distance',
    isOpen: false,
  });

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (!searchKeyword || searchKeyword.trim() === '') {
        setSearchResults([]);
        return;
      }

      setIsLoading(true);
      try {
        //TODO: api 수정후 검색어 추가하여 수정 필요
        const data = await getFilteredReceipts({
          region: searchKeyword,
          animalType: localFilter.animal[0] || null,
          receipt: false,
          cursorId: null,
          size: 10,
        });

        setSearchResults(data || []);
      } catch (error) {
        console.error('검색 결과 로드 실패:', error);
      } finally {
        setIsLoading(false);
      }
    };

    const timer = setTimeout(() => {
      fetchSearchResults();
    }, 300);

    return () => clearTimeout(timer);
  }, [searchKeyword, localFilter.animal]);

  const handleDelete = (id) => {
    setRecentKeywords(recentKeywords.filter((item) => item.id !== id));
  };

  return (
    <div className="relative flex h-full flex-col bg-white pr-3.5 pl-4">
      {/* 필터바에 상태 전달 */}
      <ReviewFilterBar currentFilters={localFilter} />

      <div className="flex-1 overflow-y-auto">
        {searchKeyword ? (
          <div className="mt-20">
            {isLoading ? (
              <div className="py-10 text-center text-gray-400">검색 중...</div>
            ) : (
              <>
                <ReviewContent data={searchResults} />
                {searchResults.length === 0 && (
                  <div className="py-20 text-center text-gray-400">
                    '{searchKeyword}'에 대한 검색 결과가 없습니다.
                  </div>
                )}
              </>
            )}
          </div>
        ) : (
          <div className="mt-25">
            <h2 className="mb-3 text-[23px] font-semibold text-[#1E1E1E]">
              최근 검색어
            </h2>
            {recentKeywords.length === 0 ? (
              <div className="py-10 text-gray-400">최근 검색어가 없습니다.</div>
            ) : (
              <RecentSearchList
                keywords={recentKeywords}
                onDelete={handleDelete}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
}
