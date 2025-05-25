
import React from 'react';
import { Button } from '@/components/ui/button';

interface AIRecommendationsScreenProps {
  onNext: () => void;
  currentScreen: number;
  totalScreens: number;
}

const AIRecommendationsScreen: React.FC<AIRecommendationsScreenProps> = ({ onNext, currentScreen, totalScreens }) => {
  return (
    <div className="h-full flex flex-col px-6 py-8">
      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center text-center">
        {/* AI Icon */}
        <div className="w-16 h-16 bg-white rounded-full shadow-lg flex items-center justify-center mb-8 animate-fade-in">
          <span className="text-2xl">🤖</span>
        </div>

        {/* Phone Mockup */}
        <div className="relative mb-8 animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <div className="w-40 h-64 bg-white rounded-3xl shadow-xl p-4 border-4 border-gray-100">
            <div className="space-y-3">
              <div className="h-3 bg-gray-200 rounded animate-pulse"></div>
              
              <div className="space-y-2 mt-6">
                <div className="flex items-center space-x-2 p-2 bg-blue-50 rounded-lg">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <div className="flex-1 h-2 bg-blue-200 rounded"></div>
                </div>
                <div className="flex items-center space-x-2 p-2 bg-purple-50 rounded-lg">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <div className="flex-1 h-2 bg-purple-200 rounded"></div>
                </div>
                <div className="flex items-center space-x-2 p-2 bg-red-50 rounded-lg">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <div className="flex-1 h-2 bg-red-200 rounded"></div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="absolute -top-2 -left-2 text-lg animate-bounce">⭐</div>
          <div className="absolute -bottom-2 -right-2 text-lg animate-bounce" style={{ animationDelay: '0.5s' }}>🎯</div>
        </div>

        <h2 className="text-2xl font-bold text-blue-600 mb-3 animate-fade-in" style={{ animationDelay: '0.4s' }}>
          Smart AI Recommendations
        </h2>
        <p className="text-gray-600 mb-4 max-w-xs animate-fade-in" style={{ animationDelay: '0.6s' }}>
          Our AI analyzes your preferences to suggest personalized destinations.
        </p>
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

export default AIRecommendationsScreen;
