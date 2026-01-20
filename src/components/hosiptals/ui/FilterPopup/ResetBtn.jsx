import init_icon from '@/assets/images/icons/icon-init.svg';

export function ResetBtn({ setSelectedCity, setSelectedRegion }) {
  return (
    <div className="flex justify-end px-5 py-3">
      <button
        type="button"
        className="flex items-center gap-1 text-[16px] text-[#616161] hover:text-gray-800"
        onClick={() => {
          setSelectedCity('');
          setSelectedRegion('');
        }}
      >
        <span>선택 초기화</span>
        <img src={init_icon} alt="init_icon" />
      </button>
    </div>
  );
}
