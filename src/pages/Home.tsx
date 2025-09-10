
import React, { useState, useEffect } from 'react';
import { AuthAwareHeader } from '@/components/AuthAwareHeader';
import { WelcomeBanner } from '@/components/home/WelcomeBanner';
import { DashboardQuickLinks } from '@/components/home/DashboardQuickLinks';
import { LoginPrompt } from '@/components/home/LoginPrompt';
import { Hero } from '@/components/Hero';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Shield, 
  Zap, 
  Crown, 
  Check, 
  ArrowRight,
  Users,
  Wrench
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

export const Home = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Simple auth state check
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('User');
  const [currentPlan, setCurrentPlan] = useState('basic');

  useEffect(() => {
    // Check authentication status
    const token = localStorage.getItem('token');
    const savedPlan = localStorage.getItem('restorely_plan');
    
    if (token) {
      setIsLoggedIn(true);
      // You could decode the token to get actual user name
      setUserName('John Doe'); // Mock user name
    }
    
    if (savedPlan) {
      setCurrentPlan(savedPlan.toLowerCase());
    }
  }, []);

  const plans = [
    {
      id: 'basic',
      name: 'Basic',
      price: 'Free',
      icon: Shield,
      color: 'bg-green-500',
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

  const handlePlanView = (planId: string) => {
    if (!isLoggedIn && (planId === 'premium' || planId === 'elite')) {
      toast({
        title: "Login Required",
        description: "Please sign in to subscribe to premium plans.",
      });
      navigate('/login');
      return;
    }
    
    navigate(`/plans/${planId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Auth-aware Header */}
      <AuthAwareHeader isLoggedIn={isLoggedIn} userName={userName} />

      {/* Conditional Content based on Auth Status */}
      {isLoggedIn ? (
        <>
          {/* Logged-in User Experience */}
          <WelcomeBanner userName={userName} currentPlan={currentPlan} />
          <DashboardQuickLinks />
        </>
      ) : (
        <>
          {/* Non-logged-in User Experience */}
          <Hero />
          <LoginPrompt />
        </>
      )}

      {/* Subscription Plans Section - Available to All */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            {isLoggedIn ? 'Upgrade Your Plan' : 'Choose Your Plan'}
          </h2>
          <p className="text-lg text-gray-600">
            {isLoggedIn 
              ? `You're currently on the ${currentPlan.charAt(0).toUpperCase() + currentPlan.slice(1)} plan`
              : 'Select the perfect plan for your device repair needs'
            }
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan) => {
            const IconComponent = plan.icon;
            const isCurrentPlan = isLoggedIn && plan.id === currentPlan;
            
            return (
              <Card 
                key={plan.id} 
                className={`relative transition-all duration-300 hover:shadow-xl border-2 cursor-pointer ${
                  isCurrentPlan 
                    ? 'border-indigo-500 shadow-lg bg-indigo-50' 
                    : 'border-gray-200 hover:border-gray-300'
                } ${plan.popular ? 'scale-105' : ''}`}
                onClick={() => handlePlanView(plan.id)}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-blue-600 text-white px-4 py-1">
                      Most Popular
                    </Badge>
                  </div>
                )}

                {isCurrentPlan && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-indigo-600 text-white px-4 py-1">
                      Your Current Plan
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
                      isCurrentPlan
                        ? 'bg-gray-400 cursor-not-allowed'
                        : plan.id === 'premium'
                        ? 'bg-yellow-600 hover:bg-yellow-700'
                        : plan.id === 'elite'
                        ? 'bg-red-600 hover:bg-red-700'
                        : 'bg-green-600 hover:bg-green-700'
                    }`}
                    disabled={isCurrentPlan}
                  >
                    {isCurrentPlan 
                      ? 'Current Plan' 
                      : isLoggedIn 
                      ? `View ${plan.name} Details` 
                      : `Choose ${plan.name}`
                    }
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Technician Showcase - Available to All */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Trusted by Thousands
            </h2>
            <p className="text-lg text-gray-600">
              Our certified technicians have completed over 50,000 repairs
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Expert Technicians</h3>
                <p className="text-gray-600">Certified professionals with years of experience</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Wrench className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Quality Parts</h3>
                <p className="text-gray-600">Genuine and high-quality replacement components</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Warranty</h3>
                <p className="text-gray-600">Comprehensive warranty on all repairs</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      {!isLoggedIn && (
        <section className="bg-gradient-to-r from-blue-600 to-indigo-600 py-16">
          <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Fix Your Device?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Join thousands of satisfied customers today
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg"
                variant="secondary"
                onClick={() => navigate('/login')}
                className="text-lg px-8 py-4"
              >
                Get Started Free
              </Button>
              <Button 
                size="lg"
                variant="outline"
                onClick={() => navigate('/book')}
                className="text-lg px-8 py-4 text-white border-white hover:bg-white hover:text-blue-600"
              >
                Book Repair Now
              </Button>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default Home;
