import { useNavigate } from 'react-router-dom';

export default function ProfileSection({ isLoggedIn, user }) {

  const navigate = useNavigate();

  if (!isLoggedIn) {
    return (
      <section className="rounded-xl bg-white p-4">
        <div className="flex justify-between">
          <div>
            <h1 className="text-sm font-semibold">로그인 해주세요</h1>
            <p className="text-xs text-caption">
              회원가입까지 단 3초!
            </p>
          </div>
          <button className="text-sm font-medium text-[#424242]">
            로그인 하기
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="rounded-xl bg-white p-4">
      <div className="flex items-center justify-between">
        {/* 좌측 프로필 */}
        <div className="flex items-center gap-3">
          <img
            src={user.profileImage}
            alt="프로필"
            className="h-10 w-10 rounded-full object-cover"
          />
          <div>
            <p className="text-sm font-semibold">
              {user.name}
            </p>
            <p className="text-xs text-gray-400">
              {user.email}
            </p>
          </div>
        </div>

        {/* 우측 버튼 */}
        <button
          onClick={() => navigate('/index/mypage/profile/edit')}
          className="rounded-md border border-success px-3 py-1 text-xs font-medium text-success"
        >
          프로필 수정
        </button>
      </div>
    </section>
  );
}
