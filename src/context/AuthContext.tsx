import React, { createContext, useState, ReactNode } from 'react';
import { User } from '../types';
import { storage } from '../utils/storage';

interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Always start on login screen — no auto-restore from storage

  const login = async (email: string, password: string): Promise<void> => {
    try {
      // Mock login — replace with API call when server is ready
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 800));

      const ADMIN_EMAIL = 'admin@shopnexa.com';
      const ADMIN_PASSWORD = 'Admin@123';

      const isAdminEmail = email.toLowerCase() === ADMIN_EMAIL;

      // Admin login: only allow with exact credentials
      if (isAdminEmail && password !== ADMIN_PASSWORD) {
        throw new Error('Invalid admin password');
      }

      const isAdmin = isAdminEmail && password === ADMIN_PASSWORD;

      const mockUser: User = {
        _id: isAdmin ? 'admin_001' : 'user_001',
        name: isAdmin ? 'Admin' : 'Olivia',
        email: email.toLowerCase(),
        role: isAdmin ? 'admin' : 'user',
      };

      const mockToken = 'mock_jwt_token_' + Date.now();

      await storage.setToken(mockToken);
      await storage.setUser(JSON.stringify(mockUser));

      setToken(mockToken);
      setUser(mockUser);
    } catch (error: any) {
      console.error('Login error:', error);
      throw new Error(error.message || 'Invalid email or password');
    }
  };

  const register = async (
    name: string,
    email: string,
    password: string
  ): Promise<void> => {
    try {
      // Mock register — replace with API call when server is ready
      await new Promise((resolve) => setTimeout(resolve, 800));

      const mockUser: User = {
        _id: 'user_' + Date.now(),
        name,
        email: email.toLowerCase(),
        role: 'user',
      };

      const mockToken = 'mock_jwt_token_' + Date.now();

      await storage.setToken(mockToken);
      await storage.setUser(JSON.stringify(mockUser));

      setToken(mockToken);
      setUser(mockUser);
    } catch (error) {
      console.error('Register error:', error);
      throw new Error('Registration failed');
    }
  };

  const logout = async (): Promise<void> => {
    try {
      await storage.clearAll();
      setToken(null);
      setUser(null);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, token, isLoading, login, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
