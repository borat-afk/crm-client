import { createBrowserRouter } from 'react-router-dom';
import { RoutesEnum } from '../enums/routes.enum.ts';
import Layout from '../components/App/Layout';
import AuthGuard from './AuthGuard';
import Login from '../components/Login';
import Registration from '../components/Registration';
import Account from '../components/Account';
import Users from '../components/Users';
import UserDetails from '../components/UserDetails';
import Positions from '../components/Positions';
import Skills from '../components/Skills';
import Permission from '../components/Permission';
import Forbidden from '../components/Forbidden';

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
        path: RoutesEnum.AccountSettings,
        element: <Account />
      },
      {
        path: RoutesEnum.Users,
        element: <Users />
      },
      {
        path: RoutesEnum.User,
        element: <UserDetails />
      },
      {
        path: RoutesEnum.Positions,
        element: <Positions />
      },
      {
        path: RoutesEnum.Skills,
        element: <Skills />
      },
      {
        path: RoutesEnum.Permissions,
        element: <Permission />
      },
      {
        path: RoutesEnum.Forbidden,
        element: <Forbidden />
      }
    ]
  }
]);

export default router;