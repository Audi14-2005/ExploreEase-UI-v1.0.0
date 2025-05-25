
import React, { useState } from 'react';
import { 
  Bell, 
  Shield, 
  Globe, 
  Moon, 
  Smartphone, 
  CreditCard, 
  HelpCircle, 
  LogOut,
  ChevronRight,
  User,
  RotateCcw
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { usePreferences } from '@/contexts/PreferencesContext';
import ProfileInformationScreen from './settings/ProfileInformationScreen';
import NotificationsScreen from './settings/NotificationsScreen';
import PrivacySecurityScreen from './settings/PrivacySecurityScreen';
import LanguageRegionScreen from './settings/LanguageRegionScreen';
import AppPreferencesScreen from './settings/AppPreferencesScreen';
import PaymentMethodsScreen from './settings/PaymentMethodsScreen';
import HelpCenterScreen from './settings/HelpCenterScreen';

const SettingsScreen = () => {
  const { logout } = useAuth();
  const { resetToDefaults } = usePreferences();
  const [activeScreen, setActiveScreen] = useState<string | null>(null);

  const handleLogout = () => {
    logout();
    window.location.reload();
  };

  const handleResetPreferences = () => {
    if (window.confirm('Are you sure you want to reset all preferences to default? This action cannot be undone.')) {
      resetToDefaults();
      alert('Preferences have been reset to default values.');
    }
  };

  const settingsGroups = [
    {
      title: 'Account',
      items: [
        { 
          label: 'Profile Information', 
          icon: User, 
          description: 'Update your personal details',
          screen: 'profile'
        },
        { 
          label: 'Privacy & Security', 
          icon: Shield, 
          description: 'Manage your privacy settings',
          screen: 'privacy'
        },
        { 
          label: 'Payment Methods', 
          icon: CreditCard, 
          description: 'Add or remove payment options',
          screen: 'payments'
        }
      ]
    },
    {
      title: 'Preferences',
      items: [
        { 
          label: 'Notifications', 
          icon: Bell, 
          description: 'Control what alerts you receive',
          screen: 'notifications'
        },
        { 
          label: 'Language & Region', 
          icon: Globe, 
          description: 'Change app language and region',
          screen: 'language'
        },
        { 
          label: 'Dark Mode', 
          icon: Moon, 
          description: 'Switch between light and dark themes',
          screen: 'preferences'
        },
        { 
          label: 'App Preferences', 
          icon: Smartphone, 
          description: 'Customize app behavior',
          screen: 'preferences'
        }
      ]
    },
    {
      title: 'Support',
      items: [
        { 
          label: 'Help Center', 
          icon: HelpCircle, 
          description: 'Get help and support',
          screen: 'help'
        }
      ]
    }
  ];

  const handleSettingClick = (screen: string) => {
    setActiveScreen(screen);
  };

  const handleBack = () => {
    setActiveScreen(null);
  };

  // Render specific settings screen
  if (activeScreen) {
    switch (activeScreen) {
      case 'profile':
        return <ProfileInformationScreen onBack={handleBack} />;
      case 'notifications':
        return <NotificationsScreen onBack={handleBack} />;
      case 'privacy':
        return <PrivacySecurityScreen onBack={handleBack} />;
      case 'language':
        return <LanguageRegionScreen onBack={handleBack} />;
      case 'preferences':
        return <AppPreferencesScreen onBack={handleBack} />;
      case 'payments':
        return <PaymentMethodsScreen onBack={handleBack} />;
      case 'help':
        return <HelpCenterScreen onBack={handleBack} />;
      default:
        return null;
    }
  }

  return (
    <div className="h-full overflow-y-auto bg-gray-50">
      <div className="p-4 space-y-6">
        {/* Header */}
        <div className="bg-white rounded-xl p-6 text-center">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Settings & Preferences</h2>
          <p className="text-gray-600">Manage your account and app preferences</p>
        </div>

        {/* Settings Groups */}
        {settingsGroups.map((group, groupIndex) => (
          <div key={groupIndex}>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">{group.title}</h3>
            <div className="space-y-2">
              {group.items.map((item, itemIndex) => {
                const Icon = item.icon;
                return (
                  <button
                    key={itemIndex}
                    onClick={() => handleSettingClick(item.screen)}
                    className="w-full flex items-center justify-between p-4 bg-white rounded-xl hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                        <Icon size={20} className="text-blue-600" />
                      </div>
                      <div className="text-left">
                        <p className="font-medium text-gray-800">{item.label}</p>
                        <p className="text-sm text-gray-600">{item.description}</p>
                      </div>
                    </div>
                    <ChevronRight size={20} className="text-gray-400" />
                  </button>
                );
              })}
            </div>
          </div>
        ))}

        {/* Reset Preferences */}
        <Button
          onClick={handleResetPreferences}
          variant="outline"
          className="w-full flex items-center justify-center space-x-2 h-12 rounded-xl text-orange-600 border-orange-200 hover:bg-orange-50"
        >
          <RotateCcw size={20} />
          <span>Reset All Preferences</span>
        </Button>

        {/* App Information */}
        <div className="bg-white rounded-xl p-4">
          <div className="text-center space-y-2">
            <p className="text-sm text-gray-600">ExploreEase</p>
            <p className="text-xs text-gray-400">Version 1.0.0</p>
          </div>
        </div>

        {/* Logout Button */}
        <Button
          onClick={handleLogout}
          variant="outline"
          className="w-full flex items-center justify-center space-x-2 h-12 rounded-xl text-red-600 border-red-200 hover:bg-red-50"
        >
          <LogOut size={20} />
          <span>Sign Out</span>
        </Button>
      </div>
    </div>
  );
};

export default SettingsScreen;
