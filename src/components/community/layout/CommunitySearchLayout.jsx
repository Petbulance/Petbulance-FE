import { useRef, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

import { SearchHeader } from '@/components/hosiptals/layout/SearchHeader';
import MainFooter from '@/components/user/layout/MainFooter.jsx';

export function CommunitySearchLayout() {
  const navigate = useNavigate();
  const inputRef = useRef(null);
  const [keyword, setKeyword] = useState('');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [isSearchHeaderHidden, setIsSearchHeaderHidden] = useState(false);

  const handleCloseSearch = () => {
    navigate('/index/community');
  };

  const handleConfirm = () => {
    setSearchKeyword(keyword.trim());
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleConfirm();
    }
  };

  return (
    <div className="flex h-full min-h-0 flex-col bg-white">
      {!isSearchHeaderHidden && (
        <SearchHeader
          closeSearch={handleCloseSearch}
          inputRef={inputRef}
          keyword={keyword}
          onChangeKeyword={(event) => setKeyword(event.target.value)}
          onKeyDown={handleKeyDown}
          onConfirm={handleConfirm}
        />
      )}
      <div className="min-h-0 flex-1">
        <Outlet context={{ searchKeyword, setIsSearchHeaderHidden }} />
      </div>
      {!isSearchHeaderHidden && <MainFooter />}
    </div>
  );
}
