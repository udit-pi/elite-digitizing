import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Link } from 'react-router-dom';
import { ChevronRight, Upload, FileText, CheckCircle, Package, Clock, RotateCw, Settings, Star, Headphones } from 'lucide-react';

export function HowItWorks() {
  const steps = [
    {
      number: '1',
      icon: Upload,
      title: 'Upload Your Artwork',
      description: 'Send us your logo, sketch, or image. Accepted formats: JPG, PNG, AI, PDF, EPS.',
      action: 'Upload Artwork',
      actionLink: '/order'
    },
    {
      number: '2',
      icon: FileText,
      title: 'We Prepare a Quote / Proof',
      description: 'Our team reviews the details and sends you a clear quote or a proof for digitizing/vector conversion.',
      action: null
    },
    {
      number: '3',
      icon: CheckCircle,
      title: 'Approve & Pay',
      description: 'Once approved, you complete the payment securely via PayPal or credit/debit card.',
      action: null
    },
    {
      number: '4',
      icon: Package,
      title: 'Final Delivery',
      description: 'Receive your machine-ready digitized file, vector artwork, or patches within the promised turnaround.',
      action: null
    }
  ];

  const benefits = [
    { icon: Clock, title: 'Fast 12–24 hr delivery', description: 'Quick turnaround times' },
    { icon: RotateCw, title: 'Unlimited revisions', description: 'Until you\'re satisfied' },
    { icon: Settings, title: 'Machine-ready formats', description: 'All major embroidery machines' },
    { icon: Star, title: '4.9★ rated service', description: 'Trusted by hundreds' },
    { icon: Headphones, title: 'USA-based support', description: 'Expert assistance always' }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Breadcrumb */}
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Link to="/" className="hover:text-brand-orange transition-colors">Home</Link>
            <ChevronRight size={16} />
            <span className="text-gray-900 font-medium">How It Works</span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-orange-50/30 via-white to-orange-50/20 overflow-hidden py-16 lg:py-24">
        <div 
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23E98F18' fill-opacity='1'%3E%3Ccircle cx='20' cy='20' r='2'/%3E%3Ccircle cx='0' cy='0' r='2'/%3E%3Ccircle cx='0' cy='40' r='2'/%3E%3Ccircle cx='40' cy='0' r='2'/%3E%3Ccircle cx='40' cy='40' r='2'/%3E%3C/g%3E%3C/svg%3E")`
          }}
        />
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            How It Works
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed">
            A simple and streamlined workflow from artwork to final production-ready files or patches.
          </p>
        </div>
      </section>

      {/* Step-by-Step Flow */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => {
              const IconComponent = step.icon;
              return (
                <div key={index} className="relative">
                  {/* Connection Line */}
                  {index < steps.length - 1 && (
                    <div className="hidden lg:block absolute top-16 left-full w-full h-0.5 bg-gradient-to-r from-brand-orange to-transparent -ml-4 z-0" />
                  )}
                  
                  <div className="relative bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition-all border border-gray-100">
                    {/* Step Number Badge */}
                    <div className="absolute -top-4 -left-4 w-12 h-12 bg-brand-orange rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg">
                      {step.number}
                    </div>

                    {/* Icon */}
                    <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-6 mx-auto">
                      <IconComponent className="w-8 h-8 text-brand-orange" />
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-semibold text-gray-900 mb-3 text-center">
                      {step.title}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-600 text-center mb-6">
                      {step.description}
                    </p>

                    {/* Action Button */}
                    {step.action && (
                      <Link
                        to={step.actionLink!}
                        className="block w-full px-6 py-3 bg-brand-orange hover:bg-brand-orange-hover text-white rounded-lg font-semibold text-center transition-colors"
                      >
                        {step.action}
                      </Link>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Elite Digitizing?
            </h2>
            <p className="text-lg text-gray-600">
              We're committed to quality, speed, and customer satisfaction
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8">
            {benefits.map((benefit, index) => {
              const IconComponent = benefit.icon;
              return (
                <div
                  key={index}
                  className="bg-white rounded-xl p-6 text-center shadow-md hover:shadow-lg transition-shadow"
                >
                  <div className="w-14 h-14 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="w-7 h-7 text-brand-orange" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2 text-sm">
                    {benefit.title}
                  </h3>
                  <p className="text-xs text-gray-600">
                    {benefit.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Process Timeline */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-orange-50 to-white rounded-2xl p-8 lg:p-12 border border-orange-200">
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-8 text-center">
              Typical Timeline
            </h2>
            
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-24 font-semibold text-brand-orange">0–1 hour</div>
                <div className="flex-1 text-gray-700">Initial quote and proof sent</div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-24 font-semibold text-brand-orange">12–24 hrs</div>
                <div className="flex-1 text-gray-700">Digitizing or vector conversion completed</div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-24 font-semibold text-brand-orange">3–7 days</div>
                <div className="flex-1 text-gray-700">Custom patches manufactured and shipped</div>
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-orange-200">
              <p className="text-center text-gray-600">
                <span className="font-semibold text-brand-orange">Rush service available</span> for urgent projects
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative bg-gradient-to-br from-orange-50/30 via-white to-orange-50/20 overflow-hidden py-16 lg:py-24">
        <div 
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23E98F18' fill-opacity='1'%3E%3Ccircle cx='20' cy='20' r='2'/%3E%3Ccircle cx='0' cy='0' r='2'/%3E%3Ccircle cx='0' cy='40' r='2'/%3E%3Ccircle cx='40' cy='0' r='2'/%3E%3Ccircle cx='40' cy='40' r='2'/%3E%3C/g%3E%3C/svg%3E")`
          }}
        />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
            Ready to get started?
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Upload your artwork now and receive a free quote within the hour.
          </p>
          <Link
            to="/order"
            className="inline-block px-8 py-4 bg-brand-orange hover:bg-brand-orange-hover text-white rounded-lg font-semibold text-lg transition-all shadow-lg hover:shadow-xl"
          >
            Get a Free Quote
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
