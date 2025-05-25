
import React from 'react';
import { Trophy, MapPin, Plane, Navigation } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

interface UserStatsHeaderProps {
  onProfileClick: () => void;
}

const UserStatsHeader = ({ onProfileClick }: UserStatsHeaderProps) => {
  const { user } = useAuth();
  
  // Get the first letter of username for avatar, fallback to 'A'
  const avatarLetter = user?.username ? user.username.charAt(0).toUpperCase() : 'A';
  const displayName = user?.username || 'AUDI';

  return (
    <div className="bg-white px-4 py-3 border-b border-gray-200">
      <div className="flex items-center justify-between">
        {/* Profile Picture and User Greeting */}
        <div className="flex items-center space-x-3">
          <button 
            onClick={onProfileClick} 
            className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white hover:shadow-lg transition-shadow mx-0 my-0 px-[14px] text-xs font-extrabold"
          >
            {avatarLetter}
          </button>
          <div>
            <h2 className="text-lg font-semibold text-gray-800">Hi, {displayName}!</h2>
            <p className="text-gray-600 text-xs font-normal">Ready for your next adventure?</p>
          </div>
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
