import {
  LayoutDashboard,
  Hospital,
  ClipboardCheck,
  FileText,
  Users,
  Settings,
  MessageSquare,
  MessageSquareQuote, Stethoscope, AlertTriangle, Headphones, Activity, Shield,
} from 'lucide-react';
import React, { useEffect, useState } from 'react';

import CommunityManagementView from '../views/CommunityManagementView';
import ContentView from '../views/ContentView';
import CustomerCenterView from '../views/CustomerCenterView';
import DashboardView from '../views/DashboardView';
import HospitalView from '../views/HospitalView';
import ReviewView from '../views/ReviewView';
import SettingsView from '../views/SettingsView';
import UserManagementView from '../views/UserManagementView';
import ActivityLogs from '../views/ActivityLogs.jsx';
import AdminHeader from './AdminHeader';
import AdminSidebar from './AdminSidebar';

// import '@/admin.css'

export default function AdminLayout() {
  const [currentMenu, setCurrentMenu] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const menuItems = [
    { id: 'dashboard', label: '대시보드', icon: LayoutDashboard },
    { id: 'users', label: '유저 관리', icon: Users },
    { id: 'hospitals', label: '병원 관리', icon: Stethoscope },
    { id: 'reviews', label: '리뷰 관리', icon: MessageSquare },
    { id: 'community', label: '커뮤 관리', icon: AlertTriangle },
    { id: 'cs', label: '고객센터', icon: Headphones },
    { id: 'content', label: '콘텐츠 관리', icon: FileText },
    { id: 'admins', label: '관리자 계정', icon: Shield },
    { id: 'logs', label: '행동 로그', icon: Activity },
  ];

  useEffect(() => {
    document.body.classList.add('admin');
    return () => document.body.classList.remove('admin');
  }, []);

  const renderContent = () => {
    switch (currentMenu) {
      case 'dashboard':
        return <DashboardView />;
      case 'users':
        return <UserManagementView />;
      case 'hospitals':
        return <HospitalView />;
      case 'reviews':
        return <ReviewView />;
      case 'community':
        return <CommunityManagementView />;
      case 'cs':
        return <CustomerCenterView />;
      case 'content':
        return <ContentView />;
      case 'admins':
        return <SettingsView />;
      case 'logs':
        return <ActivityLogs />;
      default:
        return null;
    }
  };

  return (
    <div className="flex h-screen bg-[#F8FAFC] font-sans text-[#1E293B] selection:bg-blue-100">
      <AdminSidebar
        menus={menuItems}
        isOpen={isSidebarOpen}
        currentMenu={currentMenu}
        onChange={setCurrentMenu}
        onToggle={() => setIsSidebarOpen((v) => !v)}
      />

      <main className="flex flex-1 flex-col overflow-hidden">
        <AdminHeader currentMenu={currentMenu} menus={menuItems} />
        <div className="flex-1 overflow-y-auto bg-[#F8FAFC] p-10">
          {renderContent()}
        </div>
      </main>
    </div>
  );
}
