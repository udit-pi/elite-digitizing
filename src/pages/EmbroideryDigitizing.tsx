import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Link } from 'react-router-dom';
import { Check, ChevronRight } from 'lucide-react';

export function EmbroideryDigitizing() {
  const formats = ['DST', 'PES', 'JEF', 'VP3', 'EXP', 'HUS'];
  
  const features = [
    'Clean & efficient stitch pathing',
    'Accurate small text & fine outlines',
    'Smooth satin & fill transitions',
    'Minimal thread trims & jumps',
    'Optimized for all major embroidery machines'
  ];

  const pricingTiers = [
    {
      name: 'Simple',
      description: 'Text logos, basic shapes',
      price: '$10 – $15',
      turnaround: '12 hours'
    },
    {
      name: 'Medium',
      description: 'Multi-color logos',
      price: '$20 – $30',
      turnaround: '24 hours',
      featured: true
    },
    {
      name: 'Complex',
      description: 'High detail / gradients',
      price: '$35 – $60',
      turnaround: '24–36 hours'
    }
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
            <Link to="/services" className="hover:text-brand-orange transition-colors">Services</Link>
            <ChevronRight size={16} />
            <span className="text-gray-900 font-medium">Embroidery Digitizing</span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-orange-50/30 via-white to-orange-50/20 overflow-hidden py-16 lg:py-16">
        {/* Pattern Overlay */}
        <div 
          className="absolute inset-0 "
          style={{
           backgroundColor:"var(--brand-orange)"
          }}
        />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                Embroidery Digitizing
              </h1>
              <p className="text-lg text-gray-900 leading-relaxed">
                Premium digitizing services for apparel brands, embroidery shops, teams, and creators. 
                We deliver clean pathing, sharp details, accurate trims, and machine-ready formats.
              </p>
            </div>
            <div className="flex justify-center lg:justify-end">
              <img src="/embroidery_1.png" alt="Embroidery Digitizing" className="w-full max-w-md" />
            </div>
          </div>
        </div>
      </section>

      {/* What Is Embroidery Digitizing */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-8 text-center">
              What Is Embroidery Digitizing?
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed mb-8">
              Embroidery digitizing is the process of converting artwork into a stitch-ready embroidery file. 
              Our expert digitizers create clean, efficient paths that ensure perfect stitching, smooth gradients, 
              sharp small letters, and optimal thread count. Whether it's a simple logo or a complex illustration, 
              we deliver production-ready files with unmatched accuracy.
            </p>
            
            <div className="bg-orange-50/50 rounded-xl p-8 border border-orange-100">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Why Choose Our Digitizing?</h3>
              <ul className="space-y-3">
                {features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-brand-orange flex-shrink-0 mt-1" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Supported Formats */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Supported Formats</h2>
          <p className="text-gray-600 mb-12">Compatible with Brother, Tajima, Janome, Ricoma, Melco & more</p>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 max-w-4xl mx-auto">
            {formats.map((format, index) => (
              <div 
                key={index}
                className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
              >
                <div className="text-2xl font-bold text-brand-orange">{format}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Before & After Comparison */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Before & After Digitizing
            </h2>
            <p className="text-lg text-gray-600">
              See how clean vector artwork transforms into detailed, production-ready embroidery.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="bg-gray-100 rounded-xl p-8 text-center">
              <img src="/sample-work.svg" alt="Before Digitizing" className="w-full max-w-sm mx-auto mb-4" />
              <p className="text-gray-700 font-semibold">Vector Artwork</p>
            </div>
            <div className="bg-gray-100 rounded-xl p-8 text-center">
              <img src="/sample-work.svg" alt="After Digitizing" className="w-full max-w-sm mx-auto mb-4" />
              <p className="text-gray-700 font-semibold">Embroidered Result</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Transparent Pricing
            </h2>
            <p className="text-lg text-gray-600">
              No hidden fees. Unlimited revisions included.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {pricingTiers.map((tier, index) => (
              <div
                key={index}
                className={`bg-white rounded-2xl p-8 shadow-md ${
                  tier.featured ? 'ring-2 ring-brand-orange transform scale-105' : ''
                }`}
              >
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{tier.name}</h3>
                <p className="text-gray-600 mb-6">{tier.description}</p>
                <div className="text-3xl font-bold text-brand-orange mb-6">{tier.price}</div>
                <div className="text-sm text-gray-600 mb-6">Turnaround: {tier.turnaround}</div>
                <Link
                  to="/order"
                  className="block w-full px-6 py-3 bg-brand-orange hover:bg-brand-orange-hover text-white rounded-lg font-semibold text-center transition-colors"
                >
                  Get Started
                </Link>
              </div>
            ))}
          </div>
          
          <p className="text-center text-gray-600 mt-8">
            ✨ Unlimited revisions included with all orders
          </p>
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
            Ready to digitize your artwork?
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Upload your file and get a free quote within minutes. Our team is ready to bring your designs to life.
          </p>
          <Link
            to="/order"
            className="inline-block px-8 py-4 bg-brand-orange hover:bg-brand-orange-hover text-white rounded-lg font-semibold text-lg transition-all shadow-lg hover:shadow-xl"
          >
            Upload File for Free Quote
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
