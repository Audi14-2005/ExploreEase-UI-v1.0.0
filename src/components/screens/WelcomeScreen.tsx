
import React from 'react';
import { Button } from '@/components/ui/button';

interface WelcomeScreenProps {
  onNext: () => void;
  currentScreen: number;
  totalScreens: number;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onNext, currentScreen, totalScreens }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-between px-6 py-8">
      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center text-center mt-32">
        <h1 className="text-4xl font-bold text-blue-600 mb-4 animate-fade-in">
          ExploreEase
        </h1>
        <p className="text-lg text-gray-600 mb-16 animate-fade-in" style={{ animationDelay: '0.2s' }}>
          Plan Less. Explore More. Smarter<br />
          Travel Starts Here.
        </p>

        {/* Animated Route Illustration */}
        <div className="relative w-80 h-40 mb-16 animate-fade-in" style={{ animationDelay: '0.4s' }}>
          <svg viewBox="0 0 320 160" className="w-full h-full">
            {/* Flight path */}
            <path
              d="M50 120 Q160 60 270 40"
              stroke="#60A5FA"
              strokeWidth="3"
              strokeDasharray="8,4"
              fill="none"
              className="animate-[dash_3s_ease-in-out_infinite]"
            />
            {/* Waypoints */}
            <circle cx="50" cy="120" r="6" fill="#EF4444" className="animate-pulse" />
            <circle cx="160" cy="80" r="6" fill="#8B5CF6" className="animate-pulse" style={{ animationDelay: '0.5s' }} />
            <circle cx="270" cy="40" r="6" fill="#10B981" className="animate-pulse" style={{ animationDelay: '1s' }} />
            {/* Plane icon */}
            <text x="250" y="50" fontSize="20" className="animate-bounce">✈️</text>
          </svg>
        </div>

        <h2 className="text-2xl font-semibold text-gray-800 mb-4 animate-fade-in" style={{ animationDelay: '0.6s' }}>
          Welcome to ExploreEase
        </h2>
        <p className="text-gray-600 mb-8 max-w-md animate-fade-in" style={{ animationDelay: '0.8s' }}>
          Your all-in-one super app featuring all your travel needs in one place.
        </p>

        {/* Feature Icons */}
        <div className="grid grid-cols-3 gap-8 mb-12 animate-fade-in" style={{ animationDelay: '1s' }}>
          <div className="flex flex-col items-center p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-2">
              <span className="text-blue-600 text-xl">🧭</span>
            </div>
            <span className="text-sm text-gray-600">Navigation</span>
          </div>
          <div className="flex flex-col items-center p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-2">
              <span className="text-purple-600 text-xl">📅</span>
            </div>
            <span className="text-sm text-gray-600">Bookings</span>
          </div>
          <div className="flex flex-col items-center p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-2">
              <span className="text-red-600 text-xl">⏰</span>
            </div>
            <span className="text-sm text-gray-600">Real-time</span>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-8 mb-16 animate-fade-in" style={{ animationDelay: '1.2s' }}>
          <div className="flex flex-col items-center p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-2">
              <span className="text-blue-600 text-xl">✈️</span>
            </div>
            <span className="text-sm text-gray-600">Flights</span>
          </div>
          <div className="flex flex-col items-center p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-2">
              <span className="text-purple-600 text-xl">🏨</span>
            </div>
            <span className="text-sm text-gray-600">Hotels</span>
          </div>
          <div className="flex flex-col items-center p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-2">
              <span className="text-red-600 text-xl">⚠️</span>
            </div>
            <span className="text-sm text-gray-600">Alerts</span>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="w-full max-w-sm">
        <Button 
          onClick={onNext}
          className="w-full h-14 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold rounded-full shadow-lg transition-all duration-300 transform hover:scale-105"
        >
          Next
        </Button>
        
        {/* Progress Dots */}
        <div className="flex justify-center mt-6 space-x-2">
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
