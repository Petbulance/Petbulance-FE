import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { DefaultHeader } from './DefaultHeader';
import { SearchHeader } from './SearchHeader';

export function HospitalSearchHeader() {
  const navigate = useNavigate();

  const [isSearching, setIsSearching] = useState(false);
  const [keyword, setKeyword] = useState('');

  const inputRef = useRef(null);

  useEffect(() => {
    if (isSearching) inputRef.current?.focus();
  }, [isSearching]);

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
        <DefaultHeader openSearch={openSearch} />
      ) : (
        <SearchHeader
          closeSearch={closeSearch}
          inputRef={inputRef}
          keyword={keyword}
          onChangeKeyword={onChangeKeyword}
        />
      )}
    </header>
  );
}
