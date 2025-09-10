
import React from 'react';
import { Calendar, Search, Wrench, CheckCircle } from 'lucide-react';

export const HowItWorks = () => {
  const steps = [
    {
      icon: Calendar,
      title: 'Book Online',
      description: 'Select your device, describe the issue, and choose your preferred time slot.',
      color: 'bg-blue-500'
    },
    {
      icon: Search,
      title: 'AI Diagnosis',
      description: 'Our AI assistant may help solve simple issues instantly or prepare for technician visit.',
      color: 'bg-green-500'
    },
    {
      icon: Wrench,
      title: 'Expert Repair',
      description: 'Certified technician visits your location or picks up your device for repair.',
      color: 'bg-purple-500'
    },
    {
      icon: CheckCircle,
      title: 'Quality Check',
      description: 'Thorough testing and warranty provided. Track everything in real-time.',
      color: 'bg-orange-500'
    }
  ];

  return (
    <div id="how-it-works" className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            How Restorely Works
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Simple, transparent, and efficient. Get your device repaired in just a few steps.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="text-center relative">
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-12 left-full w-full h-0.5 bg-gray-200 z-0">
                  <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-gray-300 rounded-full"></div>
                </div>
              )}
              
              <div className="relative z-10">
                <div className="flex justify-center mb-4">
                  <div className={`w-24 h-24 ${step.color} rounded-full flex items-center justify-center relative`}>
                    <step.icon className="h-10 w-10 text-white" />
                    <div className="absolute -top-2 -right-2 bg-white text-gray-900 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                      {index + 1}
                    </div>
                  </div>
                </div>
                
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {step.title}
                </h3>
                
                <p className="text-gray-600">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
