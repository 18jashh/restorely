
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Phone, Clock, Star, Navigation } from 'lucide-react';
import { ServiceCenter } from '@/pages/ServiceCenters';

interface ServiceCenterListProps {
  centers: ServiceCenter[];
  onCenterSelect: (center: ServiceCenter) => void;
}

export const ServiceCenterList: React.FC<ServiceCenterListProps> = ({
  centers,
  onCenterSelect
}) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">All Service Centers</h2>
      
      <div className="grid gap-6">
        {centers.map((center) => (
          <Card key={center.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        {center.name}
                      </h3>
                      <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
                        <div className="flex items-center">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                          <span>{center.rating}</span>
                        </div>
                        {center.distance && (
                          <div className="flex items-center">
                            <MapPin className="h-4 w-4 mr-1" />
                            <span>{center.distance} miles away</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div className="space-y-3">
                      <div className="flex items-start space-x-3">
                        <MapPin className="h-4 w-4 mt-1 text-gray-500" />
                        <p className="text-sm text-gray-600">{center.address}</p>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        <Phone className="h-4 w-4 text-gray-500" />
                        <p className="text-sm text-gray-600">{center.phone}</p>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex items-start space-x-3">
                        <Clock className="h-4 w-4 mt-1 text-gray-500" />
                        <div className="text-sm text-gray-600">
                          <p>Mon-Fri: {center.workingHours.weekdays}</p>
                          <p>Sat-Sun: {center.workingHours.weekends}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <p className="text-sm font-medium text-gray-700 mb-2">Services Available:</p>
                    <div className="flex flex-wrap gap-2">
                      {center.services.map((service, index) => (
                        <Badge key={index} variant="secondary">
                          {service}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row lg:flex-col gap-2 lg:ml-6">
                  <Button
                    onClick={() => onCenterSelect(center)}
                    variant="outline"
                    className="w-full sm:w-auto"
                  >
                    <MapPin className="h-4 w-4 mr-2" />
                    View on Map
                  </Button>
                  <Button className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700">
                    <Navigation className="h-4 w-4 mr-2" />
                    Get Directions
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
