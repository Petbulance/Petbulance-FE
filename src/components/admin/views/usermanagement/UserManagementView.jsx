import React, { useEffect, useState } from 'react';

import api from '@/apis/api.jsx';
import { MOCK_USERS } from '@/components/admin/views/usermanagement/mockData.js';
import UserManagementList from '@/components/admin/views/usermanagement/UserManagementList.jsx';
import UserManagementSearch from '@/components/admin/views/usermanagement/UserManagementSearch.jsx';

export default function UserManagement() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await api.get('/admin/user/search');
        setUsers(response.data.data.content);
        console.log(response.data.data.content);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUsers();
  }, []);
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">유저 관리</h2>
      <UserManagementSearch />

      {/* Table */}
      <UserManagementList users={users} />
    </div>
  );
}
