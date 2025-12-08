import { Link } from 'react-router-dom';
import { Shield } from 'lucide-react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

export default function PrivacyPolicy() {
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
            <span className="text-gray-900">Privacy Policy</span>
          </div>
        </div>
      </div>

      {/* Header */}
      <div className="bg-white border-dotted border-b border-gray-300">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
          <div className="flex justify-center mb-4">
            <Shield className="w-16 h-16 text-brand-orange" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
          <p className="text-lg text-gray-600">Effective Date: 2025</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-lg shadow-sm p-8 space-y-8">
          
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Introduction</h2>
            <p className="text-gray-600 leading-relaxed">
              Elite Digitizing ("we", "our", "us") is committed to protecting your privacy.
              This Privacy Policy explains how we collect, use, disclose, and secure your information when you use our website and services, including digitizing, patches, vector conversion, and quote submissions.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Information We Collect</h2>
            <p className="text-gray-600 mb-4">We may collect:</p>
            <ul className="list-disc list-inside space-y-2 text-gray-600">
              <li>Personal info: name, email, phone</li>
              <li>Uploaded artwork & files</li>
              <li>Order details (size, format, notes)</li>
              <li>Billing info (processed securely via PayPal/Stripe; we do not store card data)</li>
              <li>Technical data (IP, browser type, device)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. How We Use Your Information</h2>
            <p className="text-gray-600 mb-4">We use your information to:</p>
            <ul className="list-disc list-inside space-y-2 text-gray-600">
              <li>Process quotes & fulfill services</li>
              <li>Communicate order updates</li>
              <li>Improve our website & support</li>
              <li>Prevent fraud and misuse</li>
              <li>Comply with legal obligations</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Sharing of Information</h2>
            <p className="text-gray-600 mb-4">We may share data with:</p>
            <ul className="list-disc list-inside space-y-2 text-gray-600 mb-4">
              <li>Payment processors (PayPal / Stripe)</li>
              <li>Service providers (hosting, email delivery)</li>
              <li>Legal authorities if required</li>
            </ul>
            <p className="text-gray-600">We do not sell or rent your information.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Cookies & Tracking</h2>
            <p className="text-gray-600">
              See our <Link to="/cookie-policy" className="text-brand-orange hover:underline">Cookie Policy</Link> for more details.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Data Security</h2>
            <p className="text-gray-600 leading-relaxed">
              We implement safeguards to protect your information, including encryption, secure hosting, and restricted access.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Your Rights</h2>
            <p className="text-gray-600 mb-4">You may request:</p>
            <ul className="list-disc list-inside space-y-2 text-gray-600">
              <li>Access to your data</li>
              <li>Correction of inaccurate data</li>
              <li>Deletion of stored data</li>
              <li>Opt-out of marketing communications</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Contact</h2>
            <p className="text-gray-600">
              For any privacy-related questions:<br />
              Email: <a href="mailto:support@elitedigitizing.com" className="text-brand-orange hover:underline">support@elitedigitizing.com</a>
            </p>
          </section>

        </div>
      </div>
      
      <Footer />
    </div>
  );
}
