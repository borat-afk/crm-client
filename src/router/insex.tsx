import { createBrowserRouter } from 'react-router-dom';
import Login from "../components/Login";
import App from "../App.tsx";
import Registration from "../components/Registration";

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/auth/login',
    element: <Login />,
  },
  {
    path: '/auth/registration',
    element: <Registration />,
  }
]);

export default router;