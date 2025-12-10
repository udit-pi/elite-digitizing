import { Upload, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export function CTABlock() {
  return (
    <section className="py-20 bg-gradient-to-br from-blue-600 to-blue-800 bg-[rgba(188,38,38,0)]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Headline */}
        <h2 className="text-white mb-6 text-[36px] font-bold">
          Ready to Get Started?
        </h2>

        {/* Subtext */}
        <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
          Upload your artwork and get a free quote in minutes. No commitments, no hidden fees.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link 
            to="/order"
            className="px-8 py-4 bg-white text-blue-600 rounded-lg hover:bg-gray-100 transition-all shadow-xl hover:shadow-2xl flex items-center gap-2 group"
          >
            <Upload size={20} />
            Place Order / Get Quote
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link 
            to="/contact"
            className="px-8 py-4 bg-transparent text-white border-2 border-white rounded-lg hover:bg-white hover:text-blue-600 transition-all"
          >
            Contact Support
          </Link>
        </div>

        {/* Trust Elements */}
        <div className="mt-12 flex flex-wrap justify-center gap-8 text-blue-100">
          <div className="flex items-center gap-2">
            <span className="text-yellow-400">⭐</span>
            <span>Rated 4.9/5</span>
          </div>
          <div className="flex items-center gap-2">
            <span>✓</span>
            <span>24-Hour Turnaround</span>
          </div>
          <div className="flex items-center gap-2">
            <span>✓</span>
            <span>Unlimited Revisions</span>
          </div>
          <div className="flex items-center gap-2">
            <span>✓</span>
            <span>USA Support</span>
          </div>
        </div>
      </div>
    </section>
  );
}