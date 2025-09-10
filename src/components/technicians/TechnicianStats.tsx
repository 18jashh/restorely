
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Users, Award, Clock, Star } from 'lucide-react';

export const TechnicianStats = () => {
  const stats = [
    {
      icon: Users,
      label: 'Expert Technicians',
      value: '500+',
      description: 'Certified professionals nationwide'
    },
    {
      icon: Award,
      label: 'Certifications',
      value: '1200+',
      description: 'Industry certifications held'
    },
    {
      icon: Clock,
      label: 'Experience',
      value: '15+ Years',
      description: 'Average years of experience'
    },
    {
      icon: Star,
      label: 'Customer Rating',
      value: '4.8/5',
      description: 'Average technician rating'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
      {stats.map((stat, index) => (
        <Card key={index} className="text-center hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg mb-4">
              <stat.icon className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">{stat.value}</h3>
            <p className="font-medium text-gray-700 mb-1">{stat.label}</p>
            <p className="text-sm text-gray-500">{stat.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
