import { useEffect, useState } from 'react';
import { SettingsState } from '@store/features/settings';
import { loadSettings, storeSettings } from '@utils/logic/storage';

export function useOptionsPage() {
  const [settings, setSettings] = useState<SettingsState | undefined>();

  useEffect(() => {
    loadSettings().then(setSettings);
  }, []);

  useEffect(() => {
    if (!settings) return;

    storeSettings({
      lastCheckedUpdate: PACKAGE_VERSION,
    });
  }, [settings]);

  return {
    settings,
  };
}
