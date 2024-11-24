import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import User from './pages/User';
import Layout from './layout/Layout';
import LoginPage from './pages/LoginPage';
import AuthLayout from './layout/AuthLayout';
import Details from './pages/BookDetails';
import '@fontsource/roboto-serif';
import RegisterPage from './pages/RegisterPage';
import ForgotPassword from './pages/ForgotPassword';
import '@fontsource/coiny';
import AuthorDetails from './components/AuthorDetails/AuthorDetails';
import ShakePage from './pages/ShakePage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/books/:id', element: <Details /> },
      { path: '/authors/:id', element: <AuthorDetails /> },
      { path: '/user/:id', element: <User /> },
      { path: '/user/shake', element: <ShakePage /> },
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
