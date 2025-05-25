
import React from 'react';
import { ArrowLeft, Calendar, TrendingUp, TrendingDown, PieChart, BarChart3 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface TripDetailsScreenProps {
  trip: any;
  onBack: () => void;
}

const TripDetailsScreen = ({ trip, onBack }: TripDetailsScreenProps) => {
  const categoryTotals = trip.expenses.reduce((acc: any, expense: any) => {
    acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
    return acc;
  }, {});

  const plannedTotal = trip.plannedExpenses.reduce((sum: number, expense: any) => sum + expense.amount, 0);
  const remainingBudget = trip.budget - trip.spent - plannedTotal;

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
          <h2 className="text-xl font-semibold text-gray-800">{trip.name}</h2>
        </div>

        {/* Trip Overview */}
        <div className="bg-white rounded-xl p-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-800">Trip Overview</h3>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Calendar size={14} />
                <span>{trip.startDate} - {trip.endDate}</span>
              </div>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-gray-800">₹{trip.spent.toLocaleString()}</p>
              <p className="text-sm text-gray-600">of ₹{trip.budget.toLocaleString()}</p>
            </div>
          </div>
          
          <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
            <div
              className={`h-3 rounded-full ${trip.color}`}
              style={{ width: `${Math.min((trip.spent / trip.budget) * 100, 100)}%` }}
            ></div>
          </div>

          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-sm text-gray-600">Spent</p>
              <p className="font-semibold text-gray-800">₹{trip.spent.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Planned</p>
              <p className="font-semibold text-blue-600">₹{plannedTotal.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Remaining</p>
              <p className={`font-semibold ${remainingBudget >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                ₹{remainingBudget.toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        {/* Category Breakdown */}
        <div className="bg-white rounded-xl p-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Category Breakdown</h3>
          <div className="space-y-3">
            {Object.entries(categoryTotals).map(([category, amount]: [string, any]) => {
              const percentage = (amount / trip.spent) * 100;
              return (
                <div key={category} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span className="font-medium text-gray-800">{category}</span>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-800">₹{amount.toLocaleString()}</p>
                    <p className="text-xs text-gray-600">{percentage.toFixed(1)}%</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Expense History */}
        <div className="bg-white rounded-xl p-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Expense History</h3>
          <div className="space-y-3">
            {trip.expenses.map((expense: any, index: number) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-800">{expense.description}</p>
                  <p className="text-sm text-gray-600">{expense.category} • {expense.date}</p>
                </div>
                <span className="font-semibold text-red-600">-₹{expense.amount.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Planned Expenses */}
        <div className="bg-white rounded-xl p-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Planned Expenses</h3>
          <div className="space-y-3">
            {trip.plannedExpenses.map((expense: any, index: number) => (
              <div key={index} className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-800">{expense.description}</p>
                  <p className="text-sm text-gray-600">{expense.category}</p>
                </div>
                <span className="font-semibold text-blue-600">₹{expense.amount.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Analytics Actions */}
        <div className="grid grid-cols-2 gap-3">
          <Button variant="outline" className="flex items-center justify-center space-x-2 h-12 rounded-xl">
            <BarChart3 size={20} />
            <span>Analytics</span>
          </Button>
          <Button variant="outline" className="flex items-center justify-center space-x-2 h-12 rounded-xl">
            <PieChart size={20} />
            <span>Charts</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TripDetailsScreen;
