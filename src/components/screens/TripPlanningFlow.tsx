
import React, { useState } from 'react';
import { ArrowLeft, Calendar, MapPin, Plane, Car, Train, Bike, Star, Plus, Sparkles, ShoppingCart } from 'lucide-react';
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
  selectedSpots: any[];
  watchCart: any[];
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
    transport: '',
    selectedSpots: [],
    watchCart: []
  });

  const totalSteps = 7;

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
        return <TripSpotSelectionStep tripData={tripData} setTripData={setTripData} onNext={handleNext} />;
      case 6:
        return <SummaryStep tripData={tripData} onNext={handleNext} />;
      case 7:
        return <TripConfirmationStep tripData={tripData} onNext={handleNext} />;
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
      <div className="flex-1 overflow-y-auto">
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

// Step 2: Destination Selection with Pictures and AI Recommendations
const DestinationStep = ({ tripData, setTripData, onNext }: any) => {
  const [selectedDestination, setSelectedDestination] = useState(tripData.destination);

  const destinations = [
    {
      id: 'goa',
      name: 'Goa',
      image: '🏖️',
      picture: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=400',
      description: 'Beautiful beaches, vibrant nightlife, and Portuguese heritage make Goa perfect for relaxation and adventure.',
      rating: 4.8,
      price: '₹45,000',
      isAIRecommended: true
    },
    {
      id: 'kerala',
      name: 'Kerala',
      image: '🌴',
      picture: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400',
      description: 'God\'s Own Country with serene backwaters, lush hill stations, and rich cultural traditions.',
      rating: 4.9,
      price: '₹38,000',
      isAIRecommended: true
    },
    {
      id: 'rajasthan',
      name: 'Rajasthan',
      image: '🏰',
      picture: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?w=400',
      description: 'Royal palaces, desert landscapes, and vibrant culture showcase India\'s magnificent heritage.',
      rating: 4.7,
      price: '₹42,000',
      isAIRecommended: false
    },
    {
      id: 'himachal',
      name: 'Himachal Pradesh',
      image: '🏔️',
      picture: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400',
      description: 'Snow-capped mountains, adventure sports, and peaceful hill stations perfect for nature lovers.',
      rating: 4.6,
      price: '₹35,000',
      isAIRecommended: true
    },
    {
      id: 'mumbai',
      name: 'Mumbai',
      image: '🏙️',
      picture: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=400',
      description: 'The city that never sleeps, offering Bollywood glamour, street food, and bustling city life.',
      rating: 4.5,
      price: '₹28,000',
      isAIRecommended: false
    },
    {
      id: 'kashmir',
      name: 'Kashmir',
      image: '🏔️',
      picture: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400',
      description: 'Paradise on Earth with stunning valleys, pristine lakes, and breathtaking mountain views.',
      rating: 4.9,
      price: '₹48,000',
      isAIRecommended: true
    },
    {
      id: 'andaman',
      name: 'Andaman & Nicobar',
      image: '🏝️',
      picture: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400',
      description: 'Pristine beaches, crystal clear waters, and exotic marine life in India\'s tropical paradise.',
      rating: 4.7,
      price: '₹52,000',
      isAIRecommended: false
    },
    {
      id: 'uttarakhand',
      name: 'Uttarakhand',
      image: '⛰️',
      picture: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400',
      description: 'Spiritual destinations, yoga retreats, and Himalayan treks in the land of gods.',
      rating: 4.6,
      price: '₹36,000',
      isAIRecommended: false
    }
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
        <p className="text-gray-600">Discover amazing destinations across India</p>
      </div>

      <div className="space-y-4">
        {destinations.map((destination) => (
          <button
            key={destination.id}
            onClick={() => setSelectedDestination(destination.name)}
            className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
              selectedDestination === destination.name
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 bg-white hover:border-gray-300'
            }`}
          >
            <div className="flex space-x-4">
              <img
                src={destination.picture}
                alt={destination.name}
                className="w-20 h-20 rounded-lg object-cover"
              />
              <div className="flex-1 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <h3 className="font-semibold text-gray-800">{destination.name}</h3>
                    {destination.isAIRecommended && (
                      <div className="flex items-center space-x-1 bg-purple-100 text-purple-700 px-2 py-1 rounded-full text-xs">
                        <Sparkles size={12} />
                        <span>AI Pick</span>
                      </div>
                    )}
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-800">{destination.price}</p>
                    <div className="flex items-center space-x-1">
                      <Star size={14} className="text-yellow-500 fill-current" />
                      <span className="text-sm text-gray-600">{destination.rating}</span>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-gray-600 line-clamp-2">{destination.description}</p>
              </div>
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

// Step 5: Trip Spot Selection
const TripSpotSelectionStep = ({ tripData, setTripData, onNext }: any) => {
  const [watchCart, setWatchCart] = useState<any[]>(tripData.watchCart || []);

  const spots = {
    'Goa': [
      { id: 1, name: 'Baga Beach', image: '🏖️', picture: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=300', description: 'Famous beach with water sports and nightlife', expense: 2500, rating: 4.6 },
      { id: 2, name: 'Dudhsagar Falls', image: '💧', picture: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=300', description: 'Spectacular waterfall in the Western Ghats', expense: 3000, rating: 4.8 },
      { id: 3, name: 'Old Goa Churches', image: '⛪', picture: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?w=300', description: 'Historic Portuguese churches and architecture', expense: 1500, rating: 4.5 },
      { id: 4, name: 'Spice Plantation', image: '🌿', picture: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300', description: 'Guided tour of aromatic spice gardens', expense: 2000, rating: 4.4 },
      { id: 5, name: 'Cruise on Mandovi River', image: '🚢', picture: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=300', description: 'Sunset cruise with cultural performances', expense: 1800, rating: 4.7 }
    ],
    'Kerala': [
      { id: 6, name: 'Backwater Houseboat', image: '🛥️', picture: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300', description: 'Overnight stay in traditional houseboat', expense: 5000, rating: 4.9 },
      { id: 7, name: 'Munnar Tea Gardens', image: '🍃', picture: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300', description: 'Rolling hills covered with tea plantations', expense: 2800, rating: 4.8 },
      { id: 8, name: 'Cochin Fort Kochi', image: '🏛️', picture: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?w=300', description: 'Historic area with colonial architecture', expense: 1200, rating: 4.6 },
      { id: 9, name: 'Periyar Wildlife Sanctuary', image: '🐘', picture: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300', description: 'Wildlife spotting and nature walks', expense: 3500, rating: 4.7 }
    ]
  };

  const destinationSpots = spots[tripData.destination as keyof typeof spots] || spots['Goa'];

  const addToWatchCart = (spot: any) => {
    if (!watchCart.find(item => item.id === spot.id)) {
      const newWatchCart = [...watchCart, spot];
      setWatchCart(newWatchCart);
      setTripData({ ...tripData, watchCart: newWatchCart });
    }
  };

  const removeFromWatchCart = (spotId: number) => {
    const newWatchCart = watchCart.filter(item => item.id !== spotId);
    setWatchCart(newWatchCart);
    setTripData({ ...tripData, watchCart: newWatchCart });
  };

  const totalExpense = watchCart.reduce((sum, item) => sum + item.expense, 0);

  const handleNext = () => {
    onNext();
  };

  return (
    <div className="p-4 space-y-6">
      <div className="text-center">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">Trip Spot Selection</h2>
        <p className="text-gray-600">Choose spots to visit in {tripData.destination}</p>
      </div>

      {/* Watch Cart Summary */}
      {watchCart.length > 0 && (
        <div className="bg-blue-50 rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <ShoppingCart size={20} className="text-blue-600" />
              <h3 className="font-semibold text-blue-800">Watch Cart ({watchCart.length})</h3>
            </div>
            <span className="font-bold text-blue-800">₹{totalExpense.toLocaleString()}</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {watchCart.map((item) => (
              <div key={item.id} className="flex items-center space-x-1 bg-white rounded-lg px-2 py-1">
                <span className="text-sm">{item.name}</span>
                <button
                  onClick={() => removeFromWatchCart(item.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Spots List */}
      <div className="space-y-3">
        {destinationSpots.map((spot) => {
          const isInCart = watchCart.find(item => item.id === spot.id);
          return (
            <div key={spot.id} className="bg-white rounded-xl p-4 border border-gray-200">
              <div className="flex space-x-4">
                <img
                  src={spot.picture}
                  alt={spot.name}
                  className="w-20 h-20 rounded-lg object-cover"
                />
                <div className="flex-1 space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-gray-800">{spot.name}</h3>
                    <div className="flex items-center space-x-1">
                      <Star size={14} className="text-yellow-500 fill-current" />
                      <span className="text-sm text-gray-600">{spot.rating}</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">{spot.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-gray-800">₹{spot.expense.toLocaleString()}</span>
                    <Button
                      onClick={() => isInCart ? removeFromWatchCart(spot.id) : addToWatchCart(spot)}
                      variant={isInCart ? "outline" : "default"}
                      size="sm"
                      className={`${isInCart ? 'text-red-600 border-red-300' : 'bg-blue-500 hover:bg-blue-600'}`}
                    >
                      {isInCart ? 'Remove' : 'Add to Cart'}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <Button
        onClick={handleNext}
        className="w-full h-12 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-xl"
      >
        Continue to Summary
      </Button>
    </div>
  );
};

// Step 6: Summary
const SummaryStep = ({ tripData, onNext }: any) => {
  const totalSpotExpense = tripData.watchCart?.reduce((sum: number, item: any) => sum + item.expense, 0) || 0;

  return (
    <div className="p-4 space-y-6">
      <div className="text-center">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">Trip Summary</h2>
        <p className="text-gray-600">Review your trip details</p>
      </div>

      <div className="bg-white rounded-xl p-6 space-y-4">
        <div className="flex justify-between items-center border-b pb-2">
          <span className="text-gray-600">Destination:</span>
          <span className="font-semibold">{tripData.destination}</span>
        </div>
        <div className="flex justify-between items-center border-b pb-2">
          <span className="text-gray-600">From:</span>
          <span className="font-semibold">
            {tripData.fromDate ? format(tripData.fromDate, "MMM dd, yyyy") : ''}
          </span>
        </div>
        <div className="flex justify-between items-center border-b pb-2">
          <span className="text-gray-600">To:</span>
          <span className="font-semibold">
            {tripData.toDate ? format(tripData.toDate, "MMM dd, yyyy") : ''}
          </span>
        </div>
        <div className="flex justify-between items-center border-b pb-2">
          <span className="text-gray-600">Transport:</span>
          <span className="font-semibold capitalize">{tripData.transport}</span>
        </div>
        <div className="flex justify-between items-center border-b pb-2">
          <span className="text-gray-600">Selected Spots:</span>
          <span className="font-semibold">{tripData.watchCart?.length || 0}</span>
        </div>
        <div className="flex justify-between items-center text-lg font-bold text-blue-600">
          <span>Total Estimated Cost:</span>
          <span>₹{totalSpotExpense.toLocaleString()}</span>
        </div>
      </div>

      {tripData.watchCart && tripData.watchCart.length > 0 && (
        <div className="bg-gray-50 rounded-xl p-4">
          <h3 className="font-semibold text-gray-800 mb-3">Selected Spots</h3>
          <div className="space-y-2">
            {tripData.watchCart.map((spot: any) => (
              <div key={spot.id} className="flex justify-between items-center">
                <span className="text-gray-700">{spot.name}</span>
                <span className="font-semibold">₹{spot.expense.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <Button
        onClick={onNext}
        className="w-full h-12 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-xl"
      >
        Confirm Trip Details
      </Button>
    </div>
  );
};

// Step 7: Trip Confirmation
const TripConfirmationStep = ({ tripData, onNext }: any) => {
  const handleConfirmTrip = () => {
    // Here you would typically save the trip data and navigate to a success screen
    console.log('Trip confirmed:', tripData);
    onNext();
  };

  return (
    <div className="p-4 space-y-6 text-center">
      <div className="text-6xl mb-4">🎉</div>
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Trip Confirmed!</h2>
        <p className="text-gray-600">Your amazing journey to {tripData.destination} is all set!</p>
      </div>

      <div className="bg-green-50 rounded-xl p-6 space-y-3">
        <h3 className="font-semibold text-green-800">What's Next?</h3>
        <div className="space-y-2 text-sm text-green-700">
          <p>✓ Trip details saved to your profile</p>
          <p>✓ Booking confirmations will be sent via email</p>
          <p>✓ Access your itinerary anytime in the Routes section</p>
          <p>✓ Track expenses during your trip</p>
        </div>
      </div>

      <div className="space-y-3">
        <Button
          onClick={handleConfirmTrip}
          className="w-full h-12 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-xl"
        >
          Start Planning Details
        </Button>
        <Button
          variant="outline"
          className="w-full h-12 rounded-xl"
          onClick={() => window.location.reload()}
        >
          Plan Another Trip
        </Button>
      </div>

      <div className="text-xs text-gray-500 mt-6">
        <p>Need help? Contact our support team anytime.</p>
      </div>
    </div>
  );
};

export default TripPlanningFlow;
