import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronRight, Upload, Scissors, Layers, Pen } from 'lucide-react';
import { useState } from 'react';
import { AuthModal } from '../components/AuthModal';
import { useAuth } from '../contexts/AuthContext';
import { createOrder } from '../api/mockApi';
import type { ServiceType } from '../types';

export function Order() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  
  const [selectedService, setSelectedService] = useState<ServiceType | ''>('');
  const [complexity, setComplexity] = useState('medium');
  const [quantity, setQuantity] = useState('50');
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  
  // Form fields
  const [designName, setDesignName] = useState('');
  const [width, setWidth] = useState('');
  const [height, setHeight] = useState('');
  const [units, setUnits] = useState('inches');
  const [outputFormat, setOutputFormat] = useState('');
  const [turnaround, setTurnaround] = useState('standard');
  const [backing, setBacking] = useState('');
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [company, setCompany] = useState('');
  const [notes, setNotes] = useState('');
  const [mainFile, setMainFile] = useState<File | null>(null);
  const [supportingFiles, setSupportingFiles] = useState<File[]>([]);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    // Check if user is logged in
    if (!isAuthenticated) {
      setShowAuthModal(true);
      return;
    }

    // Validate required fields
    if (!selectedService || !designName || !width || !height || !outputFormat) {
      setError('Please fill in all required fields');
      return;
    }

    if (!mainFile) {
      setError('Please upload your main artwork file');
      return;
    }

    try {
      setIsSubmitting(true);

      // Prepare files array with metadata
      const files = [
        {
          name: mainFile.name,
          size: mainFile.size,
          type: mainFile.type,
          url: URL.createObjectURL(mainFile) // In real app, upload to S3/cloud storage
        },
        ...supportingFiles.map(file => ({
          name: file.name,
          size: file.size,
          type: file.type,
          url: URL.createObjectURL(file)
        }))
      ];

      // Create order
      const order = await createOrder({
        serviceType: selectedService as ServiceType,
        designName,
        dimensions: {
          width: parseFloat(width),
          height: parseFloat(height),
          units: units as 'inches' | 'centimeters'
        },
        outputFormat,
        complexity: complexity as 'simple' | 'medium' | 'complex',
        turnaround: turnaround as 'standard' | 'rush',
        quantity: selectedService === 'patches' ? parseInt(quantity) : undefined,
        backingType: selectedService === 'patches' ? backing : undefined,
        specialInstructions: notes || undefined,
        contactInfo: {
          name: contactName,
          email: contactEmail,
          phone: contactPhone || undefined,
          company: company || undefined
        },
        files
      });

      // Navigate to order detail page
      navigate(`/account/orders/${order.id}`);
    } catch (err) {
      setError('Failed to submit order. Please try again.');
      console.error('Order submission error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAuthSuccess = () => {
    setShowAuthModal(false);
    // Form will auto-submit on next click since user is now authenticated
  };

  const services = [
    {
      id: 'digitizing',
      name: 'Embroidery Digitizing',
      icon: Scissors,
      description: 'Convert artwork to machine files'
    },
    {
      id: 'patches',
      name: 'Custom Patches',
      icon: Layers,
      description: 'Physical embroidered patches'
    },
    {
      id: 'vector',
      name: 'Vector Conversion',
      icon: Pen,
      description: 'Clean vector artwork files'
    }
  ];

  const getFormatOptions = () => {
    if (selectedService === 'digitizing') {
      return ['DST', 'PES', 'EXP', 'JEF', 'VP3', 'HUS'];
    } else if (selectedService === 'vector') {
      return ['AI', 'EPS', 'PDF', 'SVG'];
    } else if (selectedService === 'patches') {
      return ['JPG/PNG (Physical patches)'];
    }
    return [];
  };

  const getPriceEstimate = () => {
    let basePrice = 0;
    let maxPrice = 0;

    if (selectedService === 'digitizing') {
      basePrice = complexity === 'simple' ? 10 : complexity === 'medium' ? 20 : 35;
      maxPrice = complexity === 'simple' ? 20 : complexity === 'medium' ? 35 : 60;
    } else if (selectedService === 'vector') {
      basePrice = complexity === 'simple' ? 15 : complexity === 'medium' ? 25 : 40;
      maxPrice = complexity === 'simple' ? 25 : complexity === 'medium' ? 40 : 70;
    } else if (selectedService === 'patches') {
      const qty = parseInt(quantity);
      const perPatch = complexity === 'simple' ? 3 : complexity === 'medium' ? 4.5 : 6;
      basePrice = Math.round(perPatch * qty * 0.8);
      maxPrice = Math.round(perPatch * qty * 1.2);
    }

    return { basePrice, maxPrice };
  };

  const estimate = getPriceEstimate();

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Breadcrumb */}
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Link to="/" className="hover:text-brand-orange transition-colors">Home</Link>
            <ChevronRight size={16} />
            <span className="text-gray-900 font-medium">Get a Quote</span>
          </div>
        </div>
      </div>

      {/* Hero Section - Simple Title */}
      <section className="bg-white py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-gray-900 text-center mb-2">
            Get a Free Quote
          </h1>
          <p className="text-center text-gray-600">
            Upload your artwork and select your service. We'll review your details and send a clear price estimate.
          </p>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-8 lg:py-12 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Service Selector */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Select Your Service</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {services.map((service) => {
                const IconComponent = service.icon;
                const isSelected = selectedService === service.id;
                return (
                  <button
                    key={service.id}
                    onClick={() => setSelectedService(service.id as any)}
                    className={`p-6 rounded-xl border-2 transition-all text-left ${
                      isSelected
                        ? 'border-brand-orange bg-orange-50 shadow-lg'
                        : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
                    }`}
                  >
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${
                      isSelected ? 'bg-brand-orange' : 'bg-gray-100'
                    }`}>
                      <IconComponent className={`w-6 h-6 ${isSelected ? 'text-white' : 'text-gray-600'}`} />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">{service.name}</h3>
                    <p className="text-sm text-gray-600">{service.description}</p>
                  </button>
                );
              })}
            </div>
          </div>

          {selectedService && (
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
              
              {/* Error Display */}
              {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-800 text-sm">{error}</p>
                </div>
              )}

              {/* File Upload Section */}
              <div className="mb-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Upload Your Artwork</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Main File *
                    </label>
                    <label className="block border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-brand-orange transition-colors cursor-pointer">
                      <input
                        type="file"
                        className="hidden"
                        accept=".png,.jpg,.jpeg,.pdf,.ai,.eps,.svg,.zip"
                        onChange={(e) => setMainFile(e.target.files?.[0] || null)}
                      />
                      <Upload className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                      {mainFile ? (
                        <p className="text-brand-orange font-medium mb-1">{mainFile.name}</p>
                      ) : (
                        <p className="text-gray-600 mb-1">Click to upload or drag and drop</p>
                      )}
                      <p className="text-sm text-gray-500">PNG, JPG, PDF, AI, EPS, SVG, ZIP up to 25MB</p>
                    </label>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Supporting Files (Optional)
                    </label>
                    <label className="block border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-brand-orange transition-colors cursor-pointer">
                      <input
                        type="file"
                        className="hidden"
                        accept=".png,.jpg,.jpeg,.pdf,.ai,.eps,.svg"
                        multiple
                        onChange={(e) => setSupportingFiles(Array.from(e.target.files || []))}
                      />
                      <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      {supportingFiles.length > 0 ? (
                        <p className="text-brand-orange text-sm font-medium">{supportingFiles.length} file(s) selected</p>
                      ) : (
                        <p className="text-sm text-gray-600">Upload additional reference images</p>
                      )}
                    </label>
                  </div>
                </div>
              </div>

              {/* Project Details Form */}
              <div className="mb-8">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Project Details</h3>
                
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Design Name */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Design Name *
                    </label>
                    <input
                      type="text"
                      value={designName}
                      onChange={(e) => setDesignName(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-orange focus:border-brand-orange"
                      placeholder="Enter design name"
                      required
                    />
                  </div>

                  {/* Size */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Width *
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      value={width}
                      onChange={(e) => setWidth(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-orange focus:border-brand-orange"
                      placeholder="4.0"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Height *
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      value={height}
                      onChange={(e) => setHeight(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-orange focus:border-brand-orange"
                      placeholder="4.0"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Units *
                    </label>
                    <select
                      value={units}
                      onChange={(e) => setUnits(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-orange focus:border-brand-orange"
                    >
                      <option value="inches">Inches (in)</option>
                      <option value="centimeters">Centimeters (cm)</option>
                    </select>
                  </div>

                  {/* Format */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Output Format *
                    </label>
                    <select
                      value={outputFormat}
                      onChange={(e) => setOutputFormat(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-orange focus:border-brand-orange"
                      required
                    >
                      <option value="">Select format...</option>
                      {getFormatOptions().map((format) => (
                        <option key={format} value={format}>{format}</option>
                      ))}
                    </select>
                  </div>

                  {/* Quantity - Only for patches */}
                  {selectedService === 'patches' && (
                    <>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Quantity *
                        </label>
                        <select 
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-orange focus:border-brand-orange"
                          value={quantity}
                          onChange={(e) => setQuantity(e.target.value)}
                        >
                          <option value="10">10 pieces</option>
                          <option value="20">20 pieces</option>
                          <option value="50">50 pieces</option>
                          <option value="100">100 pieces</option>
                          <option value="200">200 pieces</option>
                          <option value="500">500 pieces</option>
                          <option value="1000">1000 pieces</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Backing Type *
                        </label>
                        <select
                          value={backing}
                          onChange={(e) => setBacking(e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-orange focus:border-brand-orange"
                          required={selectedService === 'patches'}
                        >
                          <option value="">Select backing...</option>
                          <option>Iron-on</option>
                          <option>Velcro</option>
                          <option>Sew-On</option>
                          <option>Adhesive</option>
                        </select>
                      </div>
                    </>
                  )}

                  {/* Turnaround Time */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Turnaround Time *
                    </label>
                    <select
                      value={turnaround}
                      onChange={(e) => setTurnaround(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-orange focus:border-brand-orange"
                    >
                      <option value="standard">Standard (24 hours)</option>
                      <option value="rush">Rush (6-12 hours)</option>
                    </select>
                  </div>

                  {/* Complexity */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Design Complexity *
                    </label>
                    <select 
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-orange focus:border-brand-orange"
                      value={complexity}
                      onChange={(e) => setComplexity(e.target.value)}
                    >
                      <option value="simple">Simple (Text, basic shapes)</option>
                      <option value="medium">Medium (Logos, graphics)</option>
                      <option value="complex">Complex (Detailed artwork)</option>
                    </select>
                  </div>

                  {/* Contact Info */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-orange focus:border-brand-orange"
                      placeholder="John Doe"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-orange focus:border-brand-orange"
                      placeholder="john@example.com"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={contactPhone}
                      onChange={(e) => setContactPhone(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-orange focus:border-brand-orange"
                      placeholder="(123) 456-7890"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Company Name
                    </label>
                    <input
                      type="text"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-orange focus:border-brand-orange"
                      placeholder="Optional"
                    />
                  </div>

                  {/* Notes */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Additional Notes
                    </label>
                    <textarea
                      rows={4}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-orange focus:border-brand-orange resize-none"
                      placeholder="Any special instructions, color preferences, or requirements..."
                    />
                  </div>
                </div>
              </div>

              {/* Price Estimate Box */}
              <div className="mb-8 bg-gradient-to-br from-orange-50 to-orange-100/50 rounded-xl p-6 border border-orange-200">
                <h3 className="text-lg font-bold text-gray-900 mb-3">Estimated Price Range</h3>
                <div className="text-3xl font-bold text-brand-orange mb-2">
                  ${estimate.basePrice} – ${estimate.maxPrice}
                </div>
                <p className="text-sm text-gray-600">
                  This is an initial estimate. Final price will be confirmed after reviewing your artwork.
                </p>
              </div>

              {/* Submit Button */}
              <div className="text-center">
                <button 
                  onClick={handleFormSubmit}
                  disabled={isSubmitting}
                  className="px-12 py-4 bg-brand-orange hover:bg-brand-orange-hover text-white rounded-lg font-semibold text-lg transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Submitting...' : 'Request Quote'}
                </button>
                <p className="text-sm text-gray-600 mt-4">
                  ⏰ We'll respond within 12–24 hours with pricing and delivery details.
                </p>
              </div>
            </div>
          )}

          {!selectedService && (
            <div className="text-center py-12 text-gray-500">
              <p className="text-lg">Please select a service above to continue</p>
            </div>
          )}
        </div>
      </section>

      {/* Auth Modal */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        defaultView="login"
        onAuthSuccess={handleAuthSuccess}
      />

      <Footer />
    </div>
  );
}
