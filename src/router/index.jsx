import { createBrowserRouter } from 'react-router-dom';

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

const router = createBrowserRouter([
  // 관리자
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
  // 서비스
  {
    path: '/*',
    element: <App />,
  },
  {
    path: '/index',
    element: <Home />,
  },
  // 로그인 , 소셜 로그인
  {
    path: '/index/auth/login',
    element: <SocialSignUp />,
  },
  {
    path: '/index/auth/signupcomplete',
    element: <SignupComplete />,
  },
  {
    path: '/auth/kakao/callback',
    element: <KakaoCallback />,
  },
  {
    path: '/auth/google/callback',
    element: <GoogleCallback />,
  },
  {
    path: '/auth/naver/callback',
    element: <NaverCallback />,
  },
]);

export default router;
