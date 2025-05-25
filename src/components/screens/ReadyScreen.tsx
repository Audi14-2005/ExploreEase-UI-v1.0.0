
import React from 'react';
import { Button } from '@/components/ui/button';

interface ReadyScreenProps {
  onNext: () => void;
  currentScreen: number;
  totalScreens: number;
}

const ReadyScreen: React.FC<ReadyScreenProps> = ({ onNext, currentScreen, totalScreens }) => {
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

        {/* Celebration Animation */}
        <div className="relative w-80 h-40 mb-16 animate-fade-in" style={{ animationDelay: '0.4s' }}>
          <svg viewBox="0 0 320 160" className="w-full h-full">
            {/* Travel routes forming a celebration pattern */}
            <path
              d="M50 100 Q100 50 150 80 Q200 110 250 60"
              stroke="#60A5FA"
              strokeWidth="3"
              strokeDasharray="8,4"
              fill="none"
              className="animate-[dash_2s_ease-in-out_infinite]"
            />
            <path
              d="M80 120 Q160 40 240 100"
              stroke="#8B5CF6"
              strokeWidth="3"
              strokeDasharray="6,3"
              fill="none"
              className="animate-[dash_2s_ease-in-out_infinite_reverse]"
            />
            
            {/* Travel icons at different positions */}
            <text x="40" y="110" fontSize="20" className="animate-bounce">🌍</text>
            <text x="120" y="70" fontSize="16" className="animate-pulse">✈️</text>
            <text x="200" y="120" fontSize="18" className="animate-bounce" style={{ animationDelay: '0.5s' }}>🚗</text>
            <text x="240" y="70" fontSize="16" className="animate-pulse" style={{ animationDelay: '0.3s' }}>🏖️</text>
            
            {/* Celebration elements */}
            <text x="160" y="30" fontSize="14" className="animate-bounce" style={{ animationDelay: '0.2s' }}>🎉</text>
            <text x="90" y="140" fontSize="12" className="animate-pulse" style={{ animationDelay: '0.7s' }}>⭐</text>
          </svg>
        </div>

        <h2 className="text-3xl font-bold text-gray-800 mb-4 animate-fade-in" style={{ animationDelay: '0.6s' }}>
          Ready to Explore?
        </h2>
        <p className="text-gray-600 mb-16 max-w-md animate-fade-in" style={{ animationDelay: '0.8s' }}>
          Join thousands of travelers who are discovering the world with ExploreEase. Your next adventure awaits!
        </p>
      </div>

      {/* Bottom Section */}
      <div className="w-full max-w-sm">
        <Button 
          onClick={() => alert('Welcome to ExploreEase! 🎉')}
          className="w-full h-14 bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white font-semibold rounded-full shadow-lg transition-all duration-300 transform hover:scale-105"
        >
          Get Started
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

export default ReadyScreen;
