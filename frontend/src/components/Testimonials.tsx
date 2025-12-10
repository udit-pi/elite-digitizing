import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Small Business Owner',
      photo: 'https://images.unsplash.com/photo-1623594675959-02360202d4d6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMHNtaWxpbmclMjBwcm9mZXNzaW9uYWx8ZW58MXx8fHwxNzYzNDczOTAyfDA&ixlib=rb-4.1.0&q=80&w=1080',
      quote: 'The quality of their embroidery digitizing is exceptional! My logo looks perfect on hats and shirts. Fast turnaround and great customer service.',
      service: 'Embroidery Digitizing',
      rating: 5
    },
    {
      name: 'Michael Chen',
      role: 'Event Coordinator',
      photo: 'https://images.unsplash.com/photo-1762341120638-b5b9358ef571?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBidXNpbmVzcyUyMHBlcnNvbnxlbnwxfHx8fDE3NjM1MzE1MjB8MA&ixlib=rb-4.1.0&q=80&w=1080',
      quote: 'Ordered 500 custom patches for our conference. They came out perfect and arrived on time. Highly recommend for bulk orders!',
      service: 'Custom Patches',
      rating: 5
    },
    {
      name: 'Jennifer Martinez',
      role: 'Fashion Designer',
      photo: 'https://images.unsplash.com/photo-1753161023962-665967602405?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXBweSUyMGN1c3RvbWVyJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzYzNTU2NDk3fDA&ixlib=rb-4.1.0&q=80&w=1080',
      quote: 'I have used several digitizing services, but this one is by far the best. The attention to detail and unlimited revisions make all the difference.',
      service: 'Vector Art & Digitizing',
      rating: 5
    }
  ];

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-gray-900 mb-4 text-[36px] font-bold">What Our Clients Say</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Don't just take our word for it — hear from our satisfied customers.
          </p>
        </div>

        {/* Testimonial Slider */}
        <div className="relative max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-blue-50 to-white rounded-2xl shadow-xl p-8 md:p-12 border border-gray-100">
            {/* Stars */}
            <div className="flex justify-center gap-1 mb-6">
              {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                <Star key={i} className="text-yellow-400 fill-current" size={24} />
              ))}
            </div>

            {/* Quote */}
            <blockquote className="text-xl text-gray-700 text-center mb-8 italic">
              "{testimonials[currentIndex].quote}"
            </blockquote>

            {/* Author */}
            <div className="flex flex-col items-center">
              <img
                src={testimonials[currentIndex].photo}
                alt={testimonials[currentIndex].name}
                className="w-20 h-20 rounded-full object-cover mb-4 border-4 border-white shadow-lg"
              />
              <div className="text-center">
                <div className="text-gray-900">{testimonials[currentIndex].name}</div>
                <div className="text-gray-500">{testimonials[currentIndex].role}</div>
                <div className="text-sm text-blue-600 mt-1">{testimonials[currentIndex].service}</div>
              </div>
            </div>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={prevTestimonial}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 w-12 h-12 bg-white rounded-full shadow-lg hover:shadow-xl transition-all flex items-center justify-center text-gray-700 hover:text-blue-600"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={nextTestimonial}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 w-12 h-12 bg-white rounded-full shadow-lg hover:shadow-xl transition-all flex items-center justify-center text-gray-700 hover:text-blue-600"
          >
            <ChevronRight size={24} />
          </button>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentIndex ? 'bg-blue-600 w-8' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}