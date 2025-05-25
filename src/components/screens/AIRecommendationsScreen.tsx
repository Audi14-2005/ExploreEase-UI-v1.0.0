
import React from 'react';
import { Button } from '@/components/ui/button';

interface AIRecommendationsScreenProps {
  onNext: () => void;
  currentScreen: number;
  totalScreens: number;
}

const AIRecommendationsScreen: React.FC<AIRecommendationsScreenProps> = ({ onNext, currentScreen, totalScreens }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-between px-6 py-8">
      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center text-center mt-32">
        {/* AI Icon */}
        <div className="w-20 h-20 bg-white rounded-full shadow-lg flex items-center justify-center mb-16 animate-fade-in">
          <span className="text-3xl">🤖</span>
        </div>

        {/* Phone Mockup */}
        <div className="relative mb-16 animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <div className="w-48 h-80 bg-white rounded-3xl shadow-xl p-6 border-4 border-gray-100">
            <div className="space-y-4">
              {/* Header */}
              <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
              
              {/* Recommendation Items */}
              <div className="space-y-3 mt-8">
                <div className="flex items-center space-x-3 p-2 bg-blue-50 rounded-lg">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <div className="flex-1 h-2 bg-blue-200 rounded"></div>
                </div>
                <div className="flex items-center space-x-3 p-2 bg-purple-50 rounded-lg">
                  <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                  <div className="flex-1 h-2 bg-purple-200 rounded"></div>
                </div>
                <div className="flex items-center space-x-3 p-2 bg-red-50 rounded-lg">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="flex-1 h-2 bg-red-200 rounded"></div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Floating elements */}
          <div className="absolute -top-4 -left-4 text-2xl animate-bounce">⭐</div>
          <div className="absolute -bottom-4 -right-4 text-2xl animate-bounce" style={{ animationDelay: '0.5s' }}>🎯</div>
        </div>

        <h2 className="text-3xl font-bold text-blue-600 mb-4 animate-fade-in" style={{ animationDelay: '0.4s' }}>
          Smart AI Recommendations
        </h2>
        <p className="text-gray-600 mb-8 max-w-md animate-fade-in" style={{ animationDelay: '0.6s' }}>
          Our AI analyzes your preferences and travel history to suggest personalized destinations and experiences.
        </p>
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

export default AIRecommendationsScreen;
