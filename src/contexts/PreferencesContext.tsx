
import React, { createContext, useContext, useState, useEffect } from 'react';

interface NotificationSettings {
  pushNotifications: boolean;
  emailNotifications: boolean;
  smsNotifications: boolean;
  tripReminders: boolean;
  friendRequests: boolean;
  groupMessages: boolean;
  directMessages: boolean;
  promotions: boolean;
  weatherAlerts: boolean;
  priceAlerts: boolean;
}

interface PrivacySettings {
  profileVisibility: boolean;
  showTravelHistory: boolean;
  allowFriendRequests: boolean;
  showOnlineStatus: boolean;
  dataSharing: boolean;
  locationTracking: boolean;
  twoFactorAuth: boolean;
}

interface AppPreferences {
  autoSync: boolean;
  offlineMode: boolean;
  highQualityImages: boolean;
  backgroundRefresh: boolean;
  soundEffects: boolean;
  hapticFeedback: boolean;
  theme: 'light' | 'dark' | 'system';
  mapStyle: 'standard' | 'satellite' | 'terrain';
  units: 'metric' | 'imperial';
}

interface LanguageRegion {
  language: string;
  region: string;
  currency: string;
}

interface PreferencesContextType {
  notifications: NotificationSettings;
  privacy: PrivacySettings;
  appPreferences: AppPreferences;
  languageRegion: LanguageRegion;
  updateNotifications: (settings: Partial<NotificationSettings>) => void;
  updatePrivacy: (settings: Partial<PrivacySettings>) => void;
  updateAppPreferences: (settings: Partial<AppPreferences>) => void;
  updateLanguageRegion: (settings: Partial<LanguageRegion>) => void;
  resetToDefaults: () => void;
}

const defaultNotifications: NotificationSettings = {
  pushNotifications: true,
  emailNotifications: false,
  smsNotifications: false,
  tripReminders: true,
  friendRequests: true,
  groupMessages: true,
  directMessages: true,
  promotions: false,
  weatherAlerts: true,
  priceAlerts: true
};

const defaultPrivacy: PrivacySettings = {
  profileVisibility: true,
  showTravelHistory: false,
  allowFriendRequests: true,
  showOnlineStatus: true,
  dataSharing: false,
  locationTracking: true,
  twoFactorAuth: false
};

const defaultAppPreferences: AppPreferences = {
  autoSync: true,
  offlineMode: false,
  highQualityImages: true,
  backgroundRefresh: true,
  soundEffects: false,
  hapticFeedback: true,
  theme: 'system',
  mapStyle: 'standard',
  units: 'metric'
};

const defaultLanguageRegion: LanguageRegion = {
  language: 'en',
  region: 'US',
  currency: 'USD'
};

const PreferencesContext = createContext<PreferencesContextType | undefined>(undefined);

export const usePreferences = () => {
  const context = useContext(PreferencesContext);
  if (context === undefined) {
    throw new Error('usePreferences must be used within a PreferencesProvider');
  }
  return context;
};

export const PreferencesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [notifications, setNotifications] = useState<NotificationSettings>(defaultNotifications);
  const [privacy, setPrivacy] = useState<PrivacySettings>(defaultPrivacy);
  const [appPreferences, setAppPreferences] = useState<AppPreferences>(defaultAppPreferences);
  const [languageRegion, setLanguageRegion] = useState<LanguageRegion>(defaultLanguageRegion);

  // Load preferences from localStorage on mount
  useEffect(() => {
    const loadPreferences = () => {
      try {
        const storedNotifications = localStorage.getItem('preferences-notifications');
        const storedPrivacy = localStorage.getItem('preferences-privacy');
        const storedAppPreferences = localStorage.getItem('preferences-app');
        const storedLanguageRegion = localStorage.getItem('preferences-language-region');

        if (storedNotifications) {
          setNotifications({ ...defaultNotifications, ...JSON.parse(storedNotifications) });
        }
        if (storedPrivacy) {
          setPrivacy({ ...defaultPrivacy, ...JSON.parse(storedPrivacy) });
        }
        if (storedAppPreferences) {
          setAppPreferences({ ...defaultAppPreferences, ...JSON.parse(storedAppPreferences) });
        }
        if (storedLanguageRegion) {
          setLanguageRegion({ ...defaultLanguageRegion, ...JSON.parse(storedLanguageRegion) });
        }
      } catch (error) {
        console.error('Error loading preferences:', error);
      }
    };

    loadPreferences();
  }, []);

  // Apply theme changes to document
  useEffect(() => {
    const applyTheme = () => {
      const { theme } = appPreferences;
      let shouldUseDarkMode = false;

      if (theme === 'system') {
        shouldUseDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
      } else if (theme === 'dark') {
        shouldUseDarkMode = true;
      } else if (theme === 'light') {
        shouldUseDarkMode = false;
      }

      console.log('Applying theme:', theme, 'Dark mode:', shouldUseDarkMode);
      
      if (shouldUseDarkMode) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    };

    applyTheme();

    // Listen for system theme changes when using system theme
    if (appPreferences.theme === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      mediaQuery.addEventListener('change', applyTheme);
      return () => mediaQuery.removeEventListener('change', applyTheme);
    }
  }, [appPreferences.theme]);

  const updateNotifications = (settings: Partial<NotificationSettings>) => {
    const newSettings = { ...notifications, ...settings };
    setNotifications(newSettings);
    localStorage.setItem('preferences-notifications', JSON.stringify(newSettings));
  };

  const updatePrivacy = (settings: Partial<PrivacySettings>) => {
    const newSettings = { ...privacy, ...settings };
    setPrivacy(newSettings);
    localStorage.setItem('preferences-privacy', JSON.stringify(newSettings));
  };

  const updateAppPreferences = (settings: Partial<AppPreferences>) => {
    const newSettings = { ...appPreferences, ...settings };
    setAppPreferences(newSettings);
    localStorage.setItem('preferences-app', JSON.stringify(newSettings));
  };

  const updateLanguageRegion = (settings: Partial<LanguageRegion>) => {
    const newSettings = { ...languageRegion, ...settings };
    setLanguageRegion(newSettings);
    localStorage.setItem('preferences-language-region', JSON.stringify(newSettings));
  };

  const resetToDefaults = () => {
    setNotifications(defaultNotifications);
    setPrivacy(defaultPrivacy);
    setAppPreferences(defaultAppPreferences);
    setLanguageRegion(defaultLanguageRegion);
    
    localStorage.removeItem('preferences-notifications');
    localStorage.removeItem('preferences-privacy');
    localStorage.removeItem('preferences-app');
    localStorage.removeItem('preferences-language-region');
  };

  return (
    <PreferencesContext.Provider value={{
      notifications,
      privacy,
      appPreferences,
      languageRegion,
      updateNotifications,
      updatePrivacy,
      updateAppPreferences,
      updateLanguageRegion,
      resetToDefaults
    }}>
      {children}
    </PreferencesContext.Provider>
  );
};
