import {
  LayoutDashboard,
  Hospital,
  ClipboardCheck,
  FileText,
  Users,
  Settings,
  MessageSquare,
  MessageSquareQuote,
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

import AdminHeader from './AdminHeader';
import AdminSidebar from './AdminSidebar';

export default function AdminLayout() {
  const [currentMenu, setCurrentMenu] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const menuItems = [
    { id: 'dashboard', label: '대시보드', icon: LayoutDashboard },
    { id: 'users', label: '유저 관리', icon: Users },
    { id: 'hospital', label: '병원 관리', icon: Hospital },
    { id: 'review', label: '리뷰 검수', icon: ClipboardCheck },
    { id: 'community', label: '커뮤니티 관리', icon: MessageSquareQuote },
    { id: 'customer', label: '고객 센터', icon: MessageSquare },
    { id: 'content', label: '콘텐츠 관리', icon: FileText },
    { id: 'settings', label: '시스템 설정', icon: Settings },
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
      case 'hospital':
        return <HospitalView />;
      case 'review':
        return <ReviewView />;
      case 'community':
        return <CommunityManagementView />;
      case 'customer':
        return <CustomerCenterView />;
      case 'content':
        return <ContentView />;
      case 'settings':
        return <SettingsView />;
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
