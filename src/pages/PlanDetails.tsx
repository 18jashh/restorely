
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check, ArrowLeft, Crown, Zap, Shield } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const PlanDetails = () => {
  const { planName } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const plans = [
    {
      id: 'basic',
      name: 'Basic',
      price: 'Free',
      icon: Shield,
      color: 'bg-green-500',
      popular: false,
      features: [
        'Book doorstep technician or pickup',
        'AI Troubleshooting Assistant',
        'Standard slot availability',
        'Chat Support'
      ],
      comparison: {
        technicians: 'Standard pool',
        waitTime: '24-48 hours',
        warranty: 'Standard',
        support: 'Chat only',
        tracking: 'Basic'
      }
    },
    {
      id: 'premium',
      name: 'Premium',
      price: '₹299/month',
      icon: Zap,
      color: 'bg-yellow-500',
      popular: true,
      features: [
        'All Basic features +',
        'Priority Technician Assignment',
        'Shorter wait times',
        'Extended Warranty (on paid repairs)',
        'Dedicated Email Support'
      ],
      comparison: {
        technicians: 'Priority assignment',
        waitTime: '12-24 hours',
        warranty: 'Extended',
        support: 'Email + Chat',
        tracking: 'Real-time'
      }
    },
    {
      id: 'elite',
      name: 'Elite',
      price: '₹699/month',
      icon: Crown,
      color: 'bg-red-500',
      popular: false,
      features: [
        'All Premium features +',
        'SuperFast Repair (within 2 hours) — cities only',
        'Live Technician Tracking + OTP verification',
        'Free Pickup & Drop (2/month)',
        'Early Access to New Features',
        '20% Discount on Accessories Store',
        'VIP Support via WhatsApp'
      ],
      comparison: {
        technicians: 'Top-rated experts',
        waitTime: '2-4 hours',
        warranty: 'Premium extended',
        support: 'WhatsApp VIP',
        tracking: 'Live + OTP'
      }
    }
  ];

  const plan = plans.find(p => p.id === planName?.toLowerCase());

  if (!plan) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Plan not found</h1>
          <Button onClick={() => navigate('/home')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
        </div>
      </div>
    );
  }

  const handleSubscribe = () => {
    setLoading(true);
    
    setTimeout(() => {
      setLoading(false);
      localStorage.setItem('restorely_plan', plan.id);
      localStorage.setItem('token', 'mock_token_' + Date.now());
      toast({
        title: `${plan.name} Plan Activated!`,
        description: "Welcome to Restorely. Redirecting to your dashboard...",
      });
      
      setTimeout(() => {
        navigate('/home');
      }, 1500);
    }, 2000);
  };

  const IconComponent = plan.icon;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Button 
            variant="outline" 
            onClick={() => navigate('/home')}
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Plans
          </Button>
          
          <div className="flex items-center space-x-4">
            <div className={`p-3 rounded-full ${plan.color}`}>
              <IconComponent className="h-8 w-8 text-white" />
            </div>
            <div>
              <div className="flex items-center space-x-3">
                <h1 className="text-3xl font-bold text-gray-900">{plan.name} Plan</h1>
                {plan.popular && (
                  <Badge className="bg-blue-600 text-white">Most Popular</Badge>
                )}
              </div>
              <p className="text-2xl font-bold text-blue-600 mt-1">{plan.price}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Plan Details */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>What's Included</CardTitle>
                <CardDescription>
                  Everything you get with the {plan.name} plan
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Subscribe Button */}
            <Card className="mt-8">
              <CardContent className="p-6 text-center">
                <h3 className="text-lg font-semibold mb-4">Ready to get started?</h3>
                <Button 
                  size="lg"
                  className={`w-full h-12 font-semibold ${
                    plan.id === 'basic' 
                      ? 'bg-green-600 hover:bg-green-700' 
                      : plan.id === 'premium'
                      ? 'bg-yellow-600 hover:bg-yellow-700'
                      : 'bg-red-600 hover:bg-red-700'
                  }`}
                  onClick={handleSubscribe}
                  disabled={loading}
                >
                  {loading ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      {plan.id === 'basic' ? 'Setting up...' : 'Processing Payment...'}
                    </div>
                  ) : (
                    plan.id === 'basic' ? 'Get Started Free' : `Subscribe to ${plan.name}`
                  )}
                </Button>
                {plan.id !== 'basic' && (
                  <p className="text-sm text-gray-500 mt-2">
                    7-day free trial • Cancel anytime
                  </p>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Comparison Table */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Plan Comparison</CardTitle>
                <CardDescription>
                  See how {plan.name} compares to other plans
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="font-medium text-gray-900">Feature</div>
                    <div className="font-medium text-gray-900">{plan.name}</div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm border-t pt-4">
                    <div className="text-gray-600">Technician Pool</div>
                    <div className="font-medium">{plan.comparison.technicians}</div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="text-gray-600">Response Time</div>
                    <div className="font-medium">{plan.comparison.waitTime}</div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="text-gray-600">Warranty</div>
                    <div className="font-medium">{plan.comparison.warranty}</div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="text-gray-600">Support</div>
                    <div className="font-medium">{plan.comparison.support}</div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="text-gray-600">Tracking</div>
                    <div className="font-medium">{plan.comparison.tracking}</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* FAQ */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Frequently Asked</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 text-sm">
                  <div>
                    <h4 className="font-medium text-gray-900">Can I change plans later?</h4>
                    <p className="text-gray-600 mt-1">Yes, you can upgrade or downgrade anytime from your dashboard.</p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-gray-900">What's the refund policy?</h4>
                    <p className="text-gray-600 mt-1">Full refund within 7 days, no questions asked.</p>
                  </div>
                  
                  {plan.id !== 'basic' && (
                    <div>
                      <h4 className="font-medium text-gray-900">How does billing work?</h4>
                      <p className="text-gray-600 mt-1">Monthly billing, cancel anytime. No long-term contracts.</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlanDetails;
