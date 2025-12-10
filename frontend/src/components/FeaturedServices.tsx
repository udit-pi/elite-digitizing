import { Sparkles, BadgeCheck, Wand2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export function FeaturedServices() {
  const services = [
    {
      icon: Sparkles,
      title: 'Embroidery Digitizing',
      description: 'Professional embroidery digitizing services with machine-ready files. Perfect for logos, designs, and custom artwork.',
      link: 'Get Started',
      to: '/services/embroidery-digitizing',
      color: 'blue'
    },
    {
      icon: BadgeCheck,
      title: 'Custom Patches',
      description: 'High-quality custom embroidered patches. Choose from various backing options, sizes, and quantities.',
      link: 'View Options',
      to: '/services/custom-patches',
      color: 'yellow'
    },
    {
      icon: Wand2,
      title: 'Vector Art Conversion',
      description: 'Convert low-quality images into crisp vector artwork. Perfect for screen printing and vinyl cutting.',
      link: 'Convert Now',
      to: '/services/vector-conversion',
      color: 'purple'
    }
  ];

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'blue':
        return { icon: 'text-blue-600', bg: 'bg-blue-50', hover: 'hover:border-blue-600' };
      case 'yellow':
        return { icon: 'text-yellow-500', bg: 'bg-yellow-50', hover: 'hover:border-yellow-500' };
      case 'purple':
        return { icon: 'text-purple-600', bg: 'bg-purple-50', hover: 'hover:border-purple-600' };
      default:
        return { icon: 'text-gray-600', bg: 'bg-gray-50', hover: 'hover:border-gray-600' };
    }
  };

  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-gray-900 mb-4 text-[36px] font-bold">Our Premium Services</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Professional digitizing, custom patches, and vector conversion — all with fast turnaround and exceptional quality.
          </p>
        </div>

        {/* Service Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const colors = getColorClasses(service.color);
            const Icon = service.icon;
            
            return (
              <div 
                key={index}
                className={`bg-white rounded-2xl p-8 border-2 border-gray-200 ${colors.hover} transition-all duration-300 hover:shadow-xl group`}
              >
                {/* Icon */}
                <div className={`${colors.bg} w-16 h-16 rounded-xl flex items-center justify-center mb-6`}>
                  <Icon className={colors.icon} size={32} />
                </div>

                {/* Title */}
                <h3 className="text-gray-900 mb-4">{service.title}</h3>

                {/* Description */}
                <p className="text-gray-600 mb-6">
                  {service.description}
                </p>

                {/* Link */}
                <Link 
                  to={service.to}
                  className={`inline-flex items-center gap-2 ${colors.icon} group-hover:gap-3 transition-all`}
                >
                  {service.link}
                  <ArrowRight size={18} />
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}