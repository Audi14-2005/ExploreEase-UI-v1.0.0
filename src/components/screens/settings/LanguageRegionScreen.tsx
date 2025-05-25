
import React, { useState } from 'react';
import { ArrowLeft, Check, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface LanguageRegionScreenProps {
  onBack: () => void;
}

const LanguageRegionScreen = ({ onBack }: LanguageRegionScreenProps) => {
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [selectedRegion, setSelectedRegion] = useState('US');
  const [selectedCurrency, setSelectedCurrency] = useState('USD');

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
    { code: 'it', name: 'Italiano', flag: '🇮🇹' },
    { code: 'pt', name: 'Português', flag: '🇵🇹' },
    { code: 'ja', name: '日本語', flag: '🇯🇵' },
    { code: 'ko', name: '한국어', flag: '🇰🇷' },
    { code: 'zh', name: '中文', flag: '🇨🇳' }
  ];

  const regions = [
    { code: 'US', name: 'United States', flag: '🇺🇸' },
    { code: 'CA', name: 'Canada', flag: '🇨🇦' },
    { code: 'GB', name: 'United Kingdom', flag: '🇬🇧' },
    { code: 'DE', name: 'Germany', flag: '🇩🇪' },
    { code: 'FR', name: 'France', flag: '🇫🇷' },
    { code: 'JP', name: 'Japan', flag: '🇯🇵' },
    { code: 'AU', name: 'Australia', flag: '🇦🇺' }
  ];

  const currencies = [
    { code: 'USD', name: 'US Dollar', symbol: '$' },
    { code: 'EUR', name: 'Euro', symbol: '€' },
    { code: 'GBP', name: 'British Pound', symbol: '£' },
    { code: 'JPY', name: 'Japanese Yen', symbol: '¥' },
    { code: 'CAD', name: 'Canadian Dollar', symbol: 'C$' },
    { code: 'AUD', name: 'Australian Dollar', symbol: 'A$' }
  ];

  return (
    <div className="h-full bg-gray-50">
      <div className="sticky top-0 bg-white border-b border-gray-200 p-4">
        <div className="flex items-center space-x-3">
          <Button variant="ghost" size="sm" onClick={onBack}>
            <ArrowLeft size={20} />
          </Button>
          <h1 className="text-lg font-semibold">Language & Region</h1>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Language Selection */}
        <div>
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
            Language
          </h3>
          <div className="space-y-2">
            {languages.map((language) => (
              <button
                key={language.code}
                onClick={() => setSelectedLanguage(language.code)}
                className="w-full flex items-center justify-between p-4 bg-white rounded-xl hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <span className="text-xl">{language.flag}</span>
                  <span className="font-medium text-gray-800">{language.name}</span>
                </div>
                {selectedLanguage === language.code && (
                  <Check size={20} className="text-blue-600" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Region Selection */}
        <div>
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
            Region
          </h3>
          <div className="space-y-2">
            {regions.map((region) => (
              <button
                key={region.code}
                onClick={() => setSelectedRegion(region.code)}
                className="w-full flex items-center justify-between p-4 bg-white rounded-xl hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <span className="text-xl">{region.flag}</span>
                  <span className="font-medium text-gray-800">{region.name}</span>
                </div>
                {selectedRegion === region.code && (
                  <Check size={20} className="text-blue-600" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Currency Selection */}
        <div>
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
            Currency
          </h3>
          <div className="space-y-2">
            {currencies.map((currency) => (
              <button
                key={currency.code}
                onClick={() => setSelectedCurrency(currency.code)}
                className="w-full flex items-center justify-between p-4 bg-white rounded-xl hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <span className="text-xl font-bold text-gray-600">{currency.symbol}</span>
                  <div className="text-left">
                    <p className="font-medium text-gray-800">{currency.name}</p>
                    <p className="text-sm text-gray-600">{currency.code}</p>
                  </div>
                </div>
                {selectedCurrency === currency.code && (
                  <Check size={20} className="text-blue-600" />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LanguageRegionScreen;
