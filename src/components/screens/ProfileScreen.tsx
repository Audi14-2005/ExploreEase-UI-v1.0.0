import React from 'react';
import { Users, Trophy, Star, MapPin, Plane, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';

const ProfileScreen = () => {
  const { user, logout } = useAuth();

  // Get the first letter of username for avatar, fallback to 'A'
  const avatarLetter = user?.username ? user.username.charAt(0).toUpperCase() : 'A';
  const displayName = user?.username || 'Monic Auditya A';
  const displayEmail = user?.email || 'travel@enthusiast.com';

  const achievements = [
    {
      title: 'Explorer',
      description: 'Visited 8 countries',
      icon: '🌍',
      earned: true
    },
    {
      title: 'Adventurer',
      description: 'Completed 25 trips',
      icon: '🎒',
      earned: true
    },
    {
      title: 'Navigator',
      description: 'Created 50 routes',
      icon: '🧭',
      earned: false
    },
    {
      title: 'Globetrotter',
      description: 'Travel 10,000km',
      icon: '✈️',
      earned: false
    }
  ];

  const friends = [
    {
      name: 'Sarah M.',
      trips: 12,
      avatar: '👩‍💼'
    },
    {
      name: 'John D.',
      trips: 8,
      avatar: '👨‍💻'
    },
    {
      name: 'Emily R.',
      trips: 15,
      avatar: '👩‍🎨'
    }
  ];

  const stats = [
    {
      label: 'Countries',
      value: '8',
      icon: MapPin,
      color: 'text-green-500'
    },
    {
      label: 'Trips',
      value: '23',
      icon: Plane,
      color: 'text-blue-500'
    },
    {
      label: 'Distance',
      value: '12.5k km',
      icon: Trophy,
      color: 'text-purple-500'
    },
    {
      label: 'Rating',
      value: '4.9',
      icon: Star,
      color: 'text-yellow-500'
    }
  ];

  const handleLogout = () => {
    logout();
    // Reload the page to go back to onboarding
    window.location.reload();
  };

  return (
    <div className="h-full overflow-y-auto bg-gray-50">
      <div className="p-4 space-y-6">
        {/* Profile Header */}
        <div className="bg-white rounded-xl p-6 text-center">
          <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
            {avatarLetter}
          </div>
          <h2 className="text-xl font-semibold text-gray-800 mb-1">{displayName}</h2>
          <p className="text-gray-600 mb-2">{displayEmail}</p>
          <p className="text-gray-600 mb-4">Travel Enthusiast</p>
          <div className="flex items-center justify-center space-x-1 mb-4">
            <Star className="text-yellow-500 fill-current" size={16} />
            <span className="font-medium text-gray-800">4.9</span>
            <span className="text-gray-600 text-sm">(127 reviews)</span>
          </div>
          
          {/* Logout Button */}
          <Button 
            onClick={handleLogout}
            variant="outline" 
            size="sm" 
            className="flex items-center space-x-1 mx-auto"
          >
            <LogOut size={16} />
            <span>Logout</span>
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="bg-white rounded-xl p-4 text-center">
                <Icon className={`${stat.color} mx-auto mb-2`} size={24} />
                <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
                <p className="text-sm text-gray-600">{stat.label}</p>
              </div>
            );
          })}
        </div>

        {/* Achievements */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Achievements</h3>
          <div className="grid grid-cols-2 gap-3">
            {achievements.map((achievement, index) => (
              <div
                key={index}
                className={`p-4 rounded-xl border-2 ${
                  achievement.earned ? 'bg-white border-green-200' : 'bg-gray-50 border-gray-200'
                }`}
              >
                <div className="text-center">
                  <div className={`text-2xl mb-2 ${!achievement.earned && 'grayscale opacity-50'}`}>
                    {achievement.icon}
                  </div>
                  <h4 className={`font-medium ${achievement.earned ? 'text-gray-800' : 'text-gray-400'}`}>
                    {achievement.title}
                  </h4>
                  <p className={`text-xs ${achievement.earned ? 'text-gray-600' : 'text-gray-400'}`}>
                    {achievement.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Friends */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-semibold text-gray-800">Travel Friends</h3>
            <Button variant="outline" size="sm" className="flex items-center space-x-1">
              <Users size={16} />
              <span>Add Friends</span>
            </Button>
          </div>
          <div className="space-y-2">
            {friends.map((friend, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-white rounded-lg">
                <div className="flex items-center space-x-3">
                  <span className="text-xl">{friend.avatar}</span>
                  <div>
                    <p className="font-medium text-gray-800">{friend.name}</p>
                    <p className="text-sm text-gray-600">{friend.trips} trips together</p>
                  </div>
                </div>
                <Button variant="outline" size="sm">Message</Button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileScreen;
