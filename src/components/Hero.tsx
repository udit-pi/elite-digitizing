import { Upload, DollarSign, Clock, Award, CreditCard, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-orange-50/30 via-white to-orange-50/20 overflow-hidden">
      {/* Subtle Pattern Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23E98F18' fill-opacity='1'%3E%3Ccircle cx='20' cy='20' r='2'/%3E%3Ccircle cx='0' cy='0' r='2'/%3E%3Ccircle cx='0' cy='40' r='2'/%3E%3Ccircle cx='40' cy='0' r='2'/%3E%3Ccircle cx='40' cy='40' r='2'/%3E%3C/g%3E%3C/svg%3E")`
        }}
      />
      
      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Text Content */}
          <div>
            {/* Main Headline */}
            <h1 className="text-gray-900 mb-6 leading-tight font-[Georama] text-[40px] font-bold">
              Premium <span className="text-brand-orange">Embroidery Digitizing</span> & <span className="text-brand-orange">Custom Patches</span> — USA Quality
            </h1>

            {/* Subheadline */}
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Fast turnaround, flat pricing, machine-ready files, and unlimited revisions — trusted by apparel brands, teams, and creators.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <Link 
                to="/order"
                className="px-8 py-4 bg-brand-orange hover:bg-brand-orange-hover text-white rounded-xl transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
              >
                <Upload size={20} />
                Upload Your Design — Free Quote
              </Link>
              <Link 
                to="/pricing"
                className="px-8 py-4 bg-white text-brand-orange border-2 border-brand-orange rounded-xl transition-all hover:bg-brand-orange hover:text-brand-red flex items-center justify-center gap-2"
              >
                <DollarSign size={20} />
                View Pricing
              </Link>
            </div>

            {/* Trust Badges - Horizontal Mini Icons */}
            
          </div>

          {/* Right Side - Tiger Patch Image */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              <img
                src="/hero-image.png"
                alt="Premium Tiger Embroidery Patch"
                className="w-full max-w-md lg:max-w-lg h-auto drop-shadow-2xl"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}