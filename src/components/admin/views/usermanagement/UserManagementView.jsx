import React from 'react';

import UserManagementList from '@/components/admin/views/usermanagement/UserManagementList.jsx';
import UserManagementSearch from '@/components/admin/views/usermanagement/UserManagementSearch.jsx';
import { MOCK_USERS } from '@/components/admin/views/usermanagement/mockData.js';

export default function UserManagement() {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">유저 관리</h2>
      <UserManagementSearch />

      {/* Table */}
      <UserManagementList users={MOCK_USERS} />
    </div>
  );
}
