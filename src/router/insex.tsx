import { createBrowserRouter } from 'react-router-dom';
import Login from "../components/Login";
import App from "../App.tsx";

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/auth/login',
    element: <Login />,
  }
]);

export default router;