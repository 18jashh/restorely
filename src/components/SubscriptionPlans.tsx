
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check, Zap, Crown, Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

export const SubscriptionPlans = () => {
  const [selectedPlan, setSelectedPlan] = useState<string>('');
  const navigate = useNavigate();
  const { toast } = useToast();

  const plans = [
    {
      id: 'basic',
      name: 'Basic',
      price: 'Free',
      icon: Shield,
      color: 'bg-green-500',
      badgeColor: 'bg-green-100 text-green-700',
      features: [
        'Book doorstep technician or pickup',
        'AI Troubleshooting Assistant',
        'Standard slot availability',
        'Chat Support'
      ]
    },
    {
      id: 'premium',
      name: 'Premium',
      price: '₹299/month',
      icon: Zap,
      color: 'bg-yellow-500',
      badgeColor: 'bg-yellow-100 text-yellow-700',
      popular: true,
      features: [
        'All Basic features +',
        'Priority Technician Assignment',
        'Shorter wait times',
        'Extended Warranty (on paid repairs)',
        'Dedicated Email Support'
      ]
    },
    {
      id: 'elite',
      name: 'Elite',
      price: '₹699/month',
      icon: Crown,
      color: 'bg-red-500',
      badgeColor: 'bg-red-100 text-red-700',
      features: [
        'All Premium features +',
        'SuperFast Repair (within 2 hours) — cities only',
        'Live Technician Tracking + OTP verification',
        'Free Pickup & Drop (2/month)',
        'Early Access to New Features',
        '20% Discount on Accessories Store',
        'VIP Support via WhatsApp'
      ]
    }
  ];

  const handleSelectPlan = (planId: string) => {
    setSelectedPlan(planId);
    toast({
      title: `${plans.find(p => p.id === planId)?.name} Plan Selected`,
      description: "Redirecting to plan details...",
    });
    
    // Navigate to plan details page
    setTimeout(() => {
      navigate(`/plans/${planId}`);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Choose Your Plan
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Select the perfect plan for your device repair needs. Upgrade or downgrade anytime.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan) => {
            const IconComponent = plan.icon;
            return (
              <Card 
                key={plan.id} 
                className={`relative transition-all duration-300 hover:shadow-xl border-2 cursor-pointer ${
                  selectedPlan === plan.id ? 'border-blue-500 shadow-lg' : 'border-gray-200'
                } ${plan.popular ? 'scale-105' : ''}`}
                onClick={() => handleSelectPlan(plan.id)}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-blue-600 text-white px-4 py-1">
                      Most Popular
                    </Badge>
                  </div>
                )}

                <CardHeader className="text-center pb-4">
                  <div className="flex items-center justify-center mb-4">
                    <div className={`p-3 rounded-full ${plan.color}`}>
                      <IconComponent className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  
                  <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                  <CardDescription className="text-3xl font-bold text-gray-900 mt-2">
                    {plan.price}
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-6">
                  <ul className="space-y-3">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start space-x-3">
                        <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button 
                    className={`w-full h-12 font-semibold ${
                      plan.id === 'basic' 
                        ? 'bg-green-600 hover:bg-green-700' 
                        : plan.id === 'premium'
                        ? 'bg-yellow-600 hover:bg-yellow-700'
                        : 'bg-red-600 hover:bg-red-700'
                    }`}
                    disabled={selectedPlan !== '' && selectedPlan !== plan.id}
                  >
                    {selectedPlan === plan.id ? 'Selected!' : `Choose ${plan.name}`}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">
            All plans include free consultation and transparent pricing
          </p>
          <Button 
            variant="outline" 
            onClick={() => navigate('/home')}
            className="mx-auto"
          >
            Skip for now - Continue with Basic
          </Button>
        </div>
      </div>
    </div>
  );
};
