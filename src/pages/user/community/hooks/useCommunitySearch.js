import { useEffect, useMemo, useRef, useState } from 'react';

import {
  COMMENT_SEARCH_TYPE_OPTIONS,
  POST_SEARCH_TYPE_OPTIONS,
} from '@/data/community';
import {
  INITIAL_RECENT_KEYWORDS,
  MOCK_COMMENT_RESULTS,
  MOCK_POST_RESULTS,
} from '@/pages/user/community/communitySearch.constants';

function filterMatches(
  { animal, category },
  selectedAnimalFilter,
  selectedCategoryFilter
) {
  const animalMatched =
    !selectedAnimalFilter ||
    selectedAnimalFilter === '전체' ||
    animal === selectedAnimalFilter;
  const categoryMatched =
    !selectedCategoryFilter ||
    selectedCategoryFilter === '전체' ||
    category === selectedCategoryFilter;

  return animalMatched && categoryMatched;
}

function getFilterLabel(selectedAnimalFilter, selectedCategoryFilter) {
  const animalLabel =
    selectedAnimalFilter && selectedAnimalFilter !== '전체'
      ? selectedAnimalFilter
      : '';
  const categoryLabel =
    selectedCategoryFilter && selectedCategoryFilter !== '전체'
      ? selectedCategoryFilter
      : '';

  if (animalLabel && categoryLabel) {
    return `${animalLabel},${categoryLabel}`;
  }

  return animalLabel || categoryLabel || '필터';
}

export function useCommunitySearch({ searchKeyword, setIsSearchHeaderHidden }) {
  const [recentKeywords, setRecentKeywords] = useState(INITIAL_RECENT_KEYWORDS);
  const [activeTab, setActiveTab] = useState('post');
  const [selectedSort, setSelectedSort] = useState('최신순');
  const [selectedType, setSelectedType] = useState('글제목+내용');
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [isTypeOpen, setIsTypeOpen] = useState(false);
  const [isFilterSheetOpen, setIsFilterSheetOpen] = useState(false);
  const [filterTab, setFilterTab] = useState('animal');
  const [selectedAnimalFilter, setSelectedAnimalFilter] = useState('');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState('');
  const [draftAnimalFilter, setDraftAnimalFilter] = useState('');
  const [draftCategoryFilter, setDraftCategoryFilter] = useState('');

  const dropdownGroupRef = useRef(null);
  const searchTypeOptions =
    activeTab === 'post'
      ? POST_SEARCH_TYPE_OPTIONS
      : COMMENT_SEARCH_TYPE_OPTIONS;

  const filteredPosts = useMemo(() => {
    if (!searchKeyword) {
      return [];
    }

    const keyword = searchKeyword.toLowerCase();
    return MOCK_POST_RESULTS.filter((post) => {
      if (!filterMatches(post, selectedAnimalFilter, selectedCategoryFilter)) {
        return false;
      }

      const merged = `${post.title} ${post.content}`.toLowerCase();
      return merged.includes(keyword);
    });
  }, [searchKeyword, selectedAnimalFilter, selectedCategoryFilter]);

  const filteredComments = useMemo(() => {
    if (!searchKeyword) {
      return [];
    }

    const keyword = searchKeyword.toLowerCase();
    return MOCK_COMMENT_RESULTS.filter((comment) => {
      if (
        !filterMatches(comment, selectedAnimalFilter, selectedCategoryFilter)
      ) {
        return false;
      }

      const merged =
        `${comment.content} ${comment.postTitle} ${comment.nickname}`.toLowerCase();
      return merged.includes(keyword);
    });
  }, [searchKeyword, selectedAnimalFilter, selectedCategoryFilter]);

  const currentResults =
    activeTab === 'post' ? filteredPosts : filteredComments;
  const filterLabel = getFilterLabel(
    selectedAnimalFilter,
    selectedCategoryFilter
  );

  const handleDelete = (id) => {
    setRecentKeywords((prev) => prev.filter((item) => item.id !== id));
  };

  const handleDeleteAll = () => {
    setRecentKeywords([]);
  };

  const openFilterSheet = () => {
    setDraftAnimalFilter(selectedAnimalFilter);
    setDraftCategoryFilter(selectedCategoryFilter);
    setFilterTab('animal');
    setIsFilterSheetOpen(true);
  };

  const closeFilterSheet = () => {
    setIsFilterSheetOpen(false);
  };

  const resetDraftFilters = () => {
    setDraftAnimalFilter('');
    setDraftCategoryFilter('');
  };

  const applyDraftFilters = () => {
    setSelectedAnimalFilter(draftAnimalFilter);
    setSelectedCategoryFilter(draftCategoryFilter);
    setIsFilterSheetOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!dropdownGroupRef.current?.contains(event.target)) {
        setIsSortOpen(false);
        setIsTypeOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (!isFilterSheetOpen) {
      return undefined;
    }

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [isFilterSheetOpen]);

  useEffect(() => {
    setIsSearchHeaderHidden?.(isFilterSheetOpen);

    return () => {
      setIsSearchHeaderHidden?.(false);
    };
  }, [isFilterSheetOpen, setIsSearchHeaderHidden]);

  useEffect(() => {
    const defaultType = activeTab === 'post' ? '글제목+내용' : '댓글내용';
    if (!searchTypeOptions.includes(selectedType)) {
      setSelectedType(defaultType);
    }
  }, [activeTab, searchTypeOptions, selectedType]);

  return {
    recentKeywords,
    activeTab,
    selectedSort,
    selectedType,
    isSortOpen,
    isTypeOpen,
    isFilterSheetOpen,
    filterTab,
    draftAnimalFilter,
    draftCategoryFilter,
    dropdownGroupRef,
    searchTypeOptions,
    filteredPosts,
    filteredComments,
    currentResults,
    filterLabel,
    setActiveTab,
    setSelectedSort,
    setSelectedType,
    setIsSortOpen,
    setIsTypeOpen,
    setFilterTab,
    setDraftAnimalFilter,
    setDraftCategoryFilter,
    handleDelete,
    handleDeleteAll,
    openFilterSheet,
    closeFilterSheet,
    resetDraftFilters,
    applyDraftFilters,
  };
}
