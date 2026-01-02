import { createBrowserRouter, Navigate } from 'react-router-dom';

import App from '@/App.jsx';
import AdminLogin from '@/pages/admin/auth/AdminLogin.jsx';
import AdminLayout from '@/components/admin/layout/AdminLayout.jsx';
import DashboardView from '@/components/admin/views/DashboardView.jsx';
import UserManagementView from '@/components/admin/views/UserManagementView.jsx';
import HospitalView from '@/components/admin/views/HospitalView.jsx';
import ReviewView from '@/components/admin/views/ReviewView.jsx';
import CommunityManagementView from '@/components/admin/views/CommunityManagementView.jsx';
import CustomerCenterView from '@/components/admin/views/CustomerCenterView.jsx';
import SettingsView from '@/components/admin/views/SettingsView.jsx';
import ActivityLogs from '@/components/admin/views/ActivityLogs.jsx';
import ContentView from '@/components/admin/views/ContentView.jsx';
import SocialSignUp from '@/pages/user/auth/SocialSignUp.jsx';
import SignupComplete from '@/components/user/SignupComplete.jsx';
import KakaoCallback from '@/pages/user/auth/KakaoCallback.jsx';
import GoogleCallback from '@/pages/user/auth/GoogleCallback.jsx';
import NaverCallback from '@/pages/user/auth/NaverCallback.jsx';
import Home from '@/pages/user/Home.jsx';
import CommunityPage from '@/pages/user/community/CommunityPage.jsx';
import MainLayout from '@/components/user/layout/MainLayout.jsx';
import { ServiceBanner } from '@/components/commons/banner/index.jsx';
import { LayoutShell } from '@/components/commons/layout/LayoutShell.jsx';
import MyPage from '@/pages/user/my/MyPage.jsx';
import Hospitals from '@/pages/user/Hospitals.jsx';
import HosptialsReviews from '@/pages/user/HosptialsReviews.jsx';
import ProfileEdit from '@/components/user/my/ProfileEdit.jsx';
import MypageLayout from '@/components/user/layout/MypageLayout.jsx';

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
      },     {
        path: 'hospitals',
        element: (
          <LayoutShell banner={<ServiceBanner />}>
            <MainLayout title="병원 검색">
              <Hospitals />
            </MainLayout>
          </LayoutShell>
        ),
      },
      {
        path: 'reviews',
        element: (
          <LayoutShell banner={<ServiceBanner />}>
            <MainLayout title="병원 후기">
              <HosptialsReviews />
            </MainLayout>
          </LayoutShell>
        ),
      },  {
        path: 'community',
        element: (
          <LayoutShell banner={<ServiceBanner />}>
            <MainLayout title="커뮤니티">
              <CommunityPage />
            </MainLayout>
          </LayoutShell>
        ),
      },
      {
        path: 'mypage',
        element: (
          <LayoutShell banner={<ServiceBanner />}>
            <MainLayout title="마이페이지">
              <MyPage />
            </MainLayout>
          </LayoutShell>
        ),
      }, {
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
        path: '/index/mypage/profile/edit',
        element: <ProfileEdit />,
      },

      {
        path: 'auth/login',
        element: <SocialSignUp />,
      },
      {
        path: 'auth/signupcomplete',
        element: <SignupComplete />,
      },
    ],
  },

  /* ================= OAuth ================= */
  { path: '/auth/kakao/callback', element: <KakaoCallback /> },
  { path: '/auth/google/callback', element: <GoogleCallback /> },
  { path: '/auth/naver/callback', element: <NaverCallback /> },
]);

export default router;
