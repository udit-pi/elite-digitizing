import { Upload, FileText, CheckCircle, Download } from 'lucide-react';

export function HowItWorks() {
  const steps = [
    {
      number: '01',
      icon: Upload,
      title: 'Upload Your Design',
      description: 'Submit your artwork, logo, or design idea through our easy upload form.'
    },
    {
      number: '02',
      icon: FileText,
      title: 'Receive Quote/Proof',
      description: 'Get an instant quote and receive a detailed proof within hours for review.'
    },
    {
      number: '03',
      icon: CheckCircle,
      title: 'Approve & Pay',
      description: 'Review the proof, request any changes, then approve and make secure payment.'
    },
    {
      number: '04',
      icon: Download,
      title: 'Get Your Files',
      description: 'Receive machine-ready files or shipped patches with tracking information.'
    }
  ];

  return (
    <section id="how-it-works" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-gray-900 mb-4 text-[36px] font-bold">How It Works</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Our simple 4-step process ensures you get professional results quickly and easily.
          </p>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={index} className="relative">
                {/* Connecting Line (Desktop Only) */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-16 left-1/2 w-full h-0.5 bg-gradient-to-r from-blue-600 to-blue-300 z-0"></div>
                )}

                {/* Step Card */}
                <div className="relative z-10 bg-white">
                  {/* Number Badge */}
                  <div className="flex justify-center mb-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-800 rounded-full flex items-center justify-center text-white shadow-lg">
                      {step.number}
                    </div>
                  </div>

                  {/* Icon */}
                  <div className="flex justify-center mb-4">
                    <div className="w-20 h-20 bg-blue-50 rounded-xl flex items-center justify-center">
                      <Icon className="text-blue-600" size={36} />
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-gray-900 text-center mb-3">{step.title}</h3>

                  {/* Description */}
                  <p className="text-gray-600 text-center">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
