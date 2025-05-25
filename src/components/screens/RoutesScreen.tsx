
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { MapPin, Clock, Fuel, Mountain, Zap } from 'lucide-react';

interface RoutesScreenProps {
  onNext: () => void;
  currentScreen: number;
  totalScreens: number;
  destination: string;
  transport: string;
}

const RoutesScreen: React.FC<RoutesScreenProps> = ({ onNext, currentScreen, totalScreens, destination, transport }) => {
  const [selectedRoute, setSelectedRoute] = useState<'time' | 'scenic' | 'fuel' | null>(null);

  const routes = [
    {
      id: 'time',
      name: 'Time Efficient',
      description: 'Fastest way to destination',
      duration: '4h 30m',
      distance: '320 km',
      color: 'blue',
      icon: Zap,
      bgColor: 'bg-blue-50 dark:bg-blue-800',
      borderColor: 'border-blue-500',
      textColor: 'text-blue-600 dark:text-blue-300'
    },
    {
      id: 'scenic',
      name: 'Scenic Route',
      description: 'Most enjoyable experience',
      duration: '6h 15m', 
      distance: '420 km',
      color: 'green',
      icon: Mountain,
      bgColor: 'bg-green-50 dark:bg-green-800',
      borderColor: 'border-green-500',
      textColor: 'text-green-600 dark:text-green-300'
    },
    {
      id: 'fuel',
      name: 'Fuel Efficient',
      description: 'Most economical option',
      duration: '5h 45m',
      distance: '280 km',
      color: 'red',
      icon: Fuel,
      bgColor: 'bg-red-50 dark:bg-red-800',
      borderColor: 'border-red-500',
      textColor: 'text-red-600 dark:text-red-300'
    }
  ];

  const handleRouteSelect = (routeId: 'time' | 'scenic' | 'fuel') => {
    setSelectedRoute(routeId);
  };

  return (
    <div className="h-full flex flex-col px-6 py-8">
      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center text-center">
        {/* Transport Icon */}
        <div className="w-16 h-16 bg-white dark:bg-gray-700 rounded-full shadow-lg flex items-center justify-center mb-8 animate-fade-in">
          <span className="text-2xl">
            {transport === 'car' ? '🚗' : transport === 'bike' ? '🏍️' : '🚕'}
          </span>
        </div>

        {/* Mock Map */}
        <div className="bg-gray-100 dark:bg-gray-700 rounded-xl h-48 w-full max-w-sm flex items-center justify-center mb-6">
          <div className="text-center">
            <MapPin size={32} className="text-gray-400 dark:text-gray-500 mx-auto mb-2" />
            <p className="text-gray-500 dark:text-gray-400 font-medium">Interactive Route Map</p>
            <p className="text-sm text-gray-400 dark:text-gray-500">Current location → {destination}</p>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-3">
          Choose Your Route to {destination}
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-xs">
          Select the best route for your {transport} journey
        </p>

        {/* Route Options */}
        <div className="space-y-3 w-full max-w-sm">
          {routes.map((route) => {
            const Icon = route.icon;
            return (
              <button
                key={route.id}
                onClick={() => handleRouteSelect(route.id as 'time' | 'scenic' | 'fuel')}
                className={`flex items-center p-4 rounded-2xl border-2 transition-all duration-200 w-full ${
                  selectedRoute === route.id 
                    ? `${route.bgColor} ${route.borderColor} shadow-lg scale-105` 
                    : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
              >
                <div className={`p-2 rounded-lg mr-4 ${selectedRoute === route.id ? route.bgColor : 'bg-gray-100 dark:bg-gray-700'}`}>
                  <Icon size={20} className={selectedRoute === route.id ? route.textColor : 'text-gray-600 dark:text-gray-300'} />
                </div>
                <div className="flex-1 text-left">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-semibold text-gray-800 dark:text-gray-100">{route.name}</h3>
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-300">{route.duration}</span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">{route.description}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{route.distance}</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Bottom Section */}
      <div className="w-full max-w-sm mx-auto mt-8">
        <Button 
          onClick={onNext}
          disabled={!selectedRoute}
          className="w-full h-12 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold rounded-full shadow-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50"
        >
          Continue with Selected Route
        </Button>
        
        <div className="flex justify-center mt-4 space-x-2">
          {Array.from({ length: totalScreens }, (_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentScreen ? 'bg-blue-500 w-6' : 'bg-gray-300 dark:bg-gray-600'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default RoutesScreen;
