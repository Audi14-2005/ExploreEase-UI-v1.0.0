
import React, { useState } from 'react';
import { Home, Route, DollarSign, MessageCircle, Settings } from 'lucide-react';
import ExploreScreen from './screens/ExploreScreen';
import RoutesMainScreen from './screens/RoutesMainScreen';
import ExpensesScreen from './screens/ExpensesScreen';
import ChatScreen from './screens/ChatScreen';
import SettingsScreen from './screens/SettingsScreen';
import UserStatsHeader from './UserStatsHeader';
import { AuthProvider } from '@/contexts/AuthContext';
import { PreferencesProvider } from '@/contexts/PreferencesContext';

const MainApp = () => {
  const [activeTab, setActiveTab] = useState('explore');

  const tabs = [
    { id: 'explore', label: 'Explore', icon: Home, component: ExploreScreen },
    { id: 'routes', label: 'Routes', icon: Route, component: RoutesMainScreen },
    { id: 'expenses', label: 'Expenses', icon: DollarSign, component: ExpensesScreen },
    { id: 'chat', label: 'Chat', icon: MessageCircle, component: ChatScreen },
    { id: 'settings', label: 'Settings', icon: Settings, component: SettingsScreen }
  ];

  const ActiveComponent = tabs.find(tab => tab.id === activeTab)?.component || ExploreScreen;

  return (
    <AuthProvider>
      <PreferencesProvider>
        <div className="h-screen w-screen bg-background text-foreground flex flex-col">
          {/* User Stats Header with Profile Picture */}
          <UserStatsHeader onProfileClick={() => setActiveTab('settings')} />
          
          {/* Main Content */}
          <div className="flex-1 overflow-hidden bg-background">
            <ActiveComponent />
          </div>
          
          {/* Bottom Navigation */}
          <div className="bg-card border-t border-border px-4 py-2">
            <div className="flex justify-around items-center">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex flex-col items-center py-2 px-3 rounded-lg transition-all duration-200 ${
                      activeTab === tab.id
                        ? 'text-primary bg-primary/10'
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    <Icon size={24} />
                    <span className="text-xs mt-1 font-medium">{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </PreferencesProvider>
    </AuthProvider>
  );
};

export default MainApp;
