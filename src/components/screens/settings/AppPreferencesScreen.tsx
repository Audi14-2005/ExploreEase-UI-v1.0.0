
import React, { useState } from 'react';
import { ArrowLeft, Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';

interface AppPreferencesScreenProps {
  onBack: () => void;
}

const AppPreferencesScreen = ({ onBack }: AppPreferencesScreenProps) => {
  const [preferences, setPreferences] = useState({
    darkMode: false,
    autoSync: true,
    offlineMode: false,
    highQualityImages: true,
    backgroundRefresh: true,
    soundEffects: false,
    hapticFeedback: true
  });

  const [theme, setTheme] = useState('system');
  const [mapStyle, setMapStyle] = useState('standard');
  const [units, setUnits] = useState('metric');

  const handleToggle = (key: keyof typeof preferences) => {
    setPreferences(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  return (
    <div className="h-full bg-gray-50">
      <div className="sticky top-0 bg-white border-b border-gray-200 p-4">
        <div className="flex items-center space-x-3">
          <Button variant="ghost" size="sm" onClick={onBack}>
            <ArrowLeft size={20} />
          </Button>
          <h1 className="text-lg font-semibold">App Preferences</h1>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Theme Selection */}
        <div>
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
            Theme
          </h3>
          <div className="bg-white rounded-xl p-4">
            <ToggleGroup type="single" value={theme} onValueChange={setTheme}>
              <ToggleGroupItem value="light" className="flex items-center space-x-2">
                <Sun size={16} />
                <span>Light</span>
              </ToggleGroupItem>
              <ToggleGroupItem value="dark" className="flex items-center space-x-2">
                <Moon size={16} />
                <span>Dark</span>
              </ToggleGroupItem>
              <ToggleGroupItem value="system">System</ToggleGroupItem>
            </ToggleGroup>
          </div>
        </div>

        {/* Map Preferences */}
        <div>
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
            Map Style
          </h3>
          <div className="bg-white rounded-xl p-4">
            <ToggleGroup type="single" value={mapStyle} onValueChange={setMapStyle}>
              <ToggleGroupItem value="standard">Standard</ToggleGroupItem>
              <ToggleGroupItem value="satellite">Satellite</ToggleGroupItem>
              <ToggleGroupItem value="terrain">Terrain</ToggleGroupItem>
            </ToggleGroup>
          </div>
        </div>

        {/* Units */}
        <div>
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
            Measurement Units
          </h3>
          <div className="bg-white rounded-xl p-4">
            <ToggleGroup type="single" value={units} onValueChange={setUnits}>
              <ToggleGroupItem value="metric">Metric (km, °C)</ToggleGroupItem>
              <ToggleGroupItem value="imperial">Imperial (mi, °F)</ToggleGroupItem>
            </ToggleGroup>
          </div>
        </div>

        {/* App Behavior */}
        <div>
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
            App Behavior
          </h3>
          <div className="space-y-3">
            {Object.entries(preferences).map(([key, value]) => {
              const labels = {
                darkMode: 'Dark Mode',
                autoSync: 'Auto Sync',
                offlineMode: 'Offline Mode',
                highQualityImages: 'High Quality Images',
                backgroundRefresh: 'Background App Refresh',
                soundEffects: 'Sound Effects',
                hapticFeedback: 'Haptic Feedback'
              };

              const descriptions = {
                darkMode: 'Use dark theme for better night viewing',
                autoSync: 'Automatically sync data when connected',
                offlineMode: 'Enable offline functionality',
                highQualityImages: 'Download high resolution images',
                backgroundRefresh: 'Update content in background',
                soundEffects: 'Play sounds for app interactions',
                hapticFeedback: 'Enable vibration feedback'
              };

              return (
                <div key={key} className="flex items-center justify-between p-4 bg-white rounded-xl">
                  <div className="flex-1">
                    <p className="font-medium text-gray-800">{labels[key as keyof typeof labels]}</p>
                    <p className="text-sm text-gray-600">{descriptions[key as keyof typeof descriptions]}</p>
                  </div>
                  <Switch
                    checked={value}
                    onCheckedChange={() => handleToggle(key as keyof typeof preferences)}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppPreferencesScreen;
