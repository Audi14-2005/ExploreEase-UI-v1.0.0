
import React from 'react';
import { Button } from '@/components/ui/button';

interface WelcomeScreenProps {
  onNext: () => void;
  currentScreen: number;
  totalScreens: number;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onNext, currentScreen, totalScreens }) => {
  return (
    <div className="h-full flex flex-col px-6 py-8">
      {/* Main Content - Takes available space */}
      <div className="flex-1 flex flex-col items-center justify-center text-center">
        <h1 className="text-3xl font-bold text-blue-600 mb-3 animate-fade-in">
          ExploreEase
        </h1>
        <p className="text-base text-gray-600 mb-8 animate-fade-in" style={{ animationDelay: '0.2s' }}>
          Plan Less. Explore More. Smarter<br />
          Travel Starts Here.
        </p>

        {/* Animated Route Illustration */}
        <div className="relative w-64 h-24 mb-8 animate-fade-in" style={{ animationDelay: '0.4s' }}>
          <svg viewBox="0 0 320 160" className="w-full h-full">
            <path
              d="M50 120 Q160 60 270 40"
              stroke="#60A5FA"
              strokeWidth="3"
              strokeDasharray="8,4"
              fill="none"
              className="animate-[dash_3s_ease-in-out_infinite]"
            />
            <circle cx="50" cy="120" r="6" fill="#EF4444" className="animate-pulse" />
            <circle cx="160" cy="80" r="6" fill="#8B5CF6" className="animate-pulse" style={{ animationDelay: '0.5s' }} />
            <circle cx="270" cy="40" r="6" fill="#10B981" className="animate-pulse" style={{ animationDelay: '1s' }} />
            <text x="250" y="50" fontSize="20" className="animate-bounce">✈️</text>
          </svg>
        </div>

        <h2 className="text-xl font-semibold text-gray-800 mb-3 animate-fade-in" style={{ animationDelay: '0.6s' }}>
          Welcome to ExploreEase
        </h2>
        <p className="text-gray-600 mb-6 max-w-xs animate-fade-in" style={{ animationDelay: '0.8s' }}>
          Your all-in-one super app featuring all your travel needs in one place.
        </p>

        {/* Feature Icons - Smaller grid */}
        <div className="grid grid-cols-3 gap-4 mb-4 animate-fade-in" style={{ animationDelay: '1s' }}>
          <div className="flex flex-col items-center p-2 bg-white rounded-xl shadow-sm">
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mb-1">
              <span className="text-blue-600 text-sm">🧭</span>
            </div>
            <span className="text-xs text-gray-600">Navigation</span>
          </div>
          <div className="flex flex-col items-center p-2 bg-white rounded-xl shadow-sm">
            <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center mb-1">
              <span className="text-purple-600 text-sm">📅</span>
            </div>
            <span className="text-xs text-gray-600">Bookings</span>
          </div>
          <div className="flex flex-col items-center p-2 bg-white rounded-xl shadow-sm">
            <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center mb-1">
              <span className="text-red-600 text-sm">⏰</span>
            </div>
            <span className="text-xs text-gray-600">Real-time</span>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 animate-fade-in" style={{ animationDelay: '1.2s' }}>
          <div className="flex flex-col items-center p-2 bg-white rounded-xl shadow-sm">
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mb-1">
              <span className="text-blue-600 text-sm">✈️</span>
            </div>
            <span className="text-xs text-gray-600">Flights</span>
          </div>
          <div className="flex flex-col items-center p-2 bg-white rounded-xl shadow-sm">
            <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center mb-1">
              <span className="text-purple-600 text-sm">🏨</span>
            </div>
            <span className="text-xs text-gray-600">Hotels</span>
          </div>
          <div className="flex flex-col items-center p-2 bg-white rounded-xl shadow-sm">
            <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center mb-1">
              <span className="text-red-600 text-sm">⚠️</span>
            </div>
            <span className="text-xs text-gray-600">Alerts</span>
          </div>
        </div>
      </div>

      {/* Bottom Section - Fixed at bottom */}
      <div className="w-full max-w-sm mx-auto mt-8">
        <Button 
          onClick={onNext}
          className="w-full h-12 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold rounded-full shadow-lg transition-all duration-300 transform hover:scale-105"
        >
          Next
        </Button>
        
        {/* Progress Dots */}
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

export default WelcomeScreen;
