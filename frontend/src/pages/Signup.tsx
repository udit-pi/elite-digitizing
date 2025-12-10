import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Link } from 'react-router-dom';
import { SignupForm } from '../components/SignupForm';

export default function Signup() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      
      <div className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full">
          {/* Logo & Title */}
          <div className="text-center mb-8">
            <img src="/logo.png" alt="Elite Digitizing" className="w-20 h-20 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Create Your Account</h2>
            <p className="text-gray-600">Join Elite Digitizing today</p>
          </div>

          {/* Signup Form */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <SignupForm showSocialSignup={true} />
          </div>

          {/* Back to Home */}
          <div className="mt-6 text-center">
            <Link to="/" className="text-sm text-gray-600 hover:text-brand-orange transition-colors">
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
