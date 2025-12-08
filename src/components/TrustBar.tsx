import { Star, Zap, CreditCard, RefreshCw, Shield } from 'lucide-react';

export function TrustBar() {
  return (
    <section className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          <div className="flex items-center gap-3">
            <Star className="text-yellow-400 flex-shrink-0" size={28} />
            <div>
              <div className="text-gray-900">4.9/5</div>
              <div className="text-sm text-gray-500">500+ Reviews</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Zap className="text-blue-600 flex-shrink-0" size={28} />
            <div>
              <div className="text-gray-900">Fast Delivery</div>
              <div className="text-sm text-gray-500">12–24 Hours</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <CreditCard className="text-green-600 flex-shrink-0" size={28} />
            <div>
              <div className="text-gray-900">Secure Payments</div>
              <div className="text-sm text-gray-500">PayPal / Stripe</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <RefreshCw className="text-purple-600 flex-shrink-0" size={28} />
            <div>
              <div className="text-gray-900">Unlimited</div>
              <div className="text-sm text-gray-500">Revisions</div>
            </div>
          </div>

          <div className="flex items-center gap-3 col-span-2 md:col-span-3 lg:col-span-1">
            <Shield className="text-blue-600 flex-shrink-0" size={28} />
            <div>
              <div className="text-gray-900">100% Satisfaction</div>
              <div className="text-sm text-gray-500">Guarantee</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
