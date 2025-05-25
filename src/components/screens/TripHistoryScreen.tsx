import React, { useState, useEffect } from 'react';
import { Calendar, MapPin, Clock, Users, DollarSign, Filter, Search, ArrowLeft, Plane, Hotel, Car } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Trip {
  id: string;
  name: string;
  destination: string;
  startDate: string;
  endDate: string;
  status: 'upcoming' | 'ongoing' | 'completed';
  budget: number;
  spent: number;
  travelers: number;
  duration: string;
  image: string;
  activities: string[];
  accommodation: string;
  transportation: string;
  createdDate: string;
  description?: string;
}

interface TripHistoryScreenProps {
  onBack: () => void;
}

const TripHistoryScreen = ({ onBack }: TripHistoryScreenProps) => {
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'upcoming' | 'ongoing' | 'completed'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTrip, setSelectedTrip] = useState<Trip | null>(null);
  const [trips, setTrips] = useState<Trip[]>([]);

  // Load trips from localStorage on component mount
  useEffect(() => {
    const savedTrips = JSON.parse(localStorage.getItem('tripHistory') || '[]');
    
    // Sample trips - in a real app, these would come from your database
    const sampleTrips: Trip[] = [
      {
        id: '1',
        name: 'Goa Beach Adventure',
        destination: 'Goa, India',
        startDate: '2024-06-15',
        endDate: '2024-06-22',
        status: 'completed',
        budget: 45000,
        spent: 42000,
        travelers: 2,
        duration: '7 days',
        image: '🏖️',
        activities: ['Beach hopping', 'Water sports', 'Nightlife', 'Local cuisine'],
        accommodation: 'Beach Resort',
        transportation: 'Flight + Taxi',
        createdDate: '2024-05-01',
        description: 'A relaxing beach vacation with water sports and local culture exploration.'
      },
      {
        id: '2',
        name: 'Kerala Backwaters',
        destination: 'Kerala, India',
        startDate: '2024-07-10',
        endDate: '2024-07-17',
        status: 'ongoing',
        budget: 38000,
        spent: 28000,
        travelers: 4,
        duration: '8 days',
        image: '🌴',
        activities: ['Houseboat cruise', 'Spice plantation', 'Ayurveda spa', 'Wildlife safari'],
        accommodation: 'Houseboat + Resort',
        transportation: 'Flight + Car rental',
        createdDate: '2024-06-15',
        description: 'Exploring the serene backwaters and rich culture of Kerala.'
      }
    ];

    // Combine sample trips with saved trips, avoiding duplicates
    const allTrips = [...sampleTrips, ...savedTrips];
    const uniqueTrips = allTrips.filter((trip, index, self) => 
      index === self.findIndex(t => t.id === trip.id)
    );
    
    setTrips(uniqueTrips);
  }, []);

  const filteredTrips = trips.filter(trip => {
    const matchesFilter = selectedFilter === 'all' || trip.status === selectedFilter;
    const matchesSearch = trip.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         trip.destination.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming': return 'bg-blue-100 text-blue-800';
      case 'ongoing': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'upcoming': return <Calendar size={14} />;
      case 'ongoing': return <Clock size={14} />;
      case 'completed': return <MapPin size={14} />;
      default: return <Calendar size={14} />;
    }
  };

  if (selectedTrip) {
    return (
      <div className="h-full overflow-y-auto bg-gray-50">
        <div className="p-4 space-y-6">
          {/* Header */}
          <div className="flex items-center space-x-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSelectedTrip(null)}
              className="rounded-full"
            >
              <ArrowLeft size={20} />
            </Button>
            <h2 className="text-xl font-semibold text-gray-800">{selectedTrip.name}</h2>
          </div>

          {/* Trip Details */}
          <div className="bg-white rounded-xl p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <span className="text-3xl">{selectedTrip.image}</span>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">{selectedTrip.destination}</h3>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedTrip.status)}`}>
                      {selectedTrip.status.charAt(0).toUpperCase() + selectedTrip.status.slice(1)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <p className="text-gray-600 mb-4">{selectedTrip.description}</p>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Calendar size={16} />
                <span>{selectedTrip.startDate} - {selectedTrip.endDate}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Clock size={16} />
                <span>{selectedTrip.duration}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Users size={16} />
                <span>{selectedTrip.travelers} traveler{selectedTrip.travelers > 1 ? 's' : ''}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <DollarSign size={16} />
                <span>₹{selectedTrip.budget.toLocaleString()}</span>
              </div>
            </div>

            {/* Budget Progress */}
            {selectedTrip.status !== 'upcoming' && (
              <div className="mb-6">
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>Budget Usage</span>
                  <span>₹{selectedTrip.spent.toLocaleString()} / ₹{selectedTrip.budget.toLocaleString()}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-500 h-2 rounded-full"
                    style={{ width: `${Math.min((selectedTrip.spent / selectedTrip.budget) * 100, 100)}%` }}
                  ></div>
                </div>
              </div>
            )}

            {/* Trip Details Grid */}
            <div className="grid grid-cols-1 gap-4">
              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <Hotel size={20} className="text-blue-600" />
                <div>
                  <p className="font-medium text-gray-800">Accommodation</p>
                  <p className="text-sm text-gray-600">{selectedTrip.accommodation}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <Car size={20} className="text-green-600" />
                <div>
                  <p className="font-medium text-gray-800">Transportation</p>
                  <p className="text-sm text-gray-600">{selectedTrip.transportation}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Activities */}
          <div className="bg-white rounded-xl p-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Planned Activities</h3>
            <div className="grid grid-cols-2 gap-2">
              {selectedTrip.activities.map((activity, index) => (
                <div key={index} className="flex items-center space-x-2 p-2 bg-blue-50 rounded-lg">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-sm text-gray-700">{activity}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Trip Creation Info */}
          <div className="bg-white rounded-xl p-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Trip Information</h3>
            <p className="text-sm text-gray-600">Created on {selectedTrip.createdDate}</p>
            <p className="text-sm text-gray-600">Trip ID: {selectedTrip.id}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full overflow-y-auto bg-gray-50">
      <div className="p-4 space-y-6">
        {/* Header */}
        <div className="flex items-center space-x-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={onBack}
            className="rounded-full"
          >
            <ArrowLeft size={20} />
          </Button>
          <h2 className="text-xl font-semibold text-gray-800">Trip History</h2>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search trips by name or destination..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-white rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder-gray-500"
          />
        </div>

        {/* Filter Tabs */}
        <div className="flex space-x-2">
          {[
            { key: 'all', label: 'All Trips' },
            { key: 'upcoming', label: 'Upcoming' },
            { key: 'ongoing', label: 'Ongoing' },
            { key: 'completed', label: 'Completed' }
          ].map((filter) => (
            <button
              key={filter.key}
              onClick={() => setSelectedFilter(filter.key as any)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedFilter === filter.key
                  ? 'bg-blue-500 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* Trip Statistics */}
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-white rounded-xl p-4 text-center">
            <p className="text-2xl font-bold text-blue-600">{trips.filter(t => t.status === 'upcoming').length}</p>
            <p className="text-sm text-gray-600">Upcoming</p>
          </div>
          <div className="bg-white rounded-xl p-4 text-center">
            <p className="text-2xl font-bold text-green-600">{trips.filter(t => t.status === 'ongoing').length}</p>
            <p className="text-sm text-gray-600">Ongoing</p>
          </div>
          <div className="bg-white rounded-xl p-4 text-center">
            <p className="text-2xl font-bold text-gray-600">{trips.filter(t => t.status === 'completed').length}</p>
            <p className="text-sm text-gray-600">Completed</p>
          </div>
        </div>

        {/* Trip List */}
        <div className="space-y-3">
          {filteredTrips.map((trip) => (
            <button
              key={trip.id}
              onClick={() => setSelectedTrip(trip)}
              className="w-full p-4 bg-white rounded-xl border border-gray-200 hover:shadow-md transition-shadow text-left"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{trip.image}</span>
                  <div>
                    <h4 className="font-medium text-gray-800">{trip.name}</h4>
                    <p className="text-sm text-gray-600">{trip.destination}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1 ${getStatusColor(trip.status)}`}>
                    {getStatusIcon(trip.status)}
                    <span>{trip.status.charAt(0).toUpperCase() + trip.status.slice(1)}</span>
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                <div className="flex items-center space-x-2">
                  <Calendar size={14} />
                  <span>{trip.startDate} - {trip.endDate}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users size={14} />
                  <span>{trip.travelers} traveler{trip.travelers > 1 ? 's' : ''}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <DollarSign size={14} />
                  <span>₹{trip.budget.toLocaleString()}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock size={14} />
                  <span>{trip.duration}</span>
                </div>
              </div>

              {trip.status !== 'upcoming' && trip.spent > 0 && (
                <div className="mt-3">
                  <div className="flex justify-between text-xs text-gray-500 mb-1">
                    <span>Spent: ₹{trip.spent.toLocaleString()}</span>
                    <span>{((trip.spent / trip.budget) * 100).toFixed(0)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1">
                    <div
                      className="bg-blue-500 h-1 rounded-full"
                      style={{ width: `${Math.min((trip.spent / trip.budget) * 100, 100)}%` }}
                    ></div>
                  </div>
                </div>
              )}
            </button>
          ))}
        </div>

        {filteredTrips.length === 0 && (
          <div className="text-center py-8">
            <Plane size={48} className="text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">No trips found matching your criteria</p>
            <p className="text-sm text-gray-500">Try adjusting your search or filter options</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TripHistoryScreen;
