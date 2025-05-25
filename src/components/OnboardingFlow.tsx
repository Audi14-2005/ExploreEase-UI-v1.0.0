import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import WelcomeScreen from './screens/WelcomeScreen';
import AIRecommendationsScreen from './screens/AIRecommendationsScreen';
import RoutesScreen from './screens/RoutesScreen';
import ReadyScreen from './screens/ReadyScreen';
import AuthScreen from './screens/AuthScreen';
import MainApp from './MainApp';
import { AuthProvider } from '@/contexts/AuthContext';

const OnboardingFlow = () => {
  const [currentScreen, setCurrentScreen] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showAuthScreen, setShowAuthScreen] = useState(false);
  const [showMainApp, setShowMainApp] = useState(false);

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

  const handleGetStarted = () => {
    setShowAuthScreen(true);
  };

  const handleAuthSuccess = () => {
    setShowMainApp(true);
  };

  const handleAuthBack = () => {
    setShowAuthScreen(false);
  };

  // Show main app if onboarding is complete
  if (showMainApp) {
    return (
      <AuthProvider>
        <MainApp />
      </AuthProvider>
    );
  }

  // Show auth screen
  if (showAuthScreen) {
    return (
      <AuthProvider>
        <AuthScreen onSuccess={handleAuthSuccess} onBack={handleAuthBack} />
      </AuthProvider>
    );
  }

  const CurrentScreenComponent = screens[currentScreen].component;
  const currentAnimation = screens[currentScreen].animation;

  return (
    <div className="h-screen w-screen bg-gradient-to-br from-blue-50 to-purple-100 relative overflow-hidden fixed inset-0">
      {/* Skip Button */}
      {currentScreen < screens.length - 1 && (
        <button
          onClick={handleSkip}
          className="absolute top-6 right-6 text-gray-500 hover:text-gray-700 transition-colors z-20"
        >
          Skip
        </button>
      )}

      {/* Large Travel Animations */}
      {isTransitioning && (
        <div className="absolute inset-0 z-40 pointer-events-none">
          {currentAnimation === 'plane' && (
            <>
              <div className="absolute top-1/2 -translate-y-1/2 right-20 text-8xl animate-fly-plane-clear drop-shadow-2xl">
                ✈️
              </div>
              {/* Clouds moving with plane */}
              <div className="absolute text-4xl opacity-60 animate-float-cloud-1">☁️</div>
              <div className="absolute text-3xl opacity-40 animate-float-cloud-2">☁️</div>
              <div className="absolute text-5xl opacity-50 animate-float-cloud-3">☁️</div>
            </>
          )}
          {currentAnimation === 'bike' && (
            <>
              <div className="absolute top-1/2 -translate-y-1/2 right-20 text-8xl animate-ride-bike-clear drop-shadow-2xl">
                🚴‍♂️
              </div>
              {/* Wind effects */}
              <div className="absolute top-1/2 right-32 text-2xl opacity-60 animate-wind-1">💨</div>
              <div className="absolute top-1/2 right-48 text-xl opacity-40 animate-wind-2">💨</div>
              <div className="absolute top-1/2 right-64 text-3xl opacity-30 animate-wind-3">💨</div>
            </>
          )}
          {currentAnimation === 'car' && (
            <>
              <div className="absolute top-1/2 -translate-y-1/2 right-20 text-8xl animate-drive-car-clear drop-shadow-2xl">
                🚗
              </div>
              {/* Wind effects only */}
              <div className="absolute top-1/2 right-32 text-2xl opacity-60 animate-wind-1">💨</div>
              <div className="absolute top-1/2 right-48 text-xl opacity-40 animate-wind-2">💨</div>
              <div className="absolute top-1/2 right-64 text-3xl opacity-30 animate-wind-3">💨</div>
            </>
          )}
        </div>
      )}

      {/* Screen Content */}
      <div className={`h-full w-full transition-all duration-1000 ${isTransitioning ? 'opacity-20 scale-90 blur-sm' : 'opacity-100 scale-100 blur-0'}`}>
        <CurrentScreenComponent 
          onNext={handleNext} 
          onGetStarted={handleGetStarted}
          currentScreen={currentScreen} 
          totalScreens={screens.length} 
        />
      </div>
    </div>
  );
};

export default OnboardingFlow;
