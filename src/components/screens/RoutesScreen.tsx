
import React from 'react';
import { Button } from '@/components/ui/button';

interface RoutesScreenProps {
  onNext: () => void;
  currentScreen: number;
  totalScreens: number;
}

const RoutesScreen: React.FC<RoutesScreenProps> = ({ onNext, currentScreen, totalScreens }) => {
  return (
    <div className="h-full flex flex-col px-6 py-8">
      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center text-center">
        {/* Route Icon */}
        <div className="w-16 h-16 bg-white rounded-full shadow-lg flex items-center justify-center mb-8 animate-fade-in">
          <span className="text-2xl">🗺️</span>
        </div>

        {/* Map Mockup */}
        <div className="relative mb-8 animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <div className="w-56 h-32 bg-white rounded-2xl shadow-xl p-3 border-4 border-blue-100">
            <svg viewBox="0 0 240 120" className="w-full h-full">
              <rect width="240" height="120" fill="#F0F9FF" rx="8" />
              
              <path
                d="M20 80 Q60 40 120 60 Q180 80 220 40"
                stroke="#22C55E"
                strokeWidth="4"
                fill="none"
                className="animate-[draw-path_2s_ease-in-out_infinite]"
              />
              <path
                d="M20 80 Q120 20 220 40"
                stroke="#3B82F6"
                strokeWidth="3"
                strokeDasharray="6,3"
                fill="none"
              />
              <path
                d="M20 80 Q80 100 220 40"
                stroke="#EF4444"
                strokeWidth="3"
                strokeDasharray="4,2"
                fill="none"
              />
              
              <circle cx="20" cy="80" r="6" fill="#10B981" />
              <circle cx="220" cy="40" r="6" fill="#EF4444" />
              
              <text x="110" y="30" fontSize="16" className="animate-bounce">✈️</text>
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

        {/* Route Options */}
        <div className="space-y-3 w-full max-w-xs animate-fade-in" style={{ animationDelay: '0.8s' }}>
          <div className="flex items-center p-3 bg-blue-50 rounded-2xl border-2 border-blue-200">
            <div className="w-3 h-3 bg-blue-500 rounded-full mr-3"></div>
            <div className="flex-1 text-left">
              <div className="font-semibold text-sm text-gray-800">Time Efficient</div>
              <div className="text-xs text-gray-600">Fastest way to destination</div>
            </div>
          </div>
          
          <div className="flex items-center p-3 bg-green-50 rounded-2xl border-2 border-green-200">
            <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
            <div className="flex-1 text-left">
              <div className="font-semibold text-sm text-gray-800">Scenic/Fun</div>
              <div className="text-xs text-gray-600">Most enjoyable experience</div>
            </div>
          </div>
          
          <div className="flex items-center p-3 bg-red-50 rounded-2xl border-2 border-red-200">
            <div className="w-3 h-3 bg-red-500 rounded-full mr-3"></div>
            <div className="flex-1 text-left">
              <div className="font-semibold text-sm text-gray-800">Fuel Efficient</div>
              <div className="text-xs text-gray-600">Most economical option</div>
            </div>
          </div>
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
