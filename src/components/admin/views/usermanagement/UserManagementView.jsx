import React, { useEffect, useState } from 'react';

import api from '@/apis/api.jsx';
import UserManagementList from '@/components/admin/views/usermanagement/UserManagementList.jsx';
import UserManagementSearch from '@/components/admin/views/usermanagement/UserManagementSearch.jsx';

export default function UserManagement() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  // ✅ 검색 조건 state
  const [search, setSearch] = useState({
    keyword: '',
    provider: 'ALL',
    status: 'ALL',
  });

  /* =========================
     API 호출
  ========================= */
  const fetchUsers = async (params = {}) => {
    setLoading(true);
    try {
      const response = await api.get('/admin/user/search', {
        params: {
          usernameOrEmail: params.keyword || '',
          signUpPath: params.provider !== 'ALL' ? params.provider : undefined,
          userStatus: params.status !== 'ALL' ? params.status : undefined,
        },
      });
      setUsers(response.data.data.content || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // 최초 로딩
  useEffect(() => {
    fetchUsers();
  }, []);

  // 검색 버튼 클릭
  const handleSearch = () => {
    fetchUsers(search);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">유저 관리</h2>

      <UserManagementSearch
        search={search}
        onChange={setSearch}
        onSearch={handleSearch}
      />

      <UserManagementList users={users} loading={loading} />
    </div>
  );
}
