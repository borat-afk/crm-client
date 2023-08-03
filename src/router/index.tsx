import { createBrowserRouter } from 'react-router-dom';
import Layout from '../components/App/Layout';
import AuthGuard from './AuthGuard';
import Login from '../components/Login';
import App from '../App.tsx';
import Registration from '../components/Registration';
import Account from '../components/Account';

const router = createBrowserRouter([
  {
    path: '/auth/login',
    element: <Login />,
  },
  {
    path: '/auth/registration',
    element: <Registration />,
  },
  {
    path: '/',
    element: <Layout><AuthGuard /></Layout>,
    children: [
      {
        path: '/home',
        element: <App />
      },
      {
        path: '/account/settings',
        element: <Account />
      }
    ]
  }
]);

export default router;