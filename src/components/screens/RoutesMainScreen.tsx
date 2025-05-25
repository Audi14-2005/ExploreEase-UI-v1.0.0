
import React from 'react';
import { Navigation, MapPin, Clock, Route } from 'lucide-react';
import { Button } from '@/components/ui/button';

const RoutesMainScreen = () => {
  const savedRoutes = [
    { name: 'City Explorer', distance: '15.2 km', duration: '2h 30m', stops: 8 },
    { name: 'Beach Route', distance: '8.5 km', duration: '1h 45m', stops: 5 },
    { name: 'Mountain Trail', distance: '22.1 km', duration: '4h 15m', stops: 12 }
  ];

  return (
    <div className="h-full overflow-y-auto bg-gray-50">
      <div className="p-4 space-y-6">
        {/* Map Placeholder */}
        <div className="relative h-48 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <Navigation size={32} className="text-blue-600 mx-auto mb-2" />
              <p className="text-blue-800 font-medium">Interactive Map</p>
              <p className="text-blue-600 text-sm">Plan your routes here</p>
            </div>
          </div>
          
          {/* Mock Route Points */}
          <div className="absolute top-4 left-4 w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
          <div className="absolute top-8 right-8 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
          <div className="absolute bottom-6 left-1/2 w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-3">
          <Button className="flex items-center justify-center space-x-2 h-12 bg-blue-500 hover:bg-blue-600 text-white rounded-xl">
            <Route size={20} />
            <span>New Route</span>
          </Button>
          <Button variant="outline" className="flex items-center justify-center space-x-2 h-12 rounded-xl">
            <MapPin size={20} />
            <span>Find Places</span>
          </Button>
        </div>

        {/* Saved Routes */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Saved Routes</h3>
          <div className="space-y-3">
            {savedRoutes.map((route, index) => (
              <div
                key={index}
                className="p-4 bg-white rounded-xl border border-gray-200"
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-gray-800">{route.name}</h4>
                  <button className="text-blue-600 text-sm font-medium">View</button>
                </div>
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <div className="flex items-center space-x-1">
                    <Navigation size={14} />
                    <span>{route.distance}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock size={14} />
                    <span>{route.duration}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <MapPin size={14} />
                    <span>{route.stops} stops</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Recent Activity</h3>
          <div className="space-y-2">
            <div className="flex items-center space-x-3 p-3 bg-white rounded-lg">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm text-gray-600">Completed "City Explorer" route</span>
              <span className="text-xs text-gray-400 ml-auto">2h ago</span>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-white rounded-lg">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span className="text-sm text-gray-600">Created new route "Beach Walk"</span>
              <span className="text-xs text-gray-400 ml-auto">1d ago</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoutesMainScreen;
