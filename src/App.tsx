import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import User from './pages/User';
import Layout from './layout/Layout';
import LoginPage from './pages/LoginPage';
import AuthLayout from './layout/AuthLayout';
import '@fontsource/roboto-serif';
import RegisterPage from './pages/RegisterPage';
import ForgotPassword from './pages/ForgotPassword';
import '@fontsource/coiny';
import ShakePage from './pages/ShakePage';
import BookDetailsPage from './pages/BookDetailsPage';
import AuthorDetailsPage from './pages/AuthorDetailsPage';
import BookRequestStatusPage from './pages/BookRequestStatusPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/books/:id', element: <BookDetailsPage /> },
      { path: '/authors/:id', element: <AuthorDetailsPage /> },
      { path: '/user/:id', element: <User /> },
      { path: '/user/shake', element: <ShakePage /> },
      { path: '/user/bookrequests', element: <BookRequestStatusPage /> },
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
