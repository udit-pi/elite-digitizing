import { DollarSign, ArrowRight } from 'lucide-react';

export function PricingPreview() {
  const prices = [
    {
      service: 'Embroidery Digitizing',
      price: '$10',
      unit: 'starting price',
      features: ['Machine-ready files', 'All formats included', 'Unlimited revisions']
    },
    {
      service: 'Vector Art Conversion',
      price: '$10',
      unit: 'starting price',
      features: ['High-resolution output', 'Multiple file formats', 'Print-ready quality']
    },
    {
      service: 'Custom Patches',
      price: '$1.50',
      unit: 'per piece',
      features: ['Iron-on or sew-on', 'Various sizes available', 'Bulk discounts']
    }
  ];

  return (
    <section id="pricing" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-gray-900 mb-4 text-[36px] font-bold">Simple, Transparent Pricing</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            No hidden fees, no surprises. Just straightforward pricing for premium quality work.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {prices.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-8 border-2 border-gray-200 hover:border-blue-600 transition-all duration-300 hover:shadow-xl"
            >
              {/* Icon */}
              <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-6">
                <DollarSign className="text-blue-600" size={24} />
              </div>

              {/* Service Name */}
              <h3 className="text-gray-900 mb-3">{item.service}</h3>

              {/* Price */}
              <div className="mb-6">
                <span className="text-blue-600">{item.price}</span>
                <span className="text-gray-500 ml-2">{item.unit}</span>
              </div>

              {/* Features */}
              <ul className="space-y-3">
                {item.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-gray-600">
                    <span className="text-green-500 mt-1">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="text-center">
          <button className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all shadow-md hover:shadow-lg group">
            View Full Pricing
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
}