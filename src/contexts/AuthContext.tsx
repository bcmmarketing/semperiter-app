import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (token: string, user: User) => void;
  logout: () => void;
  isAuthenticated: boolean;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user] = useState<User | null>({
    id: 'demo',
    name: 'Demo Admin',
    email: 'admin@demo.com',
    role: 'admin'
  });
  const [token] = useState<string | null>('demo-token');
  const navigate = useNavigate();

  // Modo demostración: no necesitamos useEffect

  const login = (newToken: string, newUser: User) => {
    navigate('/admin');
  };

  const logout = () => {
    navigate('/');
  };

  const value = {
    user,
    token,
    login,
    logout,
    isAuthenticated: true,
    isAdmin: true
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
