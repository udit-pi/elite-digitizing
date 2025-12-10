import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img src="/logo.png" alt="Elite Digitizing" className="w-10 h-10" />
              <div>
                <div className="text-lg text-black" style={{ fontFamily: 'Georama, sans-serif', fontWeight: 600 }}>
                  Elite Digitizing
                </div>
              </div>
            </div>
            <p className="text-gray-600 mb-4">
              Professional embroidery digitizing and custom patches with fast turnaround and exceptional quality.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-9 h-9 bg-gray-100 rounded-lg flex items-center justify-center text-gray-600 hover:bg-brand-orange hover:text-white transition-colors">
                <Facebook size={18} />
              </a>
              <a href="#" className="w-9 h-9 bg-gray-100 rounded-lg flex items-center justify-center text-gray-600 hover:bg-brand-orange hover:text-white transition-colors">
                <Twitter size={18} />
              </a>
              <a href="#" className="w-9 h-9 bg-gray-100 rounded-lg flex items-center justify-center text-gray-600 hover:bg-brand-orange hover:text-white transition-colors">
                <Instagram size={18} />
              </a>
              <a href="#" className="w-9 h-9 bg-gray-100 rounded-lg flex items-center justify-center text-gray-600 hover:bg-brand-orange hover:text-white transition-colors">
                <Linkedin size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-gray-900 mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li><Link to="/" className="text-gray-600 hover:text-brand-red transition-colors">Home</Link></li>
              <li><Link to="/services" className="text-gray-600 hover:text-brand-red transition-colors">Services</Link></li>
              <li><Link to="/portfolio" className="text-gray-600 hover:text-brand-red transition-colors">Portfolio</Link></li>
              <li><Link to="/how-it-works" className="text-gray-600 hover:text-brand-red transition-colors">How It Works</Link></li>
              <li><Link to="/faqs" className="text-gray-600 hover:text-brand-red transition-colors">FAQ</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-gray-900 mb-4">Our Services</h3>
            <ul className="space-y-3">
              <li><Link to="/services/embroidery-digitizing" className="text-gray-600 hover:text-brand-red transition-colors">Embroidery Digitizing</Link></li>
              <li><Link to="/services/custom-patches" className="text-gray-600 hover:text-brand-red transition-colors">Custom Patches</Link></li>
              <li><Link to="/services/vector-conversion" className="text-gray-600 hover:text-brand-red transition-colors">Vector Art Conversion</Link></li>
              <li><Link to="/pricing" className="text-gray-600 hover:text-brand-red transition-colors">Pricing</Link></li>
              <li><Link to="/order" className="text-gray-600 hover:text-brand-red transition-colors">Get a Quote</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-gray-900 mb-4">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Mail className="text-brand-orange flex-shrink-0 mt-1" size={18} />
                <div>
                  <div className="text-gray-600">Email</div>
                  <a href="mailto:support@premiumdigitizing.com" className="text-gray-900 hover:text-brand-red transition-colors">
                    support@elitedigitizing.com
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="text-brand-orange flex-shrink-0 mt-1" size={18} />
                <div>
                  <div className="text-gray-600">Phone</div>
                  <a href="tel:+1234567890" className="text-gray-900 hover:text-brand-red transition-colors">
                    +1 (234) 567-890
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="text-brand-orange flex-shrink-0 mt-1" size={18} />
                <div>
                  <div className="text-gray-600">Location</div>
                  <div className="text-gray-900">USA Based Service</div>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-gray-600 text-sm">
              © 2025 Elite Digitizing. All rights reserved.{' '}
              <span className="text-gray-400">
                | Powered by{' '}
                <a 
                  href="https://pivisions.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-brand-red transition-colors"
                >
                  PiVisions
                </a>
              </span>
            </div>
            <div className="flex gap-6 text-sm">
              <Link to="/privacy-policy" className="text-gray-600 hover:text-brand-red transition-colors">Privacy Policy</Link>
              <Link to="/terms-of-service" className="text-gray-600 hover:text-brand-red transition-colors">Terms of Service</Link>
              <Link to="/cookie-policy" className="text-gray-600 hover:text-brand-red transition-colors">Cookie Policy</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}