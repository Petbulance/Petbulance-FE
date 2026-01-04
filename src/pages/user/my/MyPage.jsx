import { ChevronRight } from 'lucide-react';
import notificationIcon from '@/assets/images/icons/NotificationIcon.svg';
import { useNavigate } from 'react-router-dom';
import { Bullhorn, Document, Forum, Headset, Information, Login, Review, Security } from '@carbon/icons-react';
import ProfileSection from '@/components/user/my/ProfileSection.jsx';

function Group({ title, children }) {
  return (
    <section className="rounded-xl bg-white mb-[20px] ">
      <h3 className="px-[24px] py-[8px] text-[18px] font-semibold text-[#1e1e1e] text-left ">
        {title}
      </h3>
      <div>
        {children}
      </div>
    </section>
  );
}
function Item({ Icon, iconNode, label, right, onClick }) {
  return (
    <div
      className="flex cursor-pointer items-center justify-between h-[48px]  px-[24px] py-3"
      onClick={onClick}
    >
      <div className="flex items-center gap-3">
        {iconNode}
        {!iconNode && Icon && (
          <Icon className="h-5 w-5 text-black" />
        )}
        <span className="text-[19px]">{label}</span>
      </div>

      {right ?? (
        <ChevronRight className="h-4 w-4 text-gray-400" />
      )}
    </div>
  );
}

export default function MyPage() {
  const isLoggedIn = true;
  const navigate = useNavigate();
  const user = {
    name: '따뜻한햄스터07',
    email: 'user@example.com',
    profileImage: 'https://picsum.photos/seed/profile/200/200',
  };

  return (
    <div className="space-y-4 bg-gray-100 px-[24px] py-[44px]">
      {/* 상단 프로필 영역 */}
      <ProfileSection
        isLoggedIn={isLoggedIn}
        user={user}
      />

      {/* 사용자 설정 */}
      <Group title="사용자 설정">
        <Item
          label="알림 설정"
          iconNode={
            <img
              src={notificationIcon}
              className="h-5 w-5"
              alt="알림 설정"
            />
          }
          onClick={() =>
            navigate('/index/notification/setting')
          }
        />
        <Item Icon={Login} label="로그인 계정 관리"
              onClick={() =>
                navigate('/index/mypage/loginsetting')
              }/>
        <Item Icon={Security} label="권한" onClick={()=>{
          navigate('/index/mypage/authorization')
        }} />
      </Group>

      <Group title="작성글 관리">
        <Item Icon={Review} label="후기 관리"
              onClick={() =>
                navigate('/index/mypage/reviewmanage')
              }/>
        <Item Icon={Document} label="게시글 관리"
              onClick={() =>
                navigate('/index/mypage/boardmanage')
              }/>
        <Item Icon={Forum} label="댓글 관리"
              onClick={() =>
                navigate('/index/mypage/commentmanage')
              }/>
      </Group>

      <Group title="고객지원">
        <Item Icon={Bullhorn} label="공지사항"
              onClick={() =>
          navigate('/index/mypage/notice')
        } />
        <Item Icon={Headset} label="문의 및 고객센터"
              onClick={() =>
          navigate('/index/mypage/support')
        } />
        <Item Icon={Information} label="약관 및 정책"
              onClick={() =>
                navigate('/index/mypage/terms')
              }/>
      </Group>
    </div>
  );
}

