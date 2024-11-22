import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import User from './pages/User';
import Layout from './layout/Layout';
import LoginPage from './pages/LoginPage';
import AuthLayout from './layout/AuthLayout';
import Details from './pages/Details';
import '@fontsource/roboto-serif';
import RegisterPage from './pages/RegisterPage';
import ForgotPassword from './pages/ForgotPassword';
import '@fontsource/coiny';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/books/:id', element: <Details /> },
      { path: '/user/:id', element: <User /> },
    ],
  },
  {
    path: '/auth',
    element: <AuthLayout />,
    children: [
      { path: '/auth/register', element: <RegisterPage /> },
      { path: '/auth/forgotPassword', element: <ForgotPassword /> },
    ],
  },
  { path: '/auth/login', element: <LoginPage /> },
  { path: '*', element: <NotFound /> },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
