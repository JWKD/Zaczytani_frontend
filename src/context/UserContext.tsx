import { createContext, useState, useContext, PropsWithChildren, useEffect } from 'react';
import { User } from '../interfaces/user';

interface UserContextType {
  user: User;
  setUser: (user: User) => void;
  logout: () => void;
  isLoggedIn: () => boolean;
}

const defaultUser: User = {
  firstName: '',
  lastName: '',
  isLoggedIn: false,
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<User>(defaultUser);

  const logout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    setUser(defaultUser);
  };

  const isLoggedIn = (): boolean => {
    const accessToken = localStorage.getItem('accessToken');
    return Boolean(accessToken && user.isLoggedIn);
  };

  // Automatyczna inicjalizacja użytkownika, jeśli token istnieje
  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');

    if (accessToken && refreshToken) {
      setUser({
        firstName: 'Default', // tu będzie trzeba strzelać do api po informacje o userze
        lastName: 'User', // tu będzie trzeba strzelać do api po informacje o userze
        isLoggedIn: true,
      });
    }
  }, []);

  return <UserContext.Provider value={{ user, setUser, logout, isLoggedIn }}>{children}</UserContext.Provider>;
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
