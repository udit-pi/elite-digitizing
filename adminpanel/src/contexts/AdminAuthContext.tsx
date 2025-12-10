import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import type { AdminUser, ApiResponse } from '../types';
import { loginAdmin, logoutAdmin, getCurrentAdmin } from '../api/mockAdminApi';

interface AdminAuthContextType {
  admin: AdminUser | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<ApiResponse<AdminUser>>;
  logout: () => Promise<void>;
  isAdmin: () => boolean;
  isManager: () => boolean;
  canAccessUsers: () => boolean;
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

export function AdminAuthProvider({ children }: { children: ReactNode }) {
  const [admin, setAdmin] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for stored session
    const storedAdmin = localStorage.getItem('adminUser');
    if (storedAdmin) {
      try {
        const parsedAdmin = JSON.parse(storedAdmin);
        setAdmin(parsedAdmin);
      } catch (error) {
        console.error('Failed to parse stored admin:', error);
        localStorage.removeItem('adminUser');
      }
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<ApiResponse<AdminUser>> => {
    const response = await loginAdmin(email, password);
    
    if (response.success && response.data) {
      setAdmin(response.data);
      localStorage.setItem('adminUser', JSON.stringify(response.data));
    }
    
    return response;
  };

  const logout = async (): Promise<void> => {
    await logoutAdmin();
    setAdmin(null);
    localStorage.removeItem('adminUser');
  };

  const isAdmin = (): boolean => {
    return admin?.role === 'admin';
  };

  const isManager = (): boolean => {
    return admin?.role === 'manager';
  };

  const canAccessUsers = (): boolean => {
    // Only admins can access user management
    return isAdmin();
  };

  const value = {
    admin,
    loading,
    login,
    logout,
    isAdmin,
    isManager,
    canAccessUsers,
  };

  return (
    <AdminAuthContext.Provider value={value}>
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  const context = useContext(AdminAuthContext);
  if (context === undefined) {
    throw new Error('useAdminAuth must be used within an AdminAuthProvider');
  }
  return context;
}
