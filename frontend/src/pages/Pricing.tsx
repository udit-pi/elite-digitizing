import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Link } from 'react-router-dom';
import { ChevronRight, Clock, Check } from 'lucide-react';

export function Pricing() {
  const digitizingPricing = [
    {
      name: 'Simple Logos',
      features: ['Text logos & basic shapes', 'Under 10,000 stitches'],
      price: '$10 – $15'
    },
    {
      name: 'Medium Logos',
      features: ['Multi-color, moderate detail', '10k–50k stitches'],
      price: '$20 – $30',
      featured: true
    },
    {
      name: 'Complex Designs',
      features: ['High-detail, gradients, large artwork', '50k+ stitches'],
      price: '$35 – $60'
    }
  ];

  const patchPricing = [
    { name: 'Embroidered Patches', price: 'from $1.50' },
    { name: 'Woven Patches', price: 'from $1.80' },
    { name: 'PVC/Rubber Patches', price: 'from $2.50' },
    { name: 'Chenille Patches', price: 'from $3.00' },
    { name: 'Leather Patches', price: 'from $4.00' }
  ];

  const vectorPricing = [
    {
      name: 'Simple Vector Redraw',
      price: '$10 – $15'
    },
    {
      name: 'Medium Vector Redraw',
      price: '$20 – $30',
      featured: true
    },
    {
      name: 'Complex Vector Redraw',
      price: '$25 – $50'
    }
  ];

  const turnaround = [
    { service: 'Digitizing', time: '12–24 hrs' },
    { service: 'Vector Art', time: '12–24 hrs' },
    { service: 'Patches', time: '3–7 days' },
    { service: 'Rush Delivery', time: 'Available' }
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
            <span className="text-gray-900 font-medium">Pricing</span>
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
            Pricing
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed">
            Transparent pricing for digitizing, custom patches, and vector artwork. 
            Simple rates, fast delivery, and unlimited revisions.
          </p>
        </div>
      </section>

      {/* Digitizing Pricing */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Embroidery Digitizing Pricing
            </h2>
            <p className="text-lg text-gray-600">
              Professional digitizing with unlimited revisions included
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-8">
            {digitizingPricing.map((tier, index) => (
              <div
                key={index}
                className={`bg-white rounded-2xl p-8 shadow-md border-2 transition-all ${
                  tier.featured 
                    ? 'border-brand-orange transform scale-105' 
                    : 'border-gray-200 hover:border-brand-orange'
                }`}
              >
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{tier.name}</h3>
                <div className="text-3xl font-bold text-brand-orange mb-6">{tier.price}</div>
                <ul className="space-y-3 mb-6">
                  {tier.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2 text-gray-600">
                      <Check className="w-5 h-5 text-brand-orange flex-shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  to="/order"
                  className="block w-full px-6 py-3 bg-brand-orange hover:bg-brand-orange-hover text-white rounded-lg font-semibold text-center transition-colors"
                >
                  Get Started
                </Link>
              </div>
            ))}
          </div>

          <p className="text-center text-gray-600">
            ✨ Includes unlimited revisions
          </p>
        </div>
      </section>

      {/* Patches Pricing */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Custom Patches Pricing
            </h2>
            <p className="text-lg text-gray-600">
              Starting prices per patch (quantity discounts available)
            </p>
          </div>

          <div className="grid md:grid-cols-5 gap-6 max-w-6xl mx-auto mb-8">
            {patchPricing.map((patch, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 shadow-md text-center hover:shadow-lg transition-shadow"
              >
                <h3 className="font-semibold text-gray-900 mb-3 text-sm">
                  {patch.name}
                </h3>
                <div className="text-xl font-bold text-brand-orange">
                  {patch.price}
                </div>
              </div>
            ))}
          </div>

          <p className="text-center text-gray-600">
            💰 Bulk discounts available for orders of 100+ patches
          </p>
        </div>
      </section>

      {/* Vector Conversion Pricing */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Vector Conversion Pricing
            </h2>
            <p className="text-lg text-gray-600">
              Transform your images into scalable vector artwork
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {vectorPricing.map((tier, index) => (
              <div
                key={index}
                className={`bg-white rounded-2xl p-8 shadow-md border-2 transition-all ${
                  tier.featured 
                    ? 'border-brand-orange transform scale-105' 
                    : 'border-gray-200 hover:border-brand-orange'
                }`}
              >
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{tier.name}</h3>
                <div className="text-3xl font-bold text-brand-orange mb-6">{tier.price}</div>
                <Link
                  to="/order"
                  className="block w-full px-6 py-3 bg-brand-orange hover:bg-brand-orange-hover text-white rounded-lg font-semibold text-center transition-colors"
                >
                  Get Started
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Turnaround Times */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="flex items-center justify-center gap-3 mb-8">
                <Clock className="w-8 h-8 text-brand-orange" />
                <h2 className="text-2xl font-bold text-gray-900">Turnaround Times</h2>
              </div>

              <div className="grid md:grid-cols-4 gap-6">
                {turnaround.map((item, index) => (
                  <div key={index} className="text-center">
                    <div className="font-semibold text-gray-900 mb-2">{item.service}</div>
                    <div className="text-brand-orange font-bold text-lg">{item.time}</div>
                  </div>
                ))}
              </div>

              <p className="text-center text-sm text-gray-600 mt-6">
                Rush delivery available for urgent projects
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
            Need a custom quote?
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Every project is unique. Upload your artwork and get a personalized quote.
          </p>
          <Link
            to="/order"
            className="inline-block px-8 py-4 bg-brand-orange hover:bg-brand-orange-hover text-white rounded-lg font-semibold text-lg transition-all shadow-lg hover:shadow-xl"
          >
            Upload Artwork for Free Quote
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
