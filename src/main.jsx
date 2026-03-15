import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

// eslint-disable-next-line import/order
import router from '@/router/index.jsx';

import './index.css';
import { RouterProvider } from 'react-router-dom';
import { Toaster } from 'sonner';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
    <Toaster
      position="bottom-center"
      offset={24}
      style={{ width: '100%', maxWidth: '572px', height: '44px' }}
      toastOptions={{
        style: {
          width: '100%',
          height: '44px',
          background: '#222222E5',
          color: '#ffffff',
          display: 'flex',
          alignItems: 'center',
        },
      }}
      className="!top-auto !right-auto !bottom-6 !left-1/2 h-[44px] w-full max-w-[572px] !translate-x-1/2"
    />
  </StrictMode>
);
