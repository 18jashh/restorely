
import React, { useState, useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { ServiceCenterMap } from '@/components/service-centers/ServiceCenterMap';
import { ServiceCenterList } from '@/components/service-centers/ServiceCenterList';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, Clock, Phone, Navigation } from 'lucide-react';

export interface ServiceCenter {
  id: string;
  name: string;
  address: string;
  phone: string;
  coordinates: [number, number]; // [lat, lng]
  workingHours: {
    weekdays: string;
    weekends: string;
  };
  services: string[];
  rating: number;
  distance?: number;
}

const ServiceCenters = () => {
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  const [selectedCenter, setSelectedCenter] = useState<ServiceCenter | null>(null);
  const [isMapView, setIsMapView] = useState(true);

  // Mock service centers data
  const serviceCenters: ServiceCenter[] = [
    {
      id: '1',
      name: 'Restorely Downtown',
      address: '123 Main Street, Downtown, NY 10001',
      phone: '+1 (555) 123-4567',
      coordinates: [40.7128, -74.0060],
      workingHours: {
        weekdays: '9:00 AM - 8:00 PM',
        weekends: '10:00 AM - 6:00 PM'
      },
      services: ['iPhone Repair', 'Samsung Repair', 'Laptop Repair', 'Screen Replacement'],
      rating: 4.8
    },
    {
      id: '2',
      name: 'Restorely Mall Center',
      address: '456 Shopping Mall, Level 2, NY 10002',
      phone: '+1 (555) 234-5678',
      coordinates: [40.7589, -73.9851],
      workingHours: {
        weekdays: '10:00 AM - 9:00 PM',
        weekends: '10:00 AM - 8:00 PM'
      },
      services: ['All Device Repairs', 'Express Service', 'Warranty Claims'],
      rating: 4.6
    },
    {
      id: '3',
      name: 'Restorely Tech Hub',
      address: '789 Tech Avenue, Brooklyn, NY 11201',
      phone: '+1 (555) 345-6789',
      coordinates: [40.6892, -73.9442],
      workingHours: {
        weekdays: '8:00 AM - 7:00 PM',
        weekends: '9:00 AM - 5:00 PM'
      },
      services: ['Premium Repairs', 'Data Recovery', 'Hardware Upgrades'],
      rating: 4.9
    }
  ];

  useEffect(() => {
    getUserLocation();
  }, []);

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation([latitude, longitude]);
          calculateDistances([latitude, longitude]);
        },
        (error) => {
          console.error('Error getting location:', error);
          // Fallback to NYC coordinates
          setUserLocation([40.7128, -74.0060]);
          calculateDistances([40.7128, -74.0060]);
        }
      );
    }
  };

  const calculateDistances = (userCoords: [number, number]) => {
    // Simple distance calculation (in practice, you'd use a proper distance calculation)
    serviceCenters.forEach(center => {
      const distance = Math.sqrt(
        Math.pow(center.coordinates[0] - userCoords[0], 2) +
        Math.pow(center.coordinates[1] - userCoords[1], 2)
      ) * 69; // Rough miles conversion
      center.distance = Math.round(distance * 10) / 10;
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Find Your Nearest Service Center
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Locate Restorely service centers near you for quick and reliable device repairs
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button
              onClick={() => setIsMapView(true)}
              variant={isMapView ? "secondary" : "outline"}
              size="lg"
              className={isMapView ? "bg-white text-blue-600" : "border-white text-white hover:bg-white hover:text-blue-600"}
            >
              <MapPin className="h-5 w-5 mr-2" />
              Map View
            </Button>
            <Button
              onClick={() => setIsMapView(false)}
              variant={!isMapView ? "secondary" : "outline"}
              size="lg"
              className={!isMapView ? "bg-white text-blue-600" : "border-white text-white hover:bg-white hover:text-blue-600"}
            >
              List View
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {isMapView ? (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Map */}
            <div className="lg:col-span-2">
              <ServiceCenterMap
                centers={serviceCenters}
                userLocation={userLocation}
                selectedCenter={selectedCenter}
                onCenterSelect={setSelectedCenter}
              />
            </div>
            
            {/* Selected Center Details */}
            <div>
              {selectedCenter ? (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <MapPin className="h-5 w-5 mr-2 text-blue-600" />
                      {selectedCenter.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <MapPin className="h-4 w-4 mt-1 text-gray-500" />
                      <p className="text-sm text-gray-600">{selectedCenter.address}</p>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <Phone className="h-4 w-4 text-gray-500" />
                      <p className="text-sm text-gray-600">{selectedCenter.phone}</p>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center space-x-3">
                        <Clock className="h-4 w-4 text-gray-500" />
                        <p className="text-sm font-medium">Working Hours</p>
                      </div>
                      <p className="text-sm text-gray-600 ml-7">
                        Mon-Fri: {selectedCenter.workingHours.weekdays}
                      </p>
                      <p className="text-sm text-gray-600 ml-7">
                        Sat-Sun: {selectedCenter.workingHours.weekends}
                      </p>
                    </div>
                    
                    <div>
                      <p className="text-sm font-medium mb-2">Services Available</p>
                      <div className="flex flex-wrap gap-1">
                        {selectedCenter.services.map((service, index) => (
                          <span
                            key={index}
                            className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded"
                          >
                            {service}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <Button className="w-full bg-blue-600 hover:bg-blue-700">
                      <Navigation className="h-4 w-4 mr-2" />
                      Get Directions
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <Card>
                  <CardContent className="p-8 text-center">
                    <MapPin className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">Click on a marker to view center details</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        ) : (
          <ServiceCenterList
            centers={serviceCenters}
            onCenterSelect={setSelectedCenter}
          />
        )}
      </div>

      <Footer />
    </div>
  );
};

export default ServiceCenters;
