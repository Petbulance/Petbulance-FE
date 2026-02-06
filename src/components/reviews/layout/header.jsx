import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { SearchHeader } from '@/components/hosiptals/layout/SearchHeader';

import { HospitalReviewDefaultHeader } from './HospitalReviewDefaultHeader';

export function HospitalReviewHeader({ onSearch }) {
  const navigate = useNavigate();

  const [isSearching, setIsSearching] = useState(false);
  const [keyword, setKeyword] = useState('');

  const inputRef = useRef(null);

  useEffect(() => {
    if (isSearching) inputRef.current?.focus();
  }, [isSearching]);

  const handleSearch = () => {
    if (!keyword.trim()) return;
    onSearch(keyword);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const openSearch = () => {
    setIsSearching(true);
    navigate('search');
  };

  const closeSearch = () => {
    setKeyword('');
    setIsSearching(false);
    navigate(-1);
  };

  const onChangeKeyword = (e) => setKeyword(e.target.value);

  return (
    <header className="sticky top-0 z-50 border-b border-[#E0E0E0] bg-white">
      {!isSearching ? (
        <HospitalReviewDefaultHeader />
      ) : (
        <SearchHeader
          closeSearch={closeSearch}
          inputRef={inputRef}
          keyword={keyword}
          onChangeKeyword={onChangeKeyword}
          onKeyDown={handleKeyDown}
          onConfirm={handleSearch}
        />
      )}
    </header>
  );
}
