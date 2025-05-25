
import React from 'react';
import { DollarSign, TrendingUp, TrendingDown, PieChart } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ExpensesScreen = () => {
  const tripBudgets = [
    {
      name: 'Goa Trip',
      budget: 45000,
      spent: 32000,
      color: 'bg-blue-500'
    },
    {
      name: 'Kerala Adventure',
      budget: 38000,
      spent: 28000,
      color: 'bg-purple-500'
    },
    {
      name: 'Rajasthan Weekend',
      budget: 42000,
      spent: 35000,
      color: 'bg-green-500'
    }
  ];

  const recentExpenses = [
    {
      category: 'Food',
      amount: 850,
      date: 'Today',
      icon: '🍛'
    },
    {
      category: 'Transport',
      amount: 450,
      date: 'Today',
      icon: '🚗'
    },
    {
      category: 'Hotel',
      amount: 2500,
      date: 'Yesterday',
      icon: '🏨'
    },
    {
      category: 'Activities',
      amount: 1200,
      date: '2 days ago',
      icon: '🎭'
    }
  ];

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
          <Button className="flex items-center justify-center space-x-2 h-12 bg-blue-500 hover:bg-blue-600 text-white rounded-xl">
            <DollarSign size={20} />
            <span>Add Expense</span>
          </Button>
          <Button variant="outline" className="flex items-center justify-center space-x-2 h-12 rounded-xl">
            <TrendingUp size={20} />
            <span>View Report</span>
          </Button>
        </div>

        {/* Trip Budgets */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Trip Budgets</h3>
          <div className="space-y-3">
            {tripBudgets.map((trip, index) => {
              const percentage = (trip.spent / trip.budget) * 100;
              return (
                <div key={index} className="p-4 bg-white rounded-xl border border-gray-200">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-gray-800">{trip.name}</h4>
                    <span className="text-sm text-gray-600">
                      ₹{trip.spent.toLocaleString()} / ₹{trip.budget.toLocaleString()}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${trip.color}`}
                      style={{ width: `${Math.min(percentage, 100)}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-600 mt-1">
                    {percentage.toFixed(0)}% used • ₹{(trip.budget - trip.spent).toLocaleString()} remaining
                  </p>
                </div>
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
                    <p className="text-sm text-gray-600">{expense.date}</p>
                  </div>
                </div>
                <span className="font-semibold text-gray-800">-₹{expense.amount}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Add Expense CTA */}
        <Button className="w-full h-12 bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white font-semibold rounded-xl">
          Track New Expense
        </Button>
      </div>
    </div>
  );
};

export default ExpensesScreen;
