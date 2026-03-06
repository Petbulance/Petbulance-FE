import { useNavigate, useOutletContext } from 'react-router-dom';

import { CommentCard } from '@/components/community/ui/CommentCard';
import { CommunityFilterSheet } from '@/components/community/ui/CommunityFilterSheet';
import { CommunityRecentKeywordsSection } from '@/components/community/ui/CommunityRecentKeywordsSection';
import { CommunitySearchEmptyState } from '@/components/community/ui/CommunitySearchEmptyState';
import { CommunitySearchHeader } from '@/components/community/ui/CommunitySearchHeader';
import { PostCard } from '@/components/community/ui/PostCard';
import { WriteButton } from '@/components/community/ui/WriteButton';
import { ANIMAL_FILTER_OPTIONS, TOPIC_FILTERS } from '@/data/community';
import { useCommunitySearch } from '@/hooks/useCommunitySearch';

export function CommunitySearch() {
  const navigate = useNavigate();
  const outletContext = useOutletContext() || {};
  const { searchKeyword, setIsSearchHeaderHidden } = outletContext;

  const isLoading = false;
  const {
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
  } = useCommunitySearch({ searchKeyword, setIsSearchHeaderHidden });

  return (
    <div className="relative flex h-full min-h-0 flex-col bg-white">
      {searchKeyword ? (
        <>
          <CommunitySearchHeader
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            openFilterSheet={openFilterSheet}
            filterLabel={filterLabel}
            dropdownGroupRef={dropdownGroupRef}
            isSortOpen={isSortOpen}
            setIsSortOpen={setIsSortOpen}
            isTypeOpen={isTypeOpen}
            setIsTypeOpen={setIsTypeOpen}
            selectedSort={selectedSort}
            selectedType={selectedType}
            searchTypeOptions={searchTypeOptions}
            setSelectedSort={setSelectedSort}
            setSelectedType={setSelectedType}
          />

          <div className="min-h-0 flex-1 overflow-y-auto">
            {isLoading ? (
              <div className="py-10 text-center text-gray-400">검색 중...</div>
            ) : currentResults.length > 0 ? (
              <section className="bg-white">
                {activeTab === 'post' &&
                  filteredPosts.map((post) => (
                    <PostCard key={post.id} post={post} />
                  ))}
                {activeTab === 'comment' &&
                  filteredComments.map((comment) => (
                    <CommentCard
                      key={comment.id}
                      comment={comment}
                      keyword={searchKeyword}
                    />
                  ))}
              </section>
            ) : (
              <CommunitySearchEmptyState
                searchKeyword={searchKeyword}
                onWriteQuestion={() => navigate('/index/community')}
              />
            )}
          </div>

          {activeTab === 'post' && <WriteButton />}
        </>
      ) : (
        <CommunityRecentKeywordsSection
          recentKeywords={recentKeywords}
          onDeleteAll={handleDeleteAll}
          onDelete={handleDelete}
        />
      )}

      <CommunityFilterSheet
        isOpen={isFilterSheetOpen}
        closeFilterSheet={closeFilterSheet}
        filterTab={filterTab}
        setFilterTab={setFilterTab}
        resetDraftFilters={resetDraftFilters}
        animalFilterOptions={ANIMAL_FILTER_OPTIONS}
        categoryFilterOptions={TOPIC_FILTERS}
        draftAnimalFilter={draftAnimalFilter}
        draftCategoryFilter={draftCategoryFilter}
        setDraftAnimalFilter={setDraftAnimalFilter}
        setDraftCategoryFilter={setDraftCategoryFilter}
        applyDraftFilters={applyDraftFilters}
      />
    </div>
  );
}
