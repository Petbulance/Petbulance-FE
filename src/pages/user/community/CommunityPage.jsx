import communityComingSoon from '@/assets/images/pageImages/community-coming-soon.svg';

export default function CommunityPage() {
  return (
    <div className="flex mt-50 flex-col px-6 text-center">
      <div className="flex items-center justify-center">
        <img
          src={communityComingSoon}
          alt="커뮤니티 준비중"
          className="w-40 max-w-full"
        />
      </div>

      <div className="mt-5">
        <h2 className="text-base font-semibold text-tertiary">
          커뮤니티 기능 준비중이에요!
        </h2>

        <p className=" mt-3 text-sm text-tertiary">
          빠른 시일 내에 찾아뵐게요.
        </p>
      </div>
    </div>
  );
}
