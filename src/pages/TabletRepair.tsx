
import React from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tablet, Shield, Clock, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const TabletRepair = () => {
  const navigate = useNavigate();

  const services = [
    { name: 'Screen & Digitizer', price: '₹2,999 - ₹8,999', time: '1-2 hours' },
    { name: 'Battery Replacement', price: '₹1,999 - ₹4,999', time: '45-60 mins' },
    { name: 'Charging Port Repair', price: '₹1,499 - ₹2,999', time: '30-45 mins' },
    { name: 'Camera Module', price: '₹1,999 - ₹4,999', time: '1 hour' },
    { name: 'Speaker Repair', price: '₹999 - ₹2,499', time: '30-45 mins' },
    { name: 'Software Issues', price: '₹799 - ₹1,999', time: '30-60 mins' }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <Tablet className="h-16 w-16 text-blue-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Tablet Repair Services
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Professional tablet repair for iPad, Samsung Galaxy Tab, and all major brands.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="text-center">
            <Shield className="h-12 w-12 text-blue-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Quality Parts</h3>
            <p className="text-gray-600">Premium replacement parts guaranteed</p>
          </div>
          <div className="text-center">
            <Clock className="h-12 w-12 text-blue-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Quick Service</h3>
            <p className="text-gray-600">Same-day repair available</p>
          </div>
          <div className="text-center">
            <Star className="h-12 w-12 text-blue-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Warranty</h3>
            <p className="text-gray-600">90-day warranty included</p>
          </div>
        </div>

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
      </div>
      
      <Footer />
    </div>
  );
};

export default TabletRepair;
