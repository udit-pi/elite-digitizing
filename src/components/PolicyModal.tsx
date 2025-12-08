import { X } from 'lucide-react';

interface PolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'privacy' | 'terms';
}

export function PolicyModal({ isOpen, onClose, type }: PolicyModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="sticky top-4 float-right mr-4 text-gray-400 hover:text-gray-600 transition-colors z-10 bg-white rounded-full p-2 shadow-md"
          >
            <X size={24} />
          </button>

          {/* Content */}
          <div className="p-8">
            {type === 'privacy' ? (
              <>
                {/* Privacy Policy Content */}
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">Privacy Policy</h2>
                  <p className="text-gray-600">Effective Date: 2025</p>
                </div>

                <div className="space-y-8">
                  <section>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">1. Introduction</h3>
                    <p className="text-gray-600 leading-relaxed">
                      Elite Digitizing ("we", "our", "us") is committed to protecting your privacy.
                      This Privacy Policy explains how we collect, use, disclose, and secure your information when you use our website and services, including digitizing, patches, vector conversion, and quote submissions.
                    </p>
                  </section>

                  <section>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">2. Information We Collect</h3>
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
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">3. How We Use Your Information</h3>
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
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">4. Sharing of Information</h3>
                    <p className="text-gray-600 mb-4">We may share data with:</p>
                    <ul className="list-disc list-inside space-y-2 text-gray-600 mb-4">
                      <li>Payment processors (PayPal / Stripe)</li>
                      <li>Service providers (hosting, email delivery)</li>
                      <li>Legal authorities if required</li>
                    </ul>
                    <p className="text-gray-600">We do not sell or rent your information.</p>
                  </section>

                  <section>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">5. Cookies & Tracking</h3>
                    <p className="text-gray-600">
                      See our Cookie Policy for more details.
                    </p>
                  </section>

                  <section>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">6. Data Security</h3>
                    <p className="text-gray-600 leading-relaxed">
                      We implement safeguards to protect your information, including encryption, secure hosting, and restricted access.
                    </p>
                  </section>

                  <section>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">7. Your Rights</h3>
                    <p className="text-gray-600 mb-4">You may request:</p>
                    <ul className="list-disc list-inside space-y-2 text-gray-600">
                      <li>Access to your data</li>
                      <li>Correction of inaccurate data</li>
                      <li>Deletion of stored data</li>
                      <li>Opt-out of marketing communications</li>
                    </ul>
                  </section>

                  <section>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">8. Contact</h3>
                    <p className="text-gray-600">
                      For any privacy-related questions:<br />
                      Email: <a href="mailto:support@elitedigitizing.com" className="text-brand-orange hover:underline">support@elitedigitizing.com</a>
                    </p>
                  </section>
                </div>
              </>
            ) : (
              <>
                {/* Terms of Service Content */}
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">Terms of Service</h2>
                </div>

                <div className="space-y-8">
                  <section>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">1. Acceptance of Terms</h3>
                    <p className="text-gray-600 leading-relaxed">
                      By accessing our website or using our services, you agree to these Terms of Service and our Privacy Policy.
                    </p>
                  </section>

                  <section>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">2. Services Provided</h3>
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
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">3. User Responsibilities</h3>
                    <p className="text-gray-600 mb-4">You agree to:</p>
                    <ul className="list-disc list-inside space-y-2 text-gray-600">
                      <li>Provide accurate artwork & details</li>
                      <li>Not upload illegal or copyrighted material without permission</li>
                      <li>Pay for approved quotes</li>
                      <li>Review proofs before approval</li>
                    </ul>
                  </section>

                  <section>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">4. Payment Terms</h3>
                    <p className="text-gray-600 leading-relaxed mb-4">
                      Payments are handled by PayPal and Stripe.
                      Orders are processed only after payment is received.
                      No refunds for approved & delivered digitized files.
                    </p>
                  </section>

                  <section>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">5. Intellectual Property</h3>
                    <p className="text-gray-600 mb-4">You retain rights to your artwork.</p>
                    <p className="text-gray-600 mb-4">Elite Digitizing retains rights to:</p>
                    <ul className="list-disc list-inside space-y-2 text-gray-600">
                      <li>System processes</li>
                      <li>Digitizing methodology</li>
                      <li>Website content & design</li>
                    </ul>
                  </section>

                  <section>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">6. File Quality & Revisions</h3>
                    <p className="text-gray-600 leading-relaxed mb-4">
                      We provide unlimited revisions until satisfaction.
                      Revisions must relate to the original submitted design.
                    </p>
                  </section>

                  <section>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">7. Turnaround Time</h3>
                    <p className="text-gray-600 mb-4">Typical delivery:</p>
                    <ul className="list-disc list-inside space-y-2 text-gray-600 mb-4">
                      <li>Digitizing: 12–24 hrs</li>
                      <li>Vector: 12–24 hrs</li>
                      <li>Patches: 3–7 days</li>
                    </ul>
                    <p className="text-gray-600">Rush options available.</p>
                  </section>

                  <section>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">8. Liability Limitations</h3>
                    <p className="text-gray-600 mb-4">We are not liable for:</p>
                    <ul className="list-disc list-inside space-y-2 text-gray-600">
                      <li>Misuse of files after delivery</li>
                      <li>Production errors caused by incorrect machine settings</li>
                      <li>Delays due to technical issues, force majeure, or incomplete user input</li>
                    </ul>
                  </section>

                  <section>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">9. Termination</h3>
                    <p className="text-gray-600 leading-relaxed">
                      We may refuse service to users who violate policies, upload harmful content, or engage in fraudulent activity.
                    </p>
                  </section>

                  <section>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">10. Contact</h3>
                    <p className="text-gray-600">
                      Email: <a href="mailto:support@elitedigitizing.com" className="text-brand-orange hover:underline">support@elitedigitizing.com</a>
                    </p>
                  </section>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
