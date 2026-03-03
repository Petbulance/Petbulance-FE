import loudspeaker from '@/assets/images/icons/loudspeaker.svg';

export function NoticeBanner() {
  return (
    <div className="text-4 flex items-center gap-1 bg-[#E6F2FF] px-6 py-2 text-[#616161]">
      <img src={loudspeaker} />
      <p>(공지사항) 12/16 02:00~08:00 서비스 점검으로 인한 앱 사용 중단</p>
    </div>
  );
}
