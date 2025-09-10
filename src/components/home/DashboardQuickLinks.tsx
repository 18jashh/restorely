
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, Star, MapPin, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const DashboardQuickLinks = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Recent Activity</h2>
        <Button 
          variant="outline" 
          onClick={() => navigate('/dashboard')}
        >
          View All <ArrowRight className="h-4 w-4 ml-2" />
        </Button>
      </div>

      {/* Active Repair Card */}
      <Card className="mb-8">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center text-2xl">
                📱
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">iPhone 14 Pro - Screen Replacement</h3>
                <p className="text-sm text-gray-600">Order #REP001 • Technician: John Doe</p>
                <p className="text-sm text-gray-500 mt-1">📍 En route • ETA: 2:30 PM</p>
              </div>
            </div>
            <div className="text-right">
              <Badge className="bg-blue-100 text-blue-800 mb-2">In Progress</Badge>
              <div className="w-32 bg-gray-200 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{ width: '75%' }}></div>
              </div>
              <p className="text-xs text-gray-500 mt-1">75% complete</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate('/book')}>
          <CardHeader className="text-center pb-4">
            <Calendar className="h-8 w-8 text-blue-600 mx-auto mb-2" />
            <CardTitle className="text-lg">Book Repair</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-sm text-gray-600">Schedule a new device repair</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate('/track-repair')}>
          <CardHeader className="text-center pb-4">
            <Clock className="h-8 w-8 text-green-600 mx-auto mb-2" />
            <CardTitle className="text-lg">Track Repair</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-sm text-gray-600">Follow your repair progress</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate('/service-centers')}>
          <CardHeader className="text-center pb-4">
            <MapPin className="h-8 w-8 text-purple-600 mx-auto mb-2" />
            <CardTitle className="text-lg">Find Centers</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-sm text-gray-600">Locate nearby service centers</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate('/shop')}>
          <CardHeader className="text-center pb-4">
            <Star className="h-8 w-8 text-orange-600 mx-auto mb-2" />
            <CardTitle className="text-lg">Shop</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-sm text-gray-600">Browse accessories & parts</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
