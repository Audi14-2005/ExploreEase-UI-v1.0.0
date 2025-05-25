
import React from 'react';
import { ArrowLeft, Shield, Lock, Eye, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { usePreferences } from '@/contexts/PreferencesContext';

interface PrivacySecurityScreenProps {
  onBack: () => void;
}

const PrivacySecurityScreen = ({ onBack }: PrivacySecurityScreenProps) => {
  const { privacy, updatePrivacy } = usePreferences();

  const handleToggle = (key: keyof typeof privacy) => {
    updatePrivacy({ [key]: !privacy[key] });
  };

  const securityOptions = [
    {
      title: 'Privacy Settings',
      icon: Eye,
      items: [
        { key: 'profileVisibility' as const, label: 'Public Profile', description: 'Allow others to find your profile' },
        { key: 'showTravelHistory' as const, label: 'Show Travel History', description: 'Display your past trips publicly' },
        { key: 'allowFriendRequests' as const, label: 'Allow Friend Requests', description: 'Let others send you friend requests' },
        { key: 'showOnlineStatus' as const, label: 'Show Online Status', description: 'Let friends see when you\'re online' }
      ]
    },
    {
      title: 'Data & Security',
      icon: Shield,
      items: [
        { key: 'dataSharing' as const, label: 'Data Sharing', description: 'Share anonymous usage data' },
        { key: 'locationTracking' as const, label: 'Location Services', description: 'Allow location-based features' },
        { key: 'twoFactorAuth' as const, label: 'Two-Factor Authentication', description: 'Add extra security to your account' }
      ]
    }
  ];

  return (
    <div className="h-full bg-gray-50">
      <div className="sticky top-0 bg-white border-b border-gray-200 p-4">
        <div className="flex items-center space-x-3">
          <Button variant="ghost" size="sm" onClick={onBack}>
            <ArrowLeft size={20} />
          </Button>
          <h1 className="text-lg font-semibold">Privacy & Security</h1>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {securityOptions.map((section, sectionIndex) => {
          const Icon = section.icon;
          return (
            <div key={sectionIndex}>
              <div className="flex items-center space-x-2 mb-3">
                <Icon size={18} className="text-blue-600" />
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
                  {section.title}
                </h3>
              </div>
              <div className="space-y-3">
                {section.items.map((item) => (
                  <div key={item.key} className="flex items-center justify-between p-4 bg-white rounded-xl">
                    <div className="flex-1">
                      <p className="font-medium text-gray-800">{item.label}</p>
                      <p className="text-sm text-gray-600">{item.description}</p>
                    </div>
                    <Switch
                      checked={privacy[item.key]}
                      onCheckedChange={() => handleToggle(item.key)}
                    />
                  </div>
                ))}
              </div>
            </div>
          );
        })}

        {/* Quick Actions */}
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
            Security Actions
          </h3>
          <Button variant="outline" className="w-full justify-start">
            <Lock size={20} className="mr-3" />
            Change Password
          </Button>
          <Button variant="outline" className="w-full justify-start">
            <Users size={20} className="mr-3" />
            Manage Blocked Users
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PrivacySecurityScreen;
