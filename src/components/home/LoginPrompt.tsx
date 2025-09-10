
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Shield, Clock, Star, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const LoginPrompt = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <Card className="border-2 border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-gray-900 mb-4">
            Ready to get your devices fixed?
          </CardTitle>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Join thousands of satisfied customers who trust Restorely with their device repairs
          </p>
        </CardHeader>
        
        <CardContent className="space-y-8">
          {/* Benefits */}
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-white rounded-full p-3 w-16 h-16 mx-auto mb-4 shadow-sm">
                <Shield className="h-10 w-10 text-green-600 mx-auto" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Certified Experts</h3>
              <p className="text-sm text-gray-600">Professional technicians at your doorstep</p>
            </div>
            
            <div className="text-center">
              <div className="bg-white rounded-full p-3 w-16 h-16 mx-auto mb-4 shadow-sm">
                <Clock className="h-10 w-10 text-blue-600 mx-auto" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Quick Service</h3>
              <p className="text-sm text-gray-600">Same-day repairs available</p>
            </div>
            
            <div className="text-center">
              <div className="bg-white rounded-full p-3 w-16 h-16 mx-auto mb-4 shadow-sm">
                <Star className="h-10 w-10 text-yellow-500 mx-auto" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Top Rated</h3>
              <p className="text-sm text-gray-600">4.9/5 customer satisfaction</p>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="text-center space-y-4">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg"
                onClick={() => navigate('/login')}
                className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-4"
              >
                Get Started Free
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
              <Button 
                size="lg"
                variant="outline"
                onClick={() => navigate('/login')}
                className="text-lg px-8 py-4 border-2"
              >
                Sign In
              </Button>
            </div>
            <p className="text-sm text-gray-500">
              Free plan includes AI assistant and basic booking • No credit card required
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
