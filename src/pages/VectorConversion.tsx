import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Link } from 'react-router-dom';
import { ChevronRight, Check, Printer, Scissors as Cut, Zap, Shirt, Wrench } from 'lucide-react';

export function VectorConversion() {
  const benefits = [
    'Print-ready (AI, EPS, PDF, SVG)',
    'Smooth curves & clean outlines',
    'Pantone color matching available'
  ];

  const pricingTiers = [
    {
      name: 'Simple Vector',
      description: 'Text, basic shapes',
      price: '$10 – $15'
    },
    {
      name: 'Medium Vector',
      description: 'Moderate detail',
      price: '$20 – $30',
      featured: true
    },
    {
      name: 'Complex Vector',
      description: 'Gradients, intricate illustrations',
      price: '$25 – $50'
    }
  ];

  const useCases = [
    { icon: Printer, label: 'Screen Printing' },
    { icon: Cut, label: 'Vinyl Cutting' },
    { icon: Zap, label: 'Laser Engraving' },
    { icon: Shirt, label: 'DTF/DTG Printing' },
    { icon: Wrench, label: 'Logo Redraw' }
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
            <span className="text-gray-900 font-medium">Vector Conversion</span>
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
                Vector Art Conversion
              </h1>
              <p className="text-lg text-gray-800 leading-relaxed">
                We convert low-quality images into high-definition vector artwork ready for printing, 
                screen printing, vinyl cutting, sublimation, and embroidery digitizing.
              </p>
            </div>
            <div className="flex justify-center lg:justify-end">
               <img src="/embroidery_2.png" alt="Embroidery Digitizing" className="w-full max-w-md" />
            </div>
          </div>
        </div>
      </section>

      {/* What We Do */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-8 text-center">
              Transform Any Image Into Vector Art
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed mb-8 text-center">
              Whether you have a blurry logo, scanned print, or JPEG, we redraw it into crisp vector art 
              with clean curves, sharp corners, and perfect color separation.
            </p>
            
            <div className="bg-orange-50/50 rounded-xl p-8 border border-orange-100">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">What You Get:</h3>
              <ul className="space-y-3">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-brand-orange flex-shrink-0 mt-1" />
                    <span className="text-gray-700">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Before/After Example */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Before & After Conversion
            </h2>
            <p className="text-lg text-gray-600">
              See the difference between low-quality raster and crisp vector artwork
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="bg-white rounded-xl p-8 text-center shadow-md">
              <div className="mb-4 text-sm font-semibold text-gray-500 uppercase tracking-wide">Before</div>
              <img src="/sample-work.svg" alt="Before Conversion" className="w-full max-w-sm mx-auto mb-4 opacity-70" />
              <p className="text-gray-700">Low-quality raster image</p>
              <p className="text-sm text-gray-500 mt-2">Pixelated, blurry when scaled</p>
            </div>
            <div className="bg-white rounded-xl p-8 text-center shadow-md border-2 border-brand-orange">
              <div className="mb-4 text-sm font-semibold text-brand-orange uppercase tracking-wide">After</div>
              <img src="/sample-work.svg" alt="After Conversion" className="w-full max-w-sm mx-auto mb-4" />
              <p className="text-gray-700 font-semibold">High-quality vector</p>
              <p className="text-sm text-brand-orange mt-2">Infinitely scalable, crisp lines</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Vector Conversion Pricing
            </h2>
            <p className="text-lg text-gray-600">
              Fast turnaround with unlimited revisions
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {pricingTiers.map((tier, index) => (
              <div
                key={index}
                className={`bg-white rounded-2xl p-8 shadow-md ${
                  tier.featured ? 'ring-2 ring-brand-orange transform scale-105' : 'border border-gray-200'
                }`}
              >
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{tier.name}</h3>
                <p className="text-gray-600 mb-6">{tier.description}</p>
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

      {/* Use Cases */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Perfect For Multiple Applications
            </h2>
            <p className="text-lg text-gray-600">
              Use your vector artwork across all your marketing and production needs
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 max-w-5xl mx-auto">
            {useCases.map((useCase, index) => {
              const IconComponent = useCase.icon;
              return (
                <div
                  key={index}
                  className="bg-white rounded-xl p-6 text-center shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <IconComponent className="w-6 h-6 text-brand-orange" />
                  </div>
                  <p className="text-sm font-medium text-gray-900">{useCase.label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* File Formats */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto bg-gradient-to-br from-orange-50 to-white rounded-2xl p-8 border border-orange-200">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Output Formats
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              {['AI', 'EPS', 'SVG', 'PDF'].map((format) => (
                <div key={format} className="bg-white rounded-lg p-4 shadow-sm">
                  <div className="text-2xl font-bold text-brand-orange">{format}</div>
                </div>
              ))}
            </div>
            <p className="text-center text-gray-600 mt-6 text-sm">
              All formats include source files and print-ready versions
            </p>
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
            Ready to convert your artwork?
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Send us your low-quality image and we'll transform it into professional vector artwork.
          </p>
          <Link
            to="/order"
            className="inline-block px-8 py-4 bg-brand-orange hover:bg-brand-orange-hover text-white rounded-lg font-semibold text-lg transition-all shadow-lg hover:shadow-xl"
          >
            Convert Artwork Now
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
