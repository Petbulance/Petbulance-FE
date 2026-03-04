import emptyHamsterIcon from '@/assets/images/noReviews/noReview_6.png';

export function CommunitySearchEmptyState({ searchKeyword, onWriteQuestion }) {
  return (
    <section className="flex h-full min-h-[60vh] flex-col items-center justify-center px-17">
      <img
        src={emptyHamsterIcon}
        alt="검색 결과 없음"
        className="h-[160px] w-[160px]"
      />
      <p className="mt-6 text-center text-[23px] font-medium text-[#424242]">
        {searchKeyword} 을(를) 찾을 수 없어요.
      </p>
      <p className="mt-5 text-center text-[18px] text-[#616161]">
        다른 단어를 검색해주세요.
      </p>
      <button
        type="button"
        onClick={onWriteQuestion}
        className="mt-11 w-full rounded-[16px] border border-[#2DA969] py-[14px] text-[23px] font-medium text-[#2DA969]"
      >
        질문글 작성하러 가기
      </button>
    </section>
  );
}
