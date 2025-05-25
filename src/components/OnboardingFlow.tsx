
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import WelcomeScreen from './screens/WelcomeScreen';
import AIRecommendationsScreen from './screens/AIRecommendationsScreen';
import RoutesScreen from './screens/RoutesScreen';
import ReadyScreen from './screens/ReadyScreen';

const OnboardingFlow = () => {
  const [currentScreen, setCurrentScreen] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const screens = [
    { component: WelcomeScreen, animation: 'plane' },
    { component: AIRecommendationsScreen, animation: 'bike' },
    { component: RoutesScreen, animation: 'car' },
    { component: ReadyScreen, animation: 'none' }
  ];

  const handleNext = () => {
    if (currentScreen < screens.length - 1) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentScreen(currentScreen + 1);
        setTimeout(() => {
          setIsTransitioning(false);
        }, 200);
      }, 1500);
    }
  };

  const handleSkip = () => {
    setCurrentScreen(screens.length - 1);
  };

  const CurrentScreenComponent = screens[currentScreen].component;
  const currentAnimation = screens[currentScreen].animation;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 relative overflow-hidden">
      {/* Skip Button */}
      {currentScreen < screens.length - 1 && (
        <button
          onClick={handleSkip}
          className="absolute top-6 right-6 text-gray-500 hover:text-gray-700 transition-colors z-20"
        >
          Skip
        </button>
      )}

      {/* App Icon */}
      <div className="absolute top-16 left-1/2 transform -translate-x-1/2 z-10">
        <div className="w-20 h-20 bg-white rounded-2xl shadow-lg flex items-center justify-center">
          <div className="w-12 h-12 relative">
            <svg viewBox="0 0 24 24" className="w-full h-full text-blue-500">
              <path
                fill="currentColor"
                d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Large Travel Animations - Much More Visible */}
      {isTransitioning && (
        <div className="absolute inset-0 z-40 pointer-events-none">
          {currentAnimation === 'plane' && (
            <div className="absolute bottom-20 left-20 text-8xl animate-fly-plane-clear drop-shadow-2xl">
              ✈️
            </div>
          )}
          {currentAnimation === 'bike' && (
            <div className="absolute top-1/2 -translate-y-1/2 right-20 text-8xl animate-ride-bike-clear drop-shadow-2xl">
              🚴‍♂️
            </div>
          )}
          {currentAnimation === 'car' && (
            <div className="absolute top-1/2 -translate-y-1/2 right-20 text-8xl animate-drive-car-clear drop-shadow-2xl">
              🚗
            </div>
          )}
        </div>
      )}

      {/* Screen Content with Enhanced Transition */}
      <div className={`transition-all duration-1000 ${isTransitioning ? 'opacity-20 scale-90 blur-sm' : 'opacity-100 scale-100 blur-0'}`}>
        <CurrentScreenComponent onNext={handleNext} currentScreen={currentScreen} totalScreens={screens.length} />
      </div>
    </div>
  );
};

export default OnboardingFlow;
