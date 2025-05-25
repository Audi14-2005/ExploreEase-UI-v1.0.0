
import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { usePreferences } from '@/contexts/PreferencesContext';

interface NotificationsScreenProps {
  onBack: () => void;
}

const NotificationsScreen = ({ onBack }: NotificationsScreenProps) => {
  const { notifications, updateNotifications } = usePreferences();

  const handleToggle = (key: keyof typeof notifications) => {
    updateNotifications({ [key]: !notifications[key] });
  };

  const notificationGroups = [
    {
      title: 'General',
      items: [
        { key: 'pushNotifications' as const, label: 'Push Notifications', description: 'Receive notifications on your device' },
        { key: 'emailNotifications' as const, label: 'Email Notifications', description: 'Receive updates via email' },
        { key: 'smsNotifications' as const, label: 'SMS Notifications', description: 'Receive text message alerts' }
      ]
    },
    {
      title: 'Travel',
      items: [
        { key: 'tripReminders' as const, label: 'Trip Reminders', description: 'Get reminders about upcoming trips' },
        { key: 'weatherAlerts' as const, label: 'Weather Alerts', description: 'Weather updates for your destinations' },
        { key: 'priceAlerts' as const, label: 'Price Alerts', description: 'Notifications about price changes' }
      ]
    },
    {
      title: 'Social',
      items: [
        { key: 'friendRequests' as const, label: 'Friend Requests', description: 'When someone wants to connect' },
        { key: 'groupMessages' as const, label: 'Group Messages', description: 'New messages in group chats' },
        { key: 'directMessages' as const, label: 'Direct Messages', description: 'New direct messages' }
      ]
    },
    {
      title: 'Marketing',
      items: [
        { key: 'promotions' as const, label: 'Promotions & Offers', description: 'Special deals and promotions' }
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
          <h1 className="text-lg font-semibold">Notifications</h1>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {notificationGroups.map((group, groupIndex) => (
          <div key={groupIndex}>
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
              {group.title}
            </h3>
            <div className="space-y-3">
              {group.items.map((item) => (
                <div key={item.key} className="flex items-center justify-between p-4 bg-white rounded-xl">
                  <div className="flex-1">
                    <p className="font-medium text-gray-800">{item.label}</p>
                    <p className="text-sm text-gray-600">{item.description}</p>
                  </div>
                  <Switch
                    checked={notifications[item.key]}
                    onCheckedChange={() => handleToggle(item.key)}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationsScreen;
