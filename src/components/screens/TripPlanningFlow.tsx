
import React, { useState } from 'react';
import { ArrowLeft, Calendar, MapPin, Plane, Car, Train, Bike } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

interface TripData {
  tripType: 'package' | 'own' | '';
  destination: string;
  fromDate: Date | undefined;
  toDate: Date | undefined;
  transport: 'bike' | 'car' | 'plane' | 'train' | '';
}

interface TripPlanningFlowProps {
  onBack: () => void;
}

const TripPlanningFlow = ({ onBack }: TripPlanningFlowProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [tripData, setTripData] = useState<TripData>({
    tripType: '',
    destination: '',
    fromDate: undefined,
    toDate: undefined,
    transport: ''
  });

  const totalSteps = 5;

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      onBack();
    }
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return <TripTypeStep tripData={tripData} setTripData={setTripData} onNext={handleNext} />;
      case 2:
        return <DestinationStep tripData={tripData} setTripData={setTripData} onNext={handleNext} />;
      case 3:
        return <DateStep tripData={tripData} setTripData={setTripData} onNext={handleNext} />;
      case 4:
        return <TransportStep tripData={tripData} setTripData={setTripData} onNext={handleNext} />;
      case 5:
        return <RouteStep tripData={tripData} onNext={handleNext} />;
      default:
        return <TripTypeStep tripData={tripData} setTripData={setTripData} onNext={handleNext} />;
    }
  };

  return (
    <div className="h-full bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-4">
        <div className="flex items-center justify-between">
          <Button variant="ghost" size="icon" onClick={handleBack}>
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
      <div className="flex-1">
        {renderCurrentStep()}
      </div>
    </div>
  );
};

// Step 1: Trip Type
const TripTypeStep = ({ tripData, setTripData, onNext }: any) => {
  const handleSelect = (type: 'package' | 'own') => {
    setTripData({ ...tripData, tripType: type });
    onNext();
  };

  return (
    <div className="p-4 space-y-6">
      <div className="text-center">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">Trip Type</h2>
        <p className="text-gray-600">Choose how you want to plan your trip</p>
      </div>

      <div className="space-y-4">
        <button
          onClick={() => handleSelect('package')}
          className="w-full p-6 bg-white rounded-xl border-2 border-gray-200 hover:border-blue-500 hover:bg-blue-50 transition-all"
        >
          <div className="text-center">
            <div className="text-4xl mb-2">📦</div>
            <h3 className="text-lg font-semibold text-gray-800">Package Trip</h3>
            <p className="text-sm text-gray-600">Pre-planned trips with recommendations</p>
          </div>
        </button>

        <button
          onClick={() => handleSelect('own')}
          className="w-full p-6 bg-white rounded-xl border-2 border-gray-200 hover:border-blue-500 hover:bg-blue-50 transition-all"
        >
          <div className="text-center">
            <div className="text-4xl mb-2">🗺️</div>
            <h3 className="text-lg font-semibold text-gray-800">Plan Your Own Trip</h3>
            <p className="text-sm text-gray-600">Customize your own adventure</p>
          </div>
        </button>
      </div>
    </div>
  );
};

// Step 2: Destination
const DestinationStep = ({ tripData, setTripData, onNext }: any) => {
  const [selectedDestination, setSelectedDestination] = useState(tripData.destination);

  const destinations = [
    { id: 'goa', name: 'Goa', image: '🏖️' },
    { id: 'kerala', name: 'Kerala', image: '🌴' },
    { id: 'rajasthan', name: 'Rajasthan', image: '🏰' },
    { id: 'himachal', name: 'Himachal Pradesh', image: '🏔️' },
    { id: 'mumbai', name: 'Mumbai', image: '🏙️' }
  ];

  const handleNext = () => {
    if (selectedDestination) {
      setTripData({ ...tripData, destination: selectedDestination });
      onNext();
    }
  };

  return (
    <div className="p-4 space-y-6">
      <div className="text-center">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">Where do you want to go?</h2>
        <p className="text-gray-600">Select your destination</p>
      </div>

      <div className="space-y-3">
        {destinations.map((destination) => (
          <button
            key={destination.id}
            onClick={() => setSelectedDestination(destination.name)}
            className={`w-full p-4 rounded-xl border-2 transition-all flex items-center space-x-4 ${
              selectedDestination === destination.name
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 bg-white hover:border-gray-300'
            }`}
          >
            <div className="text-3xl">{destination.image}</div>
            <div className="text-left">
              <h3 className="font-semibold text-gray-800">{destination.name}</h3>
            </div>
          </button>
        ))}
      </div>

      <Button
        onClick={handleNext}
        disabled={!selectedDestination}
        className="w-full h-12 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-xl disabled:opacity-50"
      >
        Continue
      </Button>
    </div>
  );
};

// Step 3: Date Selection
const DateStep = ({ tripData, setTripData, onNext }: any) => {
  const [fromDate, setFromDate] = useState<Date | undefined>(tripData.fromDate);
  const [toDate, setToDate] = useState<Date | undefined>(tripData.toDate);

  const handleNext = () => {
    if (fromDate && toDate) {
      setTripData({ ...tripData, fromDate, toDate });
      onNext();
    }
  };

  return (
    <div className="p-4 space-y-6">
      <div className="text-center">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">From when to when?</h2>
        <p className="text-gray-600">Select your travel dates</p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">From Date</label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !fromDate && "text-muted-foreground"
                )}
              >
                <Calendar className="mr-2 h-4 w-4" />
                {fromDate ? format(fromDate, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <CalendarComponent
                mode="single"
                selected={fromDate}
                onSelect={setFromDate}
                initialFocus
                className={cn("p-3 pointer-events-auto")}
              />
            </PopoverContent>
          </Popover>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">To Date</label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !toDate && "text-muted-foreground"
                )}
              >
                <Calendar className="mr-2 h-4 w-4" />
                {toDate ? format(toDate, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <CalendarComponent
                mode="single"
                selected={toDate}
                onSelect={setToDate}
                initialFocus
                className={cn("p-3 pointer-events-auto")}
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>

      <Button
        onClick={handleNext}
        disabled={!fromDate || !toDate}
        className="w-full h-12 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-xl disabled:opacity-50"
      >
        Continue
      </Button>
    </div>
  );
};

// Step 4: Transport Selection
const TransportStep = ({ tripData, setTripData, onNext }: any) => {
  const [selectedTransport, setSelectedTransport] = useState(tripData.transport);

  const transports = [
    { id: 'bike', label: 'Bike', icon: Bike, color: 'bg-green-100 text-green-600' },
    { id: 'car', label: 'Car', icon: Car, color: 'bg-blue-100 text-blue-600' },
    { id: 'plane', label: 'Aeroplane', icon: Plane, color: 'bg-purple-100 text-purple-600' },
    { id: 'train', label: 'Train', icon: Train, color: 'bg-red-100 text-red-600' }
  ];

  const handleNext = () => {
    if (selectedTransport) {
      setTripData({ ...tripData, transport: selectedTransport });
      onNext();
    }
  };

  return (
    <div className="p-4 space-y-6">
      <div className="text-center">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">How you want to go?</h2>
        <p className="text-gray-600">Choose your mode of transport</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {transports.map((transport) => {
          const Icon = transport.icon;
          return (
            <button
              key={transport.id}
              onClick={() => setSelectedTransport(transport.id)}
              className={`p-4 rounded-xl border-2 transition-all ${
                selectedTransport === transport.id
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 bg-white hover:border-gray-300'
              }`}
            >
              <div className="text-center space-y-2">
                <div className={`p-3 rounded-lg ${transport.color} inline-flex`}>
                  <Icon size={24} />
                </div>
                <h3 className="font-semibold text-gray-800">{transport.label}</h3>
              </div>
            </button>
          );
        })}
      </div>

      <Button
        onClick={handleNext}
        disabled={!selectedTransport}
        className="w-full h-12 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-xl disabled:opacity-50"
      >
        Continue
      </Button>
    </div>
  );
};

// Step 5: Route Planning (for car/bike) or Summary
const RouteStep = ({ tripData, onNext }: any) => {
  const isVehicle = tripData.transport === 'car' || tripData.transport === 'bike';

  return (
    <div className="p-4 space-y-6">
      <div className="text-center">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">
          {isVehicle ? 'Plan your route' : 'Trip Summary'}
        </h2>
        <p className="text-gray-600">
          {isVehicle ? 'Choose your preferred route' : 'Review your trip details'}
        </p>
      </div>

      <div className="bg-white rounded-xl p-6 space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Destination:</span>
          <span className="font-semibold">{tripData.destination}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-600">From:</span>
          <span className="font-semibold">
            {tripData.fromDate ? format(tripData.fromDate, "MMM dd, yyyy") : ''}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-600">To:</span>
          <span className="font-semibold">
            {tripData.toDate ? format(tripData.toDate, "MMM dd, yyyy") : ''}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Transport:</span>
          <span className="font-semibold capitalize">{tripData.transport}</span>
        </div>
      </div>

      {isVehicle && (
        <div className="space-y-3">
          <h3 className="font-semibold text-gray-800">Available Routes</h3>
          <div className="space-y-2">
            <button className="w-full p-4 bg-white rounded-xl border-2 border-gray-200 hover:border-blue-500 text-left">
              <div className="font-semibold">Route 1 - Scenic Route</div>
              <div className="text-sm text-gray-600">Duration: 8 hours • Distance: 450 km</div>
            </button>
            <button className="w-full p-4 bg-white rounded-xl border-2 border-gray-200 hover:border-blue-500 text-left">
              <div className="font-semibold">Route 2 - Fast Route</div>
              <div className="text-sm text-gray-600">Duration: 6 hours • Distance: 380 km</div>
            </button>
          </div>
        </div>
      )}

      <Button
        onClick={onNext}
        className="w-full h-12 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-xl"
      >
        {isVehicle ? 'Confirm Route' : 'Complete Planning'}
      </Button>
    </div>
  );
};

export default TripPlanningFlow;
