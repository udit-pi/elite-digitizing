import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Link } from 'react-router-dom';
import { ChevronRight, ChevronDown } from 'lucide-react';
import { useState } from 'react';

export function FAQs() {
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);

  const toggleAccordion = (id: string) => {
    setOpenAccordion(openAccordion === id ? null : id);
  };

  const faqCategories = [
    {
      category: 'General',
      questions: [
        {
          id: 'gen-1',
          question: 'What is embroidery digitizing?',
          answer: 'Embroidery digitizing is converting artwork into a stitch-ready file compatible with embroidery machines. Our expert digitizers create clean, efficient paths that ensure perfect stitching, smooth gradients, sharp small letters, and optimal thread count.'
        },
        {
          id: 'gen-2',
          question: 'How quickly do you deliver?',
          answer: 'Digitizing: 12–24 hours, Vector Conversion: 12–24 hours, Patches: 3–7 days. Rush delivery is available for urgent projects.'
        },
        {
          id: 'gen-3',
          question: 'What makes your service different?',
          answer: 'We offer unlimited revisions, fast turnaround times, expert USA-based support, and machine-ready files optimized for all major embroidery machines. Our 4.9★ rating reflects our commitment to quality.'
        }
      ]
    },
    {
      category: 'Digitizing',
      questions: [
        {
          id: 'dig-1',
          question: 'What formats do you provide?',
          answer: 'We provide all major embroidery formats: DST, PES, JEF, VP3, EXP, and HUS. These formats are compatible with Brother, Tajima, Janome, Ricoma, Melco, and most other commercial embroidery machines.'
        },
        {
          id: 'dig-2',
          question: 'Do you offer revisions?',
          answer: 'Yes, we offer unlimited revisions until you are fully satisfied with the digitized file. Your satisfaction is our priority.'
        },
        {
          id: 'dig-3',
          question: 'What file formats can I submit?',
          answer: 'You can submit JPG, PNG, PDF, AI, EPS, or any common image format. Vector files (AI, EPS, SVG) work best, but we can work with any clear image.'
        },
        {
          id: 'dig-4',
          question: 'How do you calculate pricing?',
          answer: 'Pricing is based on design complexity and stitch count. Simple logos start at $10-$15, medium designs at $20-$30, and complex designs at $35-$60. We provide a free quote before starting work.'
        }
      ]
    },
    {
      category: 'Patches',
      questions: [
        {
          id: 'patch-1',
          question: 'What backing options do you offer?',
          answer: 'We offer Iron-on, Velcro (hook & loop), Sew-on, and Adhesive backing options. You can choose the backing type that best suits your application.'
        },
        {
          id: 'patch-2',
          question: 'Is there a minimum order?',
          answer: 'Yes, minimum order quantities depend on patch type. Typically 20–50 pieces for embroidered patches, 100+ for woven patches. Contact us for specific requirements.'
        },
        {
          id: 'patch-3',
          question: 'What sizes are available?',
          answer: 'We can create patches from 1 inch to 12 inches in any dimension. Custom shapes and sizes are available to match your exact specifications.'
        },
        {
          id: 'patch-4',
          question: 'Do you offer bulk discounts?',
          answer: 'Yes! We offer significant discounts for orders of 100+ patches. Contact us for volume pricing tailored to your needs.'
        }
      ]
    },
    {
      category: 'Payments & Delivery',
      questions: [
        {
          id: 'pay-1',
          question: 'What payment methods do you accept?',
          answer: 'We accept PayPal, all major credit cards (Visa, Mastercard, American Express), and debit cards. All payments are processed securely.'
        },
        {
          id: 'pay-2',
          question: 'When do I pay?',
          answer: 'Payment is required after you approve the quote and before we begin production. For patches, 50% deposit is required upfront, with the balance due before shipping.'
        },
        {
          id: 'pay-3',
          question: 'How do you deliver files?',
          answer: 'Digital files (digitizing and vector artwork) are delivered via email as downloadable ZIP files. Patches are shipped via USPS or UPS with tracking information provided.'
        },
        {
          id: 'pay-4',
          question: 'Do you ship internationally?',
          answer: 'Yes, we ship patches internationally. Shipping costs and delivery times vary by destination. Digital files are delivered worldwide via email instantly.'
        }
      ]
    }
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
            <span className="text-gray-900 font-medium">FAQs</span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-orange-50/30 via-white to-orange-50/20 overflow-hidden py-16 lg:py-24">
        <div 
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23E98F18' fill-opacity='1'%3E%3Ccircle cx='20' cy='20' r='2'/%3E%3Ccircle cx='0' cy='0' r='2'/%3E%3Ccircle cx='0' cy='40' r='2'/%3E%3Ccircle cx='40' cy='0' r='2'/%3E%3Ccircle cx='40' cy='40' r='2'/%3E%3C/g%3E%3C/svg%3E")`
          }}
        />
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Frequently Asked Questions
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed">
            Find answers to common questions about digitizing, patches, vector artwork, 
            turnaround, payments, and more.
          </p>
        </div>
      </section>

      {/* FAQ Sections */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-12">
            {faqCategories.map((category, categoryIndex) => (
              <div key={categoryIndex}>
                <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-brand-orange">
                  {category.category}
                </h2>
                
                <div className="space-y-4">
                  {category.questions.map((faq) => (
                    <div
                      key={faq.id}
                      className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                    >
                      <button
                        onClick={() => toggleAccordion(faq.id)}
                        className="w-full px-6 py-4 flex items-center justify-between text-left"
                      >
                        <span className="font-semibold text-gray-900 pr-4">
                          {faq.question}
                        </span>
                        <ChevronDown
                          className={`w-5 h-5 text-brand-orange flex-shrink-0 transition-transform ${
                            openAccordion === faq.id ? 'rotate-180' : ''
                          }`}
                        />
                      </button>
                      
                      {openAccordion === faq.id && (
                        <div className="px-6 pb-4">
                          <p className="text-gray-600 leading-relaxed">
                            {faq.answer}
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Still Have Questions */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl p-8 lg:p-12 shadow-lg text-center">
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
              Still Have Questions?
            </h2>
            <p className="text-gray-600 mb-8">
              Can't find the answer you're looking for? Our team is here to help.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/order"
                className="px-8 py-3 bg-brand-orange hover:bg-brand-orange-hover text-white rounded-lg font-semibold transition-colors shadow-lg"
              >
                Get a Free Quote
              </Link>
              <a
                href="mailto:info@elitedigitizing.com"
                className="px-8 py-3 bg-white hover:bg-gray-50 text-brand-orange border-2 border-brand-orange rounded-lg font-semibold transition-colors"
              >
                Contact Us
              </a>
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
            Need help or want a quote?
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Upload your artwork and get started with Elite Digitizing today.
          </p>
          <Link
            to="/order"
            className="inline-block px-8 py-4 bg-brand-orange hover:bg-brand-orange-hover text-white rounded-lg font-semibold text-lg transition-all shadow-lg hover:shadow-xl"
          >
            Get a Free Quote
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
