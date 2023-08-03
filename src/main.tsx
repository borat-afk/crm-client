import { Suspense } from 'react'
import { RouterProvider } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import { Toaster } from 'react-hot-toast';
import './index.css'
import router from './router';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const root = createRoot(document.getElementById('root'));
root.render(
  <Suspense>
    <RouterProvider router={router} />
    <Toaster
      position={'top-right'}
      toastOptions={{
        duration: 6000,
      }}
    />
  </Suspense>
);
