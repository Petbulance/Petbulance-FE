import icon from '@/assets/images/icons/sad_parrot.png';

export function NoSearchResult() {
  return (
    <div className="mt-10 flex flex-col items-center gap-6">
      <img src={icon} alt="icon" className="h-40 w-40" />
      <div className="flex flex-col items-center gap-3 text-center">
        <p className="text-[27px] font-medium text-[#424242]">
          동물사랑병원을 찾을 수 없어요.{' '}
        </p>
        <p className="text-[20px] font-medium text-[#616161]">
          일부 키워드만 다시 입력하시거나,
          <br />
          아래 방법을 이용해보세요.
        </p>
      </div>
    </div>
  );
}
