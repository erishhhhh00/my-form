import React, { createContext, useContext, useState, ReactNode } from 'react';

export type UserRole = 'user' | 'admin';

interface AuthContextType {
  userRole: UserRole;
  setUserRole: (role: UserRole) => void;
  isAdmin: boolean;
  isLoggedIn: boolean;
  login: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [userRole, setUserRole] = useState<UserRole>('user');
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  const login = () => {
    setIsLoggedIn(true);
    setUserRole('admin');
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUserRole('user');
  };

  return (
    <AuthContext.Provider value={{
      userRole,
      setUserRole,
      isAdmin: userRole === 'admin',
      isLoggedIn,
      login,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};