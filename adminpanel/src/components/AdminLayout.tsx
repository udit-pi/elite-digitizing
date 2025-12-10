import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  ShoppingCart, 
  CreditCard, 
  MessageSquare, 
  Users, 
  UserCircle,
  LogOut,
  Menu,
  X
} from 'lucide-react';
import { useState, ReactNode } from 'react';
import { useAdminAuth } from '../contexts/AdminAuthContext';

interface MenuItemLink {
  path: string;
  label: string;
  icon: ReactNode;
  adminOnly?: boolean;
}

const menuItems: MenuItemLink[] = [
  { path: '/dashboard', label: 'Dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
  { path: '/orders', label: 'Orders', icon: <ShoppingCart className="w-5 h-5" /> },
  { path: '/payments', label: 'Payments', icon: <CreditCard className="w-5 h-5" /> },
  { path: '/contacts', label: 'Contacts', icon: <MessageSquare className="w-5 h-5" /> },
  { path: '/users', label: 'Users', icon: <Users className="w-5 h-5" />, adminOnly: true },
  { path: '/profile', label: 'Profile', icon: <UserCircle className="w-5 h-5" /> },
];

interface AdminLayoutProps {
  children: ReactNode;
}

export function AdminLayout({ children }: AdminLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { admin, logout, canAccessUsers } = useAdminAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const filteredMenuItems = menuItems.filter(item => {
    if (item.adminOnly) {
      return canAccessUsers();
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={`fixed top-0 left-0 z-50 h-full w-64 bg-admin-primary text-white transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between p-6 border-b border-admin-primary-hover">
            <h1 className="text-2xl font-bold">Elite Admin</h1>
            <button 
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden text-white hover:text-gray-300"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Menu */}
          <nav className="flex-1 p-4">
            <ul className="space-y-2">
              {filteredMenuItems.map((item) => {
                const isActive = location.pathname === item.path || location.pathname.startsWith(item.path + '/');
                return (
                  <li key={item.path}>
                    <Link
                      to={item.path}
                      onClick={() => setSidebarOpen(false)}
                      className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                        isActive
                          ? 'bg-admin-primary-hover text-white'
                          : 'text-gray-300 hover:bg-admin-primary-hover hover:text-white'
                      }`}
                    >
                      {item.icon}
                      <span>{item.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* User info & logout */}
          <div className="p-4 border-t border-admin-primary-hover">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-admin-primary-hover flex items-center justify-center">
                <UserCircle className="w-6 h-6" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">
                  {admin?.firstName} {admin?.lastName}
                </p>
                <p className="text-xs text-gray-300 truncate">{admin?.email}</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-admin-danger text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="lg:ml-64">
        {/* Top header */}
        <header className="bg-white shadow-sm">
          <div className="flex items-center justify-between px-4 py-4 lg:px-8">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden text-gray-600 hover:text-gray-900"
            >
              <Menu className="w-6 h-6" />
            </button>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">
                Role: <span className="font-medium text-admin-primary">{admin?.role}</span>
              </span>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="p-4 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
