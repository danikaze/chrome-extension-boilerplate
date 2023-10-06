import { DEFAULT_SETTINGS, SettingsState } from '@store/features/settings';

export async function storeSettings(
  settings: Partial<SettingsState>
): Promise<void> {
  const currentSettings = (await chrome.storage.sync.get(['settings']))[
    'settings'
  ] as SettingsState | undefined;
  await chrome.storage.sync.set({
    settings: {
      ...currentSettings,
      ...settings,
    },
  });
}

export async function loadSettings(): Promise<SettingsState> {
  const settings = (await chrome.storage.sync.get(['settings']))['settings'] as
    | SettingsState
    | undefined;

  return {
    ...DEFAULT_SETTINGS,
    ...settings,
  };
}
