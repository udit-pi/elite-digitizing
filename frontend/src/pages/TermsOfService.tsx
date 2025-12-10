import { Link } from 'react-router-dom';
import { FileText } from 'lucide-react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

export default function TermsOfService() {
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
            <span className="text-gray-900">Terms of Service</span>
          </div>
        </div>
      </div>

      {/* Header */}
      <div className="bg-white border-dotted border-b border-gray-300">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
          <div className="flex justify-center mb-4">
            <FileText className="w-16 h-16 text-brand-orange" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Terms of Service</h1>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-lg shadow-sm p-8 space-y-8">
          
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Acceptance of Terms</h2>
            <p className="text-gray-600 leading-relaxed">
              By accessing our website or using our services, you agree to these Terms of Service and our <Link to="/privacy-policy" className="text-brand-orange hover:underline">Privacy Policy</Link>.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Services Provided</h2>
            <p className="text-gray-600 mb-4">Elite Digitizing offers:</p>
            <ul className="list-disc list-inside space-y-2 text-gray-600">
              <li>Embroidery Digitizing</li>
              <li>Custom Patches</li>
              <li>Vector Art Conversion</li>
              <li>Artwork Cleanup</li>
              <li>Quote & Order Management</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. User Responsibilities</h2>
            <p className="text-gray-600 mb-4">You agree to:</p>
            <ul className="list-disc list-inside space-y-2 text-gray-600">
              <li>Provide accurate artwork & details</li>
              <li>Not upload illegal or copyrighted material without permission</li>
              <li>Pay for approved quotes</li>
              <li>Review proofs before approval</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Payment Terms</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Payments are handled by PayPal and Stripe.
              Orders are processed only after payment is received.
              No refunds for approved & delivered digitized files.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Intellectual Property</h2>
            <p className="text-gray-600 mb-4">You retain rights to your artwork.</p>
            <p className="text-gray-600 mb-4">Elite Digitizing retains rights to:</p>
            <ul className="list-disc list-inside space-y-2 text-gray-600">
              <li>System processes</li>
              <li>Digitizing methodology</li>
              <li>Website content & design</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">6. File Quality & Revisions</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              We provide unlimited revisions until satisfaction.
              Revisions must relate to the original submitted design.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Turnaround Time</h2>
            <p className="text-gray-600 mb-4">Typical delivery:</p>
            <ul className="list-disc list-inside space-y-2 text-gray-600 mb-4">
              <li>Digitizing: 12–24 hrs</li>
              <li>Vector: 12–24 hrs</li>
              <li>Patches: 3–7 days</li>
            </ul>
            <p className="text-gray-600">Rush options available.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Liability Limitations</h2>
            <p className="text-gray-600 mb-4">We are not liable for:</p>
            <ul className="list-disc list-inside space-y-2 text-gray-600">
              <li>Misuse of files after delivery</li>
              <li>Production errors caused by incorrect machine settings</li>
              <li>Delays due to technical issues, force majeure, or incomplete user input</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Termination</h2>
            <p className="text-gray-600 leading-relaxed">
              We may refuse service to users who violate policies, upload harmful content, or engage in fraudulent activity.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Contact</h2>
            <p className="text-gray-600">
              Email: <a href="mailto:support@elitedigitizing.com" className="text-brand-orange hover:underline">support@elitedigitizing.com</a>
            </p>
          </section>

        </div>
      </div>
      
      <Footer />
    </div>
  );
}
