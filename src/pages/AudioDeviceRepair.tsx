
import React from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Headphones, Shield, Clock, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AudioDeviceRepair = () => {
  const navigate = useNavigate();

  const services = [
    { name: 'Headphone Jack Repair', price: '₹499 - ₹1,499', time: '30 mins' },
    { name: 'Driver Replacement', price: '₹799 - ₹2,999', time: '45 mins' },
    { name: 'Cable Replacement', price: '₹399 - ₹999', time: '20-30 mins' },
    { name: 'Bluetooth Module Fix', price: '₹999 - ₹2,499', time: '1 hour' },
    { name: 'Microphone Repair', price: '₹599 - ₹1,799', time: '30-45 mins' },
    { name: 'Battery Replacement', price: '₹699 - ₹1,999', time: '30 mins' }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <Headphones className="h-16 w-16 text-blue-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Audio Device Repair
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Expert repair for headphones, earbuds, speakers, and all audio equipment.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="text-center">
            <Shield className="h-12 w-12 text-blue-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Audio Experts</h3>
            <p className="text-gray-600">Specialized in audio device repair</p>
          </div>
          <div className="text-center">
            <Clock className="h-12 w-12 text-blue-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Quick Fix</h3>
            <p className="text-gray-600">Most repairs under 1 hour</p>
          </div>
          <div className="text-center">
            <Star className="h-12 w-12 text-blue-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Sound Quality</h3>
            <p className="text-gray-600">Restore original audio quality</p>
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

export default AudioDeviceRepair;
