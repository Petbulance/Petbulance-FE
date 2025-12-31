import communityComingSoon from '@/assets/images/pageImages/community-coming-soon.svg';

export default function CommunityPage() {
  return (
    <div className="flex h-full flex-col px-6 text-center">
      <div className="flex mt-50 flex-1 items-center justify-center">
        <img
          src={communityComingSoon}
          alt="커뮤니티 준비중"
          className="w-40 max-w-full"
        />
      </div>

      <div className="mt-10 pb-8">
        <h2 className="mb-2 text-base font-semibold text-tertiary">
          커뮤니티 기능 준비중이에요!
        </h2>

        <p className="text-sm text-tertiary">
          빠른 시일 내에 찾아뵐게요.
        </p>
      </div>
    </div>
  );
}
