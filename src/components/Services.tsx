
import React from 'react';
import { Smartphone, Laptop, Tablet, Headphones } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

export const Services = () => {
  const navigate = useNavigate();

  const services = [
    {
      icon: Smartphone,
      title: 'Smartphone Repair',
      description: 'Screen replacement, battery issues, software problems, and more.',
      features: ['Screen Replacement', 'Battery Replacement', 'Water Damage', 'Software Issues'],
      color: 'bg-blue-500'
    },
    {
      icon: Laptop,
      title: 'Laptop Repair',
      description: 'Hardware upgrades, screen repairs, performance optimization.',
      features: ['Screen Repair', 'Keyboard Replacement', 'RAM Upgrade', 'Virus Removal'],
      color: 'bg-green-500'
    },
    {
      icon: Tablet,
      title: 'Tablet Repair',
      description: 'Touch screen issues, charging problems, and system repairs.',
      features: ['Touch Screen', 'Charging Port', 'Software Reset', 'App Issues'],
      color: 'bg-purple-500'
    },
    {
      icon: Headphones,
      title: 'Audio Devices',
      description: 'Headphones, speakers, and audio accessory repairs.',
      features: ['Cable Repair', 'Driver Issues', 'Bluetooth Problems', 'Sound Quality'],
      color: 'bg-orange-500'
    }
  ];

  return (
    <div id="services" className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Our Repair Services
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Expert repair services for all your devices, backed by warranty and professional support.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm border hover:shadow-md transition-shadow p-6">
              <div className="flex justify-center mb-4">
                <div className={`w-12 h-12 ${service.color} rounded-lg flex items-center justify-center`}>
                  <service.icon className="h-6 w-6 text-white" />
                </div>
              </div>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-3 text-center">
                {service.title}
              </h3>
              
              <p className="text-gray-600 mb-4 text-center">
                {service.description}
              </p>
              
              <ul className="space-y-2 mb-6">
                {service.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center text-sm text-gray-600">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                    {feature}
                  </li>
                ))}
              </ul>
              
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => navigate('/book')}
              >
                Book Repair
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
