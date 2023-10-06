import { AppDispatch } from '@store';
import {
  SettingsState,
  setSettings,
  resetData as resetDataAction,
} from '@store/features/settings';
import { msgLog } from './logging';

let firstSettings = true;

export type ExtensionApi = {
  resetData: () => Promise<void>;
  updateSettings: (settings: Partial<SettingsState>) => void;
};

export type WindowWithExtensionApi = Window &
  typeof globalThis & {
    [f in typeof WINDOW_GLOBAL_API_VARNAME]: ExtensionApi;
  };

export function setGlobalFunctions(dispatch: AppDispatch): void {
  (window as WindowWithExtensionApi)[WINDOW_GLOBAL_API_VARNAME] = {
    resetData: resetData.bind(undefined, dispatch),
    updateSettings: updateSettings.bind(undefined, dispatch),
  };
}

export function getExtensionApi(): ExtensionApi | undefined {
  return (window as WindowWithExtensionApi)[WINDOW_GLOBAL_API_VARNAME];
}

function updateSettings(
  dispatch: AppDispatch,
  settings: Partial<SettingsState>
): void {
  const msg = firstSettings
    ? 'Settings initialized'
    : 'Settings have been updated';
  firstSettings = false;
  msgLog(msg, settings);
  dispatch(setSettings(settings));
}

async function resetData(dispatch: AppDispatch): Promise<void> {
  dispatch(resetDataAction());
}
