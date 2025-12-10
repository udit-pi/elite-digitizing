import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Link } from 'react-router-dom';
import { Scissors, Star, Clock, RotateCw, Settings, Pen, Package, Layers } from 'lucide-react';

export function Services() {
  const services = [
    {
      icon: Scissors,
      title: 'Embroidery Digitizing',
      description: 'We convert your artwork into clean, machine-ready embroidery files with accurate pathing, sharp details, and perfect small-text clarity.',
      formats: 'DST, PES, JEF, VP3, EXP, HUS',
      buttonText: 'Get Digitizing Quote',
      buttonLink: '/services/embroidery-digitizing'
    },
    {
      icon: Layers,
      title: 'Custom Patches',
      description: 'High-quality embroidered, woven, PVC, chenille, and leather patches available with multiple backing options. Ideal for apparel brands & teams.',
      formats: null,
      buttonText: 'Order Custom Patches',
      buttonLink: '/services/custom-patches'
    },
    {
      icon: Pen,
      title: 'Vector Art Conversion',
      description: 'We clean up or redraw your artwork into crisp vector files (AI, EPS, SVG, PDF) suitable for printing, screen printing, vinyl, and DTF/DTG.',
      formats: null,
      buttonText: 'Convert Artwork',
      buttonLink: '/services/vector-conversion'
    },
    {
      icon: Package,
      title: 'Bulk Orders & Discounts',
      description: 'Perfect for embroidery shops, promotional suppliers, and clothing brands with frequent orders. Special pricing for volume.',
      formats: null,
      buttonText: 'Request Bulk Pricing',
      buttonLink: '/contact'
    }
  ];

  const benefits = [
    { icon: Star, text: '4.9/5 Rated Quality' },
    { icon: Clock, text: '12–24 Hour Turnaround' },
    { icon: RotateCw, text: 'Unlimited Revisions' },
    { icon: Settings, text: 'Machine-Ready Output' }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Page Title Section */}
      <section className="relative bg-gradient-to-br from-orange-50/30 via-white to-orange-50/20 overflow-hidden py-16 lg:py-48">
        {/* Subtle Pattern Overlay */}
        <div 
          className="absolute inset-0 opacity-[1]"
          style={{
            backgroundImage: `url("/services.png")`, backgroundSize: "cover", backgroundColor: "var(--brand-orange)"
          }}
        />
        
        {/* Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl p-8 lg:p-12 max-w-4xl mx-auto">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Our Services
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed">
              At Elite Digitizing, we provide professional embroidery digitizing, custom patches, 
              vector artwork, and bulk solutions for businesses across the USA.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            {services.map((service, index) => {
              const IconComponent = service.icon;
              return (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 hover:-translate-y-2  flex flex-col"
                >
                  {/* Icon */}
                  <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-6">
                    <IconComponent className="w-8 h-8 text-brand-orange" />
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 leading-relaxed mb-4 grow">
                    {service.description}
                  </p>

                  {/* Formats */}
                  {service.formats && (
                    <div className="mb-6">
                      <p className="text-sm font-medium text-gray-500 mb-2">Formats:</p>
                      <p className="text-sm text-gray-700 font-mono bg-gray-50 px-3 py-2 rounded">
                        {service.formats}
                      </p>
                    </div>
                  )}

                  {/* Button */}
                  {service.buttonLink.startsWith('#') ? (
                    <a
                      href={service.buttonLink}
                      className="inline-block w-full text-center px-6 py-3 bg-brand-orange text-white rounded-lg font-semibold hover:bg-brand-orange-hover transition-colors duration-200"
                    >
                      {service.buttonText}
                    </a>
                  ) : (
                    <Link
                      to={service.buttonLink}
                      className="inline-block w-full text-center px-6 py-3 bg-brand-orange text-white rounded-lg font-semibold hover:bg-brand-orange-hover transition-colors duration-200"
                    >
                      {service.buttonText}
                    </Link>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits Bar */}
      <section className="py-12 bg-gray-50 border-t border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {benefits.map((benefit, index) => {
              const IconComponent = benefit.icon;
              return (
                <div key={index} className="flex items-center justify-center gap-3">
                  <IconComponent className="w-6 h-6 text-brand-orange flex-shrink-0" />
                  <span className="text-gray-700 font-medium text-sm lg:text-base">
                    {benefit.text}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-20 bg-gradient-to-br from-[#E98F18] to-[#d17f14]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            Ready to get started?
          </h2>
          <p className="text-lg text-orange-100 mb-8">
            Upload your artwork and get a free quote within minutes.
          </p>
          <Link
            to="/order"
            className="inline-block px-8 py-4 bg-white text-brand-orange rounded-lg font-semibold text-lg hover:bg-orange-50 transition-colors duration-200 shadow-lg"
          >
            Get a Free Quote
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
