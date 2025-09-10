
import React from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { TopTechnicians } from '@/components/technicians/TopTechnicians';
import { TechnicianStats } from '@/components/technicians/TechnicianStats';

const Technicians = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Our Expert Technicians
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Meet our certified repair specialists who deliver exceptional service with a smile
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <TechnicianStats />
        <TopTechnicians />
      </div>

      <Footer />
    </div>
  );
};

export default Technicians;
