
import React, { useState } from 'react';
import { ArrowLeft, Plus, CreditCard, Trash2, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PaymentMethodsScreenProps {
  onBack: () => void;
}

const PaymentMethodsScreen = ({ onBack }: PaymentMethodsScreenProps) => {
  const [paymentMethods, setPaymentMethods] = useState([
    {
      id: '1',
      type: 'visa',
      last4: '4242',
      expiryMonth: '12',
      expiryYear: '26',
      isDefault: true
    },
    {
      id: '2',
      type: 'mastercard',
      last4: '5555',
      expiryMonth: '08',
      expiryYear: '25',
      isDefault: false
    }
  ]);

  const removePaymentMethod = (id: string) => {
    setPaymentMethods(prev => prev.filter(method => method.id !== id));
  };

  const setAsDefault = (id: string) => {
    setPaymentMethods(prev => 
      prev.map(method => ({
        ...method,
        isDefault: method.id === id
      }))
    );
  };

  const getCardIcon = (type: string) => {
    switch (type) {
      case 'visa':
        return '💳';
      case 'mastercard':
        return '💳';
      case 'amex':
        return '💳';
      default:
        return '💳';
    }
  };

  const getCardName = (type: string) => {
    switch (type) {
      case 'visa':
        return 'Visa';
      case 'mastercard':
        return 'Mastercard';
      case 'amex':
        return 'American Express';
      default:
        return 'Card';
    }
  };

  return (
    <div className="h-full bg-gray-50">
      <div className="sticky top-0 bg-white border-b border-gray-200 p-4">
        <div className="flex items-center space-x-3">
          <Button variant="ghost" size="sm" onClick={onBack}>
            <ArrowLeft size={20} />
          </Button>
          <h1 className="text-lg font-semibold">Payment Methods</h1>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Security Notice */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="flex items-start space-x-3">
            <Shield className="text-blue-600 mt-0.5" size={20} />
            <div>
              <h3 className="font-medium text-blue-900 mb-1">Secure Payments</h3>
              <p className="text-sm text-blue-700">
                Your payment information is encrypted and securely stored. We never store your full card number.
              </p>
            </div>
          </div>
        </div>

        {/* Payment Methods List */}
        <div>
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
            Saved Cards
          </h3>
          <div className="space-y-3">
            {paymentMethods.map((method) => (
              <div key={method.id} className="bg-white rounded-xl p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{getCardIcon(method.type)}</span>
                    <div>
                      <p className="font-medium text-gray-800">
                        {getCardName(method.type)} •••• {method.last4}
                      </p>
                      <p className="text-sm text-gray-600">
                        Expires {method.expiryMonth}/{method.expiryYear}
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removePaymentMethod(method.id)}
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    <Trash2 size={16} />
                  </Button>
                </div>
                
                <div className="flex items-center justify-between">
                  {method.isDefault ? (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Default
                    </span>
                  ) : (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setAsDefault(method.id)}
                    >
                      Set as Default
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Add New Payment Method */}
        <Button className="w-full flex items-center justify-center space-x-2">
          <Plus size={20} />
          <span>Add New Payment Method</span>
        </Button>

        {/* Alternative Payment Methods */}
        <div>
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
            Other Options
          </h3>
          <div className="space-y-2">
            <button className="w-full flex items-center space-x-3 p-4 bg-white rounded-xl hover:bg-gray-50 transition-colors">
              <span className="text-xl">📱</span>
              <span className="font-medium text-gray-800">Apple Pay</span>
            </button>
            <button className="w-full flex items-center space-x-3 p-4 bg-white rounded-xl hover:bg-gray-50 transition-colors">
              <span className="text-xl">🤖</span>
              <span className="font-medium text-gray-800">Google Pay</span>
            </button>
            <button className="w-full flex items-center space-x-3 p-4 bg-white rounded-xl hover:bg-gray-50 transition-colors">
              <span className="text-xl">💰</span>
              <span className="font-medium text-gray-800">PayPal</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentMethodsScreen;
