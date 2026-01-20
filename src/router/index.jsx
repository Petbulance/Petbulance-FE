import { createBrowserRouter, Navigate } from 'react-router-dom';

import App from '@/App.jsx';
import AdminLayout from '@/components/admin/layout/AdminLayout.jsx';
import ActivityLogs from '@/components/admin/views/ActivityLogs.jsx';
import CommunityManagementView from '@/components/admin/views/CommunityManagementView.jsx';
import ContentView from '@/components/admin/views/ContentView.jsx';
import CustomerCenterView from '@/components/admin/views/CustomerCenterView.jsx';
import DashboardView from '@/components/admin/views/DashboardView.jsx';
import HospitalView from '@/components/admin/views/HospitalView.jsx';
import ReviewView from '@/components/admin/views/ReviewView.jsx';
import SettingsView from '@/components/admin/views/SettingsView.jsx';
import TermsManage from '@/components/admin/views/TermsManage.jsx';
import UserManagementView from '@/components/admin/views/UserManagementView.jsx';
import { ServiceBanner } from '@/components/commons/banner/index.jsx';
import { LayoutShell } from '@/components/commons/layout/LayoutShell.jsx';
import { HospitalDetailLayout } from '@/components/hosiptals/layout/hospitalDetailLayout';
import MainLayout from '@/components/user/layout/MainLayout.jsx';
import MypageLayout from '@/components/user/layout/MypageLayout.jsx';
import NotiLayout from '@/components/user/layout/NotiLayout.jsx';
import SupportMyInquiry from '@/components/user/my/SupportMyInquiry.jsx';
import SignupComplete from '@/components/user/SignupComplete.jsx';
import AdminLogin from '@/pages/admin/auth/AdminLogin.jsx';
import GoogleCallback from '@/pages/user/auth/GoogleCallback.jsx';
import KakaoCallback from '@/pages/user/auth/KakaoCallback.jsx';
import NaverCallback from '@/pages/user/auth/NaverCallback.jsx';
import SocialSignUp from '@/pages/user/auth/SocialSignUp.jsx';
import CommunityPage from '@/pages/user/community/CommunityPage.jsx';
import Home from '@/pages/user/Home.jsx';
import HosptialsReviews from '@/pages/user/hospitalReview/HosptialsReviews.jsx';
import { ReviewMain } from '@/pages/user/hospitalReview/ReviewMain';
import { ReviewSerch } from '@/pages/user/hospitalReview/ReviewSearch';
import { HospitalDetail } from '@/pages/user/hospitals/HospitalDetail';
import Hospitals from '@/pages/user/hospitals/Hospitals';
import { HospitalSearch } from '@/pages/user/hospitals/HospitalSearch';
import { HospitalsList } from '@/pages/user/hospitals/HospitalsList';
import HospitalsMap from '@/pages/user/hospitals/HospitalsMap';
import Authorization from '@/pages/user/my/Authorization.jsx';
import BoardManage from '@/pages/user/my/BoardManage.jsx';
import LoginSetting from '@/pages/user/my/LoginSetting.jsx';
import MyPage from '@/pages/user/my/MyPage.jsx';
import Notice from '@/pages/user/my/Notice.jsx';
import ProfileEdit from '@/pages/user/my/ProfileEdit.jsx';
import ReviewManage from '@/pages/user/my/ReviewManage.jsx';
import Support from '@/pages/user/my/Support/Support.jsx';
import SupportInquiryDetail from '@/pages/user/my/Support/SupportInquiryDetail.jsx';
import SupportPartnerForm from '@/pages/user/my/Support/SupportPartnerForm.jsx';
import SupportWritePage from '@/pages/user/my/Support/SupportWritePage.jsx';
import TermsDetailPage from '@/pages/user/my/TermsDetailPage.jsx';
import TermsPage from '@/pages/user/my/TermsPage.jsx';
import NoticeDetail from '@/pages/user/notification/NoticeDetail.jsx';
import NotificationPage from '@/pages/user/notification/NotificationPage.jsx';
import NotificationSetting from '@/pages/user/notification/NotificationSetting.jsx';

const router = createBrowserRouter([
  /* ================= 루트 리다이렉트 ================= */
  {
    path: '/',
    element: <Navigate to="/index/home" replace />,
  },
  /* ================= 관리자 ================= */
  {
    path: '/admin',
    element: <AdminLayout />,
    children: [
      { index: true, element: <DashboardView /> },
      { path: 'users', element: <UserManagementView /> },
      { path: 'hospitals', element: <HospitalView /> },
      { path: 'reviews', element: <ReviewView /> },
      { path: 'community', element: <CommunityManagementView /> },
      { path: 'cs', element: <CustomerCenterView /> },
      { path: 'content', element: <ContentView /> },
      { path: 'admins', element: <SettingsView /> },
      { path: 'logs', element: <ActivityLogs /> },
      { path: 'terms', element: <TermsManage /> },
    ],
  },
  {
    path: '/admin/auth/login',
    element: <AdminLogin />,
  },

  /* ================= 사용자 서비스 ================= */
  {
    path: '/index',
    element: <App />, // Provider / Outlet
    children: [
      { index: true, element: <Home /> },

      {
        path: 'home',
        element: (
          <LayoutShell banner={<ServiceBanner />}>
            <MainLayout title="펫뷸런스">
              <Home />
            </MainLayout>
          </LayoutShell>
        ),
      },
      {
        path: 'hospitals',
        element: <Hospitals />,
        children: [
          { index: true, element: <HospitalsMap /> },
          { path: 'list', element: <HospitalsList /> },
          { path: 'search', element: <HospitalSearch /> },
        ],
      },
      {
        path: 'hospitals/detail',
        element: (
          <LayoutShell banner={<ServiceBanner />}>
            <HospitalDetailLayout>
              <HospitalDetail />
            </HospitalDetailLayout>
          </LayoutShell>
        ),
      },
      {
        path: 'reviews',
        element: <HosptialsReviews />,
        children: [
          { index: true, element: <ReviewMain /> },
          { path: 'search', element: <ReviewSerch /> },
        ],
      },
      {
        path: 'community',
        element: (
          <LayoutShell banner={<ServiceBanner />}>
            <MainLayout title="커뮤니티">
              <CommunityPage />
            </MainLayout>
          </LayoutShell>
        ),
      },
      // 마이페이지
      {
        path: 'mypage',
        element: (
          <LayoutShell banner={<ServiceBanner />}>
            <MainLayout title="마이페이지">
              <MyPage />
            </MainLayout>
          </LayoutShell>
        ),
      },
      {
        path: 'mypage/profile/edit',
        element: (
          <LayoutShell banner={<ServiceBanner />}>
            <MypageLayout title="프로필수정">
              <ProfileEdit />
            </MypageLayout>
          </LayoutShell>
        ),
      },
      {
        path: '/index/mypage/authorization',
        element: (
          <LayoutShell banner={<ServiceBanner />}>
            <MypageLayout title="권한" left="true">
              <Authorization />
            </MypageLayout>
          </LayoutShell>
        ),
      },
      {
        path: '/index/mypage/loginsetting',
        element: (
          <LayoutShell banner={<ServiceBanner />}>
            <MypageLayout title="로그인 설정" left="true">
              <LoginSetting />
            </MypageLayout>
          </LayoutShell>
        ),
      },
      {
        path: '/index/mypage/reviewmanage',
        element: (
          <LayoutShell banner={<ServiceBanner />}>
            <MypageLayout title="후기 관리" left="true">
              <ReviewManage />
            </MypageLayout>
          </LayoutShell>
        ),
      },
      {
        path: '/index/mypage/boardmanage',
        element: (
          <LayoutShell banner={<ServiceBanner />}>
            <MypageLayout title="게시글 관리" left="true">
              <BoardManage />
            </MypageLayout>
          </LayoutShell>
        ),
      },
      {
        path: '/index/mypage/commentmanage',
        element: (
          <LayoutShell banner={<ServiceBanner />}>
            <MypageLayout title="댓글 관리" left="true">
              <BoardManage />
            </MypageLayout>
          </LayoutShell>
        ),
      },
      {
        path: '/index/mypage/notice',
        element: (
          <LayoutShell banner={<ServiceBanner />}>
            <MypageLayout title="공지사항" left="true">
              <Notice />
            </MypageLayout>
          </LayoutShell>
        ),
      },
      {
        path: '/index/mypage/notice/:id',
        element: (
          <LayoutShell banner={<ServiceBanner />}>
            <MypageLayout title="공지사항" left="true">
              <NoticeDetail />
            </MypageLayout>
          </LayoutShell>
        ),
      },
      {
        path: '/index/mypage/support',
        element: (
          <LayoutShell banner={<ServiceBanner />}>
            <MypageLayout title="문의 및 고객센터" left="true">
              <Support />
            </MypageLayout>
          </LayoutShell>
        ),
      },
      {
        path: '/index/mypage/support/partner',
        element: (
          <LayoutShell banner={<ServiceBanner />}>
            <MypageLayout title="광고/병원 제휴 문의" left="true">
              <SupportPartnerForm />
            </MypageLayout>
          </LayoutShell>
        ),
      },
      {
        path: '/index/mypage/support/MyInquiry',
        element: (
          <LayoutShell banner={<ServiceBanner />}>
            <MypageLayout title="문의 작성" left="true">
              <SupportMyInquiry />
            </MypageLayout>
          </LayoutShell>
        ),
      },
      {
        path: '/index/mypage/support/myinquiry/detail/:id',
        element: (
          <LayoutShell banner={<ServiceBanner />}>
            <MypageLayout>
              <SupportInquiryDetail />
            </MypageLayout>
          </LayoutShell>
        ),
      },
      {
        path: '/index/mypage/support/myinquiry/modify/:id',
        element: (
          <LayoutShell banner={<ServiceBanner />}>
            <SupportWritePage />
          </LayoutShell>
        ),
      },
      {
        path: '/index/mypage/support/write',
        element: (
          <LayoutShell banner={<ServiceBanner />}>
            <SupportWritePage />
          </LayoutShell>
        ),
      },
      {
        path: '/index/mypage/terms',
        element: (
          <LayoutShell banner={<ServiceBanner />}>
            <MypageLayout title="약관 및 정책" left="true">
              <TermsPage />
            </MypageLayout>
          </LayoutShell>
        ),
      },
      {
        path: '/index/mypage/terms/:id',
        element: (
          <LayoutShell banner={<ServiceBanner />}>
            <MypageLayout title="약관 및 정책" left="true">
              <TermsDetailPage />
            </MypageLayout>
          </LayoutShell>
        ),
      },
      // 로그인 관련
      {
        path: 'auth/login',
        element: (
          <LayoutShell banner={<ServiceBanner />}>
            <SocialSignUp />
          </LayoutShell>
        ),
      },
      {
        path: 'auth/signupcomplete',
        element: <SignupComplete />,
      },
      // 알림
      {
        path: 'notification',
        element: (
          <LayoutShell banner={<ServiceBanner />}>
            <NotiLayout title="알림">
              <NotificationPage />
            </NotiLayout>
          </LayoutShell>
        ),
      },
      {
        path: 'notification/setting',
        element: (
          <LayoutShell banner={<ServiceBanner />}>
            <NotiLayout title="알림 설정">
              <NotificationSetting />
            </NotiLayout>
          </LayoutShell>
        ),
      },
    ],
  },
  // 노티

  /* ================= OAuth ================= */
  { path: '/auth/kakao/callback', element: <KakaoCallback /> },
  { path: '/auth/google/callback', element: <GoogleCallback /> },
  { path: '/auth/naver/callback', element: <NaverCallback /> },
]);

export default router;
