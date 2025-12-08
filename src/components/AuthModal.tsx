import { X } from 'lucide-react';
import { useState } from 'react';
import { LoginForm } from './LoginForm';
import { SignupForm } from './SignupForm';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultView?: 'login' | 'signup';
  onAuthSuccess?: () => void;
}

export function AuthModal({ isOpen, onClose, defaultView = 'login', onAuthSuccess }: AuthModalProps) {
  const [currentView, setCurrentView] = useState<'login' | 'signup'>(defaultView);

  if (!isOpen) return null;

  const handleAuthSuccess = () => {
    if (onAuthSuccess) {
      onAuthSuccess();
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative bg-white rounded-xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors z-10"
          >
            <X size={24} />
          </button>

          {/* Content */}
          <div className="p-8">
            {/* Logo & Title */}
            <div className="text-center mb-8">
              <img src="/logo.png" alt="Elite Digitizing" className="w-16 h-16 mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                {currentView === 'login' ? 'Welcome Back' : 'Create Account'}
              </h2>
              <p className="text-gray-600">
                {currentView === 'login' 
                  ? 'Sign in to continue with your order' 
                  : 'Sign up to place your order'}
              </p>
            </div>

            {/* Forms */}
            {currentView === 'login' ? (
              <LoginForm
                onSuccess={handleAuthSuccess}
                onSwitchToSignup={() => setCurrentView('signup')}
                showSocialLogin={true}
              />
            ) : (
              <SignupForm
                onSuccess={handleAuthSuccess}
                onSwitchToLogin={() => setCurrentView('login')}
                showSocialSignup={true}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
