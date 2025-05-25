
import React from 'react';
import { Search, MapPin, Plane, Hotel, Car, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ExploreScreen = () => {
  const quickActions = [
    { icon: Plane, label: 'Flights', color: 'bg-blue-100 text-blue-600' },
    { icon: Hotel, label: 'Hotels', color: 'bg-purple-100 text-purple-600' },
    { icon: Car, label: 'Car Rental', color: 'bg-green-100 text-green-600' },
    { icon: MapPin, label: 'Activities', color: 'bg-red-100 text-red-600' }
  ];

  const destinations = [
    { name: 'Paris, France', image: '🗼', rating: 4.8, price: '$1,200' },
    { name: 'Tokyo, Japan', image: '🏯', rating: 4.9, price: '$1,800' },
    { name: 'New York, USA', image: '🏙️', rating: 4.7, price: '$900' }
  ];

  return (
    <div className="h-full overflow-y-auto bg-gray-50">
      <div className="p-4 space-y-6">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Where do you want to go?"
            className="w-full pl-10 pr-4 py-3 bg-white rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Quick Actions */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-3">
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <button
                  key={index}
                  className="flex items-center space-x-3 p-4 bg-white rounded-xl border border-gray-200 hover:shadow-md transition-shadow"
                >
                  <div className={`p-2 rounded-lg ${action.color}`}>
                    <Icon size={20} />
                  </div>
                  <span className="font-medium text-gray-800">{action.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Featured Destinations */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Featured Destinations</h3>
          <div className="space-y-3">
            {destinations.map((destination, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-white rounded-xl border border-gray-200"
              >
                <div className="flex items-center space-x-3">
                  <div className="text-2xl">{destination.image}</div>
                  <div>
                    <h4 className="font-medium text-gray-800">{destination.name}</h4>
                    <div className="flex items-center space-x-1">
                      <Star size={14} className="text-yellow-500 fill-current" />
                      <span className="text-sm text-gray-600">{destination.rating}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-800">{destination.price}</p>
                  <p className="text-sm text-gray-600">per person</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Button */}
        <Button className="w-full h-12 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold rounded-xl">
          Plan My Trip
        </Button>
      </div>
    </div>
  );
};

export default ExploreScreen;
