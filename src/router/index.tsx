import { createBrowserRouter } from 'react-router-dom';
import { RoutesEnum } from '../enums/routes.enum.ts';
import Layout from '../components/App/Layout';
import AuthGuard from './AuthGuard';
import Login from '../components/Login';
import App from '../App.tsx';
import Registration from '../components/Registration';
import Account from '../components/Account';
import Users from "../components/Users";

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
        path: RoutesEnum.Home,
        element: <App />
      },
      {
        path: RoutesEnum.AccountSettings,
        element: <Account />
      },
      {
        path: RoutesEnum.Users,
        element: <Users />
      }
    ]
  }
]);

export default router;