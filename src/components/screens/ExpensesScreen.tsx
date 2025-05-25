
import React, { useState } from 'react';
import { DollarSign, TrendingUp, TrendingDown, PieChart, Calendar, Plus, BarChart3, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import TripDetailsScreen from './expenses/TripDetailsScreen';
import AddExpenseModal from './expenses/AddExpenseModal';

const ExpensesScreen = () => {
  const [selectedTrip, setSelectedTrip] = useState<any>(null);
  const [showAddExpense, setShowAddExpense] = useState(false);

  const tripBudgets = [
    {
      id: 1,
      name: 'Goa Trip',
      budget: 45000,
      spent: 32000,
      color: 'bg-blue-500',
      startDate: '2024-06-15',
      endDate: '2024-06-22',
      expenses: [
        { category: 'Hotel', amount: 18000, date: '2024-06-15', description: 'Beach Resort Booking' },
        { category: 'Food', amount: 8500, date: '2024-06-16', description: 'Seafood Restaurant' },
        { category: 'Transport', amount: 3500, date: '2024-06-15', description: 'Airport Taxi' },
        { category: 'Activities', amount: 2000, date: '2024-06-17', description: 'Water Sports' }
      ],
      plannedExpenses: [
        { category: 'Food', amount: 5000, description: 'Remaining meals' },
        { category: 'Shopping', amount: 8000, description: 'Souvenirs and local items' }
      ]
    },
    {
      id: 2,
      name: 'Kerala Adventure',
      budget: 38000,
      spent: 28000,
      color: 'bg-purple-500',
      startDate: '2024-07-10',
      endDate: '2024-07-17',
      expenses: [
        { category: 'Hotel', amount: 15000, date: '2024-07-10', description: 'Houseboat Stay' },
        { category: 'Food', amount: 7000, date: '2024-07-11', description: 'Traditional Kerala Meals' },
        { category: 'Transport', amount: 4000, date: '2024-07-10', description: 'Car Rental' },
        { category: 'Activities', amount: 2000, date: '2024-07-12', description: 'Backwater Tour' }
      ],
      plannedExpenses: [
        { category: 'Activities', amount: 6000, description: 'Spice plantation tour' },
        { category: 'Shopping', amount: 4000, description: 'Spices and handicrafts' }
      ]
    },
    {
      id: 3,
      name: 'Rajasthan Weekend',
      budget: 42000,
      spent: 35000,
      color: 'bg-green-500',
      startDate: '2024-08-05',
      endDate: '2024-08-12',
      expenses: [
        { category: 'Hotel', amount: 20000, date: '2024-08-05', description: 'Heritage Hotel' },
        { category: 'Food', amount: 6000, date: '2024-08-06', description: 'Rajasthani Thali' },
        { category: 'Transport', amount: 5000, date: '2024-08-05', description: 'Flight Tickets' },
        { category: 'Activities', amount: 4000, date: '2024-08-07', description: 'Desert Safari' }
      ],
      plannedExpenses: [
        { category: 'Shopping', amount: 7000, description: 'Textiles and jewelry' }
      ]
    }
  ];

  const recentExpenses = [
    {
      category: 'Food',
      amount: 850,
      date: 'Today',
      icon: '🍛',
      trip: 'Goa Trip'
    },
    {
      category: 'Transport',
      amount: 450,
      date: 'Today',
      icon: '🚗',
      trip: 'Goa Trip'
    },
    {
      category: 'Hotel',
      amount: 2500,
      date: 'Yesterday',
      icon: '🏨',
      trip: 'Kerala Adventure'
    },
    {
      category: 'Activities',
      amount: 1200,
      date: '2 days ago',
      icon: '🎭',
      trip: 'Rajasthan Weekend'
    }
  ];

  const handleTripClick = (trip: any) => {
    setSelectedTrip(trip);
  };

  const handleBackFromTrip = () => {
    setSelectedTrip(null);
  };

  const handleAddExpense = () => {
    setShowAddExpense(true);
  };

  const handleCloseAddExpense = () => {
    setShowAddExpense(false);
  };

  // Show trip details if a trip is selected
  if (selectedTrip) {
    return <TripDetailsScreen trip={selectedTrip} onBack={handleBackFromTrip} />;
  }

  return (
    <div className="h-full overflow-y-auto bg-gray-50">
      <div className="p-4 space-y-6">
        {/* Total Budget Overview */}
        <div className="bg-gradient-to-r from-green-500 to-blue-600 rounded-xl p-4 text-white">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-semibold">Total Spent</h3>
            <PieChart size={24} />
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="text-3xl font-bold">₹95,000</span>
            <span className="text-green-100">of ₹1,25,000</span>
          </div>
          <div className="flex items-center space-x-2 mt-2">
            <TrendingDown size={16} />
            <span className="text-sm">₹30,000 remaining</span>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-3">
          <Button 
            onClick={handleAddExpense}
            className="flex items-center justify-center space-x-2 h-12 bg-blue-500 hover:bg-blue-600 text-white rounded-xl"
          >
            <Plus size={20} />
            <span>Add Expense</span>
          </Button>
          <Button variant="outline" className="flex items-center justify-center space-x-2 h-12 rounded-xl">
            <BarChart3 size={20} />
            <span>Analytics</span>
          </Button>
        </div>

        {/* Trip Budgets */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Trip Budgets</h3>
          <div className="space-y-3">
            {tripBudgets.map((trip) => {
              const percentage = (trip.spent / trip.budget) * 100;
              return (
                <button
                  key={trip.id}
                  onClick={() => handleTripClick(trip)}
                  className="w-full p-4 bg-white rounded-xl border border-gray-200 hover:shadow-md transition-shadow text-left"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-gray-800">{trip.name}</h4>
                    <span className="text-sm text-gray-600">
                      ₹{trip.spent.toLocaleString()} / ₹{trip.budget.toLocaleString()}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                    <div
                      className={`h-2 rounded-full ${trip.color}`}
                      style={{ width: `${Math.min(percentage, 100)}%` }}
                    ></div>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-gray-600">
                      {percentage.toFixed(0)}% used • ₹{(trip.budget - trip.spent).toLocaleString()} remaining
                    </p>
                    <div className="flex items-center space-x-1 text-xs text-gray-500">
                      <Calendar size={12} />
                      <span>{trip.startDate} - {trip.endDate}</span>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Recent Expenses */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Recent Expenses</h3>
          <div className="space-y-2">
            {recentExpenses.map((expense, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200">
                <div className="flex items-center space-x-3">
                  <span className="text-xl">{expense.icon}</span>
                  <div>
                    <p className="font-medium text-gray-800">{expense.category}</p>
                    <p className="text-sm text-gray-600">{expense.trip} • {expense.date}</p>
                  </div>
                </div>
                <span className="font-semibold text-gray-800">-₹{expense.amount}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Add Expense CTA */}
        <Button 
          onClick={handleAddExpense}
          className="w-full h-12 bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white font-semibold rounded-xl"
        >
          Track New Expense
        </Button>
      </div>

      {/* Add Expense Modal */}
      {showAddExpense && (
        <AddExpenseModal 
          isOpen={showAddExpense} 
          onClose={handleCloseAddExpense}
          trips={tripBudgets}
        />
      )}
    </div>
  );
};

export default ExpensesScreen;
