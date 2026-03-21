import {
  Bullhorn,
  Document,
  Forum,
  Headset,
  Information,
  Login,
  Review,
  Security,
} from '@carbon/icons-react';
import { ChevronRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import notificationIcon from '@/assets/images/icons/NotificationIcon.svg';
import LoginRequiredModal from '@/components/commons/layout/LoginRequiredModal.jsx';
import Spinner from '@/components/commons/Spinner.jsx';
import ProfileSection from '@/components/user/my/ProfileSection.jsx';
import useUserStore from '@/stores/useUserStore.js';

function Group({ title, children }) {
  return (
    <section className="mb-[30px] rounded-xl bg-white">
      <h3 className="px-[24px] py-[8px] text-left text-[18px] font-semibold text-[#1e1e1e]">
        {title}
      </h3>
      <div>{children}</div>
    </section>
  );
}

function Item({
  Icon,
  iconNode,
  label,
  right,
  onClick,
  textClassName = 'text-[#1e1e1e]',
}) {
  return (
    <div
      className="flex h-[48px] cursor-pointer items-center justify-between px-[24px] py-3"
      onClick={onClick}
    >
      <div className="flex items-center gap-3">
        {iconNode}
        {!iconNode && Icon && <Icon className="h-5 w-5 text-black" />}
        <span className={`text-[19px] ${textClassName}`}>{label}</span>
      </div>

      {right ?? <ChevronRight className="h-4 w-4 text-gray-400" />}
    </div>
  );
}

export default function MyPage() {
  const navigate = useNavigate();
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const isLoggedIn = Boolean(localStorage.getItem('access_token'));

  const { profile: myProfile, fetchMyProfile, loading } = useUserStore();

  const requireLogin = (path) => {
    if (!isLoggedIn) {
      setLoginModalOpen(true);
      return;
    }
    navigate(path);
  };

  useEffect(() => {
    if (isLoggedIn && !myProfile) {
      fetchMyProfile();
    }
  }, [isLoggedIn, myProfile, fetchMyProfile]);

  return (
    <>
      {loading && <Spinner fullScreen message="내 정보를 불러오는 중이에요" />}
      <div className="space-y-4 bg-gray-100 px-[24px] py-[44px]">
        {/* 상단 프로필 */}
        <ProfileSection isLoggedIn={isLoggedIn} myProfile={myProfile ?? null} />

        {/* 사용자 설정 */}
        <Group title="사용자 설정">
          <Item
            label="알림 설정"
            iconNode={
              <img src={notificationIcon} className="h-5 w-5" alt="알림 설정" />
            }
            onClick={() => requireLogin('/index/notification/setting')}
          />

          <Item
            Icon={Login}
            label="로그인 계정 관리"
            onClick={() => requireLogin('/index/mypage/loginsetting')}
          />

          <Item
            Icon={Security}
            label="권한"
            onClick={() => requireLogin('/index/mypage/authorization')}
          />
        </Group>

        {/* 작성글 관리 */}
        <Group title="작성글 관리">
          <Item
            Icon={Review}
            label="후기 관리"
            onClick={() => requireLogin('/index/mypage/reviewmanage')}
          />
          <Item
            Icon={Document}
            label="게시글 관리"
            onClick={() => requireLogin('/index/mypage/boardmanage')}
          />
          <Item
            Icon={Forum}
            label="댓글 관리"
            onClick={() => requireLogin('/index/mypage/commentmanage')}
          />
        </Group>

        {/* 고객지원 */}
        <Group title="고객지원">
          <Item
            Icon={Bullhorn}
            label="공지사항"
            onClick={() => navigate('/index/mypage/notice')}
          />
          <Item
            Icon={Headset}
            label="문의 및 고객센터"
            onClick={() => requireLogin('/index/mypage/support')}
          />
          <Item
            Icon={Information}
            label="약관 및 정책"
            onClick={() => navigate('/index/mypage/terms')}
          />
        </Group>
      </div>

      <LoginRequiredModal
        open={loginModalOpen}
        onClose={() => setLoginModalOpen(false)}
        onConfirm={() => {
          setLoginModalOpen(false);
          navigate('/index/auth/login');
        }}
      />
    </>
  );
}
