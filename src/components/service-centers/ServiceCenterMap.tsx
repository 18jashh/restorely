
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { MapPin, Navigation } from 'lucide-react';
import { ServiceCenter } from '@/pages/ServiceCenters';

interface ServiceCenterMapProps {
  centers: ServiceCenter[];
  userLocation: [number, number] | null;
  selectedCenter: ServiceCenter | null;
  onCenterSelect: (center: ServiceCenter) => void;
}

export const ServiceCenterMap: React.FC<ServiceCenterMapProps> = ({
  centers,
  userLocation,
  selectedCenter,
  onCenterSelect
}) => {
  // This is a placeholder for the actual Google Maps integration
  // In a real implementation, you would use Google Maps JavaScript API
  
  return (
    <Card className="h-96 lg:h-[600px]">
      <CardContent className="p-0 h-full relative">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg flex items-center justify-center">
          <div className="text-center">
            <MapPin className="h-16 w-16 text-blue-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              Interactive Map Coming Soon
            </h3>
            <p className="text-gray-500 mb-4">
              Google Maps integration will show service centers near you
            </p>
            <div className="space-y-2">
              {centers.map((center) => (
                <button
                  key={center.id}
                  onClick={() => onCenterSelect(center)}
                  className={`block w-full text-left p-3 rounded-lg border transition-colors ${
                    selectedCenter?.id === center.id
                      ? 'bg-blue-50 border-blue-300'
                      : 'bg-white border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-gray-900">{center.name}</h4>
                      <p className="text-sm text-gray-500">{center.address}</p>
                      {center.distance && (
                        <p className="text-sm text-blue-600">{center.distance} miles away</p>
                      )}
                    </div>
                    <Navigation className="h-4 w-4 text-gray-400" />
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
        
        {/* Overlay showing it's a placeholder */}
        <div className="absolute top-4 right-4 bg-yellow-100 border border-yellow-300 rounded-lg p-2">
          <p className="text-xs text-yellow-700">
            🗺️ Map Placeholder - Google Maps API integration needed
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
