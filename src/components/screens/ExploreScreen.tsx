
import React from 'react';
import { Search, MapPin, Plane, Hotel, Car, Star, History } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ExploreScreenProps {
  onStartTripPlanning?: () => void;
  onShowTripHistory?: () => void;
}

const ExploreScreen = ({ onStartTripPlanning, onShowTripHistory }: ExploreScreenProps) => {
  const quickActions = [
    { icon: Plane, label: 'Flights', color: 'bg-blue-100 text-blue-600' },
    { icon: Hotel, label: 'Hotels', color: 'bg-purple-100 text-purple-600' },
    { icon: Car, label: 'Car Rental', color: 'bg-green-100 text-green-600' },
    { icon: MapPin, label: 'Activities', color: 'bg-red-100 text-red-600' }
  ];

  const destinations = [
    { name: 'Goa, India', image: '🏖️', rating: 4.8, price: '₹45,000' },
    { name: 'Kerala, India', image: '🌴', rating: 4.9, price: '₹38,000' },
    { name: 'Rajasthan, India', image: '🏰', rating: 4.7, price: '₹42,000' },
    { name: 'Himachal Pradesh, India', image: '🏔️', rating: 4.6, price: '₹35,000' },
    { name: 'Mumbai, India', image: '🏙️', rating: 4.5, price: '₹28,000' }
  ];

  return (
    <div className="h-full overflow-y-auto bg-gray-50 dark:bg-gray-900">
      <div className="p-4 space-y-6">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400 dark:text-gray-500" />
          <input
            type="text"
            placeholder="Where do you want to go in India?"
            className="w-full pl-10 pr-4 py-3 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
          />
        </div>

        {/* Quick Actions */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-3">
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <button
                  key={index}
                  className="flex items-center space-x-3 p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow"
                >
                  <div className={`p-2 rounded-lg ${action.color} dark:bg-opacity-20`}>
                    <Icon size={20} />
                  </div>
                  <span className="font-medium text-gray-800 dark:text-gray-200">{action.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Action Buttons Row */}
        <div className="grid grid-cols-2 gap-3">
          <Button 
            onClick={onStartTripPlanning}
            className="h-12 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold rounded-xl"
          >
            Plan New Trip
          </Button>
          <Button 
            onClick={onShowTripHistory}
            variant="outline"
            className="h-12 rounded-xl flex items-center justify-center space-x-2"
          >
            <History size={20} />
            <span>Trip History</span>
          </Button>
        </div>

        {/* Featured Destinations */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">Featured Indian Destinations</h3>
          <div className="space-y-3">
            {destinations.map((destination, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700"
              >
                <div className="flex items-center space-x-3">
                  <div className="text-2xl">{destination.image}</div>
                  <div>
                    <h4 className="font-medium text-gray-800 dark:text-gray-200">{destination.name}</h4>
                    <div className="flex items-center space-x-1">
                      <Star size={14} className="text-yellow-500 fill-current" />
                      <span className="text-sm text-gray-600 dark:text-gray-400">{destination.rating}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-800 dark:text-gray-200">{destination.price}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">per person</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExploreScreen;
