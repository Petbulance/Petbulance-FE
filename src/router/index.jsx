import { createBrowserRouter } from 'react-router-dom';

import App from '@/App.jsx';
import AdminPages from '@/pages/admin/AdminPages.jsx';

const router = createBrowserRouter([
  // 관리자
  {
    path: '/admin/*',
    element: <AdminPages />,
  },
  // 서비스
  {
    path: '/*',
    element: <App />,
  },
]);

export default router;
