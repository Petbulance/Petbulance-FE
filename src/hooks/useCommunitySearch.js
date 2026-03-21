import { useEffect, useMemo, useRef, useState } from 'react';
import { toast } from 'sonner';

import {
  deleteAllRecentCommunityKeywords,
  deleteRecentCommunityKeyword,
  fetchRecentCommunityKeywords,
  searchCommunityComments,
  searchCommunityPosts,
} from '@/apis/community/search';
import { ANIMAL_CATEGORY_KO } from '@/data/animalSort';
import {
  COMMENT_SEARCH_TYPE_OPTIONS,
  POST_SEARCH_TYPE_OPTIONS,
} from '@/data/community';

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
  const normalizedKeyword = searchKeyword?.trim() ?? '';
  const [recentKeywords, setRecentKeywords] = useState([]);
  const pendingDeleteTimerRef = useRef(null);
  const pendingDeleteSnapshotRef = useRef(null);
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
  const [postResults, setPostResults] = useState([]);
  const [commentResults, setCommentResults] = useState([]);
  const [isPostLoading, setIsPostLoading] = useState(false);
  const [isCommentLoading, setIsCommentLoading] = useState(false);

  const dropdownGroupRef = useRef(null);
  const searchTypeOptions =
    activeTab === 'post'
      ? POST_SEARCH_TYPE_OPTIONS
      : COMMENT_SEARCH_TYPE_OPTIONS;

  const filteredPosts = useMemo(() => postResults, [postResults]);

  const filteredComments = useMemo(() => commentResults, [commentResults]);

  const currentResults =
    activeTab === 'post' ? filteredPosts : filteredComments;
  const isSearchLoading =
    activeTab === 'post' ? isPostLoading : isCommentLoading;
  const filterLabel = getFilterLabel(
    selectedAnimalFilter,
    selectedCategoryFilter
  );

  const getSortParam = (sortLabel) => {
    if (sortLabel === '최신순') return 'latest';
    if (sortLabel === '인기순') return 'popular';
    if (sortLabel === '댓글순') return 'comment';
    return 'latest';
  };

  const getPostSearchScopeParam = (typeLabel) => {
    if (typeLabel === '글제목+내용') return 'title_content';
    if (typeLabel === '글제목') return 'title';
    if (typeLabel === '글작성자') return 'writer';
    return 'title_content';
  };

  const getCommentSearchScopeParam = (typeLabel) => {
    if (typeLabel === '댓글작성자') return 'writer';
    return 'content';
  };

  const animalTypeByLabel = Object.entries(ANIMAL_CATEGORY_KO).reduce(
    (acc, [key, label]) => {
      acc[label] = key;
      return acc;
    },
    {}
  );
  const topicByLabel = {
    '건강/질병': 'HEALTH',
    '용품/사료': 'SUPPLIES',
    '일상/자랑': 'DAILY',
  };

  const normalizeRecentKeywords = (items = []) => {
    if (!Array.isArray(items)) return [];
    return items
      .map((item) => ({
        id: item?.keywordId,
        keyword: item.keyword,
      }))
      .filter((item) => item.id && item.keyword);
  };

  const normalizeCommentResults = (items = []) => {
    if (!Array.isArray(items)) return [];
    return items.map((item) => ({
      id: item.commentId,
      content: item.commentContent,
      nickname: item.writerNickname,
      date: item.createdAt,
      type: item.type,
      topic: item.topic,
      postTitle: item.postTitle,
      img: item.commentImageUrl,
      createdAt: item.createdAt,
      postId: item.postId,
    }));
  };

  const loadRecentKeywords = async () => {
    const items = await fetchRecentCommunityKeywords();
    setRecentKeywords(normalizeRecentKeywords(items));
  };

  const handleDelete = async (id) => {
    const result = await deleteRecentCommunityKeyword(id);
    if (!result) return;
    setRecentKeywords((prev) => prev.filter((item) => item.id !== id));
  };

  const handleDeleteAll = () => {
    if (pendingDeleteTimerRef.current) {
      clearTimeout(pendingDeleteTimerRef.current);
      pendingDeleteTimerRef.current = null;
      pendingDeleteSnapshotRef.current = null;
    }

    const snapshot = [...recentKeywords];
    pendingDeleteSnapshotRef.current = snapshot;
    setRecentKeywords([]);

    toast('최근 검색어를 전부 삭제했어요', {
      position: 'bottom-center',
      duration: 3000,
      style: {
        width: '100%',
        height: '44px',
        background: '#222222E5',
        color: '#ffffff',
      },
      action: {
        label: '취소',
        onClick: () => {
          toast.dismiss();
          if (pendingDeleteTimerRef.current) {
            clearTimeout(pendingDeleteTimerRef.current);
            pendingDeleteTimerRef.current = null;
          }
          if (pendingDeleteSnapshotRef.current) {
            setRecentKeywords(pendingDeleteSnapshotRef.current);
            pendingDeleteSnapshotRef.current = null;
          }
        },
      },
    });

    pendingDeleteTimerRef.current = setTimeout(async () => {
      pendingDeleteTimerRef.current = null;
      try {
        await deleteAllRecentCommunityKeywords();
        pendingDeleteSnapshotRef.current = null;
      } catch (error) {
        if (pendingDeleteSnapshotRef.current) {
          setRecentKeywords(pendingDeleteSnapshotRef.current);
        }
        pendingDeleteSnapshotRef.current = null;
      }
    }, 3000);
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

  useEffect(() => {
    if (!normalizedKeyword) {
      loadRecentKeywords();
    }
  }, [normalizedKeyword]);

  useEffect(() => {
    if (!normalizedKeyword || activeTab !== 'post') {
      setPostResults([]);
      setIsPostLoading(false);
      return;
    }

    let isCancelled = false;

    const runSearch = async () => {
      setIsPostLoading(true);
      try {
        const typeParam =
          selectedAnimalFilter && selectedAnimalFilter !== '전체'
            ? (animalTypeByLabel[selectedAnimalFilter] ?? selectedAnimalFilter)
            : undefined;
        const topicParam =
          selectedCategoryFilter && selectedCategoryFilter !== '전체'
            ? (topicByLabel[selectedCategoryFilter] ?? selectedCategoryFilter)
            : undefined;

        const data = await searchCommunityPosts({
          type: typeParam,
          topic: topicParam,
          sort: getSortParam(selectedSort),
          pageSize: 20,
          searchKeyword: normalizedKeyword,
          searchScope: getPostSearchScopeParam(selectedType),
        });

        if (isCancelled) return;

        setPostResults(data);
      } catch (error) {
        if (isCancelled) return;
        setPostResults([]);
      } finally {
        if (!isCancelled) {
          setIsPostLoading(false);
        }
      }
    };

    runSearch();

    return () => {
      isCancelled = true;
    };
  }, [
    normalizedKeyword,
    activeTab,
    selectedAnimalFilter,
    selectedCategoryFilter,
    selectedSort,
    selectedType,
  ]);

  useEffect(() => {
    if (!normalizedKeyword || activeTab !== 'comment') {
      setCommentResults([]);
      setIsCommentLoading(false);
      return;
    }

    let isCancelled = false;

    const runSearch = async () => {
      setIsCommentLoading(true);
      try {
        const typeParam =
          selectedAnimalFilter && selectedAnimalFilter !== '전체'
            ? (animalTypeByLabel[selectedAnimalFilter] ?? selectedAnimalFilter)
            : undefined;
        const topicParam =
          selectedCategoryFilter && selectedCategoryFilter !== '전체'
            ? (topicByLabel[selectedCategoryFilter] ?? selectedCategoryFilter)
            : undefined;

        const data = await searchCommunityComments({
          type: typeParam,
          topic: topicParam,
          pageSize: 20,
          searchKeyword: normalizedKeyword,
          searchScope: getCommentSearchScopeParam(selectedType),
        });

        if (isCancelled) return;

        setCommentResults(normalizeCommentResults(data));
      } catch (error) {
        if (isCancelled) return;
        setCommentResults([]);
      } finally {
        if (!isCancelled) {
          setIsCommentLoading(false);
        }
      }
    };

    runSearch();

    return () => {
      isCancelled = true;
    };
  }, [
    normalizedKeyword,
    activeTab,
    selectedAnimalFilter,
    selectedCategoryFilter,
    selectedSort,
    selectedType,
  ]);

  return {
    recentKeywords,
    isSearchLoading,
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
