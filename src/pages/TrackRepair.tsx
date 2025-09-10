
import React, { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, Package, Wrench, CheckCircle, Clock } from 'lucide-react';

const TrackRepair = () => {
  const [trackingId, setTrackingId] = useState('');
  const [showTracking, setShowTracking] = useState(false);

  const handleTrack = () => {
    if (trackingId.trim()) {
      setShowTracking(true);
    }
  };

  const trackingSteps = [
    { status: 'Received', icon: Package, completed: true, time: '2 hours ago' },
    { status: 'Diagnosis', icon: Search, completed: true, time: '1 hour ago' },
    { status: 'Repairing', icon: Wrench, completed: false, time: 'In Progress' },
    { status: 'Quality Check', icon: CheckCircle, completed: false, time: 'Pending' },
    { status: 'Ready for Pickup', icon: Clock, completed: false, time: 'Pending' }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Track Your Repair</h1>
          <p className="text-xl text-gray-600">Enter your tracking ID to see real-time repair status</p>
        </div>

        {/* Tracking Input */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Enter Tracking Details</CardTitle>
            <CardDescription>You can find your tracking ID in the confirmation email or SMS</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex space-x-4">
              <Input 
                placeholder="Enter Tracking ID (e.g., RST123456)"
                value={trackingId}
                onChange={(e) => setTrackingId(e.target.value)}
                className="flex-1"
              />
              <Button onClick={handleTrack} className="bg-blue-600 hover:bg-blue-700">
                Track
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Tracking Results */}
        {showTracking && (
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Repair Status - {trackingId}</CardTitle>
                  <CardDescription>iPhone 12 - Screen Replacement</CardDescription>
                </div>
                <Badge className="bg-yellow-100 text-yellow-800">In Progress</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {trackingSteps.map((step, index) => {
                  const IconComponent = step.icon;
                  return (
                    <div key={index} className="flex items-center space-x-4">
                      <div className={`p-2 rounded-full ${
                        step.completed ? 'bg-green-100' : 'bg-gray-100'
                      }`}>
                        <IconComponent className={`h-6 w-6 ${
                          step.completed ? 'text-green-600' : 'text-gray-400'
                        }`} />
                      </div>
                      <div className="flex-1">
                        <h3 className={`font-medium ${
                          step.completed ? 'text-green-600' : 'text-gray-600'
                        }`}>
                          {step.status}
                        </h3>
                        <p className="text-sm text-gray-500">{step.time}</p>
                      </div>
                      {step.completed && (
                        <CheckCircle className="h-5 w-5 text-green-600" />
                      )}
                    </div>
                  );
                })}
              </div>
              
              <div className="mt-8 p-4 bg-blue-50 rounded-lg">
                <h4 className="font-medium text-blue-900 mb-2">Estimated Completion</h4>
                <p className="text-blue-700">Today, 6:00 PM</p>
                <p className="text-sm text-blue-600 mt-1">
                  We'll notify you via SMS when your device is ready for pickup
                </p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
      
      <Footer />
    </div>
  );
};

export default TrackRepair;
