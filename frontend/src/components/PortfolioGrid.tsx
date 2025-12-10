import { useState, useEffect } from 'react';
import { Eye } from 'lucide-react';
import { portfolioItems } from '../data/portfolioData';
import { Link } from 'react-router-dom';

export function PortfolioGrid() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Show only first 8 items for homepage
  const displayItems = portfolioItems.slice(0, 8);

  // Auto-scroll for mobile carousel
  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    if (!isMobile) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % displayItems.length);
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(interval);
  }, [displayItems.length]);

  return (
    <section id="portfolio" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-gray-900 mb-4 text-[36px] font-bold">Our Portfolio</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Explore our collection of high-quality embroidery digitizing and custom patch projects.
          </p>
        </div>

        {/* Mobile Carousel */}
        <div className="md:hidden relative">
          <div className="overflow-hidden rounded-xl">
            <div 
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {displayItems.map((item, index) => (
                <div
                  key={item.id}
                  className="w-full flex-shrink-0 relative aspect-square"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent">
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                      <div className="flex items-center gap-2 mb-2">
                        <Eye size={18} />
                        <span className="text-sm text-yellow-400">{item.category}</span>
                      </div>
                      <h3 className="text-white text-lg">{item.title}</h3>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Dots */}
          <div className="flex justify-center gap-2 mt-4">
            {displayItems.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  currentSlide === index 
                    ? 'bg-brand-orange w-6' 
                    : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Desktop Grid */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayItems.map((item, index) => (
            <div
              key={item.id}
              className="relative group overflow-hidden rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 aspect-square"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Image */}
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />

              {/* Overlay */}
              <div className={`absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent transition-opacity duration-300 ${
                hoveredIndex === index ? 'opacity-100' : 'opacity-0'
              }`}>
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <div className="flex items-center gap-2 mb-2">
                    <Eye size={18} />
                    <span className="text-sm text-yellow-400">{item.category}</span>
                  </div>
                  <h3 className="text-white">{item.title}</h3>
                  <Link 
                    to="/portfolio"
                    className="mt-3 inline-block text-sm text-white border border-white px-4 py-2 rounded-lg hover:bg-white hover:text-gray-900 transition-colors"
                  >
                    View Portfolio
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Link
            to="/portfolio"
            className="inline-block px-8 py-3 bg-brand-orange hover:bg-brand-orange-hover text-white rounded-lg font-semibold transition-all shadow-lg hover:shadow-xl"
          >
            View Full Portfolio
          </Link>
        </div>
      </div>
    </section>
  );
}