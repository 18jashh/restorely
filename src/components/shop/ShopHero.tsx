
import React from 'react';
import { Button } from '@/components/ui/button';
import { Package, Truck, Shield, Star } from 'lucide-react';

export const ShopHero = () => {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Premium Accessories Store
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Genuine parts and accessories for all your devices. Quality guaranteed with fast shipping.
          </p>
          <div className="flex flex-wrap justify-center gap-8 mb-8">
            <div className="flex items-center space-x-2">
              <Package className="h-6 w-6" />
              <span>Genuine Parts</span>
            </div>
            <div className="flex items-center space-x-2">
              <Truck className="h-6 w-6" />
              <span>Fast Delivery</span>
            </div>
            <div className="flex items-center space-x-2">
              <Shield className="h-6 w-6" />
              <span>1 Year Warranty</span>
            </div>
            <div className="flex items-center space-x-2">
              <Star className="h-6 w-6" />
              <span>5-Star Rated</span>
            </div>
          </div>
          <Button 
            size="lg" 
            className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-8 py-3"
            onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Shop Now
          </Button>
        </div>
      </div>
    </div>
  );
};
