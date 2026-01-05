import emptyReview from '@/assets/images/pageImages/emptyReview.svg';

export default function EmptyReview() {
  return (
    <div className="flex h-full flex-col items-center justify-center px-[24px] text-center">
      <div className="mb-6 h-[160px] w-[160px]">
        <img src={emptyReview} className="h-full w-full" alt="후기 없음" />
      </div>

      <p className="mb-[20px] text-[27px] font-semibold text-[#424242]">
        작성한 후기가 없어요.
      </p>

      <p className="text-tertiary mb-6 text-[20px] leading-relaxed">
        펫플러스에서 병원을 찾아 방문하고
        <br />첫 방문 후기를 작성해보세요!
      </p>

      <button className="border-success text-success mt-[72px] w-full rounded-xl border py-3 text-[15px] font-medium">
        병원 후기 보러가기
      </button>
    </div>
  );
}
