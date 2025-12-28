import { createBrowserRouter, Navigate } from 'react-router-dom';

import App from '@/App.jsx';
import AdminPages from '@/pages/admin/AdminPages.jsx';
import AdminLogin from '@/pages/admin/auth/AdminLogin.jsx';

const router = createBrowserRouter([
  // 관리자
  {
    path: '/admin',
    element: <AdminPages />,
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
]);

export default router;
