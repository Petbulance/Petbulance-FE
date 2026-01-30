import { useEffect, useState } from 'react';

import {
  fetchRecentKeywords,
  fetchRecentHospitals,
  deleteRecentKeyword,
  deleteRecentHospital,
} from '@/apis/hospitals/searchHistory';

import { SearchSection } from './SearchSection';

export function SearchBody({ onSearchClick }) {
  const [recentKeywords, setRecentKeywords] = useState([]);
  const [recentHospitals, setRecentHospitals] = useState([]);

  // 마운트 시 데이터 조회
  useEffect(() => {
    const loadRecents = async () => {
      const [keywords, hospitals] = await Promise.all([
        fetchRecentKeywords(),
        fetchRecentHospitals(),
      ]);
      console.log('keywords', keywords);

      setRecentKeywords(keywords || []);
      setRecentHospitals(hospitals || []);
    };
    loadRecents();
  }, []);

  // 최근 검색어 삭제 핸들러
  const handleRemoveKeyword = async (id) => {
    const success = await deleteRecentKeyword(id);
    if (success) {
      setRecentKeywords((prev) =>
        prev.filter((item) => (item.keywordId || item.id) !== id)
      );
    }
  };

  // 최근 본 병원 삭제 핸들러
  const handleRemoveHospital = async (id) => {
    const success = await deleteRecentHospital(id);
    if (success) {
      setRecentHospitals((prev) =>
        prev.filter((item) => (item.hospitalId || item.id) !== id)
      );
    }
  };

  return (
    <main className="mt-25 flex-1 bg-white px-6">
      <SearchSection
        title="최근 검색어"
        emptyText="검색 시 자동으로 검색어가 저장돼요"
        items={recentKeywords}
        onRemove={handleRemoveKeyword}
        onItemClick={(item) => onSearchClick(item.keyword)}
      />

      <div className="mt-10" />

      <SearchSection
        title="최근 본 병원"
        emptyText="최근에 찾아본 병원이 없어요"
        items={recentHospitals}
        onRemove={handleRemoveHospital}
      />
    </main>
  );
}
