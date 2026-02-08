import {
  Activity,
  AlertTriangle,
  FileText,
  Headphones,
  LayoutDashboard,
  MessageSquare,
  ScrollText,
  Shield,
  Stethoscope,
  Users,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

import useAdminStore from '@/stores/useAdminStore.js';

import AdminHeader from './AdminHeader';
import AdminSidebar from './AdminSidebar';

export default function AdminLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const clearAdminProfile = useAdminStore((state) => state.clearAdminProfile);

  const menuItems = [
    {
      id: 'dashboard',
      label: '대시보드',
      icon: LayoutDashboard,
      path: '/admin',
    },
    { id: 'users', label: '유저 관리', icon: Users, path: '/admin/users' },
    {
      id: 'hospitals',
      label: '병원 관리',
      icon: Stethoscope,
      path: '/admin/hospitals',
    },
    {
      id: 'reviews',
      label: '리뷰 관리',
      icon: MessageSquare,
      path: '/admin/reviews',
    },
    {
      id: 'community',
      label: '커뮤 관리',
      icon: AlertTriangle,
      path: '/admin/community',
    },
    { id: 'cs', label: '고객센터', icon: Headphones, path: '/admin/cs' },
    {
      id: 'content',
      label: '콘텐츠 관리',
      icon: FileText,
      path: '/admin/content',
    },
    { id: 'terms', label: '약관 관리', icon: ScrollText, path: '/admin/terms' },
    { id: 'admins', label: '관리자 계정', icon: Shield, path: '/admin/admins' },
    { id: 'logs', label: '행동 로그', icon: Activity, path: '/admin/logs' },
  ];

  useEffect(() => {
    document.body.classList.add('admin');
    return () => document.body.classList.remove('admin');
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    if (!token) {
      clearAdminProfile();
      navigate('/admin/auth/login', { replace: true });
    }
  }, [clearAdminProfile, navigate, location.pathname]);

  return (
    <div className="flex h-screen bg-[#F8FAFC] text-[#1E293B]">
      <AdminSidebar
        menus={menuItems}
        isOpen={isSidebarOpen}
        currentPath={location.pathname}
        onChange={(path) => navigate(path)}
        onToggle={() => setIsSidebarOpen((v) => !v)}
      />

      <main className="flex flex-1 flex-col overflow-hidden">
        <AdminHeader menus={menuItems} />
        <div className="flex-1 overflow-y-auto bg-[#F8FAFC] p-10">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
