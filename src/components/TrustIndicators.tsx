
import React from 'react';
import { Shield, Users, Award, Clock } from 'lucide-react';

export const TrustIndicators = () => {
  const stats = [
    {
      icon: Users,
      number: '50,000+',
      label: 'Happy Customers',
      color: 'text-blue-600'
    },
    {
      icon: Shield,
      number: '99.8%',
      label: 'Success Rate',
      color: 'text-green-600'
    },
    {
      icon: Award,
      number: '500+',
      label: 'Certified Technicians',
      color: 'text-purple-600'
    },
    {
      icon: Clock,
      number: '2 Hours',
      label: 'Average Response Time',
      color: 'text-orange-600'
    }
  ];

  return (
    <div className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Trusted by Thousands
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We've built our reputation on reliability, quality, and customer satisfaction.
          </p>
        </div>
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center">
                  <stat.icon className={`h-8 w-8 ${stat.color}`} />
                </div>
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">
                {stat.number}
              </div>
              <div className="text-gray-600 font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
