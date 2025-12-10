/**
 * Authentication Context Provider
 * 
 * Manages user authentication state across the application.
 * Provides login, logout, and registration functions.
 * Persists user session in localStorage.
 */

import React, { createContext, useContext, useState, useEffect } from 'react';
import type { User } from '../types';
import { loginUser, logoutUser, registerUser, getCurrentUser } from '../api/mockApi';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  register: (data: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    phone?: string;
    company?: string;
  }) => Promise<{ success: boolean; error?: string }>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const STORAGE_KEY = 'elite_digitizing_user';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize auth state from localStorage
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const savedUser = localStorage.getItem(STORAGE_KEY);
        if (savedUser) {
          const parsedUser = JSON.parse(savedUser);
          setUser(parsedUser);
          
          // Verify user is still valid
          const response = await getCurrentUser();
          if (response.success && response.data) {
            setUser(response.data);
            localStorage.setItem(STORAGE_KEY, JSON.stringify(response.data));
          } else {
            // User session invalid, clear storage
            localStorage.removeItem(STORAGE_KEY);
            setUser(null);
          }
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
        localStorage.removeItem(STORAGE_KEY);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const login = async (
    email: string,
    password: string
  ): Promise<{ success: boolean; error?: string }> => {
    try {
      const response = await loginUser(email, password);
      
      if (response.success && response.data) {
        setUser(response.data);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(response.data));
        return { success: true };
      } else {
        return {
          success: false,
          error: response.error || 'Login failed',
        };
      }
    } catch (error) {
      console.error('Login error:', error);
      return {
        success: false,
        error: 'An unexpected error occurred',
      };
    }
  };

  const logout = async (): Promise<void> => {
    try {
      await logoutUser();
      setUser(null);
      localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.error('Logout error:', error);
      // Clear state anyway
      setUser(null);
      localStorage.removeItem(STORAGE_KEY);
    }
  };

  const register = async (data: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    phone?: string;
    company?: string;
  }): Promise<{ success: boolean; error?: string }> => {
    try {
      const response = await registerUser(data);
      
      if (response.success && response.data) {
        setUser(response.data);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(response.data));
        return { success: true };
      } else {
        return {
          success: false,
          error: response.error || 'Registration failed',
        };
      }
    } catch (error) {
      console.error('Registration error:', error);
      return {
        success: false,
        error: 'An unexpected error occurred',
      };
    }
  };

  const refreshUser = async (): Promise<void> => {
    try {
      const response = await getCurrentUser();
      if (response.success && response.data) {
        setUser(response.data);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(response.data));
      }
    } catch (error) {
      console.error('Error refreshing user:', error);
    }
  };

  const value: AuthContextType = {
    user,
    isLoading,
    isAuthenticated: !!user,
    login,
    logout,
    register,
    refreshUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
