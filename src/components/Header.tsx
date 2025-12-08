import { Menu, X, User, Package, CreditCard, Settings, LogOut, ChevronDown, Download } from 'lucide-react';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);
  const location = useLocation();
  const { user, isAuthenticated, logout } = useAuth();

  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/services', label: 'Services' },
    { path: '/pricing', label: 'Pricing' },
    { path: '/portfolio', label: 'Portfolio' },
    { path: '/how-it-works', label: 'How It Works' },
    { path: '/faqs', label: 'FAQ' },
    { path: '/contact', label: 'Contact' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center gap-3">
              <img src="/logo.png" alt="Elite Digitizing" className="w-12 h-12" />
              <div>
                <div className="text-2xl text-black" style={{ fontFamily: 'Georama, sans-serif', fontWeight: 600 }}>
                  Elite Digitizing
                </div>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`transition-colors ${
                  isActive(link.path)
                    ? 'text-brand-orange font-semibold'
                    : 'text-gray-700 hover:text-brand-orange'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center gap-4">
            {isAuthenticated ? (
              <>
                {/* Account Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setAccountMenuOpen(!accountMenuOpen)}
                    className="flex items-center gap-2 px-4 py-2.5 border-2 border-gray-300 rounded-lg hover:border-brand-red hover:text-brand-red transition-all h-[42px]"
                  >
                    <div className="w-7 h-7 bg-brand-orange rounded-full flex items-center justify-center text-white font-semibold text-sm flex-shrink-0">
                      {user?.firstName?.[0]}{user?.lastName?.[0]}
                    </div>
                    <span className="font-medium max-w-[100px] truncate">{user?.firstName}</span>
                    <ChevronDown className="w-4 h-4 flex-shrink-0" />
                  </button>

                  {accountMenuOpen && (
                    <>
                      <div
                        className="fixed inset-0 z-10"
                        onClick={() => setAccountMenuOpen(false)}
                      />
                      <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-20">
                        <Link
                          to="/account"
                          onClick={() => setAccountMenuOpen(false)}
                          className="flex items-center gap-3 px-4 py-2.5 text-gray-700 hover:bg-gray-50 transition-colors"
                        >
                          <User className="w-4 h-4" />
                          <span>Dashboard</span>
                        </Link>
                        <Link
                          to="/account/orders"
                          onClick={() => setAccountMenuOpen(false)}
                          className="flex items-center gap-3 px-4 py-2.5 text-gray-700 hover:bg-gray-50 transition-colors"
                        >
                          <Package className="w-4 h-4" />
                          <span>My Orders</span>
                        </Link>
                        <Link
                          to="/account/payments"
                          onClick={() => setAccountMenuOpen(false)}
                          className="flex items-center gap-3 px-4 py-2.5 text-gray-700 hover:bg-gray-50 transition-colors"
                        >
                          <CreditCard className="w-4 h-4" />
                          <span>Payments</span>
                        </Link>
                        <Link
                          to="/account/downloads"
                          onClick={() => setAccountMenuOpen(false)}
                          className="flex items-center gap-3 px-4 py-2.5 text-gray-700 hover:bg-gray-50 transition-colors"
                        >
                          <Download className="w-4 h-4" />
                          <span>Downloads</span>
                        </Link>
                        <Link
                          to="/account/profile"
                          onClick={() => setAccountMenuOpen(false)}
                          className="flex items-center gap-3 px-4 py-2.5 text-gray-700 hover:bg-gray-50 transition-colors"
                        >
                          <Settings className="w-4 h-4" />
                          <span>Settings</span>
                        </Link>
                        <div className="border-t border-gray-200 my-2"></div>
                        <button
                          onClick={() => {
                            setAccountMenuOpen(false);
                            logout();
                          }}
                          className="flex items-center gap-3 px-4 py-2.5 text-red-600 hover:bg-red-50 transition-colors w-full text-left"
                        >
                          <LogOut className="w-4 h-4" />
                          <span>Logout</span>
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-6 py-2.5 border-2 border-gray-300 text-gray-700 rounded-lg hover:border-brand-red hover:text-brand-red transition-all h-[42px] flex items-center"
                >
                  Login
                </Link>
                <Link 
                  to="/order"
                  className="px-6 py-2.5 bg-brand-red hover:bg-brand-red-hover text-white rounded-lg transition-all shadow-md hover:shadow-lg h-[42px] flex items-center"
                >
                  Get a Free Quote
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 text-gray-700"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Full-Page Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-20 bg-white z-40 overflow-y-auto">
          <div className="flex flex-col h-full">
            <nav className="flex-1 px-6 py-8 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block py-4 text-lg font-medium transition-colors border-b border-gray-100 ${
                    isActive(link.path)
                      ? 'text-brand-orange'
                      : 'text-gray-700 hover:text-brand-orange'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            
            <div className="px-6 py-8 space-y-3 border-t border-gray-200 bg-gray-50">
              <Link
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="block w-full px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg text-center font-medium hover:text-brand-red hover:text-brand-red transition-all"
              >
                Login
              </Link>
              <Link 
                to="/order"
                onClick={() => setMobileMenuOpen(false)}
                className="block w-full px-6 py-3 bg-brand-red hover:bg-brand-red-hover text-white rounded-lg transition-all text-center font-medium"
              >
                Get a Free Quote
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}