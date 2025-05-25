
import React from 'react';
import { ArrowLeft, Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { usePreferences } from '@/contexts/PreferencesContext';

interface AppPreferencesScreenProps {
  onBack: () => void;
}

const AppPreferencesScreen = ({ onBack }: AppPreferencesScreenProps) => {
  const { appPreferences, updateAppPreferences } = usePreferences();

  const handleToggle = (key: keyof typeof appPreferences) => {
    if (typeof appPreferences[key] === 'boolean') {
      updateAppPreferences({ [key]: !appPreferences[key] });
    }
  };

  const handleThemeChange = (value: string) => {
    if (value) {
      updateAppPreferences({ theme: value as 'light' | 'dark' | 'system' });
    }
  };

  const handleMapStyleChange = (value: string) => {
    if (value) {
      updateAppPreferences({ mapStyle: value as 'standard' | 'satellite' | 'terrain' });
    }
  };

  const handleUnitsChange = (value: string) => {
    if (value) {
      updateAppPreferences({ units: value as 'metric' | 'imperial' });
    }
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
            <ToggleGroup type="single" value={appPreferences.theme} onValueChange={handleThemeChange}>
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
            <ToggleGroup type="single" value={appPreferences.mapStyle} onValueChange={handleMapStyleChange}>
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
            <ToggleGroup type="single" value={appPreferences.units} onValueChange={handleUnitsChange}>
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
            {Object.entries(appPreferences).map(([key, value]) => {
              if (typeof value !== 'boolean') return null;

              const labels: Record<string, string> = {
                autoSync: 'Auto Sync',
                offlineMode: 'Offline Mode',
                highQualityImages: 'High Quality Images',
                backgroundRefresh: 'Background App Refresh',
                soundEffects: 'Sound Effects',
                hapticFeedback: 'Haptic Feedback'
              };

              const descriptions: Record<string, string> = {
                autoSync: 'Automatically sync data when connected',
                offlineMode: 'Enable offline functionality',
                highQualityImages: 'Download high resolution images',
                backgroundRefresh: 'Update content in background',
                soundEffects: 'Play sounds for app interactions',
                hapticFeedback: 'Enable vibration feedback'
              };

              const label = labels[key];
              const description = descriptions[key];

              if (!label || !description) return null;

              return (
                <div key={key} className="flex items-center justify-between p-4 bg-white rounded-xl">
                  <div className="flex-1">
                    <p className="font-medium text-gray-800">{label}</p>
                    <p className="text-sm text-gray-600">{description}</p>
                  </div>
                  <Switch
                    checked={value}
                    onCheckedChange={() => handleToggle(key as keyof typeof appPreferences)}
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
