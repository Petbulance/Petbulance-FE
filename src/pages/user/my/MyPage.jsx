import { Bell, ChevronRight } from 'lucide-react';

import { Bullhorn, Document, Forum, Headset, Information, Login, Review, Security,Version } from '@carbon/icons-react';

function Group({ title, children }) {
  return (
    <section className="rounded-xl bg-white ">
      <h3 className="px-4 py-3 text-sm font-semibold text-gray-800 text-left">
        {title}
      </h3>

      <div>
        {children}
      </div>
    </section>
  );
}
function Item({ icon: Icon, label, right }) {
  return (
    <div className="flex items-center justify-between px-4 py-3">
      <div className="flex items-center gap-3">
        {Icon && <Icon className="h-4 w-4 text-gray-600" />}
        <span className="text-sm">{label}</span>
      </div>

      {right ?? <ChevronRight className="h-4 w-4 text-gray-400" />}
    </div>
  );
}

export default function MyPage() {
  return (
    <div className="space-y-4 bg-gray-50 px-4 py-4">
      <section className="rounded-xl bg-white p-4 ">
        <div className="flex justify-between">
          <div>
            <h1 className="text-sm font-semibold">로그인 해주세요</h1>
            <p className="text-xs text-caption">
              회원가입까지 단 3초!
            </p>
          </div>
          <button className="text-sm font-medium text-[#424242] ">
            로그인 하기
          </button>
        </div>
      </section>

      {/* 사용자 설정 */}
      <Group title="사용자 설정">
        <Item icon={Bell} label="알림 설정" />
        <Item icon={Login} label="로그인 계정 관리" />
        <Item icon={Security} label="권한" />
      </Group>

      {/* 작성글 관리 */}
      <Group title="작성글 관리">
        <Item icon={Review} label="후기 관리" />
        <Item icon={Document} label="게시글 관리" />
        <Item icon={Forum} label="댓글 관리" />
      </Group>

      {/* 고객지원 */}
      <Group title="고객지원">
        <Item icon={Bullhorn} label="공지사항" />
        <Item icon={Headset} label="문의 및 고객센터" />
        <Item icon={Information} label="약관 및 정책" />
        {/*<Item icon={Version}
          label="최신버전 업데이트"
          right={
            <span className="text-xs text-green-600 font-medium">
              1.1.0
            </span>
          }
        />*/}
      </Group>
    </div>
  );
}
