import { PropsWithChildren } from 'react';
import { Navigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';

interface PublicRouteProps {
  restricted?: boolean; // Jeśli `true`, użytkownik zalogowany nie ma dostępu do tej trasy
}

const PublicRoute = ({ children, restricted }: PropsWithChildren<PublicRouteProps>) => {
  const { isLoggedIn } = useUser();

  if (isLoggedIn() && restricted) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default PublicRoute;
