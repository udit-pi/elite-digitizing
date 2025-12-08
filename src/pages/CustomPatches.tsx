import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Link } from 'react-router-dom';
import { ChevronRight, Layers, Scissors, Shield, Sparkles, Tag } from 'lucide-react';

export function CustomPatches() {
  const patchTypes = [
    {
      icon: Scissors,
      name: 'Embroidered Patches',
      description: 'Classic stitching finish with vibrant thread colors',
      priceFrom: '$1.50'
    },
    {
      icon: Layers,
      name: 'Woven Patches',
      description: 'High detail, thin lines, perfect for intricate designs',
      priceFrom: '$1.80'
    },
    {
      icon: Shield,
      name: 'PVC/Rubber Patches',
      description: 'Durable, outdoor-friendly, waterproof finish',
      priceFrom: '$2.50'
    },
    {
      icon: Sparkles,
      name: 'Chenille Patches',
      description: 'Fuzzy varsity style with premium textured feel',
      priceFrom: '$3.00'
    },
    {
      icon: Tag,
      name: 'Leather Patches',
      description: 'Premium natural look for high-end brands',
      priceFrom: '$4.00'
    }
  ];

  const options = [
    { label: 'Edge Type', values: 'Merrow / Laser Cut / Hot Cut' },
    { label: 'Backing', values: 'Iron-on / Velcro / Adhesive / Sew-on' },
    { label: 'Thread Colors', values: 'Up to 12 colors available' },
    { label: 'Custom Sizes', values: '1" to 12" available' }
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
            <span className="text-gray-900 font-medium">Custom Patches</span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-orange-50/30 via-white to-orange-50/20 overflow-hidden py-16 lg:py-16">
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
                Custom Patches
              </h1>
              <p className="text-lg text-gray-800 leading-relaxed">
                High-quality embroidered, woven, PVC, chenille, and leather patches. 
                Ideal for clothing brands, teams, uniforms, fashion, and accessories—made to your exact specifications.
              </p>
            </div>
            <div className="flex justify-center lg:justify-end">
              <img src="/embroidery_3.png" alt="Custom Patches" className="w-full max-w-md" />
            </div>
          </div>
        </div>
      </section>

      {/* Patch Types Grid */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Choose Your Patch Type
            </h2>
            <p className="text-lg text-gray-600">
              Each patch type offers unique benefits for different applications
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {patchTypes.map((type, index) => {
              const IconComponent = type.icon;
              return (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 hover:-translate-y-2"
                >
                  <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-6">
                    <IconComponent className="w-8 h-8 text-brand-orange" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {type.name}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {type.description}
                  </p>
                  <div className="text-brand-orange font-semibold text-lg">
                    From {type.priceFrom}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-12 text-center">
            <p className="text-gray-600 text-lg">
              💰 <span className="font-semibold">Bulk discounts available</span> for orders of 100+ patches
            </p>
          </div>
        </div>
      </section>

      {/* Options Panel */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Customization Options
            </h2>
            
            <div className="bg-white rounded-2xl p-8 shadow-md">
              <div className="grid md:grid-cols-2 gap-6">
                {options.map((option, index) => (
                  <div key={index} className="border-l-4 border-brand-orange pl-4">
                    <h3 className="font-semibold text-gray-900 mb-2">{option.label}</h3>
                    <p className="text-gray-600">{option.values}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Patch Gallery */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Recent Patch Work
            </h2>
            <p className="text-lg text-gray-600">
              Examples of patches we've created for clients
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
              <div
                key={item}
                className="aspect-square bg-gray-100 rounded-xl overflow-hidden hover:shadow-lg transition-shadow"
              >
                <img 
                  src="/sample-work.svg" 
                  alt={`Patch ${item}`} 
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Summary */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto bg-white rounded-2xl p-8 shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Starting Prices Per Patch
            </h2>
            
            <div className="space-y-4">
              {patchTypes.map((type, index) => (
                <div key={index} className="flex justify-between items-center py-3 border-b border-gray-200">
                  <span className="font-medium text-gray-900">{type.name}</span>
                  <span className="text-brand-orange font-semibold">From {type.priceFrom}</span>
                </div>
              ))}
            </div>

            <div className="mt-8 text-center">
              <p className="text-sm text-gray-600 mb-6">
                Final pricing depends on size, quantity, colors, and complexity
              </p>
              <Link
                to="/order"
                className="inline-block px-8 py-3 bg-brand-orange hover:bg-brand-orange-hover text-white rounded-lg font-semibold transition-colors"
              >
                Get Custom Quote
              </Link>
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
            Ready to order custom patches?
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Get a free quote in minutes. No minimum order required.
          </p>
          <Link
            to="/order"
            className="inline-block px-8 py-4 bg-brand-orange hover:bg-brand-orange-hover text-white rounded-lg font-semibold text-lg transition-all shadow-lg hover:shadow-xl"
          >
            Get Free Patch Quote
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
