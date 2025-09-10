
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, MapPin, Award, CheckCircle, ChevronLeft, ChevronRight } from 'lucide-react';

export interface Technician {
  id: string;
  name: string;
  photo: string;
  location: string;
  rating: number;
  reviews: number;
  specialties: string[];
  verified: boolean;
  completedRepairs: number;
  yearsExperience: number;
  certifications: string[];
}

const mockTechnicians: Technician[] = [
  {
    id: '1',
    name: 'John Martinez',
  photo: '',
    location: 'New York, NY',
    rating: 4.9,
    reviews: 1250,
    specialties: ['iPhone Repair', 'Samsung Galaxy', 'Screen Replacement'],
    verified: true,
    completedRepairs: 2840,
    yearsExperience: 8,
    certifications: ['Apple Certified', 'Samsung Certified']
  },
  {
    id: '2',
    name: 'Sarah Chen',
    photo: '/placeholder.svg',
    location: 'Los Angeles, CA',
    rating: 4.8,
    reviews: 980,
    specialties: ['MacBook Repair', 'iPad', 'Data Recovery'],
    verified: true,
    completedRepairs: 1890,
    yearsExperience: 6,
    certifications: ['Apple Certified', 'Data Recovery Expert']
  },
  {
    id: '3',
    name: 'Michael Johnson',
    photo: '/placeholder.svg',
    location: 'Chicago, IL',
    rating: 4.9,
    reviews: 1456,
    specialties: ['Android Repair', 'Tablet Repair', 'Water Damage'],
    verified: true,
    completedRepairs: 3120,
    yearsExperience: 10,
    certifications: ['Samsung Certified', 'Google Certified']
  },
  {
    id: '4',
    name: 'Emily Rodriguez',
    photo: '/placeholder.svg',
    location: 'Miami, FL',
    rating: 4.7,
    reviews: 756,
    specialties: ['iPhone Repair', 'Battery Replacement', 'Camera Repair'],
    verified: true,
    completedRepairs: 1567,
    yearsExperience: 5,
    certifications: ['Apple Certified']
  },
  {
    id: '5',
    name: 'David Kim',
    photo: '/placeholder.svg',
    location: 'Seattle, WA',
    rating: 4.8,
    reviews: 1123,
    specialties: ['Laptop Repair', 'Gaming Console', 'Hardware Upgrade'],
    verified: true,
    completedRepairs: 2234,
    yearsExperience: 7,
    certifications: ['Microsoft Certified', 'Sony Certified']
  },
  {
    id: '6',
    name: 'Lisa Thompson',
    photo: '/placeholder.svg',
    location: 'Austin, TX',
    rating: 4.9,
    reviews: 892,
    specialties: ['OnePlus Repair', 'Google Pixel', 'Custom ROM'],
    verified: true,
    completedRepairs: 1678,
    yearsExperience: 6,
    certifications: ['Google Certified', 'OnePlus Certified']
  }
];

export const TopTechnicians = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerPage] = useState(3);

  const totalPages = Math.ceil(mockTechnicians.length / itemsPerPage);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % totalPages);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + totalPages) % totalPages);
  };

  const currentTechnicians = mockTechnicians.slice(
    currentIndex * itemsPerPage,
    (currentIndex + 1) * itemsPerPage
  );

  const handleBookAgain = (technician: Technician) => {
    // Simulate booking
    alert(`Booking appointment with ${technician.name}...`);
  };

  return (
    <div className="py-12">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Our Top-Rated Technicians
        </h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Certified experts with thousands of successful repairs and outstanding customer reviews
        </p>
      </div>

      {/* Desktop Grid View */}
      <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
        {mockTechnicians.map((technician) => (
          <TechnicianCard
            key={technician.id}
            technician={technician}
            onBookAgain={handleBookAgain}
          />
        ))}
      </div>

      {/* Mobile Carousel View */}
      <div className="md:hidden">
        <div className="relative">
          <div className="flex gap-4 overflow-hidden">
            {currentTechnicians.map((technician) => (
              <div key={technician.id} className="w-full flex-shrink-0">
                <TechnicianCard
                  technician={technician}
                  onBookAgain={handleBookAgain}
                />
              </div>
            ))}
          </div>

          {/* Carousel Controls */}
          <div className="flex items-center justify-between mt-6">
            <Button
              variant="outline"
              onClick={prevSlide}
              disabled={currentIndex === 0}
              className="h-8 w-8 p-0"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>

            <div className="flex space-x-2">
              {Array.from({ length: totalPages }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentIndex ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>

            <Button
              variant="outline"
              onClick={nextSlide}
              disabled={currentIndex === totalPages - 1}
              className="h-8 w-8 p-0"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

interface TechnicianCardProps {
  technician: Technician;
  onBookAgain: (technician: Technician) => void;
}

const TechnicianCard: React.FC<TechnicianCardProps> = ({ technician, onBookAgain }) => {
  return (
    <Card className="hover:shadow-lg transition-shadow duration-200">
      <CardContent className="p-6">
        {/* Header with Photo and Verified Badge */}
        <div className="relative mb-4">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <img
                src={technician.photo}
                alt={technician.name}
                className="w-16 h-16 rounded-full object-cover"
              />
              {technician.verified && (
                <div className="absolute -top-1 -right-1 bg-green-500 rounded-full p-1">
                  <CheckCircle className="h-4 w-4 text-white" />
                </div>
              )}
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-lg text-gray-900">
                {technician.name}
              </h3>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <MapPin className="h-3 w-3" />
                <span>{technician.location}</span>
              </div>
            </div>
          </div>
          {technician.verified && (
            <Badge className="absolute top-0 right-0 bg-green-500 hover:bg-green-600">
              <CheckCircle className="h-3 w-3 mr-1" />
              Verified
            </Badge>
          )}
        </div>

        {/* Rating and Reviews */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <div className="flex items-center">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="font-semibold ml-1">{technician.rating}</span>
            </div>
            <span className="text-gray-500 text-sm">
              ({technician.reviews} reviews)
            </span>
          </div>
          <div className="flex items-center space-x-1 text-sm text-gray-600">
            <Award className="h-4 w-4" />
            <span>{technician.yearsExperience}y exp</span>
          </div>
        </div>

        {/* Specialties */}
        <div className="mb-4">
          <p className="text-sm font-medium text-gray-700 mb-2">Specialties:</p>
          <div className="flex flex-wrap gap-1">
            {technician.specialties.map((specialty, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {specialty}
              </Badge>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 mb-4 text-center">
          <div className="bg-gray-50 rounded-lg p-2">
            <p className="text-lg font-semibold text-gray-900">
              {technician.completedRepairs.toLocaleString()}
            </p>
            <p className="text-xs text-gray-600">Repairs</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-2">
            <p className="text-lg font-semibold text-gray-900">
              {technician.certifications.length}
            </p>
            <p className="text-xs text-gray-600">Certifications</p>
          </div>
        </div>

        {/* Action Button */}
        <Button
          onClick={() => onBookAgain(technician)}
          className="w-full bg-blue-600 hover:bg-blue-700"
        >
          Book Again
        </Button>
      </CardContent>
    </Card>
  );
};
