
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, Clock, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface WelcomeBannerProps {
  userName: string;
  currentPlan: string;
}

export const WelcomeBanner = ({ userName, currentPlan }: WelcomeBannerProps) => {
  const navigate = useNavigate();

  const getPlanColor = (plan: string) => {
    switch (plan) {
      case 'premium': return 'bg-yellow-100 text-yellow-700';
      case 'elite': return 'bg-red-100 text-red-700';
      default: return 'bg-green-100 text-green-700';
    }
  };

  return (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Card className="border-0 shadow-lg">
          <CardContent className="p-8">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center space-y-4 lg:space-y-0">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  Welcome back, {userName}! 👋
                </h1>
                <p className="text-gray-600 mb-4">
                  Your devices are in good hands with Restorely
                </p>
                <div className="flex items-center space-x-4">
                  <Badge className={getPlanColor(currentPlan)}>
                    {currentPlan.charAt(0).toUpperCase() + currentPlan.slice(1)} Plan
                  </Badge>
                  <div className="flex items-center text-sm text-gray-600">
                    <Star className="h-4 w-4 text-yellow-500 mr-1" />
                    <span>4.9/5 rating</span>
                  </div>
                </div>
              </div>
              
              <div className="flex space-x-3">
                <Button 
                  variant="outline"
                  onClick={() => navigate('/dashboard')}
                >
                  View Dashboard
                </Button>
                <Button 
                  onClick={() => navigate('/book')}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  Book New Repair
                </Button>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-6 mt-8 pt-6 border-t">
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <Clock className="h-5 w-5 text-blue-600 mr-2" />
                  <span className="text-2xl font-bold text-blue-600">2</span>
                </div>
                <p className="text-sm text-gray-600">Active Repairs</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <Check className="h-5 w-5 text-green-600 mr-2" />
                  <span className="text-2xl font-bold text-green-600">12</span>
                </div>
                <p className="text-sm text-gray-600">Completed</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <Star className="h-5 w-5 text-purple-600 mr-2" />
                  <span className="text-2xl font-bold text-purple-600">$456</span>
                </div>
                <p className="text-sm text-gray-600">Total Saved</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
