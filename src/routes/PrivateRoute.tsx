import { PropsWithChildren } from 'react';
import { Navigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';

const PrivateRoute = ({ children }: PropsWithChildren) => {
  const { isLoggedIn } = useUser();

  if (!isLoggedIn()) {
    return <Navigate to="/auth/login" replace />;
  }

  return children;
};

export default PrivateRoute;
