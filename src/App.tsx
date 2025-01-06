import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home/Home';
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
import ShelfDetails from './pages/ShelfDetails';
import BookRequestStatusPage from './pages/BookRequestStatusPage';
import AddBookPage from './pages/AddBookPage';
import PrivateRoute from './routes/PrivateRoute';
import PublicRoute from './routes/PublicRoute';
import { UserProvider } from './context/UserContext';
import HomeLayout from './layout/HomeLayout';
import CurrentlyReadingReviewPage from './pages/CurrentlyReadingReviewPage';
import UserPage from './pages/UserPage';
import ReviewDetailsPage from './pages/ReviewDetailsPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <PrivateRoute>
        <HomeLayout />
      </PrivateRoute>
    ),
    children: [{ path: '/', element: <Home /> }],
  },
  {
    path: '/',
    element: (
      <PrivateRoute>
        <Layout />
      </PrivateRoute>
    ),
    children: [
      { path: '/', element: <Home /> },
      { path: '/books/:id', element: <BookDetailsPage /> },
      { path: '/authors/:id', element: <AuthorDetailsPage /> },
      { path: '/user/:id', element: <User /> },
      { path: '/user/shake', element: <ShakePage /> },
      { path: '/bookshelf/getBookshelf/:id', element: <ShelfDetails /> },
      { path: '/user/bookrequests', element: <BookRequestStatusPage /> },
      { path: '/books/add', element: <AddBookPage /> },
      { path: '/review/progress/:id', element: <CurrentlyReadingReviewPage /> },
      { path: '/user/profile', element: <UserPage /> },
      { path: '/review/:id', element: <ReviewDetailsPage /> },
    ],
  },
  {
    path: '/auth',
    element: (
      <PublicRoute>
        <AuthLayout />
      </PublicRoute>
    ),
    children: [
      { path: '/auth/register', element: <RegisterPage /> },
      { path: '/auth/forgotPassword', element: <ForgotPassword /> },
    ],
  },
  {
    path: '/auth/login',
    element: (
      <PublicRoute restricted>
        <LoginPage />
      </PublicRoute>
    ),
  },
  { path: '*', element: <NotFound /> },
]);

function App() {
  return (
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  );
}

export default App;
