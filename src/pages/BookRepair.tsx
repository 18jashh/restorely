import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Smartphone, Laptop, Tablet, Headphones, MapPin, Clock, ArrowLeft, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { ProductSelector } from '@/components/ProductSelector';
import { Product } from '@/types/product';

export const BookRepair = () => {
  const [step, setStep] = useState(1);
  const [bookingData, setBookingData] = useState({
    deviceType: '',
    brand: '',
    model: '',
    issue: '',
    description: '',
    serviceType: '',
    address: '',
    date: '',
    time: '',
    selectedProduct: null as Product | null,
    customerInfo: {
      name: '',
      phone: '',
      email: ''
    }
  });

  const navigate = useNavigate();
  const { toast } = useToast();

  const deviceTypes = [
    { id: 'smartphone', name: 'Smartphone', icon: Smartphone, color: 'bg-blue-500' },
    { id: 'laptop', name: 'Laptop', icon: Laptop, color: 'bg-green-500' },
    { id: 'tablet', name: 'Tablet', icon: Tablet, color: 'bg-purple-500' },
    { id: 'audio', name: 'Audio Device', icon: Headphones, color: 'bg-orange-500' }
  ];

  const commonBrands = {
    smartphone: ['Apple', 'Samsung', 'Google', 'OnePlus', 'Xiaomi', 'Other'],
    laptop: ['Apple', 'Dell', 'HP', 'Lenovo', 'ASUS', 'Other'],
    tablet: ['Apple', 'Samsung', 'Microsoft', 'Amazon', 'Other'],
    audio: ['Apple', 'Sony', 'Bose', 'JBL', 'Sennheiser', 'Other']
  };

  const commonIssues = {
    smartphone: ['Cracked Screen', 'Battery Issues', 'Charging Problems', 'Software Issues', 'Water Damage', 'Camera Problems'],
    laptop: ['Screen Issues', 'Keyboard Problems', 'Performance Issues', 'Battery Problems', 'Overheating', 'Software Issues'],
    tablet: ['Touch Screen Issues', 'Battery Problems', 'Charging Issues', 'Software Problems', 'Speaker Issues'],
    audio: ['Cable Issues', 'Sound Quality', 'Bluetooth Problems', 'Charging Issues', 'Physical Damage']
  };

  const handleNext = () => {
    setStep(prev => Math.min(prev + 1, 5));
  };

  const handlePrev = () => {
    setStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = () => {
    toast({
      title: "Booking Confirmed!",
      description: "Your repair request has been submitted. You'll receive a confirmation email shortly.",
    });
    navigate('/dashboard');
  };

  const updateBookingData = (field: string, value: any) => {
    setBookingData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleProductSelect = (brand: string, category: string, product: Product) => {
    setBookingData(prev => ({
      ...prev,
      brand,
      model: product.name,
      selectedProduct: product
    }));
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Select Your Device</h2>
              <p className="text-gray-600">What device needs repair?</p>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              {deviceTypes.map((device) => (
                <div
                  key={device.id}
                  onClick={() => updateBookingData('deviceType', device.id)}
                  className={`p-6 border-2 rounded-lg cursor-pointer transition-all ${
                    bookingData.deviceType === device.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="text-center">
                    <div className={`w-12 h-12 ${device.color} rounded-lg flex items-center justify-center mx-auto mb-3`}>
                      <device.icon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="font-semibold text-gray-900">{device.name}</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Device Details</h2>
              <p className="text-gray-600">Select your specific device model</p>
            </div>
            
            <ProductSelector onProductSelect={handleProductSelect} />
            
            {/* Fallback manual entry if needed */}
            {!bookingData.selectedProduct && (
              <div className="mt-8 pt-8 border-t border-gray-200">
                <div className="text-center mb-4">
                  <p className="text-sm text-gray-600">Can't find your device? Enter manually:</p>
                </div>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="manual-brand">Brand</Label>
                    <Input
                      id="manual-brand"
                      placeholder="e.g., Apple, Samsung"
                      value={bookingData.brand}
                      onChange={(e) => updateBookingData('brand', e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="manual-model">Model</Label>
                    <Input
                      id="manual-model"
                      placeholder="e.g., iPhone 14 Pro, Galaxy S24"
                      value={bookingData.model}
                      onChange={(e) => updateBookingData('model', e.target.value)}
                      className="mt-1"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">What's the Issue?</h2>
              <p className="text-gray-600">Describe the problem with your device</p>
            </div>
            
            <div className="space-y-4">
              <div>
                <Label>Common Issues</Label>
                <RadioGroup
                  value={bookingData.issue}
                  onValueChange={(value) => updateBookingData('issue', value)}
                  className="grid grid-cols-1 gap-2 mt-2"
                >
                  {commonIssues[bookingData.deviceType as keyof typeof commonIssues]?.map((issue) => (
                    <div key={issue} className="flex items-center space-x-2">
                      <RadioGroupItem value={issue} id={issue} />
                      <Label htmlFor={issue}>{issue}</Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
              
              <div>
                <Label htmlFor="description">Additional Details</Label>
                <Textarea
                  id="description"
                  placeholder="Describe the issue in more detail..."
                  value={bookingData.description}
                  onChange={(e) => updateBookingData('description', e.target.value)}
                  className="mt-1"
                  rows={4}
                />
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Service Type</h2>
              <p className="text-gray-600">How would you like us to service your device?</p>
            </div>
            
            <RadioGroup
              value={bookingData.serviceType}
              onValueChange={(value) => updateBookingData('serviceType', value)}
              className="space-y-4"
            >
              <div className="border rounded-lg p-4">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="doorstep" id="doorstep" />
                  <Label htmlFor="doorstep" className="flex-1">
                    <div className="flex items-center space-x-3">
                      <MapPin className="h-5 w-5 text-blue-500" />
                      <div>
                        <div className="font-semibold">Doorstep Service</div>
                        <div className="text-sm text-gray-600">Technician visits your location</div>
                      </div>
                    </div>
                  </Label>
                </div>
              </div>
              
              <div className="border rounded-lg p-4">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="pickup" id="pickup" />
                  <Label htmlFor="pickup" className="flex-1">
                    <div className="flex items-center space-x-3">
                      <Clock className="h-5 w-5 text-green-500" />
                      <div>
                        <div className="font-semibold">Pickup & Delivery</div>
                        <div className="text-sm text-gray-600">We collect and return your device</div>
                      </div>
                    </div>
                  </Label>
                </div>
              </div>
            </RadioGroup>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="address">Service Address</Label>
                <Textarea
                  id="address"
                  placeholder="Enter your complete address..."
                  value={bookingData.address}
                  onChange={(e) => updateBookingData('address', e.target.value)}
                  className="mt-1"
                  rows={3}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="date">Preferred Date</Label>
                  <Input
                    id="date"
                    type="date"
                    value={bookingData.date}
                    onChange={(e) => updateBookingData('date', e.target.value)}
                    className="mt-1"
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>
                <div>
                  <Label htmlFor="time">Preferred Time</Label>
                  <Input
                    id="time"
                    type="time"
                    value={bookingData.time}
                    onChange={(e) => updateBookingData('time', e.target.value)}
                    className="mt-1"
                  />
                </div>
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Confirm Booking</h2>
              <p className="text-gray-600">Review your repair request</p>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium text-gray-700">Device:</span>
                  <p>{bookingData.brand} {bookingData.model}</p>
                  {bookingData.selectedProduct && (
                    <p className="text-xs text-gray-500">Model: {bookingData.selectedProduct.model}</p>
                  )}
                </div>
                <div>
                  <span className="font-medium text-gray-700">Issue:</span>
                  <p>{bookingData.issue}</p>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Service:</span>
                  <p>{bookingData.serviceType === 'doorstep' ? 'Doorstep Service' : 'Pickup & Delivery'}</p>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Date & Time:</span>
                  <p>{bookingData.date} at {bookingData.time}</p>
                </div>
              </div>
              
              <div>
                <span className="font-medium text-gray-700">Address:</span>
                <p className="text-sm">{bookingData.address}</p>
              </div>
              
              {bookingData.description && (
                <div>
                  <span className="font-medium text-gray-700">Description:</span>
                  <p className="text-sm">{bookingData.description}</p>
                </div>
              )}
            </div>
            
            <div className="bg-blue-50 rounded-lg p-4">
              <h3 className="font-semibold text-blue-900 mb-2">What happens next?</h3>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• We'll confirm your booking within 30 minutes</li>
                <li>• A certified technician will be assigned</li>
                <li>• You'll receive real-time updates via SMS/email</li>
                <li>• Payment is processed after successful repair</li>
              </ul>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button 
              variant="ghost" 
              onClick={() => navigate('/')}
              className="text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
            
            <div className="text-center">
              <h1 className="text-xl font-bold text-gray-900">Book a Repair</h1>
              <p className="text-sm text-gray-600">Step {step} of 5</p>
            </div>
            
            <div className="w-20"></div> {/* Spacer */}
          </div>
          
          {/* Progress Bar */}
          <div className="mt-4">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(step / 5) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-2xl mx-auto px-4 py-8">
        <Card>
          <CardContent className="p-8">
            {renderStepContent()}
            
            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8">
              <Button
                variant="outline"
                onClick={handlePrev}
                disabled={step === 1}
                className="flex items-center"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Previous
              </Button>
              
              {step < 5 ? (
                <Button
                  onClick={handleNext}
                  disabled={
                    (step === 1 && !bookingData.deviceType) ||
                    (step === 2 && (!bookingData.brand || !bookingData.model)) ||
                    (step === 3 && !bookingData.issue) ||
                    (step === 4 && (!bookingData.serviceType || !bookingData.address || !bookingData.date || !bookingData.time))
                  }
                  className="flex items-center bg-blue-600 hover:bg-blue-700"
                >
                  Next
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              ) : (
                <Button
                  onClick={handleSubmit}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  Confirm Booking
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BookRepair;
