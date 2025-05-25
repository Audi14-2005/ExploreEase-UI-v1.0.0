
import React from 'react';
import { Trophy, MapPin, Plane, Navigation } from 'lucide-react';

const UserStatsHeader = () => {
  return (
    <div className="bg-white px-4 py-3 border-b border-gray-200">
      <div className="flex items-center justify-between">
        {/* User Greeting */}
        <div>
          <h2 className="text-lg font-semibold text-gray-800">Hi, Alex!</h2>
          <p className="text-sm text-gray-600">Ready for your next adventure?</p>
        </div>
        
        {/* Stats */}
        <div className="flex space-x-4">
          <div className="flex items-center space-x-1">
            <Trophy size={16} className="text-yellow-500" />
            <span className="text-sm font-medium">15</span>
          </div>
          <div className="flex items-center space-x-1">
            <MapPin size={16} className="text-green-500" />
            <span className="text-sm font-medium">8</span>
          </div>
          <div className="flex items-center space-x-1">
            <Plane size={16} className="text-blue-500" />
            <span className="text-sm font-medium">23</span>
          </div>
          <div className="flex items-center space-x-1">
            <Navigation size={16} className="text-purple-500" />
            <span className="text-sm font-medium">1.2k</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserStatsHeader;
