
import React from 'react';
import { Hero } from '@/components/Hero';
import { HowItWorks } from '@/components/HowItWorks';
import { Services } from '@/components/Services';
import { TrustIndicators } from '@/components/TrustIndicators';
import { Footer } from '@/components/Footer';
import { Navbar } from '@/components/Navbar';

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <TrustIndicators />
      <Services />
      <HowItWorks />
      <Footer />
    </div>
  );
};

export default Index;
