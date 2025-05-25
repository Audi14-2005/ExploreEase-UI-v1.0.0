
import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface TripData {
  tripType: string;
  details: any;
  selectedDestination: string;
  canBike: boolean;
  planDetails: any;
  dayPlan: any;
  destinationInfo: any;
}

interface TripTypeScreenProps {
  onNext: (data?: any) => void;
  onBack: () => void;
  tripData: TripData;
  currentStep: number;
  totalSteps: number;
}

const TripTypeScreen = ({ onNext, onBack, tripData, currentStep, totalSteps }: TripTypeScreenProps) => {
  const [selectedTripType, setSelectedTripType] = useState(tripData.tripType || '');

  const tripTypes = [
    { id: 'adventure', label: 'Adventure', icon: '🏔️', description: 'Trekking, rafting, and outdoor activities' },
    { id: 'cultural', label: 'Cultural', icon: '🏛️', description: 'Heritage sites, temples, and local traditions' },
    { id: 'relaxation', label: 'Relaxation', icon: '🏖️', description: 'Beaches, spas, and peaceful getaways' },
    { id: 'wildlife', label: 'Wildlife', icon: '🐅', description: 'National parks and wildlife sanctuaries' }
  ];

  const handleNext = () => {
    if (selectedTripType) {
      onNext({ tripType: selectedTripType });
    }
  };

  return (
    <div className="h-full bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-4">
        <div className="flex items-center justify-between">
          <Button variant="ghost" size="icon" onClick={onBack}>
            <ArrowLeft size={20} />
          </Button>
          <div className="text-center">
            <h1 className="text-lg font-semibold text-gray-800">Plan Your Trip</h1>
            <p className="text-sm text-gray-600">Step {currentStep} of {totalSteps}</p>
          </div>
          <div className="w-10" />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-4 space-y-6">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">What type of trip interests you?</h2>
          <p className="text-gray-600">Choose the style that best matches your travel preferences</p>
        </div>

        <div className="space-y-3">
          {tripTypes.map((type) => (
            <button
              key={type.id}
              onClick={() => setSelectedTripType(type.id)}
              className={`w-full p-4 rounded-xl border-2 transition-all ${
                selectedTripType === type.id
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 bg-white hover:border-gray-300'
              }`}
            >
              <div className="flex items-center space-x-4">
                <div className="text-3xl">{type.icon}</div>
                <div className="text-left">
                  <h3 className="font-semibold text-gray-800">{type.label}</h3>
                  <p className="text-sm text-gray-600">{type.description}</p>
                </div>
              </div>
            </button>
          ))}
        </div>

        <Button
          onClick={handleNext}
          disabled={!selectedTripType}
          className="w-full h-12 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-xl disabled:opacity-50"
        >
          Continue
        </Button>
      </div>
    </div>
  );
};

const TripPlanningFlow = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [tripData, setTripData] = useState<TripData>({
    tripType: '',
    details: {},
    selectedDestination: '',
    canBike: false,
    planDetails: {},
    dayPlan: {},
    destinationInfo: {}
  });

  const totalSteps = 4;

  const handleNext = (data?: any) => {
    if (data) {
      setTripData(prev => ({ ...prev, ...data }));
    }
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  // For now, just show the first step (trip type selection)
  return (
    <TripTypeScreen
      onNext={handleNext}
      onBack={handleBack}
      tripData={tripData}
      currentStep={currentStep}
      totalSteps={totalSteps}
    />
  );
};

export default TripPlanningFlow;
