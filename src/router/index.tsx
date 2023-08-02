import { createBrowserRouter } from 'react-router-dom';
import AuthGuard from './AuthGuard';
import Login from "../components/Login";
import App from "../App.tsx";
import Registration from "../components/Registration";

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
    element: <AuthGuard />,
    children: [
      {
        path: '/home',
        element: <App />
      }
    ]
  }
]);

export default router;