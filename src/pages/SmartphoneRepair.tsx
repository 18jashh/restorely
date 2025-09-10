
import React from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Smartphone, Shield, Clock, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SmartphoneRepair = () => {
  const navigate = useNavigate();

  const services = [
    { name: 'Screen Replacement', price: '₹1,999 - ₹4,999', time: '30-45 mins' },
    { name: 'Battery Replacement', price: '₹999 - ₹2,499', time: '20-30 mins' },
    { name: 'Camera Repair', price: '₹1,499 - ₹3,999', time: '45-60 mins' },
    { name: 'Charging Port Fix', price: '₹799 - ₹1,999', time: '30-45 mins' },
    { name: 'Speaker/Mic Repair', price: '₹699 - ₹1,799', time: '30-45 mins' },
    { name: 'Water Damage Recovery', price: '₹1,999 - ₹5,999', time: '2-4 hours' }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <Smartphone className="h-16 w-16 text-blue-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Smartphone Repair Services
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Expert repair for all smartphone brands. Quick turnaround, genuine parts, and doorstep service available.
          </p>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="text-center">
            <Shield className="h-12 w-12 text-blue-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Genuine Parts</h3>
            <p className="text-gray-600">Only original or certified compatible parts used</p>
          </div>
          <div className="text-center">
            <Clock className="h-12 w-12 text-blue-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Quick Service</h3>
            <p className="text-gray-600">Most repairs completed within 1 hour</p>
          </div>
          <div className="text-center">
            <Star className="h-12 w-12 text-blue-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Warranty</h3>
            <p className="text-gray-600">6-month warranty on all repairs</p>
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
            Need Help Choosing?
          </h2>
          <p className="text-gray-600 mb-6">
            Not sure what's wrong with your device? Use our AI assistant for instant diagnosis.
          </p>
          <div className="space-x-4">
            <Button 
              onClick={() => navigate('/ai-assistant')}
              variant="outline"
            >
              AI Diagnosis
            </Button>
            <Button 
              onClick={() => navigate('/book')}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Book Repair
            </Button>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default SmartphoneRepair;
