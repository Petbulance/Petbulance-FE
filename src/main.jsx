import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { Toaster } from 'sonner';

import router from '@/router/index.jsx';
import { initGlobalDebugMode } from '@/utils/gtm';

import './index.css';

initGlobalDebugMode();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
    <Toaster
      position="bottom-center"
      offset={24}
      style={{ width: '100%', maxWidth: '572px', height: '44px' }}
      toastOptions={{ style: { width: '100%', height: '44px' } }}
      className="!top-auto !right-auto !bottom-6 !left-1/2 h-[44px] w-full max-w-[572px] !translate-x-1/2"
    />
  </StrictMode>
);
