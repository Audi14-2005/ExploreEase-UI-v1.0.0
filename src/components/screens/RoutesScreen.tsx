
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';

interface RoutesScreenProps {
  onNext: () => void;
  currentScreen: number;
  totalScreens: number;
}

const RoutesScreen: React.FC<RoutesScreenProps> = ({ onNext, currentScreen, totalScreens }) => {
  const [selectedRoute, setSelectedRoute] = useState<'time' | 'scenic' | 'fuel' | null>(null);

  const handleRouteSelect = (route: 'time' | 'scenic' | 'fuel') => {
    setSelectedRoute(route);
  };

  return (
    <div className="h-full flex flex-col px-6 py-8">
      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center text-center">
        {/* Route Icon */}
        <div className="w-16 h-16 bg-white rounded-full shadow-lg flex items-center justify-center mb-8 animate-fade-in">
          <span className="text-2xl">🗺️</span>
        </div>

        {/* Interactive Map Mockup */}
        <div className="relative mb-8 animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <div className="w-56 h-32 bg-white rounded-2xl shadow-xl p-3 border-4 border-blue-100">
            <svg viewBox="0 0 240 120" className="w-full h-full">
              <rect width="240" height="120" fill="#F0F9FF" rx="8" />
              
              {/* Time Efficient Route - Blue */}
              <path
                d="M20 80 Q60 40 120 60 Q180 80 220 40"
                stroke={selectedRoute === 'time' ? "#3B82F6" : "#D1D5DB"}
                strokeWidth={selectedRoute === 'time' ? "6" : "4"}
                fill="none"
                className={selectedRoute === 'time' ? "animate-[draw-path_2s_ease-in-out_infinite]" : ""}
              />
              
              {/* Scenic Route - Green */}
              <path
                d="M20 80 Q120 20 220 40"
                stroke={selectedRoute === 'scenic' ? "#22C55E" : "#D1D5DB"}
                strokeWidth={selectedRoute === 'scenic' ? "6" : "3"}
                strokeDasharray={selectedRoute === 'scenic' ? "none" : "6,3"}
                fill="none"
                className={selectedRoute === 'scenic' ? "animate-[draw-path_2s_ease-in-out_infinite]" : ""}
              />
              
              {/* Fuel Efficient Route - Red */}
              <path
                d="M20 80 Q80 100 220 40"
                stroke={selectedRoute === 'fuel' ? "#EF4444" : "#D1D5DB"}
                strokeWidth={selectedRoute === 'fuel' ? "6" : "3"}
                strokeDasharray={selectedRoute === 'fuel' ? "none" : "4,2"}
                fill="none"
                className={selectedRoute === 'fuel' ? "animate-[draw-path_2s_ease-in-out_infinite]" : ""}
              />
              
              <circle cx="20" cy="80" r="6" fill="#10B981" />
              <circle cx="220" cy="40" r="6" fill="#EF4444" />
              
              {selectedRoute && (
                <text x="110" y="30" fontSize="16" className="animate-bounce">✈️</text>
              )}
              <text x="200" y="50" fontSize="12" className="animate-pulse">🏁</text>
            </svg>
          </div>
          
          <div className="absolute -top-2 left-6 text-lg animate-bounce">📍</div>
          <div className="absolute -bottom-2 right-6 text-lg animate-bounce" style={{ animationDelay: '0.3s' }}>🎯</div>
        </div>

        <h2 className="text-2xl font-bold text-blue-600 mb-3 animate-fade-in" style={{ animationDelay: '0.4s' }}>
          Explore Different Routes
        </h2>
        <p className="text-gray-600 mb-4 max-w-xs animate-fade-in" style={{ animationDelay: '0.6s' }}>
          Choose from three optimized route options:
        </p>

        {/* Interactive Route Options */}
        <div className="space-y-3 w-full max-w-xs animate-fade-in" style={{ animationDelay: '0.8s' }}>
          <button
            onClick={() => handleRouteSelect('time')}
            className={`flex items-center p-3 rounded-2xl border-2 transition-all duration-200 w-full ${
              selectedRoute === 'time' 
                ? 'bg-blue-100 border-blue-500 shadow-lg scale-105' 
                : 'bg-blue-50 border-blue-200 hover:bg-blue-100'
            }`}
          >
            <div className={`w-3 h-3 rounded-full mr-3 ${
              selectedRoute === 'time' ? 'bg-blue-600 animate-pulse' : 'bg-blue-500'
            }`}></div>
            <div className="flex-1 text-left">
              <div className="font-semibold text-sm text-gray-800">Time Efficient</div>
              <div className="text-xs text-gray-600">Fastest way to destination</div>
            </div>
          </button>
          
          <button
            onClick={() => handleRouteSelect('scenic')}
            className={`flex items-center p-3 rounded-2xl border-2 transition-all duration-200 w-full ${
              selectedRoute === 'scenic' 
                ? 'bg-green-100 border-green-500 shadow-lg scale-105' 
                : 'bg-green-50 border-green-200 hover:bg-green-100'
            }`}
          >
            <div className={`w-3 h-3 rounded-full mr-3 ${
              selectedRoute === 'scenic' ? 'bg-green-600 animate-pulse' : 'bg-green-500'
            }`}></div>
            <div className="flex-1 text-left">
              <div className="font-semibold text-sm text-gray-800">Scenic/Fun</div>
              <div className="text-xs text-gray-600">Most enjoyable experience</div>
            </div>
          </button>
          
          <button
            onClick={() => handleRouteSelect('fuel')}
            className={`flex items-center p-3 rounded-2xl border-2 transition-all duration-200 w-full ${
              selectedRoute === 'fuel' 
                ? 'bg-red-100 border-red-500 shadow-lg scale-105' 
                : 'bg-red-50 border-red-200 hover:bg-red-100'
            }`}
          >
            <div className={`w-3 h-3 rounded-full mr-3 ${
              selectedRoute === 'fuel' ? 'bg-red-600 animate-pulse' : 'bg-red-500'
            }`}></div>
            <div className="flex-1 text-left">
              <div className="font-semibold text-sm text-gray-800">Fuel Efficient</div>
              <div className="text-xs text-gray-600">Most economical option</div>
            </div>
          </button>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="w-full max-w-sm mx-auto mt-8">
        <Button 
          onClick={onNext}
          className="w-full h-12 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold rounded-full shadow-lg transition-all duration-300 transform hover:scale-105"
        >
          Next
        </Button>
        
        <div className="flex justify-center mt-4 space-x-2">
          {Array.from({ length: totalScreens }, (_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentScreen ? 'bg-blue-500 w-6' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default RoutesScreen;
