
import React from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Laptop, Shield, Clock, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const LaptopRepair = () => {
  const navigate = useNavigate();

  const services = [
    { name: 'Screen Replacement', price: '₹4,999 - ₹15,999', time: '2-3 hours' },
    { name: 'Keyboard Repair', price: '₹1,999 - ₹4,999', time: '1-2 hours' },
    { name: 'Battery Replacement', price: '₹2,999 - ₹7,999', time: '1 hour' },
    { name: 'Motherboard Repair', price: '₹5,999 - ₹19,999', time: '4-6 hours' },
    { name: 'Hard Drive Recovery', price: '₹1,999 - ₹9,999', time: '2-24 hours' },
    { name: 'Cooling System Cleaning', price: '₹999 - ₹2,499', time: '1-2 hours' }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <Laptop className="h-16 w-16 text-blue-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Laptop Repair Services
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Professional laptop repair for all brands. From hardware fixes to data recovery, we handle it all.
          </p>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="text-center">
            <Shield className="h-12 w-12 text-blue-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Certified Technicians</h3>
            <p className="text-gray-600">Expert repair by certified professionals</p>
          </div>
          <div className="text-center">
            <Clock className="h-12 w-12 text-blue-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Fast Turnaround</h3>
            <p className="text-gray-600">Most repairs completed same day</p>
          </div>
          <div className="text-center">
            <Star className="h-12 w-12 text-blue-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Data Protection</h3>
            <p className="text-gray-600">Your data security is our priority</p>
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {services.map((service, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg">{service.name}</CardTitle>
                <CardDescription>
                  <span className="text-blue-600 font-semibold">{service.price}</span>
                  <br />
                  <span className="text-gray-500">Time: {service.time}</span>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button 
                  onClick={() => navigate('/book')}
                  className="w-full bg-blue-600 hover:bg-blue-700"
                >
                  Book Now
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="bg-blue-50 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Free Diagnosis Available
          </h2>
          <p className="text-gray-600 mb-6">
            Not sure what's wrong? We offer free diagnosis with our repair service.
          </p>
          <Button 
            onClick={() => navigate('/book')}
            className="bg-blue-600 hover:bg-blue-700"
          >
            Schedule Diagnosis
          </Button>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default LaptopRepair;
