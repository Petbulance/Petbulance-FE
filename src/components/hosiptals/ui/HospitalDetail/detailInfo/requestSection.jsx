import info_icon from '@/assets/images/icons/info_icon.svg';
import right_arrow from '@/assets/images/icons/right_arrow.svg';
import { useNavigate } from 'react-router-dom';

export function RequestSection() {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate('/index/mypage/support')}
      className="flex cursor-pointer items-center justify-between px-6 py-8 active:bg-gray-50"
    >
      <div className="flex items-center gap-5">
        <img src={info_icon} alt="info" className="h-10 w-10" />
        <div>
          <p className="text-[23px] font-medium text-[#424242]">
            알고 계신 정보와 다른가요?
          </p>
          <p className="text-[18px] text-[#9E9E9E]">
            잘못된 정보를 알려주시면 빠르게 반영할게요
          </p>
        </div>
      </div>
      <img src={right_arrow} alt="next" />
    </div>
  );
}
