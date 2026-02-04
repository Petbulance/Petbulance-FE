import { createBrowserRouter, Navigate } from 'react-router-dom';

/* ================= 도메인 판별 ================= */
// const isAdminDomain = window.location.hostname.startsWith('localhost');
const isAdminDomain = window.location.hostname.startsWith('admin.');
const isServiceDomain = !isAdminDomain;

/* ================= 공통 ================= */
import App from '@/App.jsx';
/* ================= 관리자 ================= */
import AdminLayout from '@/components/admin/layout/AdminLayout.jsx';
import ActivityLogs from '@/components/admin/views/ActivityLogs.jsx';
import CommunityManagementView from '@/components/admin/views/CommunityManagementView.jsx';
import ContentCreate from '@/components/admin/views/Content/ContentCreate.jsx';
import ContentModify from '@/components/admin/views/Content/ContentModify.jsx';
import ContentView from '@/components/admin/views/Content/ContentView.jsx';
import CustomerCenterDetail from '@/components/admin/views/CustomerCenter/CustomerCenterDetail.jsx';
import CustomerCenterView from '@/components/admin/views/CustomerCenter/CustomerCenterView.jsx';
import DashboardView from '@/components/admin/views/DashboardView.jsx';
import HospitalCreate from '@/components/admin/views/Hosptial/HospitalCreate.jsx';
import HospitalView from '@/components/admin/views/Hosptial/HospitalView.jsx';
import ReviewDetail from '@/components/admin/views/Review/ReviewDetail.jsx';
import ReviewView from '@/components/admin/views/Review/ReviewView.jsx';
import SettingsView from '@/components/admin/views/SettingsView.jsx';
import TermsCreate from '@/components/admin/views/terms/TermsCreate.jsx';
import TermsManage from '@/components/admin/views/terms/TermsManage.jsx';
import TermsModify from '@/components/admin/views/terms/TermsModify.jsx';
import UserManagementDetail from '@/components/admin/views/usermanagement/UserManagementDetail.jsx';
import UserManagementView from '@/components/admin/views/usermanagement/UserManagementView.jsx';
import { ServiceBanner } from '@/components/commons/banner/index.jsx';
import { LayoutShell } from '@/components/commons/layout/LayoutShell.jsx';
import { HospitalDetailLayout } from '@/components/hosiptals/layout/hospitalDetailLayout';
import MainLayout from '@/components/user/layout/MainLayout.jsx';
import MypageLayout from '@/components/user/layout/MypageLayout.jsx';
import NotiLayout from '@/components/user/layout/NotiLayout.jsx';
import SupportMyInquiry from '@/components/user/my/SupportMyInquiry.jsx';
import AdminLogin from '@/pages/admin/auth/AdminLogin.jsx';
import GoogleCallback from '@/pages/user/auth/GoogleCallback.jsx';
import KakaoCallback from '@/pages/user/auth/KakaoCallback.jsx';
import NaverCallback from '@/pages/user/auth/NaverCallback.jsx';
import SignupComplete from '@/pages/user/auth/SignupComplete.jsx';
import SocialSignUp from '@/pages/user/auth/SocialSignUp.jsx';
import CommunityPage from '@/pages/user/community/CommunityPage.jsx';
import Home from '@/pages/user/Home.jsx';
import { EditReview } from '@/pages/user/hospitalReview/EditReview';
import HosptialsReviews from '@/pages/user/hospitalReview/HosptialsReviews.jsx';
import ReviewDetailPage from '@/pages/user/hospitalReview/ReviewDetailPage';
import { ReviewMain } from '@/pages/user/hospitalReview/ReviewMain';
import { ReviewSerch } from '@/pages/user/hospitalReview/ReviewSearch';
import { WriteReview } from '@/pages/user/hospitalReview/WriteReview';
import { HospitalDetail } from '@/pages/user/hospitals/HospitalDetail.jsx';
import Hospitals from '@/pages/user/hospitals/Hospitals';
import { HospitalSearch } from '@/pages/user/hospitals/HospitalSearch';
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
import NotFoundPage from '@/pages/user/NotFoundPage.jsx';
import NoticeDetail from '@/pages/user/notification/NoticeDetail.jsx';
import NotificationPage from '@/pages/user/notification/NotificationPage.jsx';
import NotificationSetting from '@/pages/user/notification/NotificationSetting.jsx';

const router = createBrowserRouter([
  /* ================= 루트 ================= */
  {
    path: '/',
    element: <Navigate to="/index/home" replace />,
  },
  /* ================= 관리자 ================= */
  {
    path: '/admin',
    element: isAdminDomain ? <AdminLayout /> : <Navigate to="/" replace />,
    children: [
      { index: true, element: <DashboardView /> },
      { path: 'users', element: <UserManagementView /> },
      { path: 'users/:id', element: <UserManagementDetail /> },
      { path: 'hospitals', element: <HospitalView /> },
      { path: 'hospitals/create', element: <HospitalCreate /> },
      { path: 'reviews', element: <ReviewView /> },
      { path: 'reviews/:id', element: <ReviewDetail /> },
      { path: 'community', element: <CommunityManagementView /> },
      { path: 'cs', element: <CustomerCenterView /> },
      { path: 'cs/:id', element: <CustomerCenterDetail /> },
      { path: 'content', element: <ContentView /> },
      { path: 'content/create', element: <ContentCreate /> },
      { path: 'content/:id', element: <ContentModify /> },
      { path: 'admins', element: <SettingsView /> },
      { path: 'logs', element: <ActivityLogs /> },
      { path: 'terms', element: <TermsManage /> },
      { path: 'terms/create', element: <TermsCreate /> },
      { path: 'terms/:termsType', element: <TermsModify /> },
    ],
  },
  {
    path: '/admin/auth/login',
    element: <AdminLogin />,
  },

  /* ================= 사용자 서비스 ================= */
  {
    path: '/index',
    element: isServiceDomain ? <App /> : <Navigate to="/admin" replace />,
    children: [
      {
        index: true,
        element: <Navigate to="home" replace />,
      },
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
          { path: 'search', element: <HospitalSearch /> },
        ],
      },

      {
        path: 'hospitals/:id',
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
          { path: 'write', element: <WriteReview /> },
          { path: ':reviewId', element: <ReviewDetailPage /> },
          { path: ':reviewId/edit', element: <EditReview /> },
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
        element: (
          <LayoutShell banner={<ServiceBanner />}>
            <SignupComplete />
          </LayoutShell>
        ),
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
  {
    path: '*',
    element: <NotFoundPage />,
  },
]);

export default router;
