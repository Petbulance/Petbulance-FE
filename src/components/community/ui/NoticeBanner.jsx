import loudspeaker from '@/assets/images/icons/loudspeaker.svg';

export function NoticeBanner({ notice }) {
  if (!notice) return null;

  const statusLabel =
    notice.noticeStatus === 'EVENT'
      ? '이벤트'
      : notice.noticeStatus === 'NOTICE'
        ? '공지'
        : notice.noticeStatus;

  return (
    <div className="text-4 flex items-center gap-1 bg-[#E6F2FF] px-6 py-2 text-[#616161]">
      <img src={loudspeaker} />
      <p>
        ({statusLabel}) {notice.title}
      </p>
    </div>
  );
}
