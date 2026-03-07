import communityComingSoon from '@/assets/images/pageImages/community-coming-soon.png';

export function CommunityTabTemporary() {
  return (
    <div className="mt-10 flex flex-col px-6 text-center">
      <div className="mt-8">
        <h2 className="text-base font-semibold text-[#2DA969]">
          커뮤니티 기능 준비중이에요!! 테스트중
        </h2>

        <p className="text-tertiary mt-3 text-sm">빠른 시일 내에 찾아뵐게요.</p>
      </div>
      <div className="mt-[10px] flex items-center justify-center">
        <img
          src={communityComingSoon}
          alt="커뮤니티 준비중"
          className="w-full max-w-full"
        />
      </div>
    </div>
  );
}
