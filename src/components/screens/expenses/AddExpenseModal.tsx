
import React, { useState } from 'react';
import { X, Calendar, DollarSign, Tag, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface AddExpenseModalProps {
  isOpen: boolean;
  onClose: () => void;
  trips: any[];
}

const AddExpenseModal = ({ isOpen, onClose, trips }: AddExpenseModalProps) => {
  const [formData, setFormData] = useState({
    amount: '',
    category: 'Food',
    trip: trips[0]?.name || '',
    description: '',
    date: new Date().toISOString().split('T')[0]
  });

  const categories = [
    { id: 'food', label: 'Food', icon: '🍛' },
    { id: 'transport', label: 'Transport', icon: '🚗' },
    { id: 'hotel', label: 'Hotel', icon: '🏨' },
    { id: 'activities', label: 'Activities', icon: '🎭' },
    { id: 'shopping', label: 'Shopping', icon: '🛍️' },
    { id: 'other', label: 'Other', icon: '📝' }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically save the expense
    console.log('Adding expense:', formData);
    onClose();
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold text-gray-800">Add New Expense</h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="rounded-full"
          >
            <X size={20} />
          </Button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          {/* Amount */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Amount (₹)
            </label>
            <div className="relative">
              <DollarSign size={20} className="absolute left-3 top-3 text-gray-400" />
              <input
                type="number"
                value={formData.amount}
                onChange={(e) => handleInputChange('amount', e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter amount"
                required
              />
            </div>
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category
            </label>
            <div className="grid grid-cols-3 gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  type="button"
                  onClick={() => handleInputChange('category', category.label)}
                  className={`flex flex-col items-center p-3 rounded-lg border transition-colors ${
                    formData.category === category.label
                      ? 'bg-blue-50 border-blue-500 text-blue-700'
                      : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <span className="text-xl mb-1">{category.icon}</span>
                  <span className="text-xs font-medium">{category.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Trip */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Trip
            </label>
            <select
              value={formData.trip}
              onChange={(e) => handleInputChange('trip', e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {trips.map((trip) => (
                <option key={trip.id} value={trip.name}>
                  {trip.name}
                </option>
              ))}
            </select>
          </div>

          {/* Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Date
            </label>
            <div className="relative">
              <Calendar size={20} className="absolute left-3 top-3 text-gray-400" />
              <input
                type="date"
                value={formData.date}
                onChange={(e) => handleInputChange('date', e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <div className="relative">
              <FileText size={20} className="absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="What did you spend on?"
                required
              />
            </div>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full h-12 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg"
          >
            Add Expense
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AddExpenseModal;
