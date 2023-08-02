import { Outlet, Navigate } from 'react-router-dom';

const AuthGuard = () => {
  const accessToken = localStorage.getItem('access_token');

  if (!accessToken) {
    return <Navigate to={'/auth/login'} />;
  }

  return <Outlet />
}

export default AuthGuard;