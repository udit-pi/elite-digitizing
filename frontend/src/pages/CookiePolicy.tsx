import { Link } from 'react-router-dom';
import { Cookie } from 'lucide-react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

export default function CookiePolicy() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Breadcrumb */}
      <div className="bg-white border-dotted border-b border-gray-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center space-x-2 text-sm">
            <Link to="/" className="text-gray-500 hover:text-brand-orange">
              Home
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-900">Cookie Policy</span>
          </div>
        </div>
      </div>

      {/* Header */}
      <div className="bg-white border-dotted border-b border-gray-300">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
          <div className="flex justify-center mb-4">
            <Cookie className="w-16 h-16 text-brand-orange" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Cookie Policy</h1>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-lg shadow-sm p-8 space-y-8">
          
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. What Are Cookies?</h2>
            <p className="text-gray-600 leading-relaxed">
              Cookies are small text files stored on your device to improve website functionality, performance, and user experience.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Types of Cookies We Use</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-600">
              <li><strong>Essential Cookies:</strong> required for site functionality (forms, logins).</li>
              <li><strong>Analytics Cookies:</strong> help us understand traffic & usage trends.</li>
              <li><strong>Functional Cookies:</strong> remember preferences (e.g., form state).</li>
              <li><strong>Marketing Cookies:</strong> used for remarketing (only if enabled).</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. How We Use Cookies</h2>
            <p className="text-gray-600 mb-4">We use cookies to:</p>
            <ul className="list-disc list-inside space-y-2 text-gray-600">
              <li>Keep the website secure</li>
              <li>Improve performance</li>
              <li>Analyze user behavior</li>
              <li>Enhance quoting & file upload features</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Managing Cookies</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              You can disable cookies via your browser settings.
            </p>
            <p className="text-gray-600 leading-relaxed">
              <strong>Note:</strong> some features may not work properly if cookies are disabled.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Changes to This Policy</h2>
            <p className="text-gray-600 leading-relaxed">
              We may update this Cookie Policy periodically.
            </p>
          </section>

        </div>
      </div>
      
      <Footer />
    </div>
  );
}
